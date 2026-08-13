'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Dendera-themed, different from M11) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoZodiacWheel({ size = 70, color = '#D46A6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 18, r2 = 26, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.5" />;
      })}
      {[15,75,135,195,255,315].map((a,i) => {
        const r = 22, rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30+r*Math.cos(rad)} cy={30+r*Math.sin(rad)} r="1.5" fill={color} opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoHathor({ size = 70, color = '#E8A87C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Cow horns with sun disk */}
      <path d="M18 35 Q10 15 8 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 35 Q50 15 52 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="14" r="8" fill={color} opacity="0.35" />
      <circle cx="30" cy="14" r="5" fill={color} opacity="0.5" />
      {/* Face */}
      <ellipse cx="30" cy="40" rx="12" ry="14" fill={color} opacity="0.15" />
      <circle cx="25" cy="37" r="2" fill={color} opacity="0.5" />
      <circle cx="35" cy="37" r="2" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="45" rx="4" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoLotus({ size = 60, color = '#7EB8C9', style = {} }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 50 60" style={{ opacity: 0.2, ...style }}>
      <path d="M25 55 L25 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M25 30 Q25 15 15 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 30 Q25 15 35 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 30 Q20 18 10 14" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 30 Q30 18 40 14" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="25" cy="25" rx="5" ry="8" fill={color} opacity="0.25" />
      <circle cx="25" cy="8" r="3" fill={color} opacity="0.3" />
      <path d="M18 50 Q25 45 32 50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoCobra({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <path d="M30 55 Q30 40 28 32 Q26 24 22 20 Q18 16 20 10 Q22 4 30 4 Q38 4 40 10 Q42 16 38 20 Q34 24 32 32 Q30 40 30 55" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="8" r="1.5" fill={color} opacity="0.7" />
      <circle cx="34" cy="8" r="1.5" fill={color} opacity="0.7" />
      {/* Hood spread */}
      <path d="M22 12 Q14 16 12 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 12 Q46 16 48 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoCrocodile({ size = 80, color = '#6B8E6B', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M5 20 Q10 15 20 16 Q30 17 40 18 Q50 19 60 18 Q68 17 72 14 L78 14 L78 18 L72 20 Q68 24 60 24 Q50 25 40 24 Q30 23 20 22 Q10 21 5 24 Z" fill={color} opacity="0.3" />
      <circle cx="70" cy="13" r="2" fill={color} opacity="0.6" />
      <path d="M78 15 L80 13 L80 19 L78 17" fill={color} opacity="0.4" />
      {/* Scales */}
      {[20,30,40,50].map((x,i) => <path key={i} d={`M${x} 17 Q${x+3} 14 ${x+6} 17`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />)}
    </svg>
  );
}

function DecoHippo({ size = 70, color = '#8B7DC8', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 60 48" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="30" cy="30" rx="20" ry="14" fill={color} opacity="0.2" />
      <ellipse cx="18" cy="18" rx="10" ry="12" fill={color} opacity="0.15" />
      <circle cx="14" cy="14" r="2" fill={color} opacity="0.5" />
      <ellipse cx="12" cy="22" rx="5" ry="3" fill={color} opacity="0.2" />
      {/* Ears */}
      <ellipse cx="22" cy="8" rx="3" ry="5" fill={color} opacity="0.25" />
      <ellipse cx="14" cy="10" rx="3" ry="4" fill={color} opacity="0.25" />
      {/* Legs */}
      <rect x="16" y="38" width="5" height="8" rx="2" fill={color} opacity="0.2" />
      <rect x="36" y="38" width="5" height="8" rx="2" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoColumns({ size = 70, color = '#C9A96E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Two columns */}
      <rect x="10" y="10" width="8" height="42" fill={color} opacity="0.25" rx="1" />
      <rect x="42" y="10" width="8" height="42" fill={color} opacity="0.25" rx="1" />
      {/* Capitals */}
      <rect x="6" y="6" width="16" height="6" fill={color} opacity="0.3" rx="2" />
      <rect x="38" y="6" width="16" height="6" fill={color} opacity="0.3" rx="2" />
      {/* Lintel */}
      <rect x="4" y="2" width="52" height="5" fill={color} opacity="0.2" rx="1" />
      {/* Base */}
      <rect x="6" y="52" width="16" height="4" fill={color} opacity="0.2" rx="1" />
      <rect x="38" y="52" width="16" height="4" fill={color} opacity="0.2" rx="1" />
      {/* Hieroglyphs */}
      <circle cx="14" cy="25" r="2" fill={color} opacity="0.3" />
      <rect x="12" y="32" width="4" height="3" fill={color} opacity="0.2" rx="0.5" />
      <circle cx="46" cy="28" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCelestialDisk({ size = 60, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill={color} opacity="0.15" />
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.1" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.35" />
      {/* Rays */}
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+8*Math.cos(rad)} y1={30+8*Math.sin(rad)} x2={30+22*Math.cos(rad)} y2={30+22*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />;
      })}
      {/* Crescent */}
      <path d="M38 18 Q44 24 44 30 Q44 36 38 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'disco-zodiacal': [DecoZodiacWheel, DecoCelestialDisk, DecoColumns],'constelaciones': [DecoZodiacWheel, DecoCobra, DecoLotus],
  'templo-hathor': [DecoColumns, DecoHathor, DecoLotus],
  'robo-louvre': [DecoColumns, DecoCelestialDisk, DecoZodiacWheel],'datacion': [DecoCelestialDisk, DecoZodiacWheel, DecoColumns],'criaturas': [DecoCrocodile, DecoHippo, DecoCobra],
  'planetas': [DecoCelestialDisk, DecoZodiacWheel, DecoHathor],'legado': [DecoZodiacWheel, DecoLotus, DecoCelestialDisk],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aubourg, E. (1995). La date de conception du zodiaque du temple d\'Hathor a Dendera, BIFAO, 95',
  'Cauville, S. (1997). Le Zodiaque d\'Osiris, Peeters',
  'Belmonte, J.A. (2003). The Decans and the Ancient Egyptian Skylore, Memorie della SAIt',
  'Neugebauer, O. (1975). A History of Ancient Mathematical Astronomy, Springer',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'disco-zodiacal',
    title: 'El Disco del Cielo',
    color: '#D46A6A',
    btnImage: '/assets/egypt/infographic_m9/btn_disco-zodiacal.jpg',
    image: '/assets/egypt/infographic_m9/hero_disco-zodiacal.jpg',
    content: [
      'En el techo de un cuarto del templo de Hathor en Dendera, existía un disco de piedra arenisca de 2.5 metros de diámetro. Este artefacto es el mapa circular más antiguo del cielo nocturno que se conserva.',
      'El Zodiaco de Dendera fue tallado hace aproximadamente 2,050 años (c. 50 a.C.) durante la dinastía ptolemaica. Muestra el firmamento como un reloj: el centro indica el polo norte celeste con estrellas circumpolares, y en los bordes se ubican 36 constelaciones del calendario egipcio.',
      'Su diseño presenta simetría. Cuatro pares de figuras sostienen el disco desde los bordes, representando los ocho puntos cardinales e intercardinales. El disco funciona como mapa astronómico y obra religiosa.',
      'La astrónoma Sylvie Cauville dedicó 20 años a traducir los jeroglíficos del templo. Descubrió que cada figura del zodiaco tiene un nombre específico y un significado astronómico.',
      'La orientación del disco ilustra la precesión de los equinoccios: el eje está desplazado respecto al centro, lo que demuestra que los egipcios conocían este fenómeno astronómico.',
      'Este disco de piedra es un esfuerzo notable por documentar el firmamento en una sola imagen.',
    ],
    fact: 'El Zodiaco de Dendera es el único mapa celeste circular completo de la Antigüedad. Los mapas babilonios eran tablas numéricas, y los griegos usaban esferas armilares. Solo los egipcios crearon un "planisferio" tallado en piedra.',
  },
  {
    id: 'constelaciones',
    title: 'Las 12 + las Egipcias',
    color: '#7EB8C9',
    btnImage: '/assets/egypt/infographic_m9/btn_constelaciones.jpg',
    image: '/assets/egypt/infographic_m9/hero_constelaciones.jpg',
    content: [
      'El Zodiaco de Dendera muestra las 12 constelaciones zodiacales que conocemos hoy. También incluye constelaciones egipcias que no aparecen en otros mapas de la antigüedad.',
      'El Cocodrilo Celestial (Sobek) aparece cerca de Capricornio. El Hipopótamo (Taweret) sostiene un bastón en la posición de la Osa Mayor. Un Chacal marca el lugar de la constelación del Boyero.',
      'En este disco coexisten el toro mesopotámico, el león griego y el hipopótamo egipcio. Es un documento que muestra la convergencia de las tradiciones astronómicas babilónica, griega y egipcia.',
      'Los egipcios originalmente no usaban el zodíaco de 12 signos. Se basaban en 36 Decanos, grupos de estrellas que se levantaban cada 10 días a lo largo del año.',
      'El egiptólogo Christian Leitz señaló que el Zodiaco de Dendera representa la transición del sistema decanal egipcio al sistema zodiacal greco-babilónico.',
      'Esta mezcla de constelaciones y deidades ilustra cómo diferentes culturas integraron sus conocimientos celestes.',
    ],
    fact: 'Los 36 Decanos egipcios fueron adoptados por los astrónomos griegos como "prosopa" (caras), después por los astrólogos árabes, y finalmente llegaron a la Europa medieval. Los 36 naipes de la baraja española descienden indirectamente de los Decanos egipcios.',
  },
  {
    id: 'templo-hathor',
    title: 'El Templo de Hathor',
    color: '#C9A96E',
    btnImage: '/assets/egypt/infographic_m9/btn_templo-hathor.jpg',
    image: '/assets/egypt/infographic_m9/hero_templo-hathor.jpg',
    content: [
      'El templo de Hathor en Dendera fue construido entre el 54 a.C. Y el 20 d.C. Hathor era considerada la diosa del amor y la astronomía.',
      'Las 24 columnas del hall hipóstilo tienen capiteles con el rostro de Hathor. El techo del hall presenta escenas que muestran el viaje del Sol y las constelaciones, conservando pigmentos antiguos.',
      'Cleopatra VII está representada en los relieves exteriores junto a su hijo Cesarión. Es una de las pocas representaciones auténticas de la reina ptolemaica que existen.',
      'Debajo de las cámaras hay criptas donde se guardaban objetos rituales. Las paredes muestran relieves de flores de loto con serpientes y otros símbolos religiosos.',
      'El templo funcionaba como observatorio astronómico. El techo de la capilla de Osiris tiene aberturas para observar estrellas específicas, permitiendo a los sacerdotes marcar horas y festivos.',
      'Para los egipcios, el estudio matemático de los astros estaba integrado con su veneración religiosa.',
    ],
    fact: 'El templo de Hathor en Dendera fue usado como iglesia cristiana copta durante siglos después de la caída del paganismo (c. 400 d.C.). El hollín de las hogueras coptas ennegrecía los techos, pero también los protegió de la erosión. Al limpiar el hollín en el siglo XIX, los colores originales aparecieron perfectamente conservados.',
  },
  {
    id: 'robo-louvre',
    title: 'El Robo del Zodiaco',
    color: '#8B6B8B',
    btnImage: '/assets/egypt/infographic_m9/btn_robo-louvre.jpg',
    image: '/assets/egypt/infographic_m9/hero_robo-louvre.jpg',
    content: [
      'En 1820, el ingeniero francés Claude Lelorrain removió el Zodiaco del techo del templo por encargo consular. Su equipo cortó la piedra usando sierras y pólvora.',
      'El bloque de piedra fue transportado a París. Lelorrain vendió el Zodiaco al rey Luis XVIII y, desde 1822, el artefacto se exhibe en el Museo del Louvre.',
      'En el techo del templo en Dendera se instaló una copia de yeso como sustitución. Este evento refleja las prácticas de sustracción de bienes arqueológicos de la época.',
      'Egipto ha solicitado formalmente la devolución del Zodiaco de Dendera, considerándolo un objeto de alto valor patrimonial para la nación.',
      'La situación del Zodiaco genera debate sobre la preservación en museos extranjeros frente al derecho de origen. El templo original tiene capacidad para resguardar la pieza.',
      'Aunque la pieza original se encuentra en Francia, representa el conocimiento astronómico alcanzado en el antiguo Egipto.',
    ],
    fact: 'Cuando Napoleón invadió Egipto en 1798, llevó consigo 167 científicos y artistas (la "Commission des Sciences et des Arts") además de sus soldados. Esta expedición produjo la monumental"Description de l\'Égypte" (23 volúmenes) pero también inició la era del saqueo arqueológico a escala industrial.',
  },
  {
    id: 'datacion',
    title: 'Fotografía del Cielo del 50 a.C.',
    color: '#E8C96A',
    btnImage: '/assets/egypt/infographic_m9/btn_datacion.jpg',
    image: '/assets/egypt/infographic_m9/hero_datacion.jpg',
    content: [
      'El Zodiaco de Dendera muestra la alineación del cielo de hace 2,000 años. Los astrónomos han comparado estas tallas con simulaciones por computadora y determinaron que corresponden al cielo del 50 a.C.',
      'Cinco planetas visibles a simple vista aparecen representados en posiciones específicas. Los astrónomos Eric Aubourg y Juan Antonio Belmonte confirmaron que estas ubicaciones coinciden con una alineación planetaria del año 50 a.C.',
      'La arqueoastronomía computacional usa la previsibilidad de las órbitas para fechar monumentos. Los movimientos estelares permiten calcular posiciones en épocas pasadas con exactitud.',
      'La datación astronómica del Zodiaco causó debate en el siglo XIX sobre la edad de la Tierra. El investigador Jean-Baptiste Biot resolvió la cuestión mediante cálculos astronómicos.',
      'El matemático Jean-Baptiste Fourier analizó numéricamente el Zodiaco tras acompañar a Napoleón en su expedición a Egipto.',
      'Los análisis matemáticos comprueban que los sacerdotes crearon un mapa estelar muy preciso.',
    ],
    fact: 'La Transformada de Fourier, inventada por el mismo matemático que estudió el Zodiaco de Dendera, es la base del formato JPEG, la compresión MP3, el WiFi, la resonancia magnética médica y prácticamente toda la tecnología digital moderna. ¡El estudio de un mapa estelar egipcio contribuyó a inventar el futuro!',
  },
  {
    id: 'criaturas',
    title: 'Criaturas del Cielo Egipcio',
    color: '#6B8E6B',
    btnImage: '/assets/egypt/infographic_m9/btn_criaturas.jpg',
    image: '/assets/egypt/infographic_m9/hero_criaturas.jpg',
    content: [
      'El cielo egipcio incluía figuras ausentes en otros sistemas. El Hipopótamo (Taweret) se representa de pie con cola de cocodrilo y garras de león. En el Zodiaco, sostiene un bastón y un cocodrilo.',
      'Taweret corresponde a la Osa Mayor. La otra constelación circumpolar principal es la "Pata de Buey" (Mesketiu), formada por las siete estrellas brillantes que componen la pata trasera de un toro.',
      'El cocodrilo Sobek servía como marcador horario. Los sacerdotes observaban el paso de ciertas estrellas cruzando el meridiano para medir las horas nocturnas.',
      'La cobra celestial (Wadjet) representa a Hydra. Era símbolo del Bajo Egipto y funcionaba como protección faraónica, además de acompañar al disco solar en el inframundo.',
      'El astrónomo José Lull catalogó más de 100 figuras celestes egipcias. Solo unas 40 han sido relacionadas con constelaciones actuales. Las restantes continúan en investigación.',
      'Cada civilización asoció animales y mitos a las estrellas para estructurar su visión del cielo.',
    ],
    fact: 'Taweret (el Hipopótamo Erguido del cielo) era también la diosa protectora del embarazo y el parto. Los amuletos de Taweret eran los más populares en el Egipto antiguo â€” se han encontrado miles en excavaciones. Una diosa hipopótama celestial protegiendo a las madres: ¡la primera constelación "maternal" de la historia!',
  },
  {
    id: 'planetas',
    title: 'Los Dioses Errantes',
    color: '#E8A87C',
    btnImage: '/assets/egypt/infographic_m9/btn_planetas.jpg',
    image: '/assets/egypt/infographic_m9/hero_planetas.jpg',
    content: [
      'Los egipcios notaron que los planetas se movían respecto a las estrellas fijas. En el Zodiaco de Dendera, los cinco planetas visibles combinan iconografía egipcia y griega.',
      'Saturno aparece como Horus-Toro sobre una barca. Júpiter es Horus-Misterioso y Marte es Horus-Rojo. Venus se identifica como la Estrella de la Mañana y Mercurio como el Planeta de Set.',
      'La identificación planetaria con Horus es propia de Egipto. Griegos y babilonios usaron sus propias deidades para nombrar los mismos planetas.',
      'Los astrónomos de Dendera registraban posiciones planetarias con fines astrológicos y médicos. Estos registros aportaron datos útiles para reconstruir órbitas orbitales.',
      'Llamar a Marte "Horus Rojo" indica que notaron el color provocado por el óxido de hierro de su superficie. Esta característica fue verificada por sondas espaciales modernas.',
      'El registro del color y órbitas muestra el nivel observacional de los sacerdotes egipcios.',
    ],
    fact: 'Los nombres de los días de la semana en español (Lunes=Luna, Martes=Marte, Miércoles=Mercurio, Jueves=Júpiter, Viernes=Venus) vienen directamente de la asociación planetaria que los egipcios transmitieron a los griegos, los griegos a los romanos, y los romanos a nosotros. ¡Cada semana usamos astronomía egipcia!',
  },
  {
    id: 'legado',
    title: 'El Viaje de 5,000 Años',
    color: '#9B8EC7',
    btnImage: '/assets/egypt/infographic_m9/btn_legado.jpg',
    image: '/assets/egypt/infographic_m9/hero_legado.jpg',
    content: [
      'El Zodiaco de Dendera muestra la transmisión del conocimiento. En Babilonia se creó un zodíaco basado en la eclíptica por donde transitan el Sol y la Luna.',
      'Los griegos mejoraron el zodíaco babilónico. Hiparco de Nicea elaboró un catálogo estelar y descubrió la precesión. Con la conquista de Alejandro Magno, esta astronomía llegó a Egipto.',
      'Los egipcios unieron la astronomía griega con su sistema de Decanos. El Zodiaco de Dendera documenta la síntesis física de dos modelos astronómicos distintos.',
      'Este conocimiento pasó a Roma y luego al resto de Europa. Los astrólogos árabes tradujeron los textos egipcios y griegos, diseminando los Decanos en la época medieval.',
      'El zodíaco actual proviene del modelo babilónico y egipcio. La astronomía moderna tiene sus raíces en las observaciones iniciales realizadas por pueblos mesopotámicos.',
      'El disco de Dendera es un documento que enlaza las observaciones antiguas con los mapas celestes contemporáneos.',
    ],
    fact: 'La palabra "zodiaco" viene del griego "zodiakos kyklos"(círculo de animales). Pero en realidad, solo 7 de los 12 signos son animales (Aries, Tauro, Cáncer, Leo, Escorpio, Capricornio, Piscis). Los otros cinco son humanos (Géminis, Virgo, Acuario, Sagitario) o un objeto (Libra). ¡El"círculo de animales" no es tan animal como su nombre sugiere!',
  },
];

// â”€â”€â”€ Star Field Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StarField() {
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
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Zodiac Wheel SVG Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ZodiacHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,106,106,0.3))' }}>
        {/* Zodiac wheel arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#denderaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 12 zodiac markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const t = (i + 0.5) / 12;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="3.5" fill="#D46A6A"
              animate={{ opacity: [0.3, 0.9, 0.3], r: [2.5, 4, 2.5] }}
              transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: 'drop-shadow(0 0 5px #D46A6A)' }}
            />
          );
        })}
        {/* Center disk */}
        <circle cx="300" cy="30" r="12" fill="none" stroke="#D46A6A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="6" fill="#D46A6A" opacity="0.5" style={{ filter: 'drop-shadow(0 0 6px rgba(212,106,106,0.5))' }} />
        {/* Divider lines in center disk */}
        {[0,60,120].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1={300+6*Math.cos(rad)} y1={30+6*Math.sin(rad)} x2={300+12*Math.cos(rad)} y2={30+12*Math.sin(rad)} stroke="#D46A6A" strokeWidth="0.8" opacity="0.4" />;
        })}
        <defs>
          <linearGradient id="denderaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,106,106,0.2)" />
            <stop offset="50%" stopColor="rgba(212,106,106,0.9)" />
            <stop offset="100%" stopColor="rgba(212,106,106,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#D46A6A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ZODIACO DE DENDERA</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(212,106,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER MAPA CIRCULAR DEL CIELO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (raster image-based, matching M11) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,106,106,0.2)'}`,
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
          layoutId="activeDotDendera"
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
        background: 'rgba(12, 12, 35, 0.9)',
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
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          {/* Bottom gradient */}
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
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,106,106,0.15)',
    }}>
      <Star size={14} style={{ color: '#D46A6A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D46A6A, #E8A87C)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,106,106,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D46A6A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM9() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,26,0.82) 0%, rgba(26,16,40,0.78) 40%, rgba(18,14,26,0.85) 100%), url(/assets/egypt/infographic_dendera/bg_templo.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,106,106,0.12)',
      boxShadow: '0 0 60px rgba(18,14,26,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      <ZodiacHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,106,106,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,106,106,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,106,106,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D46A6A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† ¡Has descifrado todos los secretos del Zodiaco de Dendera!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrólogo Maestro
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ Bibliografía â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
