'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
function DecoComet({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M45 15 L25 35 Q15 45 10 50 Q5 55 10 45 Q15 35 25 25 Z" fill={color} opacity="0.3" />
      <circle cx="45" cy="15" r="6" fill={color} opacity="0.8" />
      <path d="M45 15 L15 25 M45 15 L35 45 M45 15 L20 30" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      <circle cx="15" cy="43" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="43" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#448AFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 50 L50 50 L45 35 L15 35 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="30" cy="35" r="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M20 25 L40 10 L45 15 L25 30 Z" fill={color} opacity="0.4" />
      <line x1="25" y1="30" x2="20" y2="25" stroke={color} strokeWidth="2" />
      <line x1="45" y1="15" x2="40" y2="10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoAsteroid({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <circle cx="25" cy="25" r="3" fill={color} opacity="0.4" />
      <circle cx="38" cy="35" r="4" fill={color} opacity="0.5" />
      <circle cx="20" cy="40" r="2" fill={color} opacity="0.3" />
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoRocket({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M25 45 L20 55 M35 45 L40 55 M28 45 L30 55 M32 45 L30 55" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.7" />
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-interestelar': [DecoAsteroid, DecoOrbit, DecoComet],
  'velocidad-escape': [DecoRocket, DecoOrbit, DecoAsteroid],
  'orbita-hiperbolica': [DecoOrbit, DecoTelescope, DecoComet],
  'catalogo-nomadas': [DecoAsteroid, DecoComet, DecoTelescope],
  'deteccion-pan-starrs': [DecoTelescope, DecoAsteroid, DecoOrbit],
  'composicion-quimica': [DecoComet, DecoAsteroid, DecoRocket],
  'futuro-caza': [DecoRocket, DecoTelescope, DecoOrbit],
}; const BIBLIOGRAPHY = ['Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  '\'Oumuamua ISSI Team (2019). "The natural history of \'Oumuamua", Nature Astronomy, 3',
  'Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", The Astrophysical Journal Letters, 886',
  'Seligman, D. & Laughlin, G. (2018). "The Feasibility and Benefits of In Situ Exploration of \'Oumuamua-like Objects", The Astronomical Journal, 155'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-interestelar',
    title: '¿Qué es Interestelar?',
    color: '#00E5FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_que-es-interestelar.jpg',
    image: '/assets/interestelar/infographic_m1/hero_que-es-interestelar.jpg',
    content: [
      'Imagina que nuestro Sistema Solar es un vecindario cósmico, donde el Sol es la casa central y los planetas son las casas de los vecinos, todos girando por las mismas calles gracias a la gravedad de nuestra estrella. Ahora imagina que de repente llega un visitante que viene desde una ciudad completamente diferente, a billones de kilómetros de distancia: cruza rápidamente el vecindario y sigue su camino sin detenerse. Eso es exactamente un objeto interestelar — un viajero cósmico que nació alrededor de otra estrella y que solo está de paso por nuestra región del espacio.',
      'La clave para saber que estos objetos no son de aquí está en su movimiento. Los planetas, asteroides y cometas de nuestro Sistema Solar viajan en órbitas elípticas — trayectorias cerradas que se repiten indefinidamente, como si estuvieran atados al Sol con una cuerda gravitacional. Los objetos interestelares, en cambio, no están atados a nuestra estrella: llegan con demasiada energía y velocidad para que la gravedad del Sol los capture. Sus trayectorias son hiperbólicas — abiertas, sin retorno, de una sola vez.',
      'El primer visitante interestelar confirmado se llamó 1I/Oumuamua — en hawaiano, "el primer mensajero desde lejos". Fue descubierto el 19 de octubre de 2017 por el sistema Pan-STARRS del Observatorio Haleakala en Hawái. Tenía una forma inusualmente alargada, similar a un cigarro o una pancake según diferentes análisis, y se movía a una velocidad hiperbólica con excentricidad 1.2, lo que confirmaba que provenía del espacio interestelar. Era la primera vez en la historia que observábamos directamente un objeto de otro sistema estelar.',
      'En 2019, el astrónomo aficionado Gennadiy Borisov, desde su observatorio privado en Crimea, descubrió el segundo objeto interestelar: el cometa 2I/Borisov. A diferencia de Oumuamua, Borisov se comportaba como los cometas conocidos de nuestro Sistema Solar: al acercarse al Sol, su hielo comenzó a sublimarse, formando una brillante coma (la nube de gas y polvo) y una cola claramente visible. Su composición era similar a los cometas locales, demostrando que los cometas helados son comunes en otros sistemas estelares también.',
      'Estudiar estos objetos es como recibir botellas con mensajes de estrellas lejanas que jamás podremos visitar con la tecnología actual. El viaje más rápido posible a la estrella más cercana al Sol, Próxima Centauri (4.24 años luz), tomaría más de 70,000 años con las naves actuales. Pero Oumuamua y Borisov nos trajeron muestras físicas de otros sistemas estelares hasta nuestra puerta. Al analizar su luz, sus gases y su comportamiento, cada objeto interestelar nos regala información sobre la composición química y la dinámica de planetas y estrellas a distancias inaccesibles por cualquier otro medio.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'Los astrofísicos calculan que hay al menos diez mil objetos interestelares del tamaño de Oumuamua cruzando la órbita de Neptuno en cualquier momento dado. Cada estrella de la Vía Láctea expulsa billones de pequeños cuerpos durante la formación de sus sistemas planetarios — cuando planetas gigantes como Júpiter migran de posición, patean asteroides y cometas hacia el espacio interestelar como bolas de billar. La Vía Láctea entera está llena de estos nómadas cósmicos viajando eternamente entre las estrellas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de los objetos interestelares es alta. Oumuamua entró al Sistema Solar a más de 90,000 kilómetros por hora relativo al Sol. Al pasar cerca de nuestra estrella, la gravedad solar lo aceleró en su encuentro más cercano y alcanzó una velocidad máxima de aproximadamente 315,000 kilómetros por hora — suficiente para cruzar el diámetro completo de la Tierra en menos de un minuto. El cometa Borisov viajaba a unos 150,000 kilómetros por hora en su punto de mayor aproximación al Sol.' }
    ],
    fact: 'El nombre técnico de \'Oumuamua es 1I/2017 U1. La "I" representa la palabra "Interestelar". Fue la primera vez que la Unión Astronómica Internacional creó una categoría nueva para un objeto. Antes, solo existían las letras"A" para Asteroides y "C" para Cometas. Este asteroide revolucionó las nomenclaturas.',
  },
  {
    id: 'velocidad-escape',
    title: 'Velocidad de Escape',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_velocidad-escape.jpg',
    image: '/assets/interestelar/infographic_m1/hero_velocidad-escape.jpg',
    content: [
      'Para entender cómo viajan los objetos interestelares, necesitas comprender la velocidad de escape. Imagina lanzar una pelota hacia arriba: si la lanzas despacio, la gravedad de la Tierra la detiene y la hace caer. Si la lanzas con más fuerza, sube más alto antes de caer. Pero si la lanzas con suficiente velocidad, la gravedad no podrá frenarla y continuará viajando hacia el espacio indefinidamente. Esa velocidad mínima necesaria para escapar de la atracción gravitacional de un cuerpo se llama "velocidad de escape".',
      'Para escapar de la Tierra, un cohete necesita viajar a 11.2 kilómetros por segundo — unos 40,320 kilómetros por hora. Eso es suficiente para llegar a la Luna o emprender el viaje hacia Marte. Pero para salir completamente del Sistema Solar y escapar de la enorme gravedad del Sol, necesitarías viajar mucho más rápido. La velocidad de escape del Sol, calculada desde la distancia de la Tierra, es de aproximadamente 42.1 kilómetros por segundo (unos 152,000 km/h). Desde la órbita de Neptuno, la última frontera del Sistema Solar, la velocidad de escape solar es de unos 7.4 km/s.',
      'Aquí es exactamente donde los objetos interestelares revelan que no son de aquí. Cuando los astrónomos midieron la velocidad de Oumuamua al entrar al Sistema Solar, antes de que la gravedad solar lo acelerara, viajaba a unos 26 kilómetros por segundo relativo al Sol — significativamente por encima de la velocidad de escape solar en esa región del espacio. Esto es matemáticamente imposible para cualquier objeto que se haya formado en nuestro Sistema Solar: no podría haber alcanzado esa velocidad sin una fuente externa de energía que no existe aquí.',
      'Podemos comparar los visitantes interestelares con los vehículos humanos que sí han logrado escapar del Sistema Solar. Las sondas Voyager necesitaron ayuda: usaron la técnica de asistencia gravitacional, pasando cerca de planetas gigantes como Júpiter y Saturno para robar parte de su energía orbital y acelerar. La Voyager 1, lanzada en 1977, tardó más de 35 años en cruzar la heliopausa — el límite donde el viento solar cede al espacio interestelar. Los objetos naturales que llegan desde otras estrellas ya tienen toda esa velocidad de partida.',
      'Los astrofísicos creen que la mayoría de los objetos interestelares adquirieron sus velocidades cuando fueron expulsados de sus sistemas de origen. El proceso más probable es la migración de planetas gigantes: cuando un planeta del tamaño de Júpiter se forma y migra hacia el interior de su sistema estelar, su enorme gravedad pertuba las órbitas de millones de cometas y asteroides, lanzando muchos de ellos hacia el espacio interestelar a velocidades superiores a la de escape estelar. Nuestro propio Sistema Solar probablemente expulsó miles de millones de objetos de esta forma durante sus primeros mil millones de años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'Incluso los agujeros negros tienen una velocidad de escape, pero es mayor que la velocidad de la luz. La región donde la velocidad de escape iguala exactamente la velocidad de la luz se llama el horizonte de eventos. Más allá de ese límite, absolutamente nada — ni materia, ni luz, ni información — puede escapar. Por eso los agujeros negros son negros: no emiten ni reflejan ningún tipo de radiación que pueda llegar hasta nosotros. Solo sabemos que existen por los efectos gravitacionales que producen sobre los objetos cercanos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las sondas Voyager 1 y 2 son los objetos humanos más alejados y veloces en el espacio. La Voyager 1 viaja a unos 17 kilómetros por segundo y cruzó la heliopausa — el límite del Sistema Solar — en 2012, después de 35 años de viaje. La Voyager 2 la cruzó en 2018. Ambas llevan un disco de oro con grabaciones de sonidos y imágenes de la Tierra, por si alguna civilización inteligente las encuentra en su eterno viaje interestelar. Con sus velocidades actuales, tardarían aproximadamente 40,000 años en alcanzar la estrella más cercana a nuestro Sol.' }
    ],
    fact: 'Para calcular la velocidad de escape de un planeta o estrella, los físicos usan la fórmula derivada por Newton en el siglo XVII: la velocidad de escape es igual a la raíz cuadrada de dos veces la constante gravitacional universal G, multiplicada por la masa M del astro, dividida por su radio R. Esta fórmula elegante, publicada en los Principia Mathematica en 1687, sigue siendo la herramienta básica que los ingenieros de la NASA y de todas las agencias espaciales del mundo usan para planear misiones al Sistema Solar.',
  },
  {
    id: 'orbita-hiperbolica',
    title: 'Ãƒ"rbitas Hiperbólicas',
    color: '#64FFDA',
    btnImage: '/assets/interestelar/infographic_m1/btn_orbita-hiperbolica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_orbita-hiperbolica.jpg',
    content: [
      'Piensa en las vías de una montaña rusa. Si forman un círculo o un óvalo cerrado, el carrito dará vueltas pasando siempre por el mismo lugar: eso es una órbita elíptica, como la que sigue la Tierra alrededor del Sol. Pero imagina una vía que hace una curva pronunciada y luego se aleja indefinidamente sin cerrarse jamás. Esa es una órbita hiperbólica — el camino de un objeto que tiene suficiente energía para escapar de la gravedad de cualquier estrella que se cruce en su camino.',
      'Los astrónomos cuantifican la forma de una órbita con un número llamado excentricidad. Una excentricidad de exactamente 0 es un círculo perfecto. Entre 0 y 1 da una elipse cerrada — cuanto más cerca de 1, más alargada y ovalada. Una excentricidad exactamente igual a 1 es una parábola, el caso límite donde el objeto tiene justo la energía mínima para escapar. Una excentricidad mayor a 1 da una hipérbola — la órbita de un objeto interestelar confirmado. Este número es la "firma matemática" que delata el origen extrasolar de un objeto.',
      'Cuando descubrieron a Oumuamua, los computadores del Observatorio Pan-STARRS calcularon su trayectoria a partir de múltiples fotografías tomadas en días consecutivos, midiendo su movimiento contra el fondo de estrellas. El resultado fue demoledor: excentricidad de 1.2. Esta cifra, nunca antes registrada para ningún objeto natural en la historia de la astronomía, era la firma inequívoca de una órbita hiperbólica. Oumuamua no había nacido en nuestro Sistema Solar — venía de las estrellas.',
      'El cometa Borisov tenía un número aún más asombroso. Su excentricidad fue calculada en aproximadamente 3.35 — más del doble que la de Oumuamua. Esto significa que Borisov viajaba mucho más rápido relativo al Sol, en una trayectoria casi rectilínea que se curvó levemente al pasar cerca de nuestra estrella antes de alejarse hacia el espacio interestelar. Su alta excentricidad permitió calcular aproximadamente desde qué dirección del cielo provenía: de la constelación de Casiopea, posiblemente eyectado hace miles de años de un sistema estelar en esa región.',
      'Trazar estas órbitas con precisión es un proceso que requiere semanas de observaciones y cientos de fotografías. Los telescopios de todo el mundo colaboran para medir la posición exacta del objeto en cada instante, creando una tabla de coordenadas que luego se introduce en programas de física gravitacional. Estos programas aplican las leyes de Newton (y las correcciones relativistas de Einstein para máxima precisión) para reconstruir la trayectoria pasada del objeto y predecir su posición futura con precisión de kilómetros, incluso a distancias de miles de millones de kilómetros.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'Además de las órbitas elípticas cerradas y las hiperbólicas abiertas, existe un caso límite: la órbita parabólica, con excentricidad exactamente igual a 1.0. Un objeto en órbita parabólica tiene justo la energía mínima para escapar de la gravedad del Sol, pero se aleja infinitamente lento. En la práctica, muchos cometas provenientes de la Nube de Oort, el reservorio de cometas primordiales en el borde exterior del Sistema Solar, viajan con trayectorias casi parabólicas cuando se aproximan por primera vez al Sol. Algunos quedan atrapados en órbitas elípticas largas, y otros escapan al espacio interestelar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La sonda robótica New Horizons, que fotografió Plutón en 2015, viaja en una órbita hiperbólica. Fue lanzada con suficiente velocidad para escapar del Sistema Solar, y un empujón gravitacional de Júpiter en 2007 la aceleró adicionalmente. Su excentricidad orbital es aproximadamente 1.01 — apenas por encima del umbral hiperbólico. Esto significa que New Horizons no volverá jamás: continuará viajando hacia el espacio interestelar hasta que alguna fuerza gravitacional de otra estrella la perturbe, dentro de millones de años.' }
    ],
    fact: 'La matemática necesaria para calcular y comprender las órbitas de planetas, cometas y objetos interestelares fue descrita por Isaac Newton en su libro Philosophiae Naturalis Principia Mathematica, publicado en 1687. Newton dedujo que todas las trayectorias posibles bajo la fuerza gravitacional de un cuerpo puntual son cónicas: círculos, elipses, parábolas e hipérbolas. Esta clasificación, que Newton derivó a partir de solo tres leyes del movimiento y una ley de la gravedad, describe perfectamente el comportamiento de todos los objetos del universo observable, desde satélites artificiales hasta visitantes interestelares que llegaron de otras estrellas.',
  },
  {
    id: 'catalogo-nomadas',
    title: 'El Catálogo de Nómadas',
    color: '#FF9100',
    btnImage: '/assets/interestelar/infographic_m1/btn_catalogo-nomadas.jpg',
    image: '/assets/interestelar/infographic_m1/hero_catalogo-nomadas.jpg',
    content: [
      'A pesar de que el universo tiene más de 13,800 millones de años y nuestra Vía Láctea contiene más de 200,000 millones de estrellas, nuestro catálogo de objetos interestelares confirmados es sorprendentemente pequeño: solo dos. El primer visitante confirmado es Oumuamua, descubierto en 2017. El segundo es 2I/Borisov, el cometa interestelar descubierto en 2019. Esta escasez de registros no refleja la abundancia real de estos objetos — refleja las limitaciones de nuestros instrumentos de observación.',
      'El hecho de que solo hayamos observado dos objetos interestelares no significa que sean raros. Todo lo contrario: los astrofísicos usan modelos matemáticos de la dinámica de los sistemas estelares para estimar cuántos de estos objetos deberían estar cruzando nuestro Sistema Solar en un momento dado. Basándose en el descubrimiento de Oumuamua y en la densidad observable de estrellas en la Vía Láctea, calculan que debe haber aproximadamente 10,000 objetos del tamaño de Oumuamua por unidad astronómica cúbica en el espacio interestelar cercano — una densidad enorme pero invisible para nosotros.',
      'Entonces, si hay tantos objetos interestelares pasando cerca de nosotros, ¿por qué solo hemos visto dos? La razón es que el universo es enorme y estos visitantes son pequeños, fríos y oscuros. A diferencia de las estrellas que emiten su propia luz, los asteroides y cometas solo reflejan una pequeña fracción de la luz solar. Un asteroide de un kilómetro de diámetro a la distancia de Júpiter refleja menos luz que una vela a 10 kilómetros de distancia. Detectar uno requiere telescopios extremadamente sensibles que barran repetidamente el mismo cielo.',
      'Existe una subcategoría especialmente fascinante de posibles visitantes interestelares: los meteoros de alta velocidad. En 2014, un meteoro de menos de un metro de diámetro explotó por la fricción atmosférica sobre el océano Pacífico. Años después, el astrofísico Avi Loeb y su estudiante Amir Siraj analizaron sus datos de velocidad y determinaron que el meteoro, designado IM1, viajaba a una velocidad hiperbólica — demasiado rápido para ser de nuestro Sistema Solar. Si esta determinación es correcta, IM1 sería el primer objeto interestelar conocido que llegó a contacto físico con la Tierra.',
      'En el futuro, nuestro catálogo crecerá exponencialmente gracias a la próxima generación de instrumentos astronómicos. El Observatorio Vera C. Rubin en Chile, con su cámara de 3,200 megapíxeles y su espejo de 8.4 metros, comenzará operaciones completas en 2025-2026. Se estima que detectará varios objetos interestelares por año, transformando el estudio de los visitantes cósmicos de un campo de dos ejemplares en una disciplina con cientos o miles de objetos catalogados.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El descubridor del cometa 2I/Borisov no era un investigador de una universidad ni trabajaba para una agencia espacial. Gennadiy Borisov es un astrónomo aficionado ucraniano que construyó sus propios telescopios en su observatorio privado en Crimea. Observó el objeto el 30 de agosto de 2019 y lo reportó al Centro de Planetas Menores de la IAU. Cuando los astrónomos profesionales de todo el mundo confirmaron su naturaleza interestelar, la IAU lo nombró en su honor: Borisov fue el primer astrónomo aficionado en descubrir un objeto interestelar confirmado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El nombre completo de Oumuamua es 1I/2017 U1, donde 1I indica que es el primer objeto Interestelar catalogado, y 2017 U1 indica el año y la secuencia de descubrimiento. El nombre hawaiano "Oumuamua" fue seleccionado por el equipo que lo descubrió en honor al observatorio Pan-STARRS en Haleakala, Hawái. En hawaiano, "Oumuamua" significa literalmente "explorador que llega de lejos primero" o "primer mensajero", una elección poética perfectamente adecuada para el primer visitante de las estrellas que la humanidad registró.' }
    ],
    fact: 'Muchos astrobiólogos y astrofísicos especulan sobre la teoría de la panspermia, que propone que la vida microscópica básica podría haber viajado entre planetas — y quizás entre sistemas estelares — incrustada en pedazos de roca cósmica, meteoritos o incluso objetos interestelares como Oumuamua. La panspermia no requiere que la vida sobreviva el viaje interestelar completo, sino solo que organismos extremófilos puedan resistir las condiciones del espacio durante miles o millones de años en el interior de una roca protectora. Experimentos con bacterias en órbita terrestre han demostrado que algunos microorganismos pueden sobrevivir el ambiente espacial durante años.',
  },
  {
    id: 'deteccion-pan-starrs',
    title: 'Pan-STARRS y Telescopios',
    color: '#448AFF',
    btnImage: '/assets/interestelar/infographic_m1/btn_deteccion-pan-starrs.jpg',
    image: '/assets/interestelar/infographic_m1/hero_espacio-entre-estrellas.jpg',
    content: [
      'Detectar objetos interestelares en el espacio profundo es una tarea de precisión extraordinaria. Un objeto interestelar típico, del tamaño de Oumuamua (400 metros de largo), refleja tan poca luz a distancias interplanetarias que aparece como un punto difuso prácticamente indistinguible de millones de otras fuentes de luz débil en el cielo nocturno. El truco para encontrarlo es comparar muchas fotografías del mismo campo de visión tomadas con días de diferencia: los objetos en movimiento se desplazan contra el fondo estático de estrellas lejanas.',
      'El sistema Pan-STARRS (Panoramic Survey Telescope and Rapid Response System) fue diseñado precisamente para este tipo de detección. Instalado en el volcán Haleakala en Hawái a 3,000 metros de altitud, su telescopio de 1.8 metros de diámetro está equipado con una cámara de 1,400 megapíxeles — más de 30 veces la resolución de una cámara de teléfono de última generación. Cada noche, Pan-STARRS fotografía sistemáticamente el cielo entero, acumulando imágenes que sus sistemas computarizados comparan automáticamente para detectar objetos en movimiento.',
      'En la noche histórica del 19 de octubre de 2017, el software automatizado de Pan-STARRS detectó un punto de luz difuso que se movía a velocidad inusualmente alta a través del campo visual. El algoritmo de detección levantó una alerta automática al notar que la velocidad del objeto no era compatible con ninguna trayectoria de objeto solar conocida. Los astrónomos de guardia revisaron las imágenes, confirmaron el movimiento anómalo y reportaron el hallazgo al Centro de Planetas Menores de la Unión Astronómica Internacional.',
      'Para poder encontrar más objetos oscuros y veloces en el vacío cósmico, la astronomía moderna está construyendo herramientas sin precedentes. El Observatorio Vera C. Rubin, en la montaña El Pachón en Chile, será el telescopio de ciencia más poderoso jamás construido para el estudio sistemático del universo cambiante. Su espejo de 8.4 metros y su cámara de 3,200 megapíxeles le permitirán fotografiar un área del cielo equivalente a 40 Lunas llenas en una sola exposición de 15 segundos, cubriendo el cielo entero del hemisferio sur cada tres noches.',
      'Con el Observatorio Vera C. Rubin en plena operación, los astrónomos proyectan descubrir varios objetos interestelares por año, comparados con los dos que encontramos en la década pasada. Este salto cuantitativo transformará el estudio de los visitantes cósmicos. En lugar de analizar cada objeto interestelar como un caso único y misterioso, los científicos podrán comparar decenas o centenares de ellos, clasificarlos en tipos, correlacionar sus composiciones con sus sistemas de origen, y construir una imagen estadística de la diversidad del material que los sistemas estelares expulsan al espacio interestelar.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La cámara LSST construida para el Observatorio Vera C. Rubin es el instrumento científico más grande del mundo por número de píxeles: 3,200 megapíxeles, el equivalente a 3,200 fotografías de alta resolución de 1 megapíxel cada una combinadas en una sola imagen. Para procesar todas las imágenes que el telescopio generará cada noche — aproximadamente 20 terabytes de datos — se necesita un supercomputador dedicado permanentemente a clasificar y comparar millones de objetos automáticamente. El lente frontal del telescopio mide 1.57 metros de diámetro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El telescopio espacial James Webb, lanzado el 25 de diciembre de 2021 y operativo desde 2022, es la herramienta más poderosa para estudiar la composición química de objetos cósmicos mediante espectroscopia infrarroja. Si un futuro objeto interestelar pasa suficientemente cerca del Sol, el James Webb podría analizar los gases que emite y determinar exactamente de qué átomos y moléculas está hecho, aportando información directa sobre la química de un sistema estelar desconocido. Su espejo de 6.5 metros le da una sensibilidad 100 veces mayor que la del telescopio Hubble.' }
    ],
    fact: 'El telescopio espacial James Webb, con su espejo de 6.5 metros optimizado para el infrarrojo, ha transformado la astronomía desde su puesta en operación en 2022. Aunque fue diseñado principalmente para estudiar las primeras galaxias del universo y los exoplanetas, también es una herramienta extraordinaria para analizar la composición química de cometas y asteroides mediante espectroscopia: al descomponer la luz reflejada o emitida por un objeto en sus colores individuales, los astrónomos pueden identificar qué moléculas están presentes. Si en el futuro un objeto interestelar pasa suficientemente cerca del Sol y comienza a sublimar hielos, el James Webb podría leer su receta química en tiempo real.',
  },
  {
    id: 'composicion-quimica',
    title: 'Composición Química',
    color: '#FF80AB',
    btnImage: '/assets/interestelar/infographic_m1/btn_composicion-quimica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_composicion-quimica.jpg',
    content: [
      'Determinar de qué está hecho un objeto a distancias de millones de kilómetros, sin poder recoger muestras directas, es uno de los mayores desafíos de la astronomía moderna. La técnica principal que usan los astrónomos se llama espectroscopia: al descomponer la luz reflejada o emitida por un objeto en sus longitudes de onda individuales (los colores del espectro), se pueden identificar los "huellas dactilares" de átomos y moléculas específicos. Cada elemento y compuesto químico absorbe y emite luz en longitudes de onda características y únicas.',
      'Cuando los científicos aplicaron espectroscopia a Oumuamua usando los telescopios más potentes del mundo, se llevaron una sorpresa desconcertante. A diferencia de los cometas normales de nuestro Sistema Solar, que al acercarse al Sol emiten jets de gas y polvo visibles en el espectro, Oumuamua no mostraba ninguna emisión gaseosa detectable. Su superficie parecía inerte — seca, dura y de color rojizo. El color rojizo es consistente con la presencia de tolinas: compuestos orgánicos complejos que se forman cuando moléculas de carbono, nitrógeno y oxígeno son irradiadas por rayos cósmicos durante millones de años en el espacio interestelar.',
      'Además de su composición inerte, Oumuamua guardaba otro misterio inesperado que perturbó profundamente a los astrónomos: se estaba acelerando ligeramente más de lo que predecía la gravedad solar. Los cometas normales explican aceleraciones no gravitacionales mediante el empuje de los gases que emiten, como un cohete de hielo. Pero Oumuamua no emitía gases detectables — y sin embargo se aceleraba. Las hipótesis propuestas incluyen hidrógeno molecular atrapado en su interior, presión de radiación solar sobre una superficie extremadamente delgada como una vela, o materia exótica aún desconocida.',
      'El cometa 2I/Borisov presentó un comportamiento completamente diferente y mucho más familiar. Al acercarse al Sol, sus hielos comenzaron a sublimarse directamente de sólido a gas, produciendo una brillante coma (nube de gas y polvo) y una cola que se extendía millones de kilómetros. El espectro de esta coma mostró la presencia de agua, monóxido de carbono, cianógeno y otros compuestos típicos de los cometas de nuestro Sistema Solar. Borisov era, en composición, extraordinariamente similar a los cometas primordiales de la Nube de Oort, sugiriendo que la química de los cometas es universal.',
      'Esta diferencia radical entre Oumuamua (seco, misterioso, sin emisiones) y Borisov (helado, activo, compositamente familiar) es un tesoro científico para los astrofísicos. Nos muestra que los sistemas estelares producen al menos dos tipos muy diferentes de objetos interestelares — o que el mismo tipo puede presentar composiciones radicalmente distintas según cómo envejeció durante su viaje interestelar, que puede durar millones o incluso miles de millones de años. Cada visitante es una cápsula del tiempo de su sistema de origen.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El astrofísico Avi Loeb de la Universidad de Harvard publicó en 2021 el libro "Extraterrestre: La primera señal de vida inteligente más allá de la Tierra", en el que argumentaba que la aceleración anómala de Oumuamua y su forma inusual son mejor explicadas por una vela solar artificial de tecnología alienígena que por cualquier fenómeno natural conocido. Aunque la mayoría de los astrónomos considera esta hipótesis improbable, Loeb fundó el Proyecto Galileo en 2021, dedicado a buscar artefactos tecnológicos de civilizaciones extraterrestres usando métodos científicos rigurosos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las tolinas son compuestos orgánicos de color rojizo que se forman cuando mezclas de metano, etano, nitrógeno y agua son irradiadas por luz ultravioleta o rayos cósmicos durante períodos prolongados. Su nombre fue acuñado por el astrofísico Carl Sagan en 1979. Las tolinas dan el color oscuro rojizo característico a muchos objetos del Sistema Solar exterior, incluyendo Plutón, Tritón (luna de Neptuno) y los asteroides tipo D. El color rojizo de Oumuamua es consistente con una superficie recubierta de tolinas acumuladas durante millones de años de exposición a los rayos cósmicos del espacio interestelar.' }
    ],
    fact: 'Gran parte del universo visible está compuesto de los mismos elementos básicos: hidrógeno, helio, carbono, oxígeno, nitrógeno, silicio y hierro. Estos elementos se sintetizaron en el interior de estrellas masivas durante miles de millones de años mediante reacciones de fusión nuclear, y se dispersaron por el espacio cuando esas estrellas explotaron como supernovas. Los planetas, asteroides, cometas y objetos interestelares están todos construidos con los mismos bloques fundamentales forjados en las estrellas. Cuando los astrónomos analizan la composición de Oumuamua o Borisov, están leyendo la historia nuclear de una estrella lejana que murió para dar vida a los materiales que viajan entre las galaxias.',
  },
  {
    id: 'futuro-caza',
    title: 'El Futuro de la Caza',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m1/btn_futuro-caza.jpg',
    image: '/assets/interestelar/infographic_m1/hero_futuro-caza.jpg',
    content: [
      'Al considerar que los objetos interestelares son como botellas con mensajes de estrellas lejanas, surge una pregunta natural: ¿podemos alcanzarlos para estudiarlos de cerca? Un objeto interestelar que pase por nuestro Sistema Solar lo hace a velocidades de decenas de kilómetros por segundo — demasiado rápido para que ninguna nave espacial construida hasta ahora pudiera alcanzarlo en el tiempo disponible desde su descubrimiento hasta su alejamiento definitivo. Pero la ingeniería espacial moderna está trabajando en soluciones a este problema.',
      'La respuesta más prometedora a corto plazo es la sonda Comet Interceptor, un proyecto de la Agencia Espacial Europea (ESA) con lanzamiento previsto para 2029. En lugar de construir una nave ultrarrápida capaz de perseguir un cometa, Comet Interceptor estará pre-posicionada en el punto Lagrange L2, a 1.5 millones de kilómetros de la Tierra en la dirección opuesta al Sol. Desde allí, la sonda podrá salir a interceptar cualquier cometa prístino o visitante interestelar descubierto con suficiente antelación, antes de que llegue al punto de máxima proximidad al Sol.',
      'Cuando los telescopios del Observatorio Vera C. Rubin detecten un nuevo visitante interestelar con suficiente antelación — estimando entre meses y un año antes de su perihelio — Comet Interceptor recibirá la orden de despertar. La sonda principal se dividirá en múltiples sub-sondas que se aproximarán al objetivo desde diferentes ángulos, tomando muestras de la coma y fotografías de alta resolución de la superficie desde múltiples perspectivas simultáneamente. Es la primera misión diseñada específicamente para interceptar un visitante cósmico no conocido con anterioridad.',
      'Otra propuesta científica, más ambiciosa, es el Proyecto Lyra, conceptualizado por el Instituto de Iniciativa para el Espacio Interestelar (i4is). Lyra propone enviar una sonda de alta velocidad para alcanzar a Oumuamua mientras todavía está en el Sistema Solar exterior. El desafío es enorme: Oumuamua se alejaba a más de 26 km/s al ser descubierto. Para alcanzarlo, una sonda lanzada hoy necesitaría usar una maniobra de asistencia gravitacional solar extrema — pasar muy cerca del Sol para robar energía orbital — combinada con propulsión eléctrica de alta eficiencia o velas solares. El Proyecto Lyra ha demostrado matemáticamente que es teóricamente posible, aunque requeriría una misión de emergencia lanzada en años, no décadas.',
      'El futuro de la caza de objetos interestelares convierte la persecución de cometas errantes en la nueva frontera de la exploración espacial. Con el Observatorio Vera C. Rubin prediciendo varios descubrimientos anuales, con Comet Interceptor lista para actuar en el espacio, y con tecnologías de propulsión como los propulsores iónicos y las velas solares mejorando constantemente, es posible que en las próximas décadas tengamos imágenes de alta resolución de la superficie de un visitante interestelar, análisis químicos directos de su composición, e incluso muestras de su material traídas de vuelta a la Tierra para análisis en laboratorio.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La sonda Comet Interceptor de la ESA estará pre-posicionada en el punto Lagrange L2, un punto de equilibrio gravitacional a 1.5 millones de kilómetros de la Tierra, en la dirección opuesta al Sol. En este punto, las fuerzas gravitacionales de la Tierra y el Sol se equilibran de tal manera que un objeto pequeño permanece estable con un mínimo de combustible. El telescopio espacial James Webb también orbita el punto L2. Desde allí, Comet Interceptor puede salir rápidamente hacia su objetivo sin necesitar superar la gravedad terrestre desde cero.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para viajar muy rápido en el espacio profundo con poco combustible, los ingenieros usan propulsores iónicos: dispositivos que aceleran átomos de xenón mediante campos eléctricos a velocidades de 30-90 km/s y los expulsan hacia atrás para generar empuje. El empuje de un propulsor iónico es minúsculo comparado con un cohete convencional, pero funciona continuamente durante meses o años, acumulando una velocidad final mucho mayor. La sonda Dawn de la NASA, que estudió Vesta y Ceres, usó propulsores iónicos para cambiar de órbita entre dos cuerpos del cinturón de asteroides — algo imposible con propulsión química convencional.' }
    ],
    fact: 'Los humanos ya hemos lanzado objetos que viajan por el espacio interestelar. Las sondas Voyager 1 y 2, lanzadas en 1977, cruzaron la heliopausa — el límite donde el viento solar cede al medio interestelar — en 2012 y 2018 respectivamente. Ahora son embajadores nómadas de la humanidad en el espacio entre las estrellas. La Voyager 1 lleva un disco de oro con grabaciones de sonidos y música de la Tierra, instrucciones para reproducirlo y coordenadas de nuestro Sistema Solar, en caso de que alguna civilización inteligente la encuentre en los millones de años que tardaría en acercarse a cualquier otra estrella.',
  },
];

export default function InteractiveInfographic_InterestelarM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%),',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <InterestelarHeader />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a78bfa)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}>
                Selecciona uno de los módulos para explorar la ciencia detrás de los nómadas del cosmos.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(0,229,255,0.3)' }}>
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

function CosmicDustField() {
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '0, 229, 255' : '179, 136, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
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

function InterestelarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#00E5FF','#B388FF','#64FFDA','#FF9100','#448AFF','#FF80AB','#FFD740'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#00E5FF" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NÓMADAS DEL COSMOS</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(0,229,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBJETOS INTERESTELARES</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
          layoutId="activeDotInterestelar"
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
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
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}
        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
