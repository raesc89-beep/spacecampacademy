'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (La Tierra: El Oasis Tectónico) ───────────────────
function DecoTectonicPlate({ size = 70, color = '#2A9D8F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 35 L25 25 L35 35 L50 20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M10 42 L25 32 L35 42 L50 27" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoGeodynamo({ size = 70, color = '#48CAE4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M30 10 Q15 30 30 50 Q45 30 30 10 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill={color} />
    </svg>
  );
}

function DecoCarbonCycle({ size = 70, color = '#52B788', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
      <path d="M48 30 L42 24 M48 30 L42 36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoOceanWave({ size = 70, color = '#0077B6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 25 Q20 15 30 25 T50 25" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <path d="M10 38 Q20 28 30 38 T50 38" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

function DecoLunarOrbit({ size = 70, color = '#E9C46A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="25" cy="30" r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="45" cy="20" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoOxygenMolecule({ size = 70, color = '#70E000', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="26" x2="40" y2="26" stroke={color} strokeWidth="2" />
      <line x1="20" y1="34" x2="40" y2="34" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoOasis({ size = 70, color = '#9B5DE5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="30,12 35,24 48,24 38,32 42,45 30,36 18,45 22,32 12,24 25,24" fill={color} opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'tectonica-de-placas': [DecoTectonicPlate, DecoGeodynamo, DecoCarbonCycle],
  'escudo-magnetico': [DecoGeodynamo, DecoOceanWave, DecoLunarOrbit],
  'termostato-carbono': [DecoCarbonCycle, DecoTectonicPlate, DecoOxygenMolecule],
  'oceanos-y-agua': [DecoOceanWave, DecoCarbonCycle, DecoOasis],
  'la-luna-estabilizadora': [DecoLunarOrbit, DecoTectonicPlate, DecoOceanWave],
  'oxigenacion-biosfera': [DecoOxygenMolecule, DecoCarbonCycle, DecoOasis],
  'oasis-habitabilidad': [DecoOasis, DecoOceanWave, DecoGeodynamo],
};

const BIBLIOGRAPHY = [
  'Stern, R. J. (2002). "Subduction zones". Reviews of Geophysics, 40(4), 3-1-3-38.',
  'Tarduno, J. A., et al. (2010). "Geodynamo, paleointensity, and the Hadean to Archean Earth\'s magnetic field". Science, 327(5970), 1238-1240.',
  'Walker, J. C., Hays, P. B., & Kasting, J. F. (1981). "A negative feedback mechanism for the long-term stabilization of Earth\'s surface temperature". Journal of Geophysical Research: Oceans, 86(C10), 9776-9782.',
  'Laskar, J., Joutel, F., & Robutel, P. (1993). "Stabilization of the Earth\'s obliquity by the Moon". Nature, 361(6413), 615-617.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "tectonica-de-placas",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_tectonica-de-placas.webp",
    "title": "Tectónica de Placas",
    "color": "#2A9D8F",
    "btnImage": "/assets/rocosos/infographic_m4/btn_tectonica-de-placas.webp",
    "image": "/assets/rocosos/infographic_m4/hero_tectonica-de-placas.webp",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_tectonica-de-placas.webp",
    "diagramCaption": "Tectónica de placas activa: subducción litosférica, convección del manto y dorsales oceánicas",
    "content": [
      "La Tierra es el único cuerpo planetario conocido en todo el Sistema Solar que posee un régimen geodinámico de tectónica de placas activo y continuo. A diferencia de las litosferas de placa única rígida e inmóvil que recubren a Mercurio, Marte o la Luna, la litosfera terrestre se encuentra fragmentada en más de una docena de placas tectónicas rígidas mayores y menores que flotan, colisionan y se deslizan sobre la astenosfera viscosa subyacente.",
      "El motor termodinámico primordial que impulsa este movimiento es la convección térmica del manto terrestre combinada con la fuerza dominante de tirón de placa (slab pull): cuando una placa oceánica fría y densa envejece, se hidrata y se metamorfosea en eclogita densa, hundiéndose gravitatoriamente en las zonas de subducción hacia las profundidades del manto, arrastrando tras de sí al resto del lecho oceánico con una fuerza colosal.",
      "En las dorsales centro-oceánicas divergentes, la descompresión adiabática del manto ascendente funde la peridotita y genera basalto magmático nuevo, creando lecho marino continuo a un ritmo de dos a diez centímetros por año. En los bordes convergentes destructivos, la placa subducente recicla agua, sedimentos ricos en carbono y minerales hidratados hacia el interior profundo, reinyectándolos gradualmente a través de arcos volcánicos.",
      "Este incesante reciclaje litosférico renueva por completo toda la corteza oceánica del planeta cada doscientos millones de años, impidiendo que el lecho marino conserve cicatrices de impacto antiguas. En contraste, la corteza continental es químicamente félsica, ligera y boyante (compuesta mayoritariamente por granitos y andesitas de densidad inferior a dos punto ocho gramos por centímetro cúbico), lo que evita su subducción y preserva cratones de hasta cuatro mil millones de años.",
      "La presencia de agua líquida en superficie es el catalizador reológico indispensable que hace posible la tectónica de placas terrestre: el agua percola en las fallas, hidrata los minerales silicatados del manto como la serpentina y reduce drásticamente la viscosidad y fricción en la base litosférica, impidiendo que la corteza se suelde rígidamente en un casquete inerte como sucedió en el reseco y ardiente Venus."
    ],
    "fact": "La Tierra es el único planeta con tectónica de placas activa, impulsada por la convección del manto y el tirón gravitatorio de placas frías en subducción; este proceso renueva la corteza oceánica cada doscientos millones de años y requiere la lubricación del agua líquida para evitar que la litosfera se vuelva rígida.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad media del desplazamiento relativo de las placas tectónicas terrestres oscila entre uno y quince centímetros anuales (la placa de Nazca es una de las más rápidas a casi diez centímetros por año), un ritmo idéntico a la tasa biológica de crecimiento de las uñas humanas a lo largo de una vida."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los minerales del manto terrestre en la zona de transición a más de cuatrocientos kilómetros de profundidad (como la ringwoodita y wadsleyita) contienen atrapada en sus estructuras cristalinas hidratadas tanta agua ligada químicamente como la suma total de todos los océanos superficiales combinados."
      }
    ]
  },
  {
    "id": "escudo-magnetico",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_escudo-magnetico.webp",
    "title": "Escudo Magnético",
    "color": "#48CAE4",
    "btnImage": "/assets/rocosos/infographic_m4/btn_escudo-magnetico.webp",
    "image": "/assets/rocosos/infographic_m4/hero_escudo-magnetico.webp",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_escudo-magnetico.webp",
    "diagramCaption": "Geodinamo del núcleo externo terrestre y magnetosfera con cinturones de radiación de Van Allen",
    "content": [
      "A dos mil novecientos kilómetros de profundidad bajo la superficie terrestre, en la frontera entre el manto silicatado y el núcleo, opera el generador electromagnético más poderoso de los mundos terrestres: la geodinamo. Este mecanismo físico se aloja en el núcleo externo, una colosal capa de dos mil doscientos sesenta kilómetros de espesor compuesta por una aleación líquida supercaliente de hierro y níquel enriquecida con elementos ligeros como silicio y azufre.",
      "La combinación de la convección térmica vigorosa provocada por el enfriamiento del planeta y la rápida rotación de la Tierra sobre su eje (fuerza de Coriolis) organiza el flujo del hierro metálico fundido en columnas cilíndricas helicoidales paralelas al eje de rotación. Al ser el hierro un fluido conductor de electricidad, este movimiento turbulento genera gigantescas corrientes eléctricas que autoinducen y sostienen un potente campo magnético dipolar.",
      "El campo magnético emerge desde el interior y se proyecta decenas de miles de kilómetros hacia el vacío interplanetario, estructurando una cavidad defensiva invisible denominada magnetosfera. En el punto subsolar diurno expuesto directamente al Sol, la presión del viento solar comprime la magnetopausa hasta unas diez a doce veces el radio terrestre (unos sesenta y cinco mil kilómetros), mientras que en el lado nocturno el campo se extiende en una cola magnética de más de seiscientos mil kilómetros.",
      "Esta armadura electromagnética desvía el viento solar cargado de protones y electrones de alta energía que viajan a más de cuatrocientos kilómetros por segundo, así como los rayos cósmicos galácticos más destructivos. Sin este escudo protector, la radiación ionizante habría erosionado de forma progresiva la atmósfera terrestre mediante decapado de iones (ion stripping), disipando el vapor de agua y esterilizando la superficie tal como ocurrió en Marte.",
      "Parte de las partículas energéticas del viento solar quedan temporalmente atrapadas en dos regiones toroidales concéntricas denominadas los Cinturones de Radiación de Van Allen. Durante intensas tormentas geomagnéticas, estas partículas son canalizadas por las líneas de campo hacia las regiones polares, excitando átomos de oxígeno y nitrógeno en la ionosfera para desencadenar el brillante espectáculo visual de las auroras boreales y australes."
    ],
    "fact": "La geodinamo en el núcleo externo de hierro líquido de la Tierra genera un campo magnético dipolar que estructura la magnetosfera; este escudo desvía el viento solar y la radiación cósmica hasta más de sesenta y cinco mil kilómetros de altitud, evitando la pérdida de la atmósfera y el agua tal como ocurrió en Marte.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El campo magnético terrestre experimenta inversiones geomagnéticas completas de polaridad a intervalos estadísticos irregulares (en promedio cada trescientos a setecientos mil años), donde el polo norte magnético pasa a ser polo sur; la última inversión completa, el evento Brunhes-Matuyama, ocurrió hace setecientos ochenta mil años."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Numerosas especies biológicas como las palomas mensajeras, las tortugas marinas laúd, las ballenas jorobadas e incluso ciertas bacterias microscópicas contienen biomateriales con nanocristales de magnetita (Fe3O4) en sus tejidos, permitiéndoles orientarse y navegar a escala global mediante magnetorrecepción cuántica."
      }
    ]
  },
  {
    "id": "termostato-carbono",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_termostato-carbono.webp",
    "title": "Termostato Global",
    "color": "#52B788",
    "btnImage": "/assets/rocosos/infographic_m4/btn_termostato-carbono.jpg",
    "image": "/assets/rocosos/infographic_m4/hero_termostato-carbono.jpg",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_termostato-carbono.webp",
    "diagramCaption": "Termostato biogeoquímico silicato-carbonato: secuestro mineral de carbono y reciclaje volcánico",
    "content": [
      "Uno de los misterios más profundos de la astrofísica planetaria es cómo la Tierra ha logrado conservar océanos de agua líquida y temperaturas habitables casi ininterrumpidas a lo largo de cuatro mil millones de años, a pesar de que el Sol primitivo era entre un veinticinco y un treinta por ciento menos luminoso en el Arcaico (la paradoja del Sol joven y débil). La clave de esta asombrosa estabilidad climática reside en el ciclo geoquímico silicato-carbonato.",
      "Formalizado en 1981 por los geocientíficos James Walker, Paul Hays y James Kasting, este ciclo biogeoquímico funciona como un termostato de retroalimentación negativa autorregulador a escala planetaria. El dióxido de carbono presente en el aire se disuelve en las gotas de lluvia formando ácido carbónico diluido; este ácido ataca químicamente las rocas continentales de silicato (meteorización química), liberando iones de calcio y bicarbonato solubles.",
      "Los ríos transportan estos iones disueltos hacia los océanos globales, donde organismos marinos planctónicos y corales los combinan metabólicamente para construir conchas y exoesqueletos de carbonato de calcio. Cuando estos seres mueren, sus caparazones precipitan en el lecho abisal formando extensas plataformas de roca caliza sedimentaria, sepultando de forma permanente el carbono atmosférico en la corteza terrestre.",
      "Posteriormente, la cinta transportadora de la tectónica de placas subduce estas rocas calizas hacia el manto caliente; a presiones y temperaturas metamórficas elevadas, el carbonato de calcio reacciona con el cuarzo (descarbonatación térmica), liberando nuevamente dióxido de carbono gaseoso que asciende a través de plumas volcánicas para ser devuelto a la atmósfera, completando un ciclo que tarda unos quinientos mil años por vuelta.",
      "Si la Tierra se calienta excesivamente, la evaporación oceánica y las lluvias aumentan, acelerando la meteorización de silicatos y capturando más dióxido de carbono de la atmósfera para enfriar el planeta. Si el planeta se congela, las lluvias y la meteorización se detienen por completo mientras los volcanes continúan emitiendo gas sin tregua, acumulando efecto invernadero hasta derretir el hielo en un equilibrio perfecto."
    ],
    "fact": "El ciclo geoquímico silicato-carbonato actúa como el termostato natural autorregulador de la Tierra: la lluvia y meteorización de silicatos retiran dióxido de carbono del aire para enterrarlo como roca caliza oceánica, mientras los volcanes lo reinyectan, manteniendo temperaturas estables a lo largo de eones.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Más del noventa y nueve punto nueve por ciento de todo el inventario de carbono de la Tierra (más de cien millones de gigatoneladas) se encuentra atrapado de forma segura en las rocas sedimentarias de caliza y lutitas de la corteza, evitando que una masa letal de gas cree un efecto invernadero desbocado semejante al de Venus."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante las glaciaciones globales del Neoproterozoico (hace unos setecientos millones de años), cuando la Tierra se convirtió en una bola de nieve helada de polo a polo, el termostato de carbono salvó al planeta: al frenarse la lluvia, el dióxido de carbono volcánico se acumuló durante millones de años hasta derretir el hielo."
      }
    ]
  },
  {
    "id": "oceanos-y-agua",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_oceanos-y-agua.webp",
    "title": "Océanos Líquidos",
    "color": "#0077B6",
    "btnImage": "/assets/rocosos/infographic_m4/btn_oceanos-y-agua.webp",
    "image": "/assets/rocosos/infographic_m4/hero_oceanos-y-agua.webp",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_oceanos-y-agua.webp",
    "diagramCaption": "Circulación termohalina global y redistribución de calor en los 1,332 millones de km³ de océanos",
    "content": [
      "Observada desde los confines del espacio interplanetario, la Tierra se distingue como un fascinante 'punto azul pálido'. Es el único mundo del Sistema Solar donde el agua no solo existe en abundancia, sino que coexiste de manera termodinámicamente estable en sus tres estados de agregación fundamentales: hielo sólido en las banquisas y glaciares, vapor gaseoso en la atmósfera y agua líquida en la colosal hidrosfera oceánica.",
      "Los océanos cubren aproximadamente el setenta punto ocho por ciento de la superficie del globo terrestre (más de trescientos sesenta y un millones de kilómetros cuadrados) y albergan un volumen líquido colosal de mil trescientos treinta y dos millones de kilómetros cúbicos de agua. Su profundidad media se sitúa en tres mil seiscientos ochenta y dos metros, alcanzando su abismo máximo en la fosa de las Marianas a casi once mil metros.",
      "Esta masa líquida omnipresente actúa como un amortiguador térmico planetario indispensable. Gracias al extraordinariamente elevado calor específico del agua (cuatro mil ciento ochenta y cuatro julios por kilogramo kelvin), los océanos absorben ingentes cantidades de calor solar en las franjas ecuatoriales y tropicales sin experimentar cambios bruscos de temperatura, redistribuyéndolo hacia las latitudes polares mediante la circulación termohalina global.",
      "Asimismo, la condición líquida del agua la consagra como el disolvente universal supremo para los procesos bioquímicos. Al ser una molécula polar provista de enlaces de puente de hidrógeno, el agua líquida facilita la solubilidad de sales minerales, la estabilización de cadenas de nucleótidos y proteínas, y el transporte metabólico de nutrientes y desechos indispensables para la edificación de las estructuras celulares vivas.",
      "Las investigaciones cosmoquímicas sobre la firma isotópica de deuterio a hidrógeno (D/H) en las aguas oceánicas terrestres demuestran que gran parte de esta inmensa masa líquida no procedió de cometas de la nube exterior, sino de asteroides hidratados de tipo condrita carbonácea procedentes del Cinturón Principal exterior que bombardearon la Tierra durante su acreción tardía hace más de cuatro mil millones de años."
    ],
    "fact": "Los océanos cubren el 70.8% de la superficie terrestre con 1,332 millones de km³ de agua; su alto calor específico y la circulación termohalina amortiguan el clima global, mientras sus propiedades de solvente polar permitieron el surgimiento de la bioquímica viva a partir de agua suministrada por condritas carbonáceas.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La relación isotópica de deuterio a hidrógeno (D/H) del agua oceánica de la Tierra es de aproximadamente 1.56 x 10^-4 según el estándar de referencia VSMOW, una firma cosmoquímica que coincide con asombrosa precisión con la composición medida en los filosilicatos y arcillas minerales de meteoritos carbonáceos de tipo CI y CM."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si se allanara topográficamente todo el relieve de la corteza de la Tierra eliminando cordilleras continentales y fosas abisales, el volumen total de agua oceánica inundaría la totalidad del planeta bajo un océano uniforme continuo de dos mil setecientos metros de profundidad en todos los puntos del globo."
      }
    ]
  },
  {
    "id": "la-luna-estabilizadora",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_la-luna-estabilizadora.webp",
    "title": "La Luna Estabilizadora",
    "color": "#E9C46A",
    "btnImage": "/assets/rocosos/infographic_m4/btn_la-luna-estabilizadora.jpg",
    "image": "/assets/rocosos/infographic_m4/hero_la-luna-estabilizadora.jpg",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_la-luna-estabilizadora.webp",
    "diagramCaption": "Estabilización gravitatoria de la oblicuidad terrestre en 23.5° y mareas por el influjo lunar",
    "content": [
      "La Tierra cuenta con una compañera orbital anómalamente gigantesca en relación con el tamaño de los planetas rocosos del Sistema Solar. Con un diámetro ecuatorial de tres mil cuatrocientos setenta y cuatro kilómetros (más del veintisiete por ciento del diámetro terrestre) y una relación de masas de uno a ochenta y uno punto tres, el sistema Tierra-Luna se comporta gravitatoriamente como un planeta doble coordinado.",
      "Originada hace cuatro mil quinientos diez millones de años tras el impacto cataclísmico rasante de un protoplaneta del tamaño de Marte bautizado como Tea contra la proto-Tierra en consolidación, la Luna ha desempeñado un papel geofísico insustituible: actúa como un ancla gravitatoria estabilizadora que frena la oscilación caótica del eje de rotación de nuestro planeta a lo largo de escalas temporales de millones de años.",
      "En la actualidad, la oblicuidad axial de la Tierra respecto al plano de su órbita eclíptica se sitúa en veintitrés punto cuarenta y cuatro grados, variando de forma rítmica y suave entre veintidós punto uno y veinticuatro punto cinco grados cada cuarenta y un mil años. Esta oscilación sumamente estrecha garantiza la alternancia regular de las cuatro estaciones climáticas y evita colapsos meteorológicos extremos en el planeta.",
      "Los modelos dinámicos de Jacques Laskar en el Observatorio de París demostraron que, en ausencia de la gigantesca atracción lunar, las perturbaciones gravitacionales combinadas de Júpiter y Saturno provocarían que la inclinación axial de la Tierra oscilara caóticamente entre cero y ochenta y cinco grados (como sucede en Marte), desatando glaciaciones ecuatoriales y la ebullición estacional de los casquetes polares.",
      "Simultáneamente, la fricción de las mareas gravitacionales ejercidas por la Luna sobre los océanos terrestres disipa energía cinética y transfiere momento angular desde el giro del planeta hacia la órbita lunar. Este frenado secular alarga la duración del día terrestre en aproximadamente dos punto tres milisegundos por siglo, forzando a la Luna a alejarse en espiral a una tasa medida de tres punto ochenta y dos centímetros por año."
    ],
    "fact": "La Luna estabiliza gravitatoriamente la oblicuidad del eje terrestre en 23.5 grados, evitando oscilaciones caóticas de hasta 85 grados que habrían destruido la estabilidad climática; además, la fricción de marea oceánica alarga el día en 2.3 milisegundos por siglo y aleja a la Luna 3.8 cm anualmente.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los reflectores retro-láser instalados en el suelo lunar por los astronautas de las misiones Apolo 11, 14 y 15 y los rovers soviéticos Lunojod permiten a los científicos medir la distancia Tierra-Luna con pulsos láser de picosegundos, confirmando la tasa exacta de alejamiento orbital de treinta y ocho punto dos milímetros por año."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Hace cuatro mil millones de años, la Luna orbitaba mucho más cerca de la Tierra (a solo veinticinco mil kilómetros frente a los trescientos ochenta y cuatro mil kilómetros actuales), lo que hacía que el día terrestre durara apenas seis horas y desataba mareas oceánicas colosales de cientos de metros de altura dos veces al día."
      }
    ]
  },
  {
    "id": "oxigenacion-biosfera",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_oxigenacion-biosfera.webp",
    "title": "La Gran Oxidación",
    "color": "#70E000",
    "btnImage": "/assets/rocosos/infographic_m4/btn_oxigenacion-biosfera.jpg",
    "image": "/assets/rocosos/infographic_m4/hero_oxigenacion-biosfera.jpg",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_oxigenacion-biosfera.webp",
    "diagramCaption": "La Gran Oxidación: fotosíntesis por cianobacterias y precipitación de formaciones de hierro bandeado",
    "content": [
      "Durante la primera mitad de la historia geológica de la Tierra, durante los eones Hádico y Arcaico, la atmósfera terrestre carecía casi por completo de oxígeno diatómico libre (su concentración era inferior al cero punto cero cero uno por ciento del nivel actual). El aire primordial estaba dominado por nitrógeno molecular, dióxido de carbono, metano volcánico y vapor de agua en equilibrio reductor anóxico.",
      "Esta química atmosférica reductora experimentó una revolución radical hace aproximadamente dos mil cuatrocientos millones de años durante el Paleoproterozoico, como resultado directo de una innovación biológica sin parangón: el surgimiento de la fotosíntesis oxigénica en las cianobacterias primitivas, las cuales comenzaron a utilizar la luz solar para disociar moléculas de agua y liberar oxígeno molecular gaseoso como subproducto metabólico.",
      "Este evento trascendental se conoce como la Gran Oxidación (Great Oxidation Event o GOE). Inicialmente, todo el oxígeno liberado fue absorbido por gigantescos sumideros geoquímicos: reaccionó con el hierro ferroso disuelto en los océanos arcaicos, precipitándolo como óxido férrico insoluble y depositando las colosales Formaciones de Hierro Bandeado (BIFs) que hoy constituyen las mayores reservas minerales de hierro explotadas por la humanidad.",
      "Una vez saturados y oxidados los océanos y los minerales superficiales, el oxígeno comenzó a fugarse e invadir de forma masiva la troposfera. Al ascender hacia la estratosfera alta, la fotodisociación solar del oxígeno molecular por radiación ultravioleta de longitud de onda corta engendró la capa de ozono (O3), levantando un filtro fotoprotector insustituible que bloqueó los letales rayos ultravioleta UV-B y UV-C.",
      "La formación del escudo de ozono posibilitó que la vida abandonara los refugios acuáticos profundos y colonizara las superficies continentales secas. La biosfera demostró de este modo ser una fuerza geofísica de primer orden, capaz de remodelar la corteza mineral del planeta y alterar para siempre la composición atmosférica y el balance radiativo de un mundo rocoso."
    ],
    "fact": "La Gran Oxidación (hace 2,400 millones de años), impulsada por la fotosíntesis oxigénica de las cianobacterias primitivas, precipitó el hierro disuelto en los mares formando colosales rocas bandeado de hierro e inyectó oxígeno molecular en la atmósfera, originando la capa de ozono que permitió la colonización de la tierra firme.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La inyección masiva de oxígeno durante la Gran Oxidación oxidó el abundante metano atmosférico transformándolo en dióxido de carbono y agua; dado que el metano es un gas de efecto invernadero veinticinco veces más potente, su eliminación precipitó a la Tierra en la severa glaciación global Huroniana de trescientos millones de años."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Antes de la Gran Oxidación existían unos mil quinientos minerales diferentes en la corteza terrestre; la presencia del oxígeno molecular reactivo interactuando con los elementos de la corteza generó más de dos tercios de las cinco mil ochocientas especies minerales que hoy clasifica la mineralogía moderna."
      }
    ]
  },
  {
    "id": "oasis-habitabilidad",
    "bannerImage": "/assets/rocosos/infographic_m4/banner_oasis-habitabilidad.webp",
    "title": "Ecuación de Habitabilidad",
    "color": "#9B5DE5",
    "btnImage": "/assets/rocosos/infographic_m4/btn_oasis-habitabilidad.webp",
    "image": "/assets/rocosos/infographic_m4/hero_oasis-habitabilidad.webp",
    "diagramImage": "/assets/rocosos/infographic_m4/diagram_oasis-habitabilidad.webp",
    "diagramCaption": "Ecuación de habitabilidad: convergencia de zona habitable estelar, geodinamo y biosfera activa",
    "content": [
      "La habitabilidad de la Tierra no es el fruto de una única cualidad fortuita, sino el resultado armónico y sinérgico de una intrincada constelación de factores astronómicos, geofísicos y biogeoquímicos operando simultáneamente a lo largo de escalas temporales de miles de millones de años. La ciencia planetaria contemporánea define este equilibrio multivariable como la arquitectura holística de la habitabilidad.",
      "En el plano astronómico, la Tierra orbita dentro de la Zona de Habitabilidad Circunestelar Continua de una estrella enana amarilla de tipo espectral G2V, cuya vida en la secuencia principal de diez mil millones de años suministra estabilidad fotométrica y radiativa prolongada. Asimismo, la masa planetaria de una masa terrestre exacta proporciona la gravedad superficial necesaria para retener una atmósfera sin atrapar un sofocante manto de hidrógeno.",
      "En el plano geofísico, el calor remanente y el decaimiento radiactivo sostienen la geodinamo en el núcleo externo y la tectónica de placas en la litosfera, garantizando el reciclaje continuo de nutrientes y el blindaje frente al viento solar. La Luna masiva actúa como balancín orbital manteniendo la oblicuidad climática, mientras la hidrosfera modera las fluctuaciones de temperatura y sustenta la biosfera.",
      "La vida no es un mero inquilino pasivo, sino un engranaje activo y coconstructor de la habitabilidad planetaria. Al alterar la atmósfera con oxígeno molecular, acelerar la meteorización continental mediante el suelo orgánico y modular el ciclo del carbono, la biosfera terrestre ajusta activamente las condiciones físico-químicas del planeta, asegurando su propia continuidad evolutiva.",
      "Este conocimiento fundamenta la astrobiología moderna: al buscar vida en exoplanetas rocosos con observatorios como el telescopio espacial James Webb y los futuros telescopios terrestres gigantes de treinta metros, los astrónomos no solo buscan agua líquida, sino biosignaturas combinadas de desequilibrio químico atmosférico (como la coexistencia de metano y oxígeno/ozono) que revelen el latido biogeoquímico de una nueva Tierra."
    ],
    "fact": "La habitabilidad de la Tierra es un equilibrio armónico entre su posición en la zona habitable, la geodinamo protectora, la tectónica de placas recicladora, la estabilidad orbital inducida por la Luna y la biosfera activa, sirviendo como el patrón científico primordial para buscar exoplanetas habitables en la galaxia.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El Índice de Similitud con la Tierra (Earth Similarity Index o ESI) es una escala normalizada entre cero y uno formulada por el Laboratorio de Habitabilidad Planetaria de Arecibo que cuantifica el grado de analogía física de un exoplaneta evaluando cuatro parámetros geométricos: radio medio, densidad aparente, velocidad de escape y temperatura de equilibrio."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La coexistencia simultánea de cantidades mensurables de oxígeno molecular libre (veintiún por ciento) y metano (una punto ocho partes por millón) en la atmósfera terrestre es una anomalía termodinámica imposible sin la presencia activa de la vida, constituyendo la principal 'biofirma en desequilibrio' buscada por los astrónomos en exoplanetas."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,20,25,0.92) 0%, rgba(12,28,30,0.88) 40%, rgba(8,15,20,0.95) 100%)',
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
      <RockyDustField color1="42, 157, 143" color2="72, 202, 228" />
      <RocososHeader title="LA TIERRA: EL OASIS TECTÓNICO" subtitle="EL PLANETA AZUL Y HABITABLE" primaryColor="#2A9D8F" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #2A9D8F, #48CAE4)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
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

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
                Selecciona uno de los 7 módulos superiores para explorar las maravillas de la Tierra.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #2A9D8F60' }}>
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

function RockyDustField({ color1 = '42, 157, 143', color2 = '72, 202, 228' }) {
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
      hue: Math.random() > 0.5 ? color1 : color2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
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
  }, [color1, color2]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function RocososHeader({ title, subtitle, primaryColor }) {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: `drop-shadow(0 0 12px ${primaryColor}40)` }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM4)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={primaryColor}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill={primaryColor} opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="hdrGradM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill={primaryColor} fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">{title}</text>
        <text x="300" y="95" textAnchor="middle" fill={primaryColor} opacity="0.7" fontSize="11" fontFamily="monospace" letterSpacing="2">{subtitle}</text>
      </svg>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.15)'}`,
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
          layoutId={`activeDot_${node.id}`}
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
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
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(12, 22, 25, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'Fase A' : i === 1 ? 'Fase B' : 'Fase C'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}
        {node.bannerImage && (
                <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || ''}
                       style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                  {node.bannerCaption && (
                    <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                                fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Diagram Image (4ª Imagen: Esquema Técnico) --- */}
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

                </div>
              )}
              {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
