'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Oort Cloud themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoOortShell({ size = 70, color = '#1A237E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {/* Scattered cometary bodies */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const dist = 22 + (i % 3) * 3;
        return (
          <circle key={i} cx={30 + dist * Math.cos(rad)} cy={30 + dist * Math.sin(rad)} r="1.5" fill={color} opacity="0.7" />
        );
      })}
    </svg>
  );
}

function DecoIcyBody({ size = 70, color = '#B3E5FC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M25 15 L35 12 L45 20 L42 35 L30 45 L15 35 L12 22 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M25 15 L30 25 L45 20" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L42 35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L30 45" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L15 35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Craters */}
      <circle cx="22" cy="22" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="35" cy="32" r="4" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="25" cy="38" r="2" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function DecoSolarSystem({ size = 80, color = '#CFD8DC', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <circle cx="40" cy="20" r="3" fill={color} />
      <ellipse cx="40" cy="20" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
      <ellipse cx="40" cy="20" rx="20" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <ellipse cx="40" cy="20" rx="30" ry="12" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="50" cy="20" r="1.5" fill={color} opacity="0.8" />
      <circle cx="23" cy="16" r="2" fill={color} opacity="0.6" />
      <circle cx="65" cy="26" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoDistanceLine({ size = 80, color = '#00695C', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="15" x2="5" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="15" x2="75" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="45" cy="20" r="4" fill={color} opacity="0.6" />
      <path d="M15 10 Q20 5 25 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <text x="45" y="12" fill={color} fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.8">100,000 AU</text>
    </svg>
  );
}

function DecoStar({ size = 60, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 5 L33 22 L50 25 L35 32 L40 48 L30 38 L20 48 L25 32 L10 25 L27 22 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.4" />
      <path d="M30 15 L30 45 M15 30 L45 30 M20 20 L40 40 M20 40 L40 20" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'que-es-oort': [DecoOortShell, DecoIcyBody, DecoSolarSystem],'escala-distancia': [DecoDistanceLine, DecoOortShell, DecoStar],
  'origen-formacion': [DecoSolarSystem, DecoIcyBody, DecoOortShell],'cometas-largo-periodo': [DecoIcyBody, DecoStar, DecoDistanceLine],
  'limite-solar-interestelar': [DecoOortShell, DecoSolarSystem, DecoDistanceLine],'perturbaciones-estelares': [DecoStar, DecoOortShell, DecoIcyBody],
  'exploracion-futura': [DecoDistanceLine, DecoSolarSystem, DecoStar],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Oort, J.H. (1950). "The structure of the cloud of comets surrounding the Solar System", Bulletin of the Astronomical Institutes of the Netherlands, 11',
  'Dones, L. et al. (2004). "Oort Cloud Formation and Dynamics", Comets II, University of Arizona Press',
  'Levison, H. et al. (2010). "Capture of the Sun\'s Oort Cloud from the Birth Cluster", Science, 329',
  'Bailer-Jones, C.A.L. (2018). "The completeness-corrected rate of stellar encounters with the Sun", A&A, 609',
  'Stern, S.A. (2003). "The Evolution of Comets in the Oort Cloud and Kuiper Belt", Nature, 424'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-oort',
    title: '¿Qué es la Nube de Oort?',
    color: '#1A237E',
    btnImage: '/assets/interestelar/infographic_m5/btn_que-es-oort.jpg',
    image: '/assets/interestelar/infographic_m5/hero_que-es-oort.jpg',
    content: [
      '¿Qué es la nube que envuelve nuestro vecindario cósmico? Imagina que el Sol es una bombilla en el centro de una gran habitación. A su alrededor giran los planetas. Mucho más lejos, en los límites de la habitación, hay una esfera gigante de bolas de hielo. Esa esfera es la Nube de Oort. Fue propuesta en 1950 por el astrónomo holandés Jan Oort. Él notó que muchos cometas veloces venían de todas direcciones del cielo, no solo del plano orbital de los planetas. Esto le dio una pista sobre su forma tridimensional.',
      'Esta nube funciona como un enorme congelador esférico. Se extiende desde dos mil hasta cien mil veces la distancia entre la Tierra y el Sol. Esa distancia fundamental se llama Unidad Astronómica. Para dar una idea, Plutón está a 39 unidades astronómicas del Sol. La Nube de Oort está miles de veces más lejos. Es la región más distante de nuestro sistema solar. Aunque tiene miles de millones de objetos de hielo, el espacio entre ellos es tan vasto que podrías viajar durante años sin chocar.',
      'La materia que forma esta nube es primordial. Está hecha de restos congelados que sobraron cuando se formaron los planetas pesados hace cuatro mil seiscientos millones de años. Estos bloques de hielo contienen agua sólida, metano, amoníaco y otros compuestos. Es como tener un archivo histórico de los ingredientes que formaron nuestro mundo. Al estudiar los cometas que provienen de allí, los científicos pueden leer la receta de nuestro sistema estelar. Es como viajar al pasado usando hielo cósmico.',
      'Curiosamente, la Nube de Oort nunca ha sido vista directamente por ningún telescopio. Los objetos allí son oscuros y pequeños, y están tan lejos que la luz solar apenas los ilumina. ¿Cómo sabemos que existe? Los astrónomos notaron que los cometas de largo período necesitaban venir de un depósito lejano y esférico. La gravedad de estrellas cercanas desestabiliza a veces a estos objetos, empujándolos hacia el Sol y confirmando estas sospechas.',
      'El modelo original propuesto por Jan Oort sigue siendo la mejor explicación. Aunque se llama nube, no se parece a las nubes de nuestro cielo. Se divide principalmente en dos regiones: una nube esférica exterior y una nube interior con forma de rosquilla llamada Nube de Hills. Esta estructura explica por qué hay distintos tipos de trayectorias de cometas. Esta frontera remota actúa como el borde definitivo del territorio solar.'
    ],
    expandables: [
      { label: 'El Astrónomo Jan Oort', icon: 'atom', text: 'Jan Oort fue uno de los astrónomos más famosos del siglo veinte. Además de proponer la Nube de Oort, calculó la distancia desde el Sol hasta el centro galáctico y demostró que la Vía Láctea está rotando. Sus estudios establecieron bases sólidas. Deducir la existencia de una nube invisible analizando las órbitas de los cometas fue un salto intelectual extraordinario.' },
      { label: 'Forma Tridimensional', icon: 'zap', text: 'A diferencia del cinturón de Kuiper que es como un disco plano de objetos helados, la Nube de Oort exterior es una esfera completa. Imagina una burbuja enorme que encierra a nuestro sistema planetario. Esta geometría ocurre porque los tirones gravitacionales de las estrellas han alterado las órbitas planas, dispersando los objetos en direcciones tridimensionales.' }
    ],
    fact: 'Se calcula que la Nube de Oort contiene al menos varios billones de objetos helados que superan el kilómetro de diámetro. A pesar de este número asombroso, su masa total combinada se estima entre cinco y cien veces la masa de la Tierra. Están hechos principalmente de hielo ligero y polvo, ocupando un volumen espacial inmenso.',
  },
  {
    id: 'escala-distancia',
    title: 'La Escala Inmensa',
    color: '#B3E5FC',
    btnImage: '/assets/interestelar/infographic_m5/btn_escala-distancia.jpg',
    image: '/assets/interestelar/infographic_m5/hero_escala-distancia.jpg',
    content: [
      'Para comprender el tamaño de la Nube de Oort, tenemos que usar la velocidad de la luz como nuestra cinta métrica. La luz viaja a trescientos mil kilómetros por segundo. La luz del Sol tarda solo ocho minutos en llegar a la Tierra, pero tarda casi dos años en alcanzar el borde exterior de la Nube de Oort. Imagina encender una linterna y que la luz tarde casi dos años en tocar la pared de la habitación.',
      'Si redujéramos el Sol al tamaño de una pelota de baloncesto, la Tierra sería del tamaño de una semilla a unos treinta metros. Plutón estaría a un kilómetro de distancia. En este modelo, el borde interior de la Nube de Oort estaría a noventa kilómetros de distancia, y su borde exterior llegaría casi a tres mil kilómetros. Esto demuestra que la mayor parte del sistema solar es espacio vacío.',
      'Hablemos de nuestras naves espaciales. La sonda Voyager 1 es la nave más rápida que hemos construido. Viaja a sesenta y un mil kilómetros por hora y ha superado a todos los planetas. A pesar de esa velocidad, a la Voyager 1 le tomará aproximadamente trescientos años alcanzar el borde interior de la Nube de Oort. Y tardará unos treinta mil años más en cruzarla por completo.',
      'Las distancias son tan enormes que la gravedad del Sol se vuelve muy débil en las zonas exteriores. A cien mil unidades astronómicas, el agarre del Sol compite con la influencia de estrellas vecinas y el tirón gravitatorio de la Vía Láctea. Es una zona de equilibrio frágil. Los objetos helados orbitan con una lentitud majestuosa. Cada órbita alrededor del Sol puede durar millones de años terrestres.',
      'Los astrónomos usan estas escalas gigantes para entender cómo se relacionan los sistemas estelares. La Nube de Oort es tan grande que su borde exterior toca casi las nubes hipotéticas del sistema Alfa Centauri. Esto significa que las estrellas vecinas podrían estar intercambiando cometas constantemente. Nuestro sistema no es una burbuja aislada, sino una vasta red que se extiende en el espacio interestelar.'
    ],
    expandables: [
      { label: 'Unidad Astronómica (UA)', icon: 'clock', text: 'La Unidad Astronómica es la regla de medir indispensable para nuestro sistema solar. Equivale a la distancia media exacta entre la Tierra y el Sol: 149.5 millones de kilómetros. Cuando decimos que la Nube de Oort se extiende cien mil unidades astronómicas, significa que su borde lejano está cien mil veces más lejos del Sol que nuestro planeta.' },
      { label: 'Esfera de Hill', icon: 'zap', text: 'La frontera invisible donde la Nube de Oort exterior termina marca el borde de la esfera de Hill del Sol. Esta esfera define el volumen donde la gravedad solar domina sobre la atracción de la galaxia y las estrellas vecinas. Si un cometa supera ese límite, vagará por el espacio interestelar.' }
    ],
    fact: 'El borde exterior de la Nube de Oort se ubica a un tercio del camino hacia Próxima Centauri, la estrella más cercana al Sol. Las distancias cósmicas son tan inmensas que las nubes de Oort de las estrellas cercanas podrían estar interactuando, compartiendo material antiguo.',
  },
  {
    id: 'origen-formacion',
    title: 'El Origen Turbulento',
    color: '#CFD8DC',
    btnImage: '/assets/interestelar/infographic_m5/btn_origen-formacion.jpg',
    image: '/assets/interestelar/infographic_m5/hero_origen-formacion.jpg',
    content: [
      '¿Cómo se formó esta estructura esférica en las afueras de nuestro sistema? Tenemos que retroceder 4,600 millones de años en el pasado. En ese entonces, el joven sistema solar era un disco plano de polvo y gas. Los planetas se formaron chocando material. Sobraron muchos escombros helados cerca de planetas gigantes como Júpiter y Saturno. Eran los ladrillos que no se usaron para construir los planetas.',
      'Júpiter y Saturno son muy masivos. Su gravedad actuó como catapultas celestiales. Cuando los pequeños objetos de hielo pasaban cerca, la gravedad de los planetas los aceleraba y arrojaba lejos con gran fuerza. Millones de cuerpos helados fueron expulsados de sus órbitas originales hacia los rincones más lejanos del espacio.',
      'Pero si fueron arrojados tan violentamente, ¿por qué no escaparon del Sol hacia el espacio interestelar? El modelo de Niza ofrece una explicación. Mientras estos objetos volaban hacia afuera, nuestro Sol no estaba solo. Nació en un cúmulo estelar junto con otras estrellas. La gravedad de las estrellas vecinas frenó a estos objetos expulsados. Sus órbitas se curvaron, formando gradualmente la gran esfera que vemos hoy.',
      'Este proceso tomó cientos de millones de años. Muchos objetos de hielo chocaron, se rompieron o fueron eyectados para siempre al vacío. Se estima que solo una pequeña fracción del material original sobrevivió para formar la Nube de Oort. Los que se quedaron lograron un equilibrio delicado en el que la fuerza de los gigantes gaseosos y el Sol se igualaron con las influencias estelares.',
      'Recientes descubrimientos sugieren que nuestro Sol podría haber capturado cometas de estrellas cercanas durante este período. Algunos modelos computacionales proponen que un porcentaje de la Nube de Oort podría tener origen extraterrestre. Si esto es cierto, estudiar los cometas de Oort nos permite analizar material de sistemas estelares vecinos sin tener que salir del sistema solar.'
    ],
    expandables: [
      { label: 'El Modelo Niza', icon: 'atom', text: 'El modelo Niza, nombrado por la ciudad francesa donde se desarrolló en 2005, propone que los planetas gigantes del sistema solar joven migraron de sus posiciones originales. Esta migración planetaria causó inestabilidades orbitales, dispersando objetos helados pequeños hacia el cinturón de Kuiper y la Nube de Oort, explicando la arquitectura actual.' },
      { label: 'Captura Estelar', icon: 'zap', text: 'La hipótesis de que el Sol robó cometas es fascinante. En su cúmulo natal, las estrellas pasaban muy cerca unas de otras. Durante estos encuentros, la gravedad solar podría haber arrancado cometas de la periferia de estrellas hermanas, incorporándolos a nuestra propia Nube de Oort y enriqueciendo nuestra diversidad química.' }
    ],
    fact: 'Si la Tierra entera se redujera al tamaño de un grano de sal, y la distancia desde el Sol al borde lejano de la Nube de Oort se dibujara a esa escala, la nube se extendería por más de 32 kilómetros. Esta metáfora revela la vastedad del espacio dominado por la gravedad de nuestro Sol.',
  },
  {
    id: 'cometas-largo-periodo',
    title: 'Cometas de Largo Período',
    color: '#6A1B9A',
    btnImage: '/assets/interestelar/infographic_m5/btn_cometas-largo-periodo.jpg',
    image: '/assets/interestelar/infographic_m5/hero_cometas-largo-periodo.jpg',
    content: [
      'La Nube de Oort es la cuna de los cometas de largo período. Estos cometas viajan en órbitas elípticas muy estiradas. A diferencia del cometa Halley, que visita la Tierra cada 76 años, un cometa de largo período tarda miles o millones de años en completar un viaje alrededor del Sol. El cometa Hale-Bopp, que deslumbró a la humanidad en 1997, tardará más de dos mil años en regresar. Vienen de fronteras muy remotas.',
      '¿Qué empuja a uno de estos bloques de hielo a emprender un viaje hacia el Sol? Imagina la Nube de Oort como un montón de manzanas colgando débilmente de un árbol. Las manzanas apenas se sostienen de la gravedad solar. Si una estrella pasa cerca, su gravedad fuerte crea una vibración, como agitar la rama del árbol. Esta perturbación cambia la órbita del cometa, haciéndolo caer en picada hacia el interior del sistema solar.',
      'El viaje largo hacia el centro es oscuro y silencioso al principio. El cometa se mueve lentamente en la oscuridad profunda durante milenios. A medida que se acerca al Sol, la gravedad fuerte lo acelera a altas velocidades. Cuando cruza la órbita de Júpiter, el calor solar comienza a derretir su superficie. Los hielos se subliman en gas expansivo, creando una atmósfera brillante llamada coma y dos colas que pueden medir millones de kilómetros.',
      'Estos visitantes son cápsulas del tiempo perfectas. Han estado en congelación profunda desde el nacimiento de nuestro sistema solar. Cuando un cometa cruza el cielo terrestre, nos muestra material virginal que no ha cambiado durante 4,600 millones de años. Analizar su luz permite a los científicos descubrir de qué estaba hecha la nebulosa original que nos dio vida. Es una oportunidad para investigar nuestros orígenes.',
      'Desafortunadamente, estos cometas también representan un peligro. Como caen desde cualquier dirección, son difíciles de detectar a tiempo. A diferencia de los asteroides rocosos del cinturón principal que orbitan en el mismo plano que la Tierra, un cometa oortiano podría aparecer repentinamente. La energía de su impacto sería destructiva debido a su alta velocidad. Por eso, los astrónomos mantienen programas de búsqueda para detectar posibles intrusos veloces.'
    ],
    expandables: [
      { label: 'El Cometa Hale-Bopp', icon: 'atom', text: 'El cometa Hale-Bopp, descubierto en 1995, es uno de los cometas de largo período más observados en la historia. Su núcleo medía unos 40 kilómetros de diámetro, lo cual es inusualmente grande. Su brillo en el cielo nocturno fue visible a simple vista durante un récord de 18 meses continuos.' },
      { label: 'Dos Colas Distintas', icon: 'zap', text: 'Los cometas de Oort desarrollan dos colas cuando se acercan al Sol. La cola de polvo está formada por partículas rocosas y se curva hacia atrás a lo largo de la órbita. La segunda cola, de gas ionizado brillante, apunta en dirección opuesta al Sol debido a la presión del viento solar.' }
    ],
    fact: 'El cometa C/2014 UN271, descubierto por los astrónomos Pedro Bernardinelli y Gary Bernstein, es un objeto gigantesco proveniente de la Nube de Oort. Su núcleo masivo mide más de 130 kilómetros de ancho. Nunca se acercará a la Tierra; su aproximación más cercana en 2031 lo dejará más allá de la órbita de Saturno.',
  },
  {
    id: 'limite-solar-interestelar',
    title: 'El Límite Interestelar',
    color: '#00695C',
    btnImage: '/assets/interestelar/infographic_m5/btn_limite-solar-interestelar.jpg',
    image: '/assets/interestelar/infographic_m5/hero_limite-solar-interestelar.jpg',
    content: [
      '¿Dónde termina nuestro hogar espacial y dónde empieza el espacio interestelar? Responder a esto depende de cómo definas la frontera. Mucha gente cree que el sistema solar termina después de Plutón o en la heliopausa (donde el viento solar choca con el medio interestelar). Gravitacionalmente, la Nube de Oort es la región remota donde la gravedad de nuestro Sol tiene la última palabra, marcando el límite real del imperio solar.',
      'Esta frontera gravitacional se llama Esfera de Hill. Imagina que el Sol tiene una cuerda atada a todos los cometas. Mientras un cometa esté dentro de esta esfera, el Sol puede retenerlo. Pero a unas cien mil unidades astronómicas, esa cuerda imaginaria se vuelve muy débil. En ese límite, la gravedad combinada de la galaxia y las estrellas cercanas arranca el cometa definitivamente. Al cruzar la línea, se convierte en un objeto interestelar libre.',
      'Si pudieras pararte sobre un bloque de hielo en el borde de la Nube de Oort, el Sol ya no se vería como un disco brillante. Sería simplemente otra estrella en el cielo, quizás un poco más brillante que Venus. Todo el sistema planetario estaría fusionado en un punto luminoso. El frío allí está a pocos grados por encima del cero absoluto.',
      'Este límite no es una pared sólida, sino una región difusa. Los cometas entran y salen silenciosamente a lo largo de millones de años. Los objetos helados en el borde son vulnerables. Las nubes de gas gigantes que navegan por la Vía Láctea pueden empujar la marea gravitacional, haciendo que los cometas caigan o escapen. La arquitectura de nuestra Nube de Oort no es fija, sino que cambia lentamente con la danza de nuestra galaxia.',
      'Esta transición entre la esfera solar y el abismo interestelar subraya nuestro lugar microscópico en el universo. Entender este límite es crucial para la astrofísica porque nos enseña cómo los sistemas solares pierden su material helado primordial. Los pedazos de hielo errantes que abandonan nuestra Nube de Oort se convertirán en visitantes interestelares para sistemas planetarios lejanos, llevando el agua de nuestro origen hacia destinos desconocidos.'
    ],
    expandables: [
      { label: 'Heliopausa vs Oort', icon: 'zap', text: 'La heliopausa es la frontera donde el viento solar choca con la radiación cósmica galáctica, a 120 unidades astronómicas. La sonda Voyager 1 cruzó la heliopausa en 2012, entrando al medio interestelar. Sin embargo, no dejará el campo gravitacional del Sol hasta que cruce la Nube de Oort en 30,000 años.' },
      { label: 'El Cero Absoluto', icon: 'atom', text: 'La temperatura típica en las profundidades de la Nube de Oort oscila entre tres y diez grados Kelvin (-265 grados Celsius). En este frío tan profundo, gases comunes como el metano y el monóxido de carbono se congelan como rocas duras, preservando química inalterada.' }
    ],
    fact: 'El concepto de la marea galáctica es parecido a cómo la Luna causa mareas en nuestros océanos terrestres. La masa combinada de las estrellas y el gas interestelar en la Vía Láctea ejerce una fuerza gravitacional continua que moldea la forma de la Nube de Oort.',
  },
  {
    id: 'perturbaciones-estelares',
    title: 'Estrellas Errantes Peligrosas',
    color: '#FF8F00',
    btnImage: '/assets/interestelar/infographic_m5/btn_perturbaciones-estelares.jpg',
    image: '/assets/interestelar/infographic_m5/hero_perturbaciones-estelares.jpg',
    content: [
      '¿Sabías que las estrellas masivas no se quedan quietas, sino que vagan constantemente como barcos gigantes en un océano infinito? En su viaje alrededor del centro galáctico, nuestro Sol se cruza con otras estrellas. Cuando una estrella intrusa pasa cerca de nuestra frontera extrema, su gravedad causa estragos. Es como caminar por una habitación llena de globos colgando de hilos débiles; el paso brusco hará que todos se muevan y algunos caigan al suelo.',
      'Uno de los encuentros estelares más famosos es el de la estrella de Scholz. Hace apenas setenta mil años, esta enana roja pasó rozando los límites exteriores de la Nube de Oort. Llegó a estar a menos de un año luz de nuestro Sol. Aunque no causó una catástrofe inmediata, su tirón gravitacional sutil perturbó a muchos cometas helados, alterando sus órbitas permanentemente.',
      'Pero el evento futuro más dramático será protagonizado por una estrella llamada Gliese 710. Según los datos del satélite Gaia, esta enana naranja se dirige hacia nuestro sistema estelar. En un millón trescientos mil años, Gliese 710 cruzará a través de nuestra Nube de Oort interior y la Nube de Hills. Pasará tan cerca que su perturbación gravitacional desatará una lluvia colosal de cometas hacia los planetas interiores.',
      'Durante el encuentro con Gliese 710, los astrónomos calculan que miles de cometas de largo período serán lanzados hacia nuestro rincón interior habitado. Los cielos nocturnos de la Tierra podrían llenarse visualmente de múltiples cometas al mismo tiempo. Crearían un espectáculo visual inigualable, pero también aumentarían exponencialmente el riesgo de impactos peligrosos contra nuestro planeta. Afortunadamente, esto no sucederá sino hasta dentro de más de un millón de años.',
      'Estos encuentros estelares demuestran que el sistema solar no es un reloj aislado, sino parte de una ecología galáctica interactiva. Las estrellas compañeras y el polvo cósmico interactúan e intercambian material frecuentemente con nuestro depósito de hielo ancestral. La Nube de Oort es la interfaz que nos conecta dinámicamente con el resto de la Vía Láctea, siendo moldeada por encuentros casuales en las profundidades del espacio.'
    ],
    expandables: [
      { label: 'La Estrella Gliese 710', icon: 'atom', text: 'Gliese 710 es una enana naranja, con la mitad de la masa del Sol. Actualmente se encuentra inofensivamente a unos 62 años luz de distancia. Cuando llegue a su máxima aproximación crítica en 1.3 millones de años, podría brillar intensamente en nuestros cielos oscuros, rivalizando con Júpiter en brillo planetario.' },
      { label: 'La Estrella de Scholz', icon: 'zap', text: 'Descubierta en 2013 por el astrónomo Ralf-Dieter Scholz, es un sistema binario peculiar compuesto por una enana roja muy pequeña y una enana marrón tenue. Cuando atravesó nuestra Nube de Oort en el pasado, estaba demasiado oscura para ser vista a simple vista por nuestros antepasados primitivos.' }
    ],
    fact: 'El satélite Gaia de la Agencia Espacial Europea ha rastreado el movimiento exacto de millones de estrellas. Sus datos revelan que aproximadamente una docena de estrellas vagabundas han pasado a menos de unos pocos años luz de nuestro Sol durante el último millón de años, agitando continuamente los cometas remotos.',
  },
  {
    id: 'exploracion-futura',
    title: 'El Futuro de la Exploración',
    color: '#ECEFF1',
    btnImage: '/assets/interestelar/infographic_m5/btn_exploracion-futura.jpg',
    image: '/assets/interestelar/infographic_m5/hero_exploracion-futura.jpg',
    content: [
      'Hasta el día de hoy, ninguna nave espacial robótica humana ha alcanzado la Nube de Oort. Y hay una buena razón científica para esto: está ridículamente lejos en la oscuridad abismal. La sonda New Horizons, que voló más allá de Plutón en 2015 a velocidades récord, tardará siglos largos en rasguñar el borde interior más cercano. Con nuestra actual tecnología de propulsión química tradicional, un viaje hacia ese lugar insondable es prácticamente imposible en el tiempo de vida de un investigador.',
      'Pero los ingenieros espaciales visionarios nunca se rinden ante un desafío notable. Para explorar este congelador primordial, necesitamos sistemas de propulsión nuevos y revolucionarios. Las velas solares, que usan el empuje suave pero constante de los fotones solares para acelerar en el vacío, podrían alcanzar velocidades increíbles. Esto reduciría el viaje tedioso de milenios a tal vez un siglo de espera. Los cohetes de propulsión nuclear o iónicos, que son más eficientes y poderosos, podrían acercar el viaje a márgenes realistas.',
      'Una de las misiones propuestas por los científicos es aprovechar la \"Lente Gravitacional Solar\". La teoría de la relatividad de Einstein nos dice que la masa de nuestro Sol deforma el espacio, doblando la luz de objetos distantes exactamente como una lupa óptica gigantesca. El punto focal preciso de esta lente solar natural asombrosa se encuentra a quinientas cincuenta unidades astronómicas, justo en la frontera de la Nube de Hills interior.',
      'Si logramos enviar un telescopio avanzado hasta esa distancia focal exacta, a más de 50 mil millones de kilómetros del centro, podríamos usar nuestro Sol como el lente primario de un telescopio inmenso. Esto nos permitiría observar nítidamente exoplanetas habitables con resoluciones altísimas sin precedentes. Además, podríamos investigar directamente las profundidades más oscuras de la misma Nube de Oort antigua inexplorada, matando dos pájaros de un solo tiro.',
      'Hasta que esas naves espaciales futuristas se conviertan en una realidad tangible, nuestra mejor y única ventana para estudiar la Nube de Oort continuará siendo la cuidadosa observación espectroscópica detallada de los cometas prístinos. Cada nuevo cometa veloz que es empujado gentilmente hacia el interior de nuestro vecindario es como un mensajero helado y silencioso antiguo, trayendo secretos químicos primordiales desde el confín más oscuro remoto de nuestro vasto imperio solar.'
    ],
    expandables: [
      { label: 'Propulsión Nuclear', icon: 'zap', text: 'La propulsión nuclear térmica audaz usa un reactor de fisión potente para calentar un gas expansivo ligero y expulsarlo por una boquilla de cohete brillante. Podría teóricamente duplicar la eficiencia de empuje y acortar los tiempos de vuelo hacia los rincones más profundos del espacio oscuro.' },
      { label: 'Proyecto Breakthrough Starshot', icon: 'atom', text: 'El proyecto Breakthrough Starshot propone usar lásers de potencia gigavatio basados en tierra para impulsar naves espaciales diminutas acopladas a velas reflectantes delgadas. Las acelerarían a un 20% de la velocidad de la luz. A esa velocidad, cruzarían la Nube de Oort en pocos años.' }
    ],
    fact: 'El concepto de la lente gravitacional solar natural masiva no es ciencia ficción. La NASA y el JPL están estudiando metódicamente conceptos de misiones y sondas ligeras para llevar telescopios de vanguardia a 550 UA para visualizar otros mundos.',
  },
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;
    
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    // Inicializar tamaño y event listener
    resize();
    window.addEventListener('resize', resize);
    
    const w = canvas.width, h = canvas.height;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '179,229,252' : '26,35,126', // Ice blue and deep blue
    }));
    
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08; // slow upward drift
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
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }} />;
}

// â”€â”€â”€ Oort Cloud Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OortCloudHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(179,229,252,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#1A237E','#B3E5FC','#CFD8DC','#6A1B9A','#00695C','#FF8F00','#ECEFF1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#B3E5FC" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="4" fill="#B3E5FC" opacity="0.5" />
        <path d="M 300 16 L 300 44 M 286 30 L 314 30" stroke="#B3E5FC" strokeWidth="1" opacity="0.6" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(179,229,252,0.2)" />
            <stop offset="50%" stopColor="rgba(179,229,252,0.9)" />
            <stop offset="100%" stopColor="rgba(179,229,252,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B3E5FC" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA NUBE DE OORT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(179,229,252,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA FRONTERA DEL SISTEMA SOLAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(179,229,252,0.2)'}`,
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
          layoutId="activeDotOort"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px dashed rgba(255,255,255,0.1)',
            position: 'relative',
            zIndex: 2,
          }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fact Highlight â”€â”€â”€ */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}20, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            padding: '1.2rem',
            borderRadius: '0 12px 12px 0',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: node.color, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fascinante
              </strong>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredNodes, color = '#B3E5FC' }) {
  const progress = (exploredNodes.size / nodes.length) * 100;
  return (
    <div style={{ margin: '2rem auto 0', maxWidth: '300px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '1px' }}>
        <span>PROGRESO DE MISIÓN</span>
        <span>{exploredNodes.size} / {nodes.length} NUBES EXPLORADAS</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM5() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
      setExploredNodes(prev => new Set([...prev, node.id]));
      setTimeout(() => {
        if (containerRef.current) {
          const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0B0E14',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <OortCloudHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '2rem',
          position: 'relative',
          zIndex: 10,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        {/* Active Content Panel */}
        <div ref={containerRef}>
          <AnimatePresence mode="wait">
            {activeNode && (
              <ContentPanel
                key={activeNode.id}
                node={activeNode}
                onClose={() => setActiveNode(null)}
                setLightboxSrc={setLightboxSrc}
              />
            )}
          </AnimatePresence>
        </div>

        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredNodes={exploredNodes} />

        {/* Bibliography Section */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h5 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes Científicas
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', maxWidth: '600px', lineHeight: 1.4 }}>
                {bib}
              </p>
            ))}
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista Ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
