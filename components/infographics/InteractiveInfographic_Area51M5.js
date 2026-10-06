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
  "Rich, B. R. y Janos, L. (1994). Skunk Works: A Personal Memoir of My Years at Lockheed. Boston: Little, Brown.",
  "Johnson, C. L. «Kelly» y Smith, M. (1985). Kelly: More Than My Share of It All. Washington D. C.: Smithsonian Institution Press.",
  "Lockheed Martin. Kelly's 14 Rules & Practices. Lockheed Martin Skunk Works (lockheedmartin.com).",
  "Pedlow, G. W. y Welzenbach, D. E. (1992; publicación desclasificada 2013). The Central Intelligence Agency and Overhead Reconnaissance: The U-2 and OXCART Programs, 1954–1974. CIA History Staff.",
  "Robarge, D. (2007). Archangel: CIA's Supersonic A-12 Reconnaissance Aircraft. CIA, Center for the Study of Intelligence.",
  "U.S. Air Force. U-2S/TU-2S Fact Sheet (af.mil).",
  "Haines, G. K. (1997). CIA's Role in the Study of UFOs, 1947–90. Studies in Intelligence, 1(1).",
  "Brooks, F. P. (1975). The Mythical Man-Month: Essays on Software Engineering. Reading, MA: Addison-Wesley."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a51m5-nace-skunk-works",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-nace-skunk-works.webp',
    bannerCaption: "Kelly Johnson creó en 1943 la división secreta de Lockheed que terminó el prototipo XP-80, su primer caza a reacción, en 143 días.",
    title: "1943: nace el Skunk Works",
    color: '#5B7B8A',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-nace-skunk-works.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-nace-skunk-works.webp',
    content: [
      "En junio de 1943, en plena Segunda Guerra Mundial, las Fuerzas Aéreas del Ejército de Estados Unidos estaban preocupadas: Alemania probaba aviones a reacción y los Aliados no tenían nada parecido listo para combatir. La empresa Lockheed Aircraft Corporation, de Burbank, California, propuso diseñar un caza a reacción en solo 180 días. Para lograrlo, el ingeniero Clarence «Kelly» Johnson reunió a un pequeño grupo de ingenieros y mecánicos y los instaló en un espacio aparte, lejos de la burocracia de la fábrica principal.",
      "Las primeras instalaciones fueron muy humildes: una carpa de circo alquilada, levantada junto a una fábrica de plásticos que despedía un olor desagradable y rodeada de cajas de motores. Allí trabajaron una veintena de ingenieros y alrededor de un centenar de mecánicos y ayudantes. El prototipo XP-80 estuvo terminado en 143 días, antes del plazo prometido, y voló el 8 de enero de 1944. Su versión de producción, el P-80 Shooting Star, fue el primer caza a reacción operativo de la aviación militar estadounidense.",
      "¿Y el nombre? Viene de la tira cómica Li'l Abner, de Al Capp, en la que aparecía una destilería secreta llamada «Skonk Works» donde se fabricaba una bebida misteriosa con zorrillos y zapatos viejos. Por el mal olor de la fábrica vecina, el ingeniero Irv Culver empezó a contestar el teléfono interno diciendo «Skonk Works», y el apodo se quedó. Más tarde, para evitar problemas de derechos con la tira cómica, se cambió a «Skunk Works», que en inglés significa algo así como «el taller del zorrillo», y Lockheed lo registró como marca.",
      "Un detalle histórico importante: en 1943 la empresa se llamaba Lockheed, no Lockheed Martin. Lockheed Martin nació en 1995, cuando Lockheed se fusionó con la empresa Martin Marietta. Por eso, si lees que el Skunk Works pertenecía a Lockheed Martin en la época del P-80, del U-2 o del SR-71, recuerda que es un anacronismo, es decir, un dato colocado en una época que no le corresponde. Hoy el nombre oficial de la división es Lockheed Martin Advanced Development Programs, aunque todo el mundo la sigue llamando Skunk Works.",
      "Kelly Johnson nació en 1910 en Ishpeming, Michigan, hijo de inmigrantes suecos, y desde niño soñaba con diseñar aviones. Entró en Lockheed en 1933 y pronto destacó al proponer cambios en la cola del avión Electra después de probarlo en un túnel de viento. A lo largo de su carrera participó en el diseño de decenas de aviones, entre ellos el P-38 Lightning, el Constellation, el F-104 Starfighter, el U-2, el A-12 y el SR-71. Dirigió el Skunk Works hasta su retiro en 1975 y murió en 1990."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Kelly Johnson resumía su filosofía en un lema en inglés que todavía repiten los ingenieros del Skunk Works: «Be quick, be quiet, and be on time», es decir, sé rápido, sé discreto y cumple los plazos. Además, a él se suele atribuir el famoso principio KISS, «Keep it simple», mantenlo simple: un avión de combate debía poder repararlo un mecánico normal en una base remota usando solo herramientas básicas. La sencillez, para Johnson, también era una forma de ingeniería." },
      { label: "Dato Científico", icon: "atom", text: "El XP-80 usaba un motor turborreactor de diseño británico, el de Havilland Goblin, porque Estados Unidos aún no tenía un motor a reacción propio lo bastante potente. Un turborreactor funciona según la tercera ley de Newton: aspira aire, lo comprime, lo mezcla con combustible, lo quema y expulsa los gases calientes a gran velocidad hacia atrás. Como reacción, el avión es empujado hacia delante con una fuerza igual y opuesta." }
    ],
    fact: "Algunos P-80 de preserie llegaron a Europa en los últimos meses de la Segunda Guerra Mundial, pero no entraron en combate en ese conflicto. Sí combatieron después, en la guerra de Corea, donde en noviembre de 1950 un F-80 participó en uno de los primeros combates entre aviones a reacción de la historia. En apenas siete años, la aviación militar había pasado de las hélices a los motores a reacción.",
  },
  {
    id: "a51m5-reglas-de-kelly",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-reglas-de-kelly.webp',
    bannerCaption: "Kelly Johnson escribió 14 reglas para dirigir proyectos: equipos pequeños, autoridad clara, pocos informes y confianza mutua.",
    title: "Las 14 reglas de Kelly",
    color: '#8A6E5B',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-reglas-de-kelly.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-reglas-de-kelly.webp',
    content: [
      "Con los años, Kelly Johnson resumió su forma de trabajar en catorce reglas y prácticas que Lockheed Martin todavía publica. No eran leyes físicas, sino principios de organización para que un grupo de personas pudiera innovar rápido sin perder calidad ni seguridad. La primera regla decía que el director del proyecto debía tener prácticamente el control completo de su programa y responder directamente a la alta dirección de la empresa. Así se evitaba que cada decisión tuviera que pasar por docenas de oficinas.",
      "Otra regla pedía restringir «de manera implacable» el número de personas en el proyecto: usar un grupo pequeño de gente muy buena, entre un 10 y un 25 % de lo que se consideraba normal en otros programas. Menos personas significa menos reuniones, menos malentendidos y más responsabilidad para cada miembro del equipo. Cuando un equipo es pequeño, todos saben qué hacen los demás y los problemas se detectan pronto, antes de convertirse en desastres caros y difíciles de arreglar.",
      "Las reglas también atacaban el papeleo innecesario. Exigían un sistema de planos muy simple, que permitiera hacer cambios con rapidez, y que el número de informes fuera el mínimo indispensable, aunque el trabajo importante debía documentarse con cuidado. Además, el cliente, por ejemplo la CIA o la Fuerza Aérea, debía mantener una cooperación estrecha y diaria con el equipo, basada en la confianza mutua, para resolver las dudas en el momento en lugar de esperar cartas que tardaban semanas.",
      "Kelly también insistía en probar las cosas de verdad. Una regla establecía que el propio contratista debía tener autoridad para probar su avión en vuelo y hacerlo desde las primeras etapas, porque si no lo hacía perdería rápidamente la capacidad de diseñar otros vehículos. Otra pedía que las especificaciones se acordaran bien antes de firmar el contrato, y la regla número 13 ordenaba controlar estrictamente el acceso de personas ajenas al proyecto mediante medidas de seguridad adecuadas.",
      "La última regla hablaba de las personas: como en el Skunk Works trabajaba poca gente, había que encontrar formas de recompensar el buen desempeño con un sueldo que no dependiera del número de personas que alguien dirigía. Es decir, un ingeniero brillante podía ganar bien sin tener que convertirse en jefe de un gran departamento. Hoy muchas empresas tecnológicas aplican esta misma idea con las llamadas carreras técnicas, que permiten crecer profesionalmente sin abandonar el trabajo creativo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Kelly Johnson era famoso por ser muy exigente, pero también por cumplir lo que prometía. Según la historia oficial de la CIA, el programa del U-2 se completó por debajo del presupuesto previsto, algo excepcional en proyectos militares de ese tamaño. Esa reputación de honestidad técnica y económica hizo que la CIA y la Fuerza Aérea confiaran en él lo suficiente para concederle la libertad y la autoridad que pedían sus reglas." },
      { label: "Dato Científico", icon: "atom", text: "La razón matemática por la que los equipos pequeños se coordinan mejor está en los canales de comunicación. En un grupo de n personas hay n·(n−1)/2 parejas posibles que deben entenderse entre sí. Con 5 personas son 10 canales; con 20 son 190; con 100 ya son 4,950. Cada persona extra multiplica las conversaciones necesarias y, con ellas, las posibilidades de malentendidos, de información perdida y de retrasos." }
    ],
    fact: "El ingeniero informático Fred Brooks, que dirigió el desarrollo de un sistema operativo en IBM, llegó a una conclusión parecida en su libro «The Mythical Man-Month», de 1975: añadir personas a un proyecto de software que ya va retrasado lo retrasa todavía más, porque los recién llegados necesitan formación y aumentan la comunicación necesaria. Se conoce como ley de Brooks y confirma, en otro campo, la intuición de Kelly Johnson.",
  },
  {
    id: "a51m5-u2-contra-el-reloj",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-u2-contra-el-reloj.webp',
    bannerCaption: "Aprobado a finales de 1954, el U-2 hizo su primer vuelo en agosto de 1955, unos ocho meses después, en Groom Lake, Nevada.",
    title: "El U-2: un avión espía contra el reloj",
    color: '#6B7F5E',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-u2-contra-el-reloj.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-u2-contra-el-reloj.webp',
    content: [
      "A mediados de los años cincuenta, Estados Unidos sabía muy poco de lo que ocurría dentro de la Unión Soviética y temía un ataque sorpresa. El presidente Dwight Eisenhower aprobó a finales de noviembre de 1954 un programa secreto de la CIA, con el nombre en clave AQUATONE, para construir un avión capaz de fotografiar el territorio soviético volando más alto de lo que podían llegar sus cazas y sus defensas antiaéreas de la época. El encargo del diseño y la construcción recayó en el Skunk Works.",
      "Kelly Johnson propuso un diseño muy poco convencional: básicamente un planeador con motor a reacción, con alas larguísimas y estrechas, un fuselaje mínimo y un peso muy reducido. Para ahorrar kilos, su estructura se diseñó para soportar menos esfuerzo que la de un avión militar normal, y en lugar de un tren de aterrizaje tradicional llevaba ruedas en tándem. La idea parecía arriesgada, pero el equipo calculó que solo así se podía volar por encima de los 20 kilómetros con el motor J57 disponible.",
      "El trabajo avanzó a un ritmo impresionante. El primer vuelo, un salto involuntario del piloto de pruebas Tony LeVier durante una prueba de rodaje, ocurrió el 1 de agosto de 1955 en un lago seco de Nevada elegido por su aislamiento, y el primer vuelo oficial se realizó pocos días después, el 4 de agosto. Habían pasado unos ocho meses desde la aprobación del programa. Para comparar, muchos aviones militares de la época tardaban varios años en pasar del papel al primer vuelo de prueba.",
      "Para el A-12, sucesor del U-2 en los programas de la CIA, los plazos fueron mayores porque el reto era mucho más difícil. La CIA eligió el diseño de Lockheed a finales de agosto de 1959 y el primer vuelo llegó en abril de 1962, en Groom Lake: unos dos años y medio desde la elección hasta el despegue. El SR-71, una versión derivada para la Fuerza Aérea, voló por primera vez el 22 de diciembre de 1964 en Palmdale, California, y no en el Área 51. Conocer las fechas exactas ayuda a no exagerar.",
      "Estos tiempos tan cortos no fueron magia. Combinaban un cliente que tomaba decisiones rápido, un equipo pequeño con autoridad, pruebas en vuelo desde el principio y la disposición a corregir errores sobre la marcha. También tuvieron un precio: hubo accidentes durante las pruebas y algunos pilotos perdieron la vida. Conocer tanto los éxitos como los costos humanos ayuda a entender que innovar rápido exige una enorme responsabilidad con la seguridad de las personas que prueban las máquinas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Para el programa U-2 hubo que construir prácticamente desde cero una base en Groom Lake, con pista, hangares y alojamientos. Para animar a los trabajadores a ir a un lugar tan remoto y caluroso, Kelly Johnson bautizó la zona con el nombre irónico de «Paradise Ranch», el Rancho Paraíso. Con el tiempo el apodo se acortó a «the Ranch», el Rancho, un nombre que todavía usan algunos veteranos al recordar aquellos años de trabajo en el desierto." },
      { label: "Dato Científico", icon: "atom", text: "El U-2S actual tiene unos 32 metros de envergadura y unos 19 metros de longitud. Sus alas tienen un alargamiento muy alto, es decir, son muy largas en comparación con su anchura, igual que las de los planeadores y las de aves marinas como el albatros. Un alargamiento alto reduce la resistencia inducida, causada por los remolinos de aire que se forman en las puntas de las alas, y permite volar con poco empuje en el aire enrarecido de la estratosfera." }
    ],
    fact: "Hoy la Fuerza Aérea vuela la versión U-2S, que deriva del U-2R, un rediseño cerca de un 30 % más grande que voló por primera vez en 1967. Los aviones actuales se fabricaron en los años ochenta y en los noventa recibieron un nuevo motor General Electric F118. Así que el U-2 sigue en servicio más de 70 años después de su primer vuelo, pero no con la célula de 1955, sino con una versión ampliada y mejorada del diseño original.",
  },
  {
    id: "a51m5-aterrizar-un-u2",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-aterrizar-un-u2.webp',
    bannerCaption: "El U-2 aterriza guiado por radio desde un coche deportivo conducido por otro piloto de U-2, que le indica la altura sobre la pista.",
    title: "Aterrizar un U-2: el coche persecutor",
    color: '#7A6A8C',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-aterrizar-un-u2.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-aterrizar-un-u2.webp',
    content: [
      "El U-2 es uno de los aviones más difíciles de aterrizar del mundo. Sus alas enormes generan tanta sustentación que, cerca del suelo, el avión tiende a seguir flotando sobre un colchón de aire en lugar de posarse. Además, tiene un tren de aterrizaje en tándem, como una bicicleta: una rueda principal bajo el fuselaje delantero y otra pequeña atrás. Por eso el piloto debe lograr que el avión entre en pérdida, es decir, que deje de sustentarse, a muy poca altura de la pista y en el momento exacto.",
      "Desde la cabina, con el casco del traje presurizado y el largo morro delante, el piloto ve muy mal la pista que tiene justo debajo. La solución, que se mantiene desde hace décadas, es el coche persecutor: un automóvil deportivo conducido por otro piloto de U-2 cualificado, que acelera detrás del avión por la pista mientras este aterriza. Por radio le va indicando la altura de las ruedas sobre el suelo, de unos pocos pies cada vez, hasta que el avión toca tierra. Esa es la respuesta correcta del cuestionario.",
      "El coche tiene que ser rápido, porque el U-2 aterriza a velocidades parecidas a las de una autopista y el conductor debe alcanzarlo en pocos segundos. A lo largo de los años la Fuerza Aérea ha usado modelos deportivos como el Chevrolet Camaro, el Pontiac GTO o el Ford Mustang. Pero lo importante no es el coche, sino la persona: como el conductor también es piloto de U-2, entiende exactamente lo que siente quien está en la cabina y puede aconsejarle en una fracción de segundo.",
      "Al despegar, el U-2 lleva bajo cada ala unas ruedecitas auxiliares llamadas pogos, que lo mantienen nivelado mientras rueda por la pista. En cuanto el avión se eleva, los pogos se sueltan y caen al suelo para ahorrar peso. Al aterrizar ya no los tiene, así que, cuando pierde velocidad, una de sus alas se inclina hasta apoyarse en unos patines reforzados de la punta. Entonces el personal de tierra corre a colocar de nuevo los pogos para que el avión pueda rodar hasta el hangar.",
      "El aterrizaje del U-2 es una gran metáfora del trabajo en equipo del Skunk Works: ni el mejor piloto del mundo puede hacerlo solo. Necesita al compañero del coche, a los mecánicos de los pogos, a los controladores de la torre y a los técnicos que lo ayudaron a ponerse el traje. Cada persona tiene una función concreta y confía en que los demás harán bien la suya. Un sistema complejo funciona cuando cada parte conoce su papel y la comunicación entre todas es clara, rápida y precisa."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Al U-2 lo apodan «Dragon Lady», la Dama Dragón, en buena parte por lo exigente que resulta pilotarlo. Para formar a nuevos pilotos existe una versión biplaza, el TU-2S, en la que un instructor se sienta detrás y algo más alto que el alumno para poder guiarlo. El apodo refleja respeto: aunque el diseño tiene más de setenta años de historia, el U-2 sigue exigiendo una concentración total en cada despegue y en cada aterrizaje." },
      { label: "Dato Científico", icon: "atom", text: "La entrada en pérdida ocurre cuando el ala forma con el aire un ángulo demasiado grande, el llamado ángulo de ataque crítico: el flujo de aire se despega de la superficie superior y la sustentación cae bruscamente. Cerca del suelo aparece además el efecto suelo: el terreno impide que se formen del todo los remolinos de las puntas de las alas, lo que reduce la resistencia y aumenta la sustentación. Por eso el U-2 tiende a flotar sobre la pista." }
    ],
    fact: "En vuelo, a su altitud máxima, el U-2 tenía una ventana de velocidad muy estrecha: si iba un poco más lento entraba en pérdida, y si iba un poco más rápido podía sufrir vibraciones peligrosas por efectos cercanos a la velocidad del sonido. Los pilotos la llamaban «coffin corner», la esquina del ataúd, porque el margen entre ambos límites podía ser de apenas unos pocos nudos. Volarlo exigía una precisión extraordinaria durante horas.",
  },
  {
    id: "a51m5-janet-y-secreto",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-janet-y-secreto.webp',
    bannerCaption: "Los trabajadores de Groom Lake vuelan desde Las Vegas en aviones Boeing 737 blancos con franja roja que usan el indicativo JANET.",
    title: "JANET y la vida bajo secreto",
    color: '#5E7F7A',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-janet-y-secreto.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-janet-y-secreto.webp',
    content: [
      "Groom Lake está a unos 130 kilómetros en línea recta al norte de Las Vegas, en mitad del desierto de Nevada. Para que cientos de trabajadores llegaran cada día sin largos viajes por carretera, se organizó un servicio aéreo propio. Desde hace décadas lo realizan aviones de pasajeros Boeing 737 pintados de blanco con una franja roja, que despegan de una terminal privada del aeropuerto internacional de Las Vegas. Los aficionados a la aviación los conocen por su indicativo de radio: JANET.",
      "Nadie ha explicado oficialmente qué significa JANET. Entre los aficionados circula la broma de que son las siglas de «Just Another Non-Existent Terminal», que significa «solo otra terminal inexistente», pero es un acrónimo inventado a posteriori, no un nombre oficial demostrado. Aquí tienes una buena lección de pensamiento crítico: una explicación ingeniosa y muy repetida no se convierte en un hecho comprobado solo porque mucha gente la cuente en internet o en documentales.",
      "El secreto se organizaba con un principio llamado necesidad de saber: cada persona solo conocía la parte del proyecto imprescindible para su trabajo. Los trabajadores firmaban compromisos de confidencialidad que seguían vigentes después de dejar el empleo, y muchos no podían contar a su familia dónde pasaban la semana. El gobierno ni siquiera reconoció públicamente la base durante décadas, y la historia oficial de la CIA que la mencionaba por su nombre no se publicó hasta 2013.",
      "Vivir así tenía un costo. Algunos veteranos han contado lo difícil que era guardar secretos ante sus seres queridos, y muchos colegas murieron sin poder hablar de lo que hicieron. Cuando la CIA desclasificó gran parte del programa A-12 a partir de 2007, antiguos pilotos, ingenieros y técnicos, reunidos en una asociación llamada Roadrunners Internationale, empezaron a dar entrevistas y conferencias, y por fin recibieron reconocimiento público por un trabajo que habían guardado en silencio durante más de cuarenta años.",
      "El secreto también tuvo efectos inesperados. Como nadie podía explicar qué volaba sobre Nevada, los destellos de los aviones experimentales alimentaron rumores sobre naves extraterrestres. El estudio del historiador de la CIA Gerald Haines, de 1997, reconoce que la Fuerza Aérea dio explicaciones engañosas sobre algunos avistamientos para proteger estos programas. Cuando falta información verificada, la imaginación rellena los huecos, y por eso es tan importante distinguir entre lo documentado y lo que solo se rumorea."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los vuelos de JANET no solo van a Groom Lake: también conectan Las Vegas con otras instalaciones restringidas de Nevada, como el campo de pruebas de Tonopah, desde donde operaba en secreto el F-117 en la década de 1980. Durante muchos años la operación estuvo a cargo de EG&G, una empresa contratista histórica del sitio de pruebas de Nevada, y con el tiempo ha pasado por otras compañías. El gobierno publica muy poca información sobre estos vuelos." },
      { label: "Dato Científico", icon: "atom", text: "La compartimentación se entiende bien con un ejemplo de la ingeniería naval: los mamparos de un barco lo dividen en compartimentos estancos para que el agua de una vía no inunde todo el casco. En seguridad informática se aplica el mismo principio, llamado mínimo privilegio: cada persona o programa recibe solo el acceso que necesita para su tarea. Así, si un compartimento falla o se filtra, el daño queda limitado a una pequeña parte del sistema." }
    ],
    fact: "La existencia oficial del Área 51 se reconoció muy tarde. El estudio histórico de la CIA sobre los programas U-2 y OXCART, escrito en 1992, se publicó con sus menciones a Groom Lake en agosto de 2013, gracias a una solicitud de acceso a la información del Archivo de Seguridad Nacional de la Universidad George Washington. Hasta entonces, el nombre «Área 51» circulaba sobre todo en libros, documentales y rumores.",
  },
  {
    id: "a51m5-ben-rich-liderazgo",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-ben-rich-liderazgo.webp',
    bannerCaption: "Ben Rich sucedió a Kelly Johnson en 1975 y dirigió el Skunk Works durante el desarrollo del demostrador Have Blue y del F-117.",
    title: "Ben Rich: liderar una nueva generación",
    color: '#8C7A5B',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-ben-rich-liderazgo.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-ben-rich-liderazgo.webp',
    content: [
      "Ben Rich nació en 1925 en Manila, Filipinas, y se mudó con su familia a Estados Unidos siendo niño. Estudió ingeniería en la Universidad de California y entró en Lockheed en 1950. En el Skunk Works trabajó como especialista en termodinámica y propulsión: fue uno de los ingenieros que resolvieron los problemas de calor y de las tomas de aire del A-12 y del SR-71. En 1975, cuando Kelly Johnson se retiró, Rich fue elegido para sucederle como director de la división.",
      "Su estilo de liderazgo era distinto al de Johnson. Kelly era conocido por su carácter fuerte y su autoridad indiscutible; Rich, por su sentido del humor y su disposición a escuchar las ideas de los ingenieros más jóvenes. Esa apertura fue decisiva: cuando el especialista en radar Denys Overholser propuso usar las ecuaciones de un físico soviético para calcular el eco de radar de un avión hecho de placas planas, Rich le dio apoyo y recursos para desarrollar la idea.",
      "A mediados de los años setenta, la agencia de investigación del Pentágono, DARPA, buscaba un avión con un eco de radar diminuto. Lockheed ganó la competencia frente a Northrop tras medir sus modelos en un campo de pruebas de radar. Rich apostó por el diseño facetado aunque a algunos veteranos, incluido el propio Kelly Johnson, les parecía que no volaría bien. El demostrador Have Blue voló en 1977 en Groom Lake y, a partir de él, el Skunk Works desarrolló el F-117, que hizo su primer vuelo en 1981.",
      "El F-117 se mantuvo en secreto durante años. La Fuerza Aérea lo operaba sobre todo de noche desde el campo de pruebas de Tonopah, en Nevada, y no reconoció públicamente su existencia hasta noviembre de 1988. Bajo la dirección de Rich, el Skunk Works trabajó también en otros proyectos y trató de mantener el principio de equipos pequeños, aunque los programas eran cada vez más grandes y complejos. Rich dirigió la división hasta su retiro en 1991.",
      "Poco antes de morir en 1995, Ben Rich publicó con el periodista Leo Janos el libro «Skunk Works», unas memorias que contaron con autorización muchos detalles del trabajo en el U-2, el SR-71 y el F-117. Es una fuente muy valiosa, aunque conviene leerla como lo que es: el recuerdo personal de un protagonista, con sus opiniones y anécdotas. Los historiadores la comparan con documentos oficiales desclasificados para separar los hechos comprobados de los recuerdos que pueden ser imprecisos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchos libros y documentales comparan el eco de radar del F-117 con el de un pájaro pequeño o el de una canica. Son comparaciones llamativas que ayudan a imaginar la idea, pero no son datos oficiales: los valores exactos de la sección transversal de radar de los aviones furtivos siguen siendo secretos, y las cifras que circulan son estimaciones. Un buen pensador crítico siempre pregunta de dónde sale cada número antes de repetirlo." },
      { label: "Dato Científico", icon: "atom", text: "La termodinámica, la especialidad de Ben Rich, es la rama de la física que estudia el calor, la energía y cómo se transforman. Su primera ley dice que la energía no se crea ni se destruye, solo cambia de forma; la segunda, que el calor fluye espontáneamente de lo caliente a lo frío. En un avión de Mach 3 hay que llevar la cuenta de cada fuente de calor y decidir a dónde se envía: al combustible, a la estructura o al aire exterior." }
    ],
    fact: "El sigilo cambió la forma de diseñar aviones militares en todo el mundo. Tras el F-117 llegaron el bombardero B-2 de Northrop y cazas como el F-22 y el F-35, en cuyo desarrollo participó Lockheed Martin, y hoy varios países trabajan en aviones furtivos propios. Todo empezó con una pregunta matemática, cómo calcular el eco de radar de una forma, y con un director dispuesto a escuchar una idea poco convencional.",
  },
  {
    id: "a51m5-legado-innovacion",
    bannerImage: '/assets/area51/infographic_m5/banner_a51m5-legado-innovacion.webp',
    bannerCaption: "Hoy «skunkworks» designa a cualquier equipo pequeño y autónomo que desarrolla un proyecto innovador al margen de la burocracia.",
    title: "El legado: equipos pequeños, grandes ideas",
    color: '#6E6E80',
    btnImage: '/assets/area51/infographic_m5/btn_a51m5-legado-innovacion.webp',
    image: '/assets/area51/infographic_m5/hero_a51m5-legado-innovacion.webp',
    content: [
      "El éxito del Skunk Works fue tan grande que su nombre se convirtió en una palabra común en inglés: hoy se llama «skunkworks» a cualquier equipo pequeño y con mucha autonomía que trabaja en un proyecto innovador, separado de la estructura normal de una organización. Otras compañías aeroespaciales crearon divisiones parecidas, como Phantom Works, nacida en McDonnell Douglas y hoy parte de Boeing, y el modelo se estudia en escuelas de ingeniería y de negocios de todo el mundo.",
      "Muchas empresas tecnológicas han aplicado ideas similares. Google creó en 2010 un laboratorio llamado Google X, hoy conocido simplemente como X, la «fábrica de proyectos lunares», donde pequeños equipos exploran ideas muy ambiciosas, como los coches autónomos que dieron origen a la empresa Waymo. Una de sus normas culturales es cancelar pronto los proyectos que no funcionan y reconocer a quienes lo hacen, porque descubrir rápido que una idea falla ahorra tiempo, dinero y esfuerzo.",
      "¿Qué ingredientes comparten estos equipos? Un objetivo claro y difícil, personas con habilidades complementarias, autoridad para decidir sin esperar semanas, contacto directo con quien necesita el resultado y pruebas tempranas para aprender de los errores. También un propósito compartido: los ingenieros del U-2 y del A-12 sabían que su trabajo era importante en plena Guerra Fría, y esa motivación los ayudaba a superar jornadas larguísimas y problemas que parecían imposibles de resolver.",
      "Pero el modelo también tiene límites, y un pensador crítico debe conocerlos. El secreto extremo dificulta que expertos externos detecten errores, puede ocultar costos y riesgos al público, y no todos los proyectos de los equipos «skunkworks» han tenido éxito. Además, funcionó porque había clientes con mucho dinero, prioridades muy claras y líderes excepcionales. Copiar solo la parte de «menos reglas», sin la responsabilidad, la seguridad y la honestidad técnica, no produce los mismos resultados.",
      "Tú puedes aplicar estas ideas en un proyecto escolar o en un club de ciencias. Formen un equipo pequeño donde cada persona aporte algo distinto, definan juntos un objetivo concreto, construyan prototipos rápidos y baratos, pruébenlos pronto y anoten lo que aprendan de cada fallo. Y, sobre todo, compartan sus resultados para que otros puedan revisarlos. La gran lección del Skunk Works es que no hace falta tecnología extraterrestre para lograr lo que parecía imposible: basta con ingenio humano bien organizado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El método de trabajo de muchos equipos de software actuales, llamado desarrollo ágil, comparte varias ideas con las reglas de Kelly Johnson, aunque surgió de forma independiente. El Manifiesto Ágil, firmado en 2001 por diecisiete programadores, valora más a las personas y sus interacciones que los procesos, el software que funciona más que la documentación exhaustiva, y la colaboración con el cliente más que la negociación de contratos." },
      { label: "Dato Científico", icon: "atom", text: "Los ingenieros usan un ciclo llamado diseñar, construir, probar y aprender. Cada vuelta del ciclo reduce la incertidumbre, porque un prototipo barato puede revelar en pocos días problemas que ningún cálculo había previsto. La NASA lo combina con los niveles de madurez tecnológica, o TRL, una escala del 1 al 9 que va desde los principios básicos observados en el laboratorio hasta un sistema probado con éxito en misiones reales." }
    ],
    fact: "El Skunk Works sigue activo en Palmdale, California, con el nombre oficial de Lockheed Martin Advanced Development Programs y su característico logotipo de un zorrillo. Entre sus proyectos recientes está el X-59 QueSST, un avión experimental de la NASA diseñado para volar a velocidad supersónica produciendo un golpe sónico mucho más suave que un estampido tradicional, con el objetivo de que algún día vuelvan los vuelos comerciales supersónicos sobre tierra.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradArea51M5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7B8A", "#8A6E5B", "#6B7F5E", "#7A6A8C", "#5E7F7A", "#8C7A5B", "#6E6E80"];
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
          <linearGradient id="gradArea51M5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(156,143,90,0.2)" />
            <stop offset="50%" stopColor="rgba(156,143,90,0.9)" />
            <stop offset="100%" stopColor="rgba(156,143,90,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9C8F5A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">INNOVACIÓN Y TRABAJO EN EQUIPO</text>
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
          layoutId="activeDotArea51M5"
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
export default function InteractiveInfographic_Area51M5() {
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
              🏆 Innovador: cómo un equipo pequeño cambió la historia de la aviación
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
