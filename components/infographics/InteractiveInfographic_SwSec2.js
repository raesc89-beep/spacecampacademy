'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

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
    content: [
      "¿Te imaginas caminar por la calle en un día soleado y tener no una, sino dos sombras detrás de ti? Así sería la vida en un mundo con dos soles. En 2011, los astrónomos descubrieron un planeta real que orbita alrededor de un par de estrellas, igual que el famoso hogar de Luke Skywalker.",
      "A estos mundos los llamamos 'planetas circumbinarios', una palabra elegante para decir que viajan en un gran círculo alrededor de dos estrellas que giran juntas en el centro. Las dos estrellas de Kepler-16 se emparejan bailando un vals cósmico, y el planeta las rodea a lo lejos observando el espectáculo.",
      "El planeta Kepler-16b es un gigante de gas frío, aproximadamente del tamaño de Saturno. Si pudieras flotar en su atmósfera mirando al cielo, verías dos soles diferentes. Uno es más grande y brillante (Kepler-16A), y el otro es más pequeño y rojizo (Kepler-16B).",
      "Los atardeceres allí serían mágicos: los dos soles cruzarían el horizonte en momentos diferentes y cambiarían de posición a lo largo del año. Aunque este planeta en particular es demasiado frío y gaseoso para albergar vida, nos demuestra que el universo es más asombroso y parecido a la ciencia ficción de lo que imaginábamos."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'La escena de Luke Skywalker contemplando el doble atardecer en Tatooine en la película original de 1977 es uno de los momentos más icónicos del cine. Se filmó en Túnez, en el desierto del Sahara, y George Lucas se inspiró en la ciudad tunecina de Tataouine para darle nombre.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Kepler-16b fue descubierto en 2011 por la misión Kepler de la NASA. Los científicos lo apodaron oficialmente "Tatooine" en honor a Star Wars. Tarda 229 días en orbitar sus dos estrellas, casi a la misma distancia a la que Venus orbita nuestro Sol.' 
      }
    ],
    fact: 'Kepler-16b fue el primer planeta confirmado orbitando dos estrellas. Los científicos lo apodaron oficialmente "Tatooine" en honor a Star Wars.'
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
      "Si estuvieras a kilómetros de distancia mirando una farola gigante, ¿podrías notar si una pequeña hormiga camina frente a la bombilla? Esa es la difícil tarea que hacen los telescopios espaciales para encontrar exoplanetas. Utilizan algo llamado 'método del tránsito'.",
      "Cuando un planeta cruza por delante de su estrella (desde nuestro punto de vista en la Tierra), bloquea una cantidad pequeñísima de luz. El brillo de la estrella disminuye un poquito por unas horas. ¡Ese mini-eclipse nos dice que hay un planeta ahí!",
      "El telescopio espacial Kepler fue el campeón de esta técnica. Lanzado en 2009, se quedó mirando fijamente una sola porción del cielo, midiendo el brillo de 150,000 estrellas simultáneamente. Encontró más de 2,600 exoplanetas antes de quedarse sin combustible.",
      "Otra forma de cazar planetas es 'escuchando' si la estrella se tambalea. Se llama velocidad radial o efecto Doppler. La gravedad del planeta tira un poco de su estrella, haciéndola tambalearse como un trompo a punto de caer. Este método llevó al descubrimiento de 51 Pegasi b en 1995, ganando un Premio Nobel."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Star Wars, los personajes viajan entre sistemas estelares con facilidad, pero en la realidad detectar planetas es increíblemente difícil. La Alianza Rebelde habría necesitado telescopios como Kepler para encontrar bases habitables ocultas en la galaxia.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Michel Mayor y Didier Queloz ganaron el Premio Nobel de Física 2019 por descubrir 51 Pegasi b usando el método Doppler. Hoy en día, instrumentos como ESPRESSO en Chile pueden detectar bamboleos causados por planetas tan pequeños como la Tierra.' 
      }
    ],
    fact: 'El telescopio Kepler descubrió más de 2,600 exoplanetas antes de que se agotara su combustible en 2018. ¡Observó 150,000 estrellas a la vez!'
  },
  {
    id: 'hoth-hielo',
    title: 'Hoth: Mundos de Hielo',
    color: '#B3E5FC',
    btnImage: '/assets/starwars/infographic_mundos/btn_hoth.png',
    image: '/assets/starwars/infographic_mundos/hero_hoth.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_hoth.png',
    bannerCaption: 'Europa, la luna helada de Júpiter, tiene un océano subterráneo que podría albergar vida',
    content: [
      "Imagina una pista de patinaje gigante del tamaño de una luna entera, llena de grietas y crestas afiladas. En nuestro propio sistema solar tenemos mundos parecidos al congelado planeta Hoth. La luna Europa, de Júpiter, está cubierta por una corteza de hielo durísima, y su superficie se congela a -160°C.",
      "Pero la verdadera magia ocurre bajo ese hielo. La inmensa gravedad de Júpiter estira y aplasta a Europa como si fuera una pelota antiestrés. Esta fricción constante genera calor en el interior de la luna, derritiendo el hielo por debajo y formando un gigantesco océano oscuro.",
      "Europa no es la única. Encélado, una pequeña luna de Saturno, esconde otro océano e incluso dispara enormes géiseres de agua salada hacia el espacio. Las naves espaciales han atravesado esas columnas de agua probando su composición química desde lejos.",
      "¿Podría haber vida nadando en estos abismos oscuros? Para averiguarlo, la NASA ha enviado la sonda Europa Clipper (lanzada en 2024). Analizará el hielo y buscará zonas donde el océano se filtra hacia arriba. ¡Quizás los verdaderos alienígenas del sistema solar sean peces extraterrestres bajo el hielo!"
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Hoth es donde la Alianza Rebelde estableció la Base Eco en El Imperio Contraataca (1980). Las escenas se filmaron en Finse, Noruega. La temperatura en Hoth se describe de -60°C, ¡pero Europa es aún más fría con -160°C! Los Tauntauns son criaturas reptilianas adaptadas a ese frío extremo.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Europa tiene más agua líquida bajo su hielo que todos los océanos de la Tierra juntos. Se estima que su corteza de hielo mide unos 15-25 km de grosor, y el océano debajo podría alcanzar hasta 150 km de profundidad.' 
      }
    ],
    fact: 'Europa tiene más agua líquida bajo su hielo que todos los océanos de la Tierra juntos. ¡Su océano podría tener 150 km de profundidad!'
  },
  {
    id: 'dagobah-pantano',
    title: 'Dagobah: Pantanos Prehistóricos',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_mundos/btn_dagobah.png',
    image: '/assets/starwars/infographic_mundos/hero_dagobah.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_dagobah.png',
    bannerCaption: 'En el periodo Carbonífero, hace 300 millones de años, la Tierra lucía como Dagobah',
    content: [
      "Si viajaras en el tiempo unos 300 millones de años, aterrizarías en un planeta muy similar al pantanoso exilio de Yoda. La Tierra estaba en pleno período Carbonífero, un mundo cálido y húmedo cubierto por espesos bosques y pantanos impenetrables.",
      "Durante este período, la atmósfera tenía mucho más oxígeno que hoy. Mientras que ahora respiramos un 21% de oxígeno, en aquel entonces los niveles alcanzaban el 35%. Esto provocó un fenómeno sorprendente: ¡los insectos crecieron a tamaños monstruosos!",
      "Imagina libélulas gigantes con una envergadura de alas de 70 centímetros, volando como si fueran halcones entre los helechos arborescentes. En el suelo lodoso, arrastrándose entre las raíces, había milpiés del tamaño de un coche pequeño, alcanzando los 2 metros de largo.",
      "Toda esa vegetación muerta se acumuló en los pantanos durante millones de años sin pudrirse del todo. Con el peso y el calor de la Tierra, se comprimió hasta convertirse en el carbón que hoy utilizamos. ¡El combustible de nuestros trenes antiguos viene de un mundo parecido a Dagobah!"
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Dagobah aparece en El Imperio Contraataca como el planeta donde Yoda entrena a Luke. Los densos pantanos se crearon con decorados en los estudios Elstree en Inglaterra. Dagobah está lleno de vida exuberante y salvaje, pero sin habitantes civilizados.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'En el Carbonífero, las libélulas gigantes llamadas Meganeura y los enormes milpiés Arthropleura gobernaban los bosques. El exceso de oxígeno en la atmósfera permitía a sus cuerpos respirar a través de pequeños poros, permitiéndoles crecer a tamaños gigantescos.' 
      }
    ],
    fact: 'En el Carbonífero, las libélulas tenían 70 cm de envergadura y los milpiés medían más de 2 metros. ¡El oxígeno extra los hacía crecer enormes!'
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
      "Hay rincones del universo donde el infierno es un lugar real. Imagina un planeta rocoso que orbita tan cerca de su estrella que su superficie se derrite, convirtiéndose en un océano hirviente de roca fundida. 55 Cancri e es uno de esos terroríficos 'mundos de lava'.",
      "Está tan cerca de su estrella madre que su año (una vuelta completa) dura tan solo 18 horas. ¡Podrías celebrar tu cumpleaños todos los días! Pero haría demasiado calor para celebrarlo, ya que la temperatura supera los 2,000°C, suficiente para derretir metales.",
      "El clima en estos planetas es una pesadilla de ciencia ficción. En un planeta llamado WASP-76b, las nubes son de vapor de hierro. En el lado más caliente, el hierro se evapora, y cuando los vientos huracanados lo llevan al lado oscuro y más frío, llueve metal líquido.",
      "Otro planeta, K2-141b, tiene un océano de magma que alcanza los 100 kilómetros de profundidad. Estos mundos ardientes nos muestran cómo fue nuestra propia Tierra hace 4,500 millones de años, cuando no era más que una enorme bola de fuego y roca recién nacida en el espacio."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Mustafar es el planeta volcánico donde Anakin y Obi-Wan se enfrentan en La Venganza de los Sith (2005). Las escenas de lava utilizaron efectos prácticos combinados con CGI. En la realidad, mundos como 55 Cancri e son mucho peores: su superficie entera es lava.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En WASP-76b se produce lluvia de hierro. Esto fue descubierto en 2020 con el instrumento ESPRESSO en Chile, observando cómo el hierro se evapora en el día eterno del planeta y cae como gotas de metal en la noche oscura y ventosa.' 
      }
    ],
    fact: 'En WASP-76b llueve hierro líquido. El hierro se evapora en el lado caliente y cae como gotas de metal fundido en el lado oscuro.'
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
      "¿Y si pudieras mirar al cielo nocturno y ver, en lugar de una luna, otros planetas del tamaño de la Tierra flotando cerca? El sistema TRAPPIST-1, descubierto en 2017 a solo 40 años-luz de distancia, es como una pequeña familia de mundos unidos alrededor de una fogata estelar.",
      "Esta estrella es una 'enana roja', mucho más pequeña, fría y tenue que nuestro Sol (apenas más grande que Júpiter). Por eso, sus siete planetas rocosos orbitan muy cerquita de ella para mantenerse calientes. Completan una vuelta en apenas 1.5 a 19 días.",
      "Tres de estos siete planetas se encuentran en la 'zona habitable'. Esto significa que no están ni muy cerca ni muy lejos del calor estelar, justo en el punto perfecto donde el agua líquida podría existir en su superficie, formándose charcos, lagos u océanos.",
      "Al estar todos tan apretados, desde la superficie de uno verías pasar a sus hermanos mayores asomándose enormes entre las nubes. Actualmente, telescopios potentes como el James Webb están intentando 'olfatear' sus atmósferas para ver si esconden señales de agua o nubes."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars tiene cientos de mundos habitables por toda la galaxia. El hallazgo de siete planetas del tamaño de la Tierra en un solo sistema solar (TRAPPIST-1) fue muy emocionante. Si estuvieran en Star Wars, un salto hiperespacial los conectaría en minutos.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Se descubrió utilizando un pequeño telescopio llamado TRAPPIST en Chile. Las estrellas enanas rojas, aunque frías, pueden ser temperamentales y lanzar fuertes erupciones que podrían dañar las atmósferas de sus planetas cercanos.' 
      }
    ],
    fact: 'TRAPPIST-1 tiene 7 planetas rocosos del tamaño de la Tierra. Tres podrían tener agua líquida. Están a solo 40 años-luz de nosotros.'
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
      "¿Cómo podemos saber si hay extraterrestres en un planeta sin viajar hasta allá? La respuesta está en la atmósfera. Los telescopios buscan 'biofirmas', que son combinaciones químicas que no deberían existir juntas a menos que algún ser vivo las esté produciendo.",
      "Es como oler el aroma a sopa de pollo desde el pasillo: sabes que alguien está cocinando aunque no veas la cocina. En la Tierra, la vida produce oxígeno y metano constantemente. Si no hubiera plantas y microbios, esos gases desaparecerían por reacciones químicas.",
      "En 2023, el Telescopio Espacial James Webb detectó con éxito dióxido de carbono y metano en la atmósfera de un exoplaneta llamado K2-18b. Este mundo oceánico en la zona habitable es un excelente candidato para seguir investigando si posee química biológica.",
      "¡Tú también puedes ser un descubridor! Plataformas como Zooniverse permiten a ciudadanos de todo el mundo analizar datos reales de telescopios desde su computadora. En el futuro, gigantes como el ELT (Telescopio Extremadamente Grande) en Chile, con su espejo de 39 metros, podrían fotografiar directamente mundos alienígenas."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars está repleto de vida alienígena, desde Wookiees hasta Ewoks. En la realidad, aún no hemos encontrado vida fuera de la Tierra. Sin embargo, si comprobamos la existencia de biología en mundos como K2-18b, ¡sería el descubrimiento de la historia!' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El oxígeno y el metano reaccionan entre sí para formar agua y dióxido de carbono. En la Tierra, existen juntos porque los seres vivos los reponen constantemente. Detectar ambos gases en un exoplaneta sería una de las mejores pistas de vida.' 
      }
    ],
    fact: 'En 2023, el James Webb detectó dióxido de carbono y metano en K2-18b, un exoplaneta en zona habitable. Es exactamente lo que los científicos buscaban.'
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

const ContentPanel = ({ node, onClose, onNext, isLast }) => {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
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
            <img src={node.image} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1A1C29 0%, transparent 20%)' }} />
          </div>
        </div>
        
        {/* Magazine Body */}
        <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            {node.content.slice(2).map((paragraph, idx) => (
              <p key={idx} style={{ fontFamily: '"Lora", serif', fontSize: '1.05rem', lineHeight: 1.7, color: '#CFD8DC', margin: 0 }}>
                {paragraph}
              </p>
            ))}
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
                   style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {node.bannerCaption}
                </p>
              )}
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
            node={activeNode} 
            onClose={() => setActiveNodeId(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
