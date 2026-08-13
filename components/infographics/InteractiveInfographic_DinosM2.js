'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ─── SVG Decorative Elements (Dinosaur / Jurassic themed) ────────────────────
function DecoFossil({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ammonite spiral */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Spiral connectors */}
      <path d="M30 6 Q42 6 42 18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M42 18 Q42 30 30 30" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Texture lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 20 * Math.cos(rad)} y1={30 + 20 * Math.sin(rad)} x2={30 + 24 * Math.cos(rad)} y2={30 + 24 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.3" />;
      })}
    </svg>
  );
}

function DecoBone({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.22, ...style }}>
      {/* Femur bone shape */}
      <ellipse cx="12" cy="10" rx="7" ry="5" fill={color} opacity="0.3" />
      <ellipse cx="12" cy="25" rx="6" ry="4" fill={color} opacity="0.25" />
      <rect x="9" y="10" width="6" height="15" fill={color} opacity="0.3" rx="3" />
      <ellipse cx="58" cy="12" rx="8" ry="6" fill={color} opacity="0.3" />
      <ellipse cx="58" cy="23" rx="7" ry="5" fill={color} opacity="0.25" />
      <rect x="55" y="12" width="6" height="11" fill={color} opacity="0.3" rx="3" />
      {/* Shaft */}
      <line x1="15" y1="17" x2="55" y2="17" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.25" />
      {/* Cracks */}
      <path d="M30 15 L33 19 L28 21" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFern({ size = 70, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stem */}
      <path d="M30 55 Q30 30 28 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Left fronds */}
      <path d="M28 15 Q18 12 12 18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M29 22 Q20 20 14 25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <path d="M29 30 Q22 28 16 33" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M30 38 Q24 37 18 41" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      {/* Right fronds */}
      <path d="M28 15 Q38 12 44 17" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M29 22 Q38 20 44 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <path d="M29 30 Q36 28 42 32" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M30 38 Q36 37 42 40" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      {/* Curl at top */}
      <path d="M28 8 Q26 4 30 3 Q34 4 32 8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoFootprint({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Three-toed dinosaur footprint */}
      <ellipse cx="30" cy="38" rx="10" ry="14" fill={color} opacity="0.3" />
      {/* Toes */}
      <ellipse cx="20" cy="16" rx="4" ry="9" fill={color} opacity="0.25" transform="rotate(-15 20 16)" />
      <ellipse cx="30" cy="12" rx="4" ry="10" fill={color} opacity="0.25" />
      <ellipse cx="40" cy="16" rx="4" ry="9" fill={color} opacity="0.25" transform="rotate(15 40 16)" />
      {/* Claw marks */}
      <circle cx="20" cy="8" r="2" fill={color} opacity="0.3" />
      <circle cx="30" cy="4" r="2" fill={color} opacity="0.3" />
      <circle cx="40" cy="8" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFeather({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Feather shaft */}
      <path d="M30 55 Q28 30 22 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Barbs left */}
      <path d="M27 12 Q18 10 14 14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M26 20 Q17 19 13 23" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <path d="M27 28 Q19 27 15 31" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M28 36 Q21 35 17 39" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M29 44 Q23 43 20 46" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Barbs right */}
      <path d="M25 12 Q32 8 38 11" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M26 20 Q34 17 40 20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <path d="M27 28 Q35 26 41 29" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M28 36 Q36 34 42 37" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M29 44 Q37 43 42 45" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoStrata({ size = 80, color = '#3E7C8B', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Geological strata layers */}
      <path d="M5 8 Q20 5 40 8 Q60 11 75 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <path d="M5 16 Q20 13 40 16 Q60 19 75 16" fill="none" stroke={color} strokeWidth="1.8" opacity="0.35" />
      <path d="M5 24 Q20 21 40 24 Q60 27 75 24" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <path d="M5 32 Q20 29 40 32 Q60 35 75 32" fill="none" stroke={color} strokeWidth="2.2" opacity="0.45" />
      <path d="M5 40 Q20 37 40 40 Q60 43 75 40" fill="none" stroke={color} strokeWidth="2.5" opacity="0.5" />
      {/* Embedded fossils */}
      <circle cx="25" cy="24" r="2.5" fill={color} opacity="0.3" />
      <circle cx="55" cy="32" r="2" fill={color} opacity="0.25" />
      <circle cx="40" cy="16" r="1.5" fill={color} opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'jurasico-era-dorada': [DecoFern, DecoStrata, DecoFossil],
  'sauropodos-colosos': [DecoBone, DecoFern, DecoFootprint],
  'allosaurus-depredador': [DecoFootprint, DecoBone, DecoFossil],
  'stegosaurus-placas': [DecoFossil, DecoBone, DecoStrata],
  'primeros-pajaros': [DecoFeather, DecoFern, DecoFossil],
  'ecosistemas-jurasicos': [DecoFern, DecoStrata, DecoFeather],
  'herencia-jurasico': [DecoStrata, DecoFossil, DecoBone],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Brusatte, S. (2018). The Rise and Fall of the Dinosaurs, William Morrow',
  'Fastovsky, D. & Weishampel, D. (2016). Dinosaurs: A Concise Natural History, Cambridge University Press',
  'Wellnhofer, P. (2009). Archaeopteryx: The Icon of Evolution, Verlag Dr. Friedrich Pfeil',
  'Sander, P.M. et al. (2011). Biology of the sauropod dinosaurs: the evolution of gigantism, Biological Reviews, 86(1)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'jurasico-era-dorada',
    title: 'El Jurásico: La Era Dorada',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_jurasico-era-dorada.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_jurasico-era-dorada.jpg',
    content: [
      'El período Jurásico abarcó desde hace 201 hasta 145 millones de años, situándose entre el Triásico y el Cretácico dentro de la era Mesozoica. Este intervalo de 56 millones de años fue testigo de cambios geológicos y biológicos de gran magnitud que transformaron la faz del planeta. El nombre "Jurásico" proviene de las montañas del Jura, una cadena caliza ubicada entre Francia y Suiza, donde el geólogo Alexandre Brongniart identificó por primera vez los estratos rocosos característicos de este período en 1829. Las rocas jurásicas contienen algunos de los fósiles más estudiados de la historia de la paleontología.',
      'El supercontinente Pangea, que había unido todas las masas terrestres durante el Pérmico y gran parte del Triásico, comenzó a fragmentarse de manera definitiva durante el Jurásico. Primero se dividió en dos grandes bloques: Laurasia al norte (que incluía lo que hoy son Norteamérica, Europa y Asia) y Gondwana al sur (Sudamérica, África, la India, la Antártida y Australia). Esta separación abrió el proto-Atlántico, un océano estrecho que fue ampliándose con el paso de los millones de años. Las corrientes oceánicas redistribuyeron el calor y la humedad, produciendo un clima más uniforme y cálido en todo el globo.',
      'Las temperaturas medias globales durante el Jurásico eran entre 5 y 10 grados Celsius más altas que las actuales. No existían casquetes polares permanentes, y la concentración de dióxido de carbono en la atmósfera se estima en unas 1.000 a 2.000 partes por millón, entre tres y cinco veces el nivel preindustrial moderno de 280 ppm. Esta atmósfera rica en CO₂ favoreció un efecto invernadero natural que mantuvo climas cálidos y húmedos incluso en latitudes altas. Los registros geoquímicos de isótopos de oxígeno en conchas fósiles confirman que los océanos jurásicos tenían temperaturas superficiales de 25-30°C incluso en regiones que hoy son templadas.',
      'La combinación de clima cálido, lluvias abundantes y ausencia de hielo polar produjo un mundo cubierto de vegetación densa. Los bosques jurásicos estaban dominados por coníferas araucarias y podocarpáceas, ginkgos, cícadas y helechos arborescentes que formaban doseles de hasta 30 metros de altura. No existían aún las plantas con flores (angiospermas), que no aparecerían hasta el Cretácico temprano. Esta masa vegetal proporcionó el alimento necesario para sostener a los herbívoros más grandes de la historia terrestre, los saurópodos, cuya evolución define al Jurásico como la era dorada de los gigantes.',
      'El nivel del mar durante el Jurásico fue considerablemente más alto que el actual, inundando vastas áreas continentales y creando mares epicontinentales poco profundos. Europa occidental estaba parcialmente sumergida, formando un archipiélago de islas. Estos mares someros eran ricos en vida marina: ictiosaurios con cuerpos hidrodinámicos similares a delfines, plesiosaurios de cuellos largos y amonites con conchas espiraladas poblaban las aguas. El registro fósil del Jurásico marino es tan detallado que los amonites se utilizan como fósiles índice para datar con precisión las capas rocosas de este período en todo el mundo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Jurásico recibe su nombre de las montañas del Jura, en la frontera franco-suiza. El geólogo Alexandre Brongniart propuso el término en 1829 al estudiar las capas de piedra caliza de la región. Las calizas jurásicas del Jura se formaron a partir de sedimentos depositados en un mar tropical poco profundo que cubría Europa central hace unos 150 millones de años. Esas mismas rocas se usan hoy como material de construcción en muchas ciudades europeas, de modo que algunos edificios históricos están literalmente construidos con fondos marinos jurásicos llenos de fragmentos de conchas y corales fosilizados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los niveles de oxígeno atmosférico durante el Jurásico eran de aproximadamente un 26%, superiores al 21% actual. Los niveles de CO₂ alcanzaban entre 1.000 y 2.000 ppm, generando un efecto invernadero natural que mantenía temperaturas globales medias de 16,5°C, frente a los 15°C actuales. Los datos isotópicos obtenidos de belemnites fósiles (parientes de los calamares) del Jurásico superior indican que la temperatura superficial del mar en lo que hoy es el sur de Inglaterra rondaba los 28°C, comparable a los trópicos modernos.' },
    ],
    fact: 'Los geólogos han encontrado corales fósiles del Jurásico en Spitsbergen, Noruega, a 78 grados de latitud norte, dentro del Círculo Polar Ártico. Estos corales necesitan aguas cálidas superiores a 18°C para crecer, lo que demuestra que durante el Jurásico no existía hielo permanente en los polos y el Ártico tenía un clima subtropical. El análisis de isótopos de oxígeno en estos corales indica temperaturas oceánicas de 20-22°C en una zona que hoy tiene aguas a -2°C durante el invierno.',
  },
  {
    id: 'sauropodos-colosos',
    title: 'Saurópodos: Los Colosos',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_sauropodos-colosos.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_sauropodos-colosos.jpg',
    content: [
      'Los saurópodos constituyen el grupo de animales terrestres más grandes que han existido. Estos dinosaurios herbívoros se caracterizaban por cuerpos macizos, cuellos y colas extremadamente largos, cabezas proporcionalmente pequeñas y cuatro patas columnares. El Diplodocus, uno de los saurópodos más estudiados gracias a esqueletos casi completos hallados en la Formación Morrison de Wyoming en 1877 por Othniel Charles Marsh, alcanzaba 27 metros de largo, con un cuello de 6,5 metros y una cola en forma de látigo que medía más de 13 metros. Su peso se estima en unas 12-16 toneladas, relativamente ligero para un saurópodo de su longitud.',
      'El Brachiosaurus, descubierto en 1900 por Elmer S. Riggs en el oeste de Colorado, se distinguía por tener las patas delanteras más largas que las traseras, lo que le daba una postura inclinada hacia arriba. Medía unos 26 metros de largo y 13 metros de alto, más que un edificio de cuatro pisos. Su masa corporal se calcula en unas 56 toneladas, equivalente al peso combinado de diez elefantes africanos adultos. Su corazón, estimado en 200-400 kilogramos, necesitaba generar una presión sanguínea de aproximadamente 500-700 mmHg para bombear sangre hasta una cabeza situada a 9 metros por encima del suelo, más del doble de la presión arterial humana normal de 120 mmHg.',
      'El Argentinosaurus, descubierto en 1987 por el ranchero Guillermo Heredia en la provincia de Neuquén, Argentina, podría haber sido el animal terrestre más pesado de todos los tiempos. A partir de las seis vértebras dorsales, una tibia y fragmentos de costillas y sacro recuperados, los paleontólogos estiman que alcanzaba los 35-40 metros de largo y pesaba entre 70 y 100 toneladas. Una sola vértebra dorsal mide 1,59 metros de ancho. Los análisis biomecánicos realizados por el equipo de Paul Upchurch en 2004 sugieren que necesitaba aproximadamente 100.000 kilocalorías diarias, equivalente a lo que consume un ser humano adulto en 40-50 días.',
      'La clave del gigantismo de los saurópodos residía en varias adaptaciones anatómicas combinadas. Sus huesos poseían una estructura interna neumatizada, con cavidades de aire similares a las de las aves modernas, que reducían su peso hasta un 10% sin perder resistencia. No masticaban el alimento sino que lo tragaban entero; piedras estomacales llamadas gastrolitos, encontradas asociadas a esqueletos de saurópodos en múltiples yacimientos, ayudaban a triturar la vegetación en el estómago. Este sistema eliminaba la necesidad de mandíbulas grandes y musculatura craneal pesada, permitiendo que sus cabezas fueran pequeñas y sus cuellos ligeros y extremadamente largos.',
      'El crecimiento de los saurópodos era notable por su velocidad. Estudios de histología ósea realizados por P. Martin Sander y su equipo (publicados en Biological Reviews, 2011) revelaron que los huesos de saurópodos jóvenes contenían tejido fibrolamellar, indicativo de un crecimiento rápido similar al de los mamíferos modernos. Un Apatosaurus podía ganar hasta 5.000 kilogramos por año durante su fase de crecimiento máximo, alcanzando la madurez sexual en 15-20 años. Se estima que un saurópodo recién nacido pesaba alrededor de 5-10 kilogramos y multiplicaba su masa corporal entre 5.000 y 20.000 veces a lo largo de su vida, un factor de crecimiento sin paralelo en el reino animal.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los saurópodos ponían huevos de un tamaño sorprendentemente reducido en relación con su cuerpo adulto. Los huevos más grandes encontrados, atribuidos a titanosaurios, miden apenas unos 30 centímetros de diámetro, similar a un balón de fútbol. Un Argentinosaurus de 70 toneladas nacía de un huevo de menos de un kilogramo. Los nidos descubiertos en Auca Mahuevo, Patagonia, en 1997, contenían miles de huevos con embriones preservados que mostraban piel escamosa en miniatura, proporcionando la primera evidencia directa de la textura de piel de saurópodos embrionarios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cuello del Diplodocus contenía 15 vértebras cervicales, cada una con extensas cavidades neumáticas que reducían el peso del cuello en un 10-12%. Investigadores de la Universidad de Bristol calcularon en 2013 que estas vértebras huecas pesaban solo 1.500 kilogramos, en comparación con los 7.000 kilogramos que pesarían si fueran sólidas. Los saurópodos además tenían un sistema de sacos aéreos conectados a los pulmones, idéntico al de las aves modernas, que ventilaba el aire a través de los huesos y aumentaba la eficiencia respiratoria en un 30-40% comparado con el sistema pulmonar de los mamíferos.' },
    ],
    fact: 'En 2014, el paleontólogo argentino José Luis Carballido y su equipo describieron al Dreadnoughtus schrani, un saurópodo del Cretácico hallado en Santa Cruz, Argentina. Con un fémur de 1,91 metros de largo, se estimó su masa en 59,3 toneladas utilizando ecuaciones basadas en la circunferencia de húmero y fémur. Lo notable es que el espécimen no era un adulto: el análisis histológico reveló que sus huesos aún estaban creciendo activamente en el momento de la muerte, lo que indica que los saurópodos adultos podían alcanzar masas aún mayores que las estimaciones conservadoras.',
  },
  {
    id: 'allosaurus-depredador',
    title: 'Allosaurus: El Gran Depredador',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_allosaurus-depredador.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_allosaurus-depredador.jpg',
    content: [
      'El Allosaurus fragilis fue el depredador dominante del Jurásico tardío en Norteamérica, ocupando el nicho ecológico de superdepredador durante unos 5 millones de años, entre hace 155 y 150 millones de años. Descubierto y nombrado por Othniel Charles Marsh en 1877 a partir de restos hallados en la Formación Morrison de Colorado, este terópodo medía entre 8,5 y 12 metros de largo, 3-4 metros de alto en la cadera, y pesaba entre 1.500 y 2.300 kilogramos. Su nombre significa "lagarto diferente", en referencia a las vértebras cóncavas que lo distinguían de otros terópodos conocidos en la época de su descubrimiento.',
      'El cráneo del Allosaurus era una estructura biomecánica notable. Medía hasta 84 centímetros de largo y contenía dientes aserrados curvados hacia atrás, con una longitud de hasta 10 centímetros. Un estudio publicado por Emily Rayfield en 2001 utilizó análisis de elementos finitos (técnica de ingeniería aplicada a la biomecánica) para demostrar que el cráneo del Allosaurus funcionaba como un hacha biológica. En lugar de aplicar una mordida trituradora como la del posterior T. rex, el Allosaurus abría sus mandíbulas hasta un ángulo de 79 grados y lanzaba su cabeza hacia abajo contra la presa con la fuerza del cuello, usando sus dientes superiores como sierras para desgarrar carne y producir heridas profundas.',
      'Los restos encontrados en el sitio Cleveland-Lloyd Dinosaur Quarry en Utah, descubierto en 1927 y excavado extensivamente desde 1960, han proporcionado más de 12.000 huesos de al menos 46 individuos de Allosaurus, convirtiéndolo en el terópodo más abundante en el registro fósil del Jurásico. La acumulación de tantos depredadores en un solo lugar sigue siendo debatida. Las hipótesis incluyen una trampa de barro donde los carnívoros quedaban atrapados al intentar alimentarse de herbívoros ya atrapados, o un evento de sequía que concentró a los animales alrededor de una fuente de agua menguante.',
      'Las evidencias fósiles sugieren que el Allosaurus cazaba presas grandes, incluidos saurópodos. En 1991 se encontró una vértebra caudal de Apatosaurus con una marca de mordida que coincide exactamente con la dentición de Allosaurus. Además, un Stegosaurus fósil exhibe una placa ósea con una perforación en forma de U que corresponde al perfil de un diente de Allosaurus. Algunos paleontólogos, como Robert Bakker, han propuesto que los Allosaurus pudieron cazar en grupos, ya que se han encontrado múltiples individuos de diferentes edades asociados con carcasas de saurópodos, aunque esta hipótesis sigue siendo discutida.',
      'La biomecánica del Allosaurus también revela adaptaciones para la velocidad y la agilidad. Sus patas traseras largas y musculosas, combinadas con una cola rígida que actuaba como contrapeso, le permitían alcanzar velocidades estimadas de 30-55 km/h según modelos computacionales publicados por Sellers y Manning en 2007. Sus brazos eran proporcionalmente más largos y funcionales que los del T. rex, con tres dedos provistos de garras curvas de hasta 15 centímetros. Estas garras podían funcionar como ganchos para sujetar presas o desgarrar carne, y el análisis de las inserciones musculares en el húmero indica que poseía una fuerza prensil considerable en las extremidades delanteras.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1991, un equipo suizo descubrió el esqueleto de Allosaurus mejor conservado de Europa, bautizado "Big Al Two", en el cantón de Jura, Suiza. Este ejemplar presenta evidencia de numerosas lesiones curadas: fracturas en costillas, vértebras con signos de infección, y un dedo del pie con una infección ósea severa (osteomielitis) que debió causarle cojera. El estudio paleopatológico demuestra que Big Al sobrevivió a lesiones graves repetidas, lo que sugiere una capacidad de recuperación notable y posiblemente periodos de alimentación carroñera mientras sanaba.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El análisis de elementos finitos del cráneo del Allosaurus, publicado por Emily Rayfield en el Journal of Vertebrate Paleontology en 2001, reveló que la fuerza de mordida del Allosaurus era modesta: entre 2.000 y 3.500 newtons, comparable a la de un lobo moderno. Sin embargo, su estrategia compensaba esta limitación: el músculo depressor mandibulae y los potentes músculos del cuello generaban una fuerza de impacto equivalente a un hacha de 200 kilogramos. Este mecanismo de "golpe y desgarro" era más eficiente energéticamente para atacar presas de gran tamaño que una mordida trituradora.' },
    ],
    fact: 'El Cleveland-Lloyd Dinosaur Quarry en Utah contiene la mayor concentración conocida de huesos de dinosaurios depredadores del Jurásico. De los más de 12.000 huesos recuperados desde 1960, el 70% pertenecen a Allosaurus, con restos de al menos 46 individuos diferentes. La proporción de depredadores a presas (3:1) es inversa a lo que se observa en ecosistemas normales, donde los herbívoros superan a los carnívoros. En 1965, la cantera fue designada Monumento Natural Nacional de Estados Unidos, y sus fósiles se exhiben en más de 60 museos de todo el mundo.',
  },
  {
    id: 'stegosaurus-placas',
    title: 'Stegosaurus: Placas y Púas',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_stegosaurus-placas.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_stegosaurus-placas.jpg',
    content: [
      'El Stegosaurus stenops es uno de los dinosaurios más reconocidos del período Jurásico tardío, viviendo hace entre 155 y 150 millones de años en lo que hoy es el oeste de Norteamérica. Descubierto por Othniel Charles Marsh en 1877 en Morrison, Colorado, durante las llamadas "Guerras de los Huesos" contra Edward Drinker Cope, este tireóforo medía entre 7 y 9 metros de largo, alcanzaba 4 metros de altura en su punto más alto y pesaba entre 3.100 y 7.000 kilogramos. Su nombre, que significa "lagarto con techo", refleja la impresión inicial de Marsh de que las placas dorsales formaban una especie de cubierta sobre su lomo, similar a las tejas de un tejado.',
      'Las 17 placas óseas del Stegosaurus, dispuestas en dos filas alternas a lo largo de la columna vertebral, han generado uno de los debates más prolongados en la paleontología. Las placas no estaban unidas al esqueleto por articulaciones óseas, sino que estaban embebidas en la piel. El análisis histológico de estas placas, realizado por James Farlow y colaboradores en 1976 y revisado con técnicas modernas por Kevin Padian y otros en 2005, reveló un extenso sistema de canales vasculares internos. La hipótesis termorreguladora propone que las placas funcionaban como radiadores: cuando el animal se orientaba hacia el viento, la sangre circulante disipaba calor; cuando se exponía al sol, lo absorbía.',
      'Sin embargo, la función termorreguladora no explica todo. Los estudios de Russell Main y colaboradores en 2005 demostraron que el área de superficie de las placas era insuficiente para regular la temperatura de un animal de varias toneladas de manera efectiva. Una hipótesis alternativa, apoyada por el hecho de que las placas de machos y hembras parecen diferir en forma, sugiere que cumplían una función de exhibición sexual, análoga a las astas de los ciervos o la cola del pavo real. Es probable que las placas sirvieran para múltiples funciones simultáneamente: termorregulación parcial, reconocimiento entre individuos de la misma especie y exhibición para el apareamiento.',
      'La defensa del Stegosaurus dependía de las cuatro púas óseas situadas al final de su cola, denominadas "thagomizer" desde 1982 cuando el dibujante Gary Larson acuñó el término en su tira cómica The Far Side. Cada púa medía entre 60 y 90 centímetros de largo y estaba recubierta de una vaina de queratina que la hacía aún más larga y afilada en vida. En 2001, los paleontólogos Kenneth Carpenter y Peter Galton describieron un fósil de placa ósea de Allosaurus con una perforación en forma de U que coincide con el diámetro de una púa de Stegosaurus, demostrando que estas armas eran funcionalmente efectivas contra los depredadores del Jurásico.',
      'El llamado "mito del segundo cerebro" del Stegosaurus se originó en 1877 cuando Marsh observó una cavidad agrandada en las vértebras sacras que parecía poder alojar una masa nerviosa mayor que el propio cerebro craneal. Durante décadas circuló la idea de que el Stegosaurus tenía un "cerebro auxiliar" en la cadera para controlar sus patas traseras y su cola. Los estudios modernos realizados por Emily Buchholtz en 2012 demostraron que esta cavidad contenía un glucógeno body, un órgano presente en las aves actuales que almacena glucógeno (una forma de azúcar) como reserva energética para el sistema nervioso. El cerebro real del Stegosaurus pesaba apenas 80 gramos, del tamaño de una nuez, lo que le da una de las proporciones cerebro-cuerpo más bajas de todos los dinosaurios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El término "thagomizer" para referirse a las púas caudales del Stegosaurus fue inventado por el caricaturista Gary Larson en su tira cómica The Far Side en 1982. En la viñeta, un cavernícola señala las púas y las llama "the thagomizer, named after the late Thag Simmons" (el thagomizer, nombrado en honor al difunto Thag Simmons). El término fue adoptado posteriormente por la comunidad paleontológica y hoy aparece en publicaciones científicas del Smithsonian Institution y en informes técnicos de museos de historia natural de todo el mundo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2016 realizado por Evan Saitta (Universidad de Bristol) utilizó tomografía computarizada de alta resolución para analizar la microestructura de las placas del Stegosaurus. Descubrió que la corteza ósea externa era delgada (2-4 mm) mientras que el interior estaba altamente vascularizado, con canales de hasta 5 mm de diámetro. La modelización térmica indicó que las placas podían disipar hasta 140 vatios de calor cuando el animal estaba activo, lo que equivale aproximadamente a la potencia de dos bombillas incandescentes. Aunque insuficiente como sistema primario de enfriamiento, representaba un complemento a otros mecanismos como el jadeo o la búsqueda de sombra.' },
    ],
    fact: 'En 2014, la paleontóloga Sophie Regalado del Museo de Historia Natural de Londres estudió el espécimen de Stegosaurus más completo del mundo, apodado "Sophie". El análisis con escáner 3D de sus 360 huesos reveló que las placas dorsales tenían dimorfismo sexual: algunos ejemplares presentaban placas anchas y redondeadas mientras que otros las tenían estrechas y puntiagudas. Sophie pesaba 1.600 kilogramos, menos de lo estimado previamente, y el modelo biomecánico mostró que podía girar su cola con las púas a una velocidad angular suficiente para generar una fuerza de impacto de 3.600 newtons, capaz de perforar el hueso de un depredador como el Allosaurus.',
  },
  {
    id: 'primeros-pajaros',
    title: 'Los Primeros Pájaros',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_primeros-pajaros.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_primeros-pajaros.jpg',
    content: [
      'El Archaeopteryx lithographica es uno de los fósiles más importantes en la historia de la biología evolutiva. Descubierto en 1861 en las canteras de caliza de Solnhofen, Baviera (Alemania), apenas dos años después de la publicación de "El Origen de las Especies" de Charles Darwin, este animal de 150 millones de años se convirtió en la evidencia más clara de la transición entre los dinosaurios y las aves. El primer espécimen, una sola pluma fosilizada, fue descrito por Hermann von Meyer. Semanas después, se encontró un esqueleto casi completo que fue adquirido por el Museo de Historia Natural de Londres por 700 libras esterlinas, una suma equivalente a unos 100.000 dólares actuales.',
      'El Archaeopteryx presentaba una combinación notable de caracteres reptilianos y avianos. Sus rasgos dinosaurianos incluían dientes cónicos en las mandíbulas, tres dedos con garras en cada ala, una cola ósea larga con 20-23 vértebras, y huesos sin las cavidades neumáticas extensas de las aves modernas. Sus rasgos avianos comprendían plumas asimétricas de vuelo (remiges) idénticas en estructura a las de las aves actuales, una fúrcula (hueso de la suerte) bien desarrollada, y un cerebro relativamente grande con un área visual expandida. Medía unos 50 centímetros de largo y pesaba aproximadamente 0,8-1 kilogramo, similar a una urraca moderna.',
      'Hasta 2024 se han encontrado 13 especímenes de Archaeopteryx, todos procedentes de las calizas de Solnhofen. Estas calizas se formaron en una laguna tropical poco profunda del Jurásico tardío, donde las aguas tranquilas y sin oxígeno en el fondo preservaron detalles excepcionales de plumas, piel y tejidos blandos. El undécimo espécimen, descrito en 2014 por Oliver Rauhut y colaboradores, presentaba plumas preservadas con restos de melanosomas (orgánulos que contienen pigmento). El análisis de la forma de estos melanosomas, publicado en la revista Nature Communications, indicó que las plumas del Archaeopteryx eran negras, no de colores variados como se representaba tradicionalmente.',
      'El debate sobre si el Archaeopteryx podía volar de manera activa o solo planeaba ha ocupado a los científicos durante más de un siglo. Un estudio de 2018 dirigido por Dennis Voeten (ESRF, Grenoble) utilizó tomografía sincrotrón de rayos X para analizar la geometría interna de los huesos de las alas del Archaeopteryx. Los resultados mostraron que la sección transversal de sus huesos era más similar a la de aves voladoras modernas como los faisanes que a la de aves no voladoras o dinosaurios terrestres. Sin embargo, la ausencia de un esternón quillado grande sugiere que su vuelo era limitado: probablemente combinaba aleteo corto con planeo, similar a los faisanes actuales que vuelan distancias cortas para escapar de depredadores.',
      'El Archaeopteryx no estaba solo en su transición. Desde 1996, los yacimientos del noreste de China (provincia de Liaoning) han producido docenas de especies de dinosaurios emplumados que documentan paso a paso la evolución del vuelo. El Sinosauropteryx, descrito en 1996 por Ji Qiang y Ji Shu-An, fue el primer dinosaurio no aviano con plumas confirmadas: protoplumas filamentosas simples que cubrían su cuerpo. El Microraptor, de cuatro alas, el Anchiornis con plumas negras y blancas datadas por melanosomas, y el Yi qi con alas membranosas similares a las de los murciélagos demuestran que la evolución del vuelo no fue lineal sino que múltiples linajes de dinosaurios experimentaron con diferentes mecanismos de vuelo y planeo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1985, el astrónomo Fred Hoyle y el físico Chandra Wickramasinghe publicaron un libro titulado "Archaeopteryx, the Primordial Bird: A Case of Fossil Forgery", acusando al espécimen de Londres de ser una falsificación creada con cemento y plumas pegadas sobre un esqueleto de dinosaurio. El Museo de Historia Natural de Londres respondió con un análisis exhaustivo usando microscopía electrónica de barrido y difracción de rayos X, que demostró que la piedra alrededor de las plumas y la piedra del resto del fósil eran idénticas en composición química y textura, descartando cualquier manipulación.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La tomografía sincrotrón realizada en 2018 en el European Synchrotron Radiation Facility (ESRF) de Grenoble permitió reconstruir la geometría interna de los huesos del ala del Archaeopteryx sin dañar el fósil. El estudio reveló paredes óseas delgadas con una distribución de hueso compacto similar a la de aves que alternan entre aleteo y planeo, como codornices y faisanes. La relación entre el grosor cortical y el diámetro total del húmero era de 0,52, un valor intermedio entre dinosaurios terópodos no voladores (0,60-0,70) y aves modernas que vuelan continuamente (0,35-0,45).' },
    ],
    fact: 'El Microraptor gui, descubierto en 2003 por Xu Xing en Liaoning, China, tenía cuatro alas: plumas de vuelo largas y asimétricas tanto en los brazos como en las patas traseras. Medía 77 centímetros de largo y pesaba unos 1,1 kilogramos. Los túneles de viento y las simulaciones aerodinámicas realizados por investigadores de la Universidad de Kansas en 2013 demostraron que su configuración biplano generaba la sustentación necesaria para planear distancias de 40-60 metros desde alturas de 30 metros, con una relación de planeo de 4,6:1, comparable a la de las ardillas voladoras modernas.',
  },
  {
    id: 'ecosistemas-jurasicos',
    title: 'Ecosistemas Jurásicos',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_ecosistemas-jurasicos.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_ecosistemas-jurasicos.jpg',
    content: [
      'La Formación Morrison, una extensa unidad geológica que aflora en 13 estados del oeste de Norteamérica desde Montana hasta Nuevo México, es el depósito jurásico más estudiado del mundo. Formada entre hace 156 y 147 millones de años durante el Jurásico tardío (Kimmeridgiense-Titoniense), abarca una superficie de unos 1,5 millones de kilómetros cuadrados y alcanza un espesor de hasta 300 metros en algunas localidades. Desde las primeras excavaciones de Marsh y Cope en la década de 1870 durante las "Guerras de los Huesos", se han identificado más de 100 especies de vertebrados en esta formación, incluidos al menos 25 géneros de dinosaurios.',
      'El ecosistema de la Formación Morrison ha sido reconstruido como una llanura aluvial semiárida con estaciones húmedas y secas marcadas. Los ríos serpenteantes depositaban sedimentos ricos en nutrientes en las planicies de inundación, donde crecían bosques de coníferas (araucarias y podocarpáceas) junto a sotobosques de helechos, equisetos y cícadas. Los análisis palinológicos (estudio de polen fósil) y los isótopos de carbono en materia orgánica indican que las precipitaciones anuales rondaban los 500-900 mm, similar al clima de la sabana africana actual. La red trófica incluía herbívoros de todos los tamaños: saurópodos gigantes como Diplodocus y Brachiosaurus, ornitópodos medianos como Camptosaurus, y tireóforos como Stegosaurus.',
      'En África oriental, los Lechos de Tendaguru, en la actual Tanzania, representan un ecosistema jurásico contemporáneo pero situado en el hemisferio sur. Excavados por primera vez por la expedición alemana de Werner Janensch entre 1909 y 1913, los Lechos de Tendaguru produjeron el esqueleto montado de dinosaurio más alto del mundo: un Giraffatitan brancai (antes clasificado como Brachiosaurus brancai) de 13,27 metros de altura expuesto en el Museo de Historia Natural de Berlín. La similitud entre las faunas de Tendaguru y Morrison, con géneros emparentados de saurópodos, terópodos y estegosaurios presentes en ambos continentes, demuestra que existían conexiones terrestres entre América del Norte y África durante el Jurásico medio.',
      'Las redes tróficas jurásicas seguían principios ecológicos reconocibles. Los productores primarios (coníferas, helechos y cícadas) sostenían una biomasa de herbívoros enorme. Se estima que un kilómetro cuadrado de bosque jurásico de la Formación Morrison podía sostener entre 2 y 5 toneladas de biomasa de herbívoros, basándose en la productividad vegetal de ecosistemas modernos análogos. Los saurópodos, como consumidores primarios, transferían energía a depredadores como el Allosaurus y el Ceratosaurus. Los pterosaurios, los primeros vertebrados voladores, ocupaban nichos aéreos, mientras que mamíferos pequeños de menos de 1 kilogramo eran componentes discretos pero importantes del ecosistema, actuando como insectívoros y carroñeros nocturnos.',
      'Los invertebrados completaban la complejidad del ecosistema. El registro fósil de la Formación Morrison incluye moluscos de agua dulce (bivalvos Unio y gasterópodos Viviparus), crustáceos ostrácodos y concostracanos, insectos variados (escarabajos, libélulas con envergaduras de hasta 18 centímetros, y termitas primitivas), y arañas. Los coprolitos (heces fosilizadas) de dinosaurios herbívoros contienen restos de coníferas, semillas de cícadas y esporas de helechos, permitiendo reconstruir las dietas específicas de cada especie. Un coprolito atribuido a un saurópodo, descubierto en Utah en 2005, contenía trazas de madera de conífera y fragmentos de cutículas de cícadas, confirmando una dieta mixta.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las "Guerras de los Huesos" (1877-1892) entre los paleontólogos estadounidenses Othniel Charles Marsh y Edward Drinker Cope fueron una rivalidad científica que produjo resultados monumentales. Ambos competían por descubrir y nombrar nuevas especies de dinosaurios, empleando espías, sobornos y sabotaje. Cope publicó descripciones de 56 nuevas especies de dinosaurios y Marsh de 80, aunque muchas fueron posteriormente consideradas sinónimas. La rivalidad dejó en bancarrota a ambos, pero sus colecciones, que suman más de 142 nuevas especies de vertebrados, constituyen la base de la paleontología norteamericana moderna.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los análisis isotópicos de estroncio (⁸⁷Sr/⁸⁶Sr) en esmalte dental de saurópodos de la Formación Morrison, publicados por Henry Fricke y colaboradores en 2011, revelaron que algunos individuos de Camarasaurus migraban estacionalmente distancias de hasta 300 kilómetros entre tierras altas y bajas, siguiendo la disponibilidad de agua y vegetación. Este es el primer dato cuantitativo sobre migración de dinosaurios y sugiere que los saurópodos tenían patrones de movimiento comparables a los de grandes herbívoros modernos como los ñus del Serengeti.' },
    ],
    fact: 'El Museo de Historia Natural de Berlín exhibe el esqueleto montado más alto del mundo: un Giraffatitan brancai de 13,27 metros de altura y 22 metros de largo, hallado en los Lechos de Tendaguru, Tanzania. La expedición alemana de 1909-1913 empleó a más de 500 trabajadores locales que extrajeron 225 toneladas de huesos fósiles transportados a pie y en carros tirados por bueyes hasta el puerto de Lindi, un recorrido de 65 kilómetros. Desde allí, los huesos viajaron en barco hasta Hamburgo. El montaje del esqueleto en Berlín se completó en 1937 y sobrevivió intacto a los bombardeos de la Segunda Guerra Mundial gracias a la protección con sacos de arena.',
  },
  {
    id: 'herencia-jurasico',
    title: 'La Herencia del Jurásico',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/infographic_m2/btn_herencia-jurasico.jpg',
    image: '/assets/dinosaurios/infographic_m2/hero_herencia-jurasico.jpg',
    content: [
      'El legado científico del Jurásico se manifiesta en la riqueza de su registro fósil y en las técnicas que los paleontólogos han desarrollado para interpretarlo. La fosilización requiere condiciones específicas: los restos de un organismo deben quedar rápidamente cubiertos por sedimento (arena, lodo o ceniza volcánica) en un ambiente con poco oxígeno que inhiba la descomposición. Con el tiempo, los minerales del agua subterránea penetran los poros del hueso y lo reemplazan molécula a molécula en un proceso llamado permineralización. Un hueso jurásico que sujetamos hoy no es realmente hueso: es una réplica mineral exacta del hueso original, compuesta por calcita, sílice o pirita.',
      'Las técnicas modernas de excavación paleontológica combinan métodos tradicionales con tecnología avanzada. El proceso comienza con prospección de superficie para localizar huesos expuestos por la erosión. Una vez identificado un yacimiento, se establece una cuadrícula con coordenadas GPS de alta precisión (error menor a 2 centímetros). Los huesos se exponen gradualmente usando brochas, espátulas y herramientas neumáticas de aire comprimido similares a los instrumentos dentales. Cada hueso se documenta fotográficamente, se registra en una base de datos digital tridimensional, se consolida con adhesivos como Paraloid B-72 (un metacrilato usado en conservación desde 1975), y se protege con vendas de yeso ("camisas de yeso") para su transporte seguro al laboratorio.',
      'La datación de los fósiles jurásicos emplea dos métodos complementarios. La datación radiométrica se basa en la desintegración predecible de isótopos inestables: el uranio-plomo (U-Pb) en cristales de zircón volcánico permite datar eventos con precisión de ±0,1 millones de años en rangos de cientos de millones de años. La bioestratigrafía utiliza fósiles índice (especies que existieron durante períodos breves y tenían amplia distribución geográfica) para correlacionar capas rocosas entre continentes. Los amonites son los fósiles índice más útiles del Jurásico: evolucionaban rápidamente, eran abundantes y se distribuían en todos los océanos, permitiendo subdividir el Jurásico en 11 edades geológicas de entre 3 y 7 millones de años cada una.',
      'La tecnología de escaneo digital ha transformado la paleontología en las últimas dos décadas. La tomografía computarizada (CT) permite visualizar el interior de los fósiles sin destruirlos: canales vasculares en huesos, cavidades craneales que revelan la forma del cerebro, y dientes no erupcionados dentro de las mandíbulas. La fotogrametría genera modelos 3D de alta resolución a partir de cientos de fotografías tomadas desde múltiples ángulos. La tomografía sincrotrón, disponible en instalaciones como el European Synchrotron Radiation Facility (ESRF) de Grenoble, produce imágenes con resolución de micras que revelan melanosomas (orgánulos de pigmento) en plumas fosilizadas, permitiendo reconstruir los colores originales de dinosaurios del Jurásico.',
      'Los yacimientos jurásicos siguen produciendo descubrimientos. En 2022, un equipo del Museo de Historia Natural de Stuttgart anunció el hallazgo de un nuevo saurópodo en la Formación Morrison de Wyoming, preservado con restos de tejido blando mineralizado en las vértebras cervicales. En China, los lechos de Daohugou (Jurásico medio, 165-160 Ma) continúan revelando mamíferos primitivos con pelo preservado, pterosaurios con membranas alares, y dinosaurios emplumados que documentan la diversificación de la vida terrestre durante el apogeo del Jurásico. Cada nuevo hallazgo refina nuestra comprensión del mundo jurásico y demuestra que, pese a 200 años de investigación, el registro fósil guarda aún numerosos secretos por revelar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning (1799-1847) fue una de las paleontólogas más importantes del siglo XIX. Nacida en Lyme Regis, Inglaterra, descubrió el primer esqueleto completo de ictiosaurio a los 12 años en 1811, y más tarde encontró el primer plesiosaurio (1823) y el primer pterosaurio fuera de Alemania (1828). A pesar de que sus hallazgos transformaron la comprensión de la vida prehistórica, no pudo publicar bajo su nombre por ser mujer y pertenecer a la clase trabajadora. En 2010, la Royal Society la incluyó en su lista de las diez mujeres que más influyeron en la historia de la ciencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La datación uranio-plomo (U-Pb) en zircones detríticos es el método más preciso para establecer la edad de los estratos jurásicos. Los cristales de zircón (ZrSiO₄) se forman durante erupciones volcánicas e incorporan uranio pero rechazan el plomo. El ²³⁸U se desintegra a ²⁰⁶Pb con una vida media de 4.468 millones de años, proporcionando un "reloj" geológico. Mediante espectrometría de masas por dilución isotópica con análisis por ablación láser (LA-ICP-MS), los geólogos pueden datar un solo cristal de zircón de 0,1 mm con una incertidumbre de ±100.000 años, incluso para rocas de 150 millones de años de antigüedad.' },
    ],
    fact: 'En 2010, la paleontóloga Mary Schweitzer de la Universidad Estatal de Carolina del Norte publicó en la revista Science el descubrimiento de vasos sanguíneos y proteínas de colágeno preservados en un fémur de dinosaurio del Cretácico. Posteriormente, su equipo identificó proteínas similares en huesos del Jurásico. El mecanismo de preservación involucra hierro libre de la hemoglobina que actúa como formaldehído natural, entrecruzando las proteínas y preservándolas durante millones de años. Este hallazgo demostró que, bajo condiciones excepcionales, los tejidos blandos pueden sobrevivir intervalos geológicos, abriendo una nueva era en la paleontología molecular.',
  },
];

// ─── Jurassic Particle Field (Canvas Background) ────────────────────────────
function JurassicField() {
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
      hue: Math.random() > 0.5 ? '93,138,104' : '193,120,41', // teal or sienna
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

// ─── Jurassic Header ────────────────────────────────────────────────────────
function JurassicHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#dinoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5D8A68','#C17829','#6B8E96','#8B5E3C','#A67B3D','#7D6B99','#3E7C8B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central fossil icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="9" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="4" fill="none" stroke="#5D8A68" strokeWidth="0.8" opacity="0.3" />
        <circle cx="300" cy="30" r="2" fill="#5D8A68" opacity="0.5" />
        <defs>
          <linearGradient id="dinoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(193,120,41,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">GIGANTES DEL JURÁSICO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">201 – 145 MILLONES DE AÑOS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(93,138,104,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotDinosM2"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* Video Player */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(93,138,104,0.15)',
    }}>
      <Star size={14} style={{ color: '#5D8A68', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5D8A68, #C17829)', borderRadius: '3px', boxShadow: '0 0 8px rgba(93,138,104,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5D8A68', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DinosM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <JurassicField />

      <JurassicHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(93,138,104,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(93,138,104,0.08)', borderRadius: '16px',
              border: '1px solid rgba(93,138,104,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5D8A68', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🦕 ¡Has dominado los secretos de los Gigantes del Jurásico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Gigante del Jurásico
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
