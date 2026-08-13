'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ━━━ SVG Decorative Elements (Ichthyosaur / Marine Reptile themed) ━━━━━━━━━━
function DecoIchthyosaur({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Streamlined ichthyosaur silhouette */}
      <path d="M8 22 Q12 16 22 14 Q35 10 50 14 Q60 16 68 20 Q72 22 70 24 Q65 22 58 25 Q50 28 40 26 Q30 28 20 26 Q12 24 8 22Z" fill={color} opacity="0.3" />
      {/* Dorsal fin */}
      <path d="M38 14 L42 4 L46 14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Lunate tail */}
      <path d="M68 20 Q74 14 78 10 Q76 18 78 22 Q76 30 74 34 Q72 26 68 20" fill={color} opacity="0.25" />
      {/* Eye */}
      <circle cx="16" cy="18" r="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="16" cy="18" r="1" fill={color} opacity="0.5" />
      {/* Speed lines */}
      <line x1="2" y1="18" x2="6" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="3" y1="22" x2="7" y2="22" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoEyeCross({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sclerotic ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Iris */}
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Pupil */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.35" />
      {/* Sclerotic plates */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30 + 20 * Math.cos(rad) - 3} y={30 + 20 * Math.sin(rad) - 1.5} width="6" height="3" fill={color} opacity="0.3" transform={`rotate(${a} ${30 + 20 * Math.cos(rad)} ${30 + 20 * Math.sin(rad)})`} />;
      })}
      {/* Light rays */}
      <line x1="30" y1="2" x2="30" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="10" x2="46" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoWavePattern({ size = 80, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M0 20 Q10 12 20 20 Q30 28 40 20 Q50 12 60 20 Q70 28 80 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M0 28 Q10 20 20 28 Q30 36 40 28 Q50 20 60 28 Q70 36 80 28" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M0 12 Q10 4 20 12 Q30 20 40 12 Q50 4 60 12 Q70 20 80 12" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
      {/* Bubbles */}
      <circle cx="15" cy="8" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="55" cy="6" r="1.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="70" cy="10" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFossilImprint({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ammonite spiral fossil */}
      <path d="M30 30 Q30 22 36 20 Q42 18 44 24 Q46 30 40 34 Q34 38 28 36 Q22 34 22 28 Q22 22 28 18 Q34 14 40 16 Q48 18 50 26 Q52 34 46 40 Q38 44 30 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Ribbing lines */}
      <line x1="32" y1="24" x2="36" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="38" y1="26" x2="42" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="36" y1="32" x2="34" y2="36" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Rock texture dots */}
      <circle cx="12" cy="12" r="1" fill={color} opacity="0.25" />
      <circle cx="50" cy="48" r="1.5" fill={color} opacity="0.2" />
      <circle cx="8" cy="45" r="1" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoFlipper({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Hydrofoil flipper shape */}
      <path d="M15 45 Q12 35 15 25 Q20 15 30 10 Q35 15 38 25 Q40 35 35 45 Q28 48 15 45Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Phalanges (finger bones inside flipper) */}
      <line x1="22" y1="38" x2="24" y2="18" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="27" y1="40" x2="28" y2="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="32" y1="38" x2="32" y2="18" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Joints */}
      {[20, 25, 30, 35].map((y, i) => (
        <circle key={i} cx={25 + i * 2.5} cy={y} r="1.2" fill={color} opacity="0.35" />
      ))}
      {/* Water flow arrows */}
      <path d="M42 30 L48 28 L46 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M44 38 L50 36 L48 40" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoSkullProfile({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Ichthyosaur skull profile */}
      <path d="M5 22 Q8 18 15 16 Q22 14 30 12 Q40 10 55 8 Q65 6 68 10 Q65 14 55 16 Q45 18 35 20 Q25 22 15 24 Q8 26 5 22Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Eye socket */}
      <circle cx="18" cy="18" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Teeth row */}
      {[30, 35, 40, 45, 50, 55, 60].map((x, i) => (
        <line key={i} x1={x} y1={12 - i * 0.5} x2={x} y2={16 - i * 0.5} stroke={color} strokeWidth="1" opacity="0.4" />
      ))}
      {/* Naris */}
      <circle cx="12" cy="16" r="1.5" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M5 22 Q20 28 35 26 Q50 24 65 18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoBubbleColumn({ size = 60, color = '#4A6F8C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising bubble column */}
      <circle cx="30" cy="52" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="28" cy="40" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <circle cx="32" cy="28" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="29" cy="18" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <circle cx="31" cy="10" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="30" cy="4" r="1.5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      {/* Highlights */}
      <circle cx="27" cy="49" r="1" fill={color} opacity="0.2" />
      <circle cx="25" cy="37" r="0.8" fill={color} opacity="0.2" />
      {/* Depth line */}
      <line x1="10" y1="56" x2="50" y2="56" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'primeros-ictiosaurios': [DecoIchthyosaur, DecoFossilImprint, DecoWavePattern],
  'anatomia-nadador': [DecoFlipper, DecoIchthyosaur, DecoWavePattern],
  'ophthalmosaurus-ojo': [DecoEyeCross, DecoBubbleColumn, DecoIchthyosaur],
  'shonisaurus-gigante': [DecoSkullProfile, DecoFossilImprint, DecoWavePattern],
  'nacimiento-mar': [DecoIchthyosaur, DecoBubbleColumn, DecoFlipper],
  'dieta-caza': [DecoSkullProfile, DecoFossilImprint, DecoEyeCross],
  'desaparicion-temprana': [DecoWavePattern, DecoFossilImprint, DecoBubbleColumn],
};

// ━━━ Content Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BIBLIOGRAPHY = [
  'Motani, R. (2005). Evolution of fish-shaped reptiles (Reptilia: Ichthyopterygia) in their physical environments and constraints. Annual Review of Earth and Planetary Sciences, 33, 395–420',
  'McGowan, C. & Motani, R. (2003). Ichthyopterygia. Handbook of Paleoherpetology, Part 8. Verlag Dr. Friedrich Pfeil, Munich',
  'Lomax, D.R. (2017). A new leptonectid ichthyosaur from the Lower Jurassic of Lyme Regis. Papers in Palaeontology, 3(1), 99–117',
  'Fischer, V., Bardet, N., Benson, R.B.J., Arkhangelsky, M.S. & Friedman, M. (2016). Extinction of fish-shaped marine reptiles associated with reduced evolutionary rates and global environmental volatility. Nature Communications, 7, 10825',
  'Anning, M. (collected by De la Beche, H.T. & Conybeare, W.D., 1821). Notice of the discovery of a new fossil animal, forming a link between the Ichthyosaurus and Crocodile. Transactions of the Geological Society of London, s2-5(2), 559–594',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'primeros-ictiosaurios',
    title: 'Los Primeros Ictiosaurios',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_primeros-ictiosaurios.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_primeros-ictiosaurios.jpg',
    content: [
      'Los ictiosaurios aparecieron durante el Triásico Temprano, hace aproximadamente 248 millones de años, apenas dos millones de años después de la devastadora extinción masiva del Pérmico-Triásico que eliminó al 96% de las especies marinas y al 70% de las terrestres. Son uno de los primeros grupos de reptiles en regresar al mar, evolucionando a partir de ancestros terrestres aún no identificados con certeza. Los fósiles más antiguos provienen de formaciones geológicas en Japón, China y la Columbia Británica de Canadá, lo que indica que colonizaron los océanos de forma rápida y amplia.',
      'El concepto científico que mejor define a los ictiosaurios es la evolución convergente: el proceso por el cual organismos no emparentados desarrollan formas corporales similares al adaptarse a ambientes parecidos. Los ictiosaurios evolucionaron cuerpos hidrodinámicos con forma de torpedo que se asemejan a los delfines modernos, aunque los delfines son mamíferos que aparecieron 200 millones de años después. Esta convergencia incluye hocico alargado, aletas anteriores en forma de pala, cuerpo fusiforme y cola con aleta caudal, todo surgido independientemente en linajes separados.',
      'La paleontóloga Mary Anning realizó uno de los hallazgos más relevantes de la historia de la ciencia cuando en 1811, a los 12 años de edad, descubrió el primer esqueleto articulado de un ictiosaurio en los acantilados jurásicos de Lyme Regis, en la costa de Dorset, Inglaterra. Este descubrimiento fue fundamental para establecer el concepto de extinción como fenómeno natural, una idea que la comunidad científica y religiosa de la época resistía. Anning continuó excavando fósiles durante décadas, contribuyendo también al hallazgo de plesiosaurios y pterosaurios.',
      'Los primeros ictiosaurios del Triásico, como Utatsusaurus y Chaohusaurus, todavía conservaban rasgos de sus ancestros terrestres: cuerpos alargados con forma de lagarto acuático, extremidades más parecidas a patas que a aletas, y colas largas sin aleta caudal desarrollada. En apenas 30 millones de años, estas formas primitivas evolucionaron hacia los diseños hidrodinámicos de tipo delfín que caracterizaron a los ictiosaurios del Jurásico y Cretácico, un ritmo evolutivo que los paleontólogos consideran notablemente acelerado.',
      'El registro fósil muestra que los ictiosaurios alcanzaron su máxima diversidad durante el Triásico Tardío y el Jurásico Temprano, con más de 100 especies descritas hasta la fecha. Ocuparon nichos ecológicos variados, desde depredadores costeros de pequeño tamaño hasta gigantes oceánicos que superaban los 20 metros de longitud. Su éxito evolutivo se refleja en una distribución geográfica global: se han encontrado fósiles en todos los continentes, incluyendo la Antártida, donde el género Kaiwhekea fue descrito a partir de especímenes del Cretácico Tardío hallados en 2003.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning nunca recibió crédito formal por la mayoría de sus descubrimientos durante su vida. Los científicos varones de Londres compraban sus fósiles y publicaban artículos sin mencionarla. No fue hasta 2010 que la Royal Society la incluyó en su lista de las diez mujeres británicas más influyentes en la historia de la ciencia. En 2024, una moneda británica de 50 peniques fue acuñada con su imagen junto a un ictiosaurio, más de 170 años después de su muerte en 1847.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evolución convergente entre ictiosaurios y delfines es tan precisa que ambos grupos desarrollaron independientemente una estructura llamada "rostro" (hocico alargado), ojos grandes adaptados a condiciones de poca luz, y un patrón de coloración que los paleontólogos denominan "contrasombreado": oscuros por arriba y claros por abajo. Un estudio publicado en Nature en 2014 por Johan Lindgren analizó melanosomas preservados en piel fosilizada de un Stenopterygius, confirmando que tenía pigmentación oscura en el dorso.' },
    ],
    fact: 'El fósil más antiguo de ictiosaurio conocido proviene de la Formación Osawa en la prefectura de Miyagi, Japón, y data de hace 248,2 millones de años. Fue descrito por Motani y colegas en 1998 como Utatsusaurus hataii. Medía aproximadamente 2,5 metros y su esqueleto muestra la transición entre la vida terrestre y la acuática: conservaba costillas similares a las de reptiles terrestres, pero sus extremidades ya mostraban los primeros signos de transformación en aletas, con los huesos de los dedos aplanados y alargados.',
  },
  {
    id: 'anatomia-nadador',
    title: 'Anatomía de un Nadador Perfecto',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_anatomia-nadador.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_anatomia-nadador.jpg',
    content: [
      'El cuerpo de un ictiosaurio avanzado como Ichthyosaurus communis representa una de las adaptaciones hidrodinámicas más eficientes del registro fósil. Su forma fusiforme —ancho en el centro y afinado en ambos extremos— minimizaba la resistencia al agua durante la natación. Estudios de mecánica de fluidos computacional publicados por Gutarra y colaboradores en 2019 demostraron que la relación entre longitud y diámetro corporal de los ictiosaurios se acercaba al óptimo teórico para minimizar la fricción, similar a la de los atunes y delfines actuales.',
      'La aleta caudal de los ictiosaurios avanzados tenía forma de media luna (lunada), una configuración que genera máximo empuje con mínimo arrastre. A diferencia de los peces, cuya columna vertebral se extiende al lóbulo superior de la cola, en los ictiosaurios la columna vertebral se curvaba hacia abajo y sostenía el lóbulo inferior. Esta estructura quedó demostrada en 1892 cuando se encontraron especímenes excepcionalmente preservados en las canteras de Holzmaden, Alemania, con contornos de tejido blando que revelaban la silueta completa del animal, incluyendo la aleta dorsal que no dejaba registro óseo.',
      'Las extremidades de los ictiosaurios se transformaron en aletas rígidas compuestas por cientos de pequeños huesos llamados falanges. Un fenómeno denominado hiperfalangia aumentó el número de huesos en cada dedo más allá de lo normal en reptiles, y la hiperdactilia añadió dedos adicionales en algunas especies. El género Ophthalmosaurus poseía hasta 8 dedos con más de 20 falanges cada uno. Estas aletas funcionaban como estabilizadores y timones, ya que la propulsión principal venía de la cola, no de las extremidades anteriores.',
      'Los ictiosaurios respiraban aire como todos los reptiles, lo que significa que debían subir periódicamente a la superficie. Sin embargo, las adaptaciones para buceo profundo eran numerosas. Sus pulmones se podían colapsar bajo presión para evitar la narcosis por nitrógeno, de manera similar a los cetáceos modernos. Los huesos de algunos especímenes muestran evidencia de necrosis avascular —daño óseo causado por burbujas de nitrógeno al ascender demasiado rápido—, lo que indica que sufrían enfermedad por descompresión, el equivalente biológico de lo que los buzos humanos llaman "la curva".',
      'La temperatura corporal de los ictiosaurios ha sido objeto de investigación reciente. Un estudio de 2010 publicado en Science por Aurélien Bernard y su equipo analizó isótopos de oxígeno en los dientes de ictiosaurios y determinó que mantenían una temperatura corporal entre 35°C y 39°C, significativamente más alta que la del agua circundante. Esto sugiere que eran endotermos o al menos homeotérmicos regionales, capaces de generar calor metabólico interno, lo cual les proporcionaba una ventaja para nadar activamente en aguas frías y realizar inmersiones prolongadas a grandes profundidades.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las canteras de Holzmaden, en Baden-Württemberg, Alemania, han producido más de 3.000 esqueletos de ictiosaurios desde el siglo XIX. Las condiciones del fondo marino jurásico — pobre en oxígeno y rico en sulfuro de hidrógeno — inhibieron la descomposición bacteriana y permitieron la preservación de tejidos blandos como piel, aletas y hasta contenidos estomacales. Un espécimen de Stenopterygius del Museo de Stuttgart conserva la silueta completa del cuerpo con fibras de colágeno aún visibles bajo el microscopio electrónico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los ictiosaurios avanzados alcanzaban velocidades estimadas de crucero entre 2 y 4 metros por segundo (7 a 14 km/h), con ráfagas que podían superar los 10 m/s (36 km/h) según modelos biomecánicos basados en la morfología de la cola lunada. Para comparación, un delfín nariz de botella cruza a 3,3 m/s y un atún aleta azul alcanza 20 m/s. La forma de la cola lunada reduce los vórtices en la punta, aumentando la eficiencia propulsiva hasta un 85%, comparada con el 50-60% de colas con forma simétrica.' },
    ],
    fact: 'En 2018, el paleontólogo Lene Liebe Delsett y su equipo de la Universidad de Oslo describieron un espécimen de ictiosaurio del Jurásico Inferior de Svalbard, Noruega, que presentaba evidencia de grasa subcutánea (blubber) preservada como película orgánica. El análisis químico mediante espectrometría de masas confirmó la presencia de lípidos degradados y fibras de colágeno, la primera prueba directa de que los ictiosaurios poseían una capa aislante de grasa similar a la de los mamíferos marinos actuales, lo que respalda la hipótesis de endotermia.',
  },
  {
    id: 'ophthalmosaurus-ojo',
    title: 'Ophthalmosaurus: El Ojo Gigante',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_ophthalmosaurus-ojo.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_ophthalmosaurus-ojo.jpg',
    content: [
      'Ophthalmosaurus, cuyo nombre significa "lagarto ojo", poseía los ojos más grandes proporcionalmente de cualquier vertebrado conocido. Cada globo ocular medía hasta 23 centímetros de diámetro —comparable al tamaño de un plato de postre— en un animal de entre 4 y 6 metros de longitud total. Los ojos estaban protegidos y reforzados por un anillo de placas óseas llamado anillo esclerótico, compuesto por entre 12 y 15 huesos interconectados que funcionaban como un diafragma óptico ajustable, controlando la cantidad de luz que entraba al ojo.',
      'El anillo esclerótico no era solo protección: estudios biomecánicos de Motani en 1999 demostraron que su forma y dimensiones permitían calcular la capacidad visual del animal. El diámetro de apertura del anillo (la "pupila ósea") era de aproximadamente 12 centímetros, lo que proporcionaba una capacidad de captación de luz entre 10 y 15 veces superior a la del ojo humano. Esto habría permitido a Ophthalmosaurus detectar presas a profundidades donde la luz solar se reduce al 1% del valor en superficie, es decir, más allá de los 200 metros de profundidad.',
      'La zona fótica del océano, donde penetra suficiente luz para la fotosíntesis, llega hasta unos 200 metros de profundidad. Por debajo comienza la zona disfótica o crepuscular, que se extiende hasta los 1.000 metros. Los ojos de Ophthalmosaurus estaban optimizados para la caza en esta zona intermedia, donde habitaban calamares, peces y crustáceos de aguas profundas. Los modelos ópticos sugieren que podía detectar la bioluminiscencia de presas a distancias de hasta 30 metros en condiciones de oscuridad casi total.',
      'La evidencia de buceo profundo en Ophthalmosaurus no se limita a sus ojos. Varios especímenes presentan lesiones óseas consistentes con necrosis avascular, una patología causada por la formación de burbujas de nitrógeno en los tejidos cuando un animal asciende demasiado rápido desde grandes profundidades. Los investigadores Bruce Rothschild y Larry Martin documentaron estas lesiones en 2005, comparándolas con las que sufren los buzos humanos que experimentan enfermedad por descompresión ("the bends"), proporcionando evidencia independiente de que estos reptiles se sumergían regularmente a cientos de metros bajo la superficie.',
      'Ophthalmosaurus vivió durante el Jurásico Medio y Tardío, entre 165 y 145 millones de años atrás, y sus fósiles se han encontrado en Inglaterra, Francia, Argentina y Canadá. Sus dientes eran pequeños y cónicos, adaptados para sujetar presas resbaladizas como calamares y peces de cuerpo blando, en lugar de triturar conchas o cortar carne. El análisis de isótopos estables de carbono y nitrógeno en los dientes, publicado por Patrick Druckenmiller en 2002, indica que ocupaba un nivel trófico similar al de los delfines oceánicos actuales, alimentándose principalmente de cefalópodos y peces pelágicos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El ojo del calamar gigante (Architeuthis dux), con 27 centímetros de diámetro, supera al de Ophthalmosaurus como el ojo más grande de un animal vivo. Pero en el registro fósil, los ictiosaurios mantienen el récord: el género Temnodontosaurus del Jurásico Temprano tenía ojos de hasta 26 centímetros, superando incluso a Ophthalmosaurus. La razón de ojos tan grandes en animales marinos profundos es puramente física: un ojo más grande tiene una pupila más grande, que capta más fotones por unidad de tiempo, permitiendo formar imágenes en condiciones de luz mínima.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fórmula óptica que explica la ventaja de ojos grandes es directa: la cantidad de luz captada por una lente es proporcional al cuadrado de su diámetro de apertura. Un ojo con una pupila de 12 cm capta 144 veces más luz que uno con pupila de 1 cm. Además, la resolución angular — la capacidad de distinguir dos puntos cercanos — también mejora con el diámetro. Los cálculos de Motani et al. (1999) indican que Ophthalmosaurus podía discriminar objetos de 5 cm a una distancia de 15 metros en condiciones equivalentes a una noche de luna nueva.' },
    ],
    fact: 'Un estudio de 2006 publicado por Humphries y Ruxton en la revista Biology Letters utilizó modelos matemáticos de transmisión de luz en el agua para calcular que Ophthalmosaurus podía bucear eficazmente hasta profundidades de 500 metros o más. A esa profundidad, la presión del agua alcanza 50 atmósferas (50 veces la presión en superficie), y la temperatura desciende a menos de 4°C. El anillo esclerótico actuaba como un refuerzo estructural que impedía la deformación del globo ocular bajo esta presión, permitiendo mantener el enfoque óptico preciso necesario para la caza.',
  },
  {
    id: 'shonisaurus-gigante',
    title: 'Shonisaurus: El Gigante del Triásico',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_shonisaurus-gigante.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_shonisaurus-gigante.jpg',
    content: [
      'Shonisaurus popularis fue descrito en 1976 por Charles Camp a partir de decenas de esqueletos encontrados en la Formación Luning del Triásico Tardío (hace 227 millones de años) en las montañas Shoshone de Nevada, Estados Unidos. Con una longitud estimada de 15 metros y un peso de aproximadamente 30 toneladas, Shonisaurus fue durante décadas el ictiosaurio más grande conocido. El yacimiento de Nevada contenía al menos 37 individuos distribuidos en un área relativamente reducida, lo que ha generado debates sobre si murieron en un varamiento masivo o por una floración de algas tóxicas.',
      'En 2004, Elizabeth Nicholls describió una especie aún mayor: Shonisaurus sikanniensis, hallada en la Columbia Británica de Canadá. Este animal alcanzaba los 21 metros de longitud, comparable a una ballena jorobada adulta, convirtiéndolo en uno de los vertebrados marinos más grandes del Mesozoico. Su cráneo medía más de 3,5 metros, y a diferencia del Shonisaurus original de Nevada, los adultos de S. sikanniensis carecían completamente de dientes, lo que sugiere que se alimentaban por succión, aspirando presas de cuerpo blando como cefalópodos de forma similar a como lo hacen las ballenas zifios actuales.',
      'En 2021, un equipo liderado por Dean Lomax publicó en PLoS ONE la descripción de una vértebra parcial y fragmentos óseos de un ictiosaurio descubierto en la Formación Westbury del Triásico Tardío en Lilstock, Somerset, Inglaterra. Las dimensiones del hueso sugieren un animal de hasta 25 metros de longitud, que de confirmarse sería el ictiosaurio más grande jamás descrito y uno de los animales más grandes de la historia, comparable en tamaño a la ballena azul, que alcanza 30 metros. Sin embargo, lo fragmentario del material impide una identificación taxonómica definitiva.',
      'El yacimiento de Berlin-Ichthyosaur State Park en Nevada, donde se encontraron los fósiles originales de Shonisaurus popularis, fue designado como monumento estatal en 1957 y parque estatal en 1970. Es uno de los pocos sitios paleontológicos del mundo donde los visitantes pueden observar huesos de ictiosaurios in situ, protegidos dentro de un edificio construido sobre la excavación original. En 1977, Shonisaurus popularis fue declarado fósil estatal de Nevada, siendo uno de los pocos estados norteamericanos en tener un reptil marino como símbolo oficial.',
      'La existencia de ictiosaurios de más de 20 metros plantea cuestiones biológicas relevantes sobre el gigantismo marino. Los modelos de Motani (2002) sugieren que el gran tamaño corporal proporcionaba ventajas termodinámicas: un cuerpo voluminoso retiene calor más eficientemente que uno pequeño (relación superficie-volumen), lo que habría permitido a estos animales mantener temperaturas corporales elevadas en aguas frías del Triásico. Además, el gran tamaño reducía la vulnerabilidad ante depredadores y permitía almacenar más oxígeno en la sangre y los músculos para inmersiones prolongadas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El debate sobre la "masacre de ictiosaurios" de Nevada continúa desde 1954. La hipótesis original de Charles Camp era un varamiento masivo en una playa, pero en 2011 Mark McMenamin propuso una teoría controvertida: que un kraken gigante (un cefalópodo gigante) había cazado y acumulado los cuerpos. La mayoría de paleontólogos rechazó esta idea por falta de evidencia directa, y las explicaciones más aceptadas incluyen eventos de mortalidad masiva por toxinas algales o condiciones anóxicas en el fondo marino que concentraron los cadáveres.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La escala de Shonisaurus sikanniensis (21 metros) se puede contextualizar comparándola con otros gigantes marinos: el megalodón, el tiburón más grande conocido, alcanzaba 15–18 metros; el cachalote actual llega a 18 metros; y solo la ballena azul (30 metros) lo supera claramente entre los vertebrados marinos. En términos de masa, los 30.000–40.000 kg estimados para Shonisaurus lo colocan en el rango de las orcas grandes (hasta 10.000 kg) multiplicado por tres o cuatro veces.' },
    ],
    fact: 'En el Berlin-Ichthyosaur State Park de Nevada, los paleontólogos encontraron 37 esqueletos de Shonisaurus popularis depositados en un área de aproximadamente 200 metros cuadrados, lo que representa una de las concentraciones más densas de reptiles marinos gigantes en el registro fósil. Los huesos muestran diferentes grados de articulación: algunos esqueletos están casi completos mientras otros están desorganizados, lo que indica que los animales murieron en diferentes momentos durante un período de tiempo y no en un solo evento catastrófico instantáneo.',
  },
  {
    id: 'nacimiento-mar',
    title: 'Nacimiento en el Mar',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_nacimiento-mar.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_nacimiento-mar.jpg',
    content: [
      'Los ictiosaurios eran vivíparos: daban a luz crías completamente formadas en el agua, sin necesidad de regresar a tierra firme para poner huevos. Esta adaptación fue fundamental para su éxito como reptiles completamente marinos, ya que eliminó la dependencia de las playas que limita a las tortugas marinas actuales. La evidencia fósil de viviparidad en ictiosaurios es abundante y directa: se han descubierto más de 50 especímenes de hembras con embriones preservados dentro de la cavidad corporal, algunos en diferentes etapas de desarrollo gestacional.',
      'El espécimen más dramático es un Stenopterygius del Jurásico Inferior de Holzmaden, Alemania, que muestra una cría emergiendo del canal de parto de la madre en el momento exacto de la fosilización. La cría aparece con la cola saliendo primero, lo que es consistente con el parto caudal (cola primero) observado en cetáceos modernos como delfines y ballenas. Este patrón de nacimiento previene que la cría se ahogue durante el parto: la cabeza emerge al final, permitiendo que el recién nacido tome su primera respiración inmediatamente después de separarse completamente de la madre.',
      'Un estudio publicado en 2014 por Motani y colaboradores en PLoS ONE describió un espécimen de Chaohusaurus del Triásico de China con tres embriones: uno ya nacido, otro en el canal de parto saliendo de cabeza (no de cola), y un tercero aún dentro del útero. Este hallazgo fue significativo porque demostró que el parto caudal (cola primero) no era universal en los ictiosaurios primitivos. Los autores propusieron que el parto cefálico (cabeza primero) era la condición ancestral heredada de los reptiles terrestres, y que el parto caudal evolucionó posteriormente como adaptación a la vida acuática.',
      'La viviparidad implica un sistema reproductivo complejo. Las hembras de ictiosaurios probablemente tenían úteros funcionales con algún tipo de placenta o membrana nutritiva, similar a la de ciertos lagartos vivíparos actuales como los eslizones del género Trachylepis. El tamaño de las camadas variaba según la especie: algunos especímenes muestran un solo embrión grande (como en los delfines), mientras que otros contienen de 2 a 11 crías más pequeñas, un patrón más similar al de ciertos tiburones vivíparos.',
      'El cuidado parental en ictiosaurios es un tema de especulación informada. Las crías nacían con proporciones corporales ligeramente diferentes a las de los adultos: cabezas proporcionalmente más grandes y aletas más cortas, lo que sugiere capacidades natatorias limitadas en las primeras semanas de vida. Por analogía con los cetáceos modernos, es probable que las madres permanecieran cerca de las crías recién nacidas para protegerlas de depredadores. Sin embargo, no existe evidencia fósil directa de comportamiento parental, ya que los fósiles solo preservan anatomía, no conducta.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El espécimen de Stenopterygius "dando a luz" del Museo de Stuttgart (SMNS 50963) fue encontrado en 1895 en Holzmaden y ha sido exhibido continuamente durante más de 125 años. Durante mucho tiempo se debatió si la cría estaba naciendo o siendo expulsada post-mortem por los gases de descomposición. Estudios detallados de la posición anatómica y la articulación de los huesos, publicados por Böttcher en 1990, confirmaron que se trata de un parto genuino interrumpido por la muerte, posiblemente por complicaciones durante el alumbramiento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evolución de la viviparidad en reptiles marinos ocurrió al menos tres veces de forma independiente: en ictiosaurios, mosasaurios y en algunos plesiosaurios. Un estudio de 2011 por O\'Keefe y Chiappe describió un fósil de Polycotylus (plesiosaurio) con un único embrión grande, sugiriendo que los plesiosaurios también eran vivíparos. La viviparidad parece ser una adaptación convergente necesaria para cualquier reptil que se comprometa completamente con la vida marina, ya que elimina la vulnerabilidad del huevo al agua salada y los depredadores terrestres.' },
    ],
    fact: 'El fósil más revelador sobre la reproducción de ictiosaurios fue descrito por Renesto y colaboradores en 2003: una hembra de Besanosaurus leptorhynchus del Triásico Medio de Monte San Giorgio, Italia-Suiza, que contenía cuatro embriones en su interior. Los embriones estaban en diferentes grados de desarrollo, sugiriendo que la gestación producía crías a diferentes ritmos, un fenómeno conocido como superfetación que también ocurre en algunos peces y tiburones modernos. Este espécimen data de hace 240 millones de años, siendo una de las evidencias más antiguas de viviparidad en reptiles marinos.',
  },
  {
    id: 'dieta-caza',
    title: 'Dieta y Caza',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_dieta-caza.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_dieta-caza.jpg',
    content: [
      'La dieta de los ictiosaurios se conoce con precisión gracias a la preservación de contenidos estomacales fosilizados, un tipo de evidencia directa poco común en paleontología. Múltiples especímenes de Stenopterygius e Ichthyosaurus del Jurásico de Europa conservan restos identificables de cefalópodos (calamares y parientes de las sepias), peces óseos y, en algunos casos, crustáceos. Los ganchos quitinosos de los brazos de los cefalópodos resisten la digestión y se preservan con frecuencia, indicando que estos moluscos constituían una proporción significativa de la dieta de muchas especies.',
      'La morfología dental de los ictiosaurios revela adaptaciones a diferentes estrategias alimentarias. Las especies con dientes cónicos y puntiagudos, como Ichthyosaurus communis, eran depredadores de persecución que capturaban peces y cefalópodos rápidos. Las formas con dientes más robustos y redondeados, como Tholodus, trituraban conchas de moluscos y crustáceos. Los ictiosaurios gigantes edéntulos (sin dientes) como Shonisaurus sikanniensis probablemente se alimentaban por succión, creando una corriente de agua negativa al abrir rápidamente la boca, un mecanismo análogo al que utilizan las ballenas zifios actuales.',
      'Un estudio de 2003 publicado en Palaeontology por Kear y colaboradores analizó coprolitos (heces fosilizadas) de ictiosaurios del Jurásico de Australia y encontró restos de peces, cefalópodos y fragmentos de equinodermos (erizos de mar). Los coprolitos contenían también escamas de peces en espiral, lo que indica que los ictiosaurios tragaban sus presas enteras y la digestión giraba el alimento en el tracto intestinal, similar a como ocurre en los tiburones modernos. Esta evidencia complementa los datos de contenidos estomacales y proporciona información sobre la eficiencia digestiva.',
      'Las estrategias de caza variaban según el nicho ecológico. Los ictiosaurios de ojos grandes como Ophthalmosaurus eran cazadores crepusculares y nocturnos que perseguían presas bioluminiscentes en aguas profundas. Los ictiosaurios de hocico largo y delgado como Eurhinosaurus poseían mandíbulas superiores que se extendían hasta el doble de la longitud de las inferiores, en un diseño similar al del pez espada actual, que usaban para golpear lateralmente dentro de cardúmenes de peces, aturdiendo a las presas antes de consumirlas.',
      'La competencia por recursos alimentarios influyó en la diversificación de los ictiosaurios. Durante el Jurásico Temprano, coexistieron múltiples especies en los mismos ecosistemas marinos del sur de Inglaterra y Alemania, y la diferenciación de nichos tróficos — desde comedores de conchas hasta cazadores pelágicos de alta velocidad — permitió la coexistencia. Análisis de isótopos de calcio publicados por Clémence Lécuyer en 2004 demostraron que diferentes especies de ictiosaurios del mismo yacimiento ocupaban niveles tróficos distintos, confirmando la partición de recursos alimentarios que permitía su coexistencia ecológica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2020, un equipo chino liderado por Da-Yong Jiang publicó en iScience el contenido estomacal de un Guizhouichthyosaurus del Triásico Medio de Guizhou, China. Dentro del estómago se encontró otro reptil marino casi completo: un Xinpusaurus de 4 metros de largo, un talatosaurio que el ictiosaurio de 5 metros había tragado poco antes de morir. Es la evidencia más directa de megadepredación entre reptiles marinos mesozoicos, y demuestra que algunos ictiosaurios cazaban presas casi de su propio tamaño.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los belemnites — cefalópodos extintos parientes de las sepias actuales — fueron probablemente la presa más consumida por ictiosaurios del Jurásico. Sus rostros (conchas internas calcificadas con forma de bala) se encuentran con frecuencia dentro y alrededor de esqueletos de ictiosaurios. Un espécimen de Stenopterygius del museo de Tübingen contiene más de 200 rostros de belemnites en la región estomacal, lo que indica una última comida de proporciones masivas o la acumulación de múltiples ingestas antes de la muerte.' },
    ],
    fact: 'Eurhinosaurus longirostris del Jurásico Temprano de Holzmaden poseía una mandíbula superior que se extendía más del doble que la inferior, creando un "pico" óseo con dientes laterales que sobresalían horizontalmente. Esta estructura carece de análogo exacto entre los vertebrados actuales, aunque recuerda al pez espada y al pez sierra. Estudios de tomografía computarizada publicados por Maisch y Matzke en 2000 revelaron canales vasculares en el rostro que podrían haber alojado electroreceptores, lo que sugiere que Eurhinosaurus podía detectar los campos eléctricos generados por los músculos de sus presas ocultas en el sedimento.',
  },
  {
    id: 'desaparicion-temprana',
    title: 'La Desaparición Temprana',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/infographic_m2/btn_desaparicion-temprana.jpg',
    image: '/assets/reptiles_marinos/infographic_m2/hero_desaparicion-temprana.jpg',
    content: [
      'A diferencia de los plesiosaurios y mosasaurios, que sobrevivieron hasta la extinción masiva del Cretácico-Paleógeno hace 66 millones de años, los ictiosaurios desaparecieron del registro fósil aproximadamente 90 millones de años atrás, durante el Cenomaniano del Cretácico Tardío. Esta extinción temprana ha sido un enigma paleontológico durante décadas, ya que los ictiosaurios habían dominado los océanos durante más de 150 millones de años y parecían estar bien adaptados a la vida marina. Su desaparición ocurrió unos 25 millones de años antes del impacto del asteroide Chicxulub.',
      'Un estudio fundamental de Valentin Fischer y colaboradores, publicado en Nature Communications en 2016, analizó las tasas de especiación y extinción de los ictiosaurios durante todo su rango temporal. Los resultados mostraron que la diversidad de ictiosaurios comenzó a declinar durante el Cretácico Temprano, mucho antes de su extinción final. Las tasas de aparición de nuevas especies cayeron significativamente mientras las tasas de extinción se mantuvieron constantes, un patrón que sugiere una pérdida gradual de capacidad evolutiva para generar formas nuevas, no una catástrofe repentina.',
      'Los factores ambientales jugaron un papel determinante. El Cenomaniano experimentó cambios oceanográficos profundos: un aumento global del nivel del mar de entre 100 y 200 metros por encima del actual, alteraciones en las corrientes oceánicas, y eventos anóxicos oceánicos (OAE2) en los que vastas regiones del fondo marino perdieron su oxígeno. Estos cambios reorganizaron los ecosistemas marinos, alterando la distribución de las presas y creando condiciones desfavorables en los hábitats tradicionales de los ictiosaurios, que dependían de aguas abiertas bien oxigenadas.',
      'La hipótesis de la competencia con otros depredadores marinos ha sido debatida extensamente. Durante el Cretácico, nuevos grupos de depredadores aparecieron y se diversificaron: los mosasaurios (lagartos marinos gigantes emparentados con los varanos) surgieron hace unos 98 millones de años y se expandieron rápidamente en los nichos ecológicos que los ictiosaurios habían ocupado. Tiburones como los lamniformes también experimentaron radiaciones adaptativas durante este período. Sin embargo, Fischer et al. (2016) argumentaron que la diversidad de ictiosaurios ya estaba en declive antes de que los mosasaurios se diversificaran significativamente.',
      'La baja diversidad de ictiosaurios del Cretácico los hacía vulnerables a perturbaciones ambientales. Mientras que en el Jurásico coexistían docenas de géneros con morfologías variadas, en el Cretácico Temprano solo sobrevivían unas pocas líneas evolutivas, todas con morfologías similares de "cuerpo de atún" adaptadas a la natación de alta velocidad en mar abierto. Esta homogeneidad morfológica y ecológica significaba que un solo cambio ambiental que afectara su nicho podía eliminar al grupo entero, a diferencia de un clado diverso donde algunas formas podrían sobrevivir en nichos alternativos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El último ictiosaurio conocido pertenece al género Platypterygius, cuyos fósiles se han encontrado en Australia, Europa, América del Norte y América del Sur, lo que demuestra que aún tenían distribución global justo antes de extinguirse. Un espécimen de Platypterygius australis descrito por Kear en 2003 contenía restos de un ave en su estómago — un hesperornitiforme — lo que indica que los últimos ictiosaurios todavía eran depredadores activos y versátiles, capaces de capturar incluso vertebrados voladores que se posaban en la superficie del agua.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El evento anóxico oceánico OAE2 del Cenomaniano-Turoniano (hace 93,9 millones de años) fue uno de los más severos del Mesozoico. Las concentraciones de oxígeno disuelto en amplias regiones del océano cayeron por debajo de 0,5 ml/L (frente a los 5-8 ml/L normales), creando "zonas muertas" donde la vida aeróbica era imposible. Para un reptil de respiración aérea como un ictiosaurio, el problema no era respirar sino la desaparición de las presas que dependían del oxígeno disuelto: peces, cefalópodos y crustáceos sufrieron mortalidades masivas en estas zonas anóxicas.' },
    ],
    fact: 'Un análisis filogenético de 2016 por Fischer y colaboradores en Nature Communications reveló que los ictiosaurios del Cretácico tenían tasas de evolución molecular y morfológica significativamente más bajas que sus ancestros del Jurásico. Esta "desaceleración evolutiva" significaba que el grupo estaba perdiendo su capacidad de adaptarse a condiciones cambiantes. Los autores calcularon que durante los últimos 30 millones de años de su existencia, los ictiosaurios generaron nuevas especies a una tasa 5 veces menor que durante su apogeo en el Jurásico, un patrón que los autores denominaron "dead clade walking" — un clado caminando hacia la extinción.',
  },
];

// ━━━ Abyssal Particle Field (Canvas Background) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AbyssalField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or soft copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y += 0.06;
        if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
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

// ━━━ Ichthyosaur Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function IchthyosaurHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Ocean depth arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#depthGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 depth markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central ichthyosaur icon */}
        <ellipse cx="300" cy="28" rx="18" ry="8" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="290" cy="26" r="2.5" fill="#5B7B9A" opacity="0.5" />
        <line x1="318" y1="28" x2="326" y2="24" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="318" y1="28" x2="326" y2="32" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="depthGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ICTIOSAURIOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LOS DELFINES DEL MESOZOICO</text>
      </svg>
    </div>
  );
}

// ━━━ Organic Node Button (matching BttfM2 style) ━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,123,154,0.2)'}`,
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
          layoutId="activeDotMarinosM2"
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

// ━━━ Expandable Section with Random Direction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Magazine-Style Content Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

      {/* ━━━ Two-Column Hero Section ━━━ */}
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

      {/* ━━━ Magazine Body ━━━ */}
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

        {/* ━━━ Expandable Interactive Sections ━━━ */}
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

// ━━━ Progress Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(91,123,154,0.15)',
    }}>
      <Star size={14} style={{ color: '#5B7B9A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B7B9A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,123,154,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5B7B9A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ━━━ Main Infographic Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function InteractiveInfographic_MarinosM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/bg_marinos_m2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AbyssalField />

      <IchthyosaurHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(91,123,154,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,123,154,0.08)', borderRadius: '16px',
              border: '1px solid rgba(91,123,154,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5B7B9A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de los Ictiosaurios!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Descubridor de Ictiosaurios
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ━━━ Bibliografía ━━━ */}
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
