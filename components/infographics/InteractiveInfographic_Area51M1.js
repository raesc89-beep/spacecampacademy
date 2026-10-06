'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9C8F5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Pedlow, G. W. y Welzenbach, D. E. (1992, desclasificado en 2013). The Central Intelligence Agency and Overhead Reconnaissance: The U-2 and OXCART Programs, 1954-1974. CIA History Staff. Publicado por el National Security Archive, George Washington University.",
  "Johnson, C. L. «Kelly» y Smith, M. (1985). Kelly: More Than My Share of It All. Washington D. C.: Smithsonian Institution Press.",
  "Rich, B. R. y Janos, L. (1994). Skunk Works: A Personal Memoir of My Years at Lockheed. Boston: Little, Brown and Company.",
  "Darlington, D. (1997). Area 51: The Dreamland Chronicles. Nueva York: Henry Holt and Company.",
  "Brugioni, D. A. (1991). Eyeball to Eyeball: The Inside Story of the Cuban Missile Crisis. Nueva York: Random House.",
  "National Museum of the United States Air Force. Fichas técnicas: Lockheed U-2, Lockheed SR-71A Blackbird y Lockheed F-117A Nighthawk. Dayton, Ohio.",
  "Crickmore, P. F. (2004). Lockheed Blackbird: Beyond the Secret Missions. Oxford: Osprey Publishing."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a51m1-punto-secreto-en-el-mapa",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-punto-secreto-en-el-mapa.webp',
    bannerCaption: "El Área 51 está junto al lago seco Groom, en el sur de Nevada (EE. UU.), a unos 130 km al noroeste de Las Vegas.",
    title: "Un punto secreto en el mapa",
    color: '#6B7A6E',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-punto-secreto-en-el-mapa.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-punto-secreto-en-el-mapa.webp',
    content: [
      "El Área 51 es una instalación militar real de Estados Unidos situada en el sur del estado de Nevada, a unos 130 kilómetros al noroeste de la ciudad de Las Vegas. Se construyó a la orilla de un lago seco llamado Groom Lake, una enorme llanura de barro endurecido y blanquecino que los geólogos llaman «playa». Una superficie así es casi perfectamente plana, y por eso funciona como una pista de aterrizaje natural gigantesca. Alrededor solo hay montañas peladas, matorrales del desierto y un cielo casi siempre despejado.",
      "Ese aislamiento no es casualidad. Las montañas que rodean el lago bloquean la vista desde las carreteras, el pueblo más cercano está a decenas de kilómetros y el clima seco permite volar casi todos los días del año. Además, la base quedó rodeada por terrenos que el gobierno ya controlaba: al sur está el antiguo Sitio de Pruebas de Nevada, donde se realizaron ensayos nucleares, y alrededor se extiende el Campo de Entrenamiento y Pruebas de Nevada de la Fuerza Aérea, uno de los espacios aéreos restringidos más grandes del país.",
      "El lugar tiene muchos nombres. En las cartas aeronáuticas aparece como Aeropuerto Homey o Groom Lake; los pilotos lo apodaron «Dreamland» (Tierra de los Sueños) y el ingeniero Kelly Johnson lo bautizó «Paradise Ranch» (Rancho Paraíso) para animar a sus trabajadores a mudarse a un rincón tan inhóspito. Se cree que el nombre «Área 51» viene de la cuadrícula de mapas con la que la Comisión de Energía Atómica dividía en zonas numeradas los terrenos de pruebas nucleares de Nevada, aunque su origen exacto no está documentado.",
      "Durante décadas, el gobierno de Estados Unidos se negó a confirmar públicamente que la base existiera. No aparecía con su nombre en los mapas oficiales para civiles y sus trabajadores tenían prohibido hablar de ella. Sin embargo, nunca fue invisible del todo: los excursionistas podían verla desde algunas montañas cercanas hasta que el gobierno cerró los miradores más próximos, en 1984 y 1995, y hoy cualquier persona puede encontrar sus pistas y hangares en imágenes satelitales comerciales desde su computadora.",
      "Lo importante para un científico es separar lo que sabemos de lo que se rumorea. Sabemos, por documentos oficiales, que el Área 51 existe, que la CIA la fundó en 1955 y que ahí se probaron aviones espía y aviones furtivos. También sabemos que sigue activa y que su trabajo actual es secreto. Lo que no tiene ninguna prueba es la idea de que guarde naves o cuerpos extraterrestres. En este módulo vamos a recorrer la historia documentada paso a paso, como verdaderos investigadores."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La superficie de un lago seco como Groom Lake es tan plana porque, cada vez que llueve, se forma un charco poco profundo de agua con barro muy fino. El viento empuja el agua de un lado a otro y, al evaporarse, el sedimento se deposita en capas muy parejas. Por eso las «playas» del desierto del oeste de Estados Unidos se han usado como pistas: la base Edwards, en California, también nació junto a un lago seco, Rogers Dry Lake, donde aterrizaron los primeros transbordadores espaciales." },
      { label: "Dato Científico", icon: "atom", text: "En el desierto de Nevada el aire contiene muy poco vapor de agua. Eso tiene dos consecuencias útiles para probar aviones: casi no hay nubes que tapen la vista de las cámaras y la visibilidad puede superar los cien kilómetros. Pero también provoca cambios fuertes de temperatura entre el día y la noche, porque el vapor de agua es un gas de efecto invernadero que retiene el calor. Sin esa «manta» invisible, el suelo del desierto se enfría rápidamente en cuanto se pone el sol." }
    ],
    fact: "Dato verificable: en agosto de 2013 la CIA publicó, gracias a una solicitud basada en la Ley de Libertad de Información (FOIA) presentada por el investigador Jeffrey Richelson, del Archivo de Seguridad Nacional de la Universidad George Washington, su historia interna de los programas U-2 y OXCART. En ese documento aparecen de forma oficial el nombre «Área 51» y un mapa que señala su ubicación junto a Groom Lake, en Nevada.",
  },
  {
    id: "a51m1-nacida-en-la-guerra-fria",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-nacida-en-la-guerra-fria.webp',
    bannerCaption: "En abril de 1955, enviados de la CIA y de Lockheed eligieron Groom Lake para probar en secreto el avión espía U-2.",
    title: "1955: una base nacida en la Guerra Fría",
    color: '#7A6F5E',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-nacida-en-la-guerra-fria.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-nacida-en-la-guerra-fria.webp',
    content: [
      "Para entender por qué se construyó el Área 51 hay que viajar a la Guerra Fría, la larga rivalidad entre Estados Unidos y la Unión Soviética que comenzó al terminar la Segunda Guerra Mundial, en 1945. No fue una guerra de batallas directas entre ambos países, sino una competencia por armas, territorio, tecnología e influencia. Las dos potencias tenían bombas atómicas y ninguna sabía con certeza cuántas armas tenía la otra ni dónde estaban. Esa incertidumbre provocaba muchísimo miedo en los dos bandos.",
      "La Unión Soviética era un país enorme y muy cerrado: los extranjeros no podían recorrerlo libremente y sus bases militares estaban ocultas en regiones remotas. Los aviones de reconocimiento de la época volaban demasiado bajo y podían ser derribados con facilidad. En 1954, el presidente Dwight D. Eisenhower recibió la propuesta de un avión que volara tan alto que los cazas soviéticos no pudieran alcanzarlo. En noviembre de ese año aprobó el proyecto y se lo encargó en secreto a la CIA.",
      "El responsable dentro de la CIA fue Richard Bissell, y el diseñador del avión fue Clarence «Kelly» Johnson, jefe del departamento secreto de la empresa Lockheed conocido como Skunk Works. El problema era dónde probar un avión que nadie debía ver. En abril de 1955, el piloto de pruebas Tony LeVier y otros miembros del equipo sobrevolaron el desierto en una avioneta buscando un lugar adecuado. Al ver la superficie blanca y lisa de Groom Lake supieron que habían encontrado el sitio ideal.",
      "La construcción fue rapidísima. En pocos meses se levantaron hangares, una torre de control, una pista asfaltada, depósitos de combustible, comedores y barracas para los trabajadores. Los empleados de Lockheed viajaban cada semana desde Burbank, California, en aviones de transporte, y tenían prohibido contar a sus familias dónde estaban. En julio de 1955 llegó desarmado, dentro de un enorme avión de carga, el primer U-2, que se volvió a ensamblar dentro de uno de los hangares recién construidos.",
      "El secreto tenía un motivo muy concreto. Si los soviéticos sabían que existía un avión capaz de fotografiar su territorio desde gran altura, podían acelerar el desarrollo de misiles para derribarlo, esconder mejor sus instalaciones o denunciar los vuelos como una agresión. Por eso la base se diseñó desde el principio para que casi nadie supiera de su existencia. Ese secreto, comprensible dentro de la estrategia militar de la época, sería después la semilla de muchísimos rumores."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El nombre «Skunk Works» (taller de la mofeta) viene de una tira cómica estadounidense de los años cuarenta, Li'l Abner, en la que aparecía una destilería apestosa llamada «Skonk Works». Los ingenieros de Lockheed trabajaban en un edificio provisional junto a una fábrica de plásticos que olía muy mal, y uno de ellos empezó a contestar el teléfono con ese nombre como broma. El apodo se quedó para siempre y hoy es una marca registrada de la empresa Lockheed Martin." },
      { label: "Dato Científico", icon: "atom", text: "Una cámara distingue menos detalles cuanto más lejos está del objeto, porque la luz que viene del suelo atraviesa kilómetros de aire y cada lente tiene un límite de resolución. Para fotografiar desde unos 20 kilómetros de altura, el U-2 llevaba cámaras con lentes de distancia focal muy larga, como la llamada cámara B, de 36 pulgadas (unos 91 centímetros), capaz de distinguir objetos de menos de un metro en buenas condiciones. Cargaba rollos de película de casi dos kilómetros de largo." }
    ],
    fact: "Dato verificable: Kelly Johnson prometió entregar el U-2 en unos ocho meses y lo cumplió. El contrato se firmó a finales de 1954 y el avión voló en Groom Lake a comienzos de agosto de 1955. El 4 de agosto, durante una prueba de rodaje a alta velocidad, el piloto Tony LeVier se elevó sin querer unos metros del suelo, porque las alas eran tan eficientes que el avión prácticamente «quería» volar antes de lo previsto.",
  },
  {
    id: "a51m1-u2-espia-de-la-estratosfera",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-u2-espia-de-la-estratosfera.webp',
    bannerCaption: "El U-2 volaba a unos 21 km de altura (70,000 pies), por encima del alcance de los cazas soviéticos de 1956.",
    title: "El U-2: el espía que tocaba la estratosfera",
    color: '#5E6F80',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-u2-espia-de-la-estratosfera.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-u2-espia-de-la-estratosfera.webp',
    content: [
      "El U-2 fue el primer avión probado en el Área 51 y su gran ventaja era la altura. Podía volar a unos 21 kilómetros sobre el suelo, el doble de la altitud a la que viaja hoy un avión comercial. A esa altura ya estamos en la estratosfera, la capa de la atmósfera que está por encima de las nubes y del mal tiempo. Desde ahí, el cielo se ve de color azul muy oscuro, casi negro, y se puede apreciar ligeramente la curvatura de la Tierra en el horizonte.",
      "Para volar tan alto, el U-2 parecía más un planeador con motor que un avión de combate. Sus alas eran larguísimas y delgadas, de unos 24 metros de punta a punta en el modelo original, y el avión era tan ligero que llevaba ruedas auxiliares desprendibles bajo las alas, llamadas «pogos», que se soltaban al despegar. Al aterrizar, un coche deportivo corría detrás del avión por la pista y su conductor, que también era piloto, le indicaba por radio la altura exacta sobre el suelo.",
      "Volar a esa altura es peligroso para el cuerpo humano. En la estratosfera la presión del aire es tan baja que, sin protección, los gases disueltos en la sangre formarían burbujas y el piloto perdería el conocimiento en pocos segundos. Por eso los pilotos del U-2 usaban trajes presurizados parecidos a los de los astronautas y respiraban oxígeno puro durante aproximadamente una hora antes de despegar, para eliminar el nitrógeno de su cuerpo. Algunas misiones duraban más de ocho horas seguidas.",
      "El 4 de julio de 1956 un U-2 realizó el primer vuelo de espionaje sobre la Unión Soviética, pasando sobre Moscú y Leningrado. Las fotografías revelaron aeródromos, fábricas, bases de submarinos y sitios de lanzamiento de cohetes. Con ellas, los analistas descubrieron algo sorprendente: la Unión Soviética tenía muchos menos bombarderos de largo alcance de los que se temía. Esa información ayudó a Estados Unidos a tomar decisiones basadas en datos reales y no en suposiciones o miedos exagerados.",
      "Los soviéticos detectaban los vuelos con sus radares, pero durante casi cuatro años no pudieron derribar ninguno. Eso cambió el 1 de mayo de 1960, cuando un misil tierra-aire alcanzó el U-2 de Francis Gary Powers cerca de Sverdlovsk. Powers sobrevivió, fue capturado y juzgado, y en 1962 fue intercambiado por un espía soviético. Aun así, el U-2 siguió siendo útil: en octubre de 1962 sus fotografías descubrieron los misiles soviéticos en Cuba, y versiones modernizadas vuelan todavía hoy."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las fotos que desencadenaron la Crisis de los Misiles de Cuba fueron tomadas el 14 de octubre de 1962 por un U-2 pilotado por el mayor Richard Heyser. En ellas, los fotointérpretes del Centro Nacional de Interpretación Fotográfica identificaron instalaciones para misiles balísticos soviéticos de alcance medio. Durante trece días el mundo estuvo al borde de una guerra nuclear, hasta que la Unión Soviética aceptó retirar los misiles a cambio de compromisos por parte de Estados Unidos." },
      { label: "Dato Científico", icon: "atom", text: "A unos 19 kilómetros de altura se encuentra el llamado límite de Armstrong, nombrado en honor al médico militar Harry George Armstrong. Ahí la presión atmosférica es tan baja, alrededor del 6 % de la que hay al nivel del mar, que el agua hierve a la temperatura del cuerpo humano, unos 37 °C. Por encima de ese límite, sin un traje presurizado o una cabina sellada, la saliva y las lágrimas de una persona empezarían a hervir. Por eso volar en el U-2 exige un equipo casi espacial." }
    ],
    fact: "Dato verificable: el U-2 sigue en servicio en la Fuerza Aérea de Estados Unidos en su versión U-2S, más grande y con un motor moderno, más de seis décadas después de su primer vuelo. La NASA también utiliza versiones civiles del mismo diseño, llamadas ER-2, para estudiar la capa de ozono, los huracanes y la atmósfera, aprovechando que pueden volar por encima de aproximadamente el 95 % del aire del planeta.",
  },
  {
    id: "a51m1-oxcart-y-blackbird-mach-3",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-oxcart-y-blackbird-mach-3.webp',
    bannerCaption: "El A-12 OXCART voló por primera vez en Groom Lake en 1962; su pariente, el SR-71 Blackbird, superaba Mach 3.",
    title: "OXCART y Blackbird: tres veces la velocidad del sonido",
    color: '#4F5A66',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-oxcart-y-blackbird-mach-3.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-oxcart-y-blackbird-mach-3.webp',
    content: [
      "Tras el derribo de Powers quedó claro que la altura ya no bastaba: los misiles soviéticos mejoraban rápidamente. La CIA ya había encargado a Lockheed un sucesor que, además de volar alto, volara increíblemente rápido. El resultado fue el A-12, conocido por el nombre en clave OXCART. Voló por primera vez en el Área 51 en abril de 1962 y podía viajar a más de tres veces la velocidad del sonido, a unos 27 kilómetros de altura. Era un avión espía de un solo piloto.",
      "Del A-12 nació el SR-71 Blackbird, una versión de dos tripulantes construida para la Fuerza Aérea, que voló por primera vez en diciembre de 1964 en Palmdale, California. Los dos aviones eran muy parecidos: largos, negros, con un cuerpo aplanado y dos enormes motores. El SR-71 se hizo famoso porque su existencia fue anunciada en público por el presidente Lyndon B. Johnson en 1964, mientras que el A-12 de la CIA permaneció en secreto durante décadas.",
      "¿Qué significa volar a Mach 3? El número Mach compara la velocidad de un avión con la del sonido en el aire que lo rodea. Mach 1 es justo la velocidad del sonido, que a gran altura, donde hace mucho frío, es de unos 1,060 kilómetros por hora. Mach 3 es el triple: más de 3,000 kilómetros por hora. En 1976 un SR-71 estableció un récord de velocidad de 3,529 kilómetros por hora que ningún otro avión tripulado con motores que respiran aire ha superado.",
      "A esas velocidades, el aire calienta muchísimo el avión: algunas partes superaban los 300 °C. El aluminio de los aviones normales se habría debilitado, así que Lockheed construyó la mayor parte de la estructura con titanio, un metal tan resistente como muchos aceros pero mucho más ligero y capaz de soportar el calor. Trabajarlo era dificilísimo, y según relatos de Lockheed y de la CIA, parte del titanio se compró a la propia Unión Soviética mediante empresas intermediarias.",
      "El calor tenía efectos curiosos. El avión se estiraba varios centímetros en vuelo por la dilatación del metal, así que en tierra sus paneles quedaban algo flojos y el combustible goteaba por las juntas; sólo con el calor del vuelo encajaban bien. Ningún SR-71 fue derribado jamás por el enemigo: si le disparaban un misil, el piloto simplemente aceleraba. La Fuerza Aérea lo retiró en 1990, lo reactivó brevemente a mediados de los años noventa y la NASA lo usó en investigación hasta 1999."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los pilotos del SR-71 usaban trajes presurizados muy parecidos a los de los astronautas y, en vuelos largos, comían alimentos en tubo a través de un pequeño orificio del casco. Desde unos 25 kilómetros de altura veían un cielo casi negro en pleno día. En 1974 un SR-71 voló de Nueva York a Londres en menos de dos horas, y en 1990, en su vuelo de despedida, cruzó Estados Unidos de costa a costa en poco más de una hora y siete minutos." },
      { label: "Dato Científico", icon: "atom", text: "Aunque solemos hablar de «fricción», gran parte del calor del SR-71 se debía a la compresión del aire. Cuando un objeto avanza más rápido que el sonido, el aire que tiene delante no alcanza a apartarse y se comprime bruscamente en ondas de choque. Al comprimir un gas, su temperatura sube, igual que se calienta una bomba de bicicleta al inflar una llanta. Por eso las zonas más calientes del avión eran la nariz y los bordes de ataque de las alas, que chocan primero con el aire." }
    ],
    fact: "Dato verificable: el SR-71 usaba un combustible especial llamado JP-7, diseñado para no encenderse con facilidad a pesar del calor. Era tan difícil de inflamar que, para arrancar los motores, se inyectaba una sustancia química llamada trietilborano (TEB), que arde espontáneamente al contacto con el aire y produce una llamarada verde. En el Museo Nacional de la Fuerza Aérea de Estados Unidos, en Ohio, se puede ver un SR-71 real.",
  },
  {
    id: "a51m1-invisibles-al-radar",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-invisibles-al-radar.webp',
    bannerCaption: "Los aviones stealth usan formas y materiales que desvían o absorben las ondas de radar en vez de devolverlas a la antena.",
    title: "Stealth: el arte de no devolver el eco",
    color: '#6E6478',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-invisibles-al-radar.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-invisibles-al-radar.webp',
    content: [
      "Un radar funciona como un eco. La antena envía pulsos de ondas de radio, que viajan a la velocidad de la luz; cuando chocan con un objeto, una parte rebota y regresa a la antena. Midiendo cuánto tarda en volver el eco, el radar calcula a qué distancia está el objeto, y por la dirección de la antena sabe dónde se encuentra. Un avión normal, con superficies curvas, motores visibles y ángulos rectos, devuelve muchísima energía hacia el radar, como un espejo que destella al sol.",
      "La tecnología stealth, o furtiva, busca que el eco casi no regrese. La idea principal es la forma: si las superficies del avión están inclinadas en ángulos cuidadosamente calculados, las ondas rebotan hacia otras direcciones, igual que una pelota que choca contra una pared inclinada no vuelve a tus manos. Por eso los aviones furtivos evitan los ángulos rectos, esconden la entrada de sus motores y alinean los bordes de alas y compuertas en unas pocas direcciones.",
      "La segunda herramienta son los materiales absorbentes de radar, conocidos por sus siglas en inglés RAM. Son recubrimientos que contienen partículas, por ejemplo de compuestos de hierro o de carbono, que convierten parte de la energía de las ondas en un poco de calor en lugar de reflejarla. El color negro de algunos aviones no tiene nada que ver con esto: el radar no «ve» colores. Lo que importa es la geometría y la composición del avión, no su altura, su velocidad ni su pintura.",
      "En el Área 51 se probó el primer demostrador furtivo de la historia, el Have Blue, que voló en diciembre de 1977. Su sucesor, el F-117 Nighthawk, voló por primera vez en Groom Lake en 1981 y se convirtió en el primer avión operativo diseñado alrededor de esta tecnología. Tenía un aspecto extrañísimo, hecho de placas planas como un diamante tallado, porque las computadoras de los años setenta sólo podían calcular cómo reflejaban el radar las superficies planas.",
      "Los F-117 de la primera época volaban sobre todo de noche para que nadie viera su silueta, y el gobierno no reconoció su existencia hasta noviembre de 1988. Algunas luces y formas triangulares descritas por testigos en esos años pudieron deberse a estas pruebas secretas. La tecnología stealth no hace a un avión invisible a los ojos ni completamente invisible al radar: lo que consigue es que el radar lo detecte mucho más tarde, cuando ya es difícil reaccionar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La teoría matemática que hizo posible el diseño del F-117 fue publicada en 1962 por el físico soviético Pyotr Ufimtsev, que estudiaba cómo se difractan las ondas electromagnéticas en los bordes de los objetos. Su trabajo, traducido al inglés en 1971, fue leído por el ingeniero de Lockheed Denys Overholser, quien comprendió que permitía calcular la señal de radar de una forma hecha de facetas planas. Así, una idea soviética ayudó a crear un avión estadounidense." },
      { label: "Dato Científico", icon: "atom", text: "La sección transversal de radar mide qué tan «grande» parece un objeto ante el radar, y no depende sólo de su tamaño real. Según la ecuación del radar, la distancia máxima a la que un radar detecta un objeto es proporcional a la raíz cuarta de esa sección. Eso significa que reducir la señal 10,000 veces sólo acorta la distancia de detección a la décima parte. Por eso los ingenieros stealth deben reducir el eco de forma enorme para obtener una ventaja real en combate." }
    ],
    fact: "Dato verificable: el F-117 Nighthawk se usó en combate por primera vez en Panamá en 1989 y luego en la Guerra del Golfo de 1991. En 1999, durante la guerra de Kosovo, un F-117 fue derribado por un misil antiaéreo serbio, lo que demostró que la tecnología furtiva reduce la detección pero no la elimina por completo. La Fuerza Aérea retiró oficialmente el F-117 en 2008, aunque algunos ejemplares siguieron volando en pruebas.",
  },
  {
    id: "a51m1-la-cia-abre-sus-archivos",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-la-cia-abre-sus-archivos.webp',
    bannerCaption: "En 2013 la CIA desclasificó su historia de los programas U-2 y OXCART, que reconoce oficialmente el Área 51.",
    title: "2013: la CIA abre sus archivos",
    color: '#7D6A5A',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-la-cia-abre-sus-archivos.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-la-cia-abre-sus-archivos.webp',
    content: [
      "Durante casi sesenta años el gobierno de Estados Unidos evitó hablar públicamente del Área 51. Eso cambió en agosto de 2013, cuando la CIA entregó una versión desclasificada de un libro de historia interna escrito por sus propios historiadores, Gregory Pedlow y Donald Welzenbach. El documento, titulado «La Agencia Central de Inteligencia y el reconocimiento aéreo: los programas U-2 y OXCART, 1954-1974», se publicó después de que un investigador lo solicitara usando la ley de transparencia.",
      "El texto confirma lo que muchos investigadores ya sabían: que el sitio de Groom Lake fue elegido en 1955 para probar el U-2, que la CIA y Lockheed construyeron allí sus instalaciones y que después se probó en ese lugar el A-12 OXCART. Incluye mapas y menciona el nombre «Área 51». No contiene ninguna referencia a extraterrestres, naves espaciales capturadas ni experimentos con seres de otros mundos. Es un relato detallado de ingeniería, presupuestos, accidentes y espionaje.",
      "Uno de los pasajes más interesantes explica una consecuencia inesperada de los vuelos del U-2: un enorme aumento de los reportes de OVNIs. En los años cincuenta los aviones de pasajeros volaban a entre 3 y 6 kilómetros de altura, así que nadie esperaba ver un objeto a más de 18 kilómetros. Al atardecer, cuando el suelo ya estaba oscuro, el sol todavía iluminaba desde abajo del horizonte las alas plateadas del U-2, que brillaban en el cielo como objetos de fuego.",
      "Según ese mismo documento, los investigadores de la Fuerza Aérea que analizaban los reportes de OVNIs en el Proyecto Libro Azul consultaban al personal del programa U-2 para comparar los avistamientos con los registros de vuelo, y así lograban explicar muchos de ellos. Pero no podían decirle la verdad al público, porque eso habría revelado un programa secreto. Las personas que habían visto algo raro se quedaban sin respuesta, y ese silencio dejaba mucho espacio a la imaginación.",
      "La desclasificación de 2013 es un buen ejemplo de cómo funciona la evidencia histórica. Un documento oficial no es automáticamente verdadero, pero cuando su contenido coincide con otras fuentes independientes, como las memorias de los ingenieros de Lockheed, las fotos satelitales, los aviones conservados en museos y los testimonios de pilotos, la explicación se vuelve muy sólida. Algunas personas dijeron que los archivos ocultaban la verdad, pero no presentaron pruebas que lo demostraran."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes de 2013 la existencia de la base ya era un secreto a voces: en 1988 la revista Popular Science publicó imágenes satelitales soviéticas del lugar, y en los años noventa varios trabajadores demandaron al gobierno por la quema de residuos tóxicos dentro de la base. En lugar de revelar detalles, el presidente Bill Clinton firmó en 1995 una exención que protegía la información de la instalación por razones de seguridad nacional. Se sabía que existía, pero no se hablaba oficialmente de ella." },
      { label: "Dato Científico", icon: "atom", text: "Desclasificar un documento no significa publicarlo completo. Los archivistas revisan cada página y tachan con barras negras, o «censuran», los nombres, cifras o métodos que siguen considerándose sensibles. La versión de 2013 todavía tiene partes tachadas, y por eso los historiadores comparan distintas versiones liberadas a lo largo de los años: lo que aparece oculto en una a veces se lee en otra. Este trabajo detectivesco se parece al de un científico que contrasta los datos de varios experimentos." }
    ],
    fact: "Dato verificable: la historia de la CIA publicada en 2013 tiene alrededor de 400 páginas y fue escrita originalmente en 1992 para uso interno de la agencia. En 1998 ya se había liberado una versión con muchas más partes tachadas. En agosto de 2013 el Archivo de Seguridad Nacional de la Universidad George Washington la publicó en internet, donde cualquier persona puede leerla gratis y comprobar por sí misma lo que dice y lo que no dice.",
  },
  {
    id: "a51m1-la-base-hoy-y-el-pensamiento-critico",
    bannerImage: '/assets/area51/infographic_m1/banner_a51m1-la-base-hoy-y-el-pensamiento-critico.webp',
    bannerCaption: "Desde 1996 la ruta estatal 375 de Nevada se llama oficialmente «Extraterrestrial Highway» y pasa por el pueblo de Rachel.",
    title: "La base hoy y las preguntas inteligentes",
    color: '#5F7462',
    btnImage: '/assets/area51/infographic_m1/btn_a51m1-la-base-hoy-y-el-pensamiento-critico.webp',
    image: '/assets/area51/infographic_m1/hero_a51m1-la-base-hoy-y-el-pensamiento-critico.webp',
    content: [
      "El Área 51 sigue funcionando hoy como instalación de la Fuerza Aérea de Estados Unidos. Cada día, aviones de pasajeros blancos con una franja roja despegan desde una terminal privada del aeropuerto de Las Vegas y llevan trabajadores a la base y a otras instalaciones del desierto. Se les conoce por su indicativo de radio, «Janet», y mucha gente bromea con que significa «Just Another Non-Existent Terminal» (otra terminal inexistente), aunque ese significado nunca ha sido confirmado oficialmente.",
      "Los límites de la base están marcados con postes y carteles que advierten que fotografiar está prohibido y que los guardias están autorizados a usar fuerza letal. No hay una gran muralla, pero hay sensores, cámaras y patrullas en camionetas que vigilan desde las colinas. Cruzar esa línea es un delito federal que se castiga con multas e incluso cárcel. Para los curiosos, lo más cerca que se puede llegar legalmente es el borde de esa frontera, en medio del desierto.",
      "La fama de la base convirtió a la región en un destino turístico. En 1996 el estado de Nevada nombró oficialmente a la ruta 375 como «Extraterrestrial Highway» (Carretera Extraterrestre). En el diminuto pueblo de Rachel, de apenas unas decenas de habitantes, un restaurante llamado Little A'Le'Inn vende recuerdos con temática alienígena. Los visitantes llegan por el misterio, se toman fotos con las señales y observan el cielo nocturno, que es uno de los más oscuros de Estados Unidos.",
      "Las películas y series han imaginado el interior del Área 51 lleno de naves y laboratorios con extraterrestres, pero eso es ficción. Lo que muestran las imágenes satelitales son hangares, pistas, antenas, depósitos de combustible y edificios de oficinas. Igual que en los años cincuenta, el secreto actual tiene que ver, hasta donde se sabe, con aviones, sensores y armas en desarrollo. Que no sepamos exactamente qué se prueba ahí no significa que cualquier explicación sea igual de probable.",
      "El Área 51 es una gran escuela de pensamiento crítico. Ante un misterio conviene preguntarse: ¿qué evidencia hay?, ¿quién la aporta y cómo se puede comprobar?, ¿existe una explicación más sencilla que encaje con los hechos? En este caso, la explicación documentada, aviones espía y tecnología militar secreta, explica los avistamientos sin necesidad de inventar visitantes de otros planetas. Un buen investigador acepta decir «no lo sé» y sigue buscando pruebas en lugar de rellenar los huecos con fantasía."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Junto a la carretera 375 había un buzón que pertenecía a un ranchero de la zona y que se volvió punto de reunión para quienes buscaban luces en el cielo. Lo llamaban «el buzón negro». Con los años, el dueño lo sustituyó por un buzón blanco reforzado, porque los turistas abrían el original y hasta dejaban cartas dirigidas a extraterrestres, pero el apodo sobrevivió al cambio de color: un pequeño recordatorio de cómo las leyendas pueden durar más que los hechos que las originaron." },
      { label: "Dato Científico", icon: "atom", text: "La zona de Rachel tiene cielos nocturnos muy oscuros porque está lejos de las grandes ciudades. La contaminación lumínica, es decir, la luz artificial que se dispersa en la atmósfera, tapa las estrellas más débiles. En un cielo realmente oscuro se pueden ver a simple vista unas 2,500 estrellas a la vez, además de la franja de la Vía Láctea. Paradójicamente, ver tantas cosas en el cielo hace que más personas noten satélites, meteoros y aviones, que a veces confunden con objetos misteriosos." }
    ],
    fact: "Dato verificable: en 2019 una broma en Facebook titulada «Storm Area 51» reunió a más de dos millones de personas que dijeron que «asistirían» a un asalto a la base el 20 de septiembre. Las autoridades se prepararon para una multitud, pero sólo unos cientos de curiosos llegaron a las cercanías de las entradas, unas pocas personas fueron detenidas y nadie entró. La mayoría se quedó en festivales improvisados en los pueblos de Rachel y Hiko.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '156,143,90' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(156,143,90,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradArea51M1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6B7A6E", "#7A6F5E", "#5E6F80", "#4F5A66", "#6E6478", "#7D6A5A", "#5F7462"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9C8F5A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9C8F5A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradArea51M1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(156,143,90,0.2)" />
            <stop offset="50%" stopColor="rgba(156,143,90,0.9)" />
            <stop offset="100%" stopColor="rgba(156,143,90,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9C8F5A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA BASE MILITAR REAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(156,143,90,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ÁREA 51 · PENSAMIENTO CRÍTICO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(156,143,90,0.2)'}`,
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
          layoutId="activeDotArea51M1"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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

      {/* ─── Two-Column Hero Section ─── */}
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

      {/* ─── Magazine Body ─── */}
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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
              </div>
            )}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(156,143,90,0.15)',
    }}>
      <Star size={14} style={{ color: '#9C8F5A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9C8F5A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(156,143,90,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9C8F5A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Area51M1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(156,143,90,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(156,143,90,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(156,143,90,0.08)', borderRadius: '16px',
              border: '1px solid rgba(156,143,90,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9C8F5A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Explorador de la Base: hechos documentados frente a rumores
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ─── Bibliografía ─── */}
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
