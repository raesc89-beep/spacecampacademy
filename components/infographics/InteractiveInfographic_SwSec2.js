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
    "id": "tatooine-soles",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_tatooine-soles.webp',
    diagramCaption: 'El doble atardecer de Tatooine â€” inspirado en Kepler-16b',
    "title": "Tatooine: Los Dos Soles",
    "color": "#FFB74D",
    "btnImage": "/assets/starwars/infographic_mundos/btn_tatooine.webp",
    "image": "/assets/starwars/infographic_mundos/hero_tatooine.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_tatooine.webp",
    "bannerCaption": "El doble atardecer de Tatooine â€” inspirado en Kepler-16b",
    "extraImages": [
      {
        "src": "/assets/starwars/infographic_mundos/extra_tatooine_atardecer.webp",
        "caption": "Atardecer con dos soles sobre Tatooine"
      },
      {
        "src": "/assets/starwars/infographic_mundos/extra_tatooine_pueblo.webp",
        "caption": "El pueblo de Tatooine bajo dos soles"
      }
    ],
    "content": [
      "En el año 2011, el telescopio espacial Kepler de la NASA transformó la ciencia ficción en realidad astrofísica al descubrir Kepler-16b, el primer planeta circumbinario confirmado de la historia. Este mundo transita periódicamente frente a dos estrellas centrales: una enana naranja de tipo K con el sesenta y nueve por ciento de la masa solar y una enana roja de tipo M con el veinte por ciento de la masa de nuestro Sol. Si te situaras en su hipotética atmósfera superior, presenciarías una doble puesta de sol idéntica a la escena de Tatooine.",
      "La mecánica celeste de un sistema circumbinario es extremadamente rigurosa debido a las perturbaciones gravitacionales mutuas. Según el criterio matemático de Holman y Wiegert formulado en 1999, existe un radio orbital crítico por debajo del cual cualquier cuerpo es desestabilizado. Si el planeta se acerca demasiado al par binario, la resonancia gravitatoria combinada altera su trayectoria de forma caótica, provocando que sea eyectado al vacío interestelar o estrellado violentamente contra una de las dos estrellas anfitrionas.",
      "Para que la órbita de un planeta sea mecánicamente estable a largo plazo, su distancia al baricentro binario debe ser al menos entre dos y tres veces mayor que la separación mutua entre las dos estrellas. Kepler-16b supera este límite de seguridad por un margen muy estrecho: las dos estrellas se orbitan entre sí a una distancia de cero coma veintidós unidades astronómicas en cuarenta y un días, mientras que el planeta completa su traslación exterior a cero coma setenta unidades astronómicas en doscientos veintinueve días.",
      "La zona de habitabilidad alrededor de un sistema binario no es una corona estática como en el Sistema Solar, sino una región dinámica con fronteras cambiantes. La radiación ultravioleta y el flujo térmico total varían periódicamente a medida que las estrellas se eclipsan mutuamente. Si un planeta rocoso se situara en el margen interior de esta zona, la radiación combinada causaría un efecto invernadero desbocado, evaporando los océanos primitivos y transformando la corteza en un desierto global continuo y árido como Tatooine.",
      "Los censos estelares modernos revelan que más de la mitad de las estrellas de tipo solar en la Vía Láctea no se encuentran aisladas, sino que forman parejas binarias o agrupaciones múltiples. Los descubrimientos posteriores de Kepler-34b, Kepler-35b y Kepler-453b demostraron que la formación planetaria en discos de gas y polvo circumbinarios es un proceso robusto y habitual en la galaxia, abriendo la posibilidad de que existan miles de millones de mundos con dos soles en nuestro vecindario cósmico."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el Episodio IV: Una Nueva Esperanza, Luke Skywalker contempla el horizonte desértico de Tatooine mientras dos soles majestuosos, Tatoo I y Tatoo II, se ocultan lentamente en una de las escenas más icónicas del cine de ciencia ficción. Aunque George Lucas concibió el paisaje como una fantasía exótica filmada en el desierto de Túnez, la astrofísica empírica demostró tres décadas más tarde que los ocasos dobles son comunes en el universo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Kepler-16b es un gigante gaseoso frío con una masa similar a Saturno (aproximadamente un tercio de la masa de Júpiter) y un radio del setenta y cinco por ciento de Júpiter. Su temperatura de equilibrio superficial oscila entre los ciento setenta y los doscientos Kelvin bajo cero, lo que imposibilita la presencia de agua líquida en su superficie, aunque sus hipotéticas lunas rocosas de gran tamaño podrían retener calor interno mediante mareas."
      }
    ],
    "fact": "El radio crítico de estabilidad orbital para un planeta circumbinario depende de la excentricidad del par estelar y de la razón de masas; en Kepler-16b, el límite interno de desestabilización se sitúa en 0.62 unidades astronómicas, y el planeta orbita de forma estable a 0.704 unidades astronómicas, muy cerca de la frontera caótica."
  },
  {
    "id": "metodo-eclipse",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_metodo-eclipse.webp',
    diagramCaption: 'El telescopio Kepler observó más de 150,000 estrellas.',
    "title": "El Método del Eclipse",
    "color": "#64B5F6",
    "btnImage": "/assets/starwars/infographic_mundos/btn_eclipse.webp",
    "image": "/assets/starwars/infographic_mundos/hero_eclipse.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_eclipse.webp",
    "bannerCaption": "El telescopio Kepler observó más de 150,000 estrellas.",
    "content": [
      "El método del tránsito astronómico, popularmente conocido como el método del eclipse, es la herramienta observacional más prolífica de la astrofísica moderna para descubrir exoplanetas. Cuando un planeta cruza la línea de visión directa entre su estrella anfitriona y los telescopios terrestres o espaciales, bloquea una fracción minúscula de la emisión luminosa estelar. Este oscurecimiento periódico genera una curva de luz característica que delata la presencia de un cuerpo opaco en órbita alrededor de la estrella.",
      "La magnitud del descenso de brillo permite deducir directamente las dimensiones geométricas del planeta mediante una relación matemática fundamental. La profundidad relativa del tránsito equivale a la razón cuadrática entre el radio del planeta y el radio de la estrella matriz: delta de flujo dividido por el flujo total igual al radio planetario al cuadrado sobre el radio estelar al cuadrado. Gracias a esta fórmula, una estrella similar al Sol que disminuya su brillo un uno por ciento alberga un planeta del tamaño de Júpiter.",
      "La duración y la periodicidad del tránsito proporcionan parámetros orbitales de una precisión extraordinaria. Aplicando la tercera ley de Kepler, los astrónomos calculan el semieje mayor de la órbita a partir del tiempo transcurrido entre eclipses consecutivos. Si el planeta cruza el disco estelar de forma rasante o ecuatorial, la pendiente de ingreso y egreso en la curva de luz revela la inclinación orbital exacta del sistema, descartando cuerpos cuya alineación no cruce nuestra línea de visión telescópica.",
      "Durante el tránsito ocurre un fenómeno de enorme valor astrobiológico: la espectroscopía de transmisión. La luz emitida por la estrella atraviesa las capas periféricas de la atmósfera del planeta antes de alcanzar los detectores espaciales. Los elementos químicos y las moléculas gaseosas presentes en la atmósfera absorben longitudes de onda específicas, imprimiendo líneas espectrales de absorción que permiten identificar componentes como vapor de agua, metano, dióxido de carbono y brumas de aerosoles.",
      "Misiones espaciales como Kepler y TESS de la NASA han registrado miles de tránsitos planetarios, catalogando más de cinco mil quinientos exoplanetas confirmados en la Vía Láctea. El Telescopio Espacial James Webb ha llevado esta técnica a un nivel sin precedentes, detectando nubes de dióxido de azufre fotoquímico en WASP-39b y midiendo la composición isotópica de atmósferas lejanas, demostrando que un simple eclipse estelar puede revelar la química atmosférica completa de mundos a cientos de años luz."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el universo de Star Wars, los cazas estelares y cruceros del Imperio Galáctico detectan sistemas planetarios desconocidos ingresando coordenadas hiperespaciales en sus computadoras de navegación. En el mundo real, antes de enviar cualquier sonda de exploración interestelar, los astrofísicos deben vigilar incansablemente millones de estrellas con sensores fotométricos de precisión nanométrica para mapear cada planeta."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un planeta del tamaño de la Tierra cruzando frente a una estrella como el Sol causa una disminución en el brillo estelar de solo ochenta y cuatro partes por millón, lo que equivale al cero coma cero cero ochenta y cuatro por ciento. Para registrar una señal tan débil, los fotómetros de misiones como Kepler y Plato deben mantener una estabilidad de detección equivalente a notar un mosquito pasando delante del foco de un faro."
      }
    ],
    "fact": "La precisión fotométrica del telescopio Kepler alcanzó veinte partes por millón en estrellas brillantes de magnitud doce, permitiendo confirmar tránsitos de planetas rocosos con radios menores a uno coma cuatro veces el de la Tierra, como Kepler-10b y Kepler-20e, sentando las bases estadísticas de la demografía planetaria galáctica."
  },
  {
    "id": "hoth-hielo",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_hoth-hielo.webp',
    diagramCaption: 'Europa tiene un océano subterráneo que podría albergar vida.',
    "title": "Hoth: Mundos de Hielo",
    "color": "#B3E5FC",
    "btnImage": "/assets/starwars/infographic_mundos/btn_hoth.webp",
    "image": "/assets/starwars/infographic_mundos/hero_hoth.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_hoth.webp",
    "bannerCaption": "Europa tiene un océano subterráneo que podría albergar vida.",
    "extraImages": [
      {
        "src": "/assets/starwars/infographic_mundos/extra_hoth_vader.webp",
        "caption": "Vader en las llanuras heladas"
      },
      {
        "src": "/assets/starwars/infographic_mundos/extra_hoth_jinete.webp",
        "caption": "Un jinete sobre las colinas nevadas"
      }
    ],
    "content": [
      "El planeta helado Hoth, escenario del combate inicial en El Imperio Contraataca, no es una mera fantasía cinematográfica sino un análogo directo de los mundos criogénicos que abundan en la galaxia. En astrofísica, un planeta rocoso completamente congelado experimenta una retroalimentación climática positiva dominada por el albedo. Las superficies cubiertas de nieve y hielo compacto reflejan hasta el ochenta por ciento de la radiación solar incidente de regreso al espacio, impidiendo que la corteza absorba calor.",
      "La propia historia geológica de la Tierra demuestra que los planetas habitables pueden transformarse temporalmente en réplicas exactas de Hoth. Durante el período Criogénico, hace entre setecientos diez y seiscientos treinta y cinco millones de años, nuestro planeta sufrió el evento de la «Tierra Bola de Nieve». El descenso de los gases de efecto invernadero permitió que los casquetes polares avanzaran hasta el ecuador, congelando los océanos globales bajo una capa sólida de hielo marino de más de un kilómetro de grosor.",
      "La climatología de un mundo helado está gobernada por la ausencia de vapor de agua atmosférico debido a las temperaturas criogénicas continuas. El aire extremadamente frío y seco inhibe las precipitaciones líquidas y concentra tormentas de ventisca generadas por la sublimación de hielo y la circulación convectiva impulsada por vientos polares catabáticos. Si la presión atmosférica es baja, los glaciares avanzan erosionando mesetas rocosas y valles tectónicos en un ciclo perpetuo de abrasión mecánica.",
      "En nuestro propio Sistema Solar, cuerpos como la luna Europa de Júpiter y Encélado de Saturno representan variaciones extremas de mundos helados. Aunque sus superficies permanecen a ciento setenta grados Celsius bajo cero en el vacío espacial, las fuerzas de marea gravitatoria generadas por los planetas gigantes flexionan sus interiores rocosos. Esta disipación de marea produce suficiente energía geotérmica para mantener océanos globales de agua líquida salada ocultos bajo sus cortezas de hielo.",
      "A distancias interestelares, los astrónomos han identificado exoplanetas gélidos mediante microlentes gravitacionales. El caso paradigmático es OGLE-2005-BLG-390Lb, una supertierra de cinco coma cinco masas terrestres situada a veintiún mil años luz de distancia. Este mundo orbita una enana roja tenue a dos coma seis unidades astronómicas, lo que sitúa su temperatura media superficial en cincuenta y tres Kelvin, un estado térmico donde gases como el metano pueden condensarse en escarcha sólida permanente."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En El Imperio Contraataca, la Alianza Rebelde establece la Base Eco en las cavernas subterráneas de hielo de Hoth, donde las tropas se protegen de temperaturas que caen por debajo de los sesenta grados bajo cero durante la noche. Aunque los tauntauns sucumben al frío extremo sin refugio, la vida microbiana extremófila terrestre sobrevive en ambientes antárticos similares como los valles secos de McMurdo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La salida de una glaciación global de tipo Tierra bola de nieve requiere millones de años de acumulación de dióxido de carbono volcánico en la atmósfera. Debido a que los océanos congelados no absorben gas y las lluvias cesan, la meteorización química se detiene; el gas se acumula hasta alcanzar concentraciones cientos de veces superiores a las actuales, desatando un calentamiento superinvernadero súbito."
      }
    ],
    "fact": "El exoplaneta helado OGLE-2005-BLG-390Lb posee una temperatura superficial estimada de -220 °C (53 Kelvin); a esa temperatura, la atmósfera es tan tenue que el nitrógeno se congela en la superficie rocosa y el albedo geométrico del hielo supera el 75 %, manteniendo el planeta en un estado de congelación perpetua irreversible."
  },
  {
    "id": "dagobah-pantano",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_dagobah-pantano.webp',
    diagramCaption: 'En el Carbonífero, la Tierra lucía como Dagobah.',
    "title": "Dagobah: Pantanos Prehistóricos",
    "color": "#81C784",
    "btnImage": "/assets/starwars/infographic_mundos/btn_dagobah.webp",
    "image": "/assets/starwars/infographic_mundos/hero_dagobah.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_dagobah.webp",
    "bannerCaption": "En el Carbonífero, la Tierra lucía como Dagobah.",
    "extraImages": [
      {
        "src": "/assets/starwars/infographic_mundos/extra_dagobah_pantano.webp",
        "caption": "El pantano oscuro bajo la lluvia"
      },
      {
        "src": "/assets/starwars/infographic_mundos/extra_dagobah_xwing.webp",
        "caption": "El X-Wing hundido en el pantano"
      }
    ],
    "content": [
      "El sistema Dagobah, hogar del Maestro Yoda, presenta un bioma planetario caracterizado por ciénagas pantanosas interminables, brumas densas y vegetación hipertrófica. En la historia evolutiva de la Tierra, este paisaje encuentra su paralelo más exacto en el período Carbonífero, hace unos trescientos cincuenta millones de años. Durante esa era geológica, los continentes estaban cubiertos por extensos bosques pantanosos inundados de licopodios gigantes y helechos arborescentes de más de treinta metros de altura.",
      "Durante el Carbonífero terrestre, la fotosíntesis masiva de estos bosques tropicales anegados incrementó los niveles de oxígeno atmosférico hasta un asombroso treinta y cinco por ciento, en comparación con el veintiuno por ciento actual. Esta atmósfera hiperóxica permitió que los artrópodos crecieran hasta tamaños colosales debido a la difusión pasiva de oxígeno a través de sus espiráculos, dando origen a libélulas gigantes como Meganeura con envergaduras de setenta centímetros y ciempiés de dos metros.",
      "En un exoplaneta pantanoso real, la retención continua de agua líquida superficial combinada con una atmósfera rica en vapor genera un régimen de nubes perennes y efecto invernadero húmedo autorregulado. La dispersión de Rayleigh y la difusión óptica producida por microgotas de agua y aerosoles orgánicos en suspensión atenúan la radiación ultravioleta directa, bañando la superficie en una iluminación difusa continua, exactamente igual a la niebla crepuscular perpetua de los pantanos de Dagobah.",
      "Los fondos anóxicos de los pantanos son laboratorios biogeoquímicos fundamentales donde la descomposición bacteriana anaerobia produce metano y ácido sulfhídrico en grandes volúmenes. Cuando la materia vegetal queda sepultada en sedimentos sin oxígeno, no se degrada por completo; a lo largo de decenas de millones de años, la presión litostática y el calor geotérmico transforman estos restos orgánicos en gigantescos yacimientos de carbón mineral fósil que sustentan la energía industrial.",
      "Los astrobiólogos señalan que la presencia simultánea de metano y oxígeno en la atmósfera de un exoplaneta constituye una biofirma química de primer orden. Debido a que el metano reacciona rápidamente con los radicales hidroxilo derivados del vapor de agua y el oxígeno para formar dióxido de carbono, ambos gases no pueden coexistir de forma estable a menos que una biosfera activa o una actividad geológica persistente reponga continuamente el metano a escala planetaria."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En El Imperio Contraataca, el caza X-Wing de Luke Skywalker se hunde en las aguas lodosas de un pantano turbio de Dagobah, rodeado de serpientes alienígenas y enredaderas gigantes. Esta densa vegetación pantanosa refleja la biosfera primitiva descrita en la paleontología terrestre, donde la humedad saturada y la materia orgánica en descomposición cubrían cuencas sedimentarias globales sin océanos abiertos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los pantanos son los sumideros terrestres de carbono más eficientes por unidad de superficie. Aunque cubren apenas el tres por ciento de la superficie continental de nuestro planeta, las turberas y humedales almacenan aproximadamente el treinta por ciento de todo el carbono retenido en el suelo terrestre, duplicando la biomasa total de todos los bosques y selvas del mundo combinados."
      }
    ],
    "fact": "La atmósfera del Carbonífero superó el 30 % de concentración de oxígeno molecular durante más de 60 millones de años; esto provocó una combustión espontánea en tormentas eléctricas y permitió la evolución de insectos y anfibios descomunales en densos pantanos que hoy forman el 90 % del carbón explotado en el mundo."
  },
  {
    "id": "mundos-lava",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_mundos-lava.webp',
    diagramCaption: '55 Cancri e: su superficie supera los 2,000°C.',
    "title": "Mundos de Fuego y Lava",
    "color": "#FF7043",
    "btnImage": "/assets/starwars/infographic_mundos/btn_lava.webp",
    "image": "/assets/starwars/infographic_mundos/hero_lava.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_lava.webp",
    "bannerCaption": "55 Cancri e: su superficie supera los 2,000°C.",
    "extraImages": [
      {
        "src": "/assets/starwars/infographic_mundos/extra_mustafar_duel_1.webp",
        "caption": "Duelo épico en Mustafar"
      },
      {
        "src": "/assets/starwars/infographic_mundos/extra_mustafar_duel_2.webp",
        "caption": "Cruce de sables sobre magma ardiente"
      },
      {
        "src": "/assets/starwars/infographic_mundos/extra_mustafar_sector.webp",
        "caption": "El planeta volcánico de la galaxia"
      }
    ],
    "content": [
      "El planeta Mustafar, donde transcurre el dramático duelo final de La Venganza de los Sith, está categorizado en la astrofísica actual como un exoplaneta de lava o mundo ígneo de período ultracorto. Planetas reales descubiertos como 55 Cancri e, Kepler-10b y CoRoT-7b poseen masas que van desde tres hasta ocho veces la Tierra, pero orbitan a distancias tan reducidas de sus estrellas matrices que sus superficies se encuentran fundidas en un océano global de magma hirviente.",
      "El motor físico principal de estos mundos extremos es el bloqueo de marea o acoplamiento gravitacional sincrónico. Al orbitar a menos de dos millones de kilómetros de su estrella anfitriona, las fuerzas de marea frenan la rotación del planeta hasta igualarla con su período orbital. Como consecuencia, el planeta muestra siempre la misma cara hacia el astro rey: un hemisferio diurno sometido a un bombardeo térmico de más de dos mil grados Celsius y un hemisferio nocturno sumido en oscuridad perpetua.",
      "Bajo estas temperaturas descomunales, las rocas de silicato que forman la corteza no solo se funden, sino que se vaporizan directamente hacia el espacio circundante. La atmósfera de un planeta de lava no está compuesta por nitrógeno u oxígeno, sino por vapores minerales de sodio, hierro, monóxido de silicio y magnesio. Los modelos climáticos revelan que vientos supersónicos arrastran este vapor mineral hacia la cara nocturna más fría, provocando lluvias de roca líquida y nieve de granate condensado.",
      "Otro mecanismo generador de vulcanismo desmesurado es la fricción interna por resonancia de mareas, observable directamente en Ío, la luna volcánica de Júpiter. Las perturbaciones gravitacionales continuas inducidas por las lunas vecinas Europa y Ganímedes fuerzan a Ío a mantener una órbita ligeramente excéntrica. Al aproximarse y alejarse de Júpiter, el tirón gravitatorio masivo deforma su corteza cien metros arriba y abajo, fundiendo su manto rocoso en más de cuatrocientos volcanes activos.",
      "Las observaciones fotométricas del Telescopio Espacial Spitzer y los análisis infrarrojos del James Webb en 55 Cancri e han detectado oscilaciones térmicas pronunciadas en su hemisferio diurno. Estas fluctuaciones sugieren una actividad volcánica catastrófica a escala planetaria, donde plumas eruptivas gigantescas de lava silicatada expulsan gases calientes hacia el espacio, demostrando que los paisajes magmáticos infernales de Mustafar son escenarios cotidianos en la galaxia."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el clímax de La Venganza de los Sith, Obi-Wan Kenobi y Anakin Skywalker baten sus sables láser sobre plataformas recolectoras flotantes que navegan sobre ríos turbulentos de roca fundida en Mustafar. En la física real, aproximarse a un río de lava expuesta sin blindaje presurizado provocaría quemaduras letales inmediatas por radiación térmica antes de cualquier contacto físico."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El exoplaneta 55 Cancri e completa una vuelta completa alrededor de su estrella progenitora en tan solo diecisiete horas y cuarenta minutos a una distancia de cero coma cero quince unidades astronómicas. Su cara diurna alcanza temperaturas extremas de dos mil cuatrocientos grados Celsius, suficientes para licuar la roca basáltica y mantener un océano de lava con corrientes convectivas rápidas."
      }
    ],
    "fact": "La luna Ío libera más de dos teravatios de potencia geotérmica continua debido a la disipación por fricción de marea con Júpiter; este calor interno genera tasas de erupción de lava de silicato a más de 1,300 °C que renuevan toda su corteza superficial en un ciclo geológico de apenas un millón de años."
  },
  {
    "id": "trappist-sistema",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_trappist-sistema.webp',
    diagramCaption: 'Los planetas de TRAPPIST-1 están muy cerca unos de otros.',
    "title": "TRAPPIST-1: Siete Mundos",
    "color": "#CE93D8",
    "btnImage": "/assets/starwars/infographic_mundos/btn_trappist.webp",
    "image": "/assets/starwars/infographic_mundos/hero_trappist.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_trappist.webp",
    "bannerCaption": "Los planetas de TRAPPIST-1 están muy cerca unos de otros.",
    "content": [
      "En febrero de 2017, un equipo internacional de astrónomos liderado por Michaël Gillon anunció el descubrimiento más extraordinario de la ciencia exoplanetaria moderna: el sistema TRAPPIST-1. Situada a treinta y nueve coma seis años luz en la constelación de Acuario, esta estrella enana roja ultrafría de tipo espectral M8 alberga siete planetas rocosos de tamaño casi idéntico a la Tierra, designados cronológicamente desde la letra b hasta la letra h en orden de proximidad orbital.",
      "Una característica asombrosa de TRAPPIST-1 es la extrema compacidad de su arquitectura orbital. Los siete planetas orbitan tan cerca de su diminuta estrella central que todo el sistema cabe cómodamente dentro de la órbita de Mercurio alrededor de nuestro Sol. Si estuvieras parado sobre la superficie de TRAPPIST-1e, verías a los planetas hermanos cruzar el firmamento como esferas gigantescas, con un diámetro aparente varias veces mayor que el de la Luna llena observada desde la Tierra.",
      "Los planetas de TRAPPIST-1 están acoplados en una cadena casi perfecta de resonancias orbitales de Laplace. Las razones entre sus períodos orbitales forman proporciones fraccionarias simples de enteros como ocho a cinco, cinco a tres y tres a dos. Esta configuración matemática demuestra que los planetas no se formaron en sus posiciones actuales, sino que migraron suavemente hacia el interior del disco protoplanetario primitivo antes de anclarse gravitacionalmente en un equilibrio milimétrico.",
      "Tres de estos exoplanetas rocosos (TRAPPIST-1e, TRAPPIST-1f y TRAPPIST-1g) residen plenamente dentro de la zona de habitabilidad circumestelar del sistema. En estos mundos, el flujo térmico recibido de la enana roja permite que el agua líquida exista de forma estable en la superficie si cuentan con atmósferas protectoras de suficiente densidad. El planeta TRAPPIST-1e es considerado uno de los candidatos terrestres más prometedores debido a su densidad rocosa similar a la de nuestro planeta.",
      "Sin embargo, la vida alrededor de enanas ultrafrías enfrenta desafíos severos. Durante su juventud estelar, las estrellas de tipo M experimentan violentas fulguraciones de rayos X y radiación ultravioleta extrema que pueden erosionar las atmósferas primarias. Observaciones recientes con el instrumento MIRI del Telescopio James Webb han mostrado que los planetas interiores b y c carecen de atmósferas densas de dióxido de carbono, dejando a TRAPPIST-1e como el principal foco de estudio astrobiológico."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El universo de Star Wars está repleto de sistemas con múltiples mundos civilizados próximos, como el Núcleo Galáctico o el sector Coruscant. TRAPPIST-1 demuestra que la naturaleza puede empaquetar siete mundos del tamaño terrestre en un espacio tan compacto que viajar de un planeta a otro con motores convencionales tomaría solo unas pocas semanas o meses terrestres."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La masa de la estrella TRAPPIST-1 es de apenas el nueve por ciento de la masa del Sol y su radio es ligeramente mayor que el de Júpiter. Debido a que las estrellas enanas ultrafrías queman su combustible de hidrógeno a un ritmo sumamente lento mediante convección nuclear completa, TRAPPIST-1 brillará durante doce billones de años, mil veces más que la vida total del Sol."
      }
    ],
    "fact": "La resonancia orbital en cadena de TRAPPIST-1 es la más larga y compleja jamás descubierta en un sistema planetario: por cada 24 órbitas del planeta b, c completa 15, d completa 9, e completa 6, f completa 4, g completa 3 y h completa aproximadamente 2, conformando una danza orbital armónica intacta desde hace 7,600 millones de años."
  },
  {
    "id": "busqueda-vida",
    diagramImage: '/assets/starwars/infographic_mundos/diagram_busqueda-vida.webp',
    diagramCaption: 'El James Webb detectó COâ‚‚ y metano en K2-18b.',
    "title": "La Búsqueda de Vida",
    "color": "#4FC3F7",
    "btnImage": "/assets/starwars/infographic_mundos/btn_vida.webp",
    "image": "/assets/starwars/infographic_mundos/hero_vida.webp",
    "bannerImage": "/assets/starwars/infographic_mundos/banner_vida.webp",
    "bannerCaption": "El James Webb detectó COâ‚‚ y metano en K2-18b.",
    "content": [
      "La búsqueda científica de vida extraterrestre en exoplanetas ha abandonado las conjeturas especulativas para convertirse en una disciplina empírica rigurosa: la astrobiología observacional. Los astrofísicos definen la habitabilidad planetaria a partir de tres pilares termodinámicos indispensables: la presencia persistente de un solvente líquido polar (primordialmente agua), un inventario de elementos biogénicos clave (carbono, hidrógeno, nitrógeno, oxígeno, fósforo y azufre) y un gradiente de energía libre utilizable.",
      "La delimitación matemática de la zona habitable fue establecida en 1993 por James Kasting y sus colaboradores mediante modelos de transferencia radiativa unidimensionales. El borde interno está marcado por el límite de efecto invernadero desbocado, donde la insolación excesiva evapora los océanos y descompone el agua en la estratosfera; el borde externo corresponde a la condensación del dióxido de carbono en nubes reflectantes que desatan una glaciación global irreversible.",
      "Para detectar organismos vivos a distancias interestelares sin enviar sondas físicas, los científicos buscan biofirmas espectrales en las atmósferas planetarias. Una biofirma es un compuesto químico gaseoso cuya abundancia anómala solo puede explicarse por la actividad metabólica de una biosfera viva. Los biomarcadores más buscados son combinaciones en desequilibrio termodinámico extremo, tales como la coexistencia de oxígeno molecular u ozono junto con metano o amoníaco.",
      "La espectroscopía de transmisión y la espectroscopía de emisión térmica constituyen las herramientas de vanguardia en esta cruzada. Cuando el Telescopio James Webb apunta hacia un exoplaneta en tránsito, sus detectores dispersan la luz en miles de canales espectrales infrarrojos. En 2022, el instrumento NIRSpec detectó de forma inequívoca dióxido de carbono y vapor de agua en WASP-39b, inaugurando la era del diagnóstico molecular cuantitativo en atmósferas alienígenas.",
      "El futuro de la astrobiología contempla proyectos monumentales como el Habitable Worlds Observatory (HWO) de la NASA y el Extremely Large Telescope (ELT) en Chile, dotado de un espejo primario de treinta y nueve metros. Estas instalaciones utilizarán coronógrafos avanzados para bloquear el resplandor cegador de las estrellas matrices y fotografiar directamente pequeños mundos rocosos, analizando el color de la vegetación mediante la detección del salto infrarrojo de la clorofila vegetal."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Star Wars, la galaxia alberga millones de civilizaciones alienígenas inteligentes, desde wookiees hasta twi'leks, conviviendo pacíficamente o en guerra en cantinas espaciales. En la astrobiología real, la detección de vida comenzará muy probablemente identificando microbios extremófilos mediante huellas espectrales de metano o fotosíntesis en planetas rocosos silenciosos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El llamado «Red Edge» o borde rojo de la vegetación es una biofirma espectral clave en la Tierra producida por la clorofila de las plantas, que refleja fuertemente la luz en longitudes de onda mayores a setecientos nanómetros para evitar sobrecalentarse. Detectar este abrupto salto reflectivo en el espectro integrado de un exoplaneta confirmaría la existencia de vegetación fotosintética activa."
      }
    ],
    "fact": "El Telescopio James Webb detectó por primera vez en la historia humana dióxido de carbono en la atmósfera de un exoplaneta (WASP-39b) con una significancia estadística superior a 26 desviaciones estándar (sigmas), demostrando que la espectroscopía infrarroja puede identificar moléculas clave para la habitabilidad a 700 años luz."
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
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}
 style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
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

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
