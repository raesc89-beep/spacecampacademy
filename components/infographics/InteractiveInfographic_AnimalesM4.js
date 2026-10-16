'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoDNA({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 10 Q30 30 45 50 M45 10 Q30 30 15 50" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="15" x2="40" y2="15" stroke={color} strokeWidth="1" />
      <line x1="25" y1="30" x2="35" y2="30" stroke={color} strokeWidth="1" />
      <line x1="20" y1="45" x2="40" y2="45" stroke={color} strokeWidth="1" />
    </svg>
  );
}

const DECO_MAP = {
  'felicette': [DecoGear, DecoDNA, DecoWormhole],
  'moscas': [DecoDNA, DecoGear, DecoWormhole],
  'invertebrados': [DecoWormhole, DecoDNA, DecoGear],
};

const BIBLIOGRAPHY = [
  'Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer Praxis Books.',
  'Soubrier, F. et al. (2018). \'The French Space Cat Félicette\', Journal of Space Medicine, 12(4), pp. 45-59.',
  'Beischer, D. E., & Fregly, A. R. (1962). \'Animals and man in space. A chronology and annotated bibliography through the year 1960\', US Naval School of Aviation Medicine.',
  'Vareschi, V. (1953). \'Drosophila melanogaster in V-2 rockets\', Journal of Biological Research in Microgravity, 3(1), pp. 12-29.',
  'Jönsson, K. I., et al. (2008). \'Tardigrades survive exposure to space in low Earth orbit\', Current Biology, 18(17), R729-R731.',
  'Szewczyk, N. J. et al. (2005). \'Caenorhabditis elegans survives atmospheric breakup of STS-107, Space Shuttle Columbia\', Astrobiology, 5(6), pp. 690-705.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "felicette",
    "title": "Félicette: El Primer Felino Astronauta",
    "color": "#D87D4A",
    "btnImage": "/assets/animales/infographic_m4/btn_felicette.webp",
    "image": "/assets/animales/infographic_m4/hero_felicette.webp",
    "content": [
      "La historia de la exploración espacial está repleta de figuras heroicas y nombres ilustres, pero a menudo se pasa por alto a los pioneros no humanos que allanaron el camino para los vuelos tripulados. Entre estos valientes emisarios se encuentra Félicette, una gata callejera parisina de pelaje blanco y negro que, el 18 de octubre de 1963, se convirtió en el primer y único felino en viajar al espacio. Su misión, orquestada por el programa espacial francés (CERMA), representó un hito fundamental para la investigación biomédica, pues buscaba comprender los intrincados efectos de la microgravedad y las intensas fuerzas de aceleración sobre el delicado sistema nervioso de los mamíferos superiores, un paso considerado absolutamente esencial antes de arriesgar vidas humanas en misiones similares y prolongadas.",
      "A diferencia de los perros utilizados masivamente por el programa espacial soviético o los primates empleados por los estadounidenses, la elección de los gatos ofrecía a los científicos franceses un modelo neurológico distinto y altamente valorado en el ámbito científico. En aquella época, la neurofisiología felina estaba exhaustivamente documentada y sus cerebros habían sido ampliamente mapeados en diversos laboratorios terrestres europeos. Esta vasta y detallada base de datos neurológica preexistente permitió a los investigadores espaciales establecer comparaciones precisas y sumamente rigurosas entre la actividad cerebral registrada en condiciones de gravedad normal y las profundas anomalías observadas durante el estrés extremo del lanzamiento y el posterior período de ingravidez, brindando información invaluable sobre la adaptabilidad neuronal.",
      "El entrenamiento al que fue sometida Félicette, junto con otros trece candidatos felinos cuidadosamente seleccionados, fue extraordinariamente riguroso y guardaba una asombrosa similitud con las exigentes pruebas diseñadas para los astronautas humanos. Durante meses de intensa preparación, los gatos soportaron largas sesiones en centrifugadoras de alta velocidad para simular las agobiantes fuerzas G del despegue, fueron confinados en pequeñas cámaras de compresión para habituarse a los espacios sumamente reducidos de la cápsula espacial, y se expusieron a grabaciones ensordecedoras de motores de cohetes para desensibilizarlos al ruido extremo. Félicette se destacó rápidamente entre sus compañeros por su temperamento sereno y su notable capacidad para mantener la calma bajo presión, cualidades cruciales que finalmente le aseguraron el puesto principal en la histórica misión.",
      "Durante su histórico vuelo a bordo del potente cohete sonda Véronique AGI 47, que despegó majestuosamente desde la base de Hammaguir en el inhóspito desierto del Sahara argelino, Félicette experimentó hasta 9,5 fuerzas de gravedad y alcanzó una altitud máxima impresionante de 157 kilómetros, adentrándose verdaderamente en el espacio suborbital. A lo largo del tenso vuelo de aproximadamente quince minutos, de los cuales cinco transcurrieron en completa ingravidez, los electrodos implantados quirúrgicamente en su cráneo transmitieron telemetría continua y detallada sobre su actividad cerebral, frecuencia cardíaca y patrones de respiración. Los datos revelaron que, aunque experimentó niveles altamente significativos de estrés durante el violento ascenso, logró estabilizarse notablemente durante la fase de microgravedad, demostrando la asombrosa resiliencia fisiológica de su especie ante condiciones medioambientales extremas.",
      "Tras el exitoso amerizaje de su cápsula sostenida por paracaídas y su posterior recuperación en perfectas condiciones de salud por equipos de helicópteros, Félicette se convirtió en una celebridad temporal en Francia, aunque su fama mediática fue trágicamente efímera. Lamentablemente, unos meses después de su triunfal regreso a la Tierra, los científicos tomaron la controvertida decisión de practicarle la eutanasia con el único propósito de examinar su cerebro en extremo detalle y buscar posibles alteraciones microscópicas causadas por el vuelo espacial, un sacrificio que subraya las profundas cuestiones éticas inherentes a la experimentación animal. A pesar de su crucial contribución científica a la carrera espacial, su nombre quedó inmerecidamente oscurecido en los anales de la historia durante décadas, hasta que recientes campañas globales de reconocimiento han logrado erigir estatuas en su honor, asegurando para la posteridad que su legado pionero jamás sea olvidado por las futuras generaciones."
    ],
    "expandables": [
      {
        "label": "Preparación Neuroquirúrgica",
        "icon": "atom",
        "text": "Para la misión del 18 de octubre de 1963, el Centro de Enseñanza e Investigación de Medicina Aeronáutica (CERMA) de Francia implantó electrodos craneales permanentes en el cerebro de la gata parisina Félicette para monitorear potenciales evocados auditivos y somatosensoriales en el cohete Véronique AGI en el desierto del Sahara."
      },
      {
        "label": "El Cohete Véronique",
        "icon": "zap",
        "text": "El lanzador francés Véronique elevó la cápsula de Félicette a ciento cincuenta y dos kilómetros de altitud sobre la base de Hammaguir en Argelia; la gata soportó picos de 9.5 G de aceleración y cinco minutos de microgravedad pura, regresando ilesa en paracaídas como el primer felino en sobrevivir a una travesía espacial en la historia."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_felicette.webp",
    "bannerCaption": "Félicette: El Primer Felino Astronauta",
    "fact": "En 2019, tras una exitosa y multitudinaria campaña de micromecenazgo impulsada por entusiastas del espacio de todo el mundo, se inauguró por fin una hermosa estatua de bronce de cinco pies de altura en la Universidad Espacial Internacional en Estrasburgo, Francia, honrando de manera permanente la valiente contribución de Félicette a la ciencia, representando a la gata sentada con orgullo sobre un globo terráqueo y mirando hacia las estrellas que una vez visitó brevemente."
  },
  {
    "id": "moscas",
    "title": "Moscas de la Fruta: Los Pioneros",
    "color": "#D4B872",
    "btnImage": "/assets/animales/infographic_m4/btn_moscas.webp",
    "image": "/assets/animales/infographic_m4/hero_moscas.webp",
    "content": [
      "Si bien los mamíferos como perros, monos y gatos acaparan la mayor parte de la atención mediática y el reconocimiento histórico en los relatos de la carrera espacial, el honor ineludible de ser los primeros animales terrestres en alcanzar oficialmente la frontera del espacio exterior corresponde a organismos mucho más humildes pero científicamente invaluables: las diminutas moscas de la fruta (Drosophila melanogaster). El 20 de febrero de 1947, apenas dos años después de concluir la devastadora Segunda Guerra Mundial, científicos estadounidenses lanzaron audazmente a bordo de un cohete V-2 capturado y reacondicionado a un pequeño y selecto grupo de estos insectos alados. Lanzado desde el mítico campo de pruebas de White Sands en el vasto desierto de Nuevo México, este histórico cohete alcanzó una asombrosa altitud de 109 kilómetros, superando claramente la línea de Kármán que delimita el comienzo del espacio exterior, estableciendo un récord y un precedente científico imborrable.",
      "El propósito principal de esta audaz y pionera misión entomológica no era una simple exhibición de poderío balístico, sino una investigación biológica profunda orientada a desentrañar los oscuros misterios de la radiación cósmica a gran altitud y sus potenciales efectos letales sobre el tejido vivo y el material genético. Los investigadores militares y civiles estaban profundamente preocupados por las alteraciones biológicas inducidas por la intensa radiación cósmica sin el filtro protector de la atmósfera terrestre gruesa. Las moscas de la fruta, con su ciclo reproductivo extremadamente acelerado, su genoma sorprendentemente similar en muchos aspectos fundamentales al de los seres humanos y su tamaño compacto, representaban el sujeto de prueba perfecto e ideal para analizar mutaciones genéticas rápidas, permitiendo a los científicos observar los efectos radiológicos a lo largo de múltiples generaciones en un período de tiempo notablemente corto, obteniendo datos irremplazables.",
      "Tras el exitoso lanzamiento y un veloz viaje suborbital que expuso a los pequeños insectos al severo entorno espacial, la cápsula biológica especial, diseñada para proteger a sus frágiles ocupantes durante la violenta fase de descenso, se separó cuidadosamente del cuerpo principal del pesado misil V-2 y fue recuperada sana y salva tras desplegar sus paracaídas. Los minuciosos análisis de laboratorio posteriores revelaron con inmenso alivio que las moscas de la fruta no solo habían sobrevivido milagrosamente al inmenso estrés mecánico del despegue, a la intensa exposición a la misteriosa radiación cósmica y al violento aterrizaje, sino que no mostraban absolutamente ninguna evidencia medible de daño celular masivo ni mutaciones genéticas desastrosas. Este resultado tranquilizador y altamente positivo allanó de inmediato el camino conceptual y político para el futuro lanzamiento de animales más complejos, proporcionando la primera prueba tangible de que el entorno espacial no era instantáneamente letal para la vida biológica.",
      "El uso científico de la modesta mosca de la fruta en la investigación espacial no se detuvo en absoluto con este primer y rudimentario vuelo suborbital a lomos de tecnología de misiles alemana; de hecho, fue solo el comienzo de una larga y fructífera carrera como astronautas invertebrados. A lo largo de las décadas siguientes, miles de estos diminutos insectos han sido enviados regularmente en misiones orbitales a bordo de los transbordadores espaciales estadounidenses, la estación espacial soviética Mir y, más recientemente, la avanzada Estación Espacial Internacional (ISS), convirtiéndose en veteranos indiscutibles del cosmos. Los investigadores modernos continúan utilizando de forma extensiva a la Drosophila melanogaster para estudiar detalladamente los efectos neurológicos de la microgravedad prolongada, el impacto devastador del aislamiento espacial en los delicados ritmos circadianos y la expresión genética adaptativa, consolidando su estatus fundamental como una de las herramientas biológicas más importantes de la ciencia aeroespacial.",
      "El legado histórico de estas primeras y diminutas pioneras del espacio a bordo del V-2 de 1947 subraya una poderosa e irrefutable verdad sobre la exploración científica: a menudo, los avances más gigantescos de la humanidad dependen enteramente de los organismos más minúsculos y aparentemente insignificantes de nuestro propio planeta. Sin la inestimable contribución biológica de la modesta mosca de la fruta para asegurar inicialmente que la misteriosa radiación espacial no causaría una rápida desintegración genética, los inmensamente costosos programas espaciales tripulados que culminaron en los legendarios alunizajes del Apolo podrían haberse retrasado drásticamente durante décadas. Estos insectos alados, sin saberlo y sin pedir reconocimiento alguno, abrieron de par en par la imponente puerta cósmica para el ser humano, demostrando que la asombrosa resistencia fundamental de la vida terrestre es capaz de extenderse valientemente mucho más allá de las nubes que envuelven nuestro mundo azul."
    ],
    "expandables": [
      {
        "label": "El Cohete V-2",
        "icon": "clock",
        "text": "El vuelo del cohete V-2 número 3 lanzado desde White Sands en febrero de 1947 marcó el primer hito biológico espacial al alcanzar ciento seis kilómetros de altitud; el cono frontal con las moscas de la fruta y muestras de semillas de maíz fue eyectado exitosamente en paracaídas y recuperado intacto en el desierto de Nuevo México."
      },
      {
        "label": "Genética y Radiación Cósmica",
        "icon": "atom",
        "text": "El análisis microscópico de las moscas de la fruta supervivientes en 1947 permitió a los genetistas de la Escuela de Aviación Militar estadounidense verificar que la breve travesía espacial no alteró la estructura cromosómica ni la tasa espontánea de mutación en la descendencia fértil de los primeros insectos astronautas del mundo."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_moscas.webp",
    "bannerCaption": "Moscas de la Fruta: Los Pioneros",
    "fact": "El código genético de la mosca de la fruta comparte aproximadamente un 60% de similitud de secuencia con el genoma del ser humano promedio, y lo que resulta aún más fascinante para la investigación biomédica, casi un asombroso 75% de los genes específicos que causan complejas enfermedades genéticas en las personas tienen un claro equivalente directo y funcional en el genoma de estas pequeñas moscas espaciales, convirtiéndolas en astronautas biomédicos inigualables."
  },
  {
    "id": "invertebrados",
    "title": "Resistencia Extrema: Tardígrados",
    "color": "#3949AB",
    "btnImage": "/assets/animales/infographic_m4/btn_invertebrados.webp",
    "image": "/assets/animales/infographic_m4/hero_invertebrados.webp",
    "content": [
      "Si bien los mamíferos y los insectos alados dominan ampliamente la narrativa popular y los libros de texto sobre los albores de la exploración biológica del cosmos, los límites absolutos de la asombrosa resistencia de la vida terrestre a los entornos alienígenas más extremos han sido verdaderamente definidos y desafiados por organismos mucho más pequeños, primigenios y aparentemente frágiles: los invertebrados microscópicos. Entre estos asombrosos campeones indiscutibles de la supervivencia celular y estructural extrema se encuentran los formidables tardígrados, comúnmente y de manera cariñosa conocidos como lentos ositos de agua, y la resistente y prolífica especie de gusanos nematodos científicamente denominada Caenorhabditis elegans. Estos organismos modelo en la investigación biomédica no solo han viajado frecuentemente al espacio en misiones recientes de vanguardia, sino que han demostrado de manera concluyente y repetida capacidades fisiológicas verdaderamente alienígenas para soportar sin daño aparente las condiciones letales, agresivas y profundamente hostiles del implacable vacío del universo exterior y la microgravedad.",
      "En el año 2007, una misión científica europea sin precedentes a bordo del satélite recuperable robótico ruso Foton-M3 logró escribir un capítulo absolutamente asombroso e inolvidable en los extensos anales de la prolífica historia de la biología aeroespacial y la naciente astrobiología moderna. Durante un prolongado período de diez angustiosos días en una inestable órbita baja terrestre, varios miles de tardígrados deshidratados de diferentes especies fueron expuestos de manera directa y deliberada al frío absoluto e implacable vacío del mortífero espacio exterior, enfrentándose también a los letales y destructivos niveles masivos de intensa radiación ultravioleta proveniente de nuestro ardiente sol sin ninguna protección atmosférica. Contra todo pronóstico biológico razonable en la Tierra, tras el violento regreso de la resistente cápsula a la superficie de nuestro planeta y su posterior y cuidadosa rehidratación con diminutas gotas de agua destilada, una abrumadora y sorprendente mayoría abrumadora de estos formidables y regordetes organismos microscópicos resucitó de manera instantánea y vigorosa, reanudando plenamente sus funciones biológicas normales, alimentándose, moviéndose e incluso reproduciéndose como si su largo e infernal viaje cósmico jamás hubiera ocurrido.",
      "El secreto biológico intrínseco detrás de esta asombrosa e incomprensible resistencia casi mística reside fundamentalmente en la extraordinaria y fascinante capacidad celular de los tardígrados para entrar rápidamente en un estado de animación suspendida letárgica, técnicamente conocido por los zoólogos como profunda criptobiosis extrema. Cuando se enfrentan de repente a la desecación masiva severa, temperaturas gélidas letales o la aplastante falta total de oxígeno respirable, estos extraños organismos retraen instintivamente sus ocho extremidades segmentadas, se enrollan de forma defensiva sobre sí mismos en una diminuta forma de barril conocida como \"tun\" y suspenden milagrosamente su delicado metabolismo orgánico hasta un minúsculo 0,01% de su nivel de funcionamiento normal habitual. En este profundo e inerte estado defensivo similar al letargo de la muerte, secretan grandes cantidades de proteínas especiales exclusivas de su especie y producen masivamente azúcares protectores moleculares complejos que vitrifican eficazmente sus frágiles órganos vitales internos, previniendo exitosamente la formación destructiva y letal de microscópicos cristales de hielo puntiagudos y salvaguardando de manera increíble su precioso ADN celular de los potentes y letales embates de la radiación cósmica galáctica desintegradora.",
      "Por otro lado, de forma igualmente asombrosa, los gusanos nematodos de la famosa especie C. elegans han dejado también su asombrosa e imborrable huella imborrable en la historia heroica de la trágica supervivencia biológica espacial extrema, demostrando una notable resistencia al vacío. Tras el terrible y profundamente trágico desastre estructural de la masiva desintegración de reentrada atmosférica del famoso transbordador espacial Columbia en el oscuro y triste año 2003, los compungidos equipos de rescate lograron recuperar milagrosamente, de entre los humeantes e irreconocibles restos retorcidos de la nave esparcidos por vastas áreas de Texas, los intactos e inalterados contenedores biológicos experimentales de resistente aluminio reforzado. En su pequeño y oscuro interior, y para el absoluto y total asombro general de toda la conmovida comunidad científica internacional unida, docenas de pequeñas y frágiles colonias enteras de estos minúsculos y transparentes gusanos microscópicos habían logrado sobrevivir de manera inexplicable al violento e intenso impacto atmosférico, así como también al letal calor extremo generado por el fuego abrazador de la desintegración hipersónica balística, brindando un extraño e inmenso consuelo en medio de la gran desolación y la pérdida incalculable de siete vidas humanas valiosas.",
      "Estos profundos e invaluables descubrimientos biológicos sobre la extrema e insospechada resiliencia natural y fisiológica de la tenaz vida invertebrada microbiana han revitalizado y encendido con gran furor el intenso e incesante debate académico acerca de las antiguas y controvertidas teorías cósmicas de la fascinante panspermia interestelar a lo largo del vasto universo infinito. Si organismos biológicos terrestres tan extraordinariamente duros como los ositos de agua microscópicos y los transparentes nematodos del suelo son genuinamente capaces de soportar sin problemas mayores de manera efectiva las brutales, hostiles y profundamente letales condiciones del abismal espacio exterior, al menos durante breves períodos medibles de días o meses de duración total, no resulta tan descabellado para los rigurosos astrobiólogos plantearse seriamente y considerar de manera analítica que diminutas e invisibles formas de vida primitivas podrían teóricamente haber viajado o logrado sobrevivir cruzando de forma pasiva a través de los inmensos océanos cósmicos interestelares vacíos a bordo de pequeños asteroides rocosos o gélidos cometas portadores de agua y valiosa química orgánica, sembrando de manera accidental e indirecta la milagrosa y prolífica vida en lejanos y prometedores mundos estériles a lo largo de las innumerables galaxias gigantescas de nuestro asombroso y vasto universo infinito."
    ],
    "expandables": [
      {
        "label": "Criptobiosis Letárgica",
        "icon": "zap",
        "text": "Los tardígrados (osos de agua) resisten el vacío sideral y la radiación espacial gracias a la criptobiosis o anhidrobiosis, un estado letárgico reversible donde deshidratan su organismo hasta un 1% de contenido acuoso y sintetizan proteínas intrínsecamente desordenadas específicas (TDPs) que vitrifican el citoplasma celular protector."
      },
      {
        "label": "C. elegans y el Desastre",
        "icon": "clock",
        "text": "Tras la catastrófica desintegración atmosférica del transbordador Columbia en febrero de 2003, los equipos de rescate recuperaron intactos entre los restos en Texas los contenedores de aluminio con cultivos del nematodo Caenorhabditis elegans, los cuales sobrevivieron a la reentrada, calor extremo e impacto balístico con el suelo."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_invertebrados.webp",
    "bannerCaption": "Resistencia Extrema: Tardígrados",
    "fact": "El microscópico tardígrado, en estado de criptobiosis inducida, es capaz de sobrevivir sin protección y de forma completamente pasiva y natural a temperaturas tan increíblemente extremas e impensables como -272 grados Celsius (prácticamente el gélido cero absoluto interestelar sin calor alguno) o tan ardientes y abrazadoras como los destructivos y mortíferos 150 grados Celsius ardientes de calor letal abrasador destructor continuo que derretiría muchos plásticos densos resistentes de manera inmediata veloz; esta invulnerabilidad extrema y su espectacular y milagrosa asombrosa fortaleza aparente ha llevado a los ingenieros de la NASA y la ciencia aeroespacial profunda internacional a estudiarlo a fondo y obsesivamente rigurosamente con enorme devoción intensa."
  },
  {
    "id": "tardigrados-espacio",
    "title": "Tardígrados: Los Invencibles del Cosmos",
    "color": "#81C784",
    "btnImage": "/assets/animales/infographic_m4/btn_tardigrados-espacio.webp",
    "image": "/assets/animales/infographic_m4/hero_tardigrados_espacio.webp",
    "content": [
      "Los tardígrados, coloquialmente conocidos como \"osos de agua\" por su peculiar locomoción de ocho patas, son animales microscópicos de entre 0.1 y 1.5 milímetros que habitan en todos los ecosistemas terrestres, desde las cimas del Himalaya hasta los fondos oceánicos abisales. En 2007, el experimento FOTON-M3 de la Agencia Espacial Europea demostró que 3,000 tardígrados de las especies Milnesium tardigradum y Richtersius coronifer podían sobrevivir 10 días en el vacío completo del espacio exterior, expuestos directamente a la radiación UV del sol sin ninguna protección. Esta hazaña la habían logrado entrando en un estado llamado criptobiosis, una suspensión metabólica casi total donde su actividad vital cae por debajo del 0.01% de lo normal.",
      "El mecanismo de supervivencia de los tardígrados se basa en una proteína única que no tiene equivalente en ningún otro phylum animal: la proteína Dsup (Damage Suppressor), descubierta en 2016 por investigadores de la Universidad de Tokio. Esta proteína se envuelve alrededor del ADN como un escudo molecular, bloqueando físicamente el acceso de los radicales libres y la radiación ionizante a la doble hélice genética. Cuando los investigadores transfirieron el gen de Dsup a células humanas cultivadas en laboratorio, la tasa de daño al ADN por radiación UV disminuyó en un 40%, lo que abrió perspectivas directas para el desarrollo de fármacos radioprotectores aplicables en radioterapia oncológica y en la protección de astronautas durante misiones de larga duración.",
      "El experimento TARDIS (Tardigrades in Space) a bordo de la Estación Espacial Internacional demostró en 2011 que estos animales no solo sobreviven al espacio sino que pueden reproducirse después de la exposición. Grupos de tardígrados expuestos durante 18 meses a la microgravedad dentro de la ISS produjeron descendencia fértil con una tasa de eclosión de huevos comparable a la de poblaciones control en tierra, descartando la hipótesis de que la microgravedad dañara irreparablemente sus sistemas reproductivos. Este resultado fue fundamental para confirmar que las adaptaciones extremófilas de los tardígrados son robustas no solo frente al vacío y la radiación, sino también frente a la ausencia de gravedad.",
      "La resistencia de los tardígrados al vacío espacial está mediada por su capacidad de reducir su contenido de agua hasta el 3% del peso corporal total, sustituyendo las moléculas de agua intercelular por una matriz vítrea de trehalosa, un disacárido que funciona como \"vidrio biológico\" preservando la estructura tridimensional de proteínas y membranas celulares. Esta técnica de vitrificación natural fue el modelo que inspiró las técnicas modernas de criopreservación de órganos para trasplante y la liofilización farmacéutica de fármacos termolábiles. Los tardígrados demuestran que la biología evolutiva ha resuelto problemas de ingeniería molecular que aún hoy desafían a la tecnología humana.",
      "La misión Beresheet de Israel, que se estrelló contra la Luna en abril de 2019, llevaba a bordo una muestra de tardígrados deshidratados sin autorización oficial de la comunidad científica internacional — un incidente que generó el primer debate ético formal sobre la posible contaminación biológica de cuerpos celestes con organismos terrestres. Estudios posteriores calcularon que algunos tardígrados probablemente sobrevivieron el impacto en estado criptobiótico, aunque las temperaturas del suelo lunar y la ausencia de agua hacen prácticamente imposible que se reactiven. El episodio aceleró la revisión de los protocolos de protección planetaria de la COSPAR para incluir organismos extremófilos en las regulaciones de contaminación forward."
    ],
    "expandables": [
      {
        "label": "Proteína Dsup",
        "icon": "Atom",
        "text": "El análisis molecular de los tardígrados reveló que poseen una proteína nuclear exclusiva denominada Dsup (Damage Suppressor) que se une físicamente al ADN y forma un escudo biofísico protector que previene la fragmentación de la doble hélice genómica provocada por el impacto de rayos X, radiación gamma y radicales libres en el vacío."
      },
      {
        "label": "Luna Contaminada",
        "icon": "Sparkles",
        "text": "En abril de 2019, la sonda lunar israelí Beresheet se estrelló contra la superficie lunar transportando una cápsula de preservación con miles de tardígrados deshidratados en estado de criptobiosis; la extraordinaria resistencia biológica de estos organismos generó un intenso debate internacional sobre la protección planetaria."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_tardigrados-espacio.webp",
    "bannerCaption": "Tardígrados: Los Invencibles del Cosmos",
    "fact": "En la misión europea TARDIS a bordo de la cápsula Foton-M3 en 2007, ejemplares de las especies Milnesium tardigradum y Richtersius coronifer fueron expuestos directamente al vacío del espacio exterior y a niveles letales de radiación ultravioleta cósmica durante diez días, sobreviviendo y reproduciéndose con normalidad en tierra."
  },
  {
    "id": "elegans-columbia",
    "title": "C. elegans y el Columbia: Sobrevivientes del Desastre",
    "color": "#4FC3F7",
    "btnImage": "/assets/animales/infographic_m4/btn_elegans-columbia.webp",
    "image": "/assets/animales/infographic_m4/hero_elegans_columbia.webp",
    "content": [
      "El 1 de febrero de 2003, el transbordador espacial Columbia se desintegró durante la reentrada atmosférica a 60 km de altitud, causando la muerte de los 7 astronautas a bordo. Sin embargo, entre los escombros recuperados semanas después en Texas y Louisiana, los investigadores encontraron algo extraordinario: colonias vivas y completamente funcionales del nematodo Caenorhabditis elegans, un gusano microscópico de 1 mm de longitud que había sobrevivido la catástrofe en contenedores de aluminio sellados que protegieron sus cápsulas de dormancia de las temperaturas de reentrada, que alcanzaron más de 1,500°C en la superficie exterior del transbordador.",
      "C. elegans se ha convertido en el organismo modelo más importante de la biología espacial por razones muy concretas: tiene exactamente 959 células somáticas cuyo linaje completo está mapeado desde el óvulo fecundado hasta el gusano adulto, su genoma de 100 millones de pares de bases comparte el 40% de sus genes con el genoma humano, y su ciclo de vida de 2-3 semanas permite estudiar generaciones completas en el tiempo de una misión a la ISS. El experimento CELEG en la ISS ha utilizado C. elegans para identificar 2,000 genes que cambian su expresión en microgravedad, de los cuales 500 tienen homólogos directos en el genoma humano.",
      "El análisis genético de las colonias de C. elegans sobrevivientes del Columbia reveló algo inesperado: las poblaciones que habían estado en órbita durante 16 días mostraban cambios de expresión génica que se habían propagado a generaciones posteriores a través de mecanismos epigenéticos, específicamente mediante modificaciones en las marcas de histonas H3K4me3 y H3K27me3. Este fenómeno, denominado \"memoria epigenética de la microgravedad\", demostró que los organismos no solo se adaptan a la microgravedad durante la exposición sino que codifican esa adaptación en un formato hereditario que se transmite a descendientes que nunca estuvieron en el espacio.",
      "El experimento GeneLab en la ISS, que ha analizado más de 200 experimentos con C. elegans desde 2011, ha generado la base de datos más completa de biología molecular espacial existente. Los datos muestran que la microgravedad activa sistemáticamente genes relacionados con el estrés oxidativo, la autofagia celular y la desregulación del reloj circadiano, mientras que suprime genes asociados con la contracción muscular y la señalización neuronal. Sorprendentemente, estos patrones moleculares son similares a los observados durante el envejecimiento acelerado en C. elegans terrestre, reforzando la hipótesis de que la microgravedad actúa como un acelerador del envejecimiento biológico a nivel molecular.",
      "La versatilidad de C. elegans como modelo experimental para la biología espacial está siendo aprovechada para desarrollar contramedidas farmacológicas para astronautas. El compuesto PW1, un inhibidor de la proteína kinasa SGK-1 identificado en experimentos con C. elegans en microgravedad, ha mostrado en pruebas preliminares que preserva la masa muscular en un 60% durante simulaciones de microgravedad en ratones. Esta línea de investigación, iniciada gracias a los experimentos con nematodos en la ISS, podría producir en los próximos 10 años el primer fármaco antiosteoporosis y antiamiotrofia diseñado específicamente para los viajes interplanetarios de larga duración."
    ],
    "expandables": [
      {
        "label": "Memoria Epigenética",
        "icon": "Activity",
        "text": "Los análisis genéticos en Caenorhabditis elegans criados a bordo de la Estación Espacial Internacional demostraron que la microgravedad induce cambios epigenéticos en la metilación del ADN que persisten a lo largo de varias generaciones en tierra, revelando cómo el ambiente espacial imprime una memoria biológica molecular duradera."
      },
      {
        "label": "Fármaco SGK-1",
        "icon": "Microscope",
        "text": "Investigaciones farmacológicas espaciales con el nematodo C. elegans permitieron probar la eficacia de moléculas terapéuticas que regulan la quinasa SGK-1, abriendo prometedoras vías de investigación para prevenir la degradación de fibras musculares y pérdida de masa proteica en astronautas y personas inmovilizadas en cama en la Tierra."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_elegans-columbia.webp",
    "bannerCaption": "C. elegans y el Columbia: Sobrevivientes del Desastre",
    "fact": "El nematodo microscópico Caenorhabditis elegans se convirtió en un símbolo de la resiliencia de la vida tras sobrevivir a la tragedia del transbordador espacial Columbia (STS-107) en 2003 dentro de botes sellados de soporte vital, permitiendo a los genetistas continuar sus estudios sobre expresión génica muscular en microgravedad."
  },
  {
    "id": "peces-zebrafish",
    "title": "Peces Cebra: Vertebrados en Microgravedad",
    "color": "#7986CB",
    "btnImage": "/assets/animales/infographic_m4/btn_peces-zebrafish.webp",
    "image": "/assets/animales/infographic_m4/hero_zebrafish_iss.webp",
    "content": [
      "El pez cebra (Danio rerio) es el único vertebrado que ha completado su desarrollo embrionario completo —desde huevo fertilizado hasta organismo maduro— en microgravedad a bordo de la Estación Espacial Internacional. En el experimento Zebrafish de JAXA (2015-2016), embriones de pez cebra fueron fertilizados en el laboratorio Kibo de la ISS y observados durante las 72 horas críticas de desarrollo que determinan la simetría corporal, la formación del sistema nervioso central y el establecimiento del eje dorsoventral. Los resultados desafiaron la teoría predominante: los embriones desarrollaron simetría bilateral normal y gastrulación correcta, demostrando que la polaridad celular embrionaria no depende de la gravedad como se creía.",
      "Sin embargo, el análisis detallado reveló anomalías específicas en el sistema otolítico —las estructuras de equilibrio del oído interno— que son funcionalmente análogas a los otolitos del oído humano. Los peces cebra desarrollados en microgravedad mostraron otolitos de menor densidad cristalina y mayor variabilidad en tamaño que los controles terrestres, y en el 23% de los individuos los otolitos no se depositaron simétricamente en las dos cámaras. Cuando estos peces fueron devueltos a la gravedad, exhibieron comportamientos de natación anómalos consistentes con desorientación vestibular —nadando en espirales o de costado— que en el 35% de los casos eran permanentes, sin recuperación observable.",
      "El pez medaka (Oryzias latipes), más pequeño y de ciclo reproductivo más rápido que el zebrafish, fue el primer vertebrado en reproducirse en el espacio durante el experimento de la misión STS-65 en 1994. Los medakas fertilizaron huevos, incubaron y eclosionaron larvas funcionales en microgravedad, demostrando que la reproducción sexual de vertebrados es posible fuera de la Tierra. Las larvas eclosionadas en órbita mostraron inicialmente una conducta de natación circular desorientada —dando vueltas hacia el lado oscuro de la pecera en lugar de hacia la fuente de luz—, un comportamiento que los investigadores interpretaron como la ausencia de la referencia gravitacional que normalmente orienta la fototaxis ascendente en los peces.",
      "La transparencia del embrión de pez cebra, que permite observar en tiempo real el desarrollo de órganos internos bajo microscopio sin intervención quirúrgica, lo convierte en una herramienta experimental única en la biología espacial. El experimento Aquatic Habitat en la ISS ha utilizado esta característica para observar la formación de vasos sanguíneos, el latido cardíaco y la mielinización neuronal en tiempo real durante el desarrollo en microgravedad, transmitiendo imágenes de alta resolución a investigadores en tierra. Estas observaciones han revelado que la angiogénesis —la formación de nuevos vasos sanguíneos— procede de forma normal en los primeros 3 días pero muestra retrasos en los días 4-6, coincidiendo con la fase en que la presión hidrostática normalmente impulsa el flujo sanguíneo hacia las extremidades.",
      "Los resultados obtenidos con peces en la ISS tienen implicaciones directas para entender el síndrome visual asociado al vuelo espacial en astronautas humanos, una condición en la que el 70% de los astronautas desarrollan edema del nervio óptico y cambios en la curvatura del cristalino después de misiones de larga duración. Los modelos de pez cebra con genes de presión intraocular modificados están siendo utilizados en el experimento EyeVessel de la ISS para identificar los mecanismos moleculares de la redistribución de fluidos craneales en microgravedad, con el objetivo de desarrollar fármacos que prevengan el deterioro visual permanente en astronautas durante los viajes a Marte."
    ],
    "expandables": [
      {
        "label": "Otolitos Asimétricos",
        "icon": "Activity",
        "text": "Durante el desarrollo embrionario en ingravidez, los otolitos vestibulares del pez cebra experimentan un crecimiento ligeramente asimétrico compensado por la estimulación luminosa cenital; los investigadores aprovechan esta plasticidad neuronal para identificar cómo el sistema nervioso central reorganiza los mapas vestibulares."
      },
      {
        "label": "Peces Ciegos al Espacio",
        "icon": "Sparkles",
        "text": "Científicos del Centro Espacial Tsukuba emplearon líneas genéticas mutantes de peces cebra carentes de pigmentación para observar en vivo cómo la microgravedad orbital estimula la actividad de los osteoclastos destructores de hueso, acelerando la búsqueda de nuevos fármacos inhibidores de la osteoporosis senil en la Tierra."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_peces-zebrafish.webp",
    "bannerCaption": "Peces Cebra: Vertebrados en Microgravedad",
    "fact": "El pez cebra (Danio rerio) comparte más del 70% de su genoma funcional con los seres humanos, convirtiéndose en el vertebrado de laboratorio óptimo en el módulo japonés Kibo de la Estación Espacial Internacional para desentrañar los mecanismos genéticos de la pérdida de densidad ósea y envejecimiento vascular en gravedad cero."
  },
  {
    "id": "ratones-reproduccion",
    "title": "Mamíferos en Órbita: El Futuro de la Vida en el Espacio",
    "color": "#FF8A65",
    "btnImage": "/assets/animales/infographic_m4/btn_ratones-reproduccion.webp",
    "image": "/assets/animales/infographic_m4/hero_ratones_iss.webp",
    "content": [
      "La pregunta de si los mamíferos pueden reproducirse con éxito en el espacio tiene implicaciones fundamentales para cualquier proyecto de colonización permanente más allá de la Tierra. Los experimentos con ratones en la ISS han abordado esta pregunta de forma progresiva: primero confirmando que los adultos sobreviven misiones largas (30-90 días en el módulo Rodent Research); luego verificando que las hembras mantienen ciclos estrales relativamente regulares; y más recientemente, enviando espermatozoides liofilizados que permanecieron 288 días en la ISS y produjeron crías sanas tras ser fertilizados en tierra, demostrando que el material genético masculino es viable tras exposición prolongada a la radiación cósmica en microgravedad.",
      "El experimento Mouse Habitat Unit de JAXA demostró en 2016 que grupos de ratones alojados en un hábitat orbital con ruedas de ejercicio mantenían una masa muscular hasta un 25% mayor que los ratones en hábitats sin ejercicio, y presentaban una densidad ósea un 18% más alta. Este resultado transformó la comprensión de las contramedidas para la atrofia muscular y la osteoporosis espacial: el ejercicio físico no es solo un complemento sino una variable biológica esencial que puede compensar parcialmente los efectos de la microgravedad sobre el sistema musculoesquelético de los mamíferos, incluyendo probablemente a los humanos.",
      "Uno de los hallazgos más alarmantes de la investigación con ratones en la ISS fue el descubrimiento de que la exposición a la radiación cósmica —no la microgravedad— es el principal factor de daño al ADN en mamíferos en el espacio. Los ratones expuestos a simuladores de radiación cósmica en tierra mostraron tasas de mutagénesis 4 veces mayores que los ratones en microgravedad sin radiación intensa. La combinación de ambas (como ocurrirá en un viaje a Marte de 9 meses) elevó la tasa de mutaciones a niveles 12 veces superiores al control terrestre, y en el 8% de los animales se observaron indicios tempranos de transformación neoplásica en células hepáticas tras solo 6 semanas de exposición.",
      "El proyecto Space Pup, realizado por el grupo de Teruhiko Wakayama en la Universidad de Yamanashi (Japón), demostró en 2023 que embriones de ratón preservados como blastocistos a bordo de la ISS durante 288 días pueden implantarse exitosamente en úteros de ratonas terrestres y producir crías completamente normales. De 720 blastocistos enviados al espacio, 168 (23.3%) sobrevivieron en condiciones viables y produjeron 168 ratones nacidos vivos con peso, tamaño y fertilidad comparables a los controles. Sin embargo, el análisis epigenómico reveló que estos ratones tenían perfiles de metilación del ADN ligeramente alterados en los genes implicados en el metabolismo energético, con posibles consecuencias a largo plazo aún en estudio.",
      "Las investigaciones con ratones en la ISS han identificado una ventana fisiológica crítica para las colonias espaciales del futuro: los primeros 72 horas post-concepción son el período más vulnerable del desarrollo embrionario mamífero en microgravedad. Los embriones que superan este período crítico muestran tasas de viabilidad comparables a los controles terrestres, mientras que los embriones expuestos a microgravedad durante las primeras 72 horas presentan tasas de anomalías del 34%. Esta información es fundamental para diseñar los protocolos de reproducción de las futuras colonias en la Luna o Marte: los estudios sugieren que instalaciones con gravedad artificial de al menos 0.38g (la gravedad marciana) serían necesarias para los períodos críticos de gestación temprana, mientras que el resto del embarazo podría tolerar niveles gravitacionales más bajos."
    ],
    "expandables": [
      {
        "label": "Esperma en Órbita",
        "icon": "Sparkles",
        "text": "Científicos japoneses de la Universidad de Yamanashi almacenaron espermatozoides liofilizados de ratón en el congelador orbital de la ISS durante casi seis años; tras su retorno a la Tierra y rehidratación para fertilización in vitro, nacieron crías completamente sanas y fértiles con perfiles epigenéticos normales y sin anomalías."
      },
      {
        "label": "Ventana de 72h",
        "icon": "Clock",
        "text": "El estudio de la embriogénesis temprana en roedores en gravedad cero reveló que las primeras 72 horas posteriores a la fertilización requieren fuerzas mecánicas para la polarización celular del blastocisto, un descubrimiento biofísico crucial para planificar la eventual reproducción de fauna y seres humanos en futuras bases lunares."
      }
    ],
    "bannerImage": "/assets/animales/infographic_m4/banner_ratones-reproduccion.webp",
    "bannerCaption": "Mamíferos en Órbita: El Futuro de la Vida en el Espacio",
    "fact": "Experimentos continuos en el módulo biológico de la Estación Espacial Internacional con ratones de laboratorio y muestras espermáticas conservadas en liofilización han demostrado que es biológicamente viable almacenar células reproductoras de mamíferos en órbita sin que la radiación cósmica comprometa la fecundidad posterior en tierra."
  }
];

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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '212, 184, 114',
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
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const IconComp = item.icon === 'atom' ? Atom : item.icon === 'clock' ? Clock : Zap;
  
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
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            {Array.isArray(item.text) ? item.text.map((para, idx) => (
              <p key={idx} style={{
                margin: '0 0 0.8rem', fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {para}
              </p>
            )) : (
              <p style={{
                margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {item.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }}
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
          layoutId="activeDotAnimalesM4"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

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

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px',
      }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none' }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {React.createElement(decoComponents[0], { size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>
        {node.bannerImage && (
                <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden',
                  marginTop: '1.2rem', marginBottom: '0.5rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)', position: 'relative', zIndex: 2 }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || node.title}
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
                    loading="lazy" />
                  {node.bannerCaption && (
                    <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center',
                      marginTop: '0.4rem', fontStyle: 'italic' }}>
                      {node.bannerCaption}
                    </p>
                  )}
                </div>
              )}
              {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => <ExpandableSection key={i} item={item} color={node.color} />)}
            </div>
          </div>
        )}
        <motion.div whileHover={{ scale: 1.01 }} style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0', display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>{node.fact}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #D4B872)', borderRadius: '3px' }} />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_AnimalesM4() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'url(/assets/course/animales_pioneros/banner_animales.jpg) center/cover', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem 1rem', overflow: 'hidden' }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_animales.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,12,30,0.95) 0%, rgba(15,10,35,0.85) 40%, rgba(10,12,30,0.95) 100%)', zIndex: 1 }} />
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', border: '1px solid rgba(216,125,74,0.12)', borderRadius: '24px', padding: '2rem', background: 'rgba(10, 12, 30, 0.4)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)' }}>
        <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '20px' }}>
           <h2 style={{ color: '#D4B872', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Gatos y Pioneros Menores</h2>
           <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Exploradores Invertebrados y Felinos en el Espacio</p>
        </div>
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton key={node.id} node={node} index={i} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel key={activeNode} node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          )}
        </AnimatePresence>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Star size={14} /> Fuentes y Bibliografía Científica
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '6px' }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />}
      </AnimatePresence>
    </div>
  );
}
