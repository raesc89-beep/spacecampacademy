'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Kepler, TESS & JWST Telescopes themed) ────────
function DecoKepler({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="20" y="20" width="20" height="25" rx="3" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="20,20 40,20 35,8 25,8" fill={color} opacity="0.5" />
      <line x1="10" y1="32" x2="20" y2="32" stroke={color} strokeWidth="2" />
      <line x1="40" y1="32" x2="50" y2="32" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="32" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function DecoTess({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="15" y="15" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="31" y="15" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="15" y="31" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="31" y="31" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill={color} />
      <circle cx="38" cy="22" r="3" fill={color} />
      <circle cx="22" cy="38" r="3" fill={color} />
      <circle cx="38" cy="38" r="3" fill={color} />
    </svg>
  );
}

function DecoJwst({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,8 40,14 40,26 30,32 20,26 20,14" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="18,28 28,34 28,46 18,52 8,46 8,34" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="42,28 52,34 52,46 42,52 32,46 32,34" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="20" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoTransmission({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="21" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="5" y1="30" x2="55" y2="30" stroke="#FF5252" strokeWidth="2" opacity="0.8" />
      <circle cx="10" cy="30" r="2" fill="#FF5252" />
      <circle cx="50" cy="30" r="2" fill="#FF5252" />
    </svg>
  );
}

function DecoInfrared({ size = 70, color = '#FF80AB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 10 20 Q 20 10, 30 20 T 50 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 10 30 Q 20 20, 30 30 T 50 30" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <path d="M 10 40 Q 20 30, 30 40 T 50 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function DecoSpaceArray({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="48" cy="18" r="5" fill={color} />
      <line x1="48" y1="18" x2="54" y2="12" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'mision-kepler': [DecoKepler, DecoTess, DecoSpaceArray],
  'fotometria-espacial': [DecoTess, DecoKepler, DecoTransmission],
  'mision-tess': [DecoTess, DecoKepler, DecoJwst],
  'telescopio-jwst': [DecoJwst, DecoInfrared, DecoTransmission],
  'espectroscopia-transmision': [DecoTransmission, DecoJwst, DecoInfrared],
  'fotometria-eclipse-secundario': [DecoInfrared, DecoTransmission, DecoKepler],
  'futuro-observatorios': [DecoSpaceArray, DecoJwst, DecoTess],
};

const BIBLIOGRAPHY = [
  'Borucki, W. J. et al. (2010). "Kepler Planet-Detection Mission: Introduction and First Results", Science, 327(5968), 977-980.',
  'Ricker, G. R. et al. (2015). "Transiting Exoplanet Survey Satellite (TESS)", Journal of Astronomical Telescopes, Instruments, and Systems, 1(1), 014003.',
  'Gardner, J. P. et al. (2006). "The James Webb Space Telescope", Space Science Reviews, 123(4), 485-606.',
  'Sing, D. K. et al. (2016). "A continuum of planet spectra from warm Neptune to hot Jupiter atmospheres", Nature, 529(7584), 59-62.',
  'Seager, S., & Sasselov, D. D. (2000). "Theoretical Transmission Spectra during Exoplanetary Transit", The Astrophysical Journal, 537(2), 916.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'mision-kepler',
    title: 'El Telescopio Kepler',
    color: '#FFD740',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_mision-kepler.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_mision-kepler.jpg',
    content: [
      'Lanzado por la NASA en el año 2009, el telescopio espacial Kepler representa el instrumento más revolucionario en la historia de la búsqueda de nuevos mundos. Antes de Kepler, la humanidad apenas conocía unos pocos cientos de exoplanetas, casi todos gigantes de gas hirviendo. Kepler fue diseñado con un objetivo ambicioso: determinar cuántos planetas parecidos a la Tierra existen en nuestra galaxia Vía Láctea.',
      'Para lograr esta hazaña histórica, Kepler utilizó una cámara fotométrica de 95 megapíxeles que apuntaba continuamente a una sola región fija del cielo ubicada entre las constelaciones del Cisne y la Lira. Durante cuatro años ininterrumpidos, el telescopio fotografió simultáneamente a más de 150,000 estrellas cada 30 minutos, registrando cualquier parpadeo diminuto provocado por la sombra de un planeta en tránsito.',
      'La misión Kepler demostró experimentalmente que los planetas rocosos de tamaño moderado son sustancialmente más abundantes en el universo que los gigantes gaseosos. Descubrió más de 2,600 exoplanetas confirmados y miles de candidatos adicionales, incluyendo los primeros mundos pequeños que orbitan dentro de las zonas habitables de estrellas similares al Sol, como Kepler-186f y Kepler-452b.',
      'Incluso cuando dos de sus ruedas de reacción de giroscopio fallaron en 2013 impidiendo mantener la estabilidad original, los ingenieros espaciales reinventaron la misión bajo el nombre K2. Utilizaron la presión de la radiación solar para estabilizar el telescopio, permitiéndole escanear nuevas regiones del plano eclíptico durante cinco años adicionales antes de agotar su combustible de maniobra en 2018.',
      'El legado científico del telescopio espacial Kepler cambió para siempre nuestra perspectiva del cosmos. Gracias a sus datos estadísticos, hoy sabemos con certeza matemática que en la galaxia existen más planetas que estrellas. Kepler desmanteló la idea de que la Tierra era un caso aislado en el universo, regalándonos el primer censo planetario de la historia humana.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Kepler estaba equipado con un espejo primario de 1.4 metros de diámetro y la cámara digital más grande jamás enviada al espacio en su época, compuesta por una matriz de 42 sensores CCD de altísima sensibilidad calibrados para detectar variaciones de luz del cero punto cero dos por ciento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El exoplaneta Kepler-186f fue el primer planeta confirmado de tamaño casi idéntico a la Tierra (1.17 radios terrestres) que orbitaba en la zona habitable de su estrella. Su descubrimiento en 2014 probó que existen verdaderos análogos terrestres rocosos capaces de sostener agua líquida.' }
    ],
    fact: 'Durante sus nueve años y medio de operaciones en órbita heliocéntrica, el telescopio Kepler observó más de 530,000 estrellas y registró más de 678 gigabytes de datos astronómicos puros que continúan siendo analizados hoy por inteligencia artificial.'
  },
  {
    id: 'fotometria-espacial',
    title: 'Fotometría de Alta Precisión',
    color: '#64FFDA',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_fotometria-espacial.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_fotometria-espacial.jpg',
    content: [
      'La fotometría de precisión es la ciencia técnica de medir la cantidad exacta de luz que emite un objeto celeste en función del tiempo. Cuando observamos las estrellas desde telescopios instalados en la superficie de la Tierra, nos enfrentamos a un obstáculo permanente: la atmósfera terrestre. Las corrientes de aire caliente y frío provocan la turbulencia atmosférica que hace que las estrellas parpadeen de forma caótica en la noche.',
      'Ese parpadeo atmosférico natural oculta por completo las diminutas sombras de los exoplanetas pequeños. Para medir una caída de brillo del cero punto cero uno por ciento provocada por una Supertierra, la ciencia tuvo que colocar telescopios por encima de la atmósfera de la Tierra. En el vacío impoluto del espacio exterior, las estrellas brillan con una estabilidad perfecta, permitiendo una fotometría ultrasensible.',
      'Los fotómetros espaciales utilizan sensores CCD y CMOS diseñados con ruido térmico extremadamente bajo. El instrumento mide continuamente cuántos fotones de luz estelar impactan contra cada píxel durante un intervalo de integración fijo. Al sumar miles de lecturas individuales, las computadoras generan curvas de luz de una limpieza matemática impresionante donde el tránsito planetario destaca de forma innegable.',
      'Además, la fotometría de ultra precisión requiere corregir los artefactos provocados por el propio detector espacial. Pequeños movimientos del telescopio, cambios de temperatura en los paneles solares y rayos cósmicos impactando contra la cámara deben ser filtrados mediante complejos algoritmos estadísticos antes de confirmar una señal planetaria.',
      'Gracias a la fotometría espacial moderna, los astrónomos no solo descubren tránsitos principales, sino que también pueden medir la luz reflejada por las fases del planeta (equivalente a las fases de la Luna) y los efectos de deformación elipsoidal que sufre la estrella por el tirón gravitacional del exoplaneta en su órbita.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La precisión fotométrica del telescopio espacial Kepler era tan asombrosa que equivalía a detectar el parpadeo de la mosca pasando por delante del faro de un automóvil a una distancia de varios kilómetros de separación en la oscuridad total.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fotometría espacial también impulsó el desarrollo de la astroseismología. Al medir las micro-pulsaciones de luz causadas por ondas sonoras que rebotan en el interior de una estrella, los científicos pueden deducir la masa, el radio y la edad exacta de la estrella hospedera con precisión sin precedentes.' }
    ],
    fact: 'El satélite fotométrico CoRoT, lanzado por la Agencia Espacial Europea y Francia en 2006, fue el pionero absoluto en fotometría espacial de tránsitos, descubriendo CoRoT-7b, el primer exoplaneta rocoso confirmado de la historia con densidad medida.'
  },
  {
    id: 'mision-tess',
    title: 'Misión TESS de la NASA',
    color: '#00E5FF',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_mision-tess.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_mision-tess.jpg',
    content: [
      'Lanzado en el año 2018 como sucesor directo de la misión Kepler, el Satélite de Sondeo de Exoplanetas en Tránsito (TESS) adopta una estrategia de observación completamente diferente. Mientras que Kepler observó una sola parche pequeño y distante del cielo durante años, TESS está diseñado para realizar un escaneo fotométrico del ochenta y cinco por ciento de toda la esfera celeste.',
      'La misión principal de TESS consiste en encontrar exoplanetas pequeños que orbitan alrededor de las estrellas más brillantes y cercanas a nuestro Sistema Solar. Como estas estrellas objetivo están situadas a solo decenas de años luz de la Tierra, sus planetas descubiertos son perfectos para ser estudiados posteriormente en detalle por grandes observatorios terrestres y por el telescopio James Webb.',
      'TESS utiliza un conjunto de cuatro cámaras ópticas gran angular equipadas con lentes de alta definición de 16.8 megapíxeles cada una. Cada mes de observación, TESS escanea una franja vertical del cielo llamada sector de observación que mide 24 por 96 grados. Tras permanecer 27 días observando un sector, el satélite gira para escanear el siguiente sector contiguo.',
      'Para transmitir su volumen colosal de datos fotométricos hacia la Tierra sin gastar combustible excesivo, TESS orbita nuestro planeta en una órbita elíptica altamente estable en resonancia 2:1 con la Luna. Cada 13.7 días, cuando TESS pasa por el punto más cercano a la Tierra (perigeo), descarga gigabytes de imágenes a las antenas de la Red del Espacio Profundo de la NASA.',
      'Hasta la fecha, la misión TESS ha identificado más de 7,000 candidatos exoplanetarios y ha confirmado cientos de nuevos mundos. Entre sus hallazgos más destacados figura el sistema TOI-700, que alberga un exoplaneta de tamaño terrestre llamado TOI-700 d orbitando placenteramente en la zona habitable de su estrella enana roja.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El acrónimo TOI que utiliza TESS significa "TESS Object of Interest" (Objeto de Interés de TESS). Cada vez que los algoritmos de TESS detectan un parpadeo de tránsito prometedor en una estrella cercana, la asignan como TOI para que la comunidad astronómica mundial inicie observaciones de seguimiento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La órbita de TESS es única en la ingeniería aeroespacial. Se llama órbita de resonancia con la Luna P/2 y no requiere casi ningún impulso de combustible para mantener la estabilidad a largo plazo, garantizando que el satélite funcione operativamente durante décadas sin desviarse de su curso.' }
    ],
    fact: 'TESS observa simultáneamente más de 200,000 estrellas seleccionadas prioritariamente con cadencia rápida de dos minutos, además de capturar imágenes de cuadro completo de todo el sector cada 200 segundos para la investigación astrofísica abierta.'
  },
  {
    id: 'telescopio-jwst',
    title: 'Telescopio Espacial JWST',
    color: '#FF9100',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_telescopio-jwst.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_telescopio-jwst.jpg',
    content: [
      'Lanzado el 25 de diciembre de 2021, el Telescopio Espacial James Webb (JWST) representa la cumbre de la ingeniería científica moderna. A diferencia de Kepler y TESS, que fueron diseñados principalmente para descubrir exoplanetas mediante fotometría visible, el JWST fue construido para caracterizar las atmósferas y superficies de exoplanetas mediante espectroscopía infrarroja de alta resolución.',
      'El JWST cuenta con un espejo primario gigantesco de 6.5 metros de diámetro, compuesto por 18 segmentos hexagonales de berilio chapados en una capa microscópica de oro puro. El oro es el mejor reflector natural para la luz infrarroja. Para proteger sus instrumentos ultrasensibles del calor abrasador del Sol y la Tierra, el telescopio utiliza un parasol de cinco capas de Kapton del tamaño de una cancha de tenis.',
      'Ubicado en el punto de Lagrange L2 a 1.5 millones de kilómetros de la Tierra, el JWST opera a temperaturas criogénicas heladas de casi 230 grados Celsius bajo cero. Esta congelación instrumental es indispensable porque los propios objetos calientes emiten luz infrarroja. Si el telescopio se calentara, su propia emisión cegaría los detectores infrarrojos impidiendo ver los exoplanetas.',
      'Los instrumentos científicos del JWST, como NIRSpec, MIRI y NIRISS, permiten desglosar la luz de las atmósferas exoplanetarias en miles de componentes espectrales infrarrojos. En esta banda de longitud de onda se encuentran las huellas dactilares moleculares más importantes de los gases biológicos e industriales, como el vapor de agua, el dióxido de carbono, el metano y el dióxido de azufre.',
      'En sus primeros años de operaciones científicas, el JWST ya ha logrado hitos históricos: capturó la primera prueba irrefutable de dióxido de carbono en la atmósfera del exoplaneta WASP-39b y midió la temperatura térmica directa de la cara diurna de los planetas rocosos del famoso sistema TRAPPIST-1.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El parasol del JWST está fabricado con Kapton y revestido de aluminio y silicio. Mientras la cara expuesta al Sol alcanza temperaturas abrasadoras de 110 grados Celsius, la cara posterior donde se ubican los espejos y detectores se mantiene congelada a menos 235 grados Celsius.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El berilio fue elegido para construir los espejos del JWST porque es un metal sumamente ligero y con una estabilidad térmica excepcional. Los 18 segmentos dorados se alinean en el espacio con motores piezoeléctricos capaces de ajustar su posición con precisión de nanómetros.' }
    ],
    fact: 'El JWST detectó por primera vez dióxido de azufre (SO2) en la atmósfera del exoplaneta WASP-39b, revelando que la fotoquímica impulsada por la luz ultravioleta de la estrella crea reacciones químicas activas en atmósferas alienígenas.'
  },
  {
    id: 'espectroscopia-transmision',
    title: 'Espectroscopía Transmisión',
    color: '#00E5FF',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_espectroscopia-transmision.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_espectroscopia-transmision.jpg',
    content: [
      'La espectroscopía de transmisión es una técnica astrofísica brillante que permite leer la composición química de la atmósfera de un exoplaneta a billones de kilómetros de distancia. Imagina que colocas una manzana transparente frente a una linterna potente: la luz que atraviesa la pulpa de la manzana cambiará de color según la composición interna de la fruta.',
      'Cuando un exoplaneta pasa justo por enfrente de su estrella hospedera durante un tránsito, la mayor parte del cuerpo sólido bloquea la luz por completo. Sin embargo, un pequeño porcentaje de la luz de la estrella atraviesa la delgada capa de gas que rodea la atmósfera del planeta. Al pasar a través de este aire alienígena, los gases presentes en la atmósfera filtran y absorben colores específicos de la luz estelar.',
      'Cada tipo de molécula de gas posee un código de barras de absorción único e inconfundible. Las moléculas de vapor de agua absorben ciertas longitudes de onda en el infrarrojo, mientras que el metano o el dióxido de carbono absorben otras frecuencias distintas. Al comparar el espectro de la estrella sola con el espectro obtenido durante el tránsito, los astrónomos restan ambas mediciones para obtener el espectro puro de transmisión planetaria.',
      'Si una atmósfera es rica en agua, el exoplaneta parecerá ligeramente más grande y más oscuro cuando sea observado en las longitudes de onda donde el agua absorbe luz. En cambio, en las frecuencias donde la atmósfera es transparente, el planeta parecerá tener un radio más pequeño. Midiendo este cambio aparente de tamaño a través del espectro electromagnético, se reconstruye el perfil atmosférico.',
      'Esta técnica de transmisión ha permitido detectar vapor de agua, sodio, potasio, monóxido de carbono y nubes de silicatos en decenas de exoplanetas. Con el JWST y futuros observatorios, los científicos están aplicando la espectroscopía de transmisión a planetas rocosos pequeños para buscar gases de origen biológico como el oxígeno y el ozono.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La capa atmosférica que atraviesa la luz durante un tránsito representa menos del uno por ciento del radio total del planeta. Medir la señal de transmisión en una Supertierra es equivalente a medir el grosor del pelo de un gato colocado sobre el borde de una moneda a kilómetros de distancia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La escala de altura atmosférica (H) determina qué tan fácil es observar un espectro de transmisión. Las atmósferas calientes compuestas por gases ligeros como hidrógeno se extienden a gran altura, produciendo señales espectrales amplias y fáciles de detectar por espectrógrafos infrarrojos.' }
    ],
    fact: 'El telescopio Hubble realizó la primera detección de una atmósfera exoplanetaria mediante espectroscopía de transmisión en 2001, identificando átomos de sodio gaseoso en la envoltura superior del planeta gigante HD 209458 b.'
  },
  {
    id: 'fotometria-eclipse-secundario',
    title: 'Eclipse Secundario y Emisión',
    color: '#FF80AB',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_fotometria-eclipse-secundario.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_fotometria-eclipse-secundario.jpg',
    content: [
      'Un tránsito ocurre cuando el exoplaneta pasa por delante de su estrella, pero medio año planetario después ocurre el evento simétrico opuesto: el eclipse secundario. Durante el eclipse secundario, el planeta se desplaza justo por detrás del disco estelar desde nuestra línea de visión en la Tierra, quedando completamente oculto a la vista de los telescopios.',
      'Justo antes de ingresar detrás de la estrella, los telescopios reciben la luz combinada de dos fuentes: la estrella más la luz emitida y reflejada por la cara diurna del planeta. Cuando el planeta se oculta detrás de la estrella, la cantidad total de luz medida disminuye ligeramente. La diferencia exacta entre ambas lecturas entrega la señal pura producida exclusivamente por el planeta.',
      'La espectroscopía de emisión registrada durante el eclipse secundario en frecuencias infrarrojas permite medir directamente la temperatura térmica real de la cara diurna del exoplaneta. Cuanto más caliente esté el planeta, mayor será la caída de radiación infrarroja cuando quede oculto detrás del disco de su estrella hospedera.',
      'Además, la fotometría de eclipse secundario permite calcular el albedo planetario, que es la medida de qué tan reflectante es su superficie o su capa de nubes. Si el planeta refleja mucha luz visible antes de ocultarse, significa que posee nubes brillantes de silicatos o agua. Si el planeta es oscuro y absorbe toda la luz, significa que su superficie está cubierta de rocas compuestas de basalto o carbono.',
      'Analizando la forma en que varía la luz del planeta durante toda su órbita mediante curvas de fase completas, los astrofísicos pueden trazar mapas térmicos globales de dos dimensiones. Esto permite descubrir dónde se ubican los puntos más calientes de la atmósfera alienígena y cómo los vientos globales redistribuyen la energía térmica desde el día hacia la noche.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mediante el eclipse secundario y las curvas de fase, el telescopio Spitzer logró crear el primer mapa de temperaturas atmosféricas de un exoplaneta en 2007. Mapeó el planeta HD 189733 b, revelando que el punto más caliente no estaba en el centro del mediodía sino desplazado por vientos ecuatoriales violentos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El eclipse secundario permite medir la excentricidad orbital con precisión matemática. Si el eclipse secundario no ocurre exactamente en la mitad del tiempo entre dos tránsitos principales, significa que la órbita del exoplaneta no es circular sino una elipse elongada.' }
    ],
    fact: 'El instrumento MIRI del JWST midió la emisión térmica en eclipse secundario de TRAPPIST-1 b, revelando una temperatura de 230°C y sugiriendo que este planeta rocoso carece de una atmósfera densa de dióxido de carbono.'
  },
  {
    id: 'futuro-observatorios',
    title: 'Futuros Cazadores Espaciales',
    color: '#B388FF',
    btnImage: '/assets/exoplanetas/infographic_m3/btn_futuro-observatorios.jpg',
    image: '/assets/exoplanetas/infographic_m3/hero_futuro-observatorios.jpg',
    content: [
      'La exploración astronómica de los exoplanetas está entrando en su época dorada con el desarrollo de observatorios de nueva generación. Misiones espaciales avanzadas y telescopios terrestres gigantescos están siendo construidos en laboratorios para llevar nuestras capacidades de caracterización atmosférica hasta límites insospechados.',
      'La Agencia Espacial Europea lidera la misión PLATO (Planetary Transits and Oscillations of stars), cuyo lanzamiento está programado para 2026. PLATO utilizará una matriz de 26 telescopios individuales integrados en una sola plataforma espacial para buscar planetas rocosos en zonas habitables alrededor de estrellas brillantes similares al Sol, midiendo sus edades mediante astroseismología.',
      'En 2029 se sumará la misión ARIEL de la ESA, un telescopio espacial dedicado exclusivamente a realizar el primer censo químico sistemático de las atmósferas de unos mil exoplanetas conocidos. ARIEL analizará la diversidad química y las estructuras térmicas de gigantes de gas, Neptunos y Supertierras para entender la evolución de los sistemas planetarios.',
      'Por su parte, la NASA prepara el Telescopio Espacial Nancy Grace Roman, equipado con un avanzado instrumento de coronografía capaz de bloquear la luz directa de una estrella para fotografiar directamente exoplanetas gigantes en órbitas amplias. Roman también utilizará microlentes gravitacionales para encontrar mundos helados y planetas errantes nómadas.',
      'En la Tierra, telescopios extremadamente gigantes como el ELT (Extremely Large Telescope) en Chile, con su espejo de 39 metros de diámetro, permitirán tomar las primeras imágenes directas y espectros de alta resolución de planetas rocosos similares a la Tierra orbitando las estrellas más cercanas a nuestro hogar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Telescopio Extremadamente Grande (ELT) de la ESO en el desierto de Atacama será el ojo óptico más grande del mundo dirigiendo la mirada hacia el cielo. Recogerá cien millones de veces más luz que el ojo humano y corregirá la turbulencia de la atmósfera terrestre mediante óptica adaptativa dinámica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La técnica de coronografía utilizada por el telescopio Nancy Grace Roman utiliza una máscara física interna que tapa el resplandor de la estrella en un factor de mil millones. Esto permite revelar directamente los diminutos puntos de luz planetarios que orbitan a su alrededor.' }
    ],
    fact: 'El concepto de misión Habitable Worlds Observatory (HWO) de la NASA planea lanzarse en la década de 2030 con un espejo de 6 metros optimizado para analizar atmósferas de al menos 25 planetas rocosos potencialmente habitables en busca de biofirmas.'
  }
];

export default function InteractiveInfographic_ExoplanetasM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(8,18,30,0.92) 0%, rgba(10,24,40,0.88) 40%, rgba(6,12,24,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <TemporalFieldCanvas />
      <ExoplanetasHeaderM3 />
      
      {/* Progress Bar */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '1.5rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FFD740, #00E5FF)',
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Módulos explorados: {explored.size}/{INFOGRAPHIC_NODES.length}
          </span>
        </div>
      </div>

      {/* Top Node Selector Carousel */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1rem', marginTop: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,215,64,0.2)',
        backdropFilter: 'blur(10px)'
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

      {/* Content Panel Area */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '320px',
                color: 'rgba(255,255,255,0.5)', textAlign: 'center', gap: '1rem',
                padding: '2rem'
              }}
            >
              <Sparkles size={36} style={{ color: '#FFD740', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#FFD740', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora los Telescopios Kepler, TESS y JWST
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir la tecnología de los observatorios espaciales y la espectroscopía de transmisión atmosférica.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,215,64,0.25)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#FFD740', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #FFD740' }}>
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

function TemporalFieldCanvas() {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '255, 215, 64' : '0, 229, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.35;
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

function ExoplanetasHeaderM3() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(255,215,64,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad3)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#FFD740','#64FFDA','#00E5FF','#FF9100','#FF80AB','#B388FF','#448AFF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#FFD740" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#00E5FF" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,215,64,0.15)" />
            <stop offset="50%" stopColor="rgba(255,215,64,0.95)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#FFD740" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TELESCOPIOS KEPLER, TESS Y JWST</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(0,229,255,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">FOTOMETRÍA ESPACIAL Y ESPECTROSCOPÍA</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '82px',
        height: '82px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,215,64,0.25)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}60, 0 0 35px ${node.color}25, inset 0 0 12px ${node.color}40`
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.76rem', fontWeight: 700, letterSpacing:'0.2px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '95px',
        textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeDotExoM3"
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
  up:    { hidden: { y: -25, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 25, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -25, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 25, opacity: 0 },  visible: { x: 0, opacity: 1 } },
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
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}10, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}18` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.8 }} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 28 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', borderLeft: `3px solid ${color}40`, paddingLeft: '0.8rem' }}>
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
    { top: '6%', right: '-5px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -12 },
    { bottom: '10%', right: '10px', rotate: 18 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        background: 'rgba(10, 20, 34, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${node.color}15`
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', border: `1px solid ${node.color}50`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Grid 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.5))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}20)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 52, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.45rem', fontWeight: 800, color: node.color, letterSpacing:'-0.01em', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}60`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.9rem', fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -7, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 4, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 8} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.025)', borderRadius: '14px', padding: '1.25rem', borderLeft: `3px solid ${node.color}40`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#060E18', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'TECNOLOGÍA INSTRUMENTAL' : 'IMPACTO CIENTÍFICO'}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', background: `linear-gradient(90deg, ${node.color}18, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}35`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${node.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={19} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico Clave
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontSize: '0.92rem', lineHeight: 1.68 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
