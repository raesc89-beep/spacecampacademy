'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Asteroides M2 themed: Meteoros y Cráteres) ───────
function DecoMeteor({ size = 70, color = '#FF7043', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M45 10 L20 35 L12 45 L5 55 L15 48 L25 40 L50 15 Z" fill={color} opacity="0.4" />
      <circle cx="45" cy="15" r="5" fill={color} opacity="0.9" />
      <line x1="45" y1="15" x2="10" y2="50" stroke={color} strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
    </svg>
  );
}

function DecoBolide({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="8" fill={color} opacity="0.8" />
      <path d="M30 6 L30 54 M6 30 L54 30 M13 13 L47 47 M47 13 L13 47" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoCrater({ size = 70, color = '#AB47BC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="30" cy="35" rx="24" ry="12" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="16" ry="7" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <path d="M30 35 L30 25 M26 35 L26 28 M34 35 L34 28" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M6 35 C15 20 45 20 54 35" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoShockwave({ size = 70, color = '#26A69A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M10 50 Q30 10 50 50" fill="none" stroke={color} strokeWidth="3" opacity="0.8" />
      <path d="M16 52 Q30 20 44 52" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <path d="M22 54 Q30 30 38 54" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="22" r="3" fill={color} />
    </svg>
  );
}

function DecoAtmosphere({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 45 C15 25 45 25 55 45" fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
      <path d="M10 35 C20 18 40 18 50 35" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
      <circle cx="30" cy="18" r="4" fill={color} opacity="0.8" />
      <line x1="30" y1="18" x2="30" y2="38" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoTekTite({ size = 70, color = '#EC407A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 10 Q48 20 40 40 Q30 52 18 42 Q10 28 30 10 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="28" cy="26" r="3" fill={color} opacity="0.6" />
      <path d="M22 34 Q30 42 36 32" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'viaje-atmosferico': [DecoMeteor, DecoAtmosphere, DecoBolide],
  'diferencia-terminos': [DecoAtmosphere, DecoMeteor, DecoTekTite],
  'tipos-meteoritos': [DecoTekTite, DecoBolide, DecoCrater],
  'formacion-crateres': [DecoCrater, DecoShockwave, DecoMeteor],
  'impacto-chicxulub': [DecoShockwave, DecoCrater, DecoAtmosphere],
  'lluvias-estrellas': [DecoBolide, DecoMeteor, DecoAtmosphere],
  'meteoritos-famosos': [DecoAtmosphere, DecoTekTite, DecoCrater],
};

const BIBLIOGRAPHY = [
  'Chyba, C. F. et al. (1993). "The 1908 Tunguska explosion: atmospheric disruption of a stony asteroid", Nature, 361, 40-44.',
  'Alvarez, L. W. et al. (1980). "Extraterrestrial cause for the Cretaceous-Tertiary extinction", Science, 208(4448), 1095-1108.',
  'Popova, O. P. et al. (2013). "Chelyabinsk airburst: damage assessment, recovery of meteorites, and characterization", Science, 342(6162), 1069-1073.',
  'Melosh, H. J. (1989). "Impact Cratering: A Geologic Process", Oxford University Press.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "viaje-atmosferico",
    "title": "La Entrada Atmosférica",
    "color": "#FF6B6B",
    "btnImage": "/assets/asteroides/infographic_m2/btn_viaje-atmosferico.webp",
    "image": "/assets/asteroides/infographic_m2/hero_viaje-atmosferico.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_viaje-atmosferico.webp',
    bannerCaption: 'Entrada atmosférica hipersónica y formación del cono de ablación',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_viaje-atmosferico.webp',
    diagramCaption: 'Fases de la reentrada hipersónica: onda de choque, ablación térmica y caída oscura',
    "video": {
      "src": "https://drive.usercontent.google.com/download?id=1Xy8G2VzH9j8V4K0L1M2N3P4Q5R6S7T8U&export=download&authuser=0",
      "title": "Entrada Atmosférica"
    },
    "content": [
      "Cuando un fragmento rocoso desprendido de un asteroide o cometa se aproxima a la Tierra, penetra en la atmósfera a velocidades hiperbólicas que oscilan entre once y setenta y dos kilómetros por segundo. A estas velocidades extremas, el aire por delante del bólido no tiene tiempo de apartarse aerodinámicamente, comprimiéndose de forma casi instantánea en una violenta onda de choque frontal que eleva la temperatura del gas comprimido por encima de los cinco mil grados centígrados.",
      "Contrario a la creencia popular extendida, el calor abrasador que rodea a un meteoro no se produce principalmente por la fricción mecánica con el aire, sino por la compresión adiabática del aire atmosférico en el frente de choque. Este gas sobrecalentado se ioniza rápidamente, despojando a los átomos de oxígeno y nitrógeno de sus electrones periféricos y generando una columna de plasma brillante visible desde el suelo durante la noche a más de cien kilómetros de altitud.",
      "Durante esta fase crítica en la mesosfera (entre ochenta y cincuenta kilómetros sobre el nivel del mar), el bólido experimenta una intensa ablación térmica. El calor funde y vaporiza las capas superficiales de roca y metal, arrancándolas en forma de diminutas gotas fundidas que se solidifican instantáneamente en micrometeoritos y esferas vítreas. En la gran mayoría de los casos, la ablación destruye más del noventa al noventa y cinco por ciento de la masa original antes de que el objeto logre desacelerar.",
      "Si el meteoroide posee una masa sustancial y una estructura interna coherente, la resistencia del aire frena gradualmente el cuerpo hasta que su velocidad supersónica cae por debajo del régimen hipersónico. En ese instante, la presión dinámica supera la resistencia a la fractura de la roca, provocando frecuentemente una o varias fragmentaciones explosivas que generan ondas sonoras y estampidos sónicos audibles en decenas de kilómetros a la redonda.",
      "Una vez que la roca se desacelera a unos pocos cientos de kilómetros por hora, la ablación se detiene por completo en lo que los científicos denominan el 'punto de vuelo oscuro'. A partir de esa cota (generalmente situada a diez o quince kilómetros de altitud), el remanente rocoso cae en trayectoria balística puramente gravitatoria a velocidad terminal, enfriándose rápidamente en el gélido aire troposférico antes de impactar contra la superficie de la Tierra."
    ],
    "fact": "La estela brillante e incandescente de un meteoro no es causada por fricción mecánica sino por la compresión adiabática del aire que calienta el gas a más de 5,000 grados centígrados, ionizando la atmósfera circundante y creando un cilindro de plasma resplandeciente en la mesosfera a más de ochenta kilómetros de altitud.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad mínima de entrada atmosférica es de exactamente 11.2 km/s (impuesta por la velocidad de escape del pozo gravitatorio de la Tierra), mientras que la máxima alcanza los 72.8 km/s en impactos frontales directos de cuerpos en órbita retrógrada respecto al vector de movimiento orbital heliocéntrico de nuestro planeta."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los fragmentos de meteoritos recuperados minutos después de caer en el suelo suelen estar helados al tacto y cubiertos de una delgada corteza negra de fusión vítrea milimétrica, ya que el calor abrasador de la ablación solo penetra los primeros milímetros de la roca durante los pocos segundos que dura la violenta desaceleración."
      }
    ]
  },
  {
    "id": "diferencia-terminos",
    "title": "Meteoroide, Meteoro y Meteorito",
    "color": "#4D96FF",
    "btnImage": "/assets/asteroides/infographic_m2/btn_diferencia-terminos.webp",
    "image": "/assets/asteroides/infographic_m2/hero_diferencia-terminos.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_diferencia-terminos.webp',
    bannerCaption: 'Meteoroide en el espacio, meteoro en la atmósfera y meteorito en superficie',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_diferencia-terminos.webp',
    diagramCaption: 'Clasificación física: meteoroide en el espacio, meteoro en la atmósfera y meteorito en superficie',
    "content": [
      "En el ámbito de las ciencias planetarias y la astronomía observacional, es esencial distinguir rigurosamente entre tres conceptos frecuentemente confundidos: meteoroide, meteoro y meteorito. Cada uno de estos términos describe un estado físico y una localización espacial totalmente diferentes dentro de la evolución dinámica de un fragmento de materia interplanetaria a lo largo de su interacción con el planeta Tierra.",
      "Un meteoroide es el objeto físico mientras todavía viaja por el vacío del espacio interplanetario. La Unión Astronómica Internacional define al meteoroide como un cuerpo sólido natural con dimensiones comprendidas entre treinta micrómetros (el grosor de un cabello humano fino) y un metro de diámetro. Aquellos objetos menores a treinta micrómetros se denominan micrometeoroides o polvo cósmico, mientras que los que superan el metro se clasifican formalmente como asteroides menores.",
      "El meteoro, por el contrario, no es una roca física ni un objeto tangible, sino el fenómeno luminoso y óptico transitorio que se produce cuando un meteoroide penetra en la atmósfera superior de la Tierra e ioniza el aire circundante. Es el trazo de luz popularmente denominado 'estrella fugaz'. Si el meteoro es extraordinariamente brillante y alcanza una magnitud aparente superior a la del planeta Venus (magnitud menor a -4), recibe la denominación científica de bólido o bola de fuego.",
      "Un meteorito es el fragmento residual del meteoroide que logra sobrevivir con éxito al severo proceso de ablación térmica y fragmentación en la atmósfera, tocando físicamente el suelo o el lecho oceánico de nuestro planeta. Cada meteorito recuperado representa una muestra geológica extraterrestre gratuita caída del cielo, permitiendo a los geoquímicos analizar trozos de asteroides, cometas, de la Luna e incluso del planeta Marte sin requerir misiones de retorno de muestras.",
      "Comprender esta secuencia cronológica es fundamental: el fenómeno comienza en el espacio con un meteoroide helado o rocoso en órbita heliocéntrica; continúa en la atmósfera con el destello incandescente de un meteoro que ioniza las moléculas gaseosas en la mesosfera; y culmina en la litosfera de la Tierra si algún trozo rocoso sobrevive al fuego atmosférico y se convierte en un meteorito reposando sobre el terreno."
    ],
    "fact": "La distinción astronómica oficial de la Unión Astronómica Internacional es rigurosa: el meteoroide es la roca sólida viajando por el espacio interplanetario; el meteoro es el fenómeno luminoso de ionización que surca la atmósfera; y el meteorito es la roca superviviente que logra impactar y descansar físicamente en el suelo.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los bólidos de alta energía pueden fragmentarse catastróficamente a altitudes de 20 a 40 kilómetros, liberando presiones dinámicas que igualan detonaciones químicas de cientos de kilotones de TNT y depositando miles de fragmentos de meteoritos en una elipse de dispersión geológica que se extiende por decenas de kilómetros cuadrados."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La atmósfera terrestre intercepta diariamente más de cien toneladas de materia cósmica interplanetaria, pero la inmensa mayoría de este material entra pulverizado en forma de polvo cósmico microscópico que desciende imperceptiblemente como una lluvia mineral continua sobre los tejados urbanos, los bosques y los océanos del planeta."
      }
    ]
  },
  {
    "id": "tipos-meteoritos",
    "title": "Condritas y Acondritas",
    "color": "#FFD93D",
    "btnImage": "/assets/asteroides/infographic_m2/btn_tipos-meteoritos.webp",
    "image": "/assets/asteroides/infographic_m2/hero_tipos-meteoritos.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_tipos-meteoritos.webp',
    bannerCaption: 'Clasificación petrológica: condritas primitivas, acondritas y litosideritos',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_tipos-meteoritos.webp',
    diagramCaption: 'Microestructura petrológica: cóndrulos primitivos, basaltos acondríticos y palasitos metálicos',
    "content": [
      "La clasificación científica de los meteoritos se fundamenta en su composición petrológica, geoquímica e historia térmica. Se dividen en tres grandes familias principales: los meteoritos rocosos o pétreos (que representan más del noventa y cuatro por ciento de todas las caídas confirmadas), los meteoritos metálicos de hierro-níquel (alrededor del cinco por ciento) y los litosideritos mixtos o rocoso-metálicos (aproximadamente el uno por ciento).",
      "Dentro de los meteoritos pétreos, las condritas constituyen el grupo más abundante y primitivo de todo el registro geológico solar. Se caracterizan por contener 'cóndrulos', pequeñas esferas milimétricas de silicatos cristalizados de olivino y piroxeno que se formaron por calentamiento súbito y enfriamiento instantáneo en la nube presolar antes de que existieran los planetas. Al no haber sufrido jamás fusión ígnea en un cuerpo matriz grande, las condritas preservan la receta química elemental intacta del Sol primitivo.",
      "Un subgrupo de valor incalculable para la astrobiología son las condritas carbonáceas, tales como los meteoritos Murchison y Allende. Estas rocas de matriz oscura y rica en agua ligada contienen hasta un tres por ciento de materia orgánica compleja, incluyendo hidrocarburos poliaromáticos, alcoholes, ácidos carboxílicos y más de setenta aminoácidos diferentes, muchos de los cuales no existen en la biología terrestre natural, evidenciando que los ladrillos de la vida se sintetizaron en el espacio.",
      "En contraste con las condritas primitivas, las acondritas son meteoritos rocosos que carecen de cóndrulos porque sufrieron procesos de diferenciación magmática y fusión térmica total en el interior de protoplanetas de gran tamaño. Entre ellas destacan las acondritas del grupo HED (howarditas, eucritas y diogenitas), procedentes de la corteza basáltica y el manto magmático del asteroide 4 Vesta, así como los raros meteoritos de origen lunar y marciano eyectados por grandes impactos.",
      "Finalmente, los litosideritos como las fascinantes palasitas representan las regiones fronterizas entre el núcleo de hierro fundido y el manto rocoso de antiguos planetesimales destruidos por choques colosales. Están formados por una red continua de metal brillante de hierro y níquel que encierra hermosos cristales translúcidos de peridoto y olivino verde esmeralda, ofreciendo una ventana geológica directa al corazón interno de un mundo destruido."
    ],
    "fact": "Las condritas contienen cóndrulos esféricos primitivos que son los minerales más antiguos del Sistema Solar con 4,567 millones de años, mientras que las acondritas volcánicas y las palasitas translúcidas proceden respectivamente de las cortezas basálticas y de los límites núcleo-manto de protoplanetas destruidos por colisiones.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La datación radiométrica de isótopos de plomo-plomo (Pb-Pb) en las inclusiones de calcio y aluminio (CAIs) de condritas carbonáceas ha fijado con precisión atómica absoluta la edad de condensación de los primeros sólidos del disco protoplanetario en exactamente 4,567.3 millones de años atrás, marcando el año cero del Sistema Solar."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las palasitas pulidas son consideradas las rocas más hermosas de todo el universo observable: al cortarse en láminas delgadas, los cristales dorados de peridoto y olivino dejan pasar la luz solar a través de una sólida matriz metálica de hierro y níquel alienígena forjada en la frontera del núcleo de un mundo destruido."
      }
    ]
  },
  {
    "id": "formacion-crateres",
    "title": "Física de los Cráteres",
    "color": "#6BCB77",
    "btnImage": "/assets/asteroides/infographic_m2/btn_formacion-crateres.webp",
    "image": "/assets/asteroides/infographic_m2/hero_formacion-crateres.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_formacion-crateres.webp',
    bannerCaption: 'Morfología de impacto: eyección, ondas de choque y pico central',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_formacion-crateres.webp',
    diagramCaption: 'Mecánica de craterización por impacto: compresión, excavación transitoria y colapso estructural',
    "content": [
      "El cráter de impacto es la forma geológica dominante en la superficie de casi todos los cuerpos sólidos del Sistema Solar, desde la Luna y Mercurio hasta los satélites helados de Júpiter. La excavación de un cráter por un proyectil hiperveloz es un proceso físico extremadamente energético que no responde a una simple excavación mecánica, sino a la liberación instantánea de energía cinética comparable a una detonación nuclear masiva.",
      "La formación de un cráter ocurre a través de tres etapas físicas consecutivas: 1) Etapa de contacto y compresión: el proyectil choca con el terreno diana a velocidades de diez a cuarenta kilómetros por segundo. Se generan ondas de choque biterrestres de presiones monstruosas que superan varios megabares, comprimiendo y fundiendo tanto el asteroide como la roca basal en una fracción de milisegundo.",
      "2) Etapa de excavación: a medida que la onda de choque esférica se expande hacia afuera por la corteza terrestre, se produce una onda de rarefacción o descompresión que empuja el material hacia arriba y hacia los lados. Se abre una gigantesca 'cavidad transitoria' de forma parabólica y miles de toneladas de roca fragmentada son eyectadas violentamente en una cortina cónica de escombros que se deposita alrededor del borde formando el manto de eyección.",
      "3) Etapa de modificación: las paredes empinadas de la cavidad transitoria colapsan por efecto de la gravedad. En cráteres pequeños (de hasta cuatro kilómetros de diámetro en la Tierra), el resultado final es un 'cráter simple' en forma de cuenco hondo, como el famoso Meteor Crater de Arizona. En impactos mayores, el rebote elástico central del piso del cráter levanta una montaña o pico central prominente, formando un 'cráter complejo'.",
      "La energía del impacto induce en los minerales de la corteza un metamorfismo de choque irreversible que no puede ser replicado por ningún proceso volcánico o tectónico terrestre. La presencia de granos de cuarzo chocado con laminaciones planas microscópicas (PDFs) y minerales polimórficos de alta presión como la coesita y la stishovita son la huella dactilar definitiva que permite a los geólogos certificar el origen meteorítico de una estructura milenaria."
    ],
    "fact": "La formación de un cráter de impacto consta de tres etapas físicas bien delimitadas: contacto y compresión a presiones extremas de megabares, excavación aerodinámica de la cavidad transitoria de escombros y modificación gravitatoria final formando cuencos simples o estructuras complejas con picos centrales levantados.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La energía cinética liberada en un impacto hiperbólico escala de forma cuadrática con la velocidad (E = 1/2 m v^2), de modo que un asteroide metálico de 50 metros de diámetro a 20 km/s libera una energía destructiva de unos 10 megatones de TNT, excavando un cráter de más de 1.2 kilómetros de diámetro como el cráter Barringer de Arizona."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Meteor Crater de Arizona conserva una llamativa forma casi cuadrada en lugar de redonda debido a que las fallas y fracturas tectónicas preexistentes de las capas de roca caliza sedimentaria regional guiaron preferencialmente la dirección de propagación de la devastadora onda de choque subterránea."
      }
    ]
  },
  {
    "id": "impacto-chicxulub",
    "title": "El Cataclismo de Chicxulub",
    "color": "#9B51E0",
    "btnImage": "/assets/asteroides/infographic_m2/btn_impacto-chicxulub.webp",
    "image": "/assets/asteroides/infographic_m2/hero_impacto-chicxulub.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_impacto-chicxulub.webp',
    bannerCaption: 'Estructura de impacto de Chicxulub en la península de Yucatán',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_impacto-chicxulub.webp',
    diagramCaption: 'Corte geofísico de Chicxulub: anillo de picos sumergido, brechas de fusión y anillo de cenotes',
    "content": [
      "Hace exactamente sesenta y seis millones cuarenta mil años, al término del periodo Cretácico, un asteroide carbonáceo de entre diez y catorce kilómetros de diámetro impactó contra las plataformas marinas carbonatadas de lo que hoy es la Península de Yucatán, cerca del poblado de Chicxulub en México. El cataclismo liberó una energía colosal estimada en cien millones de megatones de dinamita, desencadenando la quinta extinción masiva de la Tierra.",
      "El choque excavó una cavidad transitoria de casi cien kilómetros de ancho y treinta kilómetros de profundidad en menos de cinco segundos, fundiendo instantáneamente miles de kilómetros cúbicos de granito basal. La roca pulverizada y fundida fue eyectada fuera de la atmósfera a velocidades orbitales, mientras megatsunamis con olas de más de trescientos metros de altura barrieron las costas de todo el Golfo de México y penetraron cientos de kilómetros tierra adentro.",
      "Al reingresar a la atmósfera a nivel global, los billones de esferas de vidrio fundido (microtectitas) calentaron el aire de todo el planeta a cientos de grados como un gigantesco horno infrarrojo durante varias horas, provocando incendios forestales simultáneos que consumieron bosques enteros en todos los continentes habitados. La atmósfera quedó rápidamente saturada de cenizas, hollín y aerosoles de ácido sulfúrico procedentes de las evaporitas de yeso vaporizadas en Yucatán.",
      "Esta densa capa de aerosoles bloqueó la radiación solar incidente durante años, sumergiendo a la Tierra en un gélido 'invierno de impacto' prolongado donde las temperaturas cayeron drásticamente en todo el globo. La fotosíntesis vegetal colapsó tanto en la tierra firme como en las cadenas tróficas marinas de fitoplancton, provocando la extinción del setenta y cinco por ciento de todas las especies del planeta, incluidos los dinosaurios no aviares.",
      "En el año 1980, el físico galardonado con el Premio Nobel Luis Álvarez y su hijo geólogo Walter Álvarez descubrieron la prueba irrefutable de este cataclismo: una delgada capa de arcilla interestratificada en todo el mundo en el límite Cretácico-Paleógeno (límite K-Pg) que contiene concentraciones anómalas de iridio, un metal del grupo del platino sumamente escaso en la corteza terrestre pero extremadamente abundante en los asteroides primordiales."
    ],
    "fact": "El impacto del asteroide de Chicxulub en la Península de Yucatán hace 66.04 millones de años liberó la descomunal energía de 100 millones de megatones de TNT, depositando una capa global de arcilla rica en iridio extraterrestre y provocando un invierno de impacto prolongado que extinguió al 75% de las especies del planeta.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las perforaciones geológicas y núcleos de roca marina extraídos del cráter Chicxulub por la expedición científica internacional IODP-ICDP 364 en 2016 demostraron que el impacto despresurizó el manto terrestre levantando un anillo de picos montañosos de seiscientos metros de altura en un intervalo de apenas diez minutos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los únicos dinosaurios que lograron sobrevivir al cataclismo ecológico global de Chicxulub fueron las pequeñas aves emplumadas antecesoras directas de los pájaros actuales, gracias a su dieta granívora especializada basada en semillas subterráneas protegidas del fuego y a su capacidad de cobijo en madrigueras."
      }
    ]
  },
  {
    "id": "lluvias-estrellas",
    "title": "Lluvias de Meteoros",
    "color": "#FF884B",
    "btnImage": "/assets/asteroides/infographic_m2/btn_lluvias-estrellas.webp",
    "image": "/assets/asteroides/infographic_m2/hero_lluvias-estrellas.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_lluvias-estrellas.webp',
    bannerCaption: 'Encuentros orbitales con estelas de escombros de cometas periódicos',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_lluvias-estrellas.webp',
    diagramCaption: 'Geometría orbital de las lluvias de meteoros: intersección nodal con estelas de cometas periódicos',
    "content": [
      "Las lluvias de meteoros son espectáculos celestes periódicos que fascinan a la humanidad desde la antigüedad, pero su origen físico es puramente mecánico y astronómico. A medida que un cometa periódico o un asteroide activo orbita alrededor del Sol, el calor solar evapora sus hielos y libera millones de pequeñas partículas de polvo, arena y guijarros que continúan orbitando en una corriente de escombros alargada siguiendo la misma trayectoria elíptica.",
      "Cada año, cuando la Tierra en su viaje orbital de traslación alrededor del Sol cruza una de estas densas corrientes de escombros cósmicos, millones de partículas penetran en la atmósfera a velocidades relativas de decenas de kilómetros por segundo. La ablación colectiva de miles de meteoroides a lo largo de varias noches consecutivas produce la visión coordinada de decenas de estrellas fugaces por hora surcando el firmamento.",
      "Debido a las leyes geométricas de la perspectiva óptica, todos los trazos luminosos de una lluvia de meteoros parecen divergir y emanar de un único punto imaginario en la bóveda celeste. Este punto focal se denomina formalmente 'radiante', y la constelación astronómica en cuyo fondo se proyecta el radiante es la que otorga el nombre característico a la lluvia anual (como las Perseidas en Perseo o las Oriónidas en Orión).",
      "Entre las lluvias más famosas del calendario astronómico se destacan las Perseidas de agosto, producidas por las partículas arrojadas por el cometa 109P/Swift-Tuttle; las Gemínidas de diciembre, originadas no por un cometa sino por el singular asteroide rocoso 3200 Faetón; y las Leónidas de noviembre, asociadas al cometa 55P/Tempel-Tuttle, célebres por desencadenar espectaculares tormentas de meteoros históricas con miles de bólidos por minuto.",
      "La observación científica de las lluvias de meteoros permite a los astrónomos calcular la densidad de partículas y la dispersión espacial de los cometas padres sin necesidad de interceptarlos directamente. Además, los astrónomos monitorizan estas corrientes para orientar de manera segura los paneles solares de los satélites en órbita baja y de la Estación Espacial Internacional durante los picos de máxima intensidad de la lluvia."
    ],
    "fact": "Las lluvias de meteoros anuales ocurren cuando la Tierra intercepta las corrientes de escombros y partículas desprendidas por cometas periódicos en su trayectoria orbital; todos los trazos luminosos parecen irradiar de un punto común en el cielo denominado radiante debido a un fascinante efecto de perspectiva geométrica.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad geocéntrica de entrada de los meteoros de las Perseidas alcanza los 59 km/s debido a que la órbita de la corriente de polvo del cometa progenitor 109P/Swift-Tuttle cruza de forma casi perpendicular el vector de movimiento orbital de traslación de la Tierra alrededor del Sol a treinta kilómetros por segundo."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En la legendaria tormenta de meteoros de las Leónidas de noviembre de 1833, observadores astronómicos en Norteamérica contabilizaron más de cien mil meteoros por hora durante la madrugada, iluminando el cielo con tal intensidad fosforescente que era posible leer la letra pequeña de los periódicos en mitad de la noche."
      }
    ]
  },
  {
    "id": "meteoritos-famosos",
    "title": "Meteoritos Célebres de la Historia",
    "color": "#00E4FF",
    "btnImage": "/assets/asteroides/infographic_m2/btn_meteoritos-famosos.webp",
    "image": "/assets/asteroides/infographic_m2/hero_meteoritos-famosos.webp",
    bannerImage: '/assets/asteroides/infographic_m2/banner_meteoritos-famosos.webp',
    bannerCaption: 'Registro histórico y análisis de meteoritos célebres preservados',
    diagramImage: '/assets/asteroides/infographic_m2/diagram_meteoritos-famosos.webp',
    diagramCaption: 'Muestras icónicas: patrones de Widmanstätten en hierro, masa de Hoba y minerales de Allende',
    "content": [
      "A lo largo de los siglos, la caída y hallazgo de meteoritos excepcionales ha dejado una huella indeleble tanto en la ciencia astronómica como en la cultura popular humana. Estos fragmentos cósmicos singulares se conservan en los grandes museos de historia natural como tesoros geológicos irremplazables que documentan cataclismos prehistóricos y la química de mundos desaparecidos.",
      "El meteorito más masivo conocido que yace intacto sobre la superficie terrestre es el meteorito Hoba, descubierto en Namibia en el año 1920. Se trata de un colosal bloque metálico con forma tabular compuesto en un ochenta y cuatro por ciento de hierro y dieciséis por ciento de níquel, con una masa estimada de más de sesenta toneladas. Sorprendentemente, Hoba no excavó un cráter visible, ya que la densa atmósfera terrestre frenó el bloque hasta su velocidad terminal antes del impacto suave.",
      "En el ámbito de la cosmoquímica elemental, el meteorito Allende es unánimemente reconocido como la roca más importante jamás caída del espacio. Se precipitó en forma de lluvia de miles de fragmentos sobre el estado de Chihuahua, México, en la madrugada del 8 de febrero de 1969. Al tratarse de una condrita carbonácea pristina rica en inclusiones de calcio y aluminio (CAIs), permitió datar con precisión atómica por primera vez la edad exacta de formación de nuestro Sistema Solar.",
      "Otro hito científico indispensable es el meteorito ALH84001, descubierto en los campos de hielo azul de la Antártida en 1984. Los análisis de gases nobles atrapados en sus cavidades vítreas demostraron que procedía directamente de la corteza antigua de Marte, eyectado al espacio por un impacto hace diecisiete millones de años. En 1996, un equipo de la NASA liderado por David McKay causó sensación mundial al identificar posibles bioestructuras fosilizadas microscópicas dentro de sus minerales de carbonato.",
      "En tiempos contemporáneos, el superbolido de Cheliábinsk del 15 de febrero de 2013 en Rusia marcó el primer impacto de gran magnitud registrado extensamente por cámaras de tablero de automóviles, teléfonos inteligentes y sensores de infrasonido globales. El estallido a treinta kilómetros de altura de un asteroide condrítico de veinte metros liberó quinientos kilotones de energía, recordando vívidamente a la humanidad la constante actividad cósmica sobre nuestras cabezas."
    ],
    "fact": "El meteorito Hoba en Namibia es la masa individual de hierro natural más gigantesca de la Tierra con 60 toneladas métricas intactas, mientras que el meteorito carbonáceo Allende caído en Chihuahua, México, en 1969 permitió datar con exactitud atómica la edad de nacimiento de nuestro Sistema Solar en 4,567 millones de años.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El meteorito marciano ALH84001 cristalizó hace 4,091 millones de años en la corteza de Marte durante la era Noeica primitiva, conservando glóbulos de carbonato hidrotermal que documentan la presencia prolongada de agua líquida subterránea en los albores geológicos del planeta rojo antes de la pérdida de su atmósfera."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La famosa daga funeraria descubierta junto a la momia del faraón egipcio Tutankamón en 1922 fue forjada hace más de 3,300 años empleando hierro de un meteorito metálico de alta pureza con alto contenido de níquel y cobalto, siglos antes de que la civilización humana descubriera la técnica de fundición del hierro terrestre."
      }
    ]
  }
];

export default function InteractiveInfographic_AsteroidesM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,12,25,0.92) 0%, rgba(15,10,30,0.88) 50%, rgba(12,10,28,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <AsteroidesM2Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF7043, #EC407A)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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
                Selecciona uno de los módulos superiores para explorar la física de meteoros, meteoritos y cráteres de impacto.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,112,67,0.4)' }}>
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

function CosmicDustField() {
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
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '255, 112, 67' : '236, 64, 122',
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
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function AsteroidesM2Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,112,67,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM2)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF7043','#29B6F6','#EC407A','#AB47BC','#FFD54F','#26A69A','#FF7043'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF7043" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF7043" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF7043" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,112,67,0.2)" />
            <stop offset="50%" stopColor="rgba(255,112,67,0.9)" />
            <stop offset="100%" stopColor="rgba(255,112,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF7043" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">METEOROS Y CRÁTERES</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,112,67,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">IMPACTOS Y FÍSICA ATMOSFÉRICA</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,112,67,0.2)'}`,
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
          layoutId="activeDotAsteroidesM2"
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
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                  {i === 0 ? 'SECCIÓN 1' : 'SECCIÓN 2'}
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
        {/* Video Section */}
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
        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {node.bannerCaption}
              </p>
            )}
          </div>
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
                📐 ESQUEMA TÉCNICO Y DIAGRAMA
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
              <p style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
