'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Star Wars Themed)
   ========================================================================= */
const DecoStar = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill={color} opacity="0.8"/>
  </svg>
);

const DecoXWing = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M22 12L2 2L4 12L2 22L22 12Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.8"/>
    <path d="M7 7L13 12L7 17" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const DecoPlanet = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="11" ry="3" transform="rotate(-20 12 12)" stroke={color} strokeWidth="2" opacity="0.8"/>
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

const DecoMoon = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" fill="none" opacity="0.8"/>
    <circle cx="9" cy="13" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="14" cy="16" r="1" fill={color} opacity="0.5"/>
    <circle cx="10" cy="8" r="1" fill={color} opacity="0.5"/>
  </svg>
);

const DecoRocket = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2C12 2 4 6 4 14C4 16 3 19 2 21C6 20 9 19 12 18C15 19 18 20 22 21C21 19 20 16 20 14C20 6 12 2 12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" fill="none"/>
    <path d="M12 22L12 18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
  </svg>
);

const DecoMolecule = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="5" cy="5" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="19" cy="5" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="12" cy="20" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <path d="M7 7L10 10" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M17 7L14 10" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M12 15L12 18" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
  </svg>
);

const DECO_MAP = {
  'tatooine-soles': [DecoStar, DecoPlanet, DecoStar],
  'metodo-eclipse': [DecoTelescope, DecoStar, DecoMoon],
  'hoth-hielo': [DecoPlanet, DecoMoon, DecoStar],
  'dagobah-pantano': [DecoMolecule, DecoPlanet, DecoStar],
  'mundos-lava': [DecoPlanet, DecoStar, DecoRocket],
  'trappist-sistema': [DecoPlanet, DecoTelescope, DecoPlanet],
  'busqueda-vida': [DecoMolecule, DecoTelescope, DecoStar],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */
const BIBLIOGRAPHY = [
  "Doyle, L. R. et al. (2011). 'Kepler-16: A Transiting Circumbinary Planet.' Science, 333(6049).",
  "Mayor, M. & Queloz, D. (1995). 'A Jupiter-mass companion to a solar-type star.' Nature, 378.",
  "Gillon, M. et al. (2017). 'Seven temperate terrestrial planets around TRAPPIST-1.' Nature, 542.",
  "Madhusudhan, N. et al. (2023). 'Carbon-bearing molecules in K2-18b atmosphere.' The Astrophysical Journal Letters.",
  "Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space. Random House.",
  "Perryman, M. (2018). The Exoplanet Handbook. Cambridge University Press."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tatooine-soles',
    title: 'Tatooine: Los Dos Soles',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_mundos/btn_tatooine.png',
    image: '/assets/starwars/infographic_mundos/hero_tatooine.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_tatooine.png',
    bannerCaption: 'El doble atardecer de Tatooine — inspirado en el descubrimiento de Kepler-16b',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_atardecer.png', caption: 'Atardecer con dos soles sobre las chozas de Tatooine' },
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_pueblo.png', caption: 'El pueblo de Tatooine bajo los dos soles del desierto' }
    ],
    content: [
      "¿Te imaginas caminar por la calle en un día soleado y tener no una, sino dos sombras detrás de ti? Así sería la vida en un mundo con dos soles. En 2011, los astrónomos descubrieron un planeta real que orbita alrededor de un par de estrellas, igual que el famoso hogar de Luke Skywalker. Este descubrimiento sacudió al mundo científico porque durante décadas se pensó que un planeta no podría mantener una órbita estable alrededor de dos estrellas sin ser expulsado al vacío del espacio.",
      "A estos mundos los llamamos 'planetas circumbinarios', una palabra elegante para decir que viajan en un gran círculo alrededor de dos estrellas que giran juntas en el centro. Las dos estrellas de Kepler-16 se emparejan bailando un vals cósmico, y el planeta las rodea a lo lejos observando el espectáculo. La estrella principal (Kepler-16A) es una enana naranja con un 69% de la masa de nuestro Sol, mientras que su compañera (Kepler-16B) es una enana roja mucho más pequeña, con solo un 20%.",
      "El planeta Kepler-16b es un gigante de gas frío, aproximadamente del tamaño de Saturno pero un poco más denso, lo que sugiere que tiene un núcleo rocoso más grande. Si pudieras flotar en su atmósfera mirando al cielo, verías dos soles diferentes cruzándose y separándose como bailarines en un escenario cósmico. Los científicos calcularon que la temperatura superficial ronda los -73°C, demasiado frío para agua líquida.",
      "Los atardeceres allí serían absolutamente mágicos: los dos soles cruzarían el horizonte en momentos diferentes, creando un espectáculo de colores cambiantes que no existe en ningún otro lugar conocido. Las sombras de los objetos se dividirían en dos y cambiarían de posición a lo largo del año. Aunque este planeta en particular es demasiado frío y gaseoso para albergar vida, nos demuestra que el universo es más asombroso y parecido a la ciencia ficción de lo que imaginábamos.",
      "Desde el descubrimiento de Kepler-16b, los astrónomos han encontrado más de una docena de planetas circumbinarios confirmados, incluyendo Kepler-34b, Kepler-35b y TOI-1338b, este último descubierto en 2020 por un estudiante de 17 años durante sus prácticas de verano en la NASA. Estos hallazgos demuestran que los sistemas con dos soles no son una rareza cósmica, sino que podrían representar hasta el 10% de todos los sistemas planetarios de la Vía Láctea. La pregunta ya no es si existen los mundos con doble atardecer, sino cuántos de ellos podrían albergar condiciones para la vida."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'La escena de Luke Skywalker contemplando el doble atardecer en Tatooine en la película original de 1977 es uno de los momentos más icónicos del cine. Se filmó en Tozeur, Túnez, en el borde del desierto del Sahara, y George Lucas se inspiró en la cercana ciudad tunecina de Tataouine para darle nombre. La música de John Williams en esa escena se llama "Binary Sunset" y es una de las piezas más reconocibles de la historia del cine.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Kepler-16b fue descubierto en 2011 por la misión Kepler de la NASA mediante el método de tránsito, observando cómo la luz de ambas estrellas se atenuaba periódicamente. Los científicos lo apodaron oficialmente "Tatooine" en honor a Star Wars. Tarda 229 días en completar una órbita, y se encuentra a 0.7 unidades astronómicas de sus estrellas, casi a la misma distancia a la que Venus orbita nuestro Sol.' 
      }
    ],
    fact: 'Kepler-16b fue el primer planeta confirmado orbitando dos estrellas, descubierto en 2011. Los científicos lo apodaron oficialmente "Tatooine" en honor a Star Wars. Desde entonces, se han encontrado más de una docena de planetas circumbinarios, demostrando que los mundos con doble sol no son raros en la galaxia.'
  },
  {
    id: 'metodo-eclipse',
    title: 'El Método del Eclipse',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_mundos/btn_eclipse.png',
    image: '/assets/starwars/infographic_mundos/hero_eclipse.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_eclipse.png',
    bannerCaption: 'El telescopio Kepler observó más de 150,000 estrellas buscando mini-eclipses',
    content: [
      "Si estuvieras a kilómetros de distancia mirando una farola gigante, ¿podrías notar si una pequeña hormiga camina frente a la bombilla? Esa es exactamente la difícil tarea que hacen los telescopios espaciales para encontrar exoplanetas. Utilizan algo llamado 'método del tránsito', que consiste en espiar la luz de las estrellas durante meses y meses, buscando parpadeos diminutos que revelen la presencia de un mundo oculto.",
      "Cuando un planeta cruza por delante de su estrella (desde nuestro punto de vista en la Tierra), bloquea una cantidad pequeñísima de luz. ¡Estamos hablando de apenas un 0.01% del brillo total! El brillo de la estrella disminuye un poquito durante unas pocas horas, y luego vuelve a la normalidad. Si ese patrón se repite periódicamente, ¡tenemos un planeta! Es como detectar a alguien que pasa una y otra vez frente a la ventana de un vecino lejano.",
      "El telescopio espacial Kepler fue el campeón indiscutible de esta técnica. Lanzado en 2009 desde Cabo Cañaveral, se quedó mirando fijamente una sola porción del cielo entre las constelaciones de Cisne y Lira, midiendo el brillo de 150,000 estrellas simultáneamente con una precisión asombrosa. Durante sus nueve años de servicio, encontró más de 2,600 exoplanetas confirmados antes de quedarse sin combustible en octubre de 2018.",
      "Otra forma ingeniosa de cazar planetas es 'escuchando' si la estrella se tambalea. Se llama velocidad radial o efecto Doppler. La gravedad del planeta tira un poco de su estrella, haciéndola tambalearse como un trompo a punto de caer. Si la estrella se acerca ligeramente hacia nosotros, su luz se vuelve un poquito más azul; si se aleja, un poquito más roja. Este elegante método llevó al descubrimiento del primer exoplaneta alrededor de una estrella tipo Sol, 51 Pegasi b, en 1995, un hallazgo tan importante que les valió el Premio Nobel de Física.",
      "Y la aventura no se detiene aquí. En diciembre de 2021, la NASA lanzó el Telescopio Espacial James Webb, el observatorio más poderoso jamás construido, con un espejo de oro de 6.5 metros de diámetro plegado como origami dentro de un cohete. El Webb puede analizar la luz que atraviesa las atmósferas de exoplanetas durante un tránsito, descomponiendo esa luz en un arcoíris químico que revela qué moléculas contiene: agua, metano, dióxido de carbono, e incluso posibles señales de vida. Es como leer la receta de un pastel con solo oler el horno desde la calle."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Star Wars, los personajes viajan entre sistemas estelares con facilidad gracias al hiperimpulsor, pero en la realidad detectar planetas a esas distancias es increíblemente difícil. La Alianza Rebelde habría necesitado telescopios como Kepler o el James Webb para encontrar bases habitables ocultas en la galaxia, porque a simple vista las estrellas son solo puntos de luz sin planetas visibles.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Michel Mayor y Didier Queloz, de la Universidad de Ginebra, ganaron el Premio Nobel de Física 2019 por descubrir 51 Pegasi b usando el método Doppler en el Observatorio de Haute-Provence, Francia, en 1995. Hoy en día, instrumentos de nueva generación como ESPRESSO, instalado en el Very Large Telescope en Paranal, Chile, pueden detectar bamboleos tan sutiles como los causados por planetas tan pequeños como la Tierra.' 
      }
    ],
    fact: 'El telescopio espacial Kepler descubrió más de 2,600 exoplanetas confirmados antes de que se agotara su combustible en octubre de 2018. Observó 150,000 estrellas simultáneamente durante nueve años. Su sucesor, TESS (lanzado en 2018), ahora observa el cielo entero buscando mundos aún más cercanos a nosotros.'
  },
  {
    id: 'hoth-hielo',
    title: 'Hoth: Mundos de Hielo',
    color: '#B3E5FC',
    btnImage: '/assets/starwars/infographic_mundos/btn_hoth.png',
    image: '/assets/starwars/infographic_mundos/hero_hoth.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_hoth.png',
    bannerCaption: 'Europa, la luna helada de Júpiter, tiene un océano subterráneo que podría albergar vida',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_hoth_vader.png', caption: 'Vader patrullando las llanuras heladas de Hoth' },
      { src: '/assets/starwars/infographic_mundos/extra_hoth_jinete.png', caption: 'Un jinete solitario sobre las colinas nevadas' }
    ],
    content: [
      "Imagina una pista de patinaje gigante del tamaño de una luna entera, llena de grietas kilométricas y crestas afiladas como cuchillos de hielo. En nuestro propio sistema solar tenemos mundos parecidos al congelado planeta Hoth. La luna Europa, de Júpiter, está cubierta por una corteza de hielo durísima, y su superficie se congela a -160°C. Si pudieras pararte en ella, verías un paisaje blanco y agrietado extendiéndose hasta el horizonte, con el gigantesco Júpiter dominando el cielo.",
      "Pero la verdadera magia ocurre bajo ese hielo. La inmensa gravedad de Júpiter estira y aplasta a Europa como si fuera una pelota antiestrés cósmica. A este fenómeno los científicos lo llaman 'calentamiento mareal'. La fricción constante dentro de la luna genera suficiente calor para derretir el hielo por debajo, formando un gigantesco océano oscuro que contiene el doble de agua que todos los océanos de la Tierra combinados.",
      "Europa no es la única luna con secretos líquidos. Encélado, una pequeña luna de Saturno de apenas 500 km de diámetro, esconde otro océano subterráneo e incluso dispara enormes géiseres de agua salada hacia el espacio a velocidades de 1,400 km/h. La sonda Cassini de la NASA atravesó esas columnas de vapor en 2015, detectando hidrógeno molecular y sílice, ingredientes que en la Tierra se asocian con fuentes hidrotermales donde prospera la vida.",
      "¿Podría haber vida nadando en estos abismos oscuros y helados? Para averiguarlo, la NASA ha lanzado la sonda Europa Clipper en octubre de 2024, la misión más ambiciosa jamás enviada al sistema exterior. Realizará 49 sobrevuelos cercanos a Europa, analizando el grosor del hielo con radar y buscando zonas donde el océano se filtra hacia la superficie. ¡Quizás los verdaderos alienígenas del sistema solar no sean humanoides con espadas láser, sino microbios nadando en un océano que nunca ha visto la luz del sol!",
      "En la Tierra, la vida prospera en condiciones parecidas a las de estos mundos helados. En las profundidades del océano, lejos de toda luz solar, existen las fuentes hidrotermales: chimeneas volcánicas submarinas que escupen agua hirviente rica en minerales. Alrededor de estas 'chimeneas negras' viven gusanos tubulares gigantes, bacterias extremófilas y cangrejos blancos ciegos que obtienen su energía de la química del agua, no del Sol. Si estos ecosistemas pueden prosperar en la oscuridad absoluta de nuestro propio planeta, ¿por qué no podrían existir en los océanos ocultos bajo el hielo de Europa o Encélado?"
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Hoth es donde la Alianza Rebelde estableció la Base Eco en El Imperio Contraataca (1980). Las escenas exteriores se filmaron en Finse, Noruega, a 1,222 metros de altitud, donde la temperatura bajaba a -29°C durante el rodaje. En la ficción, la temperatura en Hoth llega a -60°C, ¡pero la luna Europa es aún más brutal con -160°C! Los Tauntauns, criaturas reptilianas adaptadas al frío, fueron creados con animatrónicos a tamaño real.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Europa tiene más agua líquida bajo su hielo que todos los océanos de la Tierra juntos: se estiman unos 3 × 10¹⁸ metros cúbicos. Su corteza de hielo mide entre 15 y 25 km de grosor, y el océano debajo podría alcanzar hasta 150 km de profundidad. En la Tierra, la Fosa de las Marianas tiene apenas 11 km, así que el océano de Europa sería más de 13 veces más profundo.' 
      }
    ],
    fact: 'Europa tiene más agua líquida bajo su hielo que todos los océanos de la Tierra juntos, unos 3 × 10¹⁸ metros cúbicos. Su océano podría tener 150 km de profundidad, más de 13 veces la Fosa de las Marianas. La sonda Europa Clipper, lanzada en 2024, realizará 49 sobrevuelos para buscar condiciones habitables bajo el hielo.'
  },
  {
    id: 'dagobah-pantano',
    title: 'Dagobah: Pantanos Prehistóricos',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_mundos/btn_dagobah.png',
    image: '/assets/starwars/infographic_mundos/hero_dagobah.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_dagobah.png',
    bannerCaption: 'En el periodo Carbonífero, hace 300 millones de años, la Tierra lucía como Dagobah',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_pantano.png', caption: 'El oscuro pantano de Dagobah bajo la lluvia' },
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_xwing.png', caption: 'El X-Wing de Luke hundido en el pantano de Dagobah' }
    ],
    content: [
      "Si viajaras en el tiempo unos 300 millones de años, aterrizarías en un planeta muy similar al pantanoso exilio de Yoda. La Tierra estaba en pleno período Carbonífero (359-299 millones de años atrás), un mundo cálido y húmedo cubierto por espesos bosques y pantanos impenetrables. No había flores, ni pájaros, ni mamíferos. Solo helechos gigantes, licópodos de 40 metros de alto y el sonido de insectos zumbando entre la niebla.",
      "Durante este período, la atmósfera tenía mucho más oxígeno que hoy. Mientras que ahora respiramos un 21% de oxígeno, en aquel entonces los niveles alcanzaban el 35%, casi el doble. Los científicos descubrieron esto analizando burbujas de aire atrapadas en ámbar fósil. Este exceso de oxígeno provocó un fenómeno sorprendente que habría fascinado a cualquier biólogo: ¡los insectos crecieron a tamaños absolutamente monstruosos!",
      "Imagina libélulas gigantes del género Meganeura con una envergadura de alas de 70 centímetros, volando como si fueran halcones entre los helechos arborescentes. Sus alas transparentes hacían un ruido ensordecedor al batirlas. En el suelo lodoso, arrastrándose entre las raíces sumergidas, había milpiés llamados Arthropleura del tamaño de un coche pequeño, alcanzando los 2.3 metros de largo y medio metro de ancho. Los insectos podían ser tan grandes porque respiraban a través de pequeños tubos (tráqueas), y con tanto oxígeno disponible, hasta los tubos más largos podían funcionar.",
      "Toda esa vegetación muerta se acumuló en los pantanos durante millones de años sin pudrirse del todo, porque las bacterias y hongos de la época aún no habían evolucionado la capacidad de descomponer la lignina, la sustancia dura que da rigidez a la madera. Con el peso y el calor de la Tierra, esa materia orgánica se comprimió hasta convertirse en el carbón mineral que alimentó la Revolución Industrial. ¡El combustible de los primeros trenes y fábricas del siglo XIX viene literalmente de un mundo parecido a Dagobah!",
      "El Carbonífero también nos dejó una lección sobre cómo la atmósfera controla la vida. Cuando el oxígeno subió al 35%, los insectos se hicieron gigantes, pero los incendios forestales se volvieron devastadores: con tanto combustible y tanto oxígeno, enormes regiones ardían durante semanas. Eventualmente, los niveles de oxígeno bajaron de nuevo, los insectos gigantes se extinguieron y los reptiles comenzaron a dominar la Tierra, preparando el escenario para los dinosaurios. Es un recordatorio fascinante de que la composición del aire que respiramos determina qué tipo de criaturas pueden existir en nuestro planeta."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Dagobah aparece en El Imperio Contraataca (1980) como el planeta donde Yoda entrena a Luke Skywalker en los caminos de la Fuerza. Los densos pantanos se crearon con enormes decorados en los estudios Elstree en Borehamwood, Inglaterra. El puppeteer Frank Oz operaba a Yoda desde debajo del set, sumergido en agua cenagosa. Dagobah fue diseñado como un mundo lleno de vida exuberante y salvaje, pero completamente desprovisto de civilización.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'En el Carbonífero, las libélulas gigantes Meganeura podían alcanzar 75 cm de envergadura y los enormes milpiés Arthropleura pesaban hasta 50 kg. El exceso de oxígeno en la atmósfera permitía a sus cuerpos respirar eficientemente a través de pequeños poros llamados espiráculos, permitiéndoles crecer a tamaños gigantescos. Los científicos han recreado estas condiciones en laboratorio, y efectivamente los insectos modernos crecen más en atmósferas enriquecidas con oxígeno.' 
      }
    ],
    fact: 'En el período Carbonífero (359-299 Ma), las libélulas Meganeura tenían 75 cm de envergadura y los milpiés Arthropleura medían 2.3 metros de largo. El oxígeno atmosférico del 35% (vs 21% actual) permitía a los insectos respirar eficientemente a tamaños gigantescos. La materia vegetal acumulada en estos pantanos se convirtió en los depósitos de carbón que alimentaron la Revolución Industrial.'
  },
  {
    id: 'mundos-lava',
    title: 'Mundos de Fuego y Lava',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_mundos/btn_lava.png',
    image: '/assets/starwars/infographic_mundos/hero_lava.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_lava.png',
    bannerCaption: '55 Cancri e: un año dura solo 18 horas y su superficie supera los 2,000°C',
    content: [
      "Hay rincones del universo donde el infierno es un lugar real. Imagina un planeta rocoso que orbita tan cerca de su estrella que su superficie se derrite por completo, convirtiéndose en un océano hirviente de roca fundida color naranja brillante. 55 Cancri e, también conocido como Janssen, es uno de esos terroríficos 'mundos de lava'. Se encuentra a solo 40 años-luz de nosotros, en la constelación de Cáncer, y fue uno de los primeros 'supertierra' descubiertos.",
      "Está tan cerca de su estrella madre que su año completo (una vuelta entera alrededor de la estrella) dura tan solo 18 horas. ¡Podrías celebrar tu cumpleaños todos los días! Pero haría demasiado calor para la fiesta: la temperatura en su cara diurna supera los 2,500°C, suficiente para derretir acero, titanio y prácticamente cualquier metal conocido. Además, siempre muestra la misma cara a su estrella, creando un hemisferio de día eterno y otro de noche perpetua.",
      "El clima en estos planetas es una pesadilla de ciencia ficción que supera cualquier imaginación. En un planeta llamado WASP-76b, situado a 640 años-luz, las nubes están hechas de vapor de hierro. En el lado más caliente (2,400°C), el hierro se evapora como agua en un horno. Cuando vientos huracanados de más de 18,000 km/h llevan ese vapor al lado oscuro y más frío, el hierro se condensa y llueve como gotas de metal líquido incandescente desde las nubes.",
      "Otro planeta aún más extremo, K2-141b, tiene un océano de magma de 100 kilómetros de profundidad y una atmósfera hecha de roca vaporizada. El 'ciclo del agua' en este mundo consiste en roca que se evapora, forma nubes de silicato y luego llueve como lava. Estos mundos ardientes nos dan una ventana al pasado de nuestra propia Tierra hace 4,500 millones de años, cuando nuestro planeta no era más que una enorme bola de fuego y roca recién nacida en el espacio, bombardeada por meteoritos.",
      "Lo más sorprendente es que estos planetas infernales también nos ayudan a entender cómo se forman los mundos habitables. Hace 4,500 millones de años, la Tierra primitiva era prácticamente idéntica a estos mundos de lava. La superficie era un océano de magma cubierto por una atmósfera tóxica de dióxido de carbono y vapor de roca. Fue la lluvia de meteoritos y la desgasificación volcánica las que, a lo largo de cientos de millones de años, crearon los océanos y la atmósfera que eventualmente permitieron la aparición de la vida. Estudiar planetas como 55 Cancri e es como mirar una foto de bebé de nuestro propio mundo."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Mustafar es el planeta volcánico donde Anakin Skywalker y Obi-Wan Kenobi se enfrentan en su épico duelo final en La Venganza de los Sith (2005). Las escenas de lava combinaron efectos prácticos (filmados sobre el volcán Etna en Sicilia) con sofisticados efectos CGI de Industrial Light & Magic. En la realidad, mundos como 55 Cancri e son mucho peores que Mustafar: su superficie entera es un océano de lava sin ninguna isla sólida donde pisar.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En WASP-76b se produce lluvia de hierro líquido, un fenómeno descubierto en marzo de 2020 por el equipo de David Ehrenreich usando el espectrógrafo ESPRESSO en el Very Large Telescope de ESO en Paranal, Chile. Observaron cómo el hierro neutro se detecta abundantemente en el terminador vespertino (frontera día-noche) pero desaparece en el terminador matutino, confirmando que el hierro se condensa y cae como lluvia metálica en el lado nocturno.' 
      }
    ],
    fact: 'En WASP-76b llueve hierro líquido a temperaturas de más de 2,400°C. El hierro se evapora en el lado diurno permanente del planeta y cae como gotas de metal fundido en el lado nocturno oscuro. Este descubrimiento fue publicado en Nature en 2020 por el equipo de David Ehrenreich usando datos del espectrógrafo ESPRESSO en Chile.'
  },
  {
    id: 'trappist-sistema',
    title: 'TRAPPIST-1: Siete Mundos',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_mundos/btn_trappist.png',
    image: '/assets/starwars/infographic_mundos/hero_trappist.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_trappist.png',
    bannerCaption: 'Los siete planetas de TRAPPIST-1 están tan cerca que podrías ver los vecinos en el cielo',
    content: [
      "¿Y si pudieras mirar al cielo nocturno y ver, en lugar de una luna solitaria, otros planetas del tamaño de la Tierra flotando enormes y cercanos entre las nubes? El sistema TRAPPIST-1, descubierto en febrero de 2017 a solo 40 años-luz de distancia en la constelación de Acuario, es como una pequeña familia de mundos unidos alrededor de una fogata estelar tenue pero acogedora. Cuando se anunció su descubrimiento, la noticia se convirtió en trending topic mundial.",
      "La estrella TRAPPIST-1 es una 'enana roja ultrafría', mucho más pequeña, fría y tenue que nuestro Sol. Para hacerte una idea de su tamaño, apenas es un 12% más grande que Júpiter y brilla con solo un 0.05% de la luminosidad solar. Por eso, sus siete planetas rocosos orbitan muy cerquita de ella para mantenerse calientes, todos ellos dentro de una distancia menor que la órbita de Mercurio alrededor de nuestro Sol. Completan una vuelta en apenas 1.5 a 19 días.",
      "Tres de estos siete planetas (llamados TRAPPIST-1e, f y g) se encuentran en la 'zona habitable', también conocida como la 'zona Ricitos de Oro'. Esto significa que no están ni demasiado cerca ni demasiado lejos del calor estelar, justo en el punto perfecto donde el agua líquida podría existir en su superficie, formándose charcos, lagos u océanos. TRAPPIST-1e es especialmente interesante porque tiene una densidad similar a la de la Tierra, sugiriendo que podría tener una composición rocosa con hierro.",
      "Al estar todos tan apretados en un espacio tan pequeño, desde la superficie de uno verías pasar a sus hermanos mayores asomándose enormes entre las nubes, incluso más grandes que nuestra Luna vista desde la Tierra. Los planetas están en resonancia orbital: por cada 8 órbitas del más interno, los demás completan exactamente 5, 3, 2, 3/2, 1 y 3/4 órbitas. El Telescopio Espacial James Webb está actualmente dedicando cientos de horas de observación para 'olfatear' sus atmósferas, buscando señales de agua, dióxido de carbono, metano o cualquier indicio de química biológica.",
      "Sin embargo, la vida en TRAPPIST-1 enfrentaría desafíos únicos. Debido a la cercanía a su estrella, todos los planetas probablemente están en 'acoplamiento de marea', lo que significa que siempre muestran la misma cara a su sol, como nuestra Luna con la Tierra. Esto crearía un hemisferio de día eterno abrasador y otro de noche perpetua congelada. La zona más habitable sería el terminador, la delgada franja entre luz y oscuridad donde las temperaturas podrían ser moderadas. Los científicos especulan que los vientos ecuatoriales podrían redistribuir el calor, creando patrones climáticos completamente alienígenas que no se parecen a nada en nuestro sistema solar."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars tiene cientos de mundos habitables distribuidos por toda la galaxia, desde el desértico Jakku hasta el boscoso Endor. El hallazgo real de siete planetas del tamaño de la Tierra en un solo sistema solar fue extraordinario. Si TRAPPIST-1 estuviera en la galaxia de Star Wars, un salto hiperespacial conectaría sus siete mundos en minutos; en la realidad, la luz tarda apenas 30 minutos en ir del planeta más cercano al más lejano del sistema.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'El sistema fue descubierto inicialmente usando un pequeño telescopio robótico de 60 cm llamado TRAPPIST (TRAnsiting Planets and PlanetesImals Small Telescope) en el Observatorio de La Silla, Chile. Las estrellas enanas rojas, aunque parecen tranquilas, pueden ser temperamentales y lanzar fuertes erupciones de rayos X y ultravioleta (llamadas "flares") que podrían arrancar las atmósferas de sus planetas cercanos. Este es el mayor peligro para la habitabilidad del sistema.' 
      }
    ],
    fact: 'TRAPPIST-1 tiene 7 planetas rocosos del tamaño de la Tierra, el mayor número descubierto en un solo sistema. Tres podrían tener agua líquida (e, f, g). Están a solo 40 años-luz de nosotros, lo suficientemente cerca para que el James Webb pueda analizar sus atmósferas. Sus órbitas están en perfecta resonancia matemática, un fenómeno que fascina a los astrofísicos.'
  },
  {
    id: 'busqueda-vida',
    title: 'La Búsqueda de Vida',
    color: '#4FC3F7',
    btnImage: '/assets/starwars/infographic_mundos/btn_vida.png',
    image: '/assets/starwars/infographic_mundos/hero_vida.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_vida.png',
    bannerCaption: 'El James Webb detectó CO₂ y metano en K2-18b — ¿señales de vida?',
    content: [
      "¿Cómo podemos saber si hay extraterrestres en un planeta a años-luz de distancia sin viajar hasta allá? La respuesta está en la atmósfera. Los telescopios más avanzados del mundo buscan 'biofirmas', que son combinaciones químicas que no deberían existir juntas a menos que algún ser vivo las esté produciendo activamente. Es el equivalente cósmico de buscar huellas en la arena: no necesitas ver al caminante para saber que alguien pasó por ahí.",
      "Es como oler el aroma a sopa de pollo desde el pasillo de un edificio: sabes que alguien está cocinando aunque no veas la cocina ni al cocinero. En la Tierra, la vida produce oxígeno (mediante la fotosíntesis de plantas y algas) y metano (mediante bacterias en los pantanos y en los estómagos de las vacas) constantemente. Si no hubiera seres vivos reponiendo estos gases, el oxígeno y el metano reaccionarían entre sí en unos pocos miles de años y desaparecerían. Su coexistencia es la prueba de que algo vivo los está fabricando.",
      "En septiembre de 2023, el Telescopio Espacial James Webb logró un hito histórico: detectó con éxito dióxido de carbono y metano en la atmósfera de un exoplaneta llamado K2-18b, situado a 124 años-luz de nosotros. Este mundo es un 'hicéano', una supertierra cubierta por un océano profundo con una gruesa atmósfera rica en hidrógeno. Se encuentra en la zona habitable de su estrella enana roja, lo que lo convierte en un candidato extraordinario para buscar química biológica.",
      "¡Tú también puedes ser un descubridor de mundos! Plataformas de ciencia ciudadana como Zooniverse y Planet Hunters TESS permiten a personas de todo el mundo analizar datos reales de telescopios desde su computadora o teléfono móvil, y ya han contribuido al descubrimiento de exoplanetas reales. En el futuro cercano, gigantes como el ELT (Telescopio Extremadamente Grande) en Cerro Armazones, Chile, con su espejo segmentado de 39 metros de diámetro, podrían fotografiar directamente mundos alienígenas y analizar sus atmósferas molécula por molécula.",
      "La carrera por encontrar vida más allá de la Tierra está acelerándose como nunca antes. Además del James Webb y el futuro ELT, nuevas misiones como HWO (Habitable Worlds Observatory) buscarán tomar las primeras fotografías directas de exoplanetas similares a la Tierra y analizar si sus atmósferas contienen las combinaciones químicas que delatan la presencia de biología. Algunos científicos calculan que, si la vida es común en el universo, podríamos tener evidencia firme antes de 2040. Si lo logramos, responderíamos a una pregunta que la humanidad se ha hecho desde que miró al cielo por primera vez: ¿estamos solos?"
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars está repleto de vida alienígena inteligente: Wookiees, Ewoks, Twi\'leks, Hutts, y cientos de especies más pueblan la galaxia. En la realidad, aún no hemos encontrado ninguna evidencia confirmada de vida fuera de la Tierra. Sin embargo, si comprobamos la existencia de biología en mundos como K2-18b, ¡sería el descubrimiento más importante en la historia de la humanidad, mucho más grande que el alunizaje del Apollo 11!' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El oxígeno y el metano reaccionan químicamente entre sí para formar agua y dióxido de carbono. En condiciones normales, sin seres vivos que los repongan, ambos gases desaparecerían de una atmósfera en unos pocos miles de años. Detectarlos simultáneamente en un exoplaneta sería una de las pruebas más fuertes de actividad biológica. Carl Sagan demostró este principio en 1990 cuando la sonda Galileo detectó vida en la Tierra desde el espacio usando exactamente este método.' 
      }
    ],
    fact: 'En septiembre de 2023, el James Webb detectó dióxido de carbono y metano en K2-18b, un exoplaneta oceánico a 124 años-luz en la zona habitable. El equipo de Nikku Madhusudhan (Cambridge) también encontró indicios tentativos de dimetil sulfuro (DMS), una molécula que en la Tierra solo producen organismos marinos. Si se confirma, sería la primera evidencia indirecta de biología extraterrestre.'
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
      
      // Shooting star occasionally
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
        MUNDOS EXTREMOS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        TATOOINE &middot; HOTH &middot; DAGOBAH
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <div key={n.id} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} />
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
      
      {/* Header */}
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
      
      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        {/* Grid Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.7, color: '#B0BEC5', marginTop: '1rem' }}>
              {node.content[1]}
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1A1C29 0%, transparent 20%)' }} />
          </div>
        </div>
        
        {/* Magazine Body */}
        <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', marginBottom: '2.5rem' }}>
            {node.content.slice(2).map((paragraph, idx) => {
              const isWide = idx === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
              return (
                <div key={idx} style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: '-8px', left: '12px',
                    background: node.color, color: '#0B0E2D',
                    fontSize: '0.65rem', fontWeight: 800,
                    padding: '2px 8px', borderRadius: '8px',
                    letterSpacing: '1px',
                  }}>
                    {idx === 0 ? '◆' : '◇'}
                  </div>
                  <p style={{ fontFamily: '"Lora", serif', fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                    {paragraph}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Expandables */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {node.expandables.map((exp, idx) => (
              <ExpandableSection 
                key={idx} 
                data={exp} 
                color={node.color} 
                direction={DIRECTIONS[idx % DIRECTIONS.length]} 
              />
            ))}
          </div>
          
          {/* Banner */}
          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {node.bannerCaption}
                </p>
              )}
            </div>
          )}

          {/* Extra Images Gallery */}
          {node.extraImages && node.extraImages.length > 0 && (
            <div style={{ margin: '1.5rem 0' }}>
              <h4 style={{ fontFamily: '"Oswald", sans-serif', color: node.color, margin: '0 0 1rem 0', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={14} /> GALERÍA DEL PLANETA
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: node.extraImages.length === 1 ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                {node.extraImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: `1px solid ${node.color}30`,
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.caption || ''}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,12,30,0.7) 100%)' }} />
                    {img.caption && (
                      <p style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.8)',
                        margin: 0,
                        fontStyle: 'italic',
                        padding: '0 0.5rem',
                        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                      }}>
                        {img.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Fact Box */}
          <div style={{ 
            background: `linear-gradient(135deg, ${node.color}11, ${node.color}33)`, 
            padding: '1.5rem', 
            borderRadius: '12px',
            borderLeft: `4px solid ${node.color}`,
            marginTop: '2rem'
          }}>
            <h4 style={{ fontFamily: '"Oswald", sans-serif', color: node.color, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} /> FACTO FASCINANTE
            </h4>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', color: '#FFF', margin: 0, fontStyle: 'italic' }}>
              {node.fact}
            </p>
          </div>
          
          {/* Next Button */}
          {!isLast && mounted && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                style={{
                  background: node.color,
                  color: '#000',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontFamily: '"Oswald", sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 4px 15px ${node.color}55`
                }}
              >
                Siguiente Destino <ChevronRight size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ total, visitedCount }) => {
  const percentage = Math.round((visitedCount / total) * 100);
  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto', zIndex: 10, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#B0BEC5', fontFamily: '"Oswald", sans-serif', fontSize: '0.9rem' }}>
        <span>Progreso Galáctico</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ height: '8px', background: '#2A2D3E', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #64B5F6, #FFB74D)', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default function InteractiveInfographic_SwSec2() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const handleNodeClick = (node) => {
    setActiveNodeId(node.id);
    if (!visitedNodes.includes(node.id)) {
      setVisitedNodes(prev => [...prev, node.id]);
    }
  };
  
  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      handleNodeClick(INFOGRAPHIC_NODES[currentIndex + 1]);
    } else {
      setActiveNodeId(null);
    }
  };
  
  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);
  const isComplete = visitedNodes.length === INFOGRAPHIC_NODES.length;
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0c1e',
      position: 'relative',
      overflow: activeNodeId ? 'hidden' : 'auto',
      padding: '3rem 1rem',
      fontFamily: '"Lora", serif',
      color: '#FFF'
    }}>
      <StarField />
      
      {/* Background image overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/assets/starwars/infographic_mundos/bg_mundos.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNodeId} />
        
        {/* Node Flow (Curved layout representation) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '2rem', 
          margin: '4rem 0',
          position: 'relative'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              <NodeButton 
                node={node} 
                isVisited={(id) => visitedNodes.includes(id)}
                onClick={handleNodeClick}
              />
              {activeNodeId === node.id && (
                <motion.div
                  layoutId="activeDotSwSec2"
                  style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    marginLeft: '-4px',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: node.color,
                    boxShadow: `0 0 10px ${node.color}`
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <ProgressBar total={INFOGRAPHIC_NODES.length} visitedCount={visitedNodes.length} />
        
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              textAlign: 'center', 
              marginTop: '3rem', 
              padding: '2rem', 
              background: 'rgba(255, 183, 77, 0.1)', 
              borderRadius: '16px',
              border: '1px solid rgba(255, 183, 77, 0.3)'
            }}
          >
            <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#FFB74D', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
              ¡MÓDULO COMPLETADO!
            </h3>
            <p style={{ color: '#E0E0E0', margin: 0 }}>Has explorado todos los mundos extremos. ¡La galaxia ya no tiene secretos para ti!</p>
          </motion.div>
        )}
        
        {/* Bibliography */}
        <div style={{ marginTop: '5rem', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#64B5F6', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DecoTelescope size={20} color="#64B5F6" /> ARCHIVOS JEDI (Bibliografía)
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {BIBLIOGRAPHY.map((bib, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: '#78909C', lineHeight: 1.5, position: 'relative', paddingLeft: '1rem' }}>
                <span style={{ position: 'absolute', left: 0, top: '0.3rem', width: 4, height: 4, borderRadius: '50%', background: '#64B5F6' }} />
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <AnimatePresence>
        {activeNodeId && (
          <ContentPanel 
            setLightboxSrc={setLightboxSrc}
            node={activeNode} 
            onClose={() => setActiveNodeId(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
