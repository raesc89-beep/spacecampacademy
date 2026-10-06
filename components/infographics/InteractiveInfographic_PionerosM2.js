'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
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
  "Swenson, L. S., Grimwood, J. M. y Alexander, C. C. (1966). This New Ocean: A History of Project Mercury (NASA SP-4201). NASA.",
  "Thompson, N. (2004). Light This Candle: The Life and Times of Alan Shepard, America's First Spaceman. Crown Publishers.",
  "Shepard, A. y Slayton, D. (1994). Moon Shot: The Inside Story of America's Race to the Moon. Turner Publishing.",
  "Burgess, C. (2014). Freedom 7: The Historic Flight of Alan B. Shepard, Jr. Springer Praxis Books.",
  "Catchpole, J. (2001). Project Mercury: NASA's First Manned Space Programme. Springer Praxis Books.",
  "Jones, E. M. y Glover, K. (eds.). Apollo 14 Lunar Surface Journal. NASA History Office.",
  "NASA Johnson Space Center (1998). Biographical Data: Alan B. Shepard, Jr. (Rear Admiral, USN, Ret.).",
  "Bellucci, J. J. et al. (2019). Terrestrial-like zircon in a clast from an Apollo 14 breccia. Earth and Planetary Science Letters, 510, 173-185."
];

const INFOGRAPHIC_NODES = [
  {
    id: "de-new-hampshire-a-la-marina",
    bannerImage: '/assets/pioneros/infographic_m2/banner_de-new-hampshire-a-la-marina.webp',
    bannerCaption: "Alan Shepard nació el 18 de noviembre de 1923 en East Derry, New Hampshire, y se formó como piloto en la Marina.",
    title: "De New Hampshire a la Marina",
    color: '#6F7D8C',
    btnImage: '/assets/pioneros/infographic_m2/btn_de-new-hampshire-a-la-marina.webp',
    image: '/assets/pioneros/infographic_m2/hero_de-new-hampshire-a-la-marina.webp',
    content: [
      "Alan Bartlett Shepard Jr. nació el 18 de noviembre de 1923 en East Derry, un pequeño pueblo del estado de New Hampshire, en el noreste de Estados Unidos. Su padre había servido en el Ejército, y desde niño Alan mostró dos rasgos que lo acompañarían toda su vida: una enorme competitividad y una pasión por los aviones. De adolescente hacía pequeños trabajos en un aeródromo cercano a cambio de estar cerca de las avionetas y aprender cómo funcionaban.",
      "En 1944 se graduó en la Academia Naval de Estados Unidos, en Annapolis, en plena Segunda Guerra Mundial. Su primer destino no fue un avión, sino un barco: sirvió en el destructor USS Cogswell en el océano Pacífico, donde vivió de cerca los peligros de la guerra. Al terminar el conflicto, por fin pudo perseguir su sueño de volar. Se entrenó como aviador naval y en 1947 recibió sus alas de piloto de la Marina de Estados Unidos.",
      "Shepard aprendió a despegar y aterrizar en portaaviones, una de las maniobras más difíciles de la aviación, porque la pista es corta y se mueve con las olas. En 1950 ingresó en la Escuela de Pilotos de Pruebas de la Marina, en Patuxent River, Maryland. Allí su trabajo consistía en probar aviones nuevos para descubrir sus límites y sus defectos antes de que otros pilotos los usaran, un empleo que exigía valor, precisión y mucha cabeza fría.",
      "Como piloto de pruebas participó en experimentos a gran altitud, probó sistemas de reabastecimiento de combustible en pleno vuelo y ayudó a evaluar los primeros portaaviones con cubierta en ángulo, una innovación que hizo más seguras esas operaciones. A lo largo de su carrera acumuló más de 8,000 horas de vuelo, unas 3,700 de ellas en aviones a reacción. También fue instructor en la escuela de pilotos de pruebas, enseñando a otros lo que había aprendido.",
      "Sus compañeros lo describían como brillante, exigente y a veces difícil de tratar. Podía ser simpático y bromista, pero también frío y distante cuando algo le parecía mal hecho. En 1957 se graduó en el Colegio de Guerra Naval de Newport, Rhode Island. Cuando en 1959 la recién creada NASA empezó a buscar pilotos para viajar al espacio, Shepard tenía exactamente la experiencia que se buscaba: era un piloto de pruebas de élite con años de servicio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Después de recibir sus alas en 1947, Shepard fue asignado al Escuadrón de Caza 42, con bases en Virginia y Florida, y realizó varias campañas a bordo de portaaviones en el mar Mediterráneo. Muchos años después, en 1974, se retiró de la Marina con el rango de contraalmirante, uno de los grados más altos de esa fuerza. Muy pocos astronautas han alcanzado ese nivel en su carrera militar." },
      { label: "Dato Científico", icon: "atom", text: "Aterrizar en un portaaviones exige frenar un avión de varias toneladas en apenas unas decenas de metros. Para lograrlo, el avión baja un gancho que atrapa uno de los cables de acero tendidos sobre la cubierta, y el cable lo detiene en pocos segundos. La cubierta en ángulo, que Shepard ayudó a probar, permite que si el gancho falla el piloto acelere y vuelva a despegar sin chocar con los aviones estacionados." }
    ],
    fact: "La escuela de Patuxent River, donde Shepard se formó como piloto de pruebas, fue también la escuela de otros astronautas famosos. John Glenn, Wally Schirra y Scott Carpenter, tres de los siete primeros astronautas de la NASA, pasaron por ella. Años después también estudiaron allí Pete Conrad y Jim Lovell. Muchos de los pioneros del espacio aprendieron a volar con precisión entre sus pistas antes de llegar a las estrellas.",
  },
  {
    id: "los-siete-del-mercury",
    bannerImage: '/assets/pioneros/infographic_m2/banner_los-siete-del-mercury.webp',
    bannerCaption: "El 9 de abril de 1959, la NASA presentó a sus siete primeros astronautas; Alan Shepard era uno de ellos.",
    title: "Los Siete del Mercury",
    color: '#8A7F68',
    btnImage: '/assets/pioneros/infographic_m2/btn_los-siete-del-mercury.webp',
    image: '/assets/pioneros/infographic_m2/hero_los-siete-del-mercury.webp',
    content: [
      "En octubre de 1957, la Unión Soviética lanzó el Sputnik 1, el primer satélite artificial de la historia, y Estados Unidos sintió que se estaba quedando atrás. Un año después nació la NASA, y uno de sus primeros proyectos fue el programa Mercury, cuyo objetivo era poner a un ser humano en órbita alrededor de la Tierra y traerlo de vuelta sano y salvo. Para eso necesitaba encontrar a las personas adecuadas, y decidió buscarlas entre los pilotos de pruebas militares.",
      "Los requisitos eran estrictos: tener menos de 40 años, medir como máximo 1.80 metros para caber en la pequeña cápsula, contar con un título universitario en ingeniería o una carrera similar, haber volado al menos 1,500 horas y ser piloto de aviones a reacción graduado de una escuela de pilotos de pruebas. Se revisaron los expedientes de 508 militares, y poco a poco el grupo se redujo a 110, después a 69 entrevistados y finalmente a 32 candidatos.",
      "Los 32 finalistas pasaron por pruebas médicas y psicológicas agotadoras. En la clínica Lovelace de Albuquerque, en Nuevo México, y en laboratorios de la Fuerza Aérea en Ohio, los médicos midieron su corazón, sus pulmones y su resistencia al calor, al frío, al ruido y al aislamiento. Los hicieron girar en máquinas, les metieron los pies en agua helada y les aplicaron largos cuestionarios para conocer a fondo su personalidad y su manera de reaccionar.",
      "El 9 de abril de 1959, la NASA presentó a los elegidos en una conferencia de prensa en Washington: Scott Carpenter, Gordon Cooper, John Glenn, Gus Grissom, Wally Schirra, Deke Slayton y Alan Shepard. La prensa los llamó «los Siete del Mercury», y de inmediato se convirtieron en héroes nacionales, aunque todavía no habían volado al espacio. Los siete participaron en el desarrollo de sus naves, cada uno especializado en una parte distinta del sistema.",
      "Durante casi dos años se entrenaron sin saber quién sería el primero. Finalmente, en enero de 1961, Robert Gilruth, jefe del grupo de tareas espaciales de la NASA, les comunicó en privado su decisión: Alan Shepard volaría primero, con Gus Grissom en el segundo vuelo y John Glenn como reserva. En febrero, la NASA anunció al público que el elegido estaba entre esos tres, y el nombre de Shepard se mantuvo en secreto hasta pocos días antes del lanzamiento."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los Siete del Mercury firmaron un contrato con la revista Life, que publicó en exclusiva historias sobre sus vidas y sus familias. Esto los convirtió en celebridades y dio a sus familias un ingreso extra, porque su sueldo militar era modesto. Fueron los primeros astronautas que el público conoció como personas con nombres, rostros y personalidades propias, y no solo como pilotos anónimos detrás de un casco." },
      { label: "Dato Científico", icon: "atom", text: "Una centrifugadora humana es un brazo largo que gira a gran velocidad con una cabina en un extremo. Al girar, empuja al ocupante contra su asiento con una fuerza que se mide en «g», donde 1 g es el peso normal en la Tierra. Los astronautas del Mercury soportaron en entrenamiento más de 10 g, es decir, sentir que su cuerpo pesaba más de diez veces lo normal, como preparación para el lanzamiento y la reentrada." }
    ],
    fact: "Deke Slayton, uno de los siete, fue apartado de los vuelos en 1962 por un problema del ritmo cardíaco. En lugar de rendirse, se convirtió en el responsable de elegir a las tripulaciones de la NASA, y logró volar al espacio en 1975, en la misión Apolo-Soyuz. Su historia se parece a la de Shepard: ambos fueron apartados por motivos médicos y ambos regresaron al espacio años después, gracias a su perseverancia.",
  },
  {
    id: "freedom-7-cohete-y-capsula",
    bannerImage: '/assets/pioneros/infographic_m2/banner_freedom-7-cohete-y-capsula.webp',
    bannerCaption: "La cápsula Freedom 7 viajó sobre un cohete Mercury-Redstone, derivado de un misil y adaptado para llevar personas.",
    title: "Freedom 7: el cohete y la cápsula",
    color: '#5E7389',
    btnImage: '/assets/pioneros/infographic_m2/btn_freedom-7-cohete-y-capsula.webp',
    image: '/assets/pioneros/infographic_m2/hero_freedom-7-cohete-y-capsula.webp',
    content: [
      "Para el primer vuelo de un estadounidense, la NASA no usó un cohete capaz de llegar a la órbita, sino uno más pequeño y probado: el Mercury-Redstone. Se derivaba del misil Redstone, desarrollado por el equipo de Wernher von Braun para el Ejército de Estados Unidos. Los ingenieros alargaron sus tanques para que el motor funcionara más tiempo y añadieron sistemas que vigilaban el cohete y podían ordenar un aborto automático para salvar al piloto.",
      "El motor del Mercury-Redstone quemaba alcohol etílico mezclado con agua, junto con oxígeno líquido, y producía un empuje de unos 350 kilonewtons, suficiente para levantar un cohete de unas 30 toneladas. No era lo bastante potente para alcanzar la órbita, pero sí para lanzar la cápsula en un gran arco hacia el espacio, como una pelota lanzada muy alto. Por eso el vuelo sería suborbital: subiría al espacio y volvería a caer sin dar la vuelta a la Tierra.",
      "La cápsula fue construida por la empresa McDonnell Aircraft. Tenía forma de campana, con apenas 1.9 metros de diámetro en su base, y por dentro era tan estrecha que el astronauta iba recostado en un asiento moldeado a la forma exacta de su cuerpo, casi sin poder moverse. Shepard eligió el nombre de su nave: Freedom 7, que significa Libertad 7. Se suele explicar que el número homenajeaba a los siete astronautas del grupo.",
      "En la parte inferior llevaba un escudo térmico para protegerse del calor de la reentrada, y en la punta, una torre de escape con un pequeño cohete de combustible sólido. Si el Redstone fallaba durante el despegue, la torre arrancaría la cápsula y la alejaría del peligro en un instante. Para cambiar la orientación de la nave en el espacio, contaba con pequeños propulsores de peróxido de hidrógeno que Shepard podía manejar con una palanca de mando.",
      "Freedom 7 no tenía la gran ventana que llevarían las cápsulas posteriores: solo dos ventanillas pequeñas y un periscopio, un visor que mostraba la Tierra en una pantalla frente al astronauta. Antes del vuelo, la NASA probó todo el sistema con un chimpancé llamado Ham, que voló el 31 de enero de 1961 y regresó sano. Su viaje tuvo algunos problemas técnicos, así que los ingenieros quisieron una prueba más antes de arriesgar a un ser humano."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El equipo de von Braun insistió en hacer un vuelo extra sin tripulación después del viaje de Ham. Esa prueba se realizó el 24 de marzo de 1961 y salió bien. Muchos historiadores señalan que, si se hubieran saltado esa prueba, Shepard probablemente habría volado en marzo, antes que el cosmonauta soviético Yuri Gagarin, y habría sido el primer ser humano en llegar al espacio." },
      { label: "Dato Científico", icon: "atom", text: "El alcohol y el oxígeno líquido del Redstone no se encienden solos al tocarse: necesitan un sistema de ignición. El oxígeno debe mantenerse por debajo de unos 183 grados bajo cero para seguir líquido, por eso los tanques se llenaban poco antes del despegue y del cohete salían nubes blancas. Esas nubes no son humo: son humedad del aire que se condensa y se congela al tocar las paredes heladas del tanque." }
    ],
    fact: "La cápsula Freedom 7 sobrevivió al vuelo y pertenece al Museo Nacional del Aire y el Espacio del Instituto Smithsonian. Durante años se exhibió en Washington y luego en la Academia Naval de Annapolis, donde estudió Shepard. Desde 2012 se muestra en la Biblioteca y Museo Presidencial John F. Kennedy, en Boston, como recuerdo del vuelo que animó al presidente a proponer el viaje a la Luna.",
  },
  {
    id: "quince-minutos-que-cambiaron-la-historia",
    bannerImage: '/assets/pioneros/infographic_m2/banner_quince-minutos-que-cambiaron-la-historia.webp',
    bannerCaption: "El 5 de mayo de 1961, Freedom 7 hizo un vuelo suborbital de 15 minutos y 22 segundos que alcanzó 187 km de altura.",
    title: "15 minutos y 22 segundos que cambiaron la historia",
    color: '#7E6B60',
    btnImage: '/assets/pioneros/infographic_m2/btn_quince-minutos-que-cambiaron-la-historia.webp',
    image: '/assets/pioneros/infographic_m2/hero_quince-minutos-que-cambiaron-la-historia.webp',
    content: [
      "La mañana del 5 de mayo de 1961, Alan Shepard subió a Freedom 7 en la plataforma de lanzamiento de Cabo Cañaveral, en Florida. El despegue estaba previsto para temprano, pero las nubes y varios problemas técnicos causaron retrasos, y Shepard pasó más de cuatro horas acostado dentro de la cápsula. Según se cuenta, harto de esperar, pidió a los controladores que arreglaran sus problemas y «encendieran esa vela», una frase que se volvió legendaria.",
      "La espera trajo un problema inesperado: Shepard necesitaba orinar, y como el vuelo duraría solo quince minutos, nadie había previsto esa situación. Los controladores le permitieron hacerlo dentro de su traje espacial, después de cortar por un momento la energía de algunos sensores para evitar un cortocircuito. Su ropa interior absorbió el líquido. Para los vuelos siguientes, la NASA diseñó un sistema para recoger la orina dentro del traje.",
      "A las 9:34 de la mañana, hora del este de Estados Unidos, el Redstone despegó. Durante el ascenso, Shepard soportó una aceleración de más de 6 g y fuertes vibraciones, pero siguió informando con calma. Unos dos minutos y veinte segundos después del despegue, el motor se apagó y la cápsula se separó del cohete. Freedom 7 siguió subiendo por impulso hasta una altura máxima de unos 187 kilómetros, a más de 8,000 kilómetros por hora.",
      "Durante unos cinco minutos de ingravidez, Shepard hizo algo que el cosmonauta Yuri Gagarin no había hecho 23 días antes: controló la orientación de su nave a mano. Con la palanca de mando inclinó la cápsula hacia arriba y hacia abajo, la giró a los lados y la hizo rotar, comprobando que un ser humano podía pilotar en el espacio. El vuelo de Gagarin había sido controlado de forma automática. Shepard también describió la costa de Florida por el periscopio.",
      "Para regresar, la cápsula disparó sus retrocohetes como prueba, cayó de vuelta hacia la atmósfera y soportó una desaceleración de unos 11 g, tan intensa que su cuerpo pesaba once veces más de lo normal. A unos 3 kilómetros de altura se abrió el paracaídas principal, y Freedom 7 cayó al océano Atlántico a unos 486 kilómetros del punto de lanzamiento. Un helicóptero del portaaviones USS Lake Champlain lo recogió. El vuelo duró 15 minutos y 22 segundos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Unos 45 millones de estadounidenses siguieron el lanzamiento por televisión y radio. Al mirar la Tierra por el periscopio, Shepard comentó que la vista era hermosa, aunque en realidad la veía en blanco y negro: antes del despegue habían colocado un filtro gris en el periscopio para protegerle los ojos del sol, y durante el vuelo no pudo quitarlo porque la palanca quedaba fuera de su alcance." },
      { label: "Dato Científico", icon: "atom", text: "Un vuelo suborbital es como lanzar una pelota muy alto: sube, alcanza su punto más alto y vuelve a caer, siguiendo una curva parecida a una parábola. Para entrar en órbita, en cambio, una nave necesita unos 28,000 kilómetros por hora de velocidad horizontal, de modo que mientras cae, la superficie curva de la Tierra se aleja bajo ella al mismo ritmo. Freedom 7 alcanzó menos de un tercio de esa velocidad." }
    ],
    fact: "Tres días después del vuelo, el 8 de mayo de 1961, el presidente John F. Kennedy entregó a Shepard la Medalla al Servicio Distinguido de la NASA en la Casa Blanca. El 25 de mayo, apenas 20 días después del vuelo, Kennedy pidió al Congreso que Estados Unidos se comprometiera a llevar a un ser humano a la Luna y traerlo de vuelta a salvo antes de que terminara la década.",
  },
  {
    id: "meniere-el-astronauta-en-tierra",
    bannerImage: '/assets/pioneros/infographic_m2/banner_meniere-el-astronauta-en-tierra.webp',
    bannerCaption: "La enfermedad de Ménière, un trastorno del oído interno que causa vértigo, dejó a Shepard sin volar durante años.",
    title: "La enfermedad de Ménière: un astronauta en tierra",
    color: '#6A7D6E',
    btnImage: '/assets/pioneros/infographic_m2/btn_meniere-el-astronauta-en-tierra.webp',
    image: '/assets/pioneros/infographic_m2/hero_meniere-el-astronauta-en-tierra.webp',
    content: [
      "Después de Freedom 7, Shepard quería volar más lejos. Fue considerado para una misión Mercury de varios días que se canceló en 1963, y luego fue elegido comandante del primer vuelo tripulado del programa Gemini, con la nave para dos astronautas que sucedió a Mercury. Pero por esos años empezó a sufrir ataques repentinos de mareo: sentía que todo giraba a su alrededor, tenía náuseas y oía un zumbido molesto en uno de sus oídos.",
      "Los médicos le diagnosticaron la enfermedad de Ménière, un trastorno del oído interno. Dentro del oído hay conductos llenos de líquido que funcionan como un sensor de equilibrio. En la enfermedad de Ménière, ese líquido se acumula y aumenta la presión, lo que provoca crisis de vértigo, pérdida de audición, zumbido y sensación de oído tapado. Para un piloto, perder el equilibrio de golpe es muy peligroso, así que la NASA le prohibió volar.",
      "Shepard tuvo que ver cómo su lugar en el primer vuelo Gemini pasaba a Gus Grissom y John Young, que volaron en marzo de 1965. Muy desanimado, aceptó un trabajo en tierra: fue nombrado jefe de la Oficina de Astronautas. Desde ese puesto supervisaba el entrenamiento de los astronautas, opinaba sobre la formación de las tripulaciones y se ganó fama de jefe exigente. Los astronautas sabían que, para volar, convenía impresionar a Shepard.",
      "Durante esos años de espera, Shepard también buscó oportunidades fuera de la NASA. Invirtió en bancos y en negocios de bienes raíces, y llegó a ser millonario. Pero su sueño seguía siendo volver al espacio, y buscaba sin descanso una solución médica. Mientras tanto, sus compañeros realizaban caminatas espaciales, acoplamientos en órbita y, en diciembre de 1968, el primer viaje tripulado alrededor de la Luna, con la misión Apolo 8.",
      "La solución llegó gracias al otorrinolaringólogo William House, de Los Ángeles, que había desarrollado una cirugía experimental para la enfermedad de Ménière. La operación consistía en colocar un pequeño tubo que ayudara a drenar el exceso de líquido del oído interno. Shepard se operó y la cirugía funcionó. En mayo de 1969, la NASA le devolvió su autorización para volar. Tenía 45 años y estaba listo para el reto más grande de su vida."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según sus biógrafos, Shepard se registró en el hospital con un nombre falso para que la prensa no se enterara de su operación, porque temía que, si la cirugía fallaba, su carrera de astronauta terminara para siempre ante los ojos del público. El secreto se mantuvo, y cuando volvió a la lista de vuelo, pocas personas sabían cuánto había luchado en silencio para lograrlo." },
      { label: "Dato Científico", icon: "atom", text: "El oído interno tiene dos partes principales. La cóclea, con forma de caracol, convierte las vibraciones del sonido en señales eléctricas para el cerebro. El sistema vestibular, formado por tres canales semicirculares llenos de líquido, detecta los giros de la cabeza, como un nivel de burbuja. Cuando el líquido se descontrola, el cerebro recibe señales falsas de movimiento y aparece el vértigo, aunque la persona esté quieta." }
    ],
    fact: "Hoy se sabe que la enfermedad de Ménière suele aparecer en la edad adulta, con frecuencia entre los 40 y los 60 años, y que sus causas exactas todavía no se conocen del todo. Existen tratamientos con dieta baja en sal, medicamentos y, en algunos casos, cirugía, aunque la eficacia de la operación que recibió Shepard sigue siendo debatida entre los médicos. En su caso, el resultado fue excelente.",
  },
  {
    id: "apolo-14-regreso-a-la-luna",
    bannerImage: '/assets/pioneros/infographic_m2/banner_apolo-14-regreso-a-la-luna.webp',
    bannerCaption: "Apolo 14 despegó el 31 de enero de 1971; Shepard, con 47 años, alunizó en Fra Mauro el 5 de febrero con Edgar Mitchell.",
    title: "Apolo 14: el regreso a la Luna",
    color: '#75708C',
    btnImage: '/assets/pioneros/infographic_m2/btn_apolo-14-regreso-a-la-luna.webp',
    image: '/assets/pioneros/infographic_m2/hero_apolo-14-regreso-a-la-luna.webp',
    content: [
      "Shepard regresó con un objetivo enorme: caminar sobre la Luna. Fue nombrado comandante de Apolo 14, con Stuart Roosa como piloto del módulo de mando y Edgar Mitchell como piloto del módulo lunar. Era una misión muy importante, porque la anterior, Apolo 13, había tenido que cancelar su alunizaje en abril de 1970 tras la explosión de un tanque de oxígeno. La NASA necesitaba demostrar que podía volver a la Luna de forma segura.",
      "El 31 de enero de 1971, un gigantesco cohete Saturno V lanzó a los tres astronautas desde el Centro Espacial Kennedy. Pocas horas después surgió el primer susto: el módulo de mando, llamado Kitty Hawk, no lograba acoplarse con el módulo lunar, llamado Antares. Hicieron falta seis intentos para que los mecanismos de enganche funcionaran. Si no lo hubieran logrado, no habrían podido llevar el módulo lunar y la misión habría terminado.",
      "Ya en órbita lunar apareció un segundo problema. La computadora del Antares recibía una señal falsa del botón de aborto, probablemente por una diminuta bolita de soldadura suelta dentro del interruptor. Si esa señal aparecía durante el descenso, la computadora cancelaría el alunizaje. El ingeniero de software Don Eyles, del Instituto Tecnológico de Massachusetts, preparó en pocas horas una solución que los astronautas teclearon a mano en la computadora.",
      "Todavía hubo un tercer obstáculo: durante el descenso, el radar de aterrizaje tardó en captar la superficie lunar, y sin él las reglas de la misión obligaban a abortar. Tras reiniciar un interruptor, el radar funcionó justo a tiempo. El 5 de febrero de 1971, Shepard posó el Antares en la región de Fra Mauro con gran precisión. A sus 47 años se convirtió en la persona de mayor edad en caminar sobre la Luna, un récord que todavía conserva.",
      "Shepard y Mitchell hicieron dos caminatas lunares que sumaron más de nueve horas. Instalaron instrumentos científicos, como un sismómetro para registrar temblores lunares, y usaron un carrito de dos ruedas para llevar herramientas y muestras. Intentaron llegar al borde del cráter Cone, de más de 300 metros de diámetro, pero el terreno era confuso y se quedaron muy cerca sin verlo. En total trajeron a la Tierra unos 42 kilogramos de rocas lunares."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Stuart Roosa, que se quedó en órbita lunar mientras sus compañeros caminaban por la superficie, llevó consigo cientos de semillas de árboles. De vuelta en la Tierra, esas semillas se plantaron en muchos lugares de Estados Unidos y de otros países, y crecieron como árboles normales. Hoy se conocen como «árboles lunares», y algunos siguen en pie en parques, escuelas y edificios públicos." },
      { label: "Dato Científico", icon: "atom", text: "Una de las rocas de Apolo 14, apodada Big Bertha, pesa unos 9 kilogramos. En 2019, un equipo de científicos analizó un pequeño fragmento incrustado en ella y propuso que pudo haberse formado en la Tierra hace unos 4,000 millones de años, antes de ser lanzado al espacio por un gran impacto y terminar en la Luna. Si se confirma, sería una de las rocas terrestres más antiguas conocidas, ¡encontrada en la Luna!" }
    ],
    fact: "Al pisar la Luna por primera vez, Shepard dijo que había sido un camino largo, pero que por fin estaban allí. Esas palabras resumían diez años de lucha: su vuelo de 15 minutos en 1961, la enfermedad que lo dejó en tierra y, finalmente, la superficie lunar. Fue el único de los Siete del Mercury que caminó sobre la Luna, y el quinto ser humano en hacerlo.",
  },
  {
    id: "golf-lunar-y-legado",
    bannerImage: '/assets/pioneros/infographic_m2/banner_golf-lunar-y-legado.webp',
    bannerCaption: "El 6 de febrero de 1971, Shepard golpeó dos pelotas de golf en la Luna con una cabeza de hierro 6 unida a una herramienta.",
    title: "Golf en la Luna y un legado de perseverancia",
    color: '#8B8262',
    btnImage: '/assets/pioneros/infographic_m2/btn_golf-lunar-y-legado.webp',
    image: '/assets/pioneros/infographic_m2/hero_golf-lunar-y-legado.webp',
    content: [
      "Al final de la segunda caminata lunar, el 6 de febrero de 1971, Shepard sorprendió a todos frente a la cámara de televisión. Sacó la cabeza de un palo de golf de hierro 6, que había llevado a bordo con permiso de sus jefes, y la acopló al mango de una herramienta diseñada para recoger muestras de suelo lunar. Luego dejó caer una pelota sobre el polvo gris. Millones de personas vieron cómo el comandante de Apolo 14 se preparaba para jugar golf en otro mundo.",
      "Su traje espacial era tan rígido que no podía usar las dos manos ni girar el cuerpo como un golfista normal, así que golpeó con una sola mano. Los primeros intentos levantaron más polvo que pelota. Después logró golpear dos pelotas y, bromeando, dijo que la segunda había volado millas y millas. Era una exageración: en realidad, las pelotas viajaron decenas de metros, no kilómetros. Aun así, fueron los primeros golpes de golf de la historia fuera de la Tierra.",
      "En 2021, el especialista en imágenes Andy Saunders restauró videos y fotografías de Apolo 14 y, junto con la Asociación de Golf de Estados Unidos, calculó dónde cayeron las pelotas. Estimó que la primera recorrió unos 22 metros y la segunda unos 37 metros. ¿Por qué no llegaron más lejos, si en la Luna la gravedad es seis veces menor y no hay aire? Porque golpear con una mano, dentro de un traje rígido y sin poder girar, resta muchísima fuerza.",
      "Las pelotas siguen en la Luna, donde no hay viento ni lluvia que las mueva. Shepard donó el palo a la Asociación de Golf de Estados Unidos, que lo exhibe en su museo de Nueva Jersey. Su compañero Edgar Mitchell también se divirtió: lanzó el mango de una herramienta como si fuera una jabalina. Estos momentos de juego mostraron de forma divertida cómo se mueven los objetos con poca gravedad, y acercaron la exploración lunar a millones de personas.",
      "Shepard dejó la NASA y la Marina en 1974, con el rango de contraalmirante, y se dedicó a los negocios. En 1978 recibió la Medalla de Honor Espacial del Congreso. En 1984, junto con otros astronautas del Mercury, fundó lo que hoy es la Astronaut Scholarship Foundation, que entrega becas a estudiantes universitarios de ciencia e ingeniería. Murió de leucemia el 21 de julio de 1998, a los 74 años, y su esposa Louise falleció pocas semanas después."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cuando Apolo 14 despegó, la tripulación sumaba en total solo unos 15 minutos de experiencia en el espacio: los del vuelo de Shepard en Freedom 7, porque Roosa y Mitchell nunca habían volado. Por eso algunos periodistas la consideraban una tripulación de novatos. Al regresar a la Tierra el 9 de febrero de 1971, los tres habían pasado unos nueve días en el espacio y cumplido todos sus objetivos principales." },
      { label: "Dato Científico", icon: "atom", text: "En la Luna, una pelota de golf golpeada con la misma fuerza que en la Tierra podría llegar mucho más lejos por dos razones. Primero, la gravedad lunar es cerca de la sexta parte de la terrestre, así que la pelota tarda mucho más en caer. Segundo, no hay aire que la frene. Pero sin aire tampoco hay sustentación: los hoyuelos de las pelotas de golf, que en la Tierra las ayudan a volar más lejos, en la Luna no sirven de nada." }
    ],
    fact: "La carrera de Alan Shepard abarca casi toda la historia temprana de la exploración espacial: voló en la primera nave tripulada de Estados Unidos en 1961 y diez años después caminó sobre la Luna. Su legado no está solo en los récords, sino en su perseverancia: perdió la oportunidad de volar por una enfermedad, buscó una solución durante años y volvió para cumplir su mayor sueño.",
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
      hue: Math.random() > 0.5 ? '184,125,94' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(184,125,94,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradPionerosM2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6F7D8C", "#8A7F68", "#5E7389", "#7E6B60", "#6A7D6E", "#75708C", "#8B8262"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#B87D5E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#B87D5E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradPionerosM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE FREEDOM 7 AL GOLF EN LA LUNA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(184,125,94,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">PIONEROS DEL ESPACIO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(184,125,94,0.2)'}`,
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
          layoutId="activeDotPionerosM2"
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
      border: '1px solid rgba(184,125,94,0.15)',
    }}>
      <Star size={14} style={{ color: '#B87D5E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #B87D5E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(184,125,94,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B87D5E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_PionerosM2() {
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
      border: '1px solid rgba(184,125,94,0.12)',
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
            textAlign: 'center', color: 'rgba(184,125,94,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(184,125,94,0.08)', borderRadius: '16px',
              border: '1px solid rgba(184,125,94,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B87D5E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Piloto Freedom: del vuelo suborbital de 1961 a caminar en la Luna en 1971
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
