'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoMayaPyramid({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 50 L15 50 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 10 L35 10 L35 20 L40 20 L40 30 L45 30 L45 40 L50 40 L50 50 L10 50 L10 40 L15 40 L15 30 L20 30 L20 20 L25 20 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <rect x="25" y="40" width="10" height="10" fill={color} opacity="0.5" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1.5" />
      <line x1="25" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoVenusStar({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 15 L33 27 L45 30 L33 33 L30 45 L27 33 L15 30 L27 27 Z" fill={color} opacity="0.5" />
      <circle cx="18" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="18" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoSerpent({ size = 70, color = '#26C6DA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="35" r="2" fill={color} />
      {/* Plumes */}
      <path d="M25 35 Q20 25 28 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M35 30 Q40 20 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M45 25 Q50 15 55 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyph({ size = 70, color = '#3F51B5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="6" fill="none" stroke={color} strokeWidth="2" />
      <rect x="19" y="19" width="22" height="22" rx="4" fill={color} opacity="0.2" />
      {/* Internal details mimicking Maya numbers/bars */}
      <line x1="22" y1="25" x2="38" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="31" x2="38" y2="31" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="38" r="1.5" fill={color} />
      <circle cx="34" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoObservatory({ size = 70, color = '#FF7043', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="45" width="40" height="5" fill={color} opacity="0.4" />
      <rect x="15" y="40" width="30" height="5" fill={color} opacity="0.4" />
      <rect x="20" y="25" width="20" height="15" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 25 Q30 15 40 25" fill="none" stroke={color} strokeWidth="2" />
      <rect x="26" y="28" width="3" height="4" fill={color} opacity="0.7" />
      <rect x="31" y="27" width="3" height="4" fill={color} opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'caracol-estructura': [DecoObservatory, DecoGlyph, DecoMayaPyramid],'ventanas-astronomicas': [DecoVenusStar, DecoObservatory, DecoSerpent],'venus-ciclo': [DecoVenusStar, DecoGlyph, DecoObservatory],'precision-matematica': [DecoGlyph, DecoMayaPyramid, DecoVenusStar],'astronomos-mayas': [DecoSerpent, DecoGlyph, DecoObservatory],
  'orientacion-cardinal': [DecoMayaPyramid, DecoVenusStar, DecoObservatory],'legado-observatorio': [DecoObservatory, DecoSerpent, DecoGlyph], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Milbrath, S. (1999). Star Gods of the Maya: Astronomy in Art, Folklore, and Calendars, University of Texas Press',
  'Galindo Trejo, J. (2009). "Arqueoastronomía en la América Antigua", UNAM',
  'Ruggles, C. (2005). Ancient Astronomy: An Encyclopedia of Cosmologies and Myth, ABC-CLIO',
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "caracol-estructura",
    diagramImage: '/assets/maya/infographic_m1/diagram_caracol-estructura.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Estructura',
    "bannerImage": "/assets/maya/infographic_m1/banner_ciudades-estado.webp",
    "title": "La Estructura",
    "color": "#4CAF50",
    "btnImage": "/assets/maya/infographic_m1/btn_caracol-estructura.jpg",
    "image": "/assets/maya/infographic_m1/hero_caracol-estructura.jpg",
    "content": [
      "El Caracol es uno de los edificios más extraordinarios de la antigua ciudad de Chichén Itzá, ubicada en la península de Yucatán. Su nombre popular proviene de una escalera interna de caracol que asciende hacia la cámara superior de observación. Los arqueólogos fechan sus fases constructivas principales entre los años 800 y 1000 d.C., en el periodo Clásico Terminal mesoamericano. Esta torre cilíndrica se erige sobre dos amplias plataformas rectangulares superpuestas que nivelan el terreno kárstico original.",
      "La plataforma basal inferior mide aproximadamente 67 metros de longitud por 52 metros de ancho, alcanzando una altura de 6 metros sobre la plaza circundante. Encima de ella reposa una segunda plataforma rectangular de 24 metros por 21 metros que eleva el conjunto otros 4 metros. La torre redonda principal tiene un diámetro exterior de 11 metros y conserva una elevación de 13 metros. En su época de máximo esplendor, la estructura superaba los 16 metros de altura total respecto al suelo de la plaza ceremonial.",
      "A diferencia de la mayoría de los templos piramidales mayas de base cuadrangular, El Caracol adopta una planta circular concéntrica poco habitual en el área maya. Dos corredores anulares concéntricos techados con bóvedas mayas o falsos arcos rodean un núcleo macizo de mampostería de piedra caliza. Este núcleo central alberga el conducto helicoidal estrecho que da acceso al recinto superior. Esta singularidad arquitectónica refleja una clara función especializada orientada a la observación celeste panorámica.",
      "Los muros de la torre están construidos con bloques regulares de piedra caliza unidos mediante mortero de cal y sascab, un polvo mineral local. En su exterior se aprecian frisos tallados con representaciones del dios de la lluvia Chaac, reconocible por su nariz curvada, alternados con máscaras de deidades celestes asociadas al planeta Venus. El estuco original que cubría las paredes exteriores estaba pintado en vivos tonos rojos, azules y verdes, otorgando un impacto visual imponente a la lejanía selvática.",
      "Las excavaciones dirigidas por la Institución Carnegie de Washington entre 1925 y 1931 revelaron que el edificio fue reconstruido y ampliado al menos en cuatro ocasiones sucesivas. Cada remodelación añadía contrafuertes y plataformas adicionales para corregir desniveles y ajustar con mayor precisión las líneas de mira hacia el horizonte. Esta evolución constructiva demuestra que los astrónomos mayas refinaron sus puntos de referencia físicos conforme acumulaban generaciones continuas de registros observacionales."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La escalera interna helicoidal que da nombre a El Caracol es un pasaje sumamente angosto y empinado que serpentea por el corazón macizo de mampostería. Su diseño permitía el ascenso individual y controlado de los sacerdotes hacia la cámara alta en completa penumbra. Para sus prolongadas vigilias nocturnas previas al amanecer, los observadores portaban pequeñas antorchas impregnadas de resina de copal aromático que iluminaban tenuemente los escalones desgastados de piedra caliza."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los estudios arqueoastronómicos pioneros del investigador Anthony Aveni demostraron que la plataforma basal de El Caracol no sigue la cuadrícula urbana predominante de Chichén Itzá. Su marcada desviación intencional de 27.5 grados hacia el norte respecto al oeste geográfico coincide exactamente con el punto de puesta más septentrional alcanzado por el planeta Venus en el horizonte local cada ocho años solares, evidenciando una planificación deliberada."
      }
    ],
    "fact": "La torre de El Caracol integra dos anillos concéntricos abovedados y una cámara superior emplazada a 13 metros de elevación sobre el terreno selvático, diseñada con muros de casi un metro de grosor para alojar instrumentos de colimación visual fija que permitían registrar las trayectorias de Venus y el Sol sin requerir lentes ópticas refractarias, manteniendo una estabilidad estructural que ha perdurado más de doce siglos."
  },
  {
    "id": "ventanas-astronomicas",
    diagramImage: '/assets/maya/infographic_m1/diagram_ventanas-astronomicas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Las Ventanas',
    "bannerImage": "/assets/maya/infographic_m1/banner_colapso-maya.webp",
    "title": "Las Ventanas",
    "color": "#FFD54F",
    "btnImage": "/assets/maya/infographic_m1/btn_ventanas-astronomicas.jpg",
    "image": "/assets/maya/infographic_m1/hero_ventanas-astronomicas.jpg",
    "content": [
      "En la parte superior de la torre cilíndrica sobrevive una cámara de observación con aberturas estrechas que funcionaban como auténticas ranuras de mira astronómica. Aunque gran parte de la bóveda superior colapsó con los siglos, tres de estas aberturas horizontales se conservaron intactas para el análisis moderno. Estas ventanas no fueron diseñadas para iluminar o ventilar la habitación, sino como tubos de puntería que recortan ángulos visuales muy específicos hacia el horizonte despejado de Yucatán.",
      "Al mirar a través del grosor de las paredes de mampostería, de casi un metro de espesor, la línea visual que conecta las jambas interiores y exteriores define vectores de azimut precisos. La ventana 1, orientada hacia el oeste, permitía observar la puesta de Sol durante los equinoccios de primavera y otoño, cuando el astro diurno cruza el ecuador celeste. Asimismo, diagonales trazadas desde esquinas opuestas de esa misma ventana marcan con exactitud las puestas solares en los solsticios de verano e invierno.",
      "Las otras aberturas supervivientes están calibradas hacia eventos astronómicos protagonizados por el planeta Venus. Una de las líneas de mira apunta directamente al extremo septentrional alcanzado por Venus en el horizonte occidental, un fenómeno que ocurre cada ocho años solares. Otra línea señala el extremo meridional del planeta durante su fase de estrella vespertina. Estos puntos extremos marcaban límites fijos en las cartas celestes utilizadas por la élite gobernante para planificar el calendario agrícola y militar.",
      "Los astrónomos mayas utilizaban varas cruzadas de madera o hueso colocadas en pares sobre soportes fijos dentro de las jambas de estas ventanas. Al hacer coincidir el punto de intersección de las varas con el borde del disco solar o con el destello puntual de un planeta al rozar la línea del horizonte, lograban determinar el instante exacto de un acontecimiento celeste. Este método de gnomónica y colimación visual sustituía con notable ingenio la falta de instrumentos con lentes de aumento.",
      "La altura de la cámara superior, situada a más de 15 metros por encima del dosel arbóreo de la selva yucateca, garantizaba una visión despejada de 360 grados sin interferencias topográficas. En una región llana carente de montañas elevadas como es el norte de Yucatán, la arquitectura monumental funcionaba como un horizonte artificial controlado. Cada abertura tallada en la roca era una herramienta óptica calibrada para registrar el paso del tiempo con rigurosa exactitud matemática."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas no disponían de vidrio transparente ni de lentes ópticas pulidas para telescopios. En su lugar, perfeccionaron el uso de mirillas estrechas talladas en roca maciza y pares de varillas rígidas cruzadas sobre ranuras de mampostería. Este sistema geométrico de referencia tangencial les permitía fijar líneas de puntería estables y registrar variaciones posicionales menores a un cuarto de grado de arco en el firmamento nocturno."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "De las 29 alineaciones astronómicas potenciales analizadas mediante modelos computacionales contemporáneos en la torre de El Caracol, al menos 20 concuerdan de forma concluyente con eventos extremos de Venus y paradas del Sol con márgenes de desviación inferiores a 0.5 grados angulares. Esta concordancia estadística supera ampliamente cualquier probabilidad de coincidencia fortuita en el trazo arquitectónico prehispánico."
      }
    ],
    "fact": "La abertura oeste de la cámara alta de El Caracol conforma un túnel de mira de casi 3 metros de trayectoria geométrica efectiva que enmarca simultáneamente la puesta de Sol durante los equinoccios astronómicos y la desaparición vespertina de Venus en su punto extremo septentrional, logrando una precisión con un error angular inferior a 30 minutos de arco respecto al horizonte real de Yucatán."
  },
  {
    "id": "venus-ciclo",
    diagramImage: '/assets/maya/infographic_m1/diagram_venus-ciclo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Ciclo de Venus',
    "bannerImage": "/assets/maya/infographic_m1/banner_herencia-maya.webp",
    "title": "El Ciclo de Venus",
    "color": "#37474F",
    "btnImage": "/assets/maya/infographic_m1/btn_venus-ciclo.jpg",
    "image": "/assets/maya/infographic_m1/hero_venus-ciclo.jpg",
    "content": [
      "Para la civilización maya, el planeta Venus era el cuerpo celeste más reverenciado y temido después del Sol y la Luna. Conocido bajo nombres como Noh Ek («Gran Estrella») o Xux Ek («Estrella Avispa»), Venus era personificado por deidades complejas como Kukulkán o Lahun Chan. Su observación metódica desde El Caracol no respondía a una simple curiosidad teórica, sino a la necesidad imperiosa de coordinar rituales sagrados, ceremonias de entronización real y campañas militares decisivas.",
      "El ciclo sinódico de Venus, es decir, el tiempo transcurrido para que el planeta regrese a la misma posición respecto a la Tierra y al Sol, tiene una duración astronómica media real de 583.92 días terrestres. Los astrónomos mayas redondearon este valor a 584 días enteros distribuidos en cuatro etapas perfectamente catalogadas: 236 días como estrella matutina al este, 90 días de invisibilidad en conjunción superior, 250 días como estrella vespertina al oeste y 8 días de conjunción inferior.",
      "El momento de mayor tensión ritual ocurría durante el orto helíaco matutino, cuando Venus reaparecía por el oriente tras ocho días oculto en el resplandor solar. Los sacerdotes creían que los primeros rayos del planeta traían influencias dañinas llamadas flechas astrales, capaces de herir a reyes, marchitar cosechas de maíz o provocar sequías devastadoras. Por ello, predecir con días de anticipación el orto helíaco mediante las ventanas de El Caracol resultaba vital para clausurar templos y realizar ofrendas expiatorias.",
      "Los sabios de Chichén Itzá descubrieron una relación armónica formidable entre el año solar de 365 días y el ciclo de Venus de 584 días. Observaron que cinco revoluciones sinódicas de Venus equivalen exactamente a ocho años solares (5 × 584 = 2,920 días, mientras que 8 × 365 = 2,920 días). Este principio de conmensurabilidad permitía sincronizar el calendario agrícola con las apariciones del lucero del alba dentro de una pauta temporal cerrada y predecible.",
      "En las paredes y relieves de El Caracol abundan símbolos dedicados a este ciclo venusino de ocho años. Las estatuas y máscaras de estuco integran motivos de cinco pétalos o cinco elementos geométricos para simbolizar los cinco ciclos sinódicos que completan el pétalo cósmico de Venus en el cielo. La arquitectura se convirtió así en un libro abierto de piedra donde los gobernantes legitimaban su autoridad exhibiendo su control sobre las leyes mecánicas del cosmos observable."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los pueblos mayas sentían un sobrecogimiento extremo ante el orto helíaco de Venus tras su conjunción inferior de ocho días. Durante la madrugada en que se calculaba la reaparición del lucero, la población sellaba puertas y rendijas en sus viviendas de bajareque para impedir que los primeros rayos del astro incidieran sobre mujeres embarazadas o niños pequeños, protegiéndolos de supuestas emanaciones astrales nocivas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La proporción matemática de 5 ciclos sinódicos de Venus por cada 8 años solares terrestres genera en el espacio un dibujo orbital asombroso conocido como la rosa o pentagrama de Venus. Cada ocho años, las posiciones relativas de conjunción inferior forman los cinco vértices de una estrella de cinco puntas casi perfecta en el plano de la eclíptica observable desde la superficie de la Tierra."
      }
    ],
    "fact": "La sincronización formal de cinco ciclos sinódicos de Venus de 584 días con ocho años solares Haab de 365 días suma exactamente 2,920 días solares, acumulando un desajuste temporal frente a la mecánica celeste real de apenas 1.2 horas cada ocho años, una proeza matemática que los astrónomos de Chichén Itzá compensaron introduciendo correcciones numéricas tabuladas en el Códice de Dresde."
  },
  {
    "id": "precision-matematica",
    diagramImage: '/assets/maya/infographic_m1/diagram_precision-matematica.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Precisión Matemática',
    "bannerImage": "/assets/maya/infographic_m1/banner_mayas-actuales.webp",
    "title": "Precisión Matemática",
    "color": "#26C6DA",
    "btnImage": "/assets/maya/infographic_m1/btn_precision-matematica.jpg",
    "image": "/assets/maya/infographic_m1/hero_precision-matematica.jpg",
    "content": [
      "La precisión alcanzada por la astronomía maya en El Caracol no fue fruto de la casualidad, sino del uso de un sofisticado sistema matemático posicional de base veinte (vigesimal) que incorporaba el concepto formal del cero siglos antes de su adopción en Europa occidental. Utilizando una notación sencilla de puntos con valor de uno y barras con valor de cinco, los escribas y astrónomos registraban cifras millonarias en estelas de piedra, códices plegados de papel amate y grafitis murales.",
      "Para sus mediciones celestes, los sacerdotes matemáticos desarrollaron el concepto del día como unidad atómica indivisible llamada k'in. Al acumular k'ines en periodos múltiplos de veinte —uinal (20 días), tun (360 días), k'atun (7,200 días) y b'ak'tun (144,000 días)—, podían calcular fracciones promedio de ciclos orbitales sin necesidad de emplear números decimales complejos. La duración del ciclo lunar, por ejemplo, fue establecida por los mayas en 29.53086 días, frente al valor contemporáneo medido por satélites de 29.53059 días.",
      "En el caso de Venus, la cifra canónica de 584 días presenta un error acumulado de aproximadamente 0.08 días por revolución frente al valor real de 583.92 días. Para evitar que las tablas predictivas perdieran concordancia con el cielo a lo largo de los siglos, los matemáticos mayas idearon un mecanismo de corrección intercalar extraordinario documentado en el Códice de Dresde. Cada 61 ciclos de Venus (unos 97.5 años), restaban 4 días al cómputo acumulado, y tras 301 ciclos suprimían 8 días adicionales.",
      "Con este sistema de compensación fractal, el error en la predicción del orto de Venus se reducía a menos de un día cada cinco siglos. Tal exactitud requirió siglos continuos de registros empíricos transmitidos de maestros a discípulos en linajes astronómicos especializados de Chichén Itzá. Los instrumentos de piedra de El Caracol servían como verificadores físicos permanentes para comprobar que los cálculos teóricos de las tablas coincidieran rigurosamente con los sucesos visuales reales.",
      "La integración entre geometría constructiva y aritmética vigesimal permitía traducir ecuaciones temporales en dimensiones arquitectónicas tangibles. El número de peldaños, las proporciones de los muros, la separación angular entre pilastras y la orientación de las cornisas de El Caracol funcionaban como calculadoras analógicas fijas. La piedra y el estuco cristalizaban la matemática maya para garantizar la estabilidad ceremonial del orden social ante los ciclos implacables del universo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para ejecutar cálculos numéricos de gran escala antes de labrarlos sobre piedra monumental, los matemáticos mayas utilizaban tableros de cómputo sobre arena fina o esteras tejidas de palma llamadas petates, valiéndose de semillas secas de cacao para las unidades, varillas delgadas de madera para los múltiplos de cinco y conchas marinas de caracol pulidas para señalar la posición del cero."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El algoritmo de corrección intercalar maya para las efemérides de Venus registradas en el Códice de Dresde reduce la desviación acumulada a tan solo un día de desfase a lo largo de más de 6,000 años de proyección temporal teórica. Este nivel de exactitud cuantitativa superaba con holgura al calendario juliano empleado coetáneamente en los reinos medievales de Europa occidental."
      }
    ],
    "fact": "A través de registros sistemáticos de 149 lunaciones consecutivas durante 4,400 días continuos documentados en las inscripciones de Copán y Chichén Itzá, los sabios mayas establecieron una duración media para el mes sinódico lunar de 29.53086 días solares, lo que representa una diferencia de tan solo 23 segundos respecto a las mediciones atómicas de la astronomía moderna."
  },
  {
    "id": "astronomos-mayas",
    diagramImage: '/assets/maya/infographic_m1/diagram_astronomos-mayas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los Astrónomos',
    "bannerImage": "/assets/maya/infographic_m1/banner_origenes-mayas.webp",
    "title": "Los Astrónomos",
    "color": "#FF7043",
    "btnImage": "/assets/maya/infographic_m1/btn_astronomos-mayas.jpg",
    "image": "/assets/maya/infographic_m1/hero_astronomos-mayas.jpg",
    "content": [
      "En la sociedad maya del Clásico Terminal, los astrónomos pertenecían a un sector de la élite sacerdotal conocido como los ah k'inob («los del Sol») o ah miatz («los sabios letrados»). Estos especialistas no trabajaban de forma aislada, sino que conformaban cofradías hereditarias vinculadas estrechamente a la corte real de Chichén Itzá. Su función principal consistía en descifrar la voluntad divina expresada en el movimiento de los astros para aconsejar a los gobernantes sobre momentos propicios para sembrar, negociar o combatir.",
      "El entrenamiento de un astrónomo maya comenzaba desde la infancia y se extendía durante décadas. Los aprendices debían memorizar extensas genealogías dinásticas, complejas tablas de cómputo vigesimal, mitología cosmogónica y centenares de jeroglíficos calendáricos. Aprendían a observar las estrellas sin pestañear durante horas, a registrar la humedad atmosférica que alteraba la visibilidad del horizonte y a correlacionar la aparición de cometas y meteoros con crisis políticas terrestres.",
      "Los atuendos de estos sacerdotes celestes reflejaban su elevada jerarquía ritual. Portaban capas de plumas de quetzal de color verde esmeralda, tocados decorados con conchas marinas y cuentas de jade pulido, y sostenían cetros en forma de serpiente bicéfala que representaban la eclíptica cósmica. En las ceremonias nocturnas sobre las terrazas de El Caracol, quemaban copal aromático en incensarios de barro para purificar el ambiente visual y comunicarse espiritualmente con las deidades del firmamento.",
      "Los ah k'inob eran también custodios de los códices sagrados, libros en biombo fabricados con la corteza batida del árbol de higuera silvestre (ficus amate) e impregnados con una capa blanca de estuco de cal apagada. En estos volúmenes pintaban con tintas minerales de hematita roja y negro de carbón las efemérides planetarias para generaciones futuras. Poseer y saber interpretar estos textos otorgaba un poder social indiscutible frente al pueblo común que dependía del calendario para sobrevivir.",
      "La autoridad de los astrónomos era tan profunda que ningún gobernante de Chichén Itzá tomaba posesión de su cargo ni declaraba la guerra a una ciudad rival sin consultar previamente las conjunciones planetarias señaladas por el colegio de sacerdotes de El Caracol. Su ciencia constituía el puente sagrado que unía el destino cotidiano de la comunidad agrícola con los ritmos gigantescos e inmutables de los dioses que marchaban por la bóveda de la noche."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A fin de preservar su agudeza visual durante las extensas jornadas de guardia astronómica nocturna, los sacerdotes ah k'inob evitaban la mirada directa a hogueras o antorchas encendidas. En su lugar, colocaban cuencos de barro negro vidriado llenos de agua tranquila o espejos circulares de pirita y obsidiana para observar con nitidez el reflejo de planetas y constelaciones sin deslumbrarse."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los análisis epigráficos modernos de las inscripciones glíficas mayas han confirmado la existencia de títulos oficiales específicos para la comunidad científica, tales como ah ts'ib («escriba y cartógrafo sagrado») e itz'at («sabio versado en ciencias»), revelando que la observación del cosmos constituía una disciplina profesional altamente institucionalizada y respetada."
      }
    ],
    "fact": "Los sacerdotes astrónomos mayas mantenían una categoría diplomática especial entre las diferentes urbes de Mesoamérica, permitiéndoles cruzar fronteras en tiempos de guerra civil para coordinar congresos astronómicos interestatales, como el célebre encuentro de sabios calendáricos celebrado en el año 763 d.C. en la acrópolis de Copán."
  },
  {
    "id": "orientacion-cardinal",
    diagramImage: '/assets/maya/infographic_m1/diagram_orientacion-cardinal.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Orientación',
    "bannerImage": "/assets/maya/infographic_m1/banner_palenque-arte.webp",
    "title": "Orientación",
    "color": "#3F51B5",
    "btnImage": "/assets/maya/infographic_m1/btn_orientacion-cardinal.jpg",
    "image": "/assets/maya/infographic_m1/hero_orientacion-cardinal.jpg",
    "content": [
      "Para los constructores de Chichén Itzá, el espacio geográfico y el tiempo astronómico formaban una sola entidad indivisible estructurada por los cuatro rumbos del universo. En la cosmología maya, cada punto cardinal poseía una deidad tutelar, un color simbólico, un árbol sagrado y un pájaro protector. El oriente (Lak'in), asociado al color rojo y al renacimiento del Sol, marcaba el rumbo principal de la vida; el poniente (Chik'in), de color negro, simbolizaba la entrada al inframundo o Xibalbá.",
      "El norte (Xaman), vinculado al color blanco, representaba la región de los antepasados y las lluvias frías del invierno, mientras que el sur (Nohol), representado por el color amarillo, se asociaba con la madurez del maíz y la sequía estacional. En el centro exacto del cosmos se alzaba la Ceiba Verde primordial o Yaxché, cuyo tronco atravesaba los trece niveles del cielo y cuyas raíces profundas se anclaban en los nueve estratos del inframundo subterráneo.",
      "El Caracol fue emplazado en un punto estratégico del sector meridional de Chichén Itzá para servir como pivote orientador de todo el paisaje sagrado. Su eje longitudinal principal rompe intencionalmente la retícula urbana ortogonal predominante en la ciudad antigua. Los arqueólogos descubrieron que la diagonal de su plataforma inferior se proyecta con precisión hacia el templo mayor de Mayapán situado a decenas de kilómetros al oeste, estableciendo una red geográfica astronómicamente orientada.",
      "Además de los cuatro puntos cardinales convencionales, los mayas otorgaban una importancia suprema a los puntos de salida y puesta cenital del Sol. Dos veces al año, en mayo y julio en la latitud de Yucatán (alrededor de 20° 40' N), el Sol pasa exactamente por el cenit al mediodía local, eliminando toda sombra proyectada por postes verticales. Las esquinas y pilares de El Caracol fueron tallados para señalar con claridad estos momentos culminantes que anunciaban la llegada de las lluvias.",
      "La interacción entre la arquitectura circular de la torre y las plataformas rectangulares subyacentes crea un diagrama cósmico tridimensional. Al caminar por las terrazas de El Caracol, los sacerdotes recreaban físicamente la circunvalación de los astros alrededor del centro inmóvil de la Tierra. Cada escalinata, pretil y vano de entrada funcionaba como una coordenada topográfica viva que conectaba la geografía humana con el orden geométrico de las estrellas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A diferencia de las convenciones cartográficas modernas que colocan el norte en la cúspide de los mapas, la cosmovisión maya situaba invariablemente el oriente (Lak'in) en la parte superior. Esto respondía a que el nacimiento cotidiano del disco solar marcaba el inicio de todas las actividades biológicas y la renovación sagrada del orden cósmico en el mundo terrenal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En la latitud geográfica de Chichén Itzá (20° 41' N), el Sol alcanza el cenit astronómico vertical los días 23 de mayo y 19 de julio. Durante estos instantes del mediodía solar verdadero, los gnomones y columnas verticales de piedra no proyectan sombra alguna hacia los lados, sirviendo como marcadores infalibles para el inicio del ciclo agrícola del maíz."
      }
    ],
    "fact": "La plataforma basal superior de El Caracol se desvía de forma calculada 27 grados y 30 minutos de arco respecto al oeste geográfico verdadero, una dirección arquitectónica atípica que se alinea con una precisión de medio grado con el extremo más septentrional de la puesta de Venus, fenómeno que se repite invariablemente cada ocho años terrestres exactos."
  },
  {
    "id": "legado-observatorio",
    diagramImage: '/assets/maya/infographic_m1/diagram_legado-observatorio.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Legado',
    "bannerImage": "/assets/maya/infographic_m1/banner_tikal-metropolis.webp",
    "title": "El Legado",
    "color": "#FFC107",
    "btnImage": "/assets/maya/infographic_m1/btn_legado-observatorio.jpg",
    "image": "/assets/maya/infographic_m1/hero_legado-observatorio.jpg",
    "content": [
      "El observatorio de El Caracol de Chichén Itzá representa una de las cumbres más admirables del conocimiento científico y la ingeniería del continente americano prehispánico. Declarado Patrimonio de la Humanidad por la UNESCO en 1988 como parte integral de la zona arqueológica de Chichén Itzá, el edificio sigue siendo objeto de intensas investigaciones arqueoastronómicas, geofísicas y de escaneo láser tridimensional mediante tecnología LiDAR que revelan nuevos secretos subterráneos.",
      "A lo largo de casi un siglo de restauraciones científicas, desde las misiones pioneras del arqueólogo Sylvanus Morley hasta los proyectos del Instituto Nacional de Antropología e Historia (INAH) de México, los especialistas han logrado estabilizar la bóveda y proteger los estucos originales de la erosión kárstica. Hoy en día, los datos obtenidos en El Caracol permiten a los astrónomos modernos comprender cómo sociedades sin telescopios construyeron modelos cosmológicos extraordinariamente precisos.",
      "El estudio de este monumento revolucionó la historia de la ciencia mundial al desmentir el antiguo prejuicio eurocéntrico de que las civilizaciones precolombinas carecían de método científico riguroso. Los mayas no eran simples observadores pasivos o místicos; eran matemáticos sistemáticos que planteaban hipótesis numéricas, contrastaban sus teorías con mediciones cuantitativas en el horizonte y aplicaban factores correctores mediante métodos inductivos y deductivos.",
      "Para las nuevas generaciones de estudiantes y jóvenes científicos de todo el mundo, El Caracol ofrece una lección inspiradora sobre la capacidad humana de explorar el universo. Con solo piedra caliza, varas de madera, agudeza visual y disciplina intelectual, los constructores mayas descifraron las leyes del movimiento planetario y levantaron un faro de conocimiento que ha resistido más de mil años de intemperie en la selva mexicana.",
      "Hoy en día, El Caracol permanece erguido como un testimonio imperecedero de la curiosidad y la sabiduría de los pueblos originarios de Mesoamérica. Cada atardecer de equinoccio, cuando la luz solar se filtra por sus estrechas ventanas de piedra tal como lo hacía en el siglo X, el edificio revive su función milenaria: recordar a la humanidad que todos los pueblos de la Tierra comparten el mismo cielo y el mismo anhelo universal por desentrañar sus misterios."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando los exploradores John Lloyd Stephens y Frederick Catherwood se adentraron en las ruinas cubiertas de selva de Chichén Itzá en 1842, quedaron atónitos ante la silueta cilíndrica de este edificio. Catherwood dibujó minuciosas litografías del observatorio semiderruido, bautizándolo en sus cuadernos de campo como «El Caracol» debido a su intrincada escalera interna de piedra."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las campañas recientes con sensores LiDAR de penetración forestal en el área monumental de Chichén Itzá han cartografiado más de doce kilómetros de caminos empedrados elevados (sacbeob) que convergían en El Caracol, confirmando que el edificio operaba como un centro astronómico y cívico neurálgico conectado directamente con complejos habitacionales de la élite."
      }
    ],
    "fact": "En 1988, la UNESCO inscribió oficialmente a El Caracol de Chichén Itzá en el catálogo de Patrimonio Cultural de la Humanidad, consagrándolo como una de las obras cumbres de la arqueoastronomía precolombina al fusionar con éxito arquitectura de mampostería masiva, matemáticas vigesimales con valor posicional y cálculo de ciclos sinódicos planetarios."
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
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
      hue: Math.random() > 0.5 ? '76,175,80' : '255,213,79', // jade or gold
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Maya stepped arch */}
        <path d="M 50 110 L 100 110 L 100 80 L 150 80 L 150 50 L 450 50 L 450 80 L 500 80 L 500 110 L 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const positions = [
            {cx: 50, cy: 110}, {cx: 100, cy: 80}, {cx: 150, cy: 50}, 
            {cx: 300, cy: 50}, 
            {cx: 450, cy: 50}, {cx: 500, cy: 80}, {cx: 550, cy: 110}
          ];
          const colors = ['#4CAF50','#FFD54F','#37474F','#26C6DA','#FF7043','#3F51B5','#FFC107'];
          const pos = positions[i];
          return (
            <motion.circle key={i} cx={pos.cx} cy={pos.cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 20 L303 27 L310 30 L303 33 L300 40 L297 33 L290 30 L297 27 Z" fill="#4CAF50" opacity="0.5" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">EL CARACOL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBSERVATORIO DE VENUS EN CHICHÉN ITZÁ</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(76,175,80,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotMayaM1"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              fontSize: '1rem', color: '#FFF', margin: '0 0 1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} style={{ color: node.color }} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Did You Know Footer â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(90deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}25`,
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            background: node.color, borderRadius: '50%', padding: '0.6rem',
            boxShadow: `0 0 15px ${node.color}40`, flexShrink: 0,
          }}>
            <Sparkles size={20} color="#0B0E2D" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem', fontWeight: 700 }}>El Dato Extraordinario</h4>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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

              {node.fact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      marginTop: '3rem',
      background: 'rgba(10, 12, 30, 0.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '1.5rem 2rem',
      border: '1px solid rgba(76,175,80,0.2)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#4CAF50" /> Progreso de Exploración
        </h4>
        <div style={{
          background: 'rgba(76,175,80,0.15)', padding: '0.3rem 0.8rem',
          borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
          color: '#4CAF50', border: '1px solid rgba(76,175,80,0.3)',
        }}>
          {exploredIds.length} / {nodes.length} Nodos
        </div>
      </div>

      <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'visible' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50, #FFD54F)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(76,175,80,0.5)',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: 0, width: '100%',
          display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          {nodes.map((n, i) => {
            const isExplored = exploredIds.includes(n.id);
            return (
              <motion.button
                key={n.id}
                onClick={() => onSelect(n)}
                whileHover={{ scale: 1.2 }}
                style={{
                  width: '18px', height: '18px', borderRadius: '50%', background: isExplored ? n.color :'#1A1D36',
                  border: `2px solid ${isExplored ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                  cursor: 'pointer', pointerEvents: 'auto',
                  boxShadow: isExplored ? `0 0 10px ${n.color}` : 'none',
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM1() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNodeId(activeNodeId === node.id ? null : node.id);
    if (!exploredIds.includes(node.id)) setExploredIds(prev => [...prev, node.id]);
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#04050A',
      color: '#fff',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          padding: '2rem 0',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        <ProgressBar
          nodes={INFOGRAPHIC_NODES}
          exploredIds={exploredIds}
          onSelect={(n) => {
            setActiveNodeId(n.id);
            if (!exploredIds.includes(n.id)) setExploredIds(prev => [...prev, n.id]);
          }}
        />

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        alt="Maya Infographic Visual"
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
