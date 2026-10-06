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
  "Shayler, D. J., & Moule, I. A. (2005). Women in Space: Following Valentina. Springer-Praxis.",
  "Lebedev, V. (1988). Diary of a Cosmonaut: 211 Days in Space. PhytoResource Research Inc.",
  "Hall, R., & Shayler, D. J. (2003). Soyuz: A Universal Spacecraft. Springer-Praxis.",
  "Portree, D. S. F. (1995). Mir Hardware Heritage. NASA Reference Publication 1357. NASA Johnson Space Center.",
  "Harvey, B. (2007). The Rebirth of the Russian Space Program: 50 Years After Sputnik, New Frontiers. Springer-Praxis.",
  "Zimmerman, R. (2003). Leaving Earth: Space Stations, Rival Superpowers, and the Quest for Interplanetary Travel. Joseph Henry Press."
];

const INFOGRAPHIC_NODES = [
  {
    id: "infancia-y-paracaidismo",
    bannerImage: '/assets/pioneros/infographic_m6/banner_infancia-y-paracaidismo.webp',
    bannerCaption: "Svetlana Savitskaya nació en Moscú el 8 de agosto de 1948, hija de un célebre piloto de caza soviético.",
    title: "Una infancia entre aviones y paracaídas",
    color: '#8A6F5A',
    btnImage: '/assets/pioneros/infographic_m6/btn_infancia-y-paracaidismo.webp',
    image: '/assets/pioneros/infographic_m6/hero_infancia-y-paracaidismo.webp',
    content: [
      "Svetlana Yevguénievna Savitskaya nació el 8 de agosto de 1948 en Moscú, la capital de la entonces Unión Soviética. Creció en una familia donde la aviación era casi un idioma propio: su padre, Yevgueni Savitski, había sido piloto de caza durante la Segunda Guerra Mundial, recibió dos veces el título de Héroe de la Unión Soviética y llegó a ser mariscal del aire, uno de los rangos más altos de la fuerza aérea. En casa se hablaba de motores, maniobras y vuelos, y la pequeña Svetlana escuchaba todo con enorme atención.",
      "Desde niña mostró una energía enorme y una gran curiosidad por el cielo. Su padre no quería que tuviera privilegios por ser hija de un militar famoso, y ella tampoco los buscaba: quería ganarse cada logro con su propio esfuerzo. Cuando tenía unos 16 años comenzó a practicar paracaidismo, y según cuentan varias biografías, al principio lo hizo sin que sus padres lo supieran del todo. Aquella decisión revela un rasgo que la acompañaría toda la vida: cuando algo le parecía importante, encontraba la manera de lograrlo con disciplina y valentía.",
      "A los 17 años ya había realizado cientos de saltos y había conseguido algo asombroso: tres récords mundiales de paracaidismo desde la estratosfera. La estratosfera es la capa de la atmósfera que comienza entre unos 8 y 18 kilómetros de altura, según la latitud, muy por encima de donde suelen volar los aviones comerciales. Saltar desde allí exige respirar oxígeno embotellado, usar ropa especial contra el frío extremo y retrasar la apertura del paracaídas durante una larga caída libre, controlando el cuerpo para no girar sin control.",
      "¿Por qué es tan difícil caer desde tan alto? En las capas altas el aire es muy poco denso, así que ofrece menos resistencia y el cuerpo alcanza velocidades mucho mayores que en un salto normal. A medida que el paracaidista desciende hacia aire más espeso, la resistencia aumenta y lo va frenando. Además, a esas alturas la temperatura puede bajar a más de 50 grados bajo cero y la presión es tan baja que, sin oxígeno, una persona perdería el conocimiento en poco tiempo. Svetlana aprendió muy joven a mantener la calma en un entorno que no perdona errores.",
      "Estos primeros años fueron como una escuela invisible para su futuro. El paracaidismo le enseñó a orientarse en el aire, a tomar decisiones en segundos y a confiar en sus procedimientos de seguridad. Muchos años después, cuando entrenó como cosmonauta, esas habilidades resultaron muy útiles: las cápsulas Soyuz regresan a la Tierra colgadas de un paracaídas, y los tripulantes deben estar preparados para aterrizar en lugares inesperados. Sin saberlo, aquella adolescente que saltaba desde la estratosfera ya estaba practicando para llegar al espacio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El padre de Svetlana, Yevgueni Savitski, fue uno de los pilotos de caza soviéticos más reconocidos de la Segunda Guerra Mundial, con una veintena de victorias aéreas. Después de la guerra siguió volando aviones a reacción y llegó a mariscal del aire. Svetlana heredó su pasión, pero construyó su propio camino: mientras él defendió el cielo de su país, ella terminaría yendo mucho más lejos, hasta la órbita terrestre." },
      { label: "Dato Científico", icon: "atom", text: "La atmósfera terrestre se divide en capas según cómo cambia la temperatura con la altura. En la troposfera, donde vivimos y se forman casi todas las nubes, la temperatura baja a medida que subimos. En la estratosfera ocurre lo contrario: primero deja de bajar y luego aumenta, porque la capa de ozono absorbe parte de la radiación ultravioleta del Sol. Por eso un salto estratosférico combina aire finísimo, frío intenso y una radiación solar más fuerte." }
    ],
    fact: "En la estratosfera la presión del aire es solo una pequeña fracción de la que hay al nivel del mar: a unos 15 kilómetros de altura es aproximadamente la octava parte. Con tan poco aire, los pulmones no pueden obtener suficiente oxígeno. Por eso los paracaidistas estratosféricos respiran de botellas especiales hasta que descienden a capas más bajas, donde el aire vuelve a ser respirable.",
  },
  {
    id: "campeona-de-acrobacia",
    bannerImage: '/assets/pioneros/infographic_m6/banner_campeona-de-acrobacia.webp',
    bannerCaption: "En 1970 Savitskaya fue campeona mundial absoluta de acrobacia aérea con aviones de pistón, en Hullavington, Inglaterra.",
    title: "Campeona mundial de acrobacia aérea",
    color: '#6F7F8C',
    btnImage: '/assets/pioneros/infographic_m6/btn_campeona-de-acrobacia.webp',
    image: '/assets/pioneros/infographic_m6/hero_campeona-de-acrobacia.webp',
    content: [
      "Además de saltar en paracaídas, Svetlana quería pilotar. Ingresó en el Instituto de Aviación de Moscú, una de las escuelas de ingeniería aeronáutica más importantes del país, donde estudió cómo se diseñan y funcionan los aviones. Al mismo tiempo aprendió a volar en escuelas de vuelo deportivo. Esa combinación era poco común: no solo sabía manejar los mandos, también entendía las matemáticas y la física que explican por qué un avión se sostiene en el aire. Se graduó como ingeniera en 1972.",
      "La acrobacia aérea es un deporte en el que los pilotos dibujan figuras complicadas en el cielo: rizos, toneles, barrenas y tramos de vuelo invertido, todo dentro de un espacio delimitado y ante jueces que califican la precisión de cada movimiento. Es como la gimnasia artística, pero a bordo de un avión que vuela a cientos de kilómetros por hora. Cada maniobra somete al piloto a fuerzas que lo aplastan contra el asiento o lo empujan contra el arnés, y exige una coordinación perfecta entre manos, pies y vista.",
      "En 1970 Svetlana participó en el Campeonato Mundial de Acrobacia Aérea celebrado en Hullavington, Inglaterra. Volando un Yak-18PM, un pequeño avión soviético de un solo asiento, se convirtió en campeona mundial absoluta en la categoría de aviones con motor de pistón. Tenía apenas 22 años. El público y la prensa británica quedaron sorprendidos por aquella joven piloto, y el triunfo la hizo famosa dentro y fuera de su país. Fue una demostración clara de su talento, su sangre fría y su precisión.",
      "Para entender lo difícil de su hazaña conviene hablar de las fuerzas G. Una G es la fuerza de gravedad que sentimos normalmente al estar de pie. En un giro cerrado o al salir de un picado, un piloto acrobático puede soportar cinco o seis G, es decir, sentir su cuerpo cinco o seis veces más pesado. La sangre tiende a bajar hacia las piernas y, si el piloto no está entrenado, su visión puede oscurecerse. En las maniobras invertidas ocurre lo contrario: aparecen G negativas que empujan la sangre hacia la cabeza.",
      "Después de su victoria, Savitskaya trabajó como instructora de vuelo, enseñando a otros pilotos lo que ella dominaba. Enseñar la obligó a explicar cada maniobra paso a paso y a pensar siempre en la seguridad de sus alumnos, otra habilidad valiosa en el espacio, donde cada procedimiento se escribe, se practica y se revisa muchas veces. La acrobacia le dio algo más: un control del cuerpo y una orientación espacial excepcionales, muy útiles para moverse en ingravidez, donde no existen el «arriba» ni el «abajo»."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Yak-18PM era un avión pequeño de un solo asiento, desarrollado por la oficina de diseño del ingeniero Aleksandr Yákovlev especialmente para competencias de acrobacia. Su motor de pistón movía una hélice, como en los aviones clásicos, pero su estructura ligera y sus controles muy sensibles permitían realizar figuras con gran precisión. Años después, Svetlana trabajaría precisamente como piloto de pruebas para la oficina de diseño Yákovlev." },
      { label: "Dato Científico", icon: "atom", text: "Un avión vuela gracias a la sustentación, una fuerza que aparece cuando el aire pasa alrededor de las alas. La forma del ala y su inclinación desvían el aire hacia abajo y, por la tercera ley de Newton, el aire empuja el ala hacia arriba. En vuelo invertido, los pilotos acrobáticos inclinan el avión para que el ala siga generando sustentación aunque vaya «al revés». Por eso muchos aviones acrobáticos tienen alas de perfil simétrico." }
    ],
    fact: "Las fuerzas G se miden comparándolas con la gravedad terrestre, que hace que un objeto en caída aumente su velocidad unos 9.8 metros por segundo cada segundo. Un piloto que soporta 6 G siente que su cuerpo pesa seis veces más: si pesa 50 kilos, por un instante es como si pesara 300. Los trajes anti-G y ciertas técnicas de respiración y tensión muscular ayudan a que la sangre siga llegando al cerebro.",
  },
  {
    id: "piloto-de-pruebas-y-records",
    bannerImage: '/assets/pioneros/infographic_m6/banner_piloto-de-pruebas-y-records.webp',
    bannerCaption: "Savitskaya batió numerosos récords con aviones a reacción, entre ellos uno de velocidad femenina de unos 2,683 km/h en 1975.",
    title: "Piloto de pruebas y cazadora de récords",
    color: '#7A8B6E',
    btnImage: '/assets/pioneros/infographic_m6/btn_piloto-de-pruebas-y-records.webp',
    image: '/assets/pioneros/infographic_m6/hero_piloto-de-pruebas-y-records.webp',
    content: [
      "Tras su etapa como instructora, Svetlana dio un salto aún mayor: en 1976 terminó su formación como piloto de pruebas. Un piloto de pruebas es la persona que vuela un avión nuevo o modificado para comprobar si funciona como esperan los ingenieros. Debe llevar la máquina hasta sus límites de velocidad, altura y maniobra, anotar cada reacción y regresar con datos precisos. Es uno de los trabajos más arriesgados de la aviación, porque nadie sabe con certeza cómo se comportará un avión en situaciones extremas.",
      "Durante los años setenta y principios de los ochenta, Savitskaya estableció numerosos récords mundiales de aviación, muchos de ellos con aviones a reacción. Uno de los más famosos lo logró en 1975 a bordo del Ye-133, una versión especial del caza supersónico MiG-21: alcanzó alrededor de 2,683 kilómetros por hora, un récord de velocidad para mujeres. Esa velocidad equivale a más del doble de la velocidad del sonido; a ese ritmo se podría cruzar la distancia entre dos ciudades separadas por 100 kilómetros en poco más de dos minutos.",
      "¿Qué significa volar más rápido que el sonido? El sonido viaja por el aire como una onda, a unos 1,200 kilómetros por hora cerca del suelo y algo más despacio a gran altura, donde el aire es más frío. Cuando un avión supera esa velocidad, las ondas de presión que genera se acumulan en un frente llamado onda de choque, que en tierra se escucha como un fuerte estampido sónico. Volar así requiere alas especiales, motores muy potentes y un piloto capaz de reaccionar con enorme rapidez.",
      "Sus récords no fueron solo de velocidad: también estableció marcas en otras categorías de vuelo, todas registradas por la Federación Aeronáutica Internacional, el organismo que certifica los récords de aviación en todo el mundo. Para homologar un récord se instalan instrumentos que registran el vuelo y hay observadores que verifican cada dato. No basta con decir que se voló muy rápido o muy alto: hay que demostrarlo con mediciones precisas que cualquier experto pueda revisar, igual que se hace con un experimento científico.",
      "Mientras tanto trabajaba como piloto de pruebas para la oficina de diseño Yákovlev, famosa por sus aviones deportivos y militares. Allí ponía a prueba aeronaves y aportaba su mirada de ingeniera para mejorarlas. Cada vuelo de prueba era una conversación entre la piloto y los diseñadores: ella describía cómo respondía el avión y ellos ajustaban sus cálculos. Esa experiencia, unida a sus títulos deportivos, la convirtió en una de las aviadoras más preparadas de su generación y en una candidata natural para viajar al espacio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El nombre Ye-133 no correspondía a un avión totalmente nuevo. Las oficinas de diseño soviéticas solían usar designaciones especiales al inscribir récords ante la Federación Aeronáutica Internacional, en parte para no revelar detalles de sus aviones militares. Así, el avión con el que Svetlana voló tan rápido era en realidad una variante del MiG-21, uno de los cazas supersónicos más fabricados de toda la historia de la aviación." },
      { label: "Dato Científico", icon: "atom", text: "Los ingenieros miden la velocidad de los aviones rápidos con el número de Mach, en honor del físico austriaco Ernst Mach. Mach 1 significa volar exactamente a la velocidad del sonido en el aire que rodea al avión; Mach 2, al doble. Como la velocidad del sonido depende de la temperatura del aire, un mismo número de Mach corresponde a distintos kilómetros por hora según la altura a la que se vuele. Por eso los pilotos miran el Mach y no solo los km/h." }
    ],
    fact: "La Federación Aeronáutica Internacional, fundada en 1905, es la organización que certifica los récords mundiales de aviación y astronáutica. También propone la definición más usada del límite del espacio: la línea de Kármán, a 100 kilómetros de altura sobre el nivel del mar. Gracias a sus registros cuidadosos sabemos con precisión qué lograron pilotos como Savitskaya y en qué condiciones lo hicieron.",
  },
  {
    id: "seleccion-cosmonauta",
    bannerImage: '/assets/pioneros/infographic_m6/banner_seleccion-cosmonauta.webp',
    bannerCaption: "En 1980 Savitskaya fue elegida en un grupo de mujeres candidatas a cosmonautas del programa espacial soviético.",
    title: "Del cielo al cosmos: la selección",
    color: '#8C7A9B',
    btnImage: '/assets/pioneros/infographic_m6/btn_seleccion-cosmonauta.webp',
    image: '/assets/pioneros/infographic_m6/hero_seleccion-cosmonauta.webp',
    content: [
      "Después del vuelo de Valentina Tereshkova en 1963, ninguna otra mujer había viajado al espacio. Durante casi dos décadas los equipos de cosmonautas soviéticos estuvieron formados solo por hombres, en su mayoría pilotos militares. A finales de los años setenta, sin embargo, la situación empezó a cambiar. En Estados Unidos, la NASA había seleccionado en 1978 a sus primeras seis mujeres astronautas para volar en el futuro transbordador espacial, entre ellas Sally Ride. La Unión Soviética no quería quedarse atrás.",
      "En 1980 el programa soviético eligió un nuevo grupo de mujeres candidatas a cosmonautas, y Svetlana Savitskaya estaba entre ellas. Su currículum era impresionante: ingeniera aeronáutica, campeona mundial de acrobacia, piloto de pruebas y poseedora de récords de velocidad. Varias de sus compañeras eran ingenieras o especialistas en otras áreas, pero su experiencia como piloto de aviones a reacción la distinguía claramente. Esa preparación la colocó en primera fila para el siguiente vuelo con una mujer a bordo.",
      "El entrenamiento tuvo lugar en el Centro de Entrenamiento de Cosmonautas Yuri Gagarin, en la llamada Ciudad de las Estrellas, cerca de Moscú. Allí los candidatos estudiaban los sistemas de la nave Soyuz y de las estaciones espaciales Salyut: cómo se controla la navegación, cómo funciona el soporte vital que mantiene el aire respirable y qué hacer ante cada emergencia posible. También giraban en centrífugas que reproducen las fuertes aceleraciones del despegue y del regreso a la Tierra.",
      "La preparación física incluía ejercicios de supervivencia, porque una cápsula Soyuz podía aterrizar lejos del lugar previsto: en un bosque nevado, en una estepa o incluso en el agua. Los cosmonautas practicaban cómo resistir varios días hasta ser rescatados. Además volaban en aviones que siguen trayectorias parabólicas: al subir y luego dejarse caer siguiendo una curva, crean unos segundos de ingravidez dentro de la cabina. Así aprendían a moverse, comer y trabajar mientras flotaban.",
      "El contexto político también influyó. Era la época de la Guerra Fría, una rivalidad entre la Unión Soviética y Estados Unidos que se manifestaba también en la carrera espacial. Los dirigentes soviéticos sabían que Sally Ride se preparaba para volar en el transbordador y querían que una cosmonauta soviética viajara antes. Pero Savitskaya no era un simple símbolo: era una profesional altamente cualificada, y su misión tendría un programa científico real a bordo de una estación espacial."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Ciudad de las Estrellas, en ruso Zviozdni Gorodok, es una pequeña localidad cercana a Moscú construida alrededor del centro de entrenamiento de cosmonautas. Allí hay simuladores de las naves, una gran centrífuga y una enorme piscina donde se ensayan las caminatas espaciales bajo el agua. Hoy siguen entrenando en ese lugar cosmonautas rusos y astronautas de otros países que viajan en naves Soyuz." },
      { label: "Dato Científico", icon: "atom", text: "En un vuelo parabólico, el avión sube con fuerza y luego reduce el empuje para seguir una trayectoria curva, igual que la de una pelota lanzada al aire. Durante esa caída libre, el avión y sus pasajeros caen juntos y a la misma velocidad, por eso todo flota en la cabina durante unos 20 a 25 segundos. Es lo mismo que sucede en órbita: los astronautas no flotan por falta de gravedad, sino porque están en caída libre continua." }
    ],
    fact: "En la órbita baja de la Tierra, donde volaban las estaciones Salyut a unos 300 o 400 kilómetros de altura, la gravedad sigue siendo cerca del 90 % de la que sentimos en el suelo. Los cosmonautas flotan porque la nave y ellos caen continuamente alrededor del planeta a unos 28,000 kilómetros por hora, tan rápido que la superficie curva de la Tierra se aleja de ellos al mismo ritmo al que caen.",
  },
  {
    id: "soyuz-t7-salyut-7",
    bannerImage: '/assets/pioneros/infographic_m6/banner_soyuz-t7-salyut-7.webp',
    bannerCaption: "El 19 de agosto de 1982 la Soyuz T-7 despegó con Popov, Serebrov y Savitskaya rumbo a la estación espacial Salyut 7.",
    title: "Soyuz T-7: la segunda mujer en el espacio",
    color: '#5E7A8A',
    btnImage: '/assets/pioneros/infographic_m6/btn_soyuz-t7-salyut-7.webp',
    image: '/assets/pioneros/infographic_m6/hero_soyuz-t7-salyut-7.webp',
    content: [
      "El 19 de agosto de 1982, la nave Soyuz T-7 despegó desde el cosmódromo de Baikonur, en Kazajistán, con tres tripulantes: el comandante Leonid Popov, el ingeniero de vuelo Aleksandr Serebrov y la cosmonauta investigadora Svetlana Savitskaya. Con este lanzamiento, Svetlana se convirtió en la segunda mujer de la historia en viajar al espacio, diecinueve años después del vuelo de Valentina Tereshkova en la Vostok 6, realizado en junio de 1963. Acababa de cumplir 34 años.",
      "Al día siguiente, la Soyuz T-7 se acopló a la estación espacial Salyut 7, que orbitaba la Tierra desde abril de ese año. A bordo los esperaban Anatoli Berezovói y Valentín Lébedev, la tripulación residente que llevaba unos tres meses viviendo allí. Por primera vez, una estación espacial albergaba a una tripulación mixta de hombres y mujeres. Durante varios días convivieron cinco personas en un espacio del tamaño aproximado de un autobús, compartiendo comida, trabajo y turnos de descanso.",
      "La misión tenía un programa científico intenso. Svetlana participó en experimentos médicos para estudiar cómo responde el cuerpo humano a la ingravidez: cómo cambian la circulación de la sangre, el equilibrio y la forma en que se reparten los líquidos del cuerpo. Su presencia era especialmente valiosa porque hasta entonces había muy pocos datos sobre mujeres en el espacio. Los médicos querían saber si el organismo femenino se adaptaba igual que el masculino, y sus mediciones ayudaron a responder esa pregunta.",
      "En la Tierra, la gravedad tira de la sangre y de los demás líquidos del cuerpo hacia las piernas. En órbita, como todo cae a la vez, ese tirón ya no se nota y los líquidos se desplazan hacia el pecho y la cabeza. Por eso los astronautas suelen tener la cara algo hinchada y las piernas más delgadas durante los primeros días, un efecto que a veces se llama «piernas de pájaro». Estudiar estos cambios era clave para planear misiones más largas sin poner en riesgo la salud de las tripulaciones.",
      "La visita duró casi ocho días. El 27 de agosto de 1982, Popov, Serebrov y Savitskaya regresaron a la Tierra, pero no en la nave con la que habían llegado: usaron la Soyuz T-5, que llevaba más tiempo acoplada, y dejaron su Soyuz T-7, más nueva, a la tripulación residente. Ese intercambio garantizaba que la estación siempre tuviera una nave de regreso en buen estado. La cápsula aterrizó en las estepas de Kazajistán, y Svetlana recibió el título de Héroe de la Unión Soviética."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El cosmonauta Valentín Lébedev escribió un diario durante su larga estancia en la Salyut 7, publicado después como libro. En los relatos de aquella visita se cuenta que, al llegar Svetlana, sus compañeros le ofrecieron en broma un delantal para la cocina. Ella siguió adelante con su trabajo científico como una tripulante más. La anécdota muestra los prejuicios que tuvo que enfrentar y cómo los superó con profesionalidad." },
      { label: "Dato Científico", icon: "atom", text: "Para alcanzar una estación espacial no basta con apuntar hacia ella. En órbita, acelerar hace que la nave suba a una órbita más alta, que tarda más en completar una vuelta; frenar la lleva a una órbita más baja y más rápida. Por eso los cosmonautas encienden los motores en momentos muy calculados para irse acercando poco a poco. Es una danza orbital que en la época de la Soyuz T-7 duraba alrededor de un día completo." }
    ],
    fact: "Salyut 7 fue la última estación de la serie Salyut. Estuvo habitada de forma intermitente entre 1982 y 1986 y recibió tripulaciones residentes y visitantes, incluidos cosmonautas de Francia y de la India. La experiencia acumulada en ella sirvió para diseñar y operar la estación Mir, cuyo primer módulo se lanzó en febrero de 1986.",
  },
  {
    id: "soyuz-t12-caminata-espacial",
    bannerImage: '/assets/pioneros/infographic_m6/banner_soyuz-t12-caminata-espacial.webp',
    bannerCaption: "El 25 de julio de 1984 Savitskaya salió de la Salyut 7 y se convirtió en la primera mujer en realizar una caminata espacial.",
    title: "Soyuz T-12: la primera caminata espacial de una mujer",
    color: '#9A7B5F',
    btnImage: '/assets/pioneros/infographic_m6/btn_soyuz-t12-caminata-espacial.webp',
    image: '/assets/pioneros/infographic_m6/hero_soyuz-t12-caminata-espacial.webp',
    content: [
      "Dos años después de su primer vuelo, Svetlana volvió al espacio. El 17 de julio de 1984 despegó a bordo de la Soyuz T-12 junto al comandante Vladímir Dzhanibékov y al piloto de pruebas Ígor Volk. Con este lanzamiento se convirtió en la primera mujer en viajar al espacio dos veces. La tripulación se acopló a la Salyut 7, donde vivían desde febrero tres cosmonautas de una misión de larga duración: Leonid Kizim, Vladímir Soloviov y el médico Oleg Atkov.",
      "El gran objetivo de la misión era una actividad extravehicular, es decir, una caminata espacial. El 25 de julio de 1984, Savitskaya y Dzhanibékov se pusieron los trajes espaciales Orlan, despresurizaron el compartimento de transferencia de la estación y abrieron la escotilla hacia el vacío. Svetlana salió al exterior y se convirtió en la primera mujer de la historia en realizar una caminata espacial. La salida duró 3 horas y 35 minutos, mientras la estación seguía orbitando la Tierra.",
      "Su tarea principal era probar una herramienta muy especial llamada URI, siglas en ruso de «herramienta manual universal». Había sido desarrollada en el Instituto de Soldadura Eléctrica Paton, en Kiev, y usaba un haz de electrones para calentar metales. Con ella, Svetlana y Dzhanibékov cortaron, soldaron y unieron con soldadura blanda distintas muestras de metal, y también aplicaron un recubrimiento metálico sobre una superficie. Fue una de las primeras pruebas de trabajo con metales realizadas en el espacio abierto.",
      "¿Por qué usar electrones? Un haz de electrones es una corriente de partículas diminutas aceleradas a gran velocidad. Al chocar contra el metal le transfieren su energía y lo calientan hasta fundirlo en un punto muy pequeño. En la Tierra, este tipo de soldadura se hace dentro de cámaras de vacío, porque el aire desviaría y frenaría los electrones. En el espacio, el vacío ya existe de forma natural, así que la herramienta podía funcionar sin cámara especial. Pero también era peligrosa: una gota de metal fundido o el propio haz podían dañar el traje, la única barrera entre Svetlana y el vacío.",
      "Trabajar con un traje presurizado es agotador: el traje se infla como un globo y cada movimiento de los dedos exige fuerza. Además, sin peso, cualquier empujón hace girar el cuerpo, por lo que hay que sujetarse con pies y manos. Svetlana completó sus tareas y regresó con Dzhanibékov al interior de la estación. Su hazaña ocurrió unos dos meses y medio antes de que Kathryn Sullivan realizara, en octubre de 1984, la primera caminata espacial de una astronauta estadounidense. La Soyuz T-12 aterrizó el 29 de julio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Ígor Volk, el tercer tripulante de la Soyuz T-12, era piloto de pruebas del programa del transbordador soviético Burán. Los médicos querían saber si un piloto podía manejar con seguridad una nave alada después de pasar días en ingravidez. Por eso, tras aterrizar, Volk pilotó aviones casi de inmediato para comprobar sus reflejos. Los resultados ayudaron a planear el regreso de futuras tripulaciones del Burán." },
      { label: "Dato Científico", icon: "atom", text: "El traje Orlan funciona como una pequeña nave espacial con forma humana. Mantiene en su interior una presión de aproximadamente 0.4 atmósferas de oxígeno puro, suficiente para respirar, pero mucho menor que la de la cabina. Por eso, antes de salir, los cosmonautas respiran oxígeno durante un tiempo para eliminar parte del nitrógeno de su sangre y evitar el mal de descompresión, el mismo problema que pueden sufrir los buzos." }
    ],
    fact: "Desde la caminata de Svetlana Savitskaya en 1984, muchas otras mujeres han trabajado fuera de una nave espacial. En octubre de 2019, las astronautas de la NASA Christina Koch y Jessica Meir realizaron la primera caminata espacial formada solo por mujeres, en la Estación Espacial Internacional, para reemplazar una pieza del sistema eléctrico de la estación.",
  },
  {
    id: "legado-de-savitskaya",
    bannerImage: '/assets/pioneros/infographic_m6/banner_legado-de-savitskaya.webp',
    bannerCaption: "Savitskaya acumuló unos 19 días y 17 horas en el espacio y recibió dos veces el título de Héroe de la Unión Soviética.",
    title: "Un legado que abrió caminos",
    color: '#6B6F8E',
    btnImage: '/assets/pioneros/infographic_m6/btn_legado-de-savitskaya.webp',
    image: '/assets/pioneros/infographic_m6/hero_legado-de-savitskaya.webp',
    content: [
      "Tras la Soyuz T-12 se planeó para Svetlana una tercera misión aún más ambiciosa: comandar una tripulación formada únicamente por mujeres que viajaría a la Salyut 7 en torno al Día Internacional de la Mujer. Sin embargo, la estación sufrió graves fallos técnicos en 1985 y los planes cambiaron. Además, Svetlana quedó embarazada y su hijo Konstantín nació en 1986. Aquella misión femenina nunca llegó a volar, pero demostraba hasta qué punto se confiaba en su capacidad de liderazgo.",
      "En sus dos vuelos, Savitskaya pasó en total unos 19 días y 17 horas en el espacio. Fue la segunda mujer en volar al espacio, la primera en hacerlo dos veces y la primera en realizar una caminata espacial. Por sus misiones recibió dos veces el título de Héroe de la Unión Soviética, la máxima distinción de su país, en 1982 y en 1984, además de otras condecoraciones. Su padre también había recibido ese título dos veces, algo que muy pocas familias en la historia pueden contar.",
      "Después de sus vuelos, Svetlana siguió trabajando en el sector espacial como ingeniera en NPO Energía, la gran empresa de diseño que construía las naves Soyuz y las estaciones espaciales soviéticas. Dejó oficialmente el cuerpo de cosmonautas en 1993. Más tarde se dedicó a la política y, a partir de 1996, fue elegida diputada de la Duma Estatal, el parlamento de Rusia, donde participó en temas relacionados con la defensa, la ciencia y la industria aeroespacial.",
      "Su ejemplo fue importante para muchas mujeres que soñaban con la ciencia y la exploración. Demostró que una mujer podía pilotar aviones supersónicos, vivir en una estación espacial y realizar trabajos técnicos difíciles en el vacío. Hoy las mujeres forman parte habitual de las tripulaciones de la Estación Espacial Internacional, han comandado misiones y han pasado largas temporadas en órbita, como la estadounidense Peggy Whitson, que acumuló más de 600 días en el espacio a lo largo de su carrera.",
      "La historia de Svetlana Savitskaya deja una lección valiosa: los grandes logros se construyen paso a paso. Primero fueron los saltos en paracaídas, después la acrobacia, luego los aviones de pruebas y, finalmente, las naves espaciales. Cada etapa le dio habilidades para la siguiente. Si sueñas con explorar el espacio, recuerda que estudiar ciencias, cuidar tu cuerpo, aprender de los errores y no rendirte ante los prejuicios forman parte del mismo viaje que la llevó hasta las estrellas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante décadas las cosmonautas soviéticas y rusas fueron muy pocas. Después de Tereshkova y Savitskaya pasaron diez años antes de que volara la siguiente: Yelena Kondakova viajó a la estación Mir en 1994 y vivió allí más de cinco meses. Más tarde, en 2014, Yelena Serova se convirtió en la primera cosmonauta rusa en formar parte de una tripulación de larga duración en la Estación Espacial Internacional." },
      { label: "Dato Científico", icon: "atom", text: "Las caminatas espaciales son esenciales para construir y mantener estaciones en órbita. La Estación Espacial Internacional se armó pieza por pieza en el espacio, y los astronautas han realizado cientos de salidas al exterior para conectar módulos, cambiar baterías o reparar equipos. Las pruebas de herramientas como la URI fueron pasos iniciales para aprender a trabajar con metales en el vacío, un desafío que todavía hoy se investiga." }
    ],
    fact: "Savitskaya fue la primera mujer en realizar una caminata espacial y también la primera en viajar al espacio dos veces. Años después, la estadounidense Eileen Collins se convirtió en la primera mujer en comandar una nave espacial, al dirigir el transbordador Columbia en 1999. Cada una de estas pioneras abrió una puerta que hoy permanece abierta para nuevas generaciones de exploradoras.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradPionerosM6)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#8A6F5A", "#6F7F8C", "#7A8B6E", "#8C7A9B", "#5E7A8A", "#9A7B5F", "#6B6F8E"];
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
          <linearGradient id="gradPionerosM6" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">SEGUNDA MUJER EN EL ESPACIO</text>
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
          layoutId="activeDotPionerosM6"
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
export default function InteractiveInfographic_PionerosM6() {
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
              🏆 Aviadora de récords y primera mujer en caminar por el espacio (1984)
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
