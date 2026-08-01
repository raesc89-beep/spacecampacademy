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
    bannerCaption: 'El doble atardecer de Tatooine â€” inspirado en Kepler-16b',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_atardecer.png', caption: 'Atardecer con dos soles sobre Tatooine' },
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_pueblo.png', caption: 'El pueblo de Tatooine bajo dos soles' }
    ],
    content: [
      "¿Te imaginas tener dos sombras detrás de ti? Así sería la vida en un mundo con dos soles. En 2011, los astrónomos descubrieron un planeta real que orbita un par de estrellas. Esto sacudió a la ciencia. Se pensaba que un planeta no podría mantener una órbita estable alrededor de dos estrellas sin ser expulsado.",
      "A estos mundos los llamamos 'planetas circumbinarios'. Viajan en un gran círculo alrededor de dos estrellas que giran en el centro. Las estrellas de Kepler-16 giran juntas, y el planeta las rodea a lo lejos. La estrella principal es una enana naranja. Su compañera es una enana roja más pequeña.",
      "El planeta Kepler-16b es un gigante de gas. Es del tamaño de Saturno pero más denso. Esto sugiere que tiene un núcleo rocoso. Si flotaras en su atmósfera, verías dos soles diferentes cruzándose. Los científicos calcularon que su temperatura superficial es de -73°C, demasiado frío para el agua líquida.",
      "Los atardeceres allí serían distintos. Los soles cruzarían el horizonte en momentos diferentes. Las sombras se dividirían en dos y cambiarían de posición durante el año. Aunque este planeta es demasiado frío para la vida, demuestra que el universo es más asombroso de lo que imaginábamos.",
      "Los astrónomos han encontrado más de una docena de planetas circumbinarios confirmados. Entre ellos están Kepler-34b y TOI-1338b. Este último fue descubierto en 2020 por un estudiante en la NASA. Estos sistemas no son raros. Podrían representar el 10% de los sistemas planetarios en la Vía Láctea."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'La escena de Luke Skywalker contemplando el doble atardecer en 1977 es un momento icónico. Se filmó en Túnez, cerca del desierto del Sahara. George Lucas se inspiró en la ciudad de Tataouine para darle nombre. La música de John Williams en esa escena se llama "Binary Sunset".' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Kepler-16b fue descubierto en 2011 por la misión Kepler. Usaron el método de tránsito, observando cómo la luz se atenuaba periódicamente. Tarda 229 días en completar una órbita. Se encuentra a 0.7 unidades astronómicas de sus estrellas.' 
      }
    ],
    fact: 'Kepler-16b fue el primer planeta confirmado orbitando dos estrellas. Los científicos lo apodaron "Tatooine". Se han encontrado más planetas circumbinarios, demostrando que los mundos con doble sol son comunes.'
  },
  {
    id: 'metodo-eclipse',
    title: 'El Método del Eclipse',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_mundos/btn_eclipse.png',
    image: '/assets/starwars/infographic_mundos/hero_eclipse.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_eclipse.png',
    bannerCaption: 'El telescopio Kepler observó más de 150,000 estrellas.',
    content: [
      "¿Podrías notar a lo lejos si una hormiga camina frente a una farola? Esa es la tarea de los telescopios espaciales para encontrar exoplanetas. Utilizan el 'método del tránsito'. Consiste en observar la luz de las estrellas buscando parpadeos que revelen un planeta oculto.",
      "Cuando un planeta cruza frente a su estrella, bloquea una cantidad de luz. Puede ser apenas un 0.01% del brillo total. El brillo disminuye un poco durante unas horas y luego vuelve a la normalidad. Si ese patrón se repite periódicamente, tenemos un planeta.",
      "El telescopio Kepler fue el campeón de esta técnica. Fue lanzado en 2009. Se quedó mirando una porción del cielo, midiendo el brillo de 150,000 estrellas con gran precisión. Durante nueve años, encontró más de 2,600 exoplanetas confirmados antes de quedarse sin combustible.",
      "Otra forma de cazar planetas es observar si la estrella se tambalea. Se llama velocidad radial. La gravedad del planeta tira de su estrella, haciéndola tambalear. Si la estrella se acerca, su luz se vuelve más azul. Si se aleja, se vuelve más roja. Este método permitió descubrir 51 Pegasi b en 1995.",
      "La aventura continúa con el Telescopio Espacial James Webb, lanzado en 2021. Este observatorio puede analizar la luz que atraviesa las atmósferas de exoplanetas. Descompone la luz para revelar moléculas como agua, metano o dióxido de carbono. Es como leer los ingredientes de un alimento a distancia."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Star Wars, los personajes viajan entre sistemas estelares con facilidad. En la realidad, detectar planetas a esas distancias es difícil. A simple vista, las estrellas son solo puntos de luz sin planetas visibles.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Michel Mayor y Didier Queloz ganaron el Premio Nobel de Física 2019. Descubrieron 51 Pegasi b usando el método Doppler. Hoy en día, instrumentos como ESPRESSO en Chile pueden detectar bamboleos causados por planetas pequeños.' 
      }
    ],
    fact: 'El telescopio Kepler descubrió más de 2,600 exoplanetas confirmados. Observó 150,000 estrellas simultáneamente durante nueve años. Su sucesor, TESS, ahora observa el cielo entero.'
  },
  {
    id: 'hoth-hielo',
    title: 'Hoth: Mundos de Hielo',
    color: '#B3E5FC',
    btnImage: '/assets/starwars/infographic_mundos/btn_hoth.png',
    image: '/assets/starwars/infographic_mundos/hero_hoth.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_hoth.png',
    bannerCaption: 'Europa tiene un océano subterráneo que podría albergar vida.',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_hoth_vader.png', caption: 'Vader en las llanuras heladas' },
      { src: '/assets/starwars/infographic_mundos/extra_hoth_jinete.png', caption: 'Un jinete sobre las colinas nevadas' }
    ],
    content: [
      "Imagina una pista de hielo gigante del tamaño de una luna. En nuestro sistema solar tenemos mundos parecidos a Hoth. La luna Europa de Júpiter está cubierta por una corteza de hielo. Su superficie se congela a -160°C. Presenta grietas kilométricas y crestas afiladas.",
      "La magia ocurre bajo ese hielo. La gravedad de Júpiter estira y aplasta a Europa. Este calentamiento mareal genera fricción dentro de la luna. El calor derrite el hielo por debajo, formando un océano subterráneo. Contiene el doble de agua que todos los océanos de la Tierra.",
      "Europa no es la única luna con agua líquida. Encélado, una luna de Saturno, esconde otro océano. Dispara enormes géiseres hacia el espacio a 1,400 km/h. La sonda Cassini de la NASA atravesó esas columnas de vapor en 2015. Detectó moléculas asociadas con fuentes hidrotermales.",
      "Para buscar vida en estos abismos, la NASA lanzó la sonda Europa Clipper en 2024. Analizará el grosor del hielo con radar y buscará zonas donde el agua se filtra a la superficie. Los verdaderos alienígenas del sistema solar podrían ser microbios nadando en ese océano.",
      "En la Tierra, la vida prospera en condiciones parecidas. Las fuentes hidrotermales en el fondo del océano albergan gusanos, bacterias y cangrejos ciegos. Obtienen energía de la química del agua, no del Sol. Estos ecosistemas demuestran que la vida podría existir en Europa o Encélado."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Hoth es donde la Alianza Rebelde estableció la Base Eco. Las escenas exteriores se filmaron en Noruega, a -29°C. En Hoth, la temperatura llega a -60°C. La luna Europa es aún más fría con -160°C.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Europa tiene más agua líquida que todos los océanos de la Tierra juntos. Su corteza de hielo mide entre 15 y 25 km de grosor. El océano debajo podría alcanzar 150 km de profundidad.' 
      }
    ],
    fact: 'Europa tiene más agua líquida que la Tierra. Su océano podría tener 150 km de profundidad. La sonda Europa Clipper realizará 49 sobrevuelos para buscar condiciones habitables.'
  },
  {
    id: 'dagobah-pantano',
    title: 'Dagobah: Pantanos Prehistóricos',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_mundos/btn_dagobah.png',
    image: '/assets/starwars/infographic_mundos/hero_dagobah.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_dagobah.png',
    bannerCaption: 'En el Carbonífero, la Tierra lucía como Dagobah.',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_pantano.png', caption: 'El pantano oscuro bajo la lluvia' },
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_xwing.png', caption: 'El X-Wing hundido en el pantano' }
    ],
    content: [
      "Hace 300 millones de años, la Tierra era similar al planeta pantanoso de Yoda. Estábamos en el período Carbonífero. Era un mundo cálido y húmedo cubierto por bosques y pantanos. No había flores ni mamíferos, solo helechos gigantes y grandes insectos.",
      "Durante ese período, la atmósfera tenía un 35% de oxígeno, casi el doble que hoy. Los científicos descubrieron esto analizando burbujas de aire en ámbar fósil. Este exceso de oxígeno permitió que los insectos crecieran a tamaños enormes.",
      "Las libélulas del género Meganeura tenían una envergadura de alas de 70 centímetros. En el suelo lodoso había milpiés del tamaño de un coche pequeño, alcanzando 2.3 metros de largo. Respiraban a través de tubos pequeños, un proceso facilitado por la abundancia de oxígeno.",
      "La vegetación muerta se acumuló en los pantanos durante millones de años sin pudrirse del todo. Las bacterias y hongos aún no podían descomponer la madera rígida. Esa materia orgánica se comprimió hasta convertirse en el carbón mineral que alimentó la Revolución Industrial.",
      "El Carbonífero muestra cómo la atmósfera controla la vida. Con mucho oxígeno, los insectos fueron gigantes, pero los incendios forestales fueron devastadores. Con el tiempo, los niveles de oxígeno bajaron. Los insectos gigantes se extinguieron y los reptiles comenzaron a dominar la Tierra."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Dagobah es el planeta donde Yoda entrena a Luke Skywalker. Los pantanos se crearon con decorados en estudios de Inglaterra. Fue diseñado como un mundo salvaje y desprovisto de civilización.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'En el Carbonífero, las libélulas gigantes alcanzaban 75 cm de envergadura. Los milpiés pesaban hasta 50 kg. El exceso de oxígeno atmosférico les permitía respirar eficientemente. En laboratorio, los insectos modernos también crecen más con oxígeno extra.' 
      }
    ],
    fact: 'En el período Carbonífero, las libélulas tenían 75 cm de envergadura y los milpiés medían 2.3 metros. El oxígeno del 35% permitía estos tamaños. La vegetación de esos pantanos se convirtió en carbón mineral.'
  },
  {
    id: 'mundos-lava',
    title: 'Mundos de Fuego y Lava',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_mundos/btn_lava.png',
    image: '/assets/starwars/infographic_mundos/hero_lava.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_lava.png',
    bannerCaption: '55 Cancri e: su superficie supera los 2,000°C.',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_duel_1.png', caption: 'Duelo épico en Mustafar' },
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_duel_2.png', caption: 'Cruce de sables sobre magma ardiente' },
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_sector.png', caption: 'El planeta volcánico de la galaxia' }
    ],
    content: [
      "Imagina un planeta rocoso que orbita tan cerca de su estrella que su superficie se derrite por completo. 55 Cancri e es un mundo de lava a 40 años-luz de nosotros. Fue una de las primeras supertierras descubiertas.",
      "Su año completo dura solo 18 horas porque orbita muy cerca de su estrella. La temperatura en su cara diurna supera los 2,500°C. Esto puede derretir metales como acero y titanio. Siempre muestra la misma cara a su estrella.",
      "El clima en estos planetas es extremo. En WASP-76b, a 640 años-luz, las nubes son de vapor de hierro. El hierro se evapora en el lado caliente y viaja al lado frío. Allí se condensa y llueve como gotas de metal líquido.",
      "Otro planeta, K2-141b, tiene un océano de magma de 100 kilómetros de profundidad. Su atmósfera es de roca vaporizada. La roca se evapora, forma nubes y luego llueve como lava. Estos mundos ardientes nos muestran cómo fue la Tierra hace 4,500 millones de años.",
      "Estos planetas nos ayudan a entender la formación de los mundos habitables. La Tierra primitiva también fue un océano de magma con una atmósfera tóxica. La lluvia de meteoritos y los volcanes crearon los océanos que permitieron la vida."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Mustafar es el planeta volcánico donde Anakin y Obi-Wan se enfrentan. Las escenas combinaron efectos prácticos y digitales. En la realidad, mundos como 55 Cancri e son mucho más extremos, con océanos de lava globales.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En WASP-76b llueve hierro líquido. Este fenómeno fue descubierto en 2020 por científicos usando el instrumento ESPRESSO en Chile. El hierro se evapora de día y se condensa en la zona nocturna más fría.' 
      }
    ],
    fact: 'En WASP-76b llueve hierro líquido a más de 2,400°C. Este descubrimiento se publicó en 2020 usando datos del espectrógrafo ESPRESSO en Chile.'
  },
  {
    id: 'trappist-sistema',
    title: 'TRAPPIST-1: Siete Mundos',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_mundos/btn_trappist.png',
    image: '/assets/starwars/infographic_mundos/hero_trappist.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_trappist.png',
    bannerCaption: 'Los planetas de TRAPPIST-1 están muy cerca unos de otros.',
    content: [
      "El sistema TRAPPIST-1 fue descubierto en 2017 a 40 años-luz de distancia. Es una familia de mundos unidos alrededor de una estrella tenue. El anuncio de su hallazgo captó la atención mundial en astronomía.",
      "La estrella TRAPPIST-1 es una enana roja ultrafría. Es solo un 12% más grande que Júpiter y su brillo es mínimo. Sus siete planetas rocosos orbitan muy cerca para mantenerse cálidos. Completan una órbita en periodos de 1.5 a 19 días.",
      "Tres de estos planetas están en la zona habitable. En esta zona, el agua líquida podría existir en la superficie. TRAPPIST-1e es de especial interés porque tiene una densidad similar a la Tierra, sugiriendo una composición rocosa.",
      "Al estar tan cerca, desde la superficie de un planeta podrías ver a los otros. Aparecerían en el cielo más grandes que nuestra Luna. Los planetas están en resonancia orbital matemática. El telescopio James Webb está analizando sus atmósferas.",
      "Sin embargo, los planetas enfrentan desafíos. Probablemente están en acoplamiento de marea, mostrando siempre la misma cara a su sol. Esto crea un lado diurno abrasador y uno nocturno helado. La zona más habitable sería la franja entre luz y oscuridad."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars tiene cientos de mundos habitables. El hallazgo de siete planetas del tamaño de la Tierra en un solo sistema fue histórico. En Star Wars, un salto hiperespacial los conectaría en minutos.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'El sistema fue descubierto usando un telescopio en Chile. Las estrellas enanas rojas pueden lanzar fuertes erupciones que afectarían a los planetas cercanos. Este es el principal desafío para la habitabilidad del sistema.' 
      }
    ],
    fact: 'TRAPPIST-1 tiene 7 planetas rocosos del tamaño de la Tierra. Tres podrían tener agua líquida. Están a 40 años-luz de nosotros. Sus órbitas están en perfecta resonancia matemática.'
  },
  {
    id: 'busqueda-vida',
    title: 'La Búsqueda de Vida',
    color: '#4FC3F7',
    btnImage: '/assets/starwars/infographic_mundos/btn_vida.png',
    image: '/assets/starwars/infographic_mundos/hero_vida.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_vida.png',
    bannerCaption: 'El James Webb detectó COâ‚‚ y metano en K2-18b.',
    content: [
      "Para buscar vida en planetas lejanos, los astrónomos analizan sus atmósferas. Buscan 'biofirmas', que son combinaciones químicas producidas por seres vivos. Es como buscar huellas en la arena sin ver a quien las dejó.",
      "En la Tierra, la vida produce oxígeno y metano de forma continua. Si no hubiera seres vivos, estos gases desaparecerían al reaccionar entre sí. Su coexistencia prolongada sugiere actividad biológica en un ecosistema.",
      "En 2023, el telescopio James Webb detectó dióxido de carbono y metano en el exoplaneta K2-18b. Este mundo oceánico está a 124 años-luz y se encuentra en la zona habitable. Es un objetivo principal para buscar signos biológicos.",
      "Las plataformas de ciencia ciudadana permiten analizar datos telescópicos. En el futuro, el Telescopio muy Grande en Chile fotografiará directamente estos mundos. Los astrónomos podrán examinar las atmósferas con mayor detalle.",
      "La carrera para hallar vida se acelera. Se diseñan observatorios como el HWO para fotografiar exoplanetas terrestres. Si la vida es común en el universo, podríamos encontrar evidencia firme antes del año 2040. Esto respondería la antigua pregunta de si estamos solos."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Star Wars muestra cientos de especies alienígenas. En la realidad, aún no hemos encontrado vida extraterrestre. Hallar biología en mundos como K2-18b sería un descubrimiento histórico para la humanidad.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El oxígeno y metano reaccionan para formar agua y CO2. Detectar ambos gases simultáneamente en un exoplaneta sugiere actividad biológica. Carl Sagan demostró este método al observar la Tierra desde la sonda Galileo.' 
      }
    ],
    fact: 'En 2023, el James Webb detectó CO2 y metano en K2-18b, un exoplaneta a 124 años-luz. También hallaron indicios de dimetil sulfuro, producido en la Tierra por organismos marinos. Si se confirma, sería evidencia biológica.'
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
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px', background: node.color, borderRadius:'50%',
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
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
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
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1A1C29 0%, transparent 20%)', pointerEvents: 'none' }} />
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
                    position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                    fontSize: '0.65rem', fontWeight: 800,
                    padding: '2px 8px', borderRadius: '8px',
                    letterSpacing: '1px',
                  }}>
                    {idx === 0 ? 'â—†' : 'â—‡'}
                  </div>
                  <p style={{ fontFamily: '"Lora", serif', fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                    {paragraph}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Expandables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
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
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)', pointerEvents: 'none' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: node.extraImages.length === 1 ?'1fr' : '1fr 1fr', gap: '1rem' }}>
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
                      onClick={() => setLightboxSrc(img.src)}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,12,30,0.7) 100%)', pointerEvents: 'none' }} />
                    {img.caption && (
                      <p style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.8)', margin: 0, fontStyle:'italic',
                        padding: '0 0.5rem',
                        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                        pointerEvents: 'none',
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
                  fontFamily: '"Oswald", sans-serif', fontWeight: 600, fontSize:'1rem',
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
                    marginLeft: '-4px', width: 8, height: 8, borderRadius:'50%',
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
              ¡MÃ“DULO COMPLETADO!
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

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
