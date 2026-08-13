'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Stellar Spectroscopy themed) ————————————————
function DecoSpectrum({ size = 70, color = '#4A7FB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spectrum bands */}
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <rect key={i} x="8" y={y} width="44" height="5" rx="2" fill={color} opacity={0.15 + i * 0.08} />
      ))}
      {/* Absorption lines */}
      <line x1="20" y1="8" x2="20" y2="55" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="32" y1="8" x2="32" y2="55" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="44" y1="8" x2="44" y2="55" stroke={color} strokeWidth="1.2" opacity="0.45" />
      {/* Prism shape */}
      <path d="M2 52 L12 8 L22 52 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoPrism({ size = 70, color = '#D4736A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Prism triangle */}
      <path d="M30 8 L52 50 L8 50 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Incoming light beam */}
      <line x1="2" y1="30" x2="22" y2="32" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Dispersed beams */}
      <line x1="40" y1="28" x2="58" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="32" x2="58" y2="30" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="40" y1="36" x2="58" y2="42" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Light particles */}
      <circle cx="58" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="58" cy="30" r="1.5" fill={color} opacity="0.4" />
      <circle cx="58" cy="42" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoStarSvg({ size = 60, color = '#5A8FC5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Star body */}
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.35" />
      {/* Corona rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 12 * Math.cos(rad)} y1={30 + 12 * Math.sin(rad)} x2={30 + 24 * Math.cos(rad)} y2={30 + 24 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />;
      })}
      {/* Glow circles */}
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="0.5" opacity="0.12" />
    </svg>
  );
}

function DecoWaveSvg({ size = 80, color = '#C46358', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Electromagnetic wave */}
      <path d="M5 20 Q15 5 25 20 Q35 35 45 20 Q55 5 65 20 Q75 35 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Wavelength markers */}
      <line x1="5" y1="35" x2="45" y2="35" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="5" y1="33" x2="5" y2="37" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="45" y1="33" x2="45" y2="37" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <text x="25" y="39" fill={color} fontSize="5" textAnchor="middle" opacity="0.3">λ</text>
    </svg>
  );
}

function DecoAtomStellar({ size = 60, color = '#6A9FD5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Nucleus */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.7" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(120 30 30)" />
      {/* Photon emission arrow */}
      <path d="M42 18 L52 10" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      <path d="M50 10 L52 10 L52 12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Photon wave */}
      <path d="M52 8 Q54 6 56 8 Q58 10 60 8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#B4534A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Telescope body */}
      <rect x="15" y="16" width="35" height="10" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Lens */}
      <ellipse cx="52" cy="21" rx="3" ry="8" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Eyepiece */}
      <rect x="8" y="18" width="8" height="6" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Tripod */}
      <line x1="30" y1="26" x2="22" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="35" y1="26" x2="35" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="26" x2="48" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Light rays entering */}
      <line x1="58" y1="12" x2="52" y2="18" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="60" y1="21" x2="55" y2="21" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="58" y1="30" x2="52" y2="24" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Stars */}
      <circle cx="62" cy="8" r="1" fill={color} opacity="0.4" />
      <circle cx="66" cy="14" r="0.8" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'luz-estrellas': [DecoStarSvg, DecoWaveSvg, DecoSpectrum],
  'espectros-absorcion': [DecoSpectrum, DecoPrism, DecoAtomStellar],
  'clasificacion-harvard': [DecoTelescope, DecoStarSvg, DecoSpectrum],
  'ecuacion-saha': [DecoAtomStellar, DecoWaveSvg, DecoPrism],
  'clave-cecilia': [DecoSpectrum, DecoStarSvg, DecoAtomStellar],
  'composicion-estelar': [DecoStarSvg, DecoAtomStellar, DecoWaveSvg],
  'espectroscopia-moderna': [DecoTelescope, DecoSpectrum, DecoPrism],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Payne, C.H. (1925). Stellar Atmospheres: A Contribution to the Observational Study of High Temperature in the Reversing Layers of Stars. Radcliffe College PhD Thesis, Harvard Observatory Monographs No. 1',
  'Saha, M.N. (1920). Ionization in the Solar Chromosphere. Philosophical Magazine, Series 6, 40(238), 472–488',
  'Cannon, A.J. & Pickering, E.C. (1901). Spectra of Bright Stars Photographed with the 11-inch Draper Telescope. Annals of the Astronomical Observatory of Harvard College, 28(Part II)',
  'Carroll, B.W. & Ostlie, D.A. (2017). An Introduction to Modern Astrophysics, 2nd Edition. Cambridge University Press',
  'Gingerich, O. (1982). Cecilia Payne-Gaposchkin: Astronomer and Astrophysicist. Physics Today, 35(3), 24–25',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'luz-estrellas',
    title: 'La Luz de las Estrellas',
    color: '#4A7FB5',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_luz-estrellas.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_luz-estrellas.jpg',
    content: [
      'Cada estrella que observas en el cielo nocturno emite luz que ha viajado durante años, décadas o incluso milenios antes de alcanzar tus ojos. Esa luz no es un simple destello blanco: contiene información detallada sobre la temperatura, composición química, velocidad y edad de la estrella que la produjo. Isaac Newton demostró en 1666 que la luz blanca del Sol puede descomponerse en un arco iris de colores al pasar a través de un prisma de vidrio. Este descubrimiento sentó las bases de la espectroscopía, la ciencia que permite "leer" la luz como si fuera un libro abierto.',
      'La luz visible es solo una pequeña fracción del espectro electromagnético. Las ondas electromagnéticas abarcan desde los rayos gamma, con longitudes de onda menores a 0.01 nanómetros, hasta las ondas de radio, que pueden medir varios kilómetros de longitud. La luz visible ocupa un rango entre 380 nanómetros (violeta) y 700 nanómetros (rojo). Cada color corresponde a una longitud de onda específica: el azul tiene longitudes más cortas y el rojo más largas. Las estrellas calientes emiten más luz azul, mientras que las estrellas frías emiten más luz roja.',
      'La temperatura superficial de una estrella determina el color de la luz que emite con mayor intensidad. Esta relación fue descrita por la Ley de Wien en 1893, formulada por el físico alemán Wilhelm Wien. La ley establece que la longitud de onda del pico de emisión es inversamente proporcional a la temperatura. El Sol, con una temperatura superficial de aproximadamente 5,778 Kelvin, tiene su pico de emisión en el amarillo-verde (alrededor de 502 nanómetros). Estrellas como Rigel, con temperaturas de 11,000 Kelvin, emiten predominantemente en azul.',
      'Max Planck revolucionó la física en 1900 al proponer que la energía electromagnética no se emite de forma continua, sino en paquetes discretos llamados cuantos. Esta idea resolvió el problema de la "catástrofe ultravioleta", una predicción errónea de la física clásica que indicaba que los cuerpos calientes deberían emitir cantidades infinitas de energía ultravioleta. La ecuación de Planck (E = hν) relaciona la energía de un fotón con su frecuencia, donde h es la constante de Planck (6.626 × 10⁻³⁴ J·s).',
      'Los astrónomos utilizan fotómetros y espectrómetros acoplados a telescopios para capturar y analizar la luz estelar con alta precisión. Antes de la invención de los detectores electrónicos, se usaban placas fotográficas de vidrio cubiertas con una emulsión sensible a la luz. El Observatorio de Harvard acumuló más de 500,000 placas fotográficas entre 1885 y 1992, formando la colección más grande del mundo. Cada placa capturaba los espectros de miles de estrellas simultáneamente, creando un archivo sin precedentes para la investigación astronómica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La estrella más cercana al Sol es Próxima Centauri, ubicada a 4.24 años luz de distancia. Esto significa que la luz que vemos de ella esta noche partió hace 4 años y 3 meses. La luz de la estrella Betelgeuse, visible en la constelación de Orión, partió hace unos 700 años, cuando en la Tierra se construían catedrales góticas. Y la luz de la galaxia de Andrómeda viajó durante 2.5 millones de años para llegar a nuestros ojos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de la luz en el vacío es exactamente 299,792,458 metros por segundo. Albert Einstein demostró en 1905 que esta velocidad es una constante universal: nada puede superar la velocidad de la luz. Cuando un espectrómetro descompone la luz estelar, cada fotón individual lleva consigo una frecuencia específica que actúa como una "huella dactilar" del átomo que lo emitió o absorbió hace miles de años.' },
    ],
    fact: 'En 1802, el óptico inglés William Hyde Wollaston observó líneas oscuras en el espectro solar al pasar la luz por una rendija estrecha antes del prisma. Wollaston creyó erróneamente que eran los límites naturales entre los colores del arco iris. No se dio cuenta de que había descubierto las líneas de absorción, uno de los hallazgos más importantes de la astrofísica. Tuvieron que pasar 12 años antes de que otro científico entendiera su verdadero significado.',
  },
  {
    id: 'espectros-absorcion',
    title: 'Espectros de Absorción',
    color: '#D4736A',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_espectros-absorcion.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_espectros-absorcion.jpg',
    content: [
      'En 1814, el óptico bávaro Joseph von Fraunhofer construyó un espectroscopio de alta precisión y observó el espectro del Sol con un detalle sin precedentes. Descubrió 574 líneas oscuras fijas en posiciones específicas del arco iris solar. Catalogó y etiquetó las más prominentes con letras del alfabeto (A, B, C, D, E, F, G, H, K), un sistema de nomenclatura que los astrónomos siguen usando en la actualidad. Fraunhofer notó que estas líneas siempre aparecían exactamente en las mismas posiciones, lo que indicaba que no eran defectos del instrumento sino propiedades reales de la luz solar.',
      'Fraunhofer también dirigió su espectroscopio hacia otras estrellas y descubrió que sus patrones de líneas eran diferentes al del Sol. Algunas estrellas mostraban líneas oscuras más intensas en ciertas posiciones, mientras que otras carecían de líneas que el Sol mostraba con claridad. Este hallazgo fue revolucionario porque demostró que cada estrella tiene una "firma espectral" única. Sin embargo, Fraunhofer murió en 1826 a los 39 años, probablemente envenenado por los vapores tóxicos del plomo y antimonio que usaba en la fabricación de vidrio óptico.',
      'La explicación de las líneas de Fraunhofer llegó en 1859 gracias a los químicos alemanes Gustav Kirchhoff y Robert Bunsen. Mediante experimentos de laboratorio, demostraron que cada elemento químico produce un patrón único de líneas espectrales cuando se calienta hasta la incandescencia. Kirchhoff formuló tres leyes de la espectroscopía: un sólido caliente emite un espectro continuo; un gas caliente a baja presión emite líneas brillantes en posiciones específicas; y un gas frío interpuesto entre una fuente de luz y el observador produce líneas oscuras en las mismas posiciones.',
      'Gracias a Kirchhoff y Bunsen, los científicos podían identificar elementos químicos en el Sol sin viajar hasta él. La línea D de Fraunhofer resultó corresponder al sodio, las líneas C y F al hidrógeno, y la línea E al hierro. En 1868, el astrónomo francés Jules Janssen y el británico Joseph Norman Lockyer descubrieron independientemente una línea espectral amarilla en el Sol que no correspondía a ningún elemento conocido en la Tierra. Lockyer la atribuyó a un elemento nuevo y lo bautizó "helio", del griego helios (sol). El helio no se descubrió en la Tierra hasta 27 años después, en 1895.',
      'Para comprender por qué los átomos absorben y emiten luz en frecuencias específicas, fue necesario el modelo atómico de Niels Bohr de 1913. Bohr propuso que los electrones orbitan el núcleo atómico en niveles de energía discretos, como los peldaños de una escalera. Un electrón puede "saltar" a un nivel superior al absorber un fotón con la energía exacta correspondiente a la diferencia entre niveles. Al descender, emite un fotón con esa misma energía. Cada elemento tiene una configuración electrónica distinta, lo que genera su patrón espectral único, su "huella dactilar" atómica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Robert Bunsen es más conocido hoy por el mechero Bunsen que por sus contribuciones a la espectroscopía, pero su trabajo con Kirchhoff fue mucho más significativo para la ciencia. Juntos descubrieron dos elementos nuevos usando la espectroscopía: el cesio (1860) y el rubidio (1861). Los nombres provienen de los colores de sus líneas espectrales: caesius significa "azul cielo" en latín, y rubidus significa "rojo intenso".' },
      { label: 'Dato Científico', icon: 'atom', text: 'El átomo de hidrógeno, el más simple del universo (un protón y un electrón), produce cuatro líneas visibles llamadas la serie de Balmer: Hα (656 nm, roja), Hβ (486 nm, azul-verde), Hγ (434 nm, violeta) y Hδ (410 nm, violeta profundo). Johann Balmer descubrió en 1885 la fórmula matemática que predice exactamente la posición de cada línea. Esta fórmula fue uno de los primeros indicios de que los átomos tienen estructura interna cuantizada.' },
    ],
    fact: 'Joseph von Fraunhofer fue un huérfano que quedó atrapado bajo los escombros de un edificio derrumbado en Múnich cuando tenía 11 años. Su rescate fue noticia nacional y llamó la atención del príncipe elector Maximiliano IV, quien le concedió dinero y la oportunidad de aprender el oficio de óptico. Sin ese accidente, Fraunhofer probablemente habría sido un aprendiz de cristalero anónimo. En lugar de eso, fabricó las lentes y prismas más precisos de su época y descubrió las 574 líneas oscuras del espectro solar que llevan su nombre.',
  },
  {
    id: 'clasificacion-harvard',
    title: 'La Clasificación de Harvard',
    color: '#5A8FC5',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_clasificacion-harvard.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_clasificacion-harvard.jpg',
    content: [
      'En 1885, el director del Observatorio de Harvard, Edward Charles Pickering, inició un proyecto ambicioso: clasificar los espectros de todas las estrellas visibles. Para realizar este trabajo meticuloso pero poco glamuroso, Pickering contrató a un grupo de mujeres que serían conocidas como las "Computadoras de Harvard" o, despectivamente, el "Harén de Pickering". Estas mujeres trabajaban largas jornadas examinando placas fotográficas y catalogando espectros, recibiendo un salario de 25 centavos por hora, menos que un obrero de fábrica de la época.',
      'Williamina Fleming, una escocesa que había sido empleada doméstica de Pickering, desarrolló el primer sistema de clasificación espectral basado en la intensidad de las líneas de hidrógeno. Fleming clasificó más de 10,000 estrellas en 16 categorías etiquetadas con letras del alfabeto (A, B, C...). Antonia Maury, sobrina del astrónomo Henry Draper, propuso un sistema alternativo más detallado con subdivisiones basadas en el ancho de las líneas espectrales. Pero fue Annie Jump Cannon quien creó el sistema definitivo que se usa hasta la actualidad.',
      'Annie Jump Cannon reorganizó y simplificó la clasificación en 1901, eliminando categorías redundantes y reordenando las letras restantes según la temperatura superficial de las estrellas. La secuencia resultante fue O-B-A-F-G-K-M, donde las estrellas tipo O (como Naos, a 42,000 K) son las más calientes y azules, y las estrellas tipo M (como Betelgeuse, a 3,500 K) son las más frías y rojas. Generaciones de estudiantes de astronomía memorizan esta secuencia con la frase en inglés "Oh Be A Fine Girl/Guy Kiss Me".',
      'Cannon clasificó personalmente más de 350,000 espectros estelares a lo largo de su carrera, a un ritmo promedio de 300 estrellas por día. Su trabajo culminó en el catálogo Henry Draper, publicado en nueve volúmenes entre 1918 y 1924, que contiene las clasificaciones espectrales de 225,300 estrellas. La velocidad y precisión de Cannon eran legendarias: podía clasificar un espectro con solo mirarlo durante tres segundos. Su tasa de error era menor al 1%, un nivel de exactitud que pocos astrónomos podían igualar.',
      'El sistema de clasificación de Harvard planteaba una pregunta fundamental que nadie podía responder en 1901: ¿por qué las estrellas muestran diferentes patrones de líneas espectrales? La suposición predominante era que las diferencias reflejaban variaciones en la composición química: las estrellas tipo A mostraban líneas de hidrógeno intensas porque contenían más hidrógeno, mientras que las estrellas tipo G (como el Sol) mostraban líneas de metales porque contenían más hierro y otros metales. Esta suposición parecía lógica, pero estaba equivocada. Resolver este misterio requeriría una revolución en la física atómica y una joven científica británica que nadie esperaba.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Annie Jump Cannon perdió gran parte de su audición durante la infancia debido a la escarlatina. Trabajaba en un silencio casi completo en la sala de placas del observatorio, concentrándose exclusivamente en las imágenes espectrales frente a ella. Cannon fue la primera mujer en recibir un doctorado honorario de la Universidad de Oxford (1925) y la primera mujer elegida como oficial de la Sociedad Astronómica Americana. Un cráter lunar lleva su nombre desde 1964.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Sol es una estrella tipo G2V en la clasificación de Harvard. La letra G indica su clase espectral (temperatura superficial de 5,200-6,000 K), el número 2 es una subdivisión de temperatura (0 es más caliente, 9 más fría dentro de la clase), y la V indica que es una estrella de secuencia principal (enana). El catálogo Henry Draper asignó al Sol la designación formal, aunque técnicamente es la estrella más estudiada y mejor comprendida del universo.' },
    ],
    fact: 'Las "Computadoras de Harvard" incluyeron a Henrietta Swan Leavitt, quien descubrió en 1912 la relación período-luminosidad de las estrellas variables Cefeidas. Este descubrimiento permitió medir distancias cósmicas por primera vez y fue utilizado por Edwin Hubble en 1929 para demostrar que el universo se está expandiendo. Leavitt recibía un salario de 30 centavos por hora y nunca fue nombrada profesora. El astrónomo sueco Gösta Mittag-Leffler intentó nominarla al Premio Nobel en 1924, pero descubrió que había muerto de cáncer tres años antes.',
  },
  {
    id: 'ecuacion-saha',
    title: 'La Ecuación de Saha',
    color: '#C46358',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_ecuacion-saha.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_ecuacion-saha.jpg',
    content: [
      'En 1920, el físico indio Meghnad Saha publicó un artículo que transformaría la astrofísica para siempre. Saha derivó una ecuación que describe cómo el grado de ionización de un gas depende de su temperatura, densidad y potencial de ionización del elemento. La ecuación de ionización de Saha conectó por primera vez la física atómica cuántica con la observación astronómica. Saha reconoció que la intensidad de las líneas espectrales no depende solo de la cantidad de un elemento presente, sino también de la temperatura del gas.',
      'El razonamiento de Saha fue el siguiente: a temperaturas bajas, los electrones de un átomo permanecen en sus niveles de energía más bajos. Solo los fotones con la energía exacta para excitar transiciones entre esos niveles producen líneas de absorción. A temperaturas más altas, los electrones son arrancados del átomo (ionización), y el átomo ionizado produce un conjunto diferente de líneas espectrales. A temperaturas extremas, todos los electrones son arrancados y el átomo ya no produce líneas de absorción visibles.',
      'La ecuación de Saha explicaba un misterio que había confundido a los astrónomos durante décadas. Las estrellas tipo A muestran las líneas de hidrógeno más intensas, pero esto no significa que contengan más hidrógeno. Significa que la temperatura superficial de las estrellas tipo A (entre 7,500 y 10,000 K) es la óptima para que los átomos de hidrógeno tengan electrones en el segundo nivel de energía, desde donde pueden absorber fotones visibles. En estrellas más calientes (tipo O), el hidrógeno está completamente ionizado y no produce líneas. En estrellas más frías, el hidrógeno está en su estado fundamental y absorbe solo en ultravioleta.',
      'Meghnad Saha nació en 1893 en Seoratali, una aldea en el distrito de Dacca (actual Bangladesh), en una familia de escasos recursos económicos. Estudió en el Presidency College de Calcuta, donde fue compañero del futuro físico Satyendra Nath Bose (conocido por la estadística de Bose-Einstein). Saha derivó su ecuación a los 26 años, combinando la termodinámica de Boltzmann con la nueva teoría cuántica de Bohr. Publicó el artículo en la revista Philosophical Magazine en 1920, desde Calcuta, lejos de los centros académicos europeos.',
      'La ecuación de Saha demostró que la intensidad de las líneas espectrales es una función de la temperatura, no de la abundancia. Sin embargo, Saha no aplicó su ecuación para determinar las abundancias químicas reales de las estrellas. Esa tarea requería un análisis cuantitativo riguroso de miles de espectros estelares, comparando las intensidades observadas con las predicciones teóricas de la ecuación para diferentes temperaturas y composiciones. Ese paso crucial lo daría una joven estudiante de doctorado en Harvard llamada Cecilia Payne, quien tomó la herramienta teórica de Saha y la convirtió en el descubrimiento más importante de la astrofísica del siglo XX.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Meghnad Saha fue nominado al Premio Nobel de Física en varias ocasiones pero nunca lo recibió. Su ecuación de ionización es considerada una de las contribuciones más importantes de la física india al conocimiento universal. Saha también fue un activista social y político: fue elegido miembro del Parlamento indio en 1952 y trabajó para modernizar el sistema de calendarios de la India. El cráter Saha en la Luna fue nombrado en su honor en 1979.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación de Saha se expresa como: (n_{i+1} · nₑ) / n_i = (2 / λ³) · (g_{i+1} / g_i) · exp(-χ / kT), donde n_i es la densidad del estado de ionización i, nₑ es la densidad electrónica, λ es la longitud de onda térmica de De Broglie, g son las funciones de partición estadística, χ es el potencial de ionización, k es la constante de Boltzmann y T es la temperatura. Esta ecuación predice con precisión qué fracción de átomos de cada elemento estará ionizada a cada temperatura.' },
    ],
    fact: 'La ecuación de Saha resolvió un problema que parecía trivial pero era profundo: ¿por qué las estrellas tipo B muestran líneas de helio pero no las tipo G? La respuesta no es que las estrellas tipo G carezcan de helio, sino que a 5,800 K (temperatura del Sol), el helio necesita 24.6 electronvoltios para excitar su primer nivel de absorción visible, una energía que los fotones solares rara vez proporcionan. A 25,000 K (estrellas tipo B), los fotones tienen energía suficiente. La misma cantidad de helio produce resultados espectrales opuestos según la temperatura.',
  },
  {
    id: 'clave-cecilia',
    title: 'La Clave de Cecilia',
    color: '#6A9FD5',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_clave-cecilia.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_clave-cecilia.jpg',
    content: [
      'Cecilia Payne llegó al Observatorio de Harvard en 1923 con una misión: usar la ecuación de Saha para calcular la composición química real de las estrellas. Mientras otros astrónomos se limitaban a clasificar espectros visualmente, Payne decidió analizar cuantitativamente las intensidades de las líneas de absorción. Midió la intensidad de cada línea espectral en cientos de espectros estelares, comparó esas mediciones con las predicciones de la ecuación de Saha para diferentes temperaturas y abundancias, y calculó la proporción relativa de cada elemento presente en las atmósferas estelares.',
      'El método de Payne era laborioso y riguroso. Para cada estrella, necesitaba medir la intensidad de docenas de líneas espectrales, identificar a qué elemento y estado de ionización correspondía cada línea, calcular la temperatura de la estrella usando el equilibrio de ionización predicho por Saha, y finalmente derivar la abundancia de cada elemento que producía la mejor concordancia entre las intensidades observadas y las predicciones teóricas. Todo esto lo realizó a mano, sin computadoras, utilizando tablas logarítmicas y una regla de cálculo.',
      'Los resultados de Payne fueron sorprendentes y perturbadores. Para la mayoría de los elementos (hierro, calcio, sodio, magnesio, silicio), las abundancias en las estrellas eran similares a las encontradas en la Tierra. Pero dos elementos mostraban abundancias enormemente superiores: el hidrógeno y el helio. Sus cálculos indicaban que el hidrógeno era un millón de veces más abundante que los metales en las atmósferas estelares. Este resultado contradecía la suposición aceptada de que las estrellas tenían una composición similar a la terrestre.',
      'Payne presentó sus resultados en su tesis doctoral de 1925, titulada "Stellar Atmospheres: A Contribution to the Observational Study of High Temperature in the Reversing Layers of Stars". La tesis fue evaluada por el astrónomo Henry Norris Russell de la Universidad de Princeton, la autoridad máxima en astrofísica de la época. Russell declaró que los resultados sobre la sobreabundancia de hidrógeno eran "claramente imposibles" y le recomendó que los presentara como "probablemente erróneos". Payne, siendo una estudiante joven y sin poder institucional, accedió.',
      'Cecilia escribió en su tesis que las abundancias de hidrógeno y helio eran "casi con certeza no reales". Sin embargo, cuatro años después, en 1929, el propio Henry Norris Russell llegó de forma independiente a la misma conclusión que Payne: las estrellas están compuestas predominantemente de hidrógeno. Russell publicó sus resultados con una breve mención al trabajo previo de Payne, pero recibió gran parte del crédito durante décadas. El astrónomo Otto Struve describió la tesis de Payne en 1962 como "la tesis doctoral más brillante jamás escrita en astronomía", un reconocimiento que llegó 37 años tarde.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cecilia Payne completó su tesis doctoral en menos de dos años, un tiempo notablemente breve para un trabajo de esa magnitud y profundidad. Harlow Shapley, su director de tesis, quedó tan impresionado que hizo que la tesis se publicara como el primer volumen de una nueva serie de monografías del Observatorio de Harvard. Aunque Payne no podía recibir oficialmente un doctorado de Harvard (solo de Radcliffe College), su tesis estableció el estándar de calidad para la astrofísica cuantitativa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Payne analizó espectros de estrellas de diferentes tipos espectrales (O, B, A, F, G, K, M) y demostró que las variaciones en la intensidad de las líneas NO reflejaban diferencias de composición, sino diferencias de temperatura. Una estrella tipo A y una tipo K tienen prácticamente la misma composición química, pero la diferencia de temperatura hace que sus espectros se vean completamente distintos. Esta revelación unificó la secuencia espectral de Harvard como una secuencia de temperatura, no de composición.' },
    ],
    fact: 'Henry Norris Russell escribió a Payne en enero de 1925: "Es claramente imposible que el hidrógeno sea un millón de veces más abundante que los metales". Russell basaba su objeción en la suposición de que las estrellas debían tener una composición similar a los meteoritos terrestres. Sin embargo, Payne tenía razón y Russell estaba equivocado. Cuando Russell publicó su propio artículo confirmando la dominancia del hidrógeno en 1929, citó a Payne en una nota al pie, pero la comunidad científica atribuyó el descubrimiento a Russell durante más de tres décadas.',
  },
  {
    id: 'composicion-estelar',
    title: 'Composición Estelar',
    color: '#B4534A',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_composicion-estelar.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_composicion-estelar.jpg',
    content: [
      'El descubrimiento de que las estrellas están compuestas principalmente de hidrógeno y helio transformó la astronomía y la cosmología. Las mediciones modernas confirman que la composición del Sol es aproximadamente 73.46% hidrógeno, 24.85% helio y solo 1.69% elementos más pesados (que los astrónomos llaman colectivamente "metales", incluyendo oxígeno, carbono, neón y hierro). Esta proporción es representativa de la mayoría de las estrellas del universo observable y refleja la composición primordial del cosmos.',
      'La dominancia del hidrógeno en el universo tiene su origen en el Big Bang. Durante los primeros tres minutos después del Big Bang, hace 13,800 millones de años, las temperaturas y densidades del universo primordial eran lo suficientemente altas para que los protones y neutrones se fusionaran en núcleos ligeros mediante un proceso llamado nucleosíntesis primordial. Los cálculos del físico George Gamow y sus colaboradores Ralph Alpher y Robert Herman en 1948 predijeron que este proceso produciría aproximadamente 75% hidrógeno, 25% helio y trazas de deuterio y litio.',
      'Los elementos más pesados que el helio se forman exclusivamente en el interior de las estrellas mediante fusión nuclear. El hidrógeno se fusiona en helio en el núcleo estelar a temperaturas superiores a 15 millones de Kelvin (proceso protón-protón en estrellas como el Sol, o ciclo CNO en estrellas más masivas). Estrellas con masas suficientes pueden fusionar helio en carbono y oxígeno (proceso triple-alfa), y las estrellas más masivas continúan fusionando elementos cada vez más pesados hasta llegar al hierro (número atómico 26).',
      'El hierro marca el final de la fusión nuclear exotérmica: fusionar hierro en elementos más pesados requiere aportar energía en lugar de liberarla. Los elementos más pesados que el hierro, como el oro, el platino y el uranio, se forman durante las explosiones de supernovas, donde las temperaturas y presiones extremas permiten la captura rápida de neutrones (proceso r). Las colisiones de estrellas de neutrones, detectadas por primera vez mediante ondas gravitacionales en 2017 (evento GW170817), también producen grandes cantidades de elementos pesados.',
      'La frase del astrónomo Carl Sagan "somos polvo de estrellas" tiene un fundamento científico preciso. Cada átomo de carbono en tu cuerpo fue forjado en el núcleo de una estrella que vivió y murió hace miles de millones de años. El oxígeno que respiras, el calcio en tus huesos, el hierro en tu sangre: todos fueron producidos por fusión nuclear en estrellas masivas que explotaron como supernovas, dispersando sus elementos al espacio. Esos átomos eventualmente formaron nubes moleculares que colapsaron gravitacionalmente para formar el Sol, los planetas y, finalmente, los seres vivos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La nucleosíntesis primordial del Big Bang duró solo 17 minutos, desde el minuto 3 hasta el minuto 20 después del origen del universo. Después de eso, la temperatura descendió demasiado para sostener reacciones de fusión nuclear. En esos 17 minutos se formó todo el hidrógeno y helio que constituyen el 98% de la materia bariónica del universo actual. Tuvieron que pasar otros 200 millones de años hasta que las primeras estrellas se encendieron y comenzaron a fabricar los elementos más pesados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Sol convierte 600 millones de toneladas de hidrógeno en helio cada segundo en su núcleo. En este proceso, 4.26 millones de toneladas de masa se convierten en energía pura según E=mc². Esa energía es la que hace brillar al Sol. A pesar de esta tasa de consumo, el Sol tiene hidrógeno suficiente para continuar brillando otros 5,000 millones de años. Cuando agote su hidrógeno central, se expandirá como gigante roja y eventualmente expulsará sus capas externas como nebulosa planetaria.' },
    ],
    fact: 'En 2017, los detectores LIGO y Virgo registraron ondas gravitacionales del evento GW170817, la fusión de dos estrellas de neutrones a 130 millones de años luz de distancia. Los telescopios ópticos observaron una kilonova, una explosión que produjo elementos pesados mediante captura rápida de neutrones. Los astrónomos estimaron que esta sola colisión generó aproximadamente 10 masas terrestres de oro y 50 masas terrestres de platino. Todo el oro de la Tierra, unas 171,300 toneladas, probablemente se originó en colisiones similares hace más de 4,600 millones de años.',
  },
  {
    id: 'espectroscopia-moderna',
    title: 'Espectroscopía Moderna',
    color: '#3A6FA5',
    btnImage: '/assets/cecilia_payne/infographic_m2/btn_espectroscopia-moderna.jpg',
    image: '/assets/cecilia_payne/infographic_m2/hero_espectroscopia-moderna.jpg',
    content: [
      'La espectroscopía que Cecilia Payne usó con placas fotográficas y regla de cálculo se ha transformado en una herramienta de precisión sin precedentes. El Telescopio Espacial Hubble, lanzado en 1990, lleva a bordo espectrómetros capaces de medir líneas espectrales en el rango ultravioleta e infrarrojo cercano con una resolución que Fraunhofer no podría haber soñado. El instrumento STIS (Space Telescope Imaging Spectrograph) del Hubble puede detectar variaciones de velocidad radial de apenas 1 km/s, permitiendo medir el movimiento de galaxias a miles de millones de años luz.',
      'El Telescopio Espacial James Webb (JWST), lanzado el 25 de diciembre de 2021, ha revolucionado la espectroscopía infrarroja. Su instrumento NIRSpec puede obtener espectros simultáneos de hasta 200 objetos gracias a un sistema de microobturadores con 250,000 compuertas individuales. En 2022, el JWST obtuvo el primer espectro de transmisión detallado de la atmósfera del exoplaneta WASP-39b, detectando dióxido de carbono, agua, dióxido de azufre y nubes de silicatos, una hazaña que conecta directamente con la tradición espectroscópica iniciada por Fraunhofer.',
      'El corrimiento al rojo (redshift) es una aplicación espectroscópica que transformó la cosmología. Cuando una galaxia se aleja de nosotros, las líneas espectrales se desplazan hacia longitudes de onda más largas (más rojas). Edwin Hubble usó este efecto en 1929 para demostrar que las galaxias se alejan unas de otras y que el universo se está expandiendo. En 1998, los equipos de Saul Perlmutter y Brian Schmidt usaron supernovas tipo Ia como "velas estándar" y midieron sus corrimientos al rojo para descubrir que la expansión del universo se está acelerando, evidencia de la energía oscura.',
      'La espectroscopía de exoplanetas representa la frontera actual de esta ciencia. Cuando un exoplaneta transita frente a su estrella, una pequeña fracción de la luz estelar atraviesa la atmósfera del planeta. Cada gas atmosférico absorbe longitudes de onda específicas, creando una firma espectral medible. El instrumento ESPRESSO del Very Large Telescope (Chile) y los espectrómetros del JWST pueden detectar vapor de agua, metano, dióxido de carbono y otros biomarcadores potenciales en atmósferas de exoplanetas a decenas de años luz de distancia.',
      'La espectroscopía continúa revelando misterios del cosmos que Cecilia Payne apenas podía intuir. Las observaciones espectrales de cuásares distantes revelan las condiciones del universo primitivo. Los espectros de la radiación cósmica de fondo, medidos por los satélites COBE (1989), WMAP (2001) y Planck (2009), confirmaron las predicciones de la nucleosíntesis primordial sobre las proporciones de hidrógeno y helio. Y la búsqueda espectroscópica de biomarcadores en exoplanetas podría, algún día, responder a la pregunta que ha perseguido a la humanidad durante milenios: ¿estamos solos en el universo?',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El JWST detectó en 2023 la galaxia más lejana confirmada espectroscópicamente: JADES-GS-z14-0, con un corrimiento al rojo de z=14.32. La luz de esta galaxia fue emitida cuando el universo tenía apenas 290 millones de años, solo el 2% de su edad actual. Los espectrómetros del JWST midieron líneas de emisión que confirmaron la presencia de oxígeno en esa galaxia primitiva, lo que indica que ya existían estrellas masivas que habían producido y dispersado elementos pesados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La técnica de velocidad radial, basada en el efecto Doppler espectroscópico, ha permitido descubrir más de 1,000 exoplanetas. Michel Mayor y Didier Queloz usaron esta técnica en 1995 para detectar 51 Pegasi b, el primer exoplaneta confirmado alrededor de una estrella similar al Sol. Midieron oscilaciones de velocidad radial de la estrella de apenas 59 metros por segundo, causadas por el tirón gravitacional del planeta. Esta hazaña les valió el Premio Nobel de Física en 2019.' },
    ],
    fact: 'En 1998, dos equipos independientes (el Supernova Cosmology Project de Saul Perlmutter y el High-z Supernova Search Team de Brian Schmidt y Adam Riess) usaron espectroscopía de supernovas tipo Ia para medir corrimientos al rojo a distancias cósmicas. Descubrieron que las supernovas lejanas eran más tenues de lo esperado, lo que significaba que el universo no solo se expande, sino que la expansión se está acelerando. Este descubrimiento reveló la existencia de la energía oscura, que constituye el 68% del contenido energético del universo. Los tres recibieron el Premio Nobel de Física en 2011.',
  },
];

// ——— Stellar Particle Field (Canvas Background) ——————————————————————————
function StellarField() {
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
      drift: (Math.random() - 0.5) * 0.12,
      hue: Math.random() > 0.5 ? '74,127,181' : '212,115,106', // stellar blue or warm rose
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.06;
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

// ——— Spectroscopy Header ——————————————————————————————————————————————
function SpectroscopyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(74,127,181,0.3))' }}>
        {/* Spectral arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#specGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 spectral markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4A7FB5','#D4736A','#5A8FC5','#C46358','#6A9FD5','#B4534A','#3A6FA5'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central prism icon */}
        <path d="M300 18 L314 44 L286 44 Z" fill="none" stroke="#4A7FB5" strokeWidth="1.5" opacity="0.6" />
        <line x1="282" y1="32" x2="290" y2="32" stroke="#4A7FB5" strokeWidth="1" opacity="0.4" />
        <line x1="310" y1="26" x2="318" y2="22" stroke="#D4736A" strokeWidth="0.8" opacity="0.35" />
        <line x1="310" y1="32" x2="320" y2="32" stroke="#5A8FC5" strokeWidth="0.8" opacity="0.35" />
        <line x1="310" y1="38" x2="318" y2="42" stroke="#B4534A" strokeWidth="0.8" opacity="0.35" />
        <defs>
          <linearGradient id="specGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(74,127,181,0.2)" />
            <stop offset="50%" stopColor="rgba(74,127,181,0.9)" />
            <stop offset="100%" stopColor="rgba(74,127,181,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4A7FB5" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ESPECTROSCOPÍA ESTELAR</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(74,127,181,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LEYENDO LA LUZ DE LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(74,127,181,0.2)'}`,
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
          layoutId="activeDotCeciliaM2"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Player (conditional) ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(74,127,181,0.15)',
    }}>
      <Star size={14} style={{ color: '#4A7FB5', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4A7FB5, #D4736A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(74,127,181,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4A7FB5', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————
export default function InteractiveInfographic_CeciliaM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/cecilia/cecilia_m2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(74,127,181,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StellarField />

      <SpectroscopyHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(74,127,181,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(74,127,181,0.08)', borderRadius: '16px',
              border: '1px solid rgba(74,127,181,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4A7FB5', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Espectroscopía Estelar!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Lectora de Estrellas
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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
