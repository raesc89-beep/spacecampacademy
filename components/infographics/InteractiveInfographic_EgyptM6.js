'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#7EC8E3', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      <path d="M10 24 Q40 0 70 24 Q40 48 10 24Z" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="24" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.7" />
      <path d="M40 32 Q35 42 28 46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="22" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoScarab({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="14" r="10" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="36" rx="12" ry="16" fill={color} opacity="0.3" />
      <path d="M18 30 Q2 18 6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 Q58 18 54 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="6" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="8" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="52" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      <polygon points="40,4 72,52 8,52" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="56,8 80,52 40,52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="2" r="2" fill={color} opacity="0.8" />
      <circle cx="56" cy="6" r="1.5" fill={color} opacity="0.6" />
      <circle cx="48" cy="0" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C4A7E7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {[{x:30,y:10,r:3},{x:15,y:25,r:2},{x:45,y:20,r:2.5},{x:20,y:45,r:2},{x:40,y:42,r:3},{x:30,y:30,r:4},{x:10,y:12,r:1.5},{x:50,y:48,r:1.5}].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={color} opacity={0.6} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={color} opacity={0.1} />
        </g>
      ))}
    </svg>
  );
}

function DecoCelestialMap({ size = 80, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      {/* Outer ring - celestial dome */}
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Dividing line - north/south */}
      <line x1="6" y1="40" x2="74" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Constellation dots */}
      {[{x:25,y:20},{x:35,y:15},{x:45,y:18},{x:55,y:22},{x:30,y:28},{x:50,y:30}].map((p,i) => (
        <circle key={`n${i}`} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.6" />
      ))}
      {/* Constellation lines */}
      <polyline points="25,20 35,15 45,18 55,22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <polyline points="30,28 35,15" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Planet boats in south */}
      {[20, 35, 50, 62].map((x, i) => (
        <g key={`p${i}`}>
          <path d={`M${x-5},55 Q${x},50 ${x+5},55`} fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx={x} cy={52} r="1.5" fill={color} opacity="0.5" />
        </g>
      ))}
      {/* Decan markers in south */}
      {[15, 25, 35, 45, 55, 65].map((x, i) => (
        <rect key={`d${i}`} x={x-1} y={64} width="2" height="5" rx="0.5" fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoSolarBoat({ size = 80, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Boat hull */}
      <path d="M10 30 Q15 18 40 16 Q65 18 70 30 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Curved prow */}
      <path d="M10 30 Q5 25 8 18 Q10 14 14 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Curved stern */}
      <path d="M70 30 Q75 25 72 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sun disk on the boat */}
      <circle cx="40" cy="10" r="7" fill={color} opacity="0.4" />
      <circle cx="40" cy="10" r="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + 11 * Math.cos(rad);
        const y1 = 10 + 11 * Math.sin(rad);
        const x2 = 40 + 14 * Math.cos(rad);
        const y2 = 10 + 14 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoHieroglyphColumn({ size = 40, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size * 3} viewBox="0 0 30 90" style={{ opacity: 0.15, ...style }}>
      {/* Cartouche border */}
      <rect x="4" y="2" width="22" height="86" rx="11" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Abstract glyphs */}
      <circle cx="15" cy="14" r="5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.4" />
      <path d="M10 28 L20 28 L15 22 Z" fill={color} opacity="0.3" />
      <line x1="10" y1="36" x2="20" y2="36" stroke={color} strokeWidth="1" />
      <path d="M10 44 Q15 38 20 44 Q15 50 10 44Z" fill="none" stroke={color} strokeWidth="1" />
      <rect x="10" y="56" width="10" height="6" rx="1" fill={color} opacity="0.3" />
      <path d="M12 68 L18 68 L18 76 L12 76 Z" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="72" r="2" fill={color} opacity="0.3" />
      <line x1="10" y1="82" x2="20" y2="82" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'senenmut': [DecoCelestialMap, DecoAnkh, DecoPyramid],
  'techo-astronomico': [DecoCelestialMap, DecoStarCluster, DecoSolarBoat],'planetas-barcas': [DecoSolarBoat, DecoCelestialMap, DecoStarCluster],'constelaciones': [DecoStarCluster, DecoEye, DecoCelestialMap],'decanos': [DecoStarCluster, DecoScarab, DecoAnkh],
  'hatshepsut': [DecoAnkh, DecoPyramid, DecoHieroglyphColumn],'ciencia-moderna': [DecoCelestialMap, DecoEye, DecoStarCluster],'legado-cosmos': [DecoStarCluster, DecoAnkh, DecoCelestialMap],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lull, J. & Belmonte, J.A. (2006). A firmament above Thebes, Journal for the History of Astronomy, 37',
  'Dorman, P.F. (1988). The Monuments of Senenmut, Kegan Paul',
  'Neugebauer, O. & Parker, R. (1969). Egyptian Astronomical Texts, Brown University Press',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. 2: Calendars, Clocks, and Astronomy',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "senenmut",
    diagramImage: '/assets/egypt/infographic_m6/diagram_senenmut.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Senenmut: El Genio',
    "bannerImage": "/assets/egypt/infographic_m6/banner_canopes.webp",
    "title": "Senenmut: El Genio",
    "color": "#9B6BFF",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_senenmut.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_senenmut.webp",
    "content": [
      "Senenmut fue el arquitecto supremo y consejero de mayor confianza durante el reinado de la reina Hatshepsut en la Dinastía XVIII, cerca del año 1473 antes de nuestra era. Aunque procedía de una familia humilde en Hermonthis, su extraordinario talento para las matemáticas y la administración le permitió acumular más de ochenta títulos oficiales en la corte de Tebas. Su proyecto más emblemático fue el templo funerario de Djeser-Djeseru en Deir el-Bahari, una obra maestra de terrazas escalonadas perfectamente integrada en los acantilados de piedra caliza.",
      "Más allá de sus logros en la arquitectura monumental, Senenmut poseía un profundo conocimiento de los movimientos celestes y los ciclos estelares. En su tumba no decorada para el enterramiento público, catalogada como TT 353 y situada justo debajo de la primera terraza del templo de Hatshepsut, mandó grabar en una cámara subterránea el plano celeste más antiguo que la arqueología moderna ha podido registrar íntegro. Este mapa no era un simple adorno místico, sino una compilación técnica de observaciones acumuladas durante siglos.",
      "Los escribas que trabajaron bajo su supervisión trazaron diagramas celestes sobre la roca viva pulida, utilizando cuadrículas rojas para mantener proporciones milimétricas antes de aplicar la tinta negra definitiva. Senenmut quiso que su última morada fuera un reflejo directo del orden cósmico o Maat, donde el difunto pudiera orientarse entre las estrellas imperecederas tras la muerte física. Su tumba TT 353 desciende casi sesenta metros en la montaña tebana mediante galerías talladas con ángulos de inclinación muy rigurosos.",
      "La relación de Senenmut con la familia real fue tan cercana que se le concedió la tutoría exclusiva de la princesa Neferure, heredera directa de Hatshepsut. Diversas esculturas cúbicas conservadas en el Museo Egipcio de El Cairo lo muestran envolviendo a la pequeña princesa con su manto sacerdotal, un honor sin precedentes para un cortesano que no pertenecía a la estirpe real. Su estatus privilegiado le dio acceso directo a los archivos secretos de los templos de Karnak y Heliópolis, donde residían los textos astronómicos.",
      "El destino final de este polímata egipcio sigue siendo motivo de debate entre los egiptólogos contemporáneos. Hacia el final del reinado de Hatshepsut, sus monumentos sufrieron ataques deliberados y su sarcófago de cuarcita roja fue despedazado, lo que sugiere una caída política antes del ascenso en solitario de Tutmosis III. A pesar de esa damnatio memoriae parcial, su techo astronómico sobrevivió en la oscuridad subterránea para convertirse en el documento estelar más valioso del segundo milenio antes de Cristo."
    ],
    "fact": "La cámara astronómica de la tumba TT 353 posee unas dimensiones de siete metros de longitud por tres metros de ancho, con una orientación de su eje principal alineada a noventa y un grados con respecto al norte geográfico, lo que permitía una sincronización simbólica con el orto solar en las fechas clave del calendario nilótico.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La tumba TT 353 de Senenmut fue descubierta en el año 1927 por la expedición arqueológica del Museo Metropolitano de Arte de Nueva York, dirigida por Herbert Winlock. Los excavadores encontraron la cámara funeraria a más de noventa metros de profundidad lineal dentro de la roca caliza tebana, intacta en sus pinturas pero desprovista de momia, lo que indica que el arquitecto jamás llegó a descansar en ese hipogeo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El yeso empleado como base para las pinturas del techo astronómico de Senenmut es sulfato de calcio dihidratado purificado mediante calcinación controlada a ciento cincuenta grados Celsius. Sobre esta capa se aplicaron pigmentos minerales estables: carbón vegetal finamente molido para el negro de humo y hematita hidratada para los trazos preliminares de alineación astronómica."
      }
    ]
  },
  {
    "id": "techo-astronomico",
    diagramImage: '/assets/egypt/infographic_m6/diagram_techo-astronomico.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Techo del Cielo',
    "bannerImage": "/assets/egypt/infographic_m6/banner_cerebro-extraccion.webp",
    "title": "El Techo del Cielo",
    "color": "#4A90D9",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_techo.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_techo.webp",
    "content": [
      "El techo astronómico de la tumba TT 353 de Senenmut representa la cúspide del conocimiento cosmológico del Imperio Nuevo egipcio. Esta obra magistral divide la bóveda celeste en dos paneles rectangulares perfectamente equilibrados, correspondientes al hemisferio norte y al hemisferio sur. En lugar de ofrecer una pintura puramente artística, el techo funciona como un mapa estelar esquemático y un instrumento cronográfico diseñado para regular los rituales nocturnos del templo y calcular las horas de oscuridad.",
      "El panel norte está dominado por las constelaciones circumpolares, conocidas por los egipcios como las «estrellas que nunca mueren» o Ikhemu-sek, ya que jamás descendían por debajo del horizonte visible de Tebas. En el centro exacto de este cuadrante destaca la figura imponente de Meskhetiu, identificada con la pierna delantera de un toro y correspondiente al asterismo actual de la Osa Mayor. Alrededor de ella aparecen figuras mitológicas asociadas con deidades guardianas que controlaban el equilibrio estelar nocturno.",
      "En contraste directo, el panel sur está consagrado a los treinta y seis decanos y al recorrido de los cuerpos celestes a lo largo del año nilótico. Aquí se representan con gran nitidez la constelación de Sah, que personifica a la figura de Orión como guardián de las almas, y la estrella Sopdet, conocida en la astronomía moderna como Sirio. Ambas entidades celestes navegan sobre barcas de papiro orientadas de este a oeste, reflejando el movimiento aparente de los astros causado por la rotación del planeta Tierra.",
      "Los escribas reales utilizaron una tipografía jeroglífica minuciosa para etiquetar cada estrella individual y cada grupo de decanos con sus nombres canónicos y sus listas de ofrendas requeridas. Cada columna de texto actúa como una tabla horaria que permitía a los sacerdotes astrónomos determinar el paso de la noche observando qué decano culminaba en el meridiano local. Este sistema requería una corrección sistemática cada diez días debido al avance continuo del movimiento de traslación solar.",
      "La precisión gráfica del techo de Senenmut permitió a los arqueoastrónomos del siglo veinte reconstruir el estado exacto del cielo nocturno sobre el valle de Tebas en el año 1470 antes de nuestra era. Gracias a los cálculos retrospectivos de precesión axial de la Tierra, los científicos modernos confirmaron que las posiciones relativas de las constelaciones y la inclinación del eje polar descritas en el techo corresponden de forma verídica a las observaciones empíricas realizadas durante el reinado de Hatshepsut."
    ],
    "fact": "El techo de Senenmut registra un total de cuatrocientas veintitrés estrellas individuales representadas mediante jeroglíficos de cinco puntas, distribuidas en dos campos celestes rectangulares que suman más de veintiún metros cuadrados de superficie pintada con pigmentos inorgánicos no degradados, preservando intacta la disposición iconográfica original ideada por los escribas reales tebanos.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El techo de Senenmut muestra una cuadrícula de círculos subdivididos en doce sectores angulares, considerados por los historiadores de la ciencia como los precursores directos de las cartas estelares polares. Cada sector está asociado a una festividad mensual del calendario civil egipcio y a una divinidad tutelar encargada de presidir las ceremonias litúrgicas nocturnas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "A causa del fenómeno astronómico de la precesión de los equinoccios, que desplaza el polo norte celeste a una tasa de un grado cada setenta y dos años aproximadamente, la estrella polar de la época de Senenmut no era Polaris, sino Thuban en la constelación de Draco, situándose a menos de dos grados del verdadero polo norte en el siglo quince antes de Cristo."
      }
    ]
  },
  {
    "id": "planetas-barcas",
    diagramImage: '/assets/egypt/infographic_m6/diagram_planetas-barcas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Planetas en Barcas',
    "bannerImage": "/assets/egypt/infographic_m6/banner_conocimiento-medico.webp",
    "title": "Planetas en Barcas",
    "color": "#FFB347",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_planetas.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_planetas.webp",
    "content": [
      "En la astronomía del Antiguo Egipto, los planetas visibles a simple vista no eran considerados simples puntos de luz inertes, sino manifestaciones vivas de deidades poderosas que recorrían el firmamento. En el techo astronómico de Senenmut, estos cuerpos celestes reciben el nombre genérico de «estrellas que nunca descansan» o Sebau-jechenu, en alusión directa a su movimiento errante a través de las constelaciones del fondo celeste, en contraste con las estrellas fijas de la bóveda nocturna.",
      "Cuatro de los cinco planetas visibles conocidos en la antigüedad están explícitamente representados sobre barcas sagradas en el panel sur del techo funerario. Júpiter aparece personificado como «Horus que ilumina las Dos Tierras», navegando majestuosamente con cabeza de halcón coronada por una estrella. Saturno está identificado como «Horus, el toro del cielo», un protector cósmico de ritmo pausado cuyo ciclo orbital de veintinueve años y medio era ya conocido por los observadores de los templos tebanos.",
      "Mercurio figura bajo la advocación del dios Seth, asociado a menudo con los crepúsculos rápidos y los cambios imprevistos debido a su cercanía angular con el Sol y su visibilidad esquiva sobre el horizonte. Por su parte, Venus aparece como una barca de doble proa presidida por el dios Bennu, el ave fénix primordial asociada con la renovación de la luz y el renacimiento cotidiano. Los sacerdotes registraban tanto sus apariciones matutinas como vespertinas con asombrosa precisión matemática.",
      "Un enigma fascinante del techo de Senenmut es la ausencia aparente del planeta Marte en su posición convencional entre las barcas celestes. En su lugar, el registro gráfico muestra un espacio vacío o una barca desocupada identificada jeroglíficamente como «Horus el rojo» o Hor-desher. Diversos arqueoastrónomos sugieren que durante el año exacto en que se diseñó el techo, Marte se encontraba en conjunción helíaca con el Sol, desapareciendo del cielo nocturno durante un período prolongado de invisibilidad.",
      "La navegación de los planetas sobre barcas reflejaba el principio cosmológico de que el cielo era un océano celestial infinito por donde las divinidades viajaban en navíos construidos de madera dorada. Esta conceptualización permitía a los astrónomos egipcios enseñar la mecánica celeste mediante alegorías náuticas familiares para cualquier habitante de las riberas del Nilo, integrando la observación geométrica rigurosa con el simbolismo mitológico oficial de la corte faraónica."
    ],
    "fact": "El techo de Senenmut documenta formalmente cuatro planetas mayores con un orden secuencial que coincide con sus velocidades angulares promedio observadas desde Tebas: Mercurio con ochenta y ocho días de período orbital, Venus con doscientos veinticinco días, Júpiter con doce años y Saturno con veintinueve coma cinco años.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los astrónomos de la corte tebana sabían distinguir a la perfección entre los planetas y las estrellas fijas gracias a que los planetas no centellean apreciablemente a simple vista. Los egipcios llamaban a este fenómeno «la mirada fija de los dioses», diferenciándola del titileo rápido provocado por la turbulencia térmica de la atmósfera terrestre sobre las estrellas lejanas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El movimiento retrógrado aparente de Marte, provocado porque la Tierra orbita el Sol a mayor velocidad angular y adelanta al planeta rojo cada setecientos ochenta días, fue documentado por escribas egipcios como un «retroceso sagrado», siendo la anomalía cinética más compleja que intentaron cartografiar sin modelos heliocéntricos."
      }
    ]
  },
  {
    "id": "constelaciones",
    diagramImage: '/assets/egypt/infographic_m6/diagram_constelaciones.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Monstruos del Cielo',
    "bannerImage": "/assets/egypt/infographic_m6/banner_momificacion-proceso.webp",
    "title": "Monstruos del Cielo",
    "color": "#4CAF50",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_constelaciones.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_constelaciones.webp",
    "content": [
      "El panel norte del techo astronómico de Senenmut alberga algunas de las representaciones más singulares de la iconografía celeste egipcia. En esta sección de la tumba, las estrellas boreales se agrupan en figuras híbridas que los egiptólogos decimonónicos bautizaron popularmente como monstruos celestiales. Lejos de ser invenciones terroríficas, estas formas correspondían a deidades cósmicas benévolas encargadas de encadenar las fuerzas del desorden y mantener la estabilidad perpetua del universo.",
      "La figura central de este conjunto es la diosa Tueris o Ipet, representada como un gigantesco hipopótamo hembra erguido sobre sus patas traseras, con cola de cocodrilo y apoyada sobre una estaca de amarre conocida como Menit. Esta figura se corresponde aproximadamente con partes de las constelaciones modernas de Draco, Osa Menor y Boötes. Su función astronómica era vigilar el polo norte del cielo y asegurar que la pata del toro cósmico jamás pudiera descender más allá del horizonte terrenal.",
      "Frente a Tueris aparece Meskhetiu, la pata de toro que contiene las estrellas principales de la Osa Mayor. Según los Textos de las Pirámides y los Textos de los Sarcófagos, esta constelación representaba la forma astral del dios Seth. Para impedir que Seth perturbara el orden universal, la diosa hipopótamo lo mantenía atado con una cadena de oro invisible a los postes del eje polar, un simbolismo visual brillante para explicar el movimiento circular continuo de las estrellas circumpolares.",
      "Junto a estas figuras titánicas aparecen representaciones del Halcón divino con cabeza coronada, identificado como An, y un hombre con lanza que atraviesa un cocodrilo cósmico. Cada uno de estos personajes estelares servía como punto de referencia visual para los sacerdotes que realizaban el ritual de «Apertura de la Boca» durante los funerales faraónicos. La azuela ritual de hierro meteórico empleada en esa liturgia imitaba intencionadamente la curvatura geométrica de la constelación de Meskhetiu.",
      "La cartografía del cielo septentrional en la tumba de Senenmut demuestra que Egipto poseía un sistema de constelaciones propio y completamente autónomo, desarrollado mil años antes de que la influencia babilónica y griega introdujera el zodiaco circular tradicional en el valle del Nilo. Este mapa boreal preservó la memoria de una tradición náutica y pastoril originada en los pastizales saharianos durante el período neolítico predinástico."
    ],
    "fact": "La figura de la diosa hipopótamo Tueris en el techo de Senenmut mide noventa y dos centímetros de altura en el estuco subterráneo y está acompañada por catorce estrellas doradas alineadas sobre su espalda, conformando el registro más antiguo de la constelación precursora de Draco en la arqueología del Nilo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La azuela ritual utilizada por los sacerdotes de Amun para abrir la boca y los ojos de la momia real tenía exactamente la misma forma que el asterismo de la Osa Mayor. Al tocar el rostro del difunto con este instrumento de hierro estelar, se creía que la persona absorbía la inmortalidad rotatoria de las estrellas imperecederas del norte."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El movimiento aparente circumpolar alrededor del polo norte celeste es un efecto geométrico causado por la inclinación de veintitrés grados y veintisiete minutos del eje de rotación de la Tierra. A la latitud de Tebas, situada a veinticinco coma siete grados norte, cualquier astro a menos de esa distancia angular del polo jamás se oculta en el horizonte."
      }
    ]
  },
  {
    "id": "decanos",
    diagramImage: '/assets/egypt/infographic_m6/diagram_decanos.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Reloj de Estrellas',
    "bannerImage": "/assets/egypt/infographic_m6/banner_natron-sal.webp",
    "title": "El Reloj de Estrellas",
    "color": "#E57373",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_decanos.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_decanos.webp",
    "content": [
      "El sistema de los decanos constituía el corazón tecnológico del cómputo del tiempo nocturno en el Antiguo Egipto. Los decanos eran grupos de estrellas individuales o pequeños asterismos ubicados en una banda celeste específica cercana a la eclíptica. A lo largo del año, cada decano realizaba su orto helíaco, es decir, su primera aparición matutina sobre el horizonte oriental justo antes de la salida del Sol, con un intervalo de exactamente diez días con respecto al decano precedente.",
      "En el techo de Senenmut figuran los treinta y seis decanos tradicionales organizados en columnas verticales ordenadas de derecha a izquierda. Debido a que el año civil egipcio constaba de trescientos sesenta días organizados en treinta y seis semanas de diez días llamadas décadas, más cinco días adicionales llamados epagómenos, el ascenso sucesivo de estos grupos estelares permitía sincronizar con rigor matemático el calendario oficial del Estado con la rotación física de la Tierra.",
      "Durante la noche, los sacerdotes astrónomos observaban la culminación o el surgimiento de doce decanos sucesivos a lo largo de las horas de oscuridad. Dado que la duración del período nocturno varía a lo largo de las estaciones del año debido a la inclinación del eje terrestre, las horas decánicas no tenían una duración fija de sesenta minutos modernos, sino que se expandían en invierno y se contraían en verano, dando origen al concepto de «horas temporales» o estacionales.",
      "El primer decano de la lista canónica de Senenmut está encabezado por Kenemet, asociado a la estrella Sirio y a la crecida anual del río Nilo. Cada decano cuenta con su nombre litúrgico inscrito en caligrafía jeroglífica cursiva, su representación simbólica antropomorfa o zoomorfa y una relación detallada de las enfermedades o desgracias climáticas que sus deidades protectoras podían desencadenar si no se realizaban los rituales propiciatorios correspondientes en los templos.",
      "Este impresionante reloj sideral grabado por Senenmut representa la culminación de una tradición que comenzó durante el Reino Antiguo en las tapas de madera de los ataúdes de Asiut. Sin embargo, en la tumba TT 353, el sistema alcanzó una madurez científica sin igual, despojándose de muchas ambigüedades gráficas antiguas y sirviendo como modelo canónico para todos los techos astronómicos reales construidos posteriormente en el Valle de los Reyes durante las dinastías XIX y XX."
    ],
    "fact": "El catálogo de decanos en la tumba de Senenmut incluye treinta y seis columnas jeroglíficas principales más doce columnas auxiliares de corrección calendárica, registrando un total de doscientos ochenta y ocho intervalos temporales equivalentes al ciclo anual completo del cómputo sacerdotal tebano, estableciendo una correspondencia matemática rigurosa entre las constelaciones ecuatoriales y las horas de oscuridad.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los ataúdes de madera de la Dinastía XI hallados en la necrópolis de Asiut ya contenían «relojes estelares diagonales» pintados en el reverso de sus tapas. Estos diagramas permitían al difunto consultar la hora en el inframundo mirando hacia el cielo nocturno simplemente identificando cuál de los decanos asomaba en el horizonte en cada vigilia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Cada decano ocupa aproximadamente diez grados de longitud celeste a lo largo del plano ecuatorial. Debido a que la Tierra gira trescientos sesenta grados en veinticuatro horas sidéreas, un decano cruza el meridiano celeste cada cuarenta minutos de tiempo medio, sirviendo como un cronómetro natural sumamente regular para las observaciones sacerdotales."
      }
    ]
  },
  {
    "id": "hatshepsut",
    diagramImage: '/assets/egypt/infographic_m6/diagram_hatshepsut.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Reina Faraón',
    "bannerImage": "/assets/egypt/infographic_m6/banner_tomografia-momia.webp",
    "title": "La Reina Faraón",
    "color": "#E91E63",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_hatshepsut.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_hatshepsut.webp",
    "content": [
      "El techo astronómico de Senenmut es inseparable del contexto político y cultural extraordinario forjado por el reinado de Maatkare Hatshepsut. Como una de las pocas mujeres en asumir los plenos poderes y atributos de un faraón masculino en la historia del Antiguo Egipto, Hatshepsut impulsó un florecimiento artístico, arquitectónico y científico sin precedentes. Su reinado requería una legitimación teológica constante, la cual encontró en la alineación precisa de sus monumentos con los astros.",
      "Hatshepsut proclamó ser la hija carnal del dios Amun-Ra, concebida para restaurar el orden divino tras el caos del período hicso. Para materializar este vínculo con el dios solar, encomendó a Senenmut la construcción del templo de Djeser-Djeseru, diseñado de tal forma que el eje central del santuario principal quedara alineado de manera matemática con el orto solar durante el solsticio de invierno. Esta orientación permitía que los rayos del sol naciente penetraran hasta la cámara más recóndita del santuario.",
      "Asimismo, la reina ordenó la extracción, transporte y erección de cuatro gigantescos obeliscos de granito rojo procedentes de las canteras de Asuán para embellecer el gran templo de Amun en Karnak. Estas agujas monolíticas no solo eran ofrendas piadosas, sino gigantescos gnomones solares cuyas sombras proyectadas sobre patios pavimentados permitían a los astrónomos reales registrar con exactitud matemática los equinoccios, los solsticios y las horas culminantes del día.",
      "La colaboración intelectual entre Hatshepsut y Senenmut transformó a la corte tebana en un núcleo vibrante de experimentación técnica. La expedición comercial a la mítica tierra de Punt, documentada con lujo de detalles en los relieves policromados de Deir el-Bahari, requirió conocimientos astronómicos náuticos avanzados para navegar por las aguas del Mar Rojo guiándose exclusivamente por la altura estelar de Canopo y la Estrella Polar en el horizonte meridional.",
      "A pesar de los intentos posteriores por borrar el nombre de Hatshepsut de los monumentos oficiales durante las últimas décadas del reinado de Tutmosis III, las evidencias científicas de su época permanecieron imborrables. El techo astronómico de la tumba de su arquitecto sobrevivió precisamente por encontrarse oculto bajo tierra, preservando el testimonio de una era donde la ciencia observacional y el poder político alcanzaron una simbiosis perfecta."
    ],
    "fact": "El obelisco en pie de Hatshepsut en el templo de Karnak alcanza una altura de veintinueve metros y cincuenta y seis centímetros con un peso estimado de trescientas veintitrés toneladas de granito sienita, manteniendo un error vertical menor a medio grado tras tres mil quinientos años de antigüedad, constituyendo uno de los mayores monolitos erigidos en la historia de la arquitectura egipcia del Imperio Nuevo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para erigir los obeliscos de Karnak de casi treinta metros de altura y más de trescientas toneladas de peso, los ingenieros de Hatshepsut tardaron tan solo siete meses desde su extracción en la cantera de Asuán hasta su erección final, una proeza logística y física que asombra a los ingenieros mecánicos de la actualidad."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El eje monumental de Djeser-Djeseru presenta un azimut de ciento dieciséis grados y medio respecto al norte astronómico. Esta orientación garantiza que el veintiuno de diciembre, día del solsticio de invierno, la luz solar directa ilumine exactamente la estatua de Amun ubicada al fondo de la capilla de la reina durante diecinueve minutos matutinos."
      }
    ]
  },
  {
    "id": "ciencia-moderna",
    diagramImage: '/assets/egypt/infographic_m6/diagram_ciencia-moderna.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Descifrando el Mapa',
    "bannerImage": "/assets/egypt/infographic_m6/banner_vendaje-momia.webp",
    "title": "Descifrando el Mapa",
    "color": "#00BCD4",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_ciencia.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_ciencia.webp",
    "content": [
      "El descubrimiento y estudio del techo astronómico de Senenmut marcó un hito fundacional para la egiptología moderna y el nacimiento formal de la arqueoastronomía como disciplina empírica. Cuando el egiptólogo estadounidense Herbert Winlock descubrió la cámara en 1927, comprendió de inmediato que se encontraba ante un documento irrepetible. Sin embargo, descifrar el significado exacto de sus diagramas requirió décadas de colaboración interdisciplinaria entre arqueólogos, filólogos y astrofísicos.",
      "En la década de 1960, los investigadores Otto Neugebauer y Richard Parker publicaron su monumental obra de tres volúmenes titulada «Egyptian Astronomical Texts», donde analizaron matemáticamente cada uno de los jeroglíficos y esquemas estelares de la tumba TT 353. Este estudio monumental permitió clasificar las familias de decanos y demostrar que los egipcios no utilizaban el sistema de constelaciones babilónico de doce signos zodiacales, sino una división vernácula del cielo en treinta y seis regiones.",
      "Más recientemente, los trabajos del arqueoastrónomo español Juan Antonio Belmonte y el astrofísico egipcio Mosalam Shaltout han empleado escaneos láser tridimensionales y simulaciones de planetario computerizadas para revisar las coordenadas del techo. Estos estudios contemporáneos demostraron que los trazos de Senenmut reflejan la posición real del cielo tebano entre los años 1478 y 1460 antes de nuestra era, confirmando las cronologías dinásticas derivadas de la egiptología documental.",
      "Los análisis físico-químicos no invasivos de fluorescencia de rayos X y espectroscopia Raman realizados sobre las paredes de la tumba han revelado datos asombrosos sobre las técnicas pictóricas del Imperio Nuevo. Los artesanos utilizaron azul egipcio sintético, un silicato de cobre y calcio considerado el primer pigmento artificial fabricado por la humanidad, para pintar los jeroglíficos acuáticos de las barcas divinas y las estrellas que simbolizan la inmensidad del éter.",
      "Hoy en día, la tumba TT 353 de Senenmut permanece cerrada al turismo masivo para evitar que la humedad generada por la respiración humana y los cambios térmicos deterioren los delicados pigmentos minerales sobre el estuco. La digitalización fotogramétrica de ultra alta resolución ha permitido crear modelos tridimensionales interactivos que científicos y estudiantes de todo el mundo pueden explorar sin poner en riesgo la preservación de esta joya cósmica."
    ],
    "fact": "La documentación fotogramétrica moderna de la tumba TT 353 compila más de doce mil quinientas fotografías de sesenta megapíxeles cada una, generando una nube de puntos tridimensional con una resolución submilimétrica de cero coma dos milímetros por píxel en toda la superficie del techo, permitiendo identificar trazos de pincel y pigmentos minerales invisibles para el ojo humano.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El célebre egiptólogo Otto Neugebauer, una de las mentes más brillantes de la historia de la ciencia matemática, dedicó más de veinte años de su vida a comparar minuciosamente los jeroglíficos del techo de Senenmut con textos astronómicos cuneiformes de Mesopotamia y papiros demóticos tardíos, publicando en 1960 el catálogo canónico de textos astronómicos egipcios más exhaustivo de la historia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El pigmento azul egipcio empleado en la tumba (cuprorivaita, CaCuSi4O10) posee la propiedad óptica singular de emitir radiación fluorescente en el espectro infrarrojo cercano (910 nanómetros) cuando es iluminado con luz visible, lo que permite detectar trazas invisibles de pintura original mediante cámaras multiespectrales."
      }
    ]
  },
  {
    "id": "legado-cosmos",
    diagramImage: '/assets/egypt/infographic_m6/diagram_legado-cosmos.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Legado Cósmico',
    "bannerImage": "/assets/egypt/infographic_m6/banner_vida-eterna.webp",
    "title": "El Legado Cósmico",
    "color": "#AB47BC",
    "btnImage": "/assets/egypt/infographic_senenmut/btn_legado.webp",
    "image": "/assets/egypt/infographic_senenmut/hero_legado.webp",
    "content": [
      "El techo astronómico ideado por Senenmut hace más de tres mil cuatrocientos años no fue un logro aislado, sino el punto de partida de una tradición que influyó de manera directa en el desarrollo de la astronomía en el Mediterráneo antiguo. Las observaciones minuciosas de los decanos y la división de la noche en doce segmentos estelares fueron asimiladas siglos después por los astrónomos griegos de Alejandría, como Hiparco y Claudio Ptolomeo, dando origen a la división horaria de veinticuatro partes que rige hoy nuestras vidas.",
      "La concepción egipcia de medir el tiempo a través de las estrellas imperecederas sentó las bases de los primeros calendarios solares rigurosos. Mientras que civilizaciones coetáneas como Mesopotamia basaban sus cómputos en calendarios lunares complejos que requerían intercalar meses enteros con frecuencia caótica, el calendario solar nilótico de trescientos sesenta y cinco días documentado en las paredes de Senenmut demostró ser tan eficiente que Julio César lo adoptó para Roma en el año cuarenta y seis antes de Cristo.",
      "Asimismo, el techo de Senenmut inauguró una era de techos cosmológicos monumentales que continuaría en las tumbas de los faraones Seti I, Ramsés II, Ramsés VI y Ramsés IX en el Valle de los Reyes. En cada una de estas obras maestras posteriores, los escribas continuaron perfeccionando los catálogos estelares iniciados por el arquitecto de Hatshepsut, convirtiendo la piedra subterránea en enciclopedias eternas del cosmos.",
      "Para los jóvenes astrónomos y científicos contemporáneos, la tumba de Senenmut constituye un recordatorio inspirador de cómo la curiosidad humana y la observación paciente de la naturaleza pueden desentrañar los secretos del firmamento sin necesidad de tecnología moderna. Con instrumentos ópticos simples como varas de avistamiento, plomadas de precisión y una rigurosa metodología geométrica, los sabios tebanos lograron cartografiar el universo con asombrosa fidelidad.",
      "El legado de Senenmut perdura como un puente entre la arqueología antigua y la exploración espacial moderna. Cuando las sondas espaciales de la actualidad surcan el sistema solar fotografiando los anillos de Saturno o la atmósfera densa de Júpiter, están siguiendo la misma estela de asombro y cálculo matemático que aquel cortesano de Hatshepsut grabó con carbón y hematita en la profunda penumbra de la montaña de Tebas."
    ],
    "fact": "La tradición astronómica iniciada formalmente por el techo de Senenmut perduró durante más de mil quinientos años en Egipto, registrándose en al menos setenta y dos techos astronómicos mayores distribuidos en templos faraónicos, capillas tebanas y tumbas reales del Imperio Nuevo y Período Tardío, evidenciando la asombrosa continuidad doctrinal y litúrgica del conocimiento sideral del Nilo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La división moderna del día completo en veinticuatro horas proviene directamente de la combinación egipcia de diez horas diurnas calculadas por gnomon solar, dos horas crepusculares matutina y vespertina, y doce horas nocturnas reguladas por la culminación meridiana de los decanos estelares de Senenmut."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cálculo del año civil egipcio de trescientos sesenta y cinco días acumulaba un desfase de un día cada cuatro años respecto al año trópico real (365,2422 días). Este desplazamiento constante generaba el célebre «ciclo sótico» de mil cuatrocientos sesenta años, en el cual el orto de Sirio volvía a coincidir con el primer día del calendario civil."
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
    const stars = Array.from({ length: 90 }, () => ({
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
        ctx.fillStyle = `rgba(155, 107, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Senenmut Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SenenmutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(155,107,255,0.3))' }}>
        {/* Celestial dome arch */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#senenmutGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Constellation dots along the arch */}
        {[80, 130, 185, 240, 300, 360, 415, 470, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.14 + 12;
          return (
            <g key={i}>
              <motion.circle cx={cx} cy={cy} r="3" fill="#9B6BFF"
                animate={{ opacity: [0.3, 1, 0.3], r: [2, 3.5, 2] }}
                transition={{ duration: 2 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                style={{ filter: 'drop-shadow(0 0 5px #9B6BFF)' }}
              />
              {/* Constellation lines between some dots */}
              {i > 0 && i % 2 === 0 && (
                <line
                  x1={[80, 130, 185, 240, 300, 360, 415, 470, 520][i-1]}
                  y1={10 + Math.abs([80, 130, 185, 240, 300, 360, 415, 470, 520][i-1] - 300) * 0.14 + 12}
                  x2={cx} y2={cy}
                  stroke="rgba(155,107,255,0.3)" strokeWidth="1"
                />
              )}
            </g>
          );
        })}
        {/* Center celestial disk */}
        <circle cx="300" cy="8" r="10" fill="rgba(155,107,255,0.5)" style={{ filter: 'drop-shadow(0 0 12px rgba(155,107,255,0.5))' }} />
        <circle cx="300" cy="8" r="14" fill="none" stroke="rgba(155,107,255,0.3)" strokeWidth="1" />
        <circle cx="300" cy="8" r="5" fill="rgba(155,107,255,0.8)" />
        <circle cx="30" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <circle cx="570" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <defs>
          <linearGradient id="senenmutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(155,107,255,0.2)" />
            <stop offset="50%" stopColor="rgba(155,107,255,0.9)" />
            <stop offset="100%" stopColor="rgba(155,107,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="70" textAnchor="middle" fill="#9B6BFF" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MAPA DEL UNIVERSO</text>
        <text x="300" y="90" textAnchor="middle" fill="rgba(155,107,255,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA TUMBA DE SENENMUT · CIRCA 1473 A.C.</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (circular image-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(155,107,255,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: '-4px', borderRadius: '50%',
              border: `2px solid ${node.color}`, pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM6"
          style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: node.color, boxShadow: `0 0 8px ${node.color}` }}
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
        background: 'rgba(12, 12, 35, 0.9)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
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

      {/* Two-Column Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>
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
              borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0,
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

      {/* Magazine Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
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

              {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px',
            padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'flex-start',
            gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
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
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7,
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
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(155,107,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#9B6BFF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #7B4FD4, #9B6BFF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(155,107,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9B6BFF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,36,0.85) 0%, rgba(30,18,50,0.80) 40%, rgba(18,14,36,0.88) 100%), url(/assets/egypt/infographic_senenmut/bg_senenmut.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(155,107,255,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <SenenmutHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(155,107,255,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(155,107,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(155,107,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9B6BFF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ—ºï¸ ¡Has descifrado todos los secretos del Mapa del Universo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cartógrafo Estelar
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