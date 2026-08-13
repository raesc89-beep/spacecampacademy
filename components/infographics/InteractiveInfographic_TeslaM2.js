'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ━━━ SVG Decorative Elements (Electricity / AC themed) ━━━━━━━━━━━━━━━━━━━━━━
function DecoSineWave({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* AC sine wave */}
      <path d="M5 21 Q12 5 19 21 Q26 37 33 21 Q40 5 47 21 Q54 37 61 21" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Zero line */}
      <line x1="3" y1="21" x2="67" y2="21" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
      {/* Amplitude arrows */}
      <line x1="12" y1="8" x2="12" y2="21" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="34" x2="26" y2="21" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Frequency markers */}
      <circle cx="19" cy="21" r="1.5" fill={color} opacity="0.5" />
      <circle cx="47" cy="21" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoLightBulb({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Bulb outline */}
      <path d="M30 8 C18 8 10 18 10 28 C10 35 16 40 20 44 L20 48 L40 48 L40 44 C44 40 50 35 50 28 C50 18 42 8 30 8Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Filament */}
      <path d="M24 30 Q27 22 30 30 Q33 38 36 30" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Base */}
      <rect x="22" y="48" width="16" height="3" rx="1" fill={color} opacity="0.3" />
      <rect x="24" y="52" width="12" height="2" rx="1" fill={color} opacity="0.25" />
      {/* Glow rays */}
      <line x1="30" y1="2" x2="30" y2="5" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="14" x2="53" y2="12" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="7" y1="12" x2="10" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="55" y1="28" x2="58" y2="28" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="2" y1="28" x2="5" y2="28" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoTransformer({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Iron core */}
      <rect x="26" y="8" width="8" height="44" rx="2" fill={color} opacity="0.2" />
      {/* Primary coil (left) */}
      {[0,1,2,3,4,5,6].map((i) => (
        <ellipse key={`p${i}`} cx="22" cy={12 + i * 5.5} rx="8" ry="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      ))}
      {/* Secondary coil (right) - more turns */}
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <ellipse key={`s${i}`} cx="38" cy={10 + i * 4} rx="6" ry="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* Arrows showing energy direction */}
      <path d="M8 30 L14 30" stroke={color} strokeWidth="1" opacity="0.4" markerEnd="url(#arrowT)" />
      <path d="M46 30 L52 30" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoMotor({ size = 60, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stator outer ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Rotor */}
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
      {/* Magnetic field lines */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 11 * Math.cos(rad)} y1={30 + 11 * Math.sin(rad)} x2={30 + 19 * Math.cos(rad)} y2={30 + 19 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.5" />;
      })}
      {/* Rotation arrow */}
      <path d="M30 17 A13 13 0 0 1 43 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M42 27 L43 30 L40 30" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoTowerPylon({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tower structure */}
      <line x1="30" y1="5" x2="20" y2="55" stroke={color} strokeWidth="1.5" />
      <line x1="30" y1="5" x2="40" y2="55" stroke={color} strokeWidth="1.5" />
      {/* Cross bars */}
      <line x1="24" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="22" y1="35" x2="38" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="21" y1="45" x2="39" y2="45" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Wire arms */}
      <line x1="10" y1="12" x2="50" y2="12" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="14" y1="8" x2="14" y2="12" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="46" y1="8" x2="46" y2="12" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Power lines extending */}
      <path d="M2 10 Q8 14 14 8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 8 Q52 14 58 10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Insulators */}
      <circle cx="14" cy="12" r="1.5" fill={color} opacity="0.3" />
      <circle cx="46" cy="12" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoLightning({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'problema-electricidad-1880': [DecoLightBulb, DecoTowerPylon, DecoLightning],
  'vision-de-tesla': [DecoSineWave, DecoMotor, DecoLightning],
  'motor-de-induccion': [DecoMotor, DecoSineWave, DecoTransformer],
  'guerra-de-corrientes': [DecoLightning, DecoLightBulb, DecoTowerPylon],
  'central-niagara-falls': [DecoTowerPylon, DecoTransformer, DecoSineWave],
  'transformador-transmision': [DecoTransformer, DecoTowerPylon, DecoMotor],
  'ac-vida-diaria': [DecoSineWave, DecoLightBulb, DecoTransformer],
};

// ━━━ Content Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
  'Cheney, M. (2001). Tesla: Man Out of Time, Simon & Schuster',
  'Jonnes, J. (2003). Empires of Light: Edison, Tesla, Westinghouse, and the Race to Electrify the World, Random House',
  'McNichol, T. (2006). AC/DC: The Savage Tale of the First Standards War, Jossey-Bass',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'problema-electricidad-1880',
    title: 'El Problema de la Electricidad en 1880',
    color: '#6B7B8A',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_problema-electricidad-1880.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_problema-electricidad-1880.jpg',
    content: [
      'En la década de 1880, Thomas Alva Edison había construido un sistema eléctrico basado en corriente continua (DC) que alimentaba pequeñas zonas de ciudades como Nueva York. Su primera central eléctrica, la estación de Pearl Street, comenzó a operar el 4 de septiembre de 1882 y suministraba electricidad a apenas 85 clientes en un radio de aproximadamente 1.6 kilómetros en el bajo Manhattan. La corriente continua fluye siempre en una sola dirección, como el agua que sale de una manguera, y esta característica presentaba limitaciones técnicas que pronto se convertirían en un obstáculo para la expansión del servicio eléctrico a gran escala.',
      'El problema fundamental de la corriente continua era la pérdida de energía durante la transmisión. Cuando la electricidad viaja por cables, parte de esa energía se disipa en forma de calor debido a la resistencia del conductor. En el sistema DC de Edison, que operaba a voltajes bajos (típicamente 110 voltios), las pérdidas eran tan severas que resultaba imposible transmitir electricidad a más de 1.6 kilómetros de la central generadora sin que la señal se degradara a niveles inutilizables. Esto significaba que cada vecindario de una ciudad necesitaba su propia planta generadora, lo cual encarecía enormemente la infraestructura.',
      'Edison intentó resolver este problema aumentando el grosor de los cables de cobre para reducir la resistencia, pero esto elevaba los costos de forma prohibitiva. Un cable capaz de transmitir DC a 16 kilómetros habría requerido un conductor de cobre tan grueso y pesado que su precio superaría el valor de la propia central eléctrica. Además, los voltajes bajos del sistema DC eran peligrosos de otra manera: para entregar suficiente potencia, se necesitaban corrientes muy altas, lo que calentaba los cables y provocaba incendios en los edificios conectados al sistema.',
      'La iluminación eléctrica estaba reservada para los distritos más ricos de las grandes ciudades. En 1883, solo unas pocas manzanas de Nueva York, Londres y París tenían luz eléctrica. El resto del mundo seguía dependiendo de lámparas de gas, queroseno y velas. Las zonas rurales y las ciudades pequeñas parecían condenadas a quedar excluidas de la revolución eléctrica, simplemente porque la tecnología DC de Edison no podía llevar energía más allá de distancias muy cortas sin construir una central en cada localidad.',
      'El imperio de Edison no era solo tecnológico sino también financiero. La Edison Electric Light Company contaba con el respaldo de J.P. Morgan, el banquero más poderoso de Estados Unidos, quien había invertido personalmente en el sistema DC. La residencia de Morgan en la calle Madison número 219 fue una de las primeras casas particulares en tener iluminación eléctrica en 1882. Esta alianza entre Edison y el capital financiero más fuerte del país significaba que cualquier tecnología rival tendría que enfrentarse no solo a argumentos técnicos, sino también a una enorme presión económica y política para mantener el statu quo de la corriente continua.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La estación de Pearl Street de Edison sufría averías constantes. El 2 de enero de 1890, un cortocircuito provocó un incendio que destruyó la central por completo. Los cables subterráneos de DC se sobrecalentaban con frecuencia y causaban incendios en los sótanos de los edificios conectados. En los primeros años del sistema, los bomberos de Nueva York respondían regularmente a emergencias causadas por la infraestructura eléctrica de Edison, lo que generaba desconfianza pública hacia la nueva tecnología.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La pérdida de potencia en un cable eléctrico se calcula con la fórmula P = I² × R, donde P es la potencia perdida, I es la corriente y R es la resistencia del cable. Esta ecuación muestra que las pérdidas aumentan con el cuadrado de la corriente. Si se duplica el voltaje, la corriente se reduce a la mitad para la misma potencia, pero las pérdidas se reducen a una cuarta parte. Por eso transmitir a alto voltaje (posible con AC, no con DC) reduce drásticamente las pérdidas energéticas en líneas de transmisión de larga distancia.' },
    ],
    fact: 'En 1882, Edison necesitó instalar 23 kilómetros de cables de cobre subterráneos solo para alimentar a sus primeros 85 clientes en un área de menos de 2.6 kilómetros cuadrados. El cobre representaba el 62% del costo total de la instalación. A ese ritmo, electrificar todo Manhattan habría requerido más de 1,200 kilómetros de cable de cobre grueso, con un costo estimado de 25 millones de dólares de la época, equivalente a más de 700 millones de dólares actuales, una cifra que hacía el proyecto económicamente inviable con tecnología DC.',
  },
  {
    id: 'vision-de-tesla',
    title: 'La Visión de Tesla',
    color: '#D4A535',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_vision-de-tesla.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_vision-de-tesla.jpg',
    content: [
      'Nikola Tesla nació el 10 de julio de 1856 en Smiljan, un pueblo del Imperio Austrohúngaro (actual Croacia). Desde joven mostró una capacidad mental poco común: podía visualizar máquinas completas en su mente con tal detalle que las construía mentalmente, las ponía en funcionamiento imaginario y volvía semanas después a verificar el desgaste de las piezas, todo sin dibujar un solo plano. Esta habilidad de visualización tridimensional, que Tesla describió en su autobiografía de 1919, sería fundamental para concebir el motor de corriente alterna sin necesidad de prototipos físicos previos.',
      'El momento de revelación ocurrió en febrero de 1882, mientras Tesla caminaba por el parque Városliget de Budapest con su amigo Antal Szigety. Al contemplar la puesta de sol, Tesla recitaba versos del Fausto de Goethe cuando, según su propio relato, la solución al problema del motor de corriente alterna apareció completa en su mente. Tomó un palo y dibujó en la arena los diagramas del campo magnético rotatorio, el principio que permitiría construir un motor eléctrico sin las escobillas y conmutadores que hacían a los motores DC poco eficientes, ruidosos y propensos a generar chispas peligrosas.',
      'El concepto del campo magnético rotatorio se basa en un principio elegante: si se alimentan dos o más bobinas con corrientes alternas desfasadas entre sí, sus campos magnéticos individuales se combinan para crear un campo magnético que gira de forma continua y suave. Este campo giratorio arrastra al rotor (la parte móvil del motor) sin necesidad de contacto físico entre las partes fijas y las móviles. Tesla comprendió que podía usar la propia naturaleza oscilante de la corriente alterna como ventaja, convirtiendo lo que otros veían como un defecto en la base de una tecnología superior.',
      'Entre 1882 y 1884, Tesla trabajó para la Continental Edison Company en París y Estrasburgo, donde construyó su primer motor de inducción funcional. Sin embargo, sus superiores en la compañía de Edison en Europa no mostraron interés en la corriente alterna. Charles Batchelor, gerente de la planta de París y amigo de Edison, le dio una carta de recomendación para Edison y le aconsejó ir a América. Tesla llegó a Nueva York el 6 de junio de 1884 con cuatro centavos en el bolsillo, algunos poemas, cálculos para una máquina voladora y la visión del campo magnético rotatorio grabada en su memoria.',
      'La visión de Tesla no se limitaba al motor. Él concibió un sistema eléctrico completo: generadores de corriente alterna polifásica, transformadores para elevar y reducir el voltaje, líneas de transmisión de larga distancia y motores de inducción en el destino final. Mientras Edison pensaba en soluciones locales (una central por vecindario), Tesla pensaba en una red integrada que pudiera llevar electricidad desde una cascada en las montañas hasta una ciudad a cientos de kilómetros de distancia. Esta visión sistémica, concebida antes de que existiera un solo componente físico del sistema, es lo que distingue a Tesla como ingeniero de sistemas, no solo como inventor de dispositivos individuales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla tenía una memoria eidética y hablaba ocho idiomas: serbocroata, checo, inglés, francés, alemán, húngaro, italiano y latín. Podía memorizar libros completos y recitar páginas enteras de memoria. En sus años de estudio en la Universidad Politécnica de Graz (Austria), sus profesores sospecharon que hacía trampa porque resolvía integrales de cálculo mentalmente, sin escribir los pasos intermedios. El decano escribió a su padre sugiriendo que Nikola estaba enfermo por exceso de trabajo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El campo magnético rotatorio de Tesla se basa en las ecuaciones de Maxwell publicadas en 1865. Cuando dos corrientes alternas desfasadas 90 grados alimentan dos pares de bobinas perpendiculares, el campo magnético resultante rota a la frecuencia de la corriente aplicada. En un sistema trifásico (tres corrientes desfasadas 120 grados), el campo rotatorio es más uniforme y potente. La velocidad de rotación del campo se calcula como N = 120f/p, donde f es la frecuencia en hertzios y p es el número de polos magnéticos del motor.' },
    ],
    fact: 'El parque Városliget de Budapest, donde Tesla tuvo su revelación sobre el campo magnético rotatorio en 1882, existe todavía hoy y alberga una estatua de Tesla inaugurada en 2006 en el 150 aniversario de su nacimiento. La estatua fue diseñada por los escultores croatas Leo Mol y Frano Kršinić, y muestra a Tesla de pie sosteniendo una esfera que representa el campo magnético rotatorio. La inscripción dice en húngaro y serbio: "Aquí, en febrero de 1882, Nikola Tesla concibió el campo magnético rotatorio que cambió el curso de la civilización."',
  },
  {
    id: 'motor-de-induccion',
    title: 'El Motor de Inducción',
    color: '#7A8B96',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_motor-de-induccion.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_motor-de-induccion.jpg',
    content: [
      'El motor de inducción de corriente alterna es considerado por muchos ingenieros como una de las diez invenciones más importantes de la era moderna. A diferencia de los motores de corriente continua, que requieren escobillas de carbón en contacto con un conmutador giratorio para funcionar, el motor de inducción de Tesla no tiene partes que se toquen entre sí en su mecanismo electromagnético principal. Las escobillas de los motores DC se desgastan, generan chispas y requieren mantenimiento constante. El motor de Tesla eliminó estos problemas de raíz, creando una máquina que podía funcionar durante décadas con un mantenimiento mínimo.',
      'El funcionamiento del motor de inducción se basa en el principio de inducción electromagnética descubierto por Michael Faraday en 1831. Cuando el campo magnético rotatorio creado por las bobinas del estator (la parte fija) pasa sobre las barras conductoras del rotor (la parte móvil), induce corrientes eléctricas en esas barras. Estas corrientes inducidas crean su propio campo magnético, que interactúa con el campo rotatorio del estator y produce un torque (fuerza de giro) que hace girar al rotor. El rotor siempre gira ligeramente más lento que el campo del estator; esta diferencia de velocidad se denomina "deslizamiento" y es necesaria para que funcione la inducción.',
      'Tesla no fue el único que investigó motores de corriente alterna. En Italia, Galileo Ferraris desarrolló de forma independiente un motor de campo rotatorio bifásico en 1885, y lo presentó públicamente ante la Real Academia de Ciencias de Turín el 18 de marzo de 1888. Tesla presentó su patente el 12 de octubre de 1887, meses antes de la presentación de Ferraris. Ambos llegaron al mismo principio por caminos separados, pero Tesla llevó el concepto más lejos al desarrollar el sistema polifásico completo, incluyendo generadores y transformadores, mientras que Ferraris se centró exclusivamente en el motor y publicó un artículo donde afirmaba que el motor de inducción tenía poca aplicación práctica.',
      'El 16 de mayo de 1888, Tesla presentó su conferencia "Un Nuevo Sistema de Motores de Corriente Alterna y Transformadores" ante el Instituto Americano de Ingenieros Eléctricos (AIEE) en Nueva York. En esta presentación, demostró un sistema polifásico completo con generador, transformador y motor funcionando en conjunto. La demostración fue un evento decisivo en la historia de la ingeniería eléctrica. George Westinghouse, que estaba en la audiencia, inmediatamente reconoció el potencial del sistema y comenzó negociaciones para adquirir las patentes de Tesla.',
      'Westinghouse pagó a Tesla 60,000 dólares en efectivo por sus patentes más una regalía de 2.50 dólares por cada caballo de fuerza de electricidad AC generada con su tecnología. Tesla también recibió un contrato como consultor con un salario de 2,000 dólares mensuales, una cifra considerable para 1888. Westinghouse llevó a Tesla a su fábrica en Pittsburgh, donde los ingenieros de Westinghouse adaptaron los diseños de Tesla para la producción industrial. El trabajo fue difícil porque los ingenieros de Westinghouse estaban acostumbrados a trabajar con frecuencias de 133 Hz, mientras que Tesla prefería 60 Hz. Finalmente, el estándar de 60 Hz propuesto por Tesla se adoptó en toda Norteamérica, y sigue vigente hoy.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los motores de inducción de Tesla representan hoy más del 45% del consumo eléctrico mundial. Están presentes en ventiladores, compresores de refrigeradores, bombas de agua, sistemas de aire acondicionado, elevadores, trenes, y miles de aplicaciones industriales. Un automóvil eléctrico Tesla Model S utiliza un motor de inducción AC trifásico que produce 362 caballos de fuerza. La empresa Tesla Motors eligió su nombre precisamente en honor a Nikola Tesla y a su invención del motor de inducción de corriente alterna.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La eficiencia de un motor de inducción moderno puede alcanzar el 96-97% en tamaños industriales grandes, lo que significa que solo el 3-4% de la energía eléctrica se pierde como calor. En comparación, un motor DC típico tiene una eficiencia del 75-85%. El deslizamiento típico de un motor de inducción es del 2-5%, lo que significa que si el campo magnético gira a 1800 RPM (en un motor de 4 polos a 60 Hz), el rotor gira a aproximadamente 1728-1764 RPM. Esta pequeña diferencia de velocidad es lo que permite la inducción de corrientes en el rotor.' },
    ],
    fact: 'Tesla recibió la patente estadounidense número 381,968 el 1 de mayo de 1888 por su "Motor Electromagnético", y en total registró más de 40 patentes relacionadas con su sistema polifásico de corriente alterna entre 1887 y 1891. Cuando falleció el 7 de enero de 1943 en Nueva York, poseía aproximadamente 300 patentes en 26 países. El tribunal supremo de Estados Unidos confirmó ese mismo año la prioridad de Tesla sobre Marconi en la invención de la radio, reconociendo la patente de Tesla de 1897 como anterior a la de Marconi.',
  },
  {
    id: 'guerra-de-corrientes',
    title: 'La Guerra de las Corrientes',
    color: '#C49225',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_guerra-de-corrientes.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_guerra-de-corrientes.jpg',
    content: [
      'La llamada "Guerra de las Corrientes" fue uno de los conflictos tecnológicos e industriales más intensos del siglo XIX. Entre 1886 y 1893, Thomas Edison y su sistema de corriente continua (DC) se enfrentaron directamente a Nikola Tesla, George Westinghouse y la corriente alterna (AC) por el dominio del mercado eléctrico de Estados Unidos y, eventualmente, del mundo entero. Lo que comenzó como una competencia técnica se transformó rápidamente en una campaña pública donde la propaganda, el miedo y la manipulación se usaron como armas tanto como los argumentos científicos y económicos.',
      'Edison, viendo cómo la corriente alterna ganaba terreno comercial, lanzó una campaña de relaciones públicas para desprestigiar la tecnología rival. Contrató a Harold P. Brown, un ingeniero eléctrico que realizó demostraciones públicas electrocutando animales (perros callejeros, caballos y, en un caso documentado el 4 de enero de 1903, una elefanta llamada Topsy en Coney Island) para "demostrar" los peligros de la corriente alterna. Edison también promovió activamente el uso de la corriente alterna para la silla eléctrica, estrenada en la ejecución de William Kemmler el 6 de agosto de 1890, con la intención de asociar el AC con la muerte en la mente del público.',
      'La realidad técnica era más matizada de lo que sugería la propaganda de Edison. La corriente alterna sí puede ser más peligrosa que la DC a voltajes bajos porque el efecto de la alternancia puede provocar fibrilación cardíaca. Sin embargo, a los voltajes domésticos estándar (110-120 V), tanto AC como DC presentan riesgos similares. Lo que Edison omitía deliberadamente era que su propio sistema DC operaba con corrientes mucho más altas para compensar el bajo voltaje, lo que generaba más calor en los cables y un mayor riesgo de incendios. Además, la capacidad del AC de transformarse a voltajes altos para la transmisión y luego reducirse para el uso doméstico lo hacía más seguro en el diseño general del sistema eléctrico.',
      'George Westinghouse respondió a la campaña de Edison con datos económicos y técnicos. Demostró que su sistema AC podía iluminar edificios y fábricas a una fracción del costo del sistema DC. La victoria más visible llegó en 1893 cuando la Westinghouse Electric Corporation ganó el contrato para iluminar la Exposición Universal de Chicago (World\'s Columbian Exposition), ofreciendo un precio de 5.25 dólares por lámpara frente a los 13.98 dólares que pedía General Electric (la compañía heredera de Edison). La exposición utilizó 200,000 bombillas alimentadas por 12 generadores AC de 1,000 caballos de fuerza cada uno y fue visitada por 27 millones de personas.',
      'La guerra tuvo un costo personal enorme para sus protagonistas. Westinghouse casi fue arruinado financieramente por la competencia. Cuando sus banqueros exigieron que renegociara las regalías de Tesla para reducir costos, Tesla tomó una decisión que definiría su carácter: rompió el contrato de regalías voluntariamente, renunciando a lo que podría haber sido una fortuna calculada en 12 millones de dólares de la época (equivalente a más de 350 millones de dólares actuales). Tesla declaró que valoraba más la amistad de Westinghouse y el triunfo de la corriente alterna que el dinero. Esta decisión, noble pero financieramente desastrosa, contribuyó a que Tesla pasara sus últimos años en la pobreza, viviendo en la habitación 3327 del Hotel New Yorker.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Edison acuñó el verbo "westinghoused" (ser "westinghoused") como sinónimo de electrocución, intentando asociar el nombre de su rival con la muerte. También financió cortometrajes donde se electrocutaban animales con corriente alterna. La ironía es que la compañía de Edison, General Electric, terminó adoptando la corriente alterna apenas unos años después de perder la guerra de las corrientes. Para 1896, GE vendía sus propios equipos de AC, efectivamente reconociendo la superioridad de la tecnología que Edison había intentado destruir.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La corriente necesaria para causar fibrilación cardíaca es de aproximadamente 75-100 miliamperios tanto para AC como para DC. Sin embargo, la corriente alterna a 60 Hz es particularmente peligrosa porque esta frecuencia coincide cercanamente con la frecuencia natural de las contracciones del corazón humano (1-2 Hz para el pulso, pero el tejido cardíaco responde a frecuencias mucho más altas). A frecuencias superiores a 1,000 Hz, la corriente alterna se vuelve progresivamente menos peligrosa porque tiende a fluir por la superficie de la piel en lugar de penetrar al interior del cuerpo, un fenómeno conocido como efecto piel.' },
    ],
    fact: 'La Exposición Universal de Chicago de 1893, iluminada por corriente alterna de Westinghouse y Tesla, fue apodada "La Ciudad Blanca" por sus miles de luces eléctricas. Fue la primera vez que millones de personas vieron iluminación eléctrica a gran escala. La exposición consumía tres veces más electricidad que toda la ciudad de Chicago en ese momento. La famosa noria original (Ferris wheel), construida para la exposición, también funcionaba con motores de corriente alterna. Esta demostración masiva convenció al público estadounidense de que la electricidad AC era el futuro, y la guerra de las corrientes quedó efectivamente decidida.',
  },
  {
    id: 'central-niagara-falls',
    title: 'La Central de Niágara Falls',
    color: '#8A9AA6',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_central-niagara-falls.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_central-niagara-falls.jpg',
    content: [
      'Las cataratas del Niágara, ubicadas en la frontera entre Estados Unidos y Canadá, habían sido reconocidas durante décadas como una fuente potencial de energía hidroeléctrica de proporciones considerables. El agua cae desde una altura de 51 metros con un caudal promedio de 2,832 metros cúbicos por segundo, lo que representa una cantidad de energía cinética enorme. En 1886, la Niagara Falls Power Company comenzó a estudiar cómo aprovechar esta fuerza natural. Se formó una comisión internacional liderada por el ingeniero y científico británico Lord Kelvin para evaluar las propuestas técnicas de diferentes empresas y decidir qué sistema eléctrico se utilizaría para la planta generadora.',
      'Lord Kelvin inicialmente favorecía la corriente continua de Edison, pero tras estudiar las demostraciones del sistema polifásico de Tesla y Westinghouse, cambió de opinión. En octubre de 1893, la comisión otorgó el contrato principal a la Westinghouse Electric Corporation para instalar generadores de corriente alterna en lo que se llamaría la Adams Power Plant (nombrada en honor a Edward Dean Adams, presidente de la Niagara Falls Power Company). El contrato especificaba tres generadores de 5,000 caballos de fuerza cada uno, utilizando el sistema polifásico bifásico de Tesla a una frecuencia de 25 Hz.',
      'La construcción de la planta Adams fue un logro de ingeniería de primer orden. Se excavó un túnel de descarga de 2.1 kilómetros de largo y 6.4 metros de diámetro a través de roca sólida para devolver el agua al río Niágara después de pasar por las turbinas. Los generadores diseñados por Tesla y Westinghouse pesaban 34 toneladas cada uno y eran los más grandes construidos hasta ese momento. Cada generador tenía un rotor externo de 3.6 metros de diámetro que giraba alrededor de un estator fijo, una configuración inversa a la de los generadores convencionales que Tesla diseñó específicamente para maximizar la eficiencia a esas dimensiones.',
      'El 16 de noviembre de 1896, la electricidad generada en las cataratas del Niágara llegó a la ciudad de Buffalo, ubicada a 32 kilómetros de distancia, marcando la primera transmisión comercial de energía eléctrica de larga distancia en la historia. La corriente se generaba a 2,200 voltios, se elevaba a 11,000 voltios para la transmisión mediante transformadores y luego se reducía para su distribución local. Este era exactamente el sistema que Tesla había imaginado: generación, transformación, transmisión a larga distancia y distribución local, todo usando corriente alterna y transformadores.',
      'Para 1900, la planta Adams había crecido a diez generadores con una capacidad total de 50,000 caballos de fuerza (37 megavatios), y suministraba electricidad a industrias y hogares en un radio de más de 30 kilómetros. La planta funcionó continuamente durante más de 60 años. El éxito de Niágara demostró de forma concluyente que la corriente alterna podía alimentar ciudades enteras desde fuentes de energía distantes. En las dos décadas siguientes, se construyeron centrales hidroeléctricas similares en todo el mundo, desde Suiza hasta Japón, todas utilizando el sistema polifásico de Tesla. La frecuencia de 25 Hz elegida para Niágara resultó ser demasiado baja para la iluminación (causaba parpadeo perceptible en las luces), lo que condujo a la adopción del estándar de 60 Hz en Norteamérica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Nikola Tesla visitó las cataratas del Niágara por primera vez en 1896, después de que su tecnología ya las hubiera transformado. Al ver los generadores funcionando, Tesla dijo a los periodistas que había soñado con aprovechar la energía del Niágara desde que era niño en Croacia, cuando vio una imagen de las cataratas en un libro escolar. Había pasado más de 30 años entre ese sueño infantil y su realización. Hoy existe una estatua de bronce de Tesla en el lado canadiense de las cataratas, donada por el gobierno de Serbia y ubicada en Queen Victoria Park.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía hidroeléctrica aprovecha la energía potencial gravitatoria del agua. La potencia disponible se calcula como P = ρ × g × h × Q, donde ρ es la densidad del agua (1,000 kg/m³), g es la aceleración gravitatoria (9.81 m/s²), h es la altura de caída (51 metros en el Niágara) y Q es el caudal volumétrico. Con el caudal promedio del Niágara, la potencia teórica total es de aproximadamente 4,400 megavatios, suficiente para abastecer a más de 3.8 millones de hogares. Actualmente, las centrales hidroeléctricas del Niágara en ambos países generan unos 4,400 MW combinados.' },
    ],
    fact: 'Edward Dean Adams, presidente de la Niagara Falls Power Company, estaba tan convencido de la importancia del proyecto que encargó una monografía de dos volúmenes titulada "Niagara Power: History of the Niagara Falls Power Company, 1886-1918", publicada en 1927, que documenta cada aspecto técnico de la construcción. La planta original Adams fue demolida en 1961, pero una réplica del generador número 1 de Tesla se exhibe en el Museo Smithsoniano de Historia Americana en Washington D.C., catalogada con el número de objeto 1987.0914.01.',
  },
  {
    id: 'transformador-transmision',
    title: 'El Transformador y la Transmisión',
    color: '#B88420',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_transformador-transmision.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_transformador-transmision.jpg',
    content: [
      'El transformador eléctrico es el dispositivo que hizo posible la victoria de la corriente alterna sobre la continua. Su principio es simple pero poderoso: dos bobinas de alambre enrolladas alrededor de un núcleo de hierro compartido pueden transferir energía eléctrica de una a otra mediante inducción electromagnética, y al cambiar la proporción de espiras (vueltas de alambre) entre las bobinas, se puede aumentar o reducir el voltaje. Si la bobina primaria tiene 100 espiras y la secundaria tiene 1,000, el voltaje se multiplica por 10. Lucien Gaulard y John Dixon Gibbs patentaron un transformador práctico en 1882, y los ingenieros húngaros Zipernowsky, Bláthy y Déri lo mejoraron en 1885 con el "transformador ZBD".',
      'Tesla integró el transformador como pieza central de su sistema polifásico de corriente alterna. En la central generadora, el voltaje producido por los generadores (típicamente entre 2,000 y 13,000 voltios) se eleva mediante transformadores "elevadores" (step-up) a voltajes de transmisión que pueden alcanzar 765,000 voltios en las líneas modernas de ultra alta tensión. A estos voltajes extremadamente altos, la corriente necesaria para transmitir la misma potencia se reduce proporcionalmente, y dado que las pérdidas térmicas en los cables dependen del cuadrado de la corriente (P = I²R), las pérdidas se reducen de forma drástica.',
      'En el punto de destino, transformadores "reductores" (step-down) reducen el voltaje gradualmente: primero a niveles de distribución (entre 4,000 y 34,500 voltios), y finalmente al voltaje doméstico (120 voltios en Norteamérica, 220-240 voltios en Europa y la mayoría del mundo). Un hogar típico en Estados Unidos tiene un transformador montado en el poste de la calle que reduce el voltaje de 7,200 voltios a los 120/240 voltios que alimentan los enchufes de la casa. Este proceso de elevación y reducción secuencial del voltaje es posible exclusivamente con corriente alterna; la corriente continua de Edison no podía transformarse de esta manera con la tecnología disponible en el siglo XIX.',
      'La red eléctrica moderna es una extensión directa del sistema que Tesla concibió. En Estados Unidos, tres redes interconectadas (la Interconexión del Este, la del Oeste y la de Texas/ERCOT) cubren todo el país con más de 700,000 kilómetros de líneas de transmisión de alta tensión y 9,200 plantas generadoras. La red europea (ENTSO-E) conecta a 35 países con una capacidad instalada de más de 1,000 gigavatios. Todas estas redes operan con corriente alterna a 50 o 60 Hz y utilizan transformadores para gestionar los niveles de voltaje, exactamente como Tesla lo imaginó en la década de 1880.',
      'Una ironía de la historia es que la corriente continua ha regresado en ciertos nichos gracias a la electrónica de potencia moderna. Las líneas de transmisión HVDC (High Voltage Direct Current) utilizan convertidores electrónicos para transformar AC en DC de alto voltaje para transmisiones submarinas o de ultra larga distancia, donde DC presenta ventajas técnicas. Sin embargo, estos sistemas dependen de convertidores que primero generan AC, la convierten a DC para la transmisión y luego la reconvierten a AC en el destino. La infraestructura base sigue siendo el sistema AC de Tesla. La red eléctrica es la máquina más grande jamás construida por la humanidad, y su arquitectura fundamental fue diseñada por un ingeniero que la imaginó completa en su mente antes de construir un solo componente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'William Stanley Jr., un ingeniero de Westinghouse, realizó la primera demostración práctica de un sistema de distribución AC con transformadores en Great Barrington, Massachusetts, en marzo de 1886. Instaló un generador en una antigua fábrica de goma, elevó el voltaje a 3,000 V para transmitirlo por cables aéreos a lo largo de 1.2 kilómetros del pueblo, y luego lo redujo a 500 V para alimentar 23 comercios con luces incandescentes. Este experimento a pequeña escala demostró por primera vez que el concepto de transformación de voltaje funcionaba en la práctica y fue clave para que Westinghouse apostara por la tecnología AC.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La eficiencia de un transformador eléctrico moderno puede superar el 99.7% en grandes unidades de potencia, lo que significa que menos del 0.3% de la energía se pierde como calor. Las pérdidas se dividen en dos tipos: pérdidas en el cobre (por la resistencia de los devanados, proporcionales al cuadrado de la corriente) y pérdidas en el hierro del núcleo (por histéresis magnética y corrientes de Foucault, constantes independientemente de la carga). Un transformador grande de subestación de 500 MVA puede pesar más de 400 toneladas y contener 80,000 litros de aceite mineral para aislamiento y refrigeración.' },
    ],
    fact: 'La línea de transmisión de más alto voltaje en operación actualmente es la línea Changji-Guquan UHVDC en China, que opera a 1,100,000 voltios (1.1 millones de voltios) de corriente continua y se extiende 3,324 kilómetros desde la provincia de Xinjiang hasta la provincia de Anhui. Transmite 12,000 megavatios de potencia, suficiente para abastecer a 50 millones de personas. Paradójicamente, aunque usa DC para la transmisión, la electricidad se genera como AC, se convierte a DC para el viaje y se reconvierte a AC en destino, demostrando que el sistema AC de Tesla sigue siendo la base de incluso los sistemas más avanzados del siglo XXI.',
  },
  {
    id: 'ac-vida-diaria',
    title: 'AC en Tu Vida Diaria',
    color: '#5A6B7A',
    btnImage: '/assets/nikola_tesla/infographic_m2/btn_ac-vida-diaria.jpg',
    image: '/assets/nikola_tesla/infographic_m2/hero_ac-vida-diaria.jpg',
    content: [
      'Cada vez que conectas un aparato a un enchufe de la pared, estás usando el sistema que Nikola Tesla inventó. La corriente que llega a tu casa es alterna, oscilando 60 veces por segundo en Norteamérica (60 Hz) o 50 veces por segundo en Europa, Asia y la mayor parte del mundo (50 Hz). Esta diferencia tiene origen histórico: Tesla recomendó 60 Hz como frecuencia óptima para sus motores en Estados Unidos, mientras que los ingenieros europeos de AEG (Allgemeine Elektricitäts-Gesellschaft), liderados por Emil Rathenau, adoptaron 50 Hz en Alemania en la década de 1890 porque era un submúltiplo más conveniente del sistema métrico. Ambas frecuencias funcionan adecuadamente para la mayoría de aplicaciones.',
      'La razón por la que se eligieron frecuencias en el rango de 50-60 Hz se debe a un equilibrio entre factores técnicos contrapuestos. A frecuencias más bajas (como los 25 Hz originales del Niágara), las luces parpadean de forma perceptible para el ojo humano, los transformadores necesitan ser más grandes y pesados, y los motores giran más lento. A frecuencias más altas, las pérdidas de energía en los cables aumentan por el efecto piel (la corriente tiende a fluir solo por la superficie del conductor) y los transformadores se calientan más por las corrientes de Foucault en el núcleo de hierro. Tesla determinó experimentalmente que 60 Hz ofrecía el mejor compromiso para iluminación, motores y transmisión a las distancias típicas en Norteamérica.',
      'Los dispositivos electrónicos modernos como teléfonos móviles, computadoras portátiles y tabletas funcionan internamente con corriente continua (DC), pero reciben corriente alterna de la red eléctrica. El cargador o adaptador de corriente que conectas a la pared es esencialmente un transformador miniatura combinado con un rectificador que convierte la corriente alterna de 120 o 220 voltios en corriente continua de bajo voltaje (típicamente 5, 12 o 20 voltios). Este proceso se llama conversión AC-DC, y ocurre miles de millones de veces simultáneamente en todo el mundo cada segundo del día.',
      'La red eléctrica que Tesla ayudó a diseñar conecta hoy a más de 5,700 millones de personas en todo el mundo. Según datos del Banco Mundial de 2022, el 91.4% de la población mundial tiene acceso a electricidad. La generación global alcanzó 29,165 teravatios-hora en 2022, suficiente para encender 2.9 billones de bombillas de 10 vatios simultáneamente. Todo este sistema opera con corriente alterna como espina dorsal, desde las centrales de generación (hidroeléctricas, térmicas, nucleares, eólicas, solares) hasta las subestaciones de distribución y los enchufes domésticos.',
      'El legado de Tesla en la ingeniería eléctrica fue reconocido formalmente en 1960 cuando la Conferencia General de Pesos y Medidas nombró al "tesla" (símbolo: T) como la unidad del Sistema Internacional para la densidad de flujo magnético. Un tesla equivale a un weber por metro cuadrado. Para dar perspectiva: el campo magnético de la Tierra tiene una intensidad de aproximadamente 25-65 microteslas, un imán de refrigerador produce unos 5 militseslas, y una máquina de resonancia magnética nuclear (MRI) utilizada en hospitales opera a 1.5-3 teslas. Esta unidad se usa diariamente en laboratorios de física, hospitales e industrias de todo el mundo, manteniendo vivo el nombre de Tesla en la práctica científica cotidiana.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Japón es el único país del mundo que utiliza dos frecuencias diferentes de corriente alterna dentro de sus fronteras. La mitad oriental del país (incluyendo Tokio) usa 50 Hz, mientras que la mitad occidental (incluyendo Osaka) usa 60 Hz. Esto se debe a que en la década de 1890, las compañías eléctricas de Tokio compraron generadores alemanes de 50 Hz, mientras que las de Osaka compraron generadores estadounidenses de 60 Hz. La diferencia persiste hasta hoy y requiere estaciones de conversión de frecuencia en la frontera entre ambas zonas, lo que limita la transferencia de energía entre las dos mitades del país.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un hogar promedio en Estados Unidos consume aproximadamente 10,500 kilovatios-hora (kWh) de electricidad al año, lo que equivale a una potencia media continua de 1.2 kilovatios. La electricidad recorre un camino complejo desde la central generadora: sale a 13,000-25,000 V del generador, se eleva a 115,000-765,000 V para transmisión interurbana, se reduce a 4,000-34,500 V en subestaciones de distribución, y finalmente llega a 120/240 V al transformador del poste frente a tu casa. Cada etapa de transformación ocurre gracias al principio que Tesla integró en su sistema.' },
    ],
    fact: 'Tesla murió solo en la habitación 3327 del Hotel New Yorker en Nueva York el 7 de enero de 1943, a los 86 años de edad. Había vivido en hoteles durante los últimos 30 años de su vida, frecuentemente sin poder pagar la cuenta completa. A pesar de haber inventado el sistema eléctrico que genera más de 20 billones de dólares anuales en la economía mundial, Tesla falleció prácticamente sin dinero. Su funeral se celebró el 12 de enero de 1943 en la Catedral de San Juan el Divino en Manhattan, con más de 2,000 asistentes, incluyendo tres premios Nobel. Su legado fue resumido por el alcalde de Nueva York, Fiorello La Guardia, quien leyó un panegírico por radio a toda la nación.',
  },
];

// ━━━ Electric Field (Canvas Background) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ElectricField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ━━━ AC Current Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ACCurrentHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Sine wave arc */}
        <path d="M 50 65 Q 120 10 190 65 Q 260 120 330 65 Q 400 10 470 65 Q 540 120 550 65" fill="none" stroke="url(#acGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 65 + Math.sin(t * Math.PI * 4) * 35;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central lightning icon */}
        <path d="M304 18 L296 35 L302 35 L294 52 L310 32 L303 32 Z" fill="#D4A535" opacity="0.6" stroke="#D4A535" strokeWidth="1" />
        <defs>
          <linearGradient id="acGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA CORRIENTE ALTERNA</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA REVOLUCIÓN DE TESLA</text>
      </svg>
    </div>
  );
}

// ━━━ Organic Node Button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotTeslaM2"
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

// ━━━ Expandable Section with Random Direction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Magazine-Style Content Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

        {/* ━━━ Conditional Video Player ━━━ */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
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

// ━━━ Progress Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A535, #6B7B8A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ━━━ Main Infographic Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function InteractiveInfographic_TeslaM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(15,12,20,0.8) 40%, rgba(10,10,15,0.88) 100%), url(/assets/tesla/tesla_m2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ElectricField />

      <ACCurrentHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Corriente Alterna!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Maestro de la Corriente
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
