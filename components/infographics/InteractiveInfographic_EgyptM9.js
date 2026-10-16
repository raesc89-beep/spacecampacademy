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
    "id": "disco-zodiacal",
    "bannerImage": "/assets/egypt/infographic_m9/banner_djer-primera-dinastia.webp",
    "title": "El Disco del Cielo",
    "color": "#D46A6A",
    "btnImage": "/assets/egypt/infographic_dendera/btn_disco.webp",
    "image": "/assets/egypt/infographic_dendera/hero_disco.webp",
    "content": [
      "El Zodiaco de Dendera representa una de las obras cumbres del arte y la astronomía del período greco-romano en el Antiguo Egipto. Esculpido en un bajorrelieve sobre una colosal losa de arenisca arenosa de dos metros y medio de lado, este bajorrelieve decoraba originalmente el techo de una capilla dedicada al dios Osiris en la terraza superior del Templo de Hathor. La obra ofrece una síntesis visual deslumbrante entre las tradiciones cosmológicas autóctonas del Nilo y la astronomía helenística.",
      "La composición del disco celeste es una proeza de equilibrio geométrico y dinamismo visual. El planisferio circular central está sostenido en el aire por doce figuras antropomorfas que personifican los pilares del cielo: cuatro diosas celestiales de pie en las cuatro esquinas cardinales y cuatro parejas de deidades con cabeza de halcón arrodilladas en los ejes intermedios. Juntas simbolizan los doce meses del año y las fuerzas cósmicas que impiden el colapso de la bóveda estrellada.",
      "A diferencia de las representaciones lineales de los techos astronómicos del Imperio Nuevo, como el de Senenmut, el Zodiaco de Dendera es una proyección polar plana que abarca la totalidad de la cúpula celeste visible. En una sola superficie circular continua, los escribas y astrónomos lograron integrar los doce signos del zodiaco babilónico-griego, los treinta y seis decanos tradicionales egipcios y las constelaciones boreales y australes propias de la religión faraónica.",
      "El disco no fue concebido como un simple mapa científico neutro, sino como una máquina teológica para la resurrección mística del dios Osiris. Según los misterios de Dendera, Osiris moría y renacía en sincronía con los ciclos de la Luna y las estrellas imperecederas. Las constelaciones actuaban como testigos sagrados que garantizaban la continuidad de la vida en la Tierra a través de la inundación anual del Nilo y el renacimiento cotidiano de la luz solar.",
      "La losa original de arenisca pesa más de dos toneladas métricas y mide doscientos cincuenta y cinco centímetros de anchura por doscientos cincuenta y tres centímetros de longitud, con un grosor medio de cincuenta centímetros. La finura de sus incisiones y el pulido exquisito de las figuras celestiales revelan la destreza de los escultores tolemaicos, capaces de esculpir detalles anatómicos diminutos en una roca arenisca relativamente quebradiza."
    ],
    "fact": "La losa de arenisca que conforma el Zodiaco de Dendera posee un peso de dos mil doscientas toneladas, con unas medidas de dos metros y medio de lado y un espesor de cincuenta centímetros, labrada originalmente en el techo de la capilla osiríaca hacia el año 50 a.C., sostenida por doce figuras celestes que encarnan los pilares cardinales del firmamento.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Zodiaco de Dendera es el único planisferio circular completo del mundo antiguo que ha llegado hasta nuestros días. Aunque civilizaciones como la babilónica y la griega desarrollaron descripciones matemáticas de las constelaciones, ninguna otra cultura plasmó una carta celeste redonda de estas dimensiones en piedra monumental."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Desde una perspectiva cartográfica rigurosa, el Zodiaco de Dendera es una proyección estereográfica polar cenital rudimentaria. En ella, el polo norte celeste se sitúa cerca del centro geométrico del bajorrelieve, mientras que las constelaciones zodiacales de la eclíptica se distribuyen en una banda espiralada concéntrica."
      }
    ]
  },
  {
    "id": "constelaciones",
    "bannerImage": "/assets/egypt/infographic_m9/banner_fin-egipto.webp",
    "title": "Las 12 + las Egipcias",
    "color": "#7EB8C9",
    "btnImage": "/assets/egypt/infographic_dendera/btn_constelaciones.webp",
    "image": "/assets/egypt/infographic_dendera/hero_constelaciones.webp",
    "content": [
      "El elemento más revolucionario del Zodiaco de Dendera es la coexistencia armónica de dos sistemas astronómicos totalmente distintos en una misma superficie: el catálogo zodiacal mesopotámico-griego de doce figuras y el sistema de constelaciones indígenas del valle del Nilo. Esta fusión cultural refleja la atmósfera cosmopolita del Egipto ptolemaico, donde sacerdotes nativos y filósofos griegos de Alejandría intercambiaban activamente conocimientos científicos.",
      "Los doce signos zodiacales que hoy nos resultan familiares aparecen claramente esculpidos en una espiral que serpentea por el disco: Aries el carnero, Tauro el toro con el disco lunar entre los cuernos, Géminis los gemelos celestiales, Cáncer representado como un escarabajo sagrado (Jepri) en lugar de un cangrejo marino, Leo el león majestuoso sobre una barca, y Virgo la doncella sosteniendo una espiga de trigo que simboliza la estrella Spica.",
      "A continuación figuran Libra la balanza de dos platillos perfectamente nivelada, Escorpio el escorpión gigante, Sagitario personificado como un centauro alado con dos caras y doble cola de escorpión disparando un arco, Capricornio representado como una cabra con cola de pez, Acuario como el dios Hapi derramando dos jarras de agua viva del Nilo, y Piscis como dos peces simétricos unidos por un cordel estelar.",
      "Entre estos signos helenísticos se intercalan las constelaciones genuinamente egipcias que ya aparecían en tumbas de hace mil quinientos años. En el centro exacto del mapa reina Meskhetiu, la pierna de toro que personifica la Osa Mayor, vigilada de cerca por la diosa Tueris con su figura híbrida de hipopótamo hembra, cocodrilo y patas de león. Hacia el sur destaca Sah (Orión) empuñando el cetro uas y Sopdet (Sirio) recostada en una barca divina.",
      "Esta superposición de iconografías permitía a los sacerdotes de Hathor leer el cielo en dos lenguajes paralelos. Podían calcular la posición del Sol en los signos zodiacales para la astrología horaria helenística y, al mismo tiempo, seguir el cómputo litúrgico de las horas nocturnas mediante el ascenso de los treinta y seis decanos que orlan todo el perímetro exterior de la rueda celeste."
    ],
    "fact": "El disco de Dendera contiene sesenta y ocho figuras celestiales identificables, combinando los doce signos del zodiaco de origen babilónico con treinta y seis decanos nilóticos y veinte constelaciones propias de la tradición litúrgica faraónica del Reino Antiguo, ofreciendo un testimonio único de síntesis astronómica entre Oriente Próximo y el valle del Nilo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Zodiaco de Dendera, el signo de Cáncer no fue esculpido como un crustáceo griego, sino como el escarabajo sagrado Jepri. Los sacerdotes egipcios consideraban que cuando el Sol alcanzaba el solsticio de verano en esa constelación, empujaba la luz del mismo modo que el escarabajo hace rodar su bola de alimento regenerador."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La banda zodiacal o eclíptica está inclinada aproximadamente veintitrés coma cinco grados respecto al ecuador celeste. En el bajorrelieve de Dendera, los escultores curvaron deliberadamente la secuencia de las doce constelaciones zodiacales para imitar la trayectoria senoidal aparente que traza el Sol a lo largo del año trópico."
      }
    ]
  },
  {
    "id": "templo-hathor",
    "bannerImage": "/assets/egypt/infographic_m9/banner_menes-narmer.webp",
    "title": "El Templo de Hathor",
    "color": "#C9A96E",
    "btnImage": "/assets/egypt/infographic_dendera/btn_templo.webp",
    "image": "/assets/egypt/infographic_dendera/hero_templo.webp",
    "content": [
      "El Templo de Hathor en Dendera, situado a unos sesenta kilómetros al norte de Luxor en la orilla occidental del Nilo, es uno de los complejos arquitectónicos mejor conservados de todo Egipto. Aunque el lugar albergaba santuarios desde el Reino Antiguo bajo el reinado de Pepi I, el edificio colosal que podemos contemplar hoy fue erigido durante los reinados de los últimos faraones ptolemaicos, destacando Cleopatra VII Filopátor, y concluido bajo los emperadores romanos Tiberio y Nerón.",
      "La arquitectura del templo está consagrada por entero al culto de Hathor, diosa del cielo, el amor, la danza y la fertilidad cósmica. La imponente fachada de la sala hipóstila exterior o pronaos se abre mediante veinticuatro columnas monumentales rematadas por capiteles cuadrifrontes que muestran el rostro sereno de la diosa con orejas de vaca. El techo de esta sala conserva una policromía original intacta de azules de malaquita y amarillos que recrea el viaje diurno y nocturno del Sol.",
      "En la azotea del templo se construyeron dos complejos de capillas consagradas a los misterios de la resurrección de Osiris. Era precisamente en la cámara central del santuario oriental de Osiris donde se encontraba empotrado el bajorrelieve del Zodiaco circular como techo sagrado. En estas estancias elevadas, expuestas al cielo abierto, los sacerdotes realizaban en el mes de Khoiak el ritual de regeneración donde la efigie de Osiris era expuesta a los rayos solares para renacer.",
      "Todo el templo de Hathor fue concebido como un microcosmos de piedra que encarnaba la estructura del universo físico. Los muros exteriores están decorados con relieves gigantescos que muestran a Cleopatra VII y a su hijo Cesarión (Ptolomeo XV) realizando ofrendas a las divinidades patronas. El templo se comunicaba además con una red de criptas subterráneas secretas talladas en el grosor de los muros, donde se guardaban los instrumentos rituales y las cartas estelares en papiro.",
      "La conservación excepcional de Dendera se debe a que el templo permaneció sepultado bajo toneladas de arena del desierto y escombros de adobe hasta mediados del siglo diecinueve. Cuando el arqueólogo francés Auguste Mariette emprendió las excavaciones sistemáticas del complejo en 1860, el templo emergió de las arenas prácticamente intacto, con sus escaleras de caracol procesionales, sus capillas de azotea y sus inscripciones astronómicas en un estado prístino."
    ],
    "fact": "El complejo de Dendera abarca un recinto amurallado de ladrillo de adobe de cuarenta mil metros cuadrados con muros de diez metros de espesor, albergando en su interior el Templo de Hathor con un pronaos de veintiséis metros de altura y veinticuatro columnas hathóricas colosales, siendo uno de los santuarios mejor conservados de todo el Egipto grecorromano.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los muros de las criptas subterráneas de Dendera se encuentran los famosos relieves de las «bombillas de Dendera», que arqueólogos serios han demostrado que representan en realidad serpientes sagradas naciendo de flores de loto cósmicas dentro de cápsulas de protección ritual conocidas como djed."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El eje longitudinal del templo de Dendera está orientado a setenta y un grados al este del norte astronómico. Esta orientación no mira hacia el amanecer solar, sino hacia el orto helíaco de la estrella Sirio (Sopdet) en el momento de su fundación ceremonial, vinculando el templo con la crecida vivificante del Nilo."
      }
    ]
  },
  {
    "id": "robo-louvre",
    "bannerImage": "/assets/egypt/infographic_m9/banner_periodo-tardio.webp",
    "title": "El Robo del Zodiaco",
    "color": "#8B6B8B",
    "btnImage": "/assets/egypt/infographic_dendera/btn_louvre.webp",
    "image": "/assets/egypt/infographic_dendera/hero_louvre.webp",
    "content": [
      "La historia de la extracción del Zodiaco de Dendera y su posterior traslado a Francia es uno de los episodios más dramáticos y controvertidos de la arqueología del siglo diecinueve. Durante la expedición militar y científica de Napoleón Bonaparte a Egipto en 1798, el dibujante e ingeniero Dominique Vivant Denon quedó fascinado por el bajorrelieve de la capilla de Osiris, publicando grabados minuciosos en su célebre obra «Voyage dans la Basse et la Haute Égypte» que cautivaron a toda Europa.",
      "Años después, en 1820, el aristócrata francés Sébastien Louis Saulnier y el maestro de obras Jean Baptiste Lelorrain concibieron un plan clandestino para apoderarse físicamente del bajorrelieve y venderlo en París. Lelorrain viajó en secreto a Dendera provisto de sierras mecánicas, gatos de tracción, palancas de hierro y varios barriles de pólvora negra. Trabajando en la penumbra de la azotea del templo, los operarios serraron las vigas maestras del techo y utilizaron explosiones controladas.",
      "La detonación de pólvora fracturó la losa de arenisca en dos grandes fragmentos, desprendiéndola violentamente del techo de la capilla y causando daños irreparables en los muros colindantes del santuario ptolemaico. Lelorrain y su cuadrilla arrastraron los pesados bloques de dos toneladas y media sobre rodillos de madera a través del desierto hasta el Nilo, donde los embarcaron en una falúa burlando la vigilancia de los diplomáticos británicos y las autoridades otomanas locales.",
      "Tras una azarosa navegación por el Mediterráneo, el Zodiaco llegó al puerto de Marsella en 1821 y fue trasladado triunfalmente a París. En 1822, el rey Luis XVIII de Francia compró la pieza arqueológica para las colecciones estatales por la colosal suma de ciento cincuenta mil francos de oro de la época. El bajorrelieve fue exhibido primero en la Biblioteca Real y finalmente trasladado en 1919 al Museo del Louvre, donde permanece expuesto en la sala de antigüedades egipcias.",
      "En la actualidad, en el techo original de la capilla de Osiris en Dendera se exhibe una réplica exacta de escayola tintada colocada a principios del siglo veinte. En las últimas décadas, el gobierno de Egipto y destacados arqueólogos como el doctor Zahi Hawass han solicitado formalmente la restitución del Zodiaco original a su ubicación histórica en Dendera, considerándolo un tesoro expoliado ilícitamente que pertenece a la memoria cultural del pueblo egipcio."
    ],
    "fact": "El Zodiaco de Dendera fue arrancado con dinamita y sierras en abril de 1821 por Lelorrain y adquirido en 1822 por el rey Luis XVIII por ciento cincuenta mil francos de oro, exhibiéndose hoy en la Sala 321 del Departamento de Antigüedades Egipcias del Museo del Louvre, mientras que una réplica exacta de yeso ocupa su emplazamiento original en el templo de Egipto.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para disimular el enorme peso del bajorrelieve durante el viaje marítimo de regreso a Francia, Lelorrain camufló los cajones de madera etiquetándolos como «piedras de lastre y especímenes geológicos sin valor», impidiendo que los cónsules británicos en Alejandría confiscaran el cargamento de contrabando."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El impacto de la onda de choque generada por la pólvora negra en 1821 provocó microfisuras por tensión en la matriz de arenisca del bajorrelieve. Estudios de tomografía por ultrasonidos realizados en el Louvre revelaron fisuras internas que requirieron la inyección de consolidantes de silicato de etilo."
      }
    ]
  },
  {
    "id": "datacion",
    "bannerImage": "/assets/egypt/infographic_m9/banner_ramseses-ii.webp",
    "title": "Fotografía del Cielo del 50 a.C.",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic_dendera/btn_datacion.webp",
    "image": "/assets/egypt/infographic_dendera/hero_datacion.webp",
    "content": [
      "Tras la llegada del Zodiaco de Dendera a París en 1821, la pieza desató una feroz controversia científica y teológica que sacudió los cimientos intelectuales de la Europa decimonónica. Algunos científicos de la Ilustración y pensadores anticlericales afirmaban que el zodiaco egipcio tenía más de quince mil años de antigüedad, lo que contradecía de forma directa la cronología bíblica de la Creación y el Diluvio Universal calculada tradicionalmente por la Iglesia.",
      "El enigma comenzó a resolverse de manera irrefutable gracias a Jean-François Champollion, el descifrador de la Piedra de Rosetta. En 1822, Champollion examinó minuciosamente las inscripciones jeroglíficas que enmarcan el disco y logró identificar el cartucho real con el título griego de «Autokrator», un epíteto imperial romano atribuido a emperadores como Augusto o Tiberio. Esto demostró que el templo no databa de la prehistoria, sino de las postrimerías del mundo faraónico.",
      "Sin embargo, el espaldarazo definitivo a la cronología del monumento provino de la astronomía computacional moderna. Los arqueoastrónomos descubrieron que el bajorrelieve de Dendera no es una alegoría mitológica atemporal, sino una auténtica fotografía instantánea del firmamento nocturno, un registro astronómico de eclipses reales y conjunciones planetarias acaecidas a mediados del siglo primero antes de nuestra era sobre el cielo de Egipto.",
      "En el disco aparecen grabados con exactitud dos fenómenos celestes extraordinarios. El primero es un eclipse total de Luna representado en la constelación de Piscis mediante un círculo que encierra el ojo de Horus (Udyat), correspondiente con exactitud al eclipse lunar observado en Dendera el veinticinco de septiembre del año cincuenta y dos antes de Cristo. El segundo es un eclipse solar reflejado en la diosa Isis sosteniendo un babuino, acaecido el siete de marzo del cincuenta y uno antes de Cristo.",
      "Cálculos astrofísicos retrospectivos ejecutados con programas de simulación orbital contemporáneos confirmaron que las posiciones de los cinco planetas visibles en el disco respecto a las constelaciones de fondo corresponden a una configuración celeste real observable entre los años cincuenta y cuarenta y siete antes de nuestra era, durante el reinado conjunto de la legendaria reina Cleopatra VII y su hermano Ptolomeo XIII."
    ],
    "fact": "Los cálculos arqueoastronómicos confirman que el Zodiaco de Dendera registra dos eclipses empíricos consecutivos: el eclipse lunar del 25 de septiembre del 52 a.C. y el eclipse solar del 7 de marzo del 51 a.C., situando su concepción en el reinado de Cleopatra VII, confirmando la minuciosidad de las observaciones celestes de los sacerdotes ptolemaicos.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El matemático y físico francés Jean-Baptiste Biot dedicó años a calcular las efemérides astronómicas del Zodiaco de Dendera. Sus deducciones demostraron por primera vez que la astronomía matemática moderna podía utilizarse como una herramienta infalible para fechar monumentos históricos sin depender de crónicas escritas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El eclipse solar del siete de marzo del 51 a.C. registrado en el disco fue un eclipse anular cuya franja de sombra central cruzó el Alto Egipto a las doce horas y treinta y cuatro minutos de tiempo solar local, cubriendo más del noventa por ciento del disco solar visible desde el santuario de Dendera."
      }
    ]
  },
  {
    "id": "criaturas",
    "bannerImage": "/assets/egypt/infographic_m9/banner_reino-antiguo.webp",
    "title": "Criaturas del Cielo Egipcio",
    "color": "#6B8E6B",
    "btnImage": "/assets/egypt/infographic_dendera/btn_criaturas.webp",
    "image": "/assets/egypt/infographic_dendera/hero_criaturas.webp",
    "content": [
      "El bestiario celeste esculpido en el Zodiaco de Dendera ofrece una fascinante ventana a la zoología sagrada y al imaginario mitológico del valle del Nilo. Para los antiguos egipcios, los animales de su entorno ribereño no eran meros seres biológicos, sino vehículos vivientes de principios cósmicos fundamentales. Al proyectar estas criaturas sobre las estrellas, dotaban al firmamento nocturno de un orden ecológico y moral que gobernaba los destinos humanos.",
      "Entre las figuras más singulares destaca la diosa Tueris, el hipopótamo preñado erguido sobre sus patas traseras. En Dendera, esta deidad aparece coronada con una piel de cocodrilo sobre su espalda y sosteniendo en sus garras delanteras la pata trasera de toro que personifica a la Osa Mayor. El hipopótamo hembra encarnaba la ferocidad protectora materna, capaz de defender a sus crías y a los dioses solares de las embestidas caóticas de las tinieblas primordiales.",
      "Otra criatura enigmática es el pez oxirrinco, esculpido en estrecha proximidad a la constelación de Piscis. En la teología osiríaca, el oxirrinco era un pez mormírido del Nilo que había tragado el falo sagrado de Osiris tras ser descuartizado por Seth. Su presencia estelar garantizaba que ningún elemento vital del dios quedara olvidado en el abismo acuático del Nun, asegurando la restauración integral del cuerpo divino en el cielo.",
      "Asimismo, encontramos halcones coronados que vigilan los cuadrantes del disco, un león celestial que camina victorioso sobre una serpiente del inframundo, carneros de cuatro cuernos que personifican los cuatro vientos cardinales y gacelas del desierto asociadas a estrellas menores. Cada animal aportaba su atributo instintivo —la velocidad del halcón, la fuerza del león, la visión nocturna del escorpión— a la compleja danza de los cuerpos celestes.",
      "Los escribas que diseñaron estas efigies tallaron cada escama de cocodrilo, cada pluma de halcón y cada vellón de carnero con un naturalismo sorprendente. La coexistencia de este bestiario nativo junto a las figuras mitológicas grecorromanas, como el centauro y los gemelos, convirtió al bajorrelieve de Dendera en el documento iconográfico más exuberante de la antigüedad tardía mediterránea."
    ],
    "fact": "El bestiario de Dendera comprende más de veinticinco especies animales sagradas diferentes esculpidas en el planisferio, incluyendo hipopótamos, halcones, leones, carneros, vacas hathóricas, escorpiones, serpientes y tres especies ictiológicas autóctonas del río Nilo, cada una portando atributos mitológicos precisos vinculados al movimiento estelar.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El pez oxirrinco del Nilo (Mormyrus kannume) produce campos eléctricos débiles mediante un órgano especializado en su cola para orientarse en aguas turbias. Los antiguos egipcios percibían intuitivamente esta habilidad sensorial extraordinaria, considerándolo un pez sagrado provisto de facultades adivinatorias."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La distribución de los animales en el bajorrelieve respeta una estricta jerarquía polar: los mamíferos pesados (hipopótamo, león, toro) ocupan las regiones interiores de baja velocidad aparente, mientras que las aves veloces y los peces acuáticos ocupan los márgenes exteriores de mayor desplazamiento angular."
      }
    ]
  },
  {
    "id": "planetas",
    "bannerImage": "/assets/egypt/infographic_m9/banner_reino-medio.webp",
    "title": "Los Dioses Errantes",
    "color": "#E8A87C",
    "btnImage": "/assets/egypt/infographic_dendera/btn_planetas.webp",
    "image": "/assets/egypt/infographic_dendera/hero_planetas.webp",
    "content": [
      "En el Zodiaco de Dendera, los cinco planetas clásicos visibles a simple vista ocupan un lugar protagonista dentro de la estructura celeste. Conocidos en el mundo griego como «planētes» (errantes) y en Egipto como estrellas que no reposan jamás, estos astros no están dispuestos de manera arbitraria o decorativa, sino situados en posiciones astrológicas exactas conocidas en la literatura astronómica helenística como sus casas de «exaltación» o hypsoma.",
      "El planeta Venus figura bajo el nombre jeroglífico de «la estrella de la mañana» o Neter-duau, personificado por una figura antropomorfa con dos cabezas que mira simultáneamente hacia el este y el oeste, reflejando su doble condición de lucero matutino y vespertino. En el relieve, Venus se encuentra esculpido en el signo de Piscis, que es exactamente el lugar astronómico de su máxima exaltación astrológica según el sistema de Claudio Ptolomeo.",
      "Marte, el planeta rojo, está representado como «Horus el rojo» (Hor-desher) bajo la forma de un halcón divino que navega sobre una barca sagrada en la constelación de Capricornio, su lugar canónico de exaltación. Júpiter, identificado como «Horus que desvela los misterios» (Hor-peshesh-taui), aparece esculpido junto al signo de Cáncer, donde la tradición astrológica helenística situaba su mayor influjo benéfico sobre los gobernantes terrenales.",
      "Saturno figura bajo la designación de «Horus, el toro del cielo» (Hor-ka-pet), representado como un sacerdote con cabeza de halcón coronado por el disco solar, situado en la constelación de Libra, su signo de exaltación. Por último, Mercurio aparece personificado como el dios Thoth o el «dios de Sebau», dotado de cabeza de ibis o chacal y ubicado cerca de Virgo, donde la astronomía grecorromana fijaba su punto de mayor dignidad zodiacal.",
      "La disposición simultánea de todos los planetas en sus signos de exaltación convierte al Zodiaco de Dendera en un «thema mundi» o carta natal cósmica idealizada. Este esquema teórico representaba el estado del universo en el momento sagrado de la Creación primordial o zep tepi, garantizando que el templo de Hathor fuera un catalizador permanente de orden y armonía universal contra el caos circundante."
    ],
    "fact": "Los cinco planetas visibles conocidos en la antigüedad están grabados en el disco de Dendera en sus puntos astronómicos canónicos de máxima exaltación: Venus en Piscis, Júpiter en Cáncer, Mercurio en Virgo, Saturno en Libra y Marte en Capricornio, reflejando las coordenadas astrológicas de mayor influencia en la bóveda celeste según la doctrina alejandrina.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La representación béfala de Venus en Dendera es la formulación iconográfica más ingeniosa de la antigüedad para resolver el dilema de si el lucero del alba (Eósforo) y la estrella del atardecer (Héspero) eran el mismo astro o dos deidades independientes en el firmamento, unificando ambas apariciones celestes bajo la figura del dios Tioumoutiri con dos cabezas opuestas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El concepto astronómico de «exaltación planetaria» se fundamenta en posiciones longitudinales donde la luminosidad aparente y la visibilidad de un planeta coinciden con las estaciones cardinales terrestres. Por ejemplo, Marte alcanza su máximo brillo en oposición durante su perihelio en el hemisferio sur celeste."
      }
    ]
  },
  {
    "id": "legado",
    "bannerImage": "/assets/egypt/infographic_m9/banner_reino-nuevo.webp",
    "title": "El Viaje de 5,000 Años",
    "color": "#9B8EC7",
    "btnImage": "/assets/egypt/infographic_dendera/btn_legado.webp",
    "image": "/assets/egypt/infographic_dendera/hero_legado.webp",
    "content": [
      "El Zodiaco de Dendera corona un viaje intelectual de cinco milenios de observación estelar en el noreste de África. Desde los alineamientos megalíticos prehistóricos de Nabta Playa en el desierto sahariano hasta los tratados astronómicos de la Biblioteca de Alejandría, la civilización del Nilo persiguió sin descanso descifrar las leyes matemáticas que gobernaban el cielo para aplicarlas al bienestar de la sociedad terrenal.",
      "Como encrucijada cultural definitiva, Dendera sintetizó tres grandes corrientes del pensamiento antiguo: la cosmología religiosa y el cómputo decánico del Egipto faraónico, las tablas matemáticas de posiciones planetarias de Mesopotamia y la geometría esférica desarrollada por los filósofos y astrónomos griegos. Esta amalgama sirvió de puente conceptual para la astronomía medieval árabe y, en última instancia, para el Renacimiento europeo.",
      "En la historia de la ciencia moderna, el debate generado por el Zodiaco en el París del siglo diecinueve aceleró de manera decisiva la profesionalización de la arqueoastronomía y el refinamiento de los métodos filológicos de traducción jeroglífica. Obligó a los científicos a desarrollar modelos matemáticos capaces de calcular retrocesos orbitales de miles de años, inaugurando el uso sistemático de la astrofísica en la datación histórica de yacimientos.",
      "Hoy en día, el bajorrelieve original conservado en el Museo del Louvre y su réplica emplazada en el Templo de Hathor continúan cautivando a cientos de miles de escolares, científicos y amantes del arte de todo el mundo. La imagen del disco celeste suspendido por deidades y poblado por constelaciones familiares recuerda que la necesidad de mirar hacia arriba y cartografiar las estrellas es una pulsión universal inherente a la condición humana.",
      "El legado del Zodiaco de Dendera pervive no solo en los museos de historia, sino en cada carta celeste y en cada aplicación astronómica digital que consultamos en nuestros dispositivos móviles. Aquellos signos que los escultores tolemaicos grabaron con cinceles de bronce en la arenisca de Dendera hace dos mil años son los mismos símbolos que hoy nos orientan cuando alzamos los ojos hacia el manto infinito del universo nocturno."
    ],
    "fact": "El Zodiaco de Dendera integra una tradición astronómica ininterrumpida que abarca desde los alineamientos megalíticos de Nabta Playa del 4500 a.C. hasta su plasmación monumental en el 50 a.C., constituyendo el eslabón final entre la astronomía faraónica y la ciencia alejandrina, legando a la civilización contemporánea la matriz geométrica del mapa del cielo nocturno.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los símbolos gráficos utilizados hoy en día en astronomía y astrología para representar a los planetas y constelaciones (como el tridente de Neptuno o los cuernos de Aries) derivan directamente de abreviaturas taquigráficas bizantinas basadas en los glifos greco-egipcios de manuscritos alejandrinos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad angular del fenómeno de precesión axial de la Tierra (veintiséis mil años por ciclo completo) ha desplazado las constelaciones zodiacales casi treinta grados respecto a los meses calendáricos desde que se esculpió Dendera en el 50 a.C., fenómeno verificable al comparar el disco con el cielo real actual."
      }
    ]
  }
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

                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
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
