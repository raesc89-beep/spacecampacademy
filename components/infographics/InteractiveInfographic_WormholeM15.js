'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9FB3C8', style = {} }) {
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
  "Ehman, J. R. (2010). «The Big Ear Wow! Signal: What We Know and Don't Know About It After 33 Years». Big Ear Radio Observatory (bigear.org).",
  "Thorne, K. S. (2014). The Science of Interstellar. W. W. Norton.",
  "James, O., von Tunzelmann, E., Franklin, P., Thorne, K. S. (2015). «Visualizing Interstellar's Wormhole». American Journal of Physics, 83, 486–499.",
  "James, O., von Tunzelmann, E., Franklin, P., Thorne, K. S. (2015). «Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar». Classical and Quantum Gravity, 32, 065001.",
  "Sagan, C. (2006). The Varieties of Scientific Experience: A Personal View of the Search for God (ed. Ann Druyan). Penguin Press.",
  "Sagan, C. (1985). Contact. Nueva York: Simon & Schuster.",
  "Zemeckis, R. (director) (1997). Contact [película]. Warner Bros.",
  "NASA/JPL. «Mars Pathfinder: Carl Sagan Memorial Station» (1997). mars.nasa.gov."
];

const INFOGRAPHIC_NODES = [
  {
    id: "senal-wow-1977",
    bannerImage: '/assets/wormhole/infographic_m15/banner_senal-wow-1977.webp',
    bannerCaption: "El 15 de agosto de 1977, el radiotelescopio Big Ear de Ohio captó una señal de 72 segundos que Jerry Ehman marcó con un «Wow!».",
    title: "La Señal Wow! de 1977",
    color: '#5B7A8C',
    btnImage: '/assets/wormhole/infographic_m15/btn_senal-wow-1977.webp',
    image: '/assets/wormhole/infographic_m15/hero_senal-wow-1977.webp',
    content: [
      "En la novela y la película «Contacto», la humanidad recibe una señal de radio extraterrestre clara, intensa y repetida. En la vida real, la búsqueda ha sido mucho más difícil. El programa SETI, siglas en inglés de Búsqueda de Inteligencia Extraterrestre, lleva más de seis décadas escuchando el cielo con radiotelescopios. Se han registrado miles de señales curiosas, pero casi todas resultaron ser interferencias humanas, satélites o fenómenos naturales. Solo una se ha vuelto legendaria: la señal Wow!.",
      "El 15 de agosto de 1977, el radiotelescopio Big Ear de la Universidad Estatal de Ohio registró una señal muy intensa procedente de la constelación de Sagitario. Big Ear no se movía: usaba la rotación de la Tierra para barrer el cielo, de modo que cada punto pasaba por su campo de visión durante unos 72 segundos. La señal duró exactamente eso, aumentando y disminuyendo como se esperaría de una fuente que está fija en el cielo y no de una interferencia procedente de la Tierra.",
      "Unos días después, el astrónomo voluntario Jerry Ehman revisaba a mano las hojas impresas por la computadora del observatorio. Las intensidades se representaban con números y letras, y una secuencia destacaba muchísimo: 6EQUJ5. Ehman la rodeó con tinta roja y escribió al margen la palabra «Wow!». La señal era estrecha en frecuencia y estaba muy cerca de 1.420 megahercios, la frecuencia natural del hidrógeno, que muchos científicos consideraban un canal lógico para que otras civilizaciones se comunicaran.",
      "El problema es que la señal nunca volvió a aparecer. Ehman y otros astrónomos apuntaron a esa región decenas de veces en los años siguientes. Robert Gray la buscó con el Very Large Array y con otros radiotelescopios, sin resultados. En ciencia, una observación que no se repite no puede confirmarse, por muy emocionante que sea. Por eso la señal Wow! sigue siendo el candidato más famoso de SETI, pero no una prueba de vida extraterrestre. Su origen continúa siendo un misterio sin resolver.",
      "Se han propuesto explicaciones naturales. En 2017 se sugirió que podía deberse a un cometa, pero muchos radioastrónomos rechazaron la idea porque los cometas no emiten de esa forma. En 2024, un equipo dirigido por el astrobiólogo Abel Méndez, que revisó datos del observatorio de Arecibo, propuso que pudo tratarse de una nube fría de hidrógeno que brilló de repente al ser estimulada por una fuente intensa de radiación. Es una hipótesis interesante, pero todavía se está evaluando."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El radiotelescopio Big Ear, que captó la señal Wow!, ya no existe. Era una enorme estructura plana del tamaño de unos tres campos de fútbol, situada en Delaware, Ohio. En 1998 fue desmantelado y el terreno se usó para ampliar un campo de golf. La hoja impresa original con el famoso «Wow!» escrito por Jerry Ehman se conserva y se ha convertido en uno de los documentos más famosos de la historia de la búsqueda de vida extraterrestre." },
      { label: "Dato Científico", icon: "atom", text: "La frecuencia de 1.420 megahercios corresponde a una longitud de onda de unos 21 centímetros. Se produce cuando el electrón de un átomo de hidrógeno cambia la orientación de su giro respecto al protón. Como el hidrógeno es el elemento más abundante del universo, esta línea es fundamental para cartografiar la Vía Láctea. En 1959, Giuseppe Cocconi y Philip Morrison propusieron que sería un canal natural para buscar mensajes interestelares." },
      { label: "En la Película", icon: "zap", text: "En la película, Ellie Arroway capta la señal con el Very Large Array e inmediatamente hace lo que haría cualquier científico cuidadoso: descartar errores y pedir confirmación. Llama a colegas en Australia para que observen la misma región del cielo, y ellos también la detectan. Esa diferencia es clave. La señal de la película se repite y otros pueden verificarla; la señal Wow! real apareció una sola vez y nunca pudo confirmarse." }
    ],
    fact: "Dato Clave: la señal Wow!, captada por el radiotelescopio Big Ear el 15 de agosto de 1977, duró 72 segundos y estaba cerca de la frecuencia del hidrógeno, 1.420 megahercios. Es el candidato más famoso de señal extraterrestre detectado por SETI, pero nunca se repitió pese a decenas de búsquedas posteriores. Sin repetición no hay confirmación, por lo que su origen sigue siendo desconocido.",
  },
  {
    id: "maquina-vega-planos",
    bannerImage: '/assets/wormhole/infographic_m15/banner_maquina-vega-planos.webp',
    bannerCaption: "En «Contacto», los planos ocultos en la señal de Vega describen una máquina capaz de llevar a sus pasajeros a través de agujeros de gusano.",
    title: "La Máquina de Vega",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m15/btn_maquina-vega-planos.webp',
    image: '/assets/wormhole/infographic_m15/hero_maquina-vega-planos.webp',
    content: [
      "La capa más profunda del mensaje de Vega contiene los planos de una máquina. Al principio, los científicos no logran entenderlos, porque faltan instrucciones para leerlos. Finalmente descubren que las páginas deben combinarse en tres dimensiones, y que existe una especie de manual inicial que explica el lenguaje del mensaje. La máquina no se parece a ninguna nave espacial conocida: no tiene motores, ni combustible, ni ventanas. Nadie sabe con seguridad qué hará cuando se encienda, ni si los pasajeros sobrevivirán.",
      "En la novela de Sagan, el corazón de la máquina es un dodecaedro, una figura geométrica de doce caras, con cinco asientos en su interior. A su alrededor giran a gran velocidad tres enormes capas concéntricas. Se construyen varias máquinas en distintos países, y el viaje lo emprenden cinco científicos de diferentes nacionalidades. Sagan quiso mostrar que un descubrimiento así pertenecería a toda la humanidad, y que su construcción exigiría la cooperación de naciones que hasta entonces habían sido rivales.",
      "La construcción de la máquina provoca enormes debates. Algunos temen que sea un caballo de Troya, un arma disfrazada que destruirá la Tierra. Otros ven en ella una señal divina o, al contrario, una amenaza para sus creencias. Los gobiernos discuten quién controlará la tecnología y quién merece viajar. Sagan imaginó con gran realismo cómo reaccionaría una sociedad dividida ante un descubrimiento capaz de cambiarlo todo, y esa parte de la novela sigue resultando sorprendentemente actual.",
      "Desde el punto de vista de la física, la máquina es un dispositivo que conecta a sus pasajeros con un agujero de gusano. No viaja por el espacio en el sentido habitual: abre o se conecta a un atajo en el espacio-tiempo. Este detalle es coherente con lo que Thorne explicó a Sagan. Un túnel transitable necesitaría materia exótica y una ingeniería del espacio-tiempo muy por encima de nuestras capacidades. Por eso, en la historia, la tecnología no es humana: la humanidad solo sigue las instrucciones de una civilización avanzadísima.",
      "Al final, los viajeros descubren que la red de túneles no fue construida por quienes enviaron el mensaje, sino por una civilización todavía más antigua, desaparecida o retirada, cuyos restos de ingeniería siguen funcionando. Los seres de Vega solo mantienen el sistema y ayudan a especies jóvenes a dar sus primeros pasos. Esta idea, que la galaxia podría tener infraestructuras heredadas de civilizaciones muy antiguas, es una de las aportaciones más imaginativas de la novela y conecta con la paradoja de Fermi."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En la novela, los cinco viajeros representan a distintas regiones del mundo: Ellie Arroway, de Estados Unidos; un físico soviético; una médica india; un científico chino y un físico nigeriano. En la película, en cambio, el viaje lo realiza una sola persona, Ellie. Ese cambio simplificó la historia para el cine, pero también eliminó parte del mensaje original de Sagan sobre la cooperación internacional ante un descubrimiento que pertenece a toda la humanidad." },
      { label: "Dato Científico", icon: "atom", text: "El dodecaedro es uno de los cinco sólidos platónicos, las únicas figuras tridimensionales cuyas caras son polígonos regulares idénticos y en las que en cada vértice se juntan el mismo número de caras. Los otros son el tetraedro, el cubo, el octaedro y el icosaedro. El dodecaedro tiene 12 caras pentagonales, 20 vértices y 30 aristas. Los antiguos griegos ya lo estudiaron, y Platón lo relacionó con la forma del cosmos." },
      { label: "En la Película", icon: "zap", text: "En la película, la máquina es una estructura gigantesca con anillos que giran a enorme velocidad, y la pasajera viaja en una pequeña cápsula esférica que se deja caer por el centro. La primera máquina, construida en Cabo Cañaveral, es destruida por un fanático religioso durante una prueba. Más tarde se descubre que el millonario S. R. Hadden ha financiado en secreto una segunda máquina en Hokkaido, Japón, desde donde finalmente parte Ellie." }
    ],
    fact: "Dato Clave: en «Contacto», la máquina descrita en el mensaje de Vega no es una nave espacial con motores, sino un dispositivo que conecta a sus pasajeros con una red de agujeros de gusano. En la novela tiene un dodecaedro central con cinco asientos rodeado de tres capas giratorias; en la película, anillos colosales y una cápsula que cae por su centro. En ambos casos, la tecnología pertenece a civilizaciones mucho más avanzadas.",
  },
  {
    id: "viaje-tuneles-vega",
    bannerImage: '/assets/wormhole/infographic_m15/banner_viaje-tuneles-vega.webp',
    bannerCaption: "En «Contacto», la protagonista cruza unos 26 años luz hasta Vega en un tiempo muy breve atravesando una red de agujeros de gusano.",
    title: "El Viaje por los Túneles",
    color: '#6B7F5E',
    btnImage: '/assets/wormhole/infographic_m15/btn_viaje-tuneles-vega.webp',
    image: '/assets/wormhole/infographic_m15/hero_viaje-tuneles-vega.webp',
    content: [
      "Cuando la máquina se activa, la protagonista se precipita a través de una sucesión de túneles luminosos. Pasa junto a la estrella Vega y sus discos de material, atraviesa regiones cercanas al centro de la galaxia y contempla estructuras gigantescas. En apenas un rato cruza unos 26 años luz, una distancia que la luz tarda más de dos décadas en recorrer. Esa es precisamente la promesa de un agujero de gusano: no superar la velocidad de la luz, sino tomar un atajo que acorta enormemente el camino.",
      "La física de Morris y Thorne permite imaginar cómo sería un viaje así. En un agujero de gusano bien diseñado, las fuerzas de marea serían soportables para un cuerpo humano, sin el estiramiento que produciría un agujero negro. Desde dentro, el viajero vería la luz de ambos extremos curvada de forma extraña, como si mirara a través de una bola de cristal. En la entrada vería una imagen esférica del universo del otro lado. La experiencia sería, sin duda, profundamente desorientadora.",
      "Al llegar a su destino, Ellie aparece en una playa que reproduce un dibujo que ella misma hizo de niña de Pensacola, en Florida. Allí se encuentra con un ser que adopta la apariencia de su padre fallecido para facilitar la conversación. El ser le explica que los túneles forman una especie de red de transporte construida hace muchísimo tiempo por otros, y que este primer encuentro es solo un paso inicial. Luego la envía de vuelta a casa, con la promesa de que habrá más contactos en el futuro.",
      "La relación entre el tiempo dentro y fuera del túnel es uno de los aspectos más interesantes de la historia. En la película, el viaje parece durar horas para Ellie, mientras que los observadores en la Tierra solo ven que la cápsula cae directamente al agua bajo la máquina en apenas un instante. Desde fuera, parece que no ha pasado nada. En relatividad general, que dos observadores midan tiempos distintos no es una contradicción, aunque los detalles exactos dependerían de la geometría del túnel.",
      "Como en toda buena ciencia ficción, la historia mezcla ciencia real con especulación. La idea de que un agujero de gusano podría atravesarse sin morir procede directamente de cálculos publicados en revistas científicas. La existencia de redes de túneles, de seres capaces de construirlas o de materia exótica en grandes cantidades, en cambio, sigue siendo pura imaginación. Sagan quería que sus lectores disfrutaran del viaje, pero también que supieran distinguir lo que la física permite de lo que solo soñamos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las secuencias del viaje en la película se crearon con efectos digitales avanzados para 1997. El equipo de efectos visuales combinó imágenes de nebulosas, galaxias y estructuras inventadas con la actuación de Jodie Foster, que tuvo que reaccionar ante paisajes que no existían en el plató. El resultado ayudó a que el viaje por un agujero de gusano se convirtiera en una de las secuencias más memorables y comentadas de la película." },
      { label: "Dato Científico", icon: "atom", text: "Vega se encuentra a unos 25 años luz de la Tierra. Con la tecnología actual, la sonda más rápida que se aleja del sistema solar, la Voyager 1, tardaría más de 400.000 años en recorrer esa distancia. Un agujero de gusano, si existiera y pudiera atravesarse, podría convertir ese viaje en un trayecto de minutos u horas, porque la distancia a través de su garganta podría ser muchísimo más corta que la distancia por el espacio ordinario." },
      { label: "En la Película", icon: "zap", text: "Para los observadores en la Tierra, la cápsula de Ellie cae al agua en una fracción de segundo y parece que el experimento ha fracasado. Sin embargo, más tarde se descubre que la cámara que llevaba Ellie grabó unas 18 horas de ruido estático. Ese detalle, revelado al final, sugiere que algo ocurrió realmente durante su viaje. La película deja abierta la interpretación, pero ofrece una pista inquietante para el espectador atento." }
    ],
    fact: "Dato Clave: en «Contacto», Ellie Arroway cruza unos 26 años luz hasta Vega a través de una red de agujeros de gusano. La idea de que un humano podría atravesar un túnel así sin ser destruido por las fuerzas de marea procede de los cálculos de Morris y Thorne. La existencia real de redes de túneles y de la materia exótica necesaria para sostenerlos, en cambio, sigue siendo especulación.",
  },
  {
    id: "ciencia-y-fe-contacto",
    bannerImage: '/assets/wormhole/infographic_m15/banner_ciencia-y-fe-contacto.webp',
    bannerCaption: "En 1985, Sagan impartió las Conferencias Gifford en Glasgow sobre ciencia y religión, publicadas en 2006 por Ann Druyan.",
    title: "Ciencia, Fe y la Navaja de Ockham",
    color: '#8C7A5B',
    btnImage: '/assets/wormhole/infographic_m15/btn_ciencia-y-fe-contacto.webp',
    image: '/assets/wormhole/infographic_m15/hero_ciencia-y-fe-contacto.webp',
    content: [
      "Uno de los grandes temas de «Contacto» es la relación entre la ciencia y la fe. Ellie Arroway es una científica escéptica que solo acepta lo que puede comprobarse. Frente a ella aparece Palmer Joss, un pensador religioso que cree que la humanidad necesita algo más que datos para encontrar sentido. La historia no convierte a ninguno de los dos en villano. Ambos son personas honestas y respetuosas que buscan la verdad por caminos distintos, y aprenden a escucharse a pesar de sus diferencias.",
      "Carl Sagan reflexionó mucho sobre este tema. En 1985, el mismo año en que se publicó «Contacto», impartió en Glasgow las prestigiosas Conferencias Gifford, dedicadas a la relación entre ciencia y religión. Tras su muerte, Ann Druyan las editó en el libro «Las variedades de la experiencia científica», publicado en 2006. Sagan no se describía como ateo, sino como agnóstico: alguien que no afirma ni niega la existencia de Dios porque considera que no hay evidencias suficientes para decidir.",
      "En la película aparece una herramienta clásica del pensamiento científico: la navaja de Ockham. Este principio, atribuido al filósofo medieval Guillermo de Ockham, recomienda que, cuando dos explicaciones dan cuenta de los mismos hechos, conviene preferir la más sencilla, la que hace menos suposiciones. No garantiza que la explicación más simple sea la verdadera, pero es una guía útil para no complicar las cosas sin necesidad. Ellie la usa en una conversación con Palmer sobre la existencia de Dios.",
      "La gran ironía de la historia es que, al regresar de su viaje, Ellie se encuentra en la situación inversa. Ha vivido una experiencia que para ella es completamente real, pero no puede demostrarla. Las pruebas disponibles indican que la cápsula simplemente cayó. Aplicando la navaja de Ockham, la explicación más sencilla parecería ser que no ocurrió nada o que todo fue un engaño. La científica escéptica tiene que pedir a los demás que confíen en su palabra, como antes le pedían a ella.",
      "La novela termina de una forma distinta y muy original. Siguiendo una pista de los seres de Vega, Ellie analiza los dígitos del número pi, la relación entre la circunferencia y el diámetro de un círculo. Muy lejos tras la coma, escrito en base 11, encuentra un patrón de ceros y unos que forma la imagen de un círculo, como si alguien hubiera dejado una firma en las matemáticas del propio universo. Es ficción, pero refleja la fascinación de Sagan por el orden profundo del cosmos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las Conferencias Gifford se imparten en universidades escocesas desde 1888 gracias al legado de Adam Gifford, un juez de Edimburgo. Por ellas han pasado grandes pensadores, como el psicólogo William James, el físico Werner Heisenberg y el astrónomo Arthur Eddington. Sagan tituló sus conferencias «La búsqueda de quiénes somos», y en ellas habló de astronomía, evolución, vida extraterrestre y del lugar de la humanidad en el universo." },
      { label: "Dato Científico", icon: "atom", text: "El número pi es irracional, lo que significa que sus cifras decimales continúan para siempre sin repetirse en un patrón periódico. Hasta hoy se han calculado billones de dígitos con superordenadores. Muchos matemáticos sospechan que pi es un número normal, es decir, que cualquier secuencia de cifras aparece en él con la frecuencia esperada, pero esto todavía no se ha demostrado. Sagan aprovechó ese misterio para el final de su novela." },
      { label: "En la Película", icon: "zap", text: "En una escena famosa, Ellie explica a Palmer Joss que, según la navaja de Ockham, la explicación más simple es que Dios fue inventado por los humanos. Palmer le pregunta entonces si quería a su padre. Ella responde que sí, y él le pide que lo demuestre. Ellie no puede. Con ese intercambio, la película muestra que hay experiencias humanas difíciles de medir, sin ridiculizar ni a la ciencia ni a la fe." }
    ],
    fact: "Dato Clave: «Contacto» explora con respeto la tensión entre ciencia y fe a través de Ellie Arroway y Palmer Joss. Carl Sagan, que se consideraba agnóstico, reflexionó sobre estos temas en sus Conferencias Gifford de 1985, publicadas en 2006. La novela termina con un mensaje oculto en los dígitos de pi, una idea de ficción que expresa la fascinación de Sagan por el orden matemático del universo.",
  },
  {
    id: "de-contacto-a-interstellar",
    bannerImage: '/assets/wormhole/infographic_m15/banner_de-contacto-a-interstellar.webp',
    bannerCaption: "Kip Thorne fue productor ejecutivo y asesor científico de «Interstellar» (2014) y escribió el libro «La ciencia de Interstellar».",
    title: "De «Contacto» a «Interstellar»",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m15/btn_de-contacto-a-interstellar.webp',
    image: '/assets/wormhole/infographic_m15/hero_de-contacto-a-interstellar.webp',
    content: [
      "La influencia de Sagan y Thorne no terminó con «Contacto». En 1980, Carl Sagan organizó una cita a ciegas entre su amigo Kip Thorne y la productora de cine Lynda Obst, la misma que había trabajado con Sagan y Druyan en el primer argumento de «Contacto». La cita no terminó en romance, pero sí en una larga amistad. En 2006, Thorne y Obst desarrollaron juntos la idea de una película sobre agujeros negros, agujeros de gusano y viajes interestelares basada en ciencia real.",
      "Aquella idea se convirtió en «Interstellar», dirigida por Christopher Nolan y estrenada en 2014. Thorne fue productor ejecutivo y asesor científico, y puso dos condiciones: nada en la película debía violar leyes de la física firmemente establecidas, y todas las especulaciones debían surgir de la ciencia real y no de la imaginación sin límites de un guionista. En la historia, un grupo de astronautas atraviesa un agujero de gusano situado cerca de Saturno para buscar un nuevo hogar para la humanidad.",
      "Para representar el agujero de gusano y el agujero negro gigante llamado Gargantúa, el estudio de efectos visuales Double Negative trabajó con las ecuaciones que proporcionó Thorne. Crearon un programa que calculaba cómo se curvan los rayos de luz alrededor de esos objetos. El resultado fue muy diferente de los túneles de la ciencia ficción tradicional: el agujero de gusano aparece como una esfera que refleja de forma distorsionada las estrellas y galaxias del otro lado, como una bola de cristal colgada en el espacio.",
      "El trabajo fue tan riguroso que dio lugar a artículos científicos. En 2015, Oliver James, Eugénie von Tunzelmann, Paul Franklin y Kip Thorne publicaron un estudio sobre la visualización del agujero de gusano de la película en la revista American Journal of Physics, y otro sobre las lentes gravitacionales de agujeros negros en rotación en Classical and Quantum Gravity. «Interstellar» ganó en 2015 el Óscar a los mejores efectos visuales. Es un raro ejemplo de una película que contribuyó a la investigación científica.",
      "Ese mismo año del estreno, Thorne publicó el libro «La ciencia de Interstellar», en el que explica la física real detrás de cada elemento de la película. Para cada idea, el libro indica si se trata de una verdad establecida, una suposición razonable o una especulación. Habla de la dilatación del tiempo cerca de Gargantúa, de las ondas gravitacionales, de los agujeros de gusano y de la materia exótica. Es uno de los mejores puentes entre la física de vanguardia y el público general."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes de que Christopher Nolan se hiciera cargo de «Interstellar», el proyecto estuvo asociado durante varios años al director Steven Spielberg. El guion inicial fue escrito por Jonathan Nolan, hermano de Christopher, que pasó una temporada estudiando relatividad en el Instituto Tecnológico de California para comprender la ciencia que debía aparecer en la historia. Cuando Spielberg dejó el proyecto, Christopher Nolan asumió la dirección." },
      { label: "Dato Científico", icon: "atom", text: "Una de las ideas centrales de «Interstellar» es la dilatación gravitacional del tiempo: cerca de un objeto muy masivo, el tiempo transcurre más despacio. En la película, cada hora en el planeta de Miller, que orbita muy cerca de Gargantúa, equivale a siete años en la Tierra. Thorne explica en su libro que una diferencia tan extrema solo es posible si el agujero negro gira casi a la máxima velocidad permitida por la relatividad." },
      { label: "En la Película", icon: "zap", text: "Hay un actor que une «Contacto» con «Interstellar»: Matthew McConaughey. En «Contacto» interpretó a Palmer Joss, el pensador religioso que conversa con Ellie Arroway sobre ciencia y fe. Diecisiete años después, en «Interstellar», interpretó a Cooper, el piloto que atraviesa un agujero de gusano junto a Saturno. Así, el mismo actor participó en las dos grandes películas sobre agujeros de gusano vinculadas a Kip Thorne." }
    ],
    fact: "Dato Clave: «Interstellar» nació de una idea de Kip Thorne y Lynda Obst, a quienes Carl Sagan había presentado en 1980. Thorne fue productor ejecutivo y asesor científico de la película, que ganó el Óscar a los mejores efectos visuales. Sus visualizaciones dieron lugar a artículos científicos publicados en 2015, y Thorne explicó toda la física de la historia en su libro «La ciencia de Interstellar» (2014).",
  },
  {
    id: "cosmos-nueva-generacion",
    bannerImage: '/assets/wormhole/infographic_m15/banner_cosmos-nueva-generacion.webp',
    bannerCaption: "En 2014, Neil deGrasse Tyson presentó «Cosmos: una odisea en el espacio-tiempo», continuación de la serie de Sagan de 1980.",
    title: "«Cosmos» para una Nueva Generación",
    color: '#8C5E6B',
    btnImage: '/assets/wormhole/infographic_m15/btn_cosmos-nueva-generacion.webp',
    image: '/assets/wormhole/infographic_m15/hero_cosmos-nueva-generacion.webp',
    content: [
      "En 1975, un estudiante de secundaria del Bronx, en Nueva York, de 17 años, envió una solicitud a la Universidad Cornell expresando su pasión por la astronomía. Para su sorpresa, Carl Sagan en persona lo invitó a visitarlo en Ithaca. Le enseñó su laboratorio, le regaló un libro firmado y, como nevaba, se aseguró de que pudiera tomar el autobús de regreso. Aquel joven se llamaba Neil deGrasse Tyson. Años después contaría que ese día aprendió qué clase de científico quería ser: uno que ayuda a los demás.",
      "Tyson terminó estudiando en Harvard y se doctoró en astrofísica en la Universidad de Columbia. Desde 1996 dirige el Planetario Hayden del Museo Americano de Historia Natural de Nueva York. Como Sagan, combinó la investigación con una enorme labor divulgativa, escribiendo libros, apareciendo en programas de televisión y conduciendo un pódcast de ciencia. Se convirtió en uno de los astrofísicos más conocidos del mundo y en un heredero natural de la tradición de comunicación científica de Sagan.",
      "En 2014 se estrenó «Cosmos: una odisea en el espacio-tiempo», presentada por Tyson y emitida por las cadenas Fox y National Geographic. La serie fue escrita por Ann Druyan y Steven Soter, los mismos coautores de la serie original de 1980, y producida, entre otros, por Druyan y por el creador de series animadas Seth MacFarlane. Con efectos visuales modernos, recuperó la nave de la imaginación y el Calendario Cósmico, y actualizó la ciencia con descubrimientos de las tres décadas anteriores.",
      "En el primer episodio, Tyson rinde homenaje a Sagan de una forma muy emotiva. Muestra la agenda personal de Sagan con la anotación de su visita en 1975 y cuenta la historia de aquel día de nieve en Ithaca. Después, en 2020, se estrenó una tercera temporada titulada «Cosmos: mundos posibles», también presentada por Tyson y escrita por Ann Druyan, que exploraba el pasado de la ciencia y los futuros que la humanidad podría construir si actúa con sabiduría.",
      "La continuidad de «Cosmos» muestra algo importante sobre la ciencia: es una cadena de personas que se inspiran unas a otras. Sagan aprendió de sus maestros, inspiró a Tyson, y Tyson ha inspirado a millones de jóvenes que quizá serán los científicos del futuro. La divulgación científica no es un adorno de la investigación, sino una parte esencial de ella. Sin comunicadores, ideas como los agujeros de gusano se quedarían encerradas en artículos que solo unos pocos especialistas pueden leer."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Neil deGrasse Tyson fue uno de los protagonistas del debate de 2006 sobre Plutón. Unos años antes, en el año 2000, el Planetario Hayden que dirige presentó una exposición en la que Plutón no aparecía junto a los ocho planetas principales, sino entre los objetos helados del cinturón de Kuiper. La decisión causó polémica, y en 2006 la Unión Astronómica Internacional reclasificó a Plutón como planeta enano." },
      { label: "Dato Científico", icon: "atom", text: "Entre la «Cosmos» de 1980 y la de 2014 la astronomía cambió enormemente. Se descubrieron los primeros planetas alrededor de otras estrellas, a partir de 1995, se demostró que la expansión del universo se acelera, gracias a observaciones de supernovas publicadas en 1998, y se midió con precisión la edad del universo, unos 13.800 millones de años. La nueva serie incorporó todos estos descubrimientos que Sagan no llegó a conocer." },
      { label: "En la Película", icon: "zap", text: "La película «Contacto» presta mucha atención al papel de los medios de comunicación en un gran descubrimiento científico. Varios periodistas reales de la cadena CNN, como Larry King y Bernard Shaw, aparecen interpretándose a sí mismos, y se utilizaron imágenes reales del presidente Bill Clinton, lo que generó cierta polémica. Así, la película muestra cómo la sociedad entera se informaría y opinaría sobre un hallazgo científico histórico." }
    ],
    fact: "Dato Clave: en 2014, Neil deGrasse Tyson presentó «Cosmos: una odisea en el espacio-tiempo», continuación de la serie de Carl Sagan, escrita por Ann Druyan y Steven Soter. Tyson había conocido a Sagan en 1975, cuando tenía 17 años y el astrónomo lo invitó a visitarlo en Cornell. En 2020 llegó una nueva temporada, «Cosmos: mundos posibles», que prolongó el legado divulgativo de Sagan.",
  },
  {
    id: "legado-imaginacion-razon",
    bannerImage: '/assets/wormhole/infographic_m15/banner_legado-imaginacion-razon.webp',
    bannerCaption: "En 1997, la NASA rebautizó el módulo de aterrizaje de Mars Pathfinder como Estación Conmemorativa Carl Sagan.",
    title: "Imaginación Guiada por la Razón",
    color: '#6E5B8C',
    btnImage: '/assets/wormhole/infographic_m15/btn_legado-imaginacion-razon.webp',
    image: '/assets/wormhole/infographic_m15/hero_legado-imaginacion-razon.webp',
    content: [
      "El 4 de julio de 1997, la sonda Mars Pathfinder aterrizó en Marte llevando consigo el pequeño explorador Sojourner, el primer vehículo con ruedas que recorrió otro planeta. La NASA decidió rebautizar el módulo de aterrizaje como Estación Conmemorativa Carl Sagan, en homenaje al científico que tanto había hecho por la exploración marciana. Además, el asteroide 2709 Sagan lleva su nombre, y en la Universidad Cornell se fundó en 2015 el Instituto Carl Sagan, dedicado a buscar vida en otros mundos.",
      "En 1980, Sagan fundó también, junto a Bruce Murray y Louis Friedman, la Sociedad Planetaria, una organización que reúne a ciudadanos de todo el mundo interesados en la exploración espacial. Hoy es una de las asociaciones espaciales más grandes del mundo. Uno de sus proyectos más destacados fue LightSail 2, una pequeña nave lanzada en 2019 que demostró que una vela solar puede elevar la órbita de un satélite usando solo la presión de la luz del Sol, una idea que Sagan defendió durante décadas.",
      "La historia de los agujeros de gusano es también una historia de personas conectadas por la curiosidad. Albert Einstein y Nathan Rosen describieron en 1935 el primer puente en el espacio-tiempo. John Wheeler acuñó en 1957 la palabra agujero de gusano. Kip Thorne, que fue estudiante de doctorado de Wheeler en Princeton, demostró en los años ochenta cómo podría atravesarse uno. Y Carl Sagan, con una sencilla pregunta para su novela, dio el impulso para que esa investigación comenzara. Tú eres el siguiente eslabón.",
      "Los agujeros de gusano pueden existir o no; todavía no lo sabemos. Pero el camino recorrido para estudiarlos es un ejemplo perfecto de cómo funciona la ciencia. Primero alguien imagina una posibilidad. Después se formula con matemáticas rigurosas y se comprueba si respeta las leyes conocidas. Luego se diseñan experimentos y observaciones para buscar pruebas. Por último, los resultados se comparten, se debaten y se corrigen. Es la imaginación guiada por la razón, restringida por la evidencia y compartida con la humanidad.",
      "Quizás en el futuro, cuando los seres humanos hayan llegado a otras estrellas, por agujeros de gusano o por otros medios que hoy ni imaginamos, mirarán atrás a esta época en la que empezamos a soñar cómo hacerlo. Verán a Einstein, Wheeler, Thorne y Sagan como los primeros exploradores de un universo que, con suerte, aprenderemos a cruzar. Sagan escribió que somos una forma que tiene el cosmos de conocerse a sí mismo. Cada vez que alguien aprende sobre el universo, esa frase se vuelve un poco más verdadera."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Sociedad Planetaria cuenta entre sus miembros y colaboradores con científicos, ingenieros y divulgadores de todo el mundo. Desde 2010, su director ejecutivo es Bill Nye, conocido por su programa de televisión de ciencia para niños. Nye fue alumno de Carl Sagan en la Universidad Cornell, donde asistió a sus clases de astronomía. Una vez más, la cadena de inspiración que empezó con Sagan sigue extendiéndose a nuevas generaciones." },
      { label: "Dato Científico", icon: "atom", text: "Una vela solar funciona porque la luz, aunque no tiene masa, transporta impulso. Cuando los fotones del Sol rebotan en una lámina muy fina y reflectante, la empujan suavemente. El empuje es diminuto, pero constante, y en el vacío del espacio no hay rozamiento que lo frene. LightSail 2 usaba una vela de unos 32 metros cuadrados, más o menos el tamaño de un cuadrilátero de boxeo, y demostró que este método puede modificar la órbita de una nave." },
      { label: "En la Película", icon: "zap", text: "La película «Contacto» se estrenó el 11 de julio de 1997, unos siete meses después de la muerte de Carl Sagan, y una semana después de que la sonda Mars Pathfinder aterrizara en Marte. Al final de los créditos aparece una dedicatoria sencilla: «Para Carl». Ann Druyan, su esposa y coautora del argumento original, participó como productora. Así, la película se convirtió también en un homenaje al hombre que la había imaginado." }
    ],
    fact: "Dato Clave: el legado de Carl Sagan vive en la Estación Conmemorativa Carl Sagan en Marte, en el asteroide 2709 Sagan, en el Instituto Carl Sagan de Cornell y en la Sociedad Planetaria que fundó en 1980. Su mayor herencia, sin embargo, es una forma de pensar: la imaginación guiada por la razón, restringida por la evidencia y compartida con la humanidad, el mismo método que ha guiado la física de los agujeros de gusano.",
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
      hue: Math.random() > 0.5 ? '159,179,200' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(159,179,200,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM15)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#7A6C8F", "#6B7F5E", "#8C7A5B", "#4F6D7A", "#8C5E6B", "#6E5B8C"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9FB3C8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9FB3C8" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradWormholeM15" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE UNA SEÑAL A LAS ESTRELLAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(159,179,200,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">AGUJEROS DE GUSANO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(159,179,200,0.2)'}`,
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
          layoutId="activeDotWormholeM15"
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
      border: '1px solid rgba(159,179,200,0.15)',
    }}>
      <Star size={14} style={{ color: '#9FB3C8', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9FB3C8, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(159,179,200,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9FB3C8', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_WormholeM15() {
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
      border: '1px solid rgba(159,179,200,0.12)',
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
            textAlign: 'center', color: 'rgba(159,179,200,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(159,179,200,0.08)', borderRadius: '16px',
              border: '1px solid rgba(159,179,200,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9FB3C8', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 La señal Wow!, la máquina de Vega, Interstellar y el legado de Sagan
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
