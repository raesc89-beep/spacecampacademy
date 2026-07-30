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
  'disco-zodiacal': [DecoZodiacWheel, DecoCelestialDisk, DecoColumns],
  'constelaciones': [DecoZodiacWheel, DecoCobra, DecoLotus],
  'templo-hathor': [DecoColumns, DecoHathor, DecoLotus],
  'robo-louvre': [DecoColumns, DecoCelestialDisk, DecoZodiacWheel],
  'datacion': [DecoCelestialDisk, DecoZodiacWheel, DecoColumns],
  'criaturas': [DecoCrocodile, DecoHippo, DecoCobra],
  'planetas': [DecoCelestialDisk, DecoZodiacWheel, DecoHathor],
  'legado': [DecoZodiacWheel, DecoLotus, DecoCelestialDisk],
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
    btnImage: '/assets/egypt/infographic_dendera/btn_disco.png',
    image: '/assets/egypt/infographic_dendera/hero_disco.png',
    content: [
      'En el techo de un pequeÃ±o cuarto oscuro dentro del templo de Hathor en Dendera, Egipto, existÃ­a un tesoro extraordinario: un disco de piedra arenisca de 2.5 metros de diÃ¡metro y varias toneladas de peso que contenÃ­a el mapa circular mÃ¡s antiguo del cielo nocturno que ha sobrevivido hasta nuestros dÃ­as.',
      'Este es el Zodiaco de Dendera, tallado hace aproximadamente 2,050 aÃ±os (c. 50 a.C.) durante la dinastÃ­a ptolemaica, cuando los faraones eran de origen griego. El disco muestra el cielo completo organizado como un reloj cÃ³smico: en el centro estÃ¡ el polo norte celeste rodeado por las estrellas circumpolares, y en los anillos exteriores se despliegan las 36 constelaciones decanales del calendario estelar egipcio.',
      'Lo extraordinario del diseÃ±o es su precisiÃ³n geomÃ©trica. Cuatro pares de figuras con forma de halcones y diosas con brazos levantados sostienen el disco desde sus bordes, representando los ocho puntos cardinales e intercardinales. La composiciÃ³n es a la vez un mapa astronÃ³mico funcional y una obra maestra del arte religioso egipcio.',
      'El astrÃ³nomo francÃ©s Sylvie Cauville (CNRS) dedicÃ³ 20 aÃ±os a traducir los 2,500 jeroglÃ­ficos del templo de Dendera. Su trabajo revelÃ³ que cada figura del zodiaco tiene un nombre egipcio especÃ­fico y un significado astronÃ³mico preciso, no meramente decorativo.',
      'La orientaciÃ³n del disco codifica la precesiÃ³n de los equinoccios: el eje del mundo aparece ligeramente desplazado respecto al centro geomÃ©trico, indicando que los egipcios conocÃ­an este fenÃ³meno descubierto por Hiparco de Nicea (c. 190-120 a.C.).',
      'Esta monumental obra de piedra representa el esfuerzo mÃ¡s ambicioso del mundo antiguo por capturar todo el firmamento en una sola imagen.',
    ],
    fact: 'El Zodiaco de Dendera es el Ãºnico mapa celeste circular completo de la AntigÃ¼edad. Los mapas babilonios eran tablas numÃ©ricas, y los griegos usaban esferas armilares. Solo los egipcios crearon un "planisferio" tallado en piedra.',
  },
  {
    id: 'constelaciones',
    title: 'Las 12 + las Egipcias',
    color: '#7EB8C9',
    btnImage: '/assets/egypt/infographic_dendera/btn_constelaciones.png',
    image: '/assets/egypt/infographic_dendera/hero_constelaciones.png',
    content: [
      'El Zodiaco de Dendera muestra las 12 constelaciones zodiacales que todavÃ­a conocemos: Aries, Tauro, GÃ©minis, CÃ¡ncer, Leo, Virgo, Libra, Escorpio, Sagitario, Capricornio, Acuario y Piscis. Pero aquÃ­ viene lo fascinante: tambiÃ©n incluye constelaciones puramente egipcias que no aparecen en ningÃºn otro mapa del mundo antiguo.',
      'El Cocodrilo Celestial (Sobek) aparece con la cola curvada, representando una regiÃ³n del cielo cerca de lo que hoy llamamos Capricornio. El HipopÃ³tamo Erguido (Reret/Taweret) sostiene un bastÃ³n y un cocodrilo pequeÃ±o, ubicada donde hoy vemos la Osa Mayor. Un Chacal sobre un azadÃ³n marca la posiciÃ³n de lo que los griegos llamarÃ­an la constelaciÃ³n del Boyero.',
      'La fusiÃ³n es asombrosa: en un mismo disco coexisten el toro mesopotÃ¡mico de Tauro, el leÃ³n griego de Leo, y el hipopÃ³tamo egipcio de Reret. Es el documento mÃ¡s antiguo que demuestra la convergencia de tres tradiciones astronÃ³micas diferentes (babilÃ³nica, griega y egipcia) en un solo monumento.',
      'Los egipcios originalmente no usaban el zodÃ­aco de 12 signos. Su sistema nativo se basaba en 36 Decanos: grupos de estrellas que se levantaban sucesivamente en el horizonte cada 10 dÃ­as a lo largo del aÃ±o. Este sistema decanal fue creado al menos 2,000 aÃ±os antes que el zodÃ­aco de 12 constelaciones.',
      'El egiptÃ³logo alemÃ¡n Christian Leitz (Universidad de TÃ¼bingen) identificÃ³ en el Zodiaco de Dendera la representaciÃ³n mÃ¡s completa de la transiciÃ³n del sistema decanal egipcio al sistema zodiacal greco-babilÃ³nico. Dendera marca el momento exacto en que un sistema reemplazÃ³ al otro.',
      'Esta mezcla de constelaciones clÃ¡sicas y deidades estelares demuestra cÃ³mo las diferentes culturas compartÃ­an sus conocimientos celestes a orillas del Nilo.',
    ],
    fact: 'Los 36 Decanos egipcios fueron adoptados por los astrÃ³nomos griegos como "prosopa" (caras), despuÃ©s por los astrÃ³logos Ã¡rabes, y finalmente llegaron a la Europa medieval. Los 36 naipes de la baraja espaÃ±ola descienden indirectamente de los Decanos egipcios.',
  },
  {
    id: 'templo-hathor',
    title: 'El Templo de Hathor',
    color: '#C9A96E',
    btnImage: '/assets/egypt/infographic_dendera/btn_templo.png',
    image: '/assets/egypt/infographic_dendera/hero_templo.png',
    content: [
      'El templo de Hathor en Dendera es uno de los mejor conservados de todo Egipto. Fue construido entre el 54 a.C. y el 20 d.C., durante los Ãºltimos faraones ptolemaicos y los primeros emperadores romanos. Hathor era la diosa del amor, la mÃºsica, la alegrÃ­a y la astronomÃ­a â€” los egipcios la llamaban "SeÃ±ora de las Estrellas".',
      'Las 24 columnas del gran hall hipÃ³stilo tienen capiteles con el rostro de Hathor con orejas de vaca, un diseÃ±o Ãºnico en la arquitectura egipcia. El techo de este hall estÃ¡ pintado con escenas astronÃ³micas espectaculares que muestran el viaje del Sol y las constelaciones nocturnas, conservando sus colores originales despuÃ©s de 2,000 aÃ±os.',
      'Cleopatra VII (la Ãºltima faraona de Egipto, 69-30 a.C.) estÃ¡ representada en los relieves exteriores del templo junto a su hijo CesariÃ³n (hijo de Julio CÃ©sar). Es una de las pocas representaciones autÃ©nticas que sobreviven. Las monedas de la Ã©poca muestran a Cleopatra con rasgos mÃ¡s austeros y expresiÃ³n inteligente, muy diferente de la imagen de Hollywood.',
      'Debajo de las cÃ¡maras principales existe un sistema de criptas subterrÃ¡neas donde se guardaban los objetos rituales mÃ¡s sagrados: estatuillas de oro, papiros con textos secretos, y recipientes para ungÃ¼entos sagrados. Las paredes muestran relieves que han sido interpretados como todo tipo de cosas, desde bombillas elÃ©ctricas (pseudociencia) hasta flores de loto con serpientes (la interpretaciÃ³n arqueolÃ³gica aceptada).',
      'El templo funcionaba tambiÃ©n como un observatorio astronÃ³mico. En el techo de la capilla este de Osiris (donde estaba el Zodiaco) hay aberturas que permitÃ­an observar estrellas especÃ­ficas. Los sacerdotes usaban estas observaciones para determinar las horas nocturnas y los dÃ­as festivos del calendario religioso.',
      'La arquitectura del santuario evidencia que, para los egipcios, no existÃ­a separaciÃ³n entre la observaciÃ³n matemÃ¡tica de los astros y su veneraciÃ³n religiosa.',
    ],
    fact: 'El templo de Hathor en Dendera fue usado como iglesia cristiana copta durante siglos despuÃ©s de la caÃ­da del paganismo (c. 400 d.C.). El hollÃ­n de las hogueras coptas ennegrecÃ­a los techos, pero tambiÃ©n los protegiÃ³ de la erosiÃ³n. Al limpiar el hollÃ­n en el siglo XIX, los colores originales aparecieron perfectamente conservados.',
  },
  {
    id: 'robo-louvre',
    title: 'El Robo del Zodiaco',
    color: '#8B6B8B',
    btnImage: '/assets/egypt/infographic_dendera/btn_louvre.png',
    image: '/assets/egypt/infographic_dendera/hero_louvre.png',
    content: [
      'En 1820, el ingeniero francÃ©s Claude Lelorrain llegÃ³ a Dendera con un encargo del cÃ³nsul general de Francia: arrancar el Zodiaco del techo del templo y enviarlo a ParÃ­s. Usando sierras, cinceles, pÃ³lvora y un equipo de trabajadores locales, cortÃ³ el bloque de piedra del techo en 22 dÃ­as de trabajo brutal.',
      'El bloque de piedra, de aproximadamente 2.5 x 2.5 metros y varias toneladas de peso, fue transportado en barco por el Nilo hasta AlejandrÃ­a, y desde allÃ­ hasta Marsella. Lelorrain vendiÃ³ el Zodiaco al rey Luis XVIII por 150,000 francos (equivalente a millones de euros actuales). Desde 1822, se exhibe en el Museo del Louvre de ParÃ­s.',
      'En el templo de Dendera, en el lugar donde estaba el original, hay hoy una copia de yeso pintado que el gobierno francÃ©s instalÃ³ como "compensaciÃ³n". Los visitantes del templo caminan bajo un falso que es una pÃ¡lida sombra del original. Esta historia es desafortunadamente representativa del saqueo sistemÃ¡tico del patrimonio egipcio durante el colonialismo europeo.',
      'Egipto ha solicitado repetidamente la devoluciÃ³n del Zodiaco de Dendera. El ex-ministro de antigÃ¼edades Zahi Hawass incluyÃ³ el Zodiaco en su lista de los cinco objetos mÃ¡s importantes que Egipto reclama (junto con la Piedra de Rosetta del Museo BritÃ¡nico y el busto de Nefertiti del Museo de BerlÃ­n).',
      'La controversia del Zodiaco refleja un debate global sobre patrimonio cultural: Â¿los grandes museos del mundo preservan objetos que de otro modo se perderÃ­an, o son cÃ³mplices de un saqueo colonial? El caso del Zodiaco de Dendera es especialmente doloroso porque el templo estÃ¡ perfectamente conservado y podrÃ­a albergar el original con seguridad.',
      'Aunque el techo original descansa a miles de kilÃ³metros de su santuario, sigue siendo un testimonio silencioso del valor incalculable del conocimiento antiguo.',
    ],
    fact: 'Cuando NapoleÃ³n invadiÃ³ Egipto en 1798, llevÃ³ consigo 167 cientÃ­ficos y artistas (la "Commission des Sciences et des Arts") ademÃ¡s de sus soldados. Esta expediciÃ³n produjo la monumental "Description de l\'Ã‰gypte" (23 volÃºmenes) pero tambiÃ©n iniciÃ³ la era del saqueo arqueolÃ³gico a escala industrial.',
  },
  {
    id: 'datacion',
    title: 'FotografÃ­a del Cielo del 50 a.C.',
    color: '#E8C96A',
    btnImage: '/assets/egypt/infographic_dendera/btn_datacion.png',
    image: '/assets/egypt/infographic_dendera/hero_datacion.png',
    content: [
      'El Zodiaco de Dendera funciona como una "fotografÃ­a" del cielo de hace 2,000 aÃ±os. Los astrÃ³nomos modernos han usado computadoras para simular el cielo nocturno de cada aÃ±o de la AntigÃ¼edad y compararlo con las posiciones de las estrellas y planetas del Zodiaco. El resultado: la disposiciÃ³n corresponde exactamente al cielo del aÃ±o 50 a.C.',
      'Los cinco planetas visibles a simple vista (Mercurio, Venus, Marte, JÃºpiter y Saturno) aparecen representados en el disco en posiciones especÃ­ficas relativas a las constelaciones. Los astrÃ³nomos Eric Aubourg (CEA-Saclay, 1995) y Juan Antonio Belmonte (IAC Tenerife, 2003) confirmaron independientemente que estas posiciones coinciden con una alineaciÃ³n planetaria Ãºnica del 50 a.C.',
      'Esta capacidad de usar la astronomÃ­a como una "mÃ¡quina del tiempo" para fechar monumentos antiguos se llama arqueoastronomÃ­a computacional. Es una de las herramientas mÃ¡s poderosas de la arqueologÃ­a moderna porque los movimientos planetarios son absolutamente predecibles y reversibles en el tiempo.',
      'La dataciÃ³n astronÃ³mica del Zodiaco causÃ³ una furibunda controversia en la Francia del siglo XIX. Los creacionistas bÃ­blicos insistÃ­an en que el Zodiaco tenÃ­a 15,000 aÃ±os (para demostrar que la Biblia era incorrecta sobre la edad del mundo), mientras que los defensores de la cronologÃ­a bÃ­blica intentaban demostrar que era mÃ¡s reciente. El debate fue resuelto por Jean-Baptiste Biot (1847) usando astronomÃ­a posicional precisa.',
      'El matemÃ¡tico francÃ©s Jean-Baptiste Fourier (famoso por la Transformada de Fourier, herramienta fundamental en telecomunicaciones, procesamiento de seÃ±ales y compresiÃ³n de imÃ¡genes modernas) fue uno de los primeros cientÃ­ficos en analizar matemÃ¡ticamente el Zodiaco. Fourier habÃ­a acompaÃ±ado a NapoleÃ³n a Egipto como miembro de la expediciÃ³n cientÃ­fica.',
      'Gracias a estas matemÃ¡ticas celestes, hoy sabemos que los sacerdotes esculpieron un mapa estelar mÃ¡s preciso que muchos observatorios europeos mil aÃ±os despuÃ©s.',
    ],
    fact: 'La Transformada de Fourier, inventada por el mismo matemÃ¡tico que estudiÃ³ el Zodiaco de Dendera, es la base del formato JPEG, la compresiÃ³n MP3, el WiFi, la resonancia magnÃ©tica mÃ©dica y prÃ¡cticamente toda la tecnologÃ­a digital moderna. Â¡El estudio de un mapa estelar egipcio contribuyÃ³ a inventar el futuro!',
  },
  {
    id: 'criaturas',
    title: 'Criaturas del Cielo Egipcio',
    color: '#6B8E6B',
    btnImage: '/assets/egypt/infographic_dendera/btn_criaturas.png',
    image: '/assets/egypt/infographic_dendera/hero_criaturas.png',
    content: [
      'El cielo egipcio estaba poblado de criaturas que no aparecen en ningÃºn otro sistema astronÃ³mico del mundo. El HipopÃ³tamo Erguido (Reret o Taweret) es una de las mÃ¡s impresionantes: una hipopÃ³tama de pie sobre sus patas traseras, con cola de cocodrilo, garras de leÃ³n y pechos humanos. En el Zodiaco de Dendera, Reret sostiene un bastÃ³n y un cocodrilo atado.',
      'Reret corresponde aproximadamente a nuestra Osa Mayor, pero los egipcios veÃ­an una criatura protectora donde los griegos veÃ­an un oso y los mesopotÃ¡micos veÃ­an un carro. La "Pata de Buey" (Mesketiu) es la otra constelaciÃ³n circumpolar principal, visible toda la noche: corresponde a las siete estrellas mÃ¡s brillantes de la Osa Mayor formando la pata trasera de un toro.',
      'El cocodrilo Sobek aparece con la cola curvada hacia arriba. En los relojes estelares de las tumbas del Valle de los Reyes, Sobek sirve como marcador de la hora: su posiciÃ³n en el cielo indicaba el momento de la noche. Los sacerdotes observaban cuÃ¡ntas "estrellas de hora" habÃ­an cruzado el meridiano sobre una plomada.',
      'La cobra celestial (Wadjet/Uraeus) tambiÃ©n aparece en el Zodiaco, representando la constelaciÃ³n que los griegos llamaban Hydra. La cobra era el sÃ­mbolo del Bajo Egipto y aparecÃ­a en la corona del faraÃ³n como protecciÃ³n mÃ¡gica. En el cielo, la cobra protegÃ­a el disco solar nocturno durante su viaje por el Duat (inframundo).',
      'El astrÃ³nomo JosÃ© Lull (Universidad de Valencia) catalogÃ³ mÃ¡s de 100 figuras celestes diferentes en los techos astronÃ³micos de las tumbas egipcias, de las cuales solo unas 40 han sido identificadas con constelaciones modernas. El resto permanece como un misterio que los arqueoastrÃ³nomos intentan resolver comparando mÃºltiples fuentes.',
      'Este peculiar zoolÃ³gico estelar nos recuerda que cada civilizaciÃ³n proyectÃ³ sus propios mitos y animales sobre los mismos puntos de luz en la oscuridad.',
    ],
    fact: 'Taweret (el HipopÃ³tamo Erguido del cielo) era tambiÃ©n la diosa protectora del embarazo y el parto. Los amuletos de Taweret eran los mÃ¡s populares en el Egipto antiguo â€” se han encontrado miles en excavaciones. Una diosa hipopÃ³tama celestial protegiendo a las madres: Â¡la primera constelaciÃ³n "maternal" de la historia!',
  },
  {
    id: 'planetas',
    title: 'Los Dioses Errantes',
    color: '#E8A87C',
    btnImage: '/assets/egypt/infographic_dendera/btn_planetas.png',
    image: '/assets/egypt/infographic_dendera/hero_planetas.png',
    content: [
      'Los egipcios llamaban a los planetas "estrellas que no descansan" o "estrellas infatigables" porque, a diferencia de las estrellas fijas, se movÃ­an lentamente entre las constelaciones. En el Zodiaco de Dendera, los cinco planetas visibles aparecen representados con iconografÃ­a que fusiona tradiciones egipcias y griegas.',
      'Saturno aparece como Horus-Toro (Hor-ka-pet): un hombre con cabeza de halcÃ³n de pie sobre una barca divina. JÃºpiter es Horus-el-Misterioso (Hor-pest-djeba): un Ã¡guila sobre una serpiente. Marte es Horus-Rojo (Hor-Desher): un guerrero con cabeza de halcÃ³n sosteniendo un cetro was. Venus es la "Estrella de la MaÃ±ana" y Mercurio el "Planeta de Set".',
      'La identificaciÃ³n de los planetas con Horus (el dios halcÃ³n) es exclusivamente egipcia. Los griegos los asociaron con Zeus, Ares, Afrodita, Hermes y Cronos. Los babilonios con Marduk, Nergal, Ishtar, Nabu y Ninurta. La misma observaciÃ³n â€” cinco luces que se mueven entre las estrellas fijas â€” produjo sistemas mitolÃ³gicos completamente diferentes.',
      'Los astrÃ³nomos del templo de Dendera mantenÃ­an registros precisos de las posiciones planetarias. Estos registros eran esenciales para la astrologÃ­a (que en Egipto estaba fusionada con la medicina) pero tambiÃ©n produjeron datos astronÃ³micos de valor incalculable. Las tablas planetarias egipcias ayudaron a los astrÃ³nomos modernos a reconstruir las Ã³rbitas planetarias con mayor precisiÃ³n.',
      'La representaciÃ³n de Marte como "Horus Rojo" es especialmente reveladora: los egipcios observaron correctamente el color rojizo de Marte, que se debe al Ã³xido de hierro en su superficie. Esta observaciÃ³n, hecha a simple vista hace mÃ¡s de 2,000 aÃ±os, fue confirmada por las misiones robÃ³ticas de la NASA en el siglo XXI.',
      'Identificar el verdadero color de Marte y registrar meticulosamente sus Ã³rbitas demuestra que los sacerdotes eran tanto astrÃ³nomos observacionales como lÃ­deres religiosos.',
    ],
    fact: 'Los nombres de los dÃ­as de la semana en espaÃ±ol (Lunes=Luna, Martes=Marte, MiÃ©rcoles=Mercurio, Jueves=JÃºpiter, Viernes=Venus) vienen directamente de la asociaciÃ³n planetaria que los egipcios transmitieron a los griegos, los griegos a los romanos, y los romanos a nosotros. Â¡Cada semana usamos astronomÃ­a egipcia!',
  },
  {
    id: 'legado',
    title: 'El Viaje de 5,000 AÃ±os',
    color: '#9B8EC7',
    btnImage: '/assets/egypt/infographic_dendera/btn_legado.png',
    image: '/assets/egypt/infographic_dendera/hero_legado.png',
    content: [
      'El Zodiaco de Dendera nos cuenta una historia Ã©pica de cÃ³mo el conocimiento astronÃ³mico ha viajado a travÃ©s del tiempo y las culturas. Los mesopotamios de Babilonia (c. 3000 a.C.) observaron el cielo y crearon el zodÃ­aco de 12 constelaciones basÃ¡ndose en la franja del cielo por donde se mueven el Sol, la Luna y los planetas (la eclÃ­ptica).',
      'Los griegos adoptaron el zodÃ­aco babilÃ³nico y lo refinaron matemÃ¡ticamente. Hiparco de Nicea (c. 190-120 a.C.) creÃ³ el primer catÃ¡logo estelar preciso con la posiciÃ³n de 850 estrellas y descubriÃ³ la precesiÃ³n de los equinoccios. Cuando Alejandro Magno conquistÃ³ Egipto (332 a.C.), los griegos llevaron su astronomÃ­a al Nilo.',
      'Los egipcios fusionaron la astronomÃ­a griega con su propia tradiciÃ³n milenaria de Decanos (36 constelaciones estelares de 10 dÃ­as cada una) y crearon el Zodiaco de Dendera: una obra maestra de sÃ­ntesis cultural. El disco de piedra es la prueba fÃ­sica de que dos sistemas astronÃ³micos de miles de aÃ±os de antigÃ¼edad convergieron en un solo monumento.',
      'Este conocimiento llegÃ³ a Roma con la conquista de Egipto (30 a.C.). Los romanos lo transmitieron a toda Europa. Los astrÃ³logos Ã¡rabes medievales tradujeron y mejoraron los textos astronÃ³micos egipcios y griegos. El astrÃ³logo Ã¡rabe Abu Ma\'shar (787-886 d.C.) transmitiÃ³ los Decanos egipcios a la Europa medieval a travÃ©s de sus traducciones latinas.',
      'Hoy, cuando lees tu horÃ³scopo en el periÃ³dico, estÃ¡s viendo el Ãºltimo destello de este viaje de 5,000 aÃ±os. Los 12 signos zodiacales son los mismos que aparecen en el Zodiaco de Dendera, que a su vez los heredÃ³ de Babilonia. La astronomÃ­a moderna naciÃ³ de la astrologÃ­a antigua, y la astrologÃ­a antigua naciÃ³ de la observaciÃ³n paciente de pastores mesopotÃ¡micos que miraban el cielo nocturno.',
      'AsÃ­, este disco de piedra se convierte en el puente definitivo que conecta las observaciones milenarias de los desiertos antiguos con los mapas celestes de hoy.',
    ],
    fact: 'La palabra "zodiaco" viene del griego "zodiakos kyklos" (cÃ­rculo de animales). Pero en realidad, solo 7 de los 12 signos son animales (Aries, Tauro, CÃ¡ncer, Leo, Escorpio, Capricornio, Piscis). Los otros cinco son humanos (GÃ©minis, Virgo, Acuario, Sagitario) o un objeto (Libra). Â¡El "cÃ­rculo de animales" no es tan animal como su nombre sugiere!',
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                Dato CientÃ­fico
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
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
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
              ðŸ† Â¡Has descifrado todos los secretos del Zodiaco de Dendera!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de AstrÃ³logo Maestro
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ BibliografÃ­a â”€â”€â”€ */}
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
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
