'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#C9B37E', style = {} }) {
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
  "Bilstein, R. E. (1980). Stages to Saturn: A Technological History of the Apollo/Saturn Launch Vehicles. NASA SP-4206.",
  "Orloff, R. W. (2000). Apollo by the Numbers: A Statistical Reference. NASA SP-2000-4029.",
  "Woods, W. D. (2011). How Apollo Flew to the Moon (2.ª ed.). Springer-Praxis.",
  "Neufeld, M. J. (2007). Von Braun: Dreamer of Space, Engineer of War. Alfred A. Knopf.",
  "Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space. Random House.",
  "NASA Marshall Space Flight Center (1969). Saturn V Flight Manual SA-507 (MSFC-MAN-507)."
];

const INFOGRAPHIC_NODES = [
  {
    id: "saturn-v-gigante",
    bannerImage: '/assets/apollo11/infographic_m1/banner_saturn-v-gigante.webp',
    bannerCaption: "El Saturn V medía 110.6 m, pesaba unas 2,900 toneladas al despegar y casi el 90 % de esa masa era combustible.",
    title: "El gigante de 110 metros",
    color: '#8C5A3C',
    btnImage: '/assets/apollo11/infographic_m1/btn_saturn-v-gigante.webp',
    image: '/assets/apollo11/infographic_m1/hero_saturn-v-gigante.webp',
    content: [
      "El Saturn V fue el cohete que lanzó a los astronautas del programa Apolo hacia la Luna. Medía 110.6 metros de altura, unos 18 metros más que la Estatua de la Libertad con su pedestal, y su base tenía 10.1 metros de diámetro. Lleno de combustible pesaba cerca de 2,900 toneladas, lo mismo que unos 480 elefantes africanos adultos. Alrededor del 90 % de esa masa era propelente: en realidad, el Saturn V era un enorme conjunto de tanques con motores en la parte inferior.",
      "El cohete estaba formado por tres etapas apiladas, cada una con sus propios tanques y motores. La primera, llamada S-IC, la construyó la empresa Boeing. La segunda, S-II, la fabricó North American Aviation. La tercera, S-IVB, salió de las fábricas de Douglas Aircraft. Encima de ellas iba un anillo electrónico de IBM, la Unidad de Instrumentos, y después la nave Apolo: el Módulo Lunar guardado dentro de un adaptador, el Módulo de Servicio, el Módulo de Mando y la torre de escape.",
      "El diseño se dirigió desde el Centro Marshall de Vuelos Espaciales, en Huntsville, Alabama, bajo la dirección del ingeniero alemán Wernher von Braun. Von Braun llegó a Estados Unidos en 1945, después de dirigir en Alemania el desarrollo del misil V-2, un arma fabricada con trabajo forzado de prisioneros de campos de concentración. Los historiadores estudian hoy esa parte de su vida con mucha atención. En Huntsville, su equipo desarrolló la familia de cohetes Saturno durante los años sesenta.",
      "Ninguna persona podía construir el Saturn V sola. En su momento de mayor actividad, el programa Apolo empleó a unas 400,000 personas repartidas en miles de empresas, universidades y centros de la NASA. Había soldadores, matemáticas, costureras que cosían trajes espaciales y programadores. En 1973, la NASA informó al Congreso de Estados Unidos que el programa Apolo completo había costado unos 25,400 millones de dólares de la época, una de las inversiones científicas más grandes del siglo XX.",
      "El 16 de julio de 1969, a las 13:32 en tiempo universal (las 9:32 de la mañana en Florida), el Saturn V de la misión Apolo 11 despegó desde la plataforma 39A del Centro Espacial Kennedy. A bordo iban Neil Armstrong, comandante; Michael Collins, piloto del Módulo de Mando; y Edwin «Buzz» Aldrin, piloto del Módulo Lunar. Se calcula que cerca de un millón de personas observaron el despegue desde playas y carreteras cercanas, y cientos de millones lo siguieron por televisión."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cada Saturn V se usaba una sola vez. Ninguna de sus etapas regresaba entera para reutilizarse: la primera y la segunda caían al océano Atlántico y la tercera quedaba en el espacio. Por eso cada misión necesitaba un cohete nuevo construido desde cero. Hoy algunas empresas recuperan las primeras etapas de sus cohetes para volver a usarlas, una idea que en los años sesenta todavía no era posible." },
      { label: "Dato Científico", icon: "atom", text: "Que el 90 % de la masa sea combustible no es un error de diseño, sino una consecuencia de la física. Para alcanzar velocidades de miles de kilómetros por hora, un cohete debe expulsar muchísima masa a gran velocidad. Cuanto más rápido debe ir, más combustible necesita, y ese combustible extra también pesa. Por eso los ingenieros reducían el peso de cada pieza del cohete hasta el último kilogramo posible." }
    ],
    fact: "Solo quedan tres Saturn V completos en exhibición en el mundo: uno en el Centro Espacial Kennedy, en Florida; otro en el Centro Espacial Johnson, en Houston; y otro en el Centro Espacial y de Cohetes de Estados Unidos, en Huntsville. Todos se armaron con etapas sobrantes de misiones canceladas. Están colocados en posición horizontal, y caminar a su lado permite comprobar el tamaño real del cohete que llevó astronautas a la Luna.",
  },
  {
    id: "etapa-s-ic-motores-f1",
    bannerImage: '/assets/apollo11/infographic_m1/banner_etapa-s-ic-motores-f1.webp',
    bannerCaption: "Cinco motores F-1 producían unos 34 millones de newtons de empuje y vaciaban la primera etapa en unos 2 minutos y 40 segundos.",
    title: "La etapa S-IC y los cinco motores F-1",
    color: '#9A6B4F',
    btnImage: '/assets/apollo11/infographic_m1/btn_etapa-s-ic-motores-f1.webp',
    image: '/assets/apollo11/infographic_m1/hero_etapa-s-ic-motores-f1.webp',
    content: [
      "La primera etapa del Saturn V, llamada S-IC, medía 42 metros de alto y llevaba cinco motores F-1 fabricados por la empresa Rocketdyne. Cuatro motores estaban en las esquinas y podían inclinarse para dirigir el cohete; el quinto, en el centro, permanecía fijo. Cada F-1 producía cerca de 6.8 millones de newtons de empuje al nivel del mar. Juntos sumaban unos 34 millones de newtons, el equivalente a 7.5 millones de libras de fuerza. Ningún motor de cámara única ha superado esa potencia.",
      "Los motores F-1 quemaban dos sustancias: RP-1, un queroseno muy refinado parecido al combustible de los aviones, y oxígeno líquido, que se mantiene a 183 grados bajo cero. Cada motor consumía cerca de 2.6 toneladas de propelente por segundo, así que los cinco juntos gastaban unas 13 toneladas cada segundo. La etapa cargaba más de 2,000 toneladas de propelente y las agotaba en unos 2 minutos y 40 segundos de vuelo.",
      "Para mover tanto líquido, cada F-1 tenía una turbobomba impulsada por una turbina de gas con una potencia cercana a 55,000 caballos de fuerza, más que varias locomotoras juntas. La bomba empujaba el combustible y el oxígeno hacia la cámara de combustión a enorme presión. Allí se mezclaban y ardían a más de 3,000 grados Celsius. Los gases calientes salían por la tobera, una campana de casi 3.7 metros de ancho en su extremo inferior.",
      "Durante las pruebas de los años cincuenta y sesenta apareció un problema grave: la inestabilidad de combustión. La presión dentro de la cámara podía empezar a oscilar cientos de veces por segundo y destruir el motor en una fracción de segundo. Para estudiarla, los ingenieros hacían estallar pequeñas cargas explosivas dentro de la cámara mientras el motor funcionaba y medían si recuperaba la calma. Rediseñaron la placa de inyectores con separadores metálicos hasta que el F-1 resistió esas perturbaciones.",
      "En la misión Apolo 11, la etapa S-IC se apagó unos 2 minutos y 42 segundos después del despegue, a unos 67 kilómetros de altura. En ese momento el cohete viajaba a cerca de 9,900 kilómetros por hora. La etapa vacía se separó, siguió subiendo por inercia unos segundos y después cayó al océano Atlántico, cientos de kilómetros al este de Florida. Su trabajo había durado menos que una canción, pero había levantado casi 3,000 toneladas desde el suelo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los motores F-1 usaban su propio combustible como refrigerante. Antes de quemarse, el queroseno circulaba por tubos soldados a las paredes de la cámara de combustión y absorbía calor. Esta técnica se llama refrigeración regenerativa. Gracias a ella, el metal de la cámara no se fundía aunque los gases interiores superaran los 3,000 grados. La parte baja de la tobera se protegía con los gases más fríos que salían de la turbina." },
      { label: "Dato Científico", icon: "atom", text: "El oxígeno líquido no es combustible: es el oxidante. En la Tierra, el fuego usa el oxígeno del aire, pero un cohete sube hasta lugares donde casi no hay aire. Por eso debe llevar su propio oxígeno. En la etapa S-IC, el tanque de oxígeno líquido era más grande que el de queroseno, porque la reacción química necesita más del doble de masa de oxígeno que de combustible." }
    ],
    fact: "En 2013, una expedición financiada por Jeff Bezos recuperó piezas de motores F-1 del fondo del océano Atlántico, a más de 4,000 metros de profundidad. Los restauradores encontraron un número de serie que permitió identificar uno de esos motores como parte de la etapa S-IC del Apolo 11. Algunas de esas piezas se exhiben desde 2017 en el Museo del Vuelo de Seattle, en Estados Unidos.",
  },
  {
    id: "etapas-superiores-hidrogeno",
    bannerImage: '/assets/apollo11/infographic_m1/banner_etapas-superiores-hidrogeno.webp',
    bannerCaption: "Las etapas superiores quemaban hidrógeno líquido a -253 °C, un combustible ligero que da más impulso por cada kilogramo.",
    title: "S-II y S-IVB: la fuerza del hidrógeno",
    color: '#5E7A8A',
    btnImage: '/assets/apollo11/infographic_m1/btn_etapas-superiores-hidrogeno.webp',
    image: '/assets/apollo11/infographic_m1/hero_etapas-superiores-hidrogeno.webp',
    content: [
      "La segunda etapa, S-II, medía casi 25 metros de alto y llevaba cinco motores J-2, también fabricados por Rocketdyne. A diferencia de la primera etapa, quemaba hidrógeno líquido y oxígeno líquido. El hidrógeno solo permanece líquido por debajo de los 253 grados bajo cero, una temperatura cercana al cero absoluto. Mantenerlo así durante horas en Florida, con temperaturas de verano superiores a 30 grados, fue uno de los grandes retos de ingeniería del programa.",
      "¿Por qué usar un combustible tan difícil? Porque el hidrógeno da más impulso por cada kilogramo quemado. Los ingenieros miden esa eficiencia con el impulso específico: el motor J-2 alcanzaba unos 420 segundos en el vacío, mientras que el F-1 lograba unos 263 segundos al nivel del mar. Con la misma masa de propelente, el J-2 empujaba durante mucho más tiempo. Esa ventaja importa más en las etapas superiores, que deben acelerar la nave cuando ya está lejos del suelo.",
      "El hidrógeno líquido tiene un problema: es catorce veces menos denso que el agua. Para guardar suficiente, la etapa S-II necesitaba un tanque enorme. Para ahorrar altura y peso, los ingenieros separaron el tanque de hidrógeno y el de oxígeno con una sola pared compartida, llamada mamparo común, aislada con un panel tipo panal. Además, cubrieron la etapa con aislante para que el calor exterior no hirviera el combustible antes del despegue.",
      "En la misión Apolo 11, la etapa S-II funcionó durante unos seis minutos y medio y llevó la nave hasta casi 185 kilómetros de altura, muy cerca de la velocidad orbital. Después se separó y cayó también al Atlántico. Entonces se encendió la tercera etapa, S-IVB, con un único motor J-2. Esta etapa medía casi 18 metros de alto y 6.6 metros de diámetro. Una versión parecida ya había volado en el cohete Saturn IB, más pequeño, usado en la misión Apolo 7.",
      "La gran ventaja del S-IVB era que su motor podía apagarse y volver a encenderse en el espacio. En el primer encendido, de unos dos minutos y medio, colocó a la tripulación del Apolo 11 en una órbita de estacionamiento a unos 190 kilómetros de altura, viajando a unos 28,000 kilómetros por hora. Allí, la nave dio una vuelta y media a la Tierra mientras los astronautas y el control de misión revisaban todos los sistemas antes del viaje lunar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los gases de escape de los motores de hidrógeno son casi solo vapor de agua. Cuando el hidrógeno arde con oxígeno, el producto principal es H2O. Por eso la llama de las etapas superiores era casi transparente, muy distinta de la columna naranja de los motores F-1, que quemaban queroseno y además producían hollín y dióxido de carbono." },
      { label: "Dato Científico", icon: "atom", text: "El hidrógeno es el elemento más ligero del universo: su átomo tiene un solo protón y un solo electrón. Cuanto más ligeras son las moléculas que salen por la tobera, más rápido pueden salir a la misma temperatura. Y cuanto más rápido sale el gas, más impulso recibe el cohete. Esa es la razón química de que el hidrógeno sea tan eficiente como propelente." }
    ],
    fact: "Después de enviar la nave hacia la Luna, la etapa S-IVB del Apolo 11 se alejó y quedó en órbita alrededor del Sol, donde sigue hoy. En las misiones Apolo 13 a 17, en cambio, los controladores dirigieron esa etapa para que chocara contra la Luna. Los sismómetros que habían dejado las misiones anteriores registraron las vibraciones del impacto y ayudaron a estudiar el interior lunar.",
  },
  {
    id: "unidad-instrumentos-tli",
    bannerImage: '/assets/apollo11/infographic_m1/banner_unidad-instrumentos-tli.webp',
    bannerCaption: "La Unidad de Instrumentos de IBM guiaba el cohete; el encendido de inyección translunar duró unos 5 minutos y 47 segundos.",
    title: "El cerebro del cohete y el salto a la Luna",
    color: '#6B6E8C',
    btnImage: '/assets/apollo11/infographic_m1/btn_unidad-instrumentos-tli.webp',
    image: '/assets/apollo11/infographic_m1/hero_unidad-instrumentos-tli.webp',
    content: [
      "Entre la tercera etapa y la nave Apolo había un anillo de casi un metro de alto y 6.6 metros de diámetro: la Unidad de Instrumentos, construida por IBM. Contenía una plataforma inercial con giroscopios y acelerómetros que medían cada giro y cada cambio de velocidad. También llevaba la computadora digital del vehículo de lanzamiento, conocida por sus siglas en inglés, LVDC. Esta computadora guiaba las tres etapas del Saturn V; la nave Apolo tenía otra computadora distinta para sus propias maniobras.",
      "La computadora LVDC usaba una técnica llamada redundancia modular triple. Sus circuitos más importantes estaban repetidos tres veces y, en cada operación, los tres resultados se comparaban. Si uno no coincidía con los otros dos, el sistema aceptaba el resultado de la mayoría. Así, una sola pieza dañada no podía desviar el cohete. Este principio de votación entre copias sigue usándose hoy en aviones, satélites y equipos médicos.",
      "Unas 2 horas y 44 minutos después del despegue, mientras sobrevolaba el océano Pacífico, el motor del S-IVB se encendió por segunda vez. Este encendido se llama inyección translunar. Duró unos 5 minutos y 47 segundos y elevó la velocidad de la nave de unos 28,000 a unos 39,000 kilómetros por hora, casi 11 kilómetros por segundo. Con esa velocidad, la órbita se estiró tanto que su punto más alejado alcanzaba la distancia de la Luna.",
      "Poco después vino la maniobra de transposición y acoplamiento. Michael Collins separó el conjunto formado por los módulos de Mando y de Servicio, lo giró 180 grados y lo acopló, punta con punta, al Módulo Lunar, que viajaba guardado dentro del adaptador sobre la tercera etapa. Después extrajo el Módulo Lunar y lo llevó consigo. La maniobra ya se había practicado en las misiones Apolo 9, en órbita terrestre, y Apolo 10, en el viaje lunar.",
      "En la punta del cohete había una torre de escape con un motor de combustible sólido. Si el Saturn V fallaba en la plataforma o durante los primeros minutos, ese motor podía arrancar el Módulo de Mando y alejarlo del peligro en pocos segundos. Por suerte, nunca hubo que usarla en un vuelo tripulado. En el Apolo 11, la torre se desprendió unos tres minutos después del despegue, cuando la nave ya estaba fuera de la parte más densa de la atmósfera."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La inyección translunar no apuntaba hacia donde estaba la Luna en ese momento, sino hacia donde iba a estar tres días después. La Luna se mueve en su órbita a más de 3,600 kilómetros por hora. Los ingenieros calcularon el encuentro como quien lanza un balón hacia el lugar al que corre un compañero, y no hacia donde está parado." },
      { label: "Dato Científico", icon: "atom", text: "Un giroscopio es una rueda que gira muy rápido y tiende a mantener su eje apuntando en la misma dirección. La plataforma inercial usaba giroscopios para saber hacia dónde apuntaba el cohete sin mirar al exterior. Los acelerómetros, por su parte, medían los cambios de velocidad. Combinando ambos datos, la computadora calculaba la posición del cohete en todo momento." }
    ],
    fact: "La Unidad de Instrumentos funcionaba solo mientras guiaba el cohete; después de separar la nave, su trabajo terminaba. Aun así, sin ella el Saturn V habría sido imposible de controlar: cada segundo tenía que ordenar pequeños giros a los motores para corregir el viento, el consumo desigual de combustible y la trayectoria, y no podía depender solo de las órdenes enviadas desde la Tierra.",
  },
  {
    id: "fisica-del-cohete",
    bannerImage: '/assets/apollo11/infographic_m1/banner_fisica-del-cohete.webp',
    bannerCaption: "La tercera ley de Newton y la ecuación de Tsiolkovski explican por qué los cohetes empujan en el vacío y se dividen en etapas.",
    title: "Acción, reacción y la ecuación del cohete",
    color: '#7A6A58',
    btnImage: '/assets/apollo11/infographic_m1/btn_fisica-del-cohete.webp',
    image: '/assets/apollo11/infographic_m1/hero_fisica-del-cohete.webp',
    content: [
      "Un cohete funciona gracias a la tercera ley de Newton: a toda acción le corresponde una reacción igual y opuesta. Los motores expulsan gases hacia abajo a varios kilómetros por segundo y, como respuesta, el cohete es empujado hacia arriba. Muchas personas creen que el cohete se apoya en el aire, pero no es así. De hecho, los motores funcionan mejor en el vacío del espacio, porque allí no hay aire que frene la salida de los gases por la tobera.",
      "Al despegar, los motores del Saturn V empujaban con unos 34 millones de newtons, mientras que el peso del cohete era de unos 28 millones de newtons. La diferencia era pequeña, así que el cohete subía despacio al principio: tardó unos 12 segundos en dejar atrás la torre de lanzamiento. Pero a medida que quemaba combustible, se volvía más ligero y aceleraba más. Al final de la primera etapa, los astronautas sentían casi cuatro veces su peso normal.",
      "En 1903, el maestro ruso Konstantín Tsiolkovski publicó la ecuación del cohete. Esta fórmula indica que el cambio de velocidad depende de la velocidad de salida de los gases y de la relación entre la masa inicial y la masa final del cohete. El detalle importante es que esa relación aparece dentro de un logaritmo. En la práctica, para duplicar la velocidad final no basta con duplicar el combustible: se necesita muchísimo más.",
      "Por esa razón los cohetes se dividen en etapas. Cuando una etapa vacía sus tanques, se convierte en peso muerto: metal, tuberías y motores que ya no sirven. Al soltarla, el cohete deja de cargar esa masa y los motores siguientes aceleran una nave más ligera. El Saturn V comenzó pesando unas 2,900 toneladas, pero la nave que viajó hacia la Luna pesaba alrededor de 45 toneladas, apenas el 1.5 % de la masa inicial.",
      "Unos 83 segundos después del despegue, a unos 13 kilómetros de altura, el Saturn V atravesó el momento de máxima presión aerodinámica, llamado Max Q. Allí la combinación de velocidad y densidad del aire producía la mayor fuerza sobre la estructura. Después, el cohete fue inclinándose hacia el este en una maniobra llamada giro gravitatorio. El objetivo no era solo subir, sino ganar velocidad horizontal: unos 28,000 kilómetros por hora para mantenerse en órbita."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Tsiolkovski era un profesor de matemáticas de provincias que había perdido gran parte de su audición en la infancia. Estudió casi siempre por su cuenta en bibliotecas. Además de su famosa ecuación, propuso ideas como los cohetes de varias etapas y las estaciones espaciales, décadas antes de que existiera la tecnología necesaria para construirlos." },
      { label: "Dato Científico", icon: "atom", text: "La ecuación de Tsiolkovski se escribe Δv = ve · ln(m0/mf). Δv es el cambio de velocidad, ve es la velocidad de salida de los gases, m0 es la masa inicial y mf es la masa final. Si un cohete quiere ganar más velocidad, puede expulsar los gases más rápido, con mejores combustibles, o aumentar la proporción de combustible respecto a su estructura." }
    ],
    fact: "La aceleración que sienten los astronautas se mide en «g»: 1 g es la fuerza de gravedad normal en la superficie de la Tierra. Durante el ascenso del Apolo 11, la tripulación llegó a soportar cerca de 4 g, como si pesaran cuatro veces más. Por eso viajaban acostados en asientos moldeados: en esa posición, la sangre se reparte mejor por el cuerpo y el corazón trabaja con menos esfuerzo.",
  },
  {
    id: "legado-trece-vuelos",
    bannerImage: '/assets/apollo11/infographic_m1/banner_legado-trece-vuelos.webp',
    bannerCaption: "Entre 1967 y 1973 el Saturn V voló 13 veces: llevó 24 astronautas hacia la Luna y lanzó la estación Skylab.",
    title: "Trece vuelos y un legado",
    color: '#6F7D5C',
    btnImage: '/assets/apollo11/infographic_m1/btn_legado-trece-vuelos.webp',
    image: '/assets/apollo11/infographic_m1/hero_legado-trece-vuelos.webp',
    content: [
      "El Saturn V voló por primera vez el 9 de noviembre de 1967, en la misión Apolo 4, sin tripulación. Su último lanzamiento fue el 14 de mayo de 1973, cuando puso en órbita la estación espacial Skylab. En total despegó 13 veces. Diez de esos vuelos llevaron astronautas: desde el Apolo 8, en diciembre de 1968, primera misión tripulada que orbitó la Luna, hasta el Apolo 17, en diciembre de 1972. Gracias a él, 24 personas viajaron hasta la Luna.",
      "No todos los vuelos fueron perfectos. En el Apolo 6, un vuelo de prueba sin tripulación, el cohete sufrió vibraciones llamadas efecto pogo y dos motores de la segunda etapa se apagaron antes de tiempo. En el Apolo 12, dos rayos golpearon al cohete durante el primer minuto de vuelo; el controlador John Aaron recomendó cambiar un interruptor y la misión continuó. En el Apolo 13, el motor central de la segunda etapa se apagó antes de lo previsto por vibraciones.",
      "Aun con esos problemas, el Saturn V nunca perdió a una tripulación durante el lanzamiento. Los ingenieros estudiaban cada fallo y modificaban el cohete antes del siguiente vuelo. Después del Apolo 6, por ejemplo, añadieron amortiguadores que cambiaban la presión en las líneas de combustible para reducir el efecto pogo. Este método de aprender de cada error, documentarlo y corregirlo es una de las lecciones más importantes del programa Apolo.",
      "El último Saturn V tenía una misión diferente. La NASA convirtió una tercera etapa S-IVB en la estación espacial Skylab, con laboratorio, dormitorios y un telescopio solar. Como Skylab ocupaba el lugar de la tercera etapa, el cohete voló solo con dos etapas. Tres tripulaciones vivieron a bordo entre 1973 y 1974; la última permaneció 84 días en órbita, un récord estadounidense durante más de veinte años. Skylab cayó a la Tierra en 1979.",
      "Durante más de cincuenta años, el Saturn V fue el cohete más potente que había llevado personas al espacio. En 2022, el cohete SLS de la NASA lanzó la misión Artemis I con unos 39 millones de newtons de empuje, más que el Saturn V. En 2023, SpaceX realizó el primer vuelo integrado de Starship, cuya primera etapa tiene 33 motores Raptor. Ambos programas buscan algo que el Saturn V inició: llevar humanos más allá de la órbita terrestre."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El efecto pogo recibe su nombre de los palos saltarines llamados pogo. Ocurre cuando las vibraciones del cohete cambian la presión del combustible que llega a los motores; eso cambia el empuje, que a su vez aumenta las vibraciones. Es un círculo que se refuerza solo. Para romperlo, los ingenieros colocaron cámaras con gas en las tuberías que absorbían esas oscilaciones." },
      { label: "Dato Científico", icon: "atom", text: "Un rayo puede alcanzar a un cohete aunque no haya tormenta sobre él. La columna de gases calientes que deja el motor conduce bien la electricidad y forma un camino largo entre el cielo y el suelo. Eso ocurrió en el Apolo 12. Desde entonces, las reglas de lanzamiento impiden despegar si hay ciertos tipos de nubes cargadas cerca de la plataforma." }
    ],
    fact: "La NASA tenía previstas las misiones Apolo 18, 19 y 20, pero las canceló por recortes de presupuesto. Por eso sobraron etapas del Saturn V que nunca volaron. Con ellas se armaron los tres cohetes que hoy se exhiben en Florida, Texas y Alabama. Uno de ellos, el del Centro Espacial Johnson, en Houston, fue declarado Monumento Histórico Nacional de Estados Unidos.",
  },
  {
    id: "mas-alla-propulsion",
    bannerImage: '/assets/apollo11/infographic_m1/banner_mas-alla-propulsion.webp',
    bannerCaption: "Voyager 1, LightSail 2 y la fusión nuclear muestran cómo la propulsión espacial sigue el camino que abrió el Saturn V.",
    title: "De la Luna a las estrellas",
    color: '#5C6F7D',
    btnImage: '/assets/apollo11/infographic_m1/btn_mas-alla-propulsion.webp',
    image: '/assets/apollo11/infographic_m1/hero_mas-alla-propulsion.webp',
    content: [
      "El Saturn V demostró que los humanos podían escapar de la órbita terrestre, y las sondas que vinieron después llegaron todavía más lejos. La Voyager 1 despegó el 5 de septiembre de 1977 en un cohete Titan IIIE. Usó la gravedad de Júpiter y Saturno para acelerar y, el 25 de agosto de 2012, cruzó la heliopausa, la frontera donde termina el viento del Sol y empieza el espacio interestelar. Fue el primer objeto fabricado por humanos en conseguirlo.",
      "El 14 de febrero de 1990, a petición del astrónomo Carl Sagan, la Voyager 1 giró sus cámaras y fotografió la Tierra desde unos 6,000 millones de kilómetros. En la imagen, nuestro planeta ocupa menos de un píxel dentro de un rayo de luz solar dispersa. Sagan lo llamó «un pálido punto azul» y en 1994 publicó un libro con ese título. Escribió que esa imagen muestra lo pequeño y frágil que es el único hogar que conocemos.",
      "Los cohetes químicos no son la única forma de moverse en el espacio. La luz del Sol transporta un impulso muy pequeño que puede empujar una vela de material ligero. En 2010, la sonda japonesa IKAROS desplegó la primera vela solar en el espacio interplanetario. La sociedad planetaria The Planetary Society lanzó LightSail 2 en junio de 2019; con una vela de 32 metros cuadrados, demostró ese mismo año que podía elevar su órbita usando solo la luz solar. Reingresó a la atmósfera en noviembre de 2022.",
      "En 2016 se anunció el proyecto Breakthrough Starshot, que estudia enviar sondas de pocos gramos hacia la estrella Alfa Centauri. La idea es empujarlas con láseres muy potentes desde la Tierra hasta un 20 % de la velocidad de la luz, para que lleguen en unos 20 años. Sus velas tendrían que pesar apenas unos gramos y soportar el calor del láser sin fundirse. Por eso los investigadores evalúan materiales como el grafeno, una capa de carbono de un solo átomo de grosor.",
      "Otra fuente de energía para el futuro es la fusión nuclear, la reacción que alimenta al Sol. El 5 de diciembre de 2022, la Instalación Nacional de Ignición, en el Laboratorio Lawrence Livermore de California, logró por primera vez la ignición: 192 láseres entregaron 2.05 megajulios a una pequeña cápsula de combustible, que liberó 3.15 megajulios. Todavía falta mucho para usar la fusión en naves espaciales, pero fue un paso científico histórico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las dos sondas Voyager llevan un disco de oro con sonidos e imágenes de la Tierra: saludos en 55 idiomas, música de varias culturas, el sonido de la lluvia y el latido de un corazón humano. El comité que eligió esos contenidos estuvo presidido por Carl Sagan. Es un mensaje para quien pueda encontrarlo dentro de miles o millones de años." },
      { label: "Dato Científico", icon: "atom", text: "La luz no tiene masa, pero sí transporta impulso. Cuando los fotones rebotan en una superficie brillante, la empujan muy suavemente. Esa presión es tan débil que la luz solar sobre una vela de un campo de fútbol produciría una fuerza parecida al peso de unas pocas monedas. En el vacío no hay rozamiento, así que esa fuerza constante va sumando velocidad durante meses." }
    ],
    fact: "La Voyager 1 es el objeto fabricado por humanos más lejano de la Tierra: se encuentra a más de 24,000 millones de kilómetros. Sus señales de radio, que viajan a la velocidad de la luz, tardan más de 22 horas en llegar hasta nosotros. Aun así, las antenas de la Red de Espacio Profundo de la NASA siguen recibiendo sus datos casi cincuenta años después de su lanzamiento.",
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
      hue: Math.random() > 0.5 ? '201,179,126' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(201,179,126,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#8C5A3C", "#9A6B4F", "#5E7A8A", "#6B6E8C", "#7A6A58", "#6F7D5C", "#5C6F7D"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#C9B37E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#C9B37E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradApollo11M1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA MÁQUINA QUE ABRIÓ EL CAMINO A LA LUNA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(201,179,126,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MISIONES APOLO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(201,179,126,0.2)'}`,
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
          layoutId="activeDotApollo11M1"
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
      border: '1px solid rgba(201,179,126,0.15)',
    }}>
      <Star size={14} style={{ color: '#C9B37E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C9B37E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(201,179,126,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C9B37E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Apollo11M1() {
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
      border: '1px solid rgba(201,179,126,0.12)',
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
            textAlign: 'center', color: 'rgba(201,179,126,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(201,179,126,0.08)', borderRadius: '16px',
              border: '1px solid rgba(201,179,126,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C9B37E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Ingeniero de Ignición! Dominas las tres etapas del Saturn V.
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
