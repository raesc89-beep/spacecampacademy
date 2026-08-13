'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Tesla / Pop Culture themed) ————————————————
function DecoTeslaCoil({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Coil base */}
      <rect x="24" y="40" width="12" height="16" rx="2" fill={color} opacity="0.3" />
      {/* Coil windings */}
      <ellipse cx="30" cy="38" rx="14" ry="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="32" rx="11" ry="3.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <ellipse cx="30" cy="26" rx="8" ry="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="20" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
      {/* Spark at top */}
      <circle cx="30" cy="14" r="3" fill={color} opacity="0.6" />
      {/* Lightning arcs */}
      <path d="M30 14 Q22 8 18 4" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 14 Q38 8 42 4" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 14 Q26 6 30 2" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function DecoFilmReel({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer reel */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {/* Sprocket holes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 21 * Math.cos(rad)} cy={30 + 21 * Math.sin(rad)} r="2.5" fill={color} opacity="0.3" />;
      })}
      {/* Film strip */}
      <path d="M2 48 L58 48" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <path d="M2 52 L58 52" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {[8, 18, 28, 38, 48].map((x, i) => (
        <rect key={i} x={x} y="49" width="4" height="2" fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoGamepad({ size = 70, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Controller body */}
      <path d="M15 12 Q10 12 8 18 L5 30 Q4 35 9 36 L16 36 Q20 36 22 32 L25 24 L45 24 L48 32 Q50 36 54 36 L61 36 Q66 35 65 30 L62 18 Q60 12 55 12 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* D-pad */}
      <rect x="16" y="18" width="3" height="10" rx="1" fill={color} opacity="0.4" />
      <rect x="13" y="21" width="9" height="3" rx="1" fill={color} opacity="0.4" />
      {/* Buttons */}
      <circle cx="50" cy="19" r="2" fill={color} opacity="0.4" />
      <circle cx="55" cy="22" r="2" fill={color} opacity="0.4" />
      <circle cx="50" cy="25" r="2" fill={color} opacity="0.4" />
      <circle cx="45" cy="22" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoBookOpen({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.22, ...style }}>
      {/* Left page */}
      <path d="M35 10 Q25 8 10 12 L10 42 Q25 38 35 40 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.2" />
      {/* Right page */}
      <path d="M35 10 Q45 8 60 12 L60 42 Q45 38 35 40 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.2" />
      {/* Spine */}
      <line x1="35" y1="10" x2="35" y2="40" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Text lines left */}
      {[18, 22, 26, 30, 34].map((y, i) => (
        <line key={i} x1="15" y1={y} x2={28 - i} y2={y} stroke={color} strokeWidth="0.8" opacity="0.3" />
      ))}
      {/* Text lines right */}
      {[18, 22, 26, 30, 34].map((y, i) => (
        <line key={i} x1="40" y1={y} x2={53 - i} y2={y} stroke={color} strokeWidth="0.8" opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoCarSilhouette({ size = 80, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Sleek car body */}
      <path d="M8 28 L14 28 L20 16 L38 12 L58 12 L66 16 L72 28 L76 28" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="22" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="62" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Electric bolt on side */}
      <path d="M38 22 L34 26 L38 26 L35 30" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinejoin="round" />
      {/* Speed lines */}
      <line x1="2" y1="20" x2="8" y2="20" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="4" y1="24" x2="10" y2="24" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function DecoConspiracyEye({ size = 60, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Triangle */}
      <path d="M30 8 L54 48 L6 48 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Eye */}
      <ellipse cx="30" cy="32" rx="10" ry="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="32" r="3" fill={color} opacity="0.4" />
      <circle cx="30" cy="32" r="1.2" fill={color} opacity="0.6" />
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180].map((a, i) => {
        const rad = ((a - 90) * Math.PI) / 180;
        return <line key={i} x1={30 + 14 * Math.cos(rad)} y1={20 + 14 * Math.sin(rad)} x2={30 + 18 * Math.cos(rad)} y2={20 + 18 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.3" />;
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'cientifico-ciencia-ficcion': [DecoTeslaCoil, DecoFilmReel, DecoConspiracyEye],
  'tesla-en-el-cine': [DecoFilmReel, DecoTeslaCoil, DecoCarSilhouette],
  'tesla-en-videojuegos': [DecoGamepad, DecoTeslaCoil, DecoFilmReel],
  'tesla-en-comics-libros': [DecoBookOpen, DecoTeslaCoil, DecoGamepad],
  'la-marca-tesla': [DecoCarSilhouette, DecoTeslaCoil, DecoBookOpen],
  'teorias-conspirativas': [DecoConspiracyEye, DecoTeslaCoil, DecoBookOpen],
  'rescatando-tesla-real': [DecoTeslaCoil, DecoBookOpen, DecoFilmReel],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
  'Inman, M. (2012). Why Nikola Tesla Was the Greatest Geek Who Ever Lived, The Oatmeal / Andrews McMeel Publishing',
  'Vance, A. (2015). Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future, Ecco / HarperCollins',
  'Cheney, M. (1981). Tesla: Man Out of Time, Touchstone / Simon & Schuster',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'cientifico-ciencia-ficcion',
    title: 'El Científico de Ciencia Ficción',
    color: '#6B7B8A',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_cientifico-ciencia-ficcion.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_cientifico-ciencia-ficcion.jpg',
    content: [
      'Nikola Tesla se convirtió en el modelo del «científico loco» de la cultura popular durante su propia vida. En la década de 1890, Tesla realizaba demostraciones públicas en su laboratorio de Nueva York donde sostenía tubos de descarga de gas que se iluminaban en sus manos gracias a campos eléctricos de alta frecuencia y alto voltaje. Los periodistas de la época, como los del New York Times y el New York Herald, describían estas presentaciones como actos de magia, y las fotografías de Tesla rodeado de rayos artificiales —tomadas con doble exposición por el fotógrafo Dickenson Alley en Colorado Springs en 1899— se difundieron por todo el mundo, consolidando su imagen como figura sobrenatural.',
      'La imagen del inventor solitario trabajando con electricidad peligrosa en un laboratorio oscuro influenció directamente la construcción del arquetipo del «científico loco» en el cine y la literatura del siglo XX. El laboratorio del Dr. Frankenstein en las películas de Universal Studios (1931), diseñado por Kenneth Strickfaden, usaba bobinas de Tesla reales para producir los arcos eléctricos que «daban vida» al monstruo. Este equipo fue reutilizado en docenas de películas de ciencia ficción posteriores, convirtiendo la electricidad de Tesla en sinónimo visual de ciencia peligrosa y fronteriza.',
      'La personalidad real de Tesla alimentó también el mito. Hablaba ocho idiomas, afirmaba visualizar sus inventos completos en su mente antes de construirlos y tenía comportamientos obsesivos documentados: exigía que su número de habitación de hotel fuera divisible por 3, calculaba el volumen de sus platos antes de comer, y usaba exactamente 18 servilletas para limpiar su cubertería. El biógrafo W. Bernard Carlson documenta que estas excentricidades eran reales y no simples anécdotas inventadas por la prensa, sino parte de su rutina diaria verificada por múltiples testimonios.',
      'A diferencia de Edison, que cultivó una imagen de hombre de negocios práctico, Tesla proyectaba deliberadamente una imagen de genio visionario. En entrevistas concedidas en las décadas de 1920 y 1930, Tesla anunciaba inventos futuristas como un «rayo de la muerte» (un acelerador de partículas teórico que describió en 1934), comunicación interplanetaria, y máquinas de energía ilimitada. Estas declaraciones, muchas sin fundamento técnico viable, fueron reproducidas sin verificación por periódicos como el New York Times y el Washington Post, mezclando sus logros reales con promesas no cumplidas.',
      'El contraste entre sus contribuciones verificables —el motor de inducción (patentado en 1888), el sistema polifásico de corriente alterna, la bobina de Tesla (1891), y el control remoto por radio (demostrado en 1898)— y sus afirmaciones grandiosas creó una dualidad que la cultura popular ha explotado durante más de un siglo. Tesla se convirtió en un lienzo en blanco donde cada generación proyecta sus propias ansiedades sobre la ciencia, la tecnología y el genio incomprendido, un arquetipo que persiste en películas, series, cómics y videojuegos hasta la actualidad.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las fotografías de Tesla en Colorado Springs, tomadas en 1899, donde aparece leyendo tranquilamente mientras enormes descargas eléctricas cruzan el laboratorio, son en realidad dobles exposiciones fotográficas. Primero se fotografiaron los arcos eléctricos con la bobina encendida (sin Tesla presente por seguridad), y luego se expuso la misma placa con Tesla sentado y la bobina apagada. El fotógrafo Dickenson Alley documentó este proceso. Estas imágenes se publicaron en el Century Magazine en junio de 1900 y se convirtieron en las fotos más reproducidas de Tesla en la historia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bobina de Tesla original de 1891 es un transformador resonante que produce corriente alterna de alto voltaje y baja corriente a frecuencias entre 50 kHz y varios MHz. Funciona mediante acoplamiento inductivo entre un circuito primario de baja impedancia y un circuito secundario de alta impedancia, ambos sintonizados a la misma frecuencia de resonancia. Las descargas visibles se producen cuando el voltaje en el terminal superior supera la rigidez dieléctrica del aire circundante (aproximadamente 30 kV por centímetro a presión atmosférica estándar).' },
    ],
    fact: 'Kenneth Strickfaden, el diseñador de efectos especiales de la película «Frankenstein» de Universal Studios (1931), construyó sus generadores eléctricos basándose directamente en diseños de bobinas de Tesla. Este equipo, que incluía generadores Van de Graaff modificados y bobinas de Tesla de alta frecuencia, fue almacenado por Strickfaden durante décadas y reutilizado en «La Novia de Frankenstein» (1935), «El Hijo de Frankenstein» (1939), y en la parodia «El Jovencito Frankenstein» de Mel Brooks (1974). Las máquinas originales de Strickfaden fueron donadas al museo de la feria estatal de California tras su muerte en 1984.',
  },
  {
    id: 'tesla-en-el-cine',
    title: 'Tesla en el Cine',
    color: '#D4A535',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_tesla-en-el-cine.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_tesla-en-el-cine.jpg',
    content: [
      'La representación cinematográfica más conocida de Nikola Tesla es la interpretación de David Bowie en la película «The Prestige» (El Truco Final) dirigida por Christopher Nolan en 2006. En la película, basada en la novela de Christopher Priest de 1995, Tesla aparece como un inventor que construye una máquina de teletransportación en Colorado Springs. Aunque la máquina es ficción, Nolan recreó con precisión el laboratorio real de Tesla en Colorado Springs (1899-1900) y la bobina amplificadora que Tesla construyó allí, cuya antena medía 43 metros de altura y generó rayos artificiales de hasta 41 metros de longitud.',
      'Antes de «The Prestige», Tesla apareció en diversas producciones cinematográficas con diferentes grados de precisión histórica. En la película yugoslava «Tajna Nikole Tesle» (El Secreto de Nikola Tesla, 1980), dirigida por Krsto Papić, el actor Petar Božović interpretó a Tesla con asesoramiento de ingenieros eléctricos serbios, logrando una de las representaciones más técnicamente precisas de sus experimentos. La película incluyó recreaciones de la demostración del motor de inducción polifásico ante la Sociedad Americana de Ingenieros Eléctricos en mayo de 1888.',
      'En el terreno documental, la serie de PBS «Tesla: Master of Lightning» (2000), producida por Robert Uth, utilizó documentos originales del Museo Tesla de Belgrado y entrevistas con los biógrafos W. Bernard Carlson y Marc Seifer. Este documental es considerado por historiadores de la tecnología como la representación audiovisual más rigurosa de la vida de Tesla. En 2020, el documental «Tesla: Visionary of Modern Times» del director húngaro József Bata añadió material de archivo digitalizado del Archivo Tesla de Belgrado, incluyendo cartas y diagramas técnicos inéditos.',
      'La película «Tesla» (2020), dirigida por Michael Almereyda y protagonizada por Ethan Hawke, adoptó un enfoque experimental, rompiendo la cuarta pared y usando anacronismos deliberados (como Tesla cantando karaoke). El film recibió críticas mixtas por su libertad creativa, pero fue elogiado por mostrar aspectos menos conocidos de Tesla, como su relación profesional con Anne Morgan (hija del financiero J.P. Morgan) y las negociaciones fallidas por la financiación de la torre Wardenclyffe en Shoreham, Long Island, entre 1901 y 1905.',
      'La tendencia cinematográfica reciente muestra un cambio en la representación de Tesla: de villano o científico loco excéntrico en películas de serie B de los años 1950-1980, a genio incomprendido y víctima del capitalismo en las producciones del siglo XXI. Este cambio refleja la revalorización cultural de Tesla impulsada por internet a partir de 2009-2012, cuando sitios web como The Oatmeal, Reddit, y comunidades de divulgación científica popularizaron la narrativa de Tesla como héroe trágico frente a un Edison supuestamente villano, una simplificación que los historiadores de la tecnología consideran inexacta pero culturalmente poderosa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'David Bowie aceptó el papel de Tesla en «The Prestige» porque había admirado a Tesla desde la década de 1970. Nolan relató que Bowie fue su primera y única opción para el papel. El equipo de producción recreó el laboratorio de Colorado Springs usando planos originales del archivo de Tesla en Belgrado, y las bobinas de Tesla usadas en el rodaje eran funcionales: producían descargas reales de hasta 6 metros de longitud bajo supervisión de ingenieros eléctricos especializados en efectos prácticos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bobina amplificadora (magnifying transmitter) que Tesla construyó en Colorado Springs en 1899 operaba a una frecuencia de resonancia de aproximadamente 150 kHz y alcanzaba voltajes de salida estimados en 12 millones de voltios. Tesla registró en sus notas (publicadas póstumamente como «Colorado Springs Notes, 1899-1900» en 1978 por el Museo Tesla de Belgrado) que las descargas producidas por esta bobina podían escucharse como truenos a una distancia de 24 kilómetros y causaron un apagón en el generador de la compañía eléctrica local El Paso Electric Company.' },
    ],
    fact: 'La escena de «The Prestige» donde Tesla demuestra su máquina fue filmada en el Mount Wilson Observatory en Pasadena, California, no en Colorado. Christopher Nolan eligió esta locación porque su arquitectura de principios del siglo XX evocaba la estética de la época de Tesla. La producción contrató al especialista en efectos prácticos John Richardson, quien construyó bobinas de Tesla funcionales para el rodaje. Las chispas y arcos eléctricos visibles en la película son en su mayoría reales, no generados por computadora, lo que requirió protocolos de seguridad similares a los utilizados en laboratorios de investigación de alto voltaje.',
  },
  {
    id: 'tesla-en-videojuegos',
    title: 'Tesla en Videojuegos',
    color: '#7A8B96',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_tesla-en-videojuegos.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_tesla-en-videojuegos.jpg',
    content: [
      'La «Tesla Coil» (bobina de Tesla) es una de las armas defensivas más reconocidas en la historia de los videojuegos, apareciendo como torre de defensa en la serie «Command & Conquer: Red Alert» desde 1996. En estos juegos de estrategia en tiempo real desarrollados por Westwood Studios, la bobina de Tesla es un arma del ejército soviético que electrocuta unidades enemigas con arcos eléctricos de alto voltaje. El diseño visual de la torre se basa directamente en las bobinas de Tesla reales, y se convirtió en un ícono de la saga. En «Red Alert 2» (2000) y «Red Alert 3» (2008), la bobina de Tesla se mantuvo como elemento central del arsenal soviético.',
      'En «Assassin\'s Creed II» (2009), desarrollado por Ubisoft Montreal, Nikola Tesla aparece referenciado a través de la narrativa del juego sobre conspiraciones históricas. La saga «Assassin\'s Creed» establece que inventores como Tesla, Leonardo da Vinci y otros genios históricos tuvieron acceso a tecnología de una civilización precursora llamada «Los Que Fueron Antes» (Isu). En «Assassin\'s Creed II», el jugador interactúa con máquinas diseñadas por Leonardo da Vinci; Tesla aparece en la cronología expandida del juego como otro receptor de esta tecnología antigua, vinculando sus inventos a artefactos alienígenas ficticios.',
      'La serie «BioShock» (2007-2013), creada por Ken Levine en Irrational Games, presenta un universo alternativo donde la ciudad submarina de Rapture fue construida con tecnología eléctrica avanzada. Aunque Tesla no es un personaje directo, la estética visual del juego —con neón art déco, electrificación ubicua, y la alteración genética mediante «ADAM»— se inspira en la visión tesliana de un mundo alimentado por electricidad inalámbrica. Los «plásmidos» eléctricos del juego, que permiten al jugador lanzar rayos desde sus manos, son un homenaje visual directo a las demostraciones de Tesla con corriente de alta frecuencia.',
      'El juego independiente «Tesla vs Lovecraft» (2018), desarrollado por 10tons Ltd, convierte a Tesla en un héroe de acción que combate criaturas de los mitos de H.P. Lovecraft usando armas eléctricas y un exoesqueleto mecánico. Aunque es una fantasía, el juego incluye versiones ficticias de inventos reales de Tesla: la bobina de Tesla portátil, el transmisor amplificador, y el control remoto por radio. Otros juegos como «Order of Tesla» (2013) y «Dark Void» (2010) también presentan a Tesla como inventor de tecnología futurista, cimentando su posición como personaje recurrente en el medio.',
      'La presencia de Tesla en videojuegos refleja un patrón donde la cultura popular toma elementos reales —la electricidad de alta frecuencia, las bobinas resonantes, la transmisión inalámbrica de energía— y los amplifica hasta convertirlos en armas o poderes sobrenaturales. Según el diseñador de juegos Warren Spector, creador de «Deus Ex» (2000), Tesla es un «personaje perfecto para videojuegos» porque sus inventos reales ya parecen ciencia ficción. La bobina de Tesla aparece en más de 40 videojuegos documentados entre 1996 y 2025, convirtiéndola en el dispositivo científico real más representado en la historia del medio interactivo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En «Command & Conquer: Red Alert» (1996), la bobina de Tesla fue diseñada como la contrapartida soviética del «Obelisk of Light» de la facción GDI. El diseñador del juego, Brett Sperry, eligió la bobina de Tesla como arma soviética porque encajaba con la estética tecnológica soviética de la Guerra Fría y porque las imágenes reales de bobinas de Tesla descargando electricidad eran visualmente más impactantes que cualquier arma ficticia que pudieran inventar. La torre se convirtió en el edificio más popular de la saga según encuestas a jugadores realizadas por Westwood Studios en 1997.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La transmisión inalámbrica de energía que Tesla propuso en 1901 con la torre Wardenclyffe se basa en el principio de resonancia electromagnética acoplada. Tesla pretendía transmitir energía a través de la tierra y la ionosfera usando ondas estacionarias a la frecuencia de resonancia de Schumann (aproximadamente 7.83 Hz para el modo fundamental). Los cálculos modernos demuestran que la eficiencia de este sistema habría sido extremadamente baja (menos del 1%) para la transmisión de energía a grandes distancias, aunque el principio básico funciona a distancias cortas y se usa hoy en cargadores inalámbricos de teléfonos que operan mediante inducción resonante a 6.78 MHz.' },
    ],
    fact: 'La primera aparición de una «bobina de Tesla» como arma en un videojuego no fue en «Command & Conquer» sino en «Tesla: The Weather Man» (1992), un juego de DOS poco conocido desarrollado por Safari Software. En este juego, Tesla usaba su «rayo de la muerte» para destruir tornados y tormentas. Sin embargo, fue «Command & Conquer: Red Alert» (1996) el que popularizó el concepto y lo convirtió en un tropo recurrente del medio. Desde entonces, la bobina de Tesla ha aparecido como arma o dispositivo en juegos como «Fallout» (1997), «Wolfenstein» (2009), «Tomb Raider» (2013), y «Destiny 2» (2017), entre otros.',
  },
  {
    id: 'tesla-en-comics-libros',
    title: 'Tesla en Cómics y Libros',
    color: '#C49225',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_tesla-en-comics-libros.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_tesla-en-comics-libros.jpg',
    content: [
      'El cómic web «Why Nikola Tesla Was the Greatest Geek Who Ever Lived», publicado por Matthew Inman en The Oatmeal en mayo de 2012, es probablemente la pieza de contenido individual más influyente en la rehabilitación moderna de la imagen de Tesla. El cómic, que recibió más de 80 millones de visitas en sus primeros dos años, presentaba a Tesla como un genio visionario injustamente olvidado y a Edison como un villano que robaba ideas y electrocutaba animales. Aunque historiadores como W. Bernard Carlson y Paul Israel señalaron que el cómic contenía múltiples inexactitudes y simplificaciones, su impacto cultural fue enorme.',
      'A raíz del cómic, Inman lanzó en agosto de 2012 una campaña en IndieGoGo para comprar el antiguo laboratorio de Tesla en Wardenclyffe, Shoreham, Long Island, y convertirlo en museo. La campaña recaudó 1.37 millones de dólares en solo 9 días, con contribuciones de más de 33,000 donantes. El terreno fue adquirido por la Tesla Science Center at Wardenclyffe, una organización sin fines de lucro que trabaja desde entonces en la restauración del edificio original diseñado por el arquitecto Stanford White en 1901. Elon Musk donó un millón de dólares adicional al proyecto en 2014.',
      'En el mundo del cómic tradicional, «Atomic Robo» de Brian Clevinger y Scott Wegman (Red 5 Comics, 2007-presente) presenta un robot consciente construido por Tesla en 1923 que continúa teniendo aventuras en el siglo XXI. El cómic recibió múltiples nominaciones a premios Eisner y Harvey, y se distingue por su compromiso con la precisión científica: cada volumen incluye notas explicando la ciencia real detrás de las aventuras ficticias, y los autores consultan regularmente con físicos e ingenieros para mantener la plausibilidad de las historias.',
      'La novela gráfica «Five Fists of Science» de Matt Fraction y Steven Sanders (Image Comics, 2006) presenta una historia alternativa donde Tesla y Mark Twain se alían para combatir a J.P. Morgan y Thomas Edison usando robots gigantes alimentados por electricidad de Tesla. Aunque es ficción, la amistad real entre Tesla y Mark Twain está documentada históricamente: Twain visitó el laboratorio de Tesla en la calle Houston, Nueva York, en múltiples ocasiones en la década de 1890, y existe una fotografía de 1894 donde Twain sostiene un tubo de descarga iluminado en el laboratorio de Tesla.',
      'En la literatura de no ficción, tres biografías son consideradas referencias esenciales por historiadores de la tecnología. «Tesla: Man Out of Time» de Margaret Cheney (1981) fue la primera biografía moderna en inglés y popularizó muchas anécdotas sobre Tesla, aunque algunos historiadores la critican por ser demasiado hagiográfica. «Wizard: The Life and Times of Nikola Tesla» de Marc Seifer (1996) se basó en más de 20 años de investigación y acceso a los archivos del FBI sobre Tesla. «Tesla: Inventor of the Electrical Age» de W. Bernard Carlson (2013), publicado por Princeton University Press, es considerada la biografía académica definitiva y corrige múltiples errores y mitos perpetuados por obras anteriores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La campaña de The Oatmeal para comprar Wardenclyffe en 2012 recibió un impulso inesperado cuando el sitio web de la campaña se cayó por exceso de tráfico en las primeras 24 horas. Matthew Inman publicó un cómic adicional pidiendo a la gente que volviera cuando el servidor se recuperara. La campaña original tenía una meta de 850,000 dólares para igualar una oferta del estado de Nueva York; la superaron en menos de una semana. Entre los donantes estaban notables como Elon Musk, el astronauta Buzz Aldrin, y los cofundadores de Google, Larry Page y Sergey Brin.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La torre Wardenclyffe, diseñada por Stanford White y construida entre 1901 y 1902, consistía en un edificio de laboratorio de ladrillo de 28 por 28 metros y una torre de transmisión de madera de 57 metros de altura coronada por una cúpula hemisférica de cobre de 20 metros de diámetro. Bajo la torre, Tesla excavó un sistema de túneles y pozos que descendían 36 metros hasta alcanzar el nivel freático, parte de su plan para transmitir energía eléctrica a través de la corteza terrestre. La torre fue demolida en 1917 para pagar las deudas de Tesla, pero el edificio del laboratorio sobrevive y es un Monumento Histórico Nacional desde 2018.' },
    ],
    fact: 'Mark Twain y Tesla mantuvieron una amistad documentada desde 1893 hasta la muerte de Twain en 1910. Tesla recibió a Twain en su laboratorio de la calle Houston al menos cuatro veces entre 1894 y 1895. En una visita, Tesla sometió a Twain a su «oscilador mecánico», una máquina que producía vibraciones de alta frecuencia. Según el relato de Tesla publicado en su autobiografía «My Inventions» (1919), Twain disfrutó la sensación vibratoria durante varios minutos hasta que suplicó que la apagaran por un efecto laxante inesperado. Esta anécdota ha sido reproducida en múltiples biografías, aunque algunos historiadores cuestionan los detalles exactos.',
  },
  {
    id: 'la-marca-tesla',
    title: 'La Marca Tesla',
    color: '#8A9AA6',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_la-marca-tesla.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_la-marca-tesla.jpg',
    content: [
      'Tesla, Inc. (originalmente Tesla Motors) fue fundada el 1 de julio de 2003 por Martin Eberhard y Marc Tarpenning, dos ingenieros de Silicon Valley que eligieron el nombre «Tesla Motors» en honor a Nikola Tesla porque su motor de inducción de corriente alterna, patentado en 1888, es el ancestro directo de los motores eléctricos utilizados en los vehículos de la compañía. Elon Musk se incorporó en febrero de 2004 como presidente del consejo directivo y principal inversor, aportando 6.5 millones de dólares de la ronda de financiación Serie A de 7.5 millones.',
      'La conexión técnica entre Nikola Tesla y los vehículos Tesla es directa y verificable. El motor del Tesla Model S utiliza un motor de inducción trifásico de corriente alterna, el mismo principio que Tesla patentó el 1 de mayo de 1888 (patente estadounidense No. 381,968). La diferencia es que los motores de Tesla, Inc. usan electrónica de potencia moderna (inversores con transistores IGBT y luego MOSFET de carburo de silicio) para controlar la frecuencia y amplitud de la corriente, logrando una eficiencia superior al 90%. Tesla demostró su motor original ante la AIEE (American Institute of Electrical Engineers) el 16 de mayo de 1888, alcanzando una eficiencia de aproximadamente 85%, notable para la época.',
      'La decisión de nombrar la empresa «Tesla» generó una disputa legal con Tesla Electric Company, una compañía de Sacramento, California, que había registrado la marca «Tesla» para productos eléctricos en 1994. Tesla Motors adquirió los derechos de la marca en 2004 por una suma no revelada. Ashlee Vance, en su biografía de Elon Musk publicada en 2015, documenta que Musk consideró el nombre «Tesla» esencial para la identidad de la marca porque evocaba innovación eléctrica, genio individual, y tecnología visionaria: exactamente la imagen que quería proyectar para sus vehículos eléctricos.',
      'El impacto de Tesla, Inc. en la percepción pública de Nikola Tesla es cuantificable. Según datos de Google Trends, las búsquedas del término «Nikola Tesla» aumentaron un 340% entre 2010 y 2020, correlacionándose directamente con el crecimiento de la popularidad de Tesla, Inc. y sus vehículos. Antes de la fundación de Tesla Motors, Tesla era un personaje relativamente oscuro fuera de los círculos de ingeniería eléctrica y la comunidad serbia. La marca convirtió su nombre en una de las palabras más reconocidas del mundo, asociada simultáneamente con coches eléctricos, innovación tecnológica, y el inventor histórico.',
      'Sin embargo, historiadores de la tecnología como Carlson y Seifer han señalado que la asociación entre Nikola Tesla y Tesla, Inc. distorsiona la comprensión pública del inventor real. Tesla no fue un emprendedor tecnológico al estilo de Silicon Valley; fue un inventor que dependía de mecenas financieros como George Westinghouse y J.P. Morgan, y que frecuentemente priorizaba la investigación pura sobre la comercialización. La unidad de medida «tesla» (T), adoptada por la Conferencia General de Pesas y Medidas (CGPM) en 1960 para medir la densidad de flujo magnético (1 T = 1 Wb/m² = 1 kg/(A·s²)), representa un reconocimiento científico más preciso de sus contribuciones que el nombre de una empresa de automóviles.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer vehículo de Tesla Motors, el Tesla Roadster (2008-2012), usaba un motor de inducción trifásico de corriente alterna que producía 248 caballos de fuerza y aceleraba de 0 a 100 km/h en 3.7 segundos. El motor pesaba solo 52 kilogramos y giraba a un máximo de 14,000 RPM. Se construyeron 2,450 unidades del Roadster original. En contraste, el motor de inducción original de Tesla, construido en 1887, pesaba varios cientos de kilogramos y producía aproximadamente 0.5 caballos de fuerza, pero demostró por primera vez que la corriente alterna polifásica podía producir rotación mecánica eficiente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La unidad tesla (T) mide la densidad de flujo magnético (también llamada inducción magnética). Un tesla equivale a un weber por metro cuadrado (1 Wb/m²). Para referencia: el campo magnético de la Tierra en la superficie varía entre 25 y 65 microteslas (μT). Una máquina de resonancia magnética (MRI) hospitalaria opera típicamente entre 1.5 y 3 teslas. El imán superconductor más potente del laboratorio nacional de campos magnéticos altos (NHMFL) en Tallahassee, Florida, ha alcanzado 45.5 teslas. La unidad fue adoptada oficialmente por la CGPM en la 11ª conferencia celebrada en París en 1960.' },
    ],
    fact: 'Elon Musk no es el fundador de Tesla, Inc., sino su mayor inversor inicial y actual CEO. Los fundadores originales, Martin Eberhard y Marc Tarpenning, fueron ingenieros que habían trabajado previamente en la empresa de lectores de libros electrónicos NuvoMedia (creadora del Rocket eBook en 1998). Eberhard fue destituido como CEO en 2007 y demandó a Musk y a Tesla en 2009, alegando calumnias y fraude. El caso se resolvió extrajudicialmente en 2009, y un acuerdo legal permite que cinco personas —Eberhard, Tarpenning, Musk, J.B. Straubel, e Ian Wright— se denominen «cofundadores» de Tesla.',
  },
  {
    id: 'teorias-conspirativas',
    title: 'Teorías Conspirativas',
    color: '#B88420',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_teorias-conspirativas.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_teorias-conspirativas.jpg',
    content: [
      'La teoría conspirativa más difundida sobre Tesla afirma que inventó un sistema de «energía libre» que fue suprimido por corporaciones y gobiernos para proteger la industria del petróleo. Esta narrativa se basa en la torre Wardenclyffe (1901-1917), que Tesla diseñó para transmitir energía eléctrica de forma inalámbrica a escala global. Sin embargo, los análisis de ingeniería realizados por Robert Golka (1973-1979) y más recientemente por los ingenieros Kenneth y James Corum (publicados en «Nikola Tesla and the Electrical Signals of Planetary Origin», 1996) demuestran que el sistema de Wardenclyffe habría tenido una eficiencia de transmisión energética extremadamente baja, inferior al 1% a distancias intercontinentales.',
      'La confiscación de los documentos de Tesla por el FBI tras su muerte el 7 de enero de 1943 alimentó décadas de especulación. Los documentos fueron revisados por John G. Trump (tío del expresidente Donald Trump), un ingeniero eléctrico del MIT que trabajaba para el National Defense Research Committee. Trump concluyó en su informe de enero de 1943 que los papeles «no contenían principios científicos ni invenciones con valor significativo». Los documentos fueron desclasificados parcialmente en 2016 bajo la Ley de Libertad de Información (FOIA), y su contenido confirma la evaluación de Trump: consistían principalmente en notas de investigación sobre turbinas, ideas sobre rayos cósmicos, y correspondencia personal.',
      'La «máquina de terremotos» de Tesla es otra leyenda popular basada en un evento real exagerado. En 1898, Tesla construyó un pequeño oscilador mecánico en su laboratorio de la calle Houston en Nueva York. Según su relato publicado en la revista «New York World American» el 7 de julio de 1935, el dispositivo causó vibraciones en edificios circundantes cuando lo conectó a una viga de acero. Tesla afirmó que tuvo que destruirlo con un martillo para detener las vibraciones. Sin embargo, las réplicas modernas del oscilador de Tesla, incluyendo una construida por el programa «MythBusters» en 2006 (temporada 4, episodio 17), demostraron que el dispositivo produce vibraciones detectables pero carece de la potencia necesaria para causar daños estructurales en edificios.',
      'El mito de que Tesla fue deliberadamente borrado de la historia por un complot de Edison y Westinghouse es refutado por el registro histórico. Tesla recibió la Medalla Edison de la AIEE en 1917 (la distinción más prestigiosa en ingeniería eléctrica estadounidense), fue portada de la revista Time el 20 de julio de 1931 (su cumpleaños 75), y fue homenajeado públicamente por Robert Millikan (Premio Nobel 1923) y Arthur Compton (Premio Nobel 1927) en su cumpleaños 79. La unidad tesla fue adoptada en su honor en 1960, solo 17 años después de su muerte, un reconocimiento más rápido que el otorgado a muchos otros científicos.',
      'Las teorías conspirativas sobre Tesla prosperan porque mezclan elementos verificables con conclusiones infundadas. Es verdad que Tesla murió en la pobreza (habitación 3327 del Hotel New Yorker), que el FBI confiscó sus documentos, y que algunos de sus proyectos fueron abandonados por falta de financiación. Pero la conclusión de que esto prueba una conspiración para suprimir «energía libre» ignora las razones técnicas y económicas documentadas por historiadores como Carlson, Seifer, y Cheney. La torre Wardenclyffe no fue destruida por conspiradores sino demolida en 1917 para pagar deudas pendientes con el hotel Waldorf-Astoria, por orden de un tribunal de Nueva York.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'John G. Trump, el ingeniero del MIT que revisó los documentos de Tesla en 1943, fue un científico de alto nivel que dirigió la investigación del MIT sobre generadores de Van de Graaff de alta energía para el tratamiento del cáncer mediante radioterapia. Trump recibió la Medalla Nacional de Ciencia de Estados Unidos en 1983, otorgada por el presidente Reagan. Su evaluación de los papeles de Tesla como «no conteniendo principios nuevos significativos» es consistente con el período tardío de Tesla, cuando el inventor se enfocaba más en ideas teóricas especulativas que en investigación experimental rigurosa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La «energía libre» que los conspiracionistas atribuyen a Tesla viola la Primera Ley de la Termodinámica (conservación de la energía) y la Segunda Ley (la entropía de un sistema aislado siempre aumenta o permanece constante). No existe ningún dispositivo que pueda extraer energía útil de la «nada» o del «vacío cuántico» en cantidades macroscópicas utilizables. La energía del punto cero del vacío cuántico es real, pero los cálculos de la física cuántica de campos demuestran que extraerla en cantidades significativas requeriría densidades de energía comparables a las de un agujero negro, algo técnicamente inviable con cualquier tecnología concebible.' },
    ],
    fact: 'Los documentos confiscados de Tesla por el FBI en 1943 fueron desclasificados en varias etapas entre 2016 y 2022. El archivo completo, disponible a través del portal FOIA del FBI (vault.fbi.gov), consiste en aproximadamente 300 páginas de correspondencia, notas técnicas, y recortes de periódico. El contenido incluye cartas de Tesla a múltiples gobiernos ofreciendo su «rayo de la muerte» como arma defensiva, notas sobre un motor de turbina sin palas (patentado en 1913), y correspondencia personal con familiares en Serbia. Ningún documento contiene planos para dispositivos de «energía libre» o tecnología revolucionaria suprimida.',
  },
  {
    id: 'rescatando-tesla-real',
    title: 'Rescatando al Tesla Real',
    color: '#5A6B7A',
    btnImage: '/assets/nikola_tesla/infographic_m9/btn_rescatando-tesla-real.jpg',
    image: '/assets/nikola_tesla/infographic_m9/hero_rescatando-tesla-real.jpg',
    content: [
      'La rehabilitación académica de Nikola Tesla comenzó con la biografía de Margaret Cheney «Tesla: Man Out of Time» (1981), que fue el primer libro en inglés en presentar una narrativa completa de su vida desde su nacimiento en Smiljan, Croacia (entonces Imperio Austrohúngaro) el 10 de julio de 1856, hasta su muerte en Nueva York el 7 de enero de 1943. Cheney tuvo acceso a los archivos del Museo Tesla de Belgrado y entrevistó a personas que habían conocido al inventor en sus últimos años, incluyendo Kenneth Swezey, un periodista que mantuvo correspondencia con Tesla desde 1931 hasta 1943.',
      'La biografía de W. Bernard Carlson «Tesla: Inventor of the Electrical Age» (Princeton University Press, 2013) representa el estudio académico más riguroso disponible. Carlson, profesor de historia de la ciencia en la Universidad de Virginia, dedicó 15 años a investigar los archivos de Tesla en Belgrado, los archivos de Westinghouse en Pittsburgh, y los registros de patentes de la Oficina de Patentes de Estados Unidos. Su análisis corrige varios mitos: Tesla no «inventó la corriente alterna» (que ya existía), sino que desarrolló el sistema polifásico práctico; Tesla no fue «robado» por Edison, sino que trabajó para Edison solo 6 meses en 1884 y renunció por desacuerdos salariales documentados.',
      'Las contribuciones verificables de Tesla al desarrollo tecnológico incluyen: el motor de inducción polifásico (patentes US381,968 y US382,280, 1888), que hizo viable la electrificación industrial con corriente alterna; la bobina de Tesla (1891), usada hoy en receptores de radio, televisores y equipos médicos; la demostración pública de control remoto por radio (Madison Square Garden, septiembre de 1898); y contribuciones al desarrollo de la tecnología de rayos X (Tesla produjo imágenes de rayos X de forma independiente en 1894, casi simultáneamente con Wilhelm Röntgen en Alemania).',
      'El debate Edison vs. Tesla, popularizado por internet en la década de 2010, distorsiona la historia real según historiadores como Paul Israel (director del proyecto Edison Papers en la Universidad Rutgers) y Carlson. Edison y Tesla trabajaron en campos diferentes durante la mayor parte de sus carreras. La «Guerra de las Corrientes» (1886-1893) fue principalmente una competencia comercial entre Edison General Electric y Westinghouse Electric, no una rivalidad personal entre dos inventores. Tesla trabajó para Westinghouse bajo contrato y no fue el líder estratégico de la campaña pro-corriente alterna; ese papel correspondió al propio George Westinghouse y a su equipo de ingenieros.',
      'La imagen equilibrada de Tesla reconoce tanto sus logros como sus limitaciones. Tesla fue un ingeniero eléctrico de primer nivel cuyas patentes de corriente alterna polifásica fueron esenciales para la electrificación moderna. Pero también hizo afirmaciones no verificadas sobre comunicación con Marte (1899), produjo ideas técnicamente inviables como la transmisión inalámbrica de energía a escala global, y sus últimos 30 años de vida estuvieron marcados por anuncios de inventos que nunca materializó. Reconocer esta complejidad —un genio con logros reales y limitaciones humanas— es más respetuoso con su legado que la caricatura simplificada de «genio perfecto contra villano corporativo» que predomina en la cultura popular actual.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla fue nominado para el Premio Nobel de Física en 1937, según documentos del Archivo Nobel desclasificados en 1987. La nominación fue presentada por el físico sueco Gustaf Dalén. Sin embargo, el premio de ese año fue otorgado a Clinton Davisson y George Paget Thomson por la difracción de electrones. La historia de que Tesla rechazó el Nobel para no compartirlo con Edison en 1915 no tiene sustento documental: la correspondencia del comité Nobel de ese año muestra que ni Tesla ni Edison fueron finalistas serios, y el premio fue otorgado a William Henry Bragg y William Lawrence Bragg por la difracción de rayos X.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor de inducción polifásico de Tesla, patentado en 1888, funciona mediante el principio del campo magnético giratorio. Tres bobinas de estátor, alimentadas con corrientes alternas desfasadas 120 grados entre sí, generan un campo magnético que rota a una velocidad determinada por la frecuencia de la corriente (velocidad síncrona). Este campo induce corrientes en el rotor (por la Ley de Faraday), que a su vez generan un campo magnético que interactúa con el campo del estátor, produciendo torque y rotación. El rotor siempre gira ligeramente más lento que el campo (deslizamiento), típicamente entre 1% y 5% en motores modernos de inducción.' },
    ],
    fact: 'El Museo Nikola Tesla en Belgrado, Serbia, fundado en 1952, alberga la colección más completa de objetos personales, documentos originales y modelos de inventos de Tesla. La colección incluye más de 160,000 documentos, 1,200 dispositivos y aparatos, y aproximadamente 1,500 fotografías. En 2003, la colección completa fue inscrita en el Registro de la Memoria del Mundo de la UNESCO, reconociéndola como patrimonio documental de la humanidad. El museo recibe aproximadamente 120,000 visitantes al año y ha digitalizado más del 60% de su archivo, haciendo accesibles en línea cartas, diagramas técnicos y cuadernos de laboratorio del inventor.',
  },
];

// ——— Electric Storm Field (Canvas Background) ————————————————————————
function ElectricStormField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ——— Tesla Pop Culture Header ————————————————————————————————————
function TeslaPopHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Electric arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#teslaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central lightning bolt icon */}
        <path d="M304 18 L296 32 L302 32 L294 44" fill="none" stroke="#D4A535" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <circle cx="300" cy="30" r="16" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.4" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TESLA EN LA CULTURA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">DEL MITO AL GENIO REAL</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotTeslaM9"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

        {/* ——— Video Section (conditional) ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
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

// ——— Progress Bar ————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A535, #6B7B8A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————
export default function InteractiveInfographic_TeslaM9() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/tesla/tesla_m9.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ElectricStormField />

      <TeslaPopHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado a Tesla en toda la Cultura Popular!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Historiador de Tesla
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
