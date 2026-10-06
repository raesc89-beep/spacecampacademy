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
  "Morris, M. S., & Thorne, K. S. (1988). Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity. American Journal of Physics, 56(5), 395-412.",
  "Abbott, B. P., et al. (LIGO Scientific Collaboration and Virgo Collaboration) (2016). Observation of Gravitational Waves from a Binary Black Hole Merger. Physical Review Letters, 116(6), 061102.",
  "Maldacena, J., & Susskind, L. (2013). Cool horizons for entangled black holes. Fortschritte der Physik, 61(9), 781-811.",
  "Einstein, A., Podolsky, B., & Rosen, N. (1935). Can Quantum-Mechanical Description of Physical Reality Be Considered Complete? Physical Review, 47(10), 777-780.",
  "Anglada-Escudé, G., et al. (2016). A terrestrial planet candidate in a temperate orbit around Proxima Centauri. Nature, 536, 437-440.",
  "Alcubierre, M. (1994). The warp drive: hyper-fast travel within general relativity. Classical and Quantum Gravity, 11(5), L73-L77.",
  "Ellis, H. G. (1973). Ether flow through a drainhole: A particle model in general relativity. Journal of Mathematical Physics, 14(1), 104-118.",
  "James, O., von Tunzelmann, E., Franklin, P., & Thorne, K. S. (2015). Visualizing Interstellar's Wormhole. American Journal of Physics, 83(6), 486-499.",
  "Jafferis, D., et al. (2022). Traversable wormhole dynamics on a quantum processor. Nature, 612, 51-55.",
  "Thorne, K. S. (2014). The Science of Interstellar. W. W. Norton & Company."
];

const INFOGRAPHIC_NODES = [
  {
    id: "limite-velocidad-luz",
    bannerImage: '/assets/wormhole/infographic_m2/banner_limite-velocidad-luz.webp',
    bannerCaption: "La luz viaja en el vacío a 299,792.458 km/s; un año luz es la distancia que recorre en un año: unos 9.46 billones de km.",
    title: "El límite de velocidad del universo",
    color: '#5A6B7D',
    btnImage: '/assets/wormhole/infographic_m2/btn_limite-velocidad-luz.webp',
    image: '/assets/wormhole/infographic_m2/hero_limite-velocidad-luz.webp',
    content: [
      "Nuestro universo tiene un límite de velocidad. En 1905, Albert Einstein publicó la relatividad especial, una teoría que parte de una idea sorprendente: la velocidad de la luz en el vacío es la misma para todos los observadores, sin importar cómo se muevan. Ese valor es de exactamente 299,792.458 kilómetros por segundo. A esa velocidad, un rayo de luz podría dar más de siete vueltas a la Tierra en un solo segundo. Nada que tenga masa puede alcanzarla, y ninguna señal puede superarla.",
      "¿Por qué no podemos ir más rápido? Según la relatividad especial, cuanto más rápido se mueve un objeto, más energía hace falta para acelerarlo un poco más. Cerca de la velocidad de la luz, esa energía crece sin límite: para alcanzarla exactamente se necesitaría una cantidad infinita. En el Gran Colisionador de Hadrones del CERN, los protones llegan a moverse a más del 99.999999 % de la velocidad de la luz, pero nunca la alcanzan. Las partículas sin masa, como los fotones de la luz, son las únicas que viajan siempre a esa velocidad.",
      "Las distancias en el espacio son tan grandes que los kilómetros se quedan cortos. Por eso los astrónomos usan el año luz, que a pesar de su nombre no mide tiempo, sino distancia: es lo que recorre la luz en un año, unos 9.46 billones de kilómetros. Escrito con todos sus ceros, son 9,460,000,000,000 kilómetros. Para comparar, la luz del Sol tarda unos 8 minutos y 20 segundos en llegar a la Tierra, y la de la Luna, poco más de un segundo. Decimos entonces que el Sol está a unos 8 minutos luz de nosotros.",
      "Mirar lejos es mirar al pasado. Como la luz necesita tiempo para viajar, cuando observamos una estrella la vemos tal como era cuando esa luz salió de ella. La galaxia de Andrómeda, la gran galaxia más cercana a la nuestra, está a unos 2.5 millones de años luz: la luz que vemos esta noche partió cuando los primeros miembros del género humano, Homo, vivían en África. Nuestra propia galaxia, la Vía Láctea, mide unos 100,000 años luz de un extremo al otro, una distancia imposible de recorrer en una vida humana.",
      "Aquí aparece la gran pregunta de este módulo. Si nada puede superar la velocidad de la luz y las estrellas están tan lejos, ¿estamos condenados a no salir nunca de nuestro vecindario cósmico? La relatividad general ofrece una posible salida teórica: el límite de velocidad se aplica a lo que se mueve dentro del espacio-tiempo, pero no impide que el propio espacio-tiempo tenga formas extrañas. Un agujero de gusano sería una de esas formas. Otra, propuesta en 1994 por el físico mexicano Miguel Alcubierre, es la llamada burbuja o motor de curvatura."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La primera medición de la velocidad de la luz la hizo el astrónomo danés Ole Rømer en 1676. Observando Ío, una luna de Júpiter, notó que sus eclipses se adelantaban cuando la Tierra estaba más cerca de Júpiter y se retrasaban cuando estaba más lejos. Concluyó que la luz tardaba varios minutos en cruzar la órbita terrestre. Su estimación no era exacta, pero demostró por primera vez que la luz no llega de forma instantánea." },
      { label: "Dato Científico", icon: "atom", text: "Desde 1983, el metro se define a partir de la luz: es la distancia que recorre la luz en el vacío en 1/299,792,458 de segundo. Por eso la velocidad de la luz tiene hoy un valor exacto, sin incertidumbre. Los astrónomos también usan el pársec, que equivale a unos 3.26 años luz, y la unidad astronómica, la distancia media entre la Tierra y el Sol, de unos 150 millones de kilómetros." }
    ],
    fact: "En la relatividad especial, la velocidad de la luz no es solo la rapidez de los fotones: es la velocidad máxima a la que puede viajar cualquier causa o información. Si algo enviara mensajes más rápido que la luz, para algunos observadores el mensaje llegaría antes de ser enviado, lo que rompería el orden entre causa y efecto. Por eso los físicos se toman tan en serio este límite y examinan con lupa cualquier idea que parezca saltárselo.",
  },
  {
    id: "proxima-centauri-distancias",
    bannerImage: '/assets/wormhole/infographic_m2/banner_proxima-centauri-distancias.webp',
    bannerCaption: "Próxima Centauri, la estrella más cercana al Sol, está a unos 4.24 años luz: su luz tarda más de cuatro años en llegarnos.",
    title: "Próxima Centauri: la vecina más cercana",
    color: '#7D6A5A',
    btnImage: '/assets/wormhole/infographic_m2/btn_proxima-centauri-distancias.webp',
    image: '/assets/wormhole/infographic_m2/hero_proxima-centauri-distancias.webp',
    content: [
      "Después del Sol, la estrella más cercana a la Tierra es Próxima Centauri. Está a unos 4.24 años luz, es decir, alrededor de 40 billones de kilómetros. Eso significa que la luz que sale de ella hoy no llegará a nuestros ojos hasta dentro de más de cuatro años. Fue descubierta en 1915 por el astrónomo escocés Robert Innes, que trabajaba en un observatorio de Johannesburgo, en Sudáfrica. Su nombre viene del latín proxima, que significa «la más cercana».",
      "Próxima Centauri es una enana roja: una estrella pequeña y fría, con apenas un 12 % de la masa del Sol. Es tan tenue que no puede verse a simple vista, aunque esté tan cerca. Forma parte de un sistema de tres estrellas junto con Alfa Centauri A y Alfa Centauri B, dos estrellas parecidas al Sol situadas a unos 4.37 años luz, que desde el hemisferio sur se ven como uno de los puntos más brillantes del cielo nocturno. Próxima gira alrededor de ellas en una órbita enorme que tarda cientos de miles de años en completarse.",
      "En 2016, un equipo internacional dirigido por el astrónomo español Guillem Anglada-Escudé anunció el descubrimiento de un planeta alrededor de Próxima Centauri, llamado Próxima b. Tiene una masa algo mayor que la de la Tierra y da una vuelta a su estrella en solo 11.2 días. Está en la llamada zona habitable, la región donde la temperatura podría permitir agua líquida en la superficie. Sin embargo, las enanas rojas lanzan fuertes llamaradas de radiación, así que nadie sabe todavía si ese planeta podría albergar vida.",
      "¿Cuánto tardaríamos en llegar? La sonda Voyager 1, lanzada en 1977, viaja a unos 17 kilómetros por segundo y es el objeto humano que más lejos ha llegado. A esa velocidad necesitaría más de 70,000 años para recorrer la distancia hasta Próxima Centauri. La sonda Parker Solar Probe alcanzó en diciembre de 2024 unos 690,000 kilómetros por hora al pasar cerca del Sol, la mayor velocidad lograda por una nave; aun así, a ese ritmo el viaje duraría más de 6,000 años, más que toda la historia escrita de la humanidad.",
      "Existen proyectos para acortar ese viaje. En 2016 se presentó la iniciativa Breakthrough Starshot, que propone enviar diminutas naves de pocos gramos impulsadas por velas de luz y por láseres muy potentes instalados en la Tierra. Si llegaran a alcanzar el 20 % de la velocidad de la luz, podrían llegar a Alfa Centauri en unos 20 años. Aun así, se trata de sondas minúsculas, no de naves con personas. Por eso los agujeros de gusano resultan tan atractivos en la imaginación científica: prometen saltarse distancias que de otro modo serían casi imposibles."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Desde el hemisferio sur, Alfa Centauri aparece a simple vista como una sola estrella muy brillante, la tercera más brillante del cielo nocturno después de Sirio y Canopus. Con un pequeño telescopio se separa en dos estrellas, A y B, que giran una alrededor de la otra cada unos 80 años. Próxima, en cambio, solo puede verse con telescopio, y en el cielo aparece a unos dos grados de distancia de sus compañeras." },
      { label: "Dato Científico", icon: "atom", text: "Para medir la distancia a las estrellas cercanas se usa la paralaje: al observar una estrella desde lados opuestos de la órbita terrestre, con seis meses de diferencia, parece moverse un poquito respecto a las estrellas de fondo. Cuanto menor es ese movimiento, más lejos está. La paralaje de Próxima Centauri es de unos 0.77 segundos de arco, la mayor de todas las estrellas, precisamente porque es la más cercana." }
    ],
    fact: "Si el Sol fuera del tamaño de una naranja de 10 centímetros, la Tierra sería un granito de arena de un milímetro situado a unos 10 metros de ella, y Próxima Centauri estaría a unos 2,800 kilómetros, más o menos la distancia por carretera entre la Ciudad de México y Tijuana. Entre medio no habría prácticamente nada. Así de vacío y enorme es el espacio entre las estrellas, y por eso los viajes interestelares son un desafío tan grande.",
  },
  {
    id: "atajo-sin-romper-reglas",
    bannerImage: '/assets/wormhole/infographic_m2/banner_atajo-sin-romper-reglas.webp',
    bannerCaption: "En un agujero de gusano el viajero nunca supera localmente la velocidad de la luz: lo que cambia es la longitud del camino.",
    title: "Un atajo sin romper las reglas",
    color: '#6B7D5A',
    btnImage: '/assets/wormhole/infographic_m2/btn_atajo-sin-romper-reglas.webp',
    image: '/assets/wormhole/infographic_m2/hero_atajo-sin-romper-reglas.webp',
    content: [
      "¿Cómo podría un agujero de gusano llevarnos a Próxima Centauri sin romper el límite de la luz? La clave está en distinguir dos cosas: la velocidad a la que te mueves y la distancia que recorres. La relatividad dice que, en cualquier lugar, si comparas tu movimiento con un rayo de luz que pasa junto a ti, siempre vas más despacio que él. Pero no dice nada sobre cuál debe ser el camino más corto entre dos puntos del universo. Eso depende de la forma del espacio-tiempo.",
      "Imagina que dos ciudades están separadas por una montaña. Por la carretera que la rodea hay 200 kilómetros, pero un túnel que la atraviesa solo mide 20. Un coche que use el túnel llega antes sin necesidad de ir más rápido: simplemente recorre menos distancia. Con un agujero de gusano ocurriría algo parecido. La luz que viajara por el espacio normal tardaría 4.24 años en ir de la Tierra a Próxima Centauri, pero un viajero que cruzara un túnel corto podría llegar mucho antes, sin superar nunca la velocidad de un rayo de luz que viajara a su lado.",
      "A menudo se dibuja el agujero de gusano como un tubo que sale de nuestro universo y atraviesa una dimensión extra, un «hiperespacio». Es un recurso para dibujar, no una exigencia de la teoría. En relatividad general la forma del espacio-tiempo se describe desde dentro, con la métrica, sin necesidad de ningún espacio exterior en el que esté sumergido. Una hormiga sobre un balón podría descubrir que vive en una esfera midiendo los ángulos de triángulos enormes, sin salir nunca de ella. Del mismo modo, un agujero de gusano no requiere dimensiones adicionales.",
      "Los agujeros de gusano tampoco son la única idea teórica que permitiría viajes rápidos entre estrellas. En 1994, Miguel Alcubierre, entonces estudiante de doctorado en la Universidad de Gales, en Cardiff, describió una burbuja de espacio-tiempo que se contrae delante de una nave y se expande detrás de ella. La nave, en reposo dentro de la burbuja, sería transportada como un surfista sobre una ola. Igual que el agujero de gusano atravesable, esta solución exige energía negativa en enormes cantidades, y por eso hoy se considera un ejercicio teórico, no un proyecto de ingeniería.",
      "¿De dónde saldría un agujero de gusano natural? Una hipótesis es que podrían haberse formado en los primeros instantes del universo, justo después del Big Bang, cuando la densidad de energía era altísima y el espacio-tiempo pudo tener formas muy retorcidas. Otra posibilidad sería que una civilización muy avanzada lograra construir uno. Ninguna de las dos ideas tiene apoyo observacional. Hasta hoy, todos los agujeros de gusano viven en las ecuaciones y en las pizarras de los físicos, y la búsqueda de pruebas en el cielo no ha encontrado ninguno."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La idea de plegar el espacio para viajar rápido apareció en la ficción antes que en las revistas de física. La novela «Una arruga en el tiempo», de Madeleine L'Engle, publicada en 1962, llamaba «teseracto» a un pliegue del espacio que permitía saltar entre planetas. Y el término inglés «warp», curvatura, se hizo famoso con la serie Star Trek desde 1966. Alcubierre ha contado que esa serie fue una de sus inspiraciones." },
      { label: "Dato Científico", icon: "atom", text: "Los físicos usan un dibujo llamado cono de luz para representar lo que es posible alcanzar. Desde un suceso, como el instante en que enciendes una linterna, la luz se expande formando un cono hacia el futuro, y todo lo que podrás influir más adelante está dentro de ese cono. En un espacio-tiempo curvo los conos se inclinan y se deforman, y un agujero de gusano conectaría los conos de lugares muy lejanos entre sí." }
    ],
    fact: "El cálculo de Alcubierre llevó a otros físicos a estimar cuánta energía negativa haría falta para su burbuja. Las primeras estimaciones, de 1997, daban cantidades enormemente mayores que toda la masa del universo visible. Dos años después, el físico belga Chris Van Den Broeck logró reducir muchísimo esa cifra cambiando la forma de la burbuja, pero aun así seguía siendo del orden de unas pocas masas solares de energía negativa, algo que nadie sabe producir.",
  },
  {
    id: "metrica-morris-thorne-1988",
    bannerImage: '/assets/wormhole/infographic_m2/banner_metrica-morris-thorne-1988.webp',
    bannerCaption: "En 1988 Michael Morris y Kip Thorne publicaron la primera descripción detallada de un agujero de gusano atravesable por personas.",
    title: "1988: la métrica de Morris-Thorne",
    color: '#6A5A7D',
    btnImage: '/assets/wormhole/infographic_m2/btn_metrica-morris-thorne-1988.webp',
    image: '/assets/wormhole/infographic_m2/hero_metrica-morris-thorne-1988.webp',
    content: [
      "La historia del agujero de gusano atravesable empieza con una novela. En 1985, el astrónomo Carl Sagan estaba terminando «Contacto», un libro en el que la científica Ellie Arroway viaja hasta la estrella Vega. Sagan había pensado usar un agujero negro como atajo, pero quería que la ciencia fuera lo más correcta posible, así que envió el manuscrito a su amigo Kip Thorne, del Instituto Tecnológico de California, Caltech. Thorne sabía que un agujero negro no sirve como puerta y se propuso averiguar qué haría falta realmente.",
      "Thorne trabajó en el problema junto con su estudiante de doctorado Michael Morris. En lugar de partir de una estrella y ver qué forma tomaba el espacio-tiempo, hicieron el camino al revés: primero eligieron la forma del agujero de gusano que querían, uno que se pudiera cruzar con seguridad, y luego usaron las ecuaciones de Einstein para calcular qué tipo de materia y energía haría falta para producirla. En 1988 publicaron el resultado en la revista American Journal of Physics, dirigida a profesores, como herramienta para enseñar relatividad general.",
      "Morris y Thorne se impusieron una lista de condiciones para que el túnel fuera útil a seres humanos. No debía tener horizonte de sucesos, para que el viajero pudiera salir por la otra boca. Las fuerzas de marea debían ser soportables, comparables a la gravedad que sentimos en la Tierra. La aceleración durante el viaje tampoco debía superar la de la gravedad terrestre, y el trayecto debía durar un tiempo razonable para una vida humana. Además, el agujero de gusano debía mantenerse estable el tiempo suficiente para cruzarlo.",
      "La métrica de Morris-Thorne describe el agujero de gusano con dos funciones sencillas. La función de forma indica cómo cambia el tamaño del túnel desde la garganta hacia fuera, y la función de corrimiento al rojo indica cómo cambia el ritmo del tiempo en cada punto. Si esta segunda función nunca se vuelve infinita, no hay horizonte y el viaje es posible. El precio aparece en la garganta: para que el túnel se ensanche hacia ambas bocas, la materia que lo sostiene debe tener propiedades exóticas, con una tensión mayor que su densidad de energía.",
      "Morris y Thorne no fueron los primeros en encontrar soluciones de este tipo. En 1973, Homer Ellis en Estados Unidos y Kirill Bronnikov en la Unión Soviética describieron, de forma independiente, túneles que no tenían horizonte. Lo novedoso del trabajo de 1988 fue analizar con detalle si una persona podría usarlos para viajar y qué exigiría. Ese mismo año, Thorne publicó con Morris y Ulvi Yurtsever otro artículo que mostraba algo inquietante: si una boca se moviera respecto a la otra, el agujero de gusano podría convertirse en una máquina del tiempo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La novela «Contacto» de Carl Sagan se publicó en 1985 y en 1997 se estrenó la película del mismo nombre, protagonizada por Jodie Foster. En la historia, la protagonista recorre una red de túneles en una máquina construida con planos recibidos en un mensaje de radio desde Vega. Gracias a aquella consulta entre amigos, una obra de ficción terminó impulsando una línea de investigación científica real que continúa hasta hoy." },
      { label: "Dato Científico", icon: "atom", text: "La métrica de Morris-Thorne es estática y esféricamente simétrica: no cambia con el tiempo y se ve igual en todas las direcciones desde el centro. Son simplificaciones para que los cálculos sean manejables, como cuando en la física escolar se supone que no hay rozamiento. Modelos posteriores han estudiado agujeros de gusano que giran, que cambian con el tiempo o que tienen formas menos simétricas, y todos siguen necesitando materia exótica." }
    ],
    fact: "El artículo de Morris y Thorne tenía un título muy largo: «Agujeros de gusano en el espacio-tiempo y su uso para el viaje interestelar: una herramienta para enseñar relatividad general». Thorne ha contado que eligieron una revista dedicada a la enseñanza para presentar el trabajo como un ejercicio de física y no como una promesa de viajes a las estrellas. Hoy es uno de los artículos más citados sobre agujeros de gusano.",
  },
  {
    id: "kip-thorne-interstellar",
    bannerImage: '/assets/wormhole/infographic_m2/banner_kip-thorne-interstellar.webp',
    bannerCaption: "Kip Thorne compartió el Premio Nobel de Física 2017 con Rainer Weiss y Barry Barish por su papel decisivo en el detector LIGO.",
    title: "Kip Thorne: del Nobel a «Interstellar»",
    color: '#7D5A6B',
    btnImage: '/assets/wormhole/infographic_m2/btn_kip-thorne-interstellar.webp',
    image: '/assets/wormhole/infographic_m2/hero_kip-thorne-interstellar.webp',
    content: [
      "Kip Stephen Thorne nació en 1940 en Logan, Utah, en Estados Unidos. Estudió en Caltech y se doctoró en la Universidad de Princeton en 1965 bajo la dirección de John Wheeler, el mismo físico que había bautizado los agujeros de gusano. Luego regresó a Caltech, donde trabajó durante décadas y formó a muchos de los especialistas actuales en relatividad. En 1973 publicó junto con Charles Misner y el propio Wheeler el libro «Gravitation», un enorme manual de unas 1,300 páginas que todavía estudian los físicos.",
      "El gran proyecto de su vida fue detectar ondas gravitacionales. En 1984, Thorne, Rainer Weiss, del Instituto Tecnológico de Massachusetts, y Ronald Drever, de Caltech, impulsaron la creación de LIGO, el Observatorio de Ondas Gravitacionales por Interferometría Láser. Durante años muchos dudaron de que fuera posible medir algo tan pequeño. A partir de 1994, el físico Barry Barish dirigió el proyecto y lo convirtió en una gran colaboración internacional. La primera detección, en 2015, demostró que la apuesta había valido la pena.",
      "En 2017, la Real Academia Sueca de Ciencias otorgó el Premio Nobel de Física a Rainer Weiss, Barry Barish y Kip Thorne por sus contribuciones decisivas al detector LIGO y a la observación de ondas gravitacionales. La mitad del premio fue para Weiss y la otra mitad se repartió entre Barish y Thorne. Ronald Drever no pudo recibirlo porque había fallecido en marzo de ese mismo año, y el Nobel no se concede de forma póstuma. Thorne ha insistido en que el logro pertenece a los más de mil científicos de la colaboración.",
      "Thorne también es famoso por el cine. A partir de una idea que desarrolló con la productora Lynda Obst, colaboró como asesor científico y productor ejecutivo de «Interstellar», la película dirigida por Christopher Nolan y estrenada en 2014. En ella, un agujero de gusano aparece cerca de Saturno y permite a los astronautas llegar a otra galaxia, donde orbitan un agujero negro gigante llamado Gargantúa. Thorne puso una condición: nada en la película debía contradecir las leyes físicas conocidas, y las ideas especulativas debían surgir de la ciencia real.",
      "Para mostrar el agujero de gusano y Gargantúa, el equipo de efectos visuales de la empresa Double Negative programó las ecuaciones de la luz que Thorne les proporcionó. Por eso el agujero de gusano no aparece como un túnel en forma de embudo, sino como una esfera que muestra, distorsionada, la imagen de la galaxia del otro lado. Las simulaciones fueron tan precisas que dieron lugar a artículos científicos publicados en 2015, y la película ganó el premio Óscar a los mejores efectos visuales. El cine sirvió aquí para visualizar la física."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En «Interstellar», los astronautas visitan el planeta de Miller, que orbita muy cerca de Gargantúa. Allí, por la enorme gravedad del agujero negro, cada hora equivale a unos siete años en la Tierra. Es una situación llevada al límite, pero se basa en un efecto real de la relatividad general: el tiempo pasa más despacio cerca de una gran masa. Thorne explicó que, para lograrlo, Gargantúa debía girar casi a la máxima velocidad posible." },
      { label: "Dato Científico", icon: "atom", text: "Thorne es conocido por sus apuestas científicas. En 1997, él y Stephen Hawking apostaron contra el físico John Preskill a que la información que cae en un agujero negro se pierde para siempre. En 2004, Hawking cambió de opinión, reconoció la derrota y le entregó a Preskill una enciclopedia de béisbol como premio. Thorne, en cambio, no se dio por vencido, porque consideraba que la cuestión todavía no estaba resuelta." }
    ],
    fact: "Para «Interstellar», Double Negative desarrolló un programa llamado DNGR que seguía la trayectoria de millones de rayos de luz a través del espacio-tiempo curvo. Según el equipo, algunos fotogramas tardaron hasta 100 horas en calcularse. Al revisar las imágenes, Thorne y los artistas encontraron detalles de cómo un agujero negro en rotación distorsiona la luz que no se habían visualizado antes con tanta claridad, y los publicaron en revistas científicas.",
  },
  {
    id: "ligo-ondas-gravitacionales",
    bannerImage: '/assets/wormhole/infographic_m2/banner_ligo-ondas-gravitacionales.webp',
    bannerCaption: "El 14 de septiembre de 2015 LIGO detectó por primera vez ondas gravitacionales, producidas por la fusión de dos agujeros negros.",
    title: "LIGO y las ondas gravitacionales",
    color: '#5A7D78',
    btnImage: '/assets/wormhole/infographic_m2/btn_ligo-ondas-gravitacionales.webp',
    image: '/assets/wormhole/infographic_m2/hero_ligo-ondas-gravitacionales.webp',
    content: [
      "Las ondas gravitacionales son ondulaciones del propio espacio-tiempo. Cuando objetos muy masivos se aceleran, como dos agujeros negros que giran uno alrededor del otro, generan ondas que se propagan a la velocidad de la luz, estirando y encogiendo ligeramente el espacio a su paso. Einstein las predijo en 1916, poco después de publicar la relatividad general, pero pensaba que serían tan débiles que nadie podría medirlas jamás. Durante casi un siglo pareció que tenía razón.",
      "La primera prueba llegó de forma indirecta. En 1974, Russell Hulse y Joseph Taylor descubrieron un púlsar que giraba en pareja con otra estrella de neutrones. Al seguirlo durante años, comprobaron que su órbita se encogía poco a poco, justo al ritmo que predecía la relatividad general si el sistema perdía energía emitiendo ondas gravitacionales. Por ese trabajo recibieron el Premio Nobel de Física en 1993. Faltaba, sin embargo, detectar las ondas directamente cuando pasaran por la Tierra.",
      "LIGO consta de dos observatorios en Estados Unidos, uno en Hanford, en el estado de Washington, y otro en Livingston, en Luisiana, separados por unos 3,000 kilómetros. Cada uno tiene forma de L, con dos brazos de 4 kilómetros por los que viajan rayos láser dentro de tubos al vacío. Cuando pasa una onda gravitacional, un brazo se alarga y el otro se acorta una cantidad diminuta, y los láseres lo registran. LIGO puede detectar cambios de longitud de una milésima del diámetro de un protón.",
      "El 14 de septiembre de 2015, a las 09:50 en tiempo universal, ambos detectores registraron la misma señal con una diferencia de unos 7 milisegundos. Venía de dos agujeros negros de unas 36 y 29 veces la masa del Sol que se fusionaron a unos 1,300 millones de años luz de distancia. En una fracción de segundo, una energía equivalente a unas tres masas solares se convirtió en ondas gravitacionales. El evento recibió el nombre GW150914, y su descubrimiento se anunció al mundo el 11 de febrero de 2016.",
      "Las ondas gravitacionales abrieron una forma nueva de observar el universo. En 2017, LIGO y el detector europeo Virgo captaron la fusión de dos estrellas de neutrones, que también fue observada con telescopios de luz. ¿Podrían servir para encontrar agujeros de gusano? En 2016, los físicos Vitor Cardoso, Edgardo Franzin y Paolo Pani calcularon que un objeto sin horizonte, como un agujero de gusano, podría producir «ecos» poco después de la señal principal de una fusión. Por ahora, ningún eco de ese tipo ha sido confirmado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las señales de LIGO pueden convertirse en sonido. La de GW150914 duró apenas dos décimas de segundo dentro del rango del detector y, al pasarla a audio, suena como un breve silbido ascendente que los científicos llaman «chirp», como el gorjeo de un pájaro. El tono sube porque los agujeros negros giraban cada vez más rápido justo antes de fusionarse. Hoy LIGO, Virgo y el detector japonés KAGRA han registrado cientos de eventos así." },
      { label: "Dato Científico", icon: "atom", text: "Durante su fracción de segundo más intensa, GW150914 emitió más potencia en forma de ondas gravitacionales que toda la luz emitida al mismo tiempo por todas las estrellas del universo observable. Aun así, cuando la onda llegó a la Tierra, después de viajar más de mil millones de años, había deformado el espacio tan poco que los brazos de LIGO cambiaron de longitud mucho menos que el tamaño de un núcleo atómico." }
    ],
    fact: "Para lograr esa sensibilidad, LIGO tiene uno de los sistemas de vacío más grandes del mundo, y sus espejos, de unos 40 kilogramos, cuelgan de finísimas fibras de vidrio para aislarlos de las vibraciones. Los detectores son tan sensibles que registran el paso de camiones lejanos, las olas del océano o pequeños terremotos, y por eso hacen falta dos observatorios muy separados para confirmar que una señal es real y no un ruido local.",
  },
  {
    id: "er-epr-entrelazamiento",
    bannerImage: '/assets/wormhole/infographic_m2/banner_er-epr-entrelazamiento.webp',
    bannerCaption: "En 2013 Juan Maldacena y Leonard Susskind propusieron que sistemas entrelazados estarían unidos por puentes de Einstein-Rosen.",
    title: "ER=EPR: agujeros de gusano y entrelazamiento",
    color: '#786E5A',
    btnImage: '/assets/wormhole/infographic_m2/btn_er-epr-entrelazamiento.webp',
    image: '/assets/wormhole/infographic_m2/hero_er-epr-entrelazamiento.webp',
    content: [
      "En 1935, Nathan Rosen firmó con Einstein dos artículos famosos con solo unas semanas de diferencia. Uno es el del puente de Einstein-Rosen, conocido como ER. El otro, escrito también con Boris Podolsky y conocido como EPR, criticaba la mecánica cuántica. Señalaba que, según esa teoría, dos partículas que han interactuado pueden quedar ligadas de modo que medir una revela al instante algo sobre la otra, por lejos que estén. Ese mismo año, el austriaco Erwin Schrödinger llamó a esta conexión entrelazamiento.",
      "Einstein pensaba que ese comportamiento era una señal de que a la mecánica cuántica le faltaba algo, y en una carta de 1947 lo describió como una «acción fantasmal a distancia». Pero en 1964 el físico norirlandés John Bell propuso una forma de ponerlo a prueba, y experimentos como los de John Clauser en los años setenta y Alain Aspect en 1982 dieron la razón a la mecánica cuántica. En 2022, Aspect, Clauser y el austriaco Anton Zeilinger recibieron el Premio Nobel de Física por sus experimentos con fotones entrelazados.",
      "Conviene aclarar un error muy común. Medir una partícula entrelazada no «envía» nada a su compañera ni la modifica a distancia como si fuera un control remoto. Lo que ocurre es que los resultados de ambas mediciones aparecen correlacionados, y esa correlación solo se descubre al comparar los datos por un canal normal, que no supera la velocidad de la luz. Por eso el entrelazamiento no permite enviar mensajes instantáneos. Aun así, es un recurso valiosísimo para la computación cuántica y para la criptografía cuántica.",
      "En 2013, el físico argentino Juan Maldacena, del Instituto de Estudios Avanzados de Princeton, y el estadounidense Leonard Susskind, de la Universidad de Stanford, propusieron una conjetura audaz con un nombre muy corto: ER=EPR. Según ella, dos agujeros negros entrelazados estarían conectados por un puente de Einstein-Rosen, y quizá incluso dos partículas entrelazadas podrían estar unidas por una versión cuántica diminuta de ese puente. Si fuera cierto, el entrelazamiento y la geometría del espacio-tiempo serían dos caras de un mismo fenómeno.",
      "Estos agujeros de gusano no serían atajos para viajar ni para enviar mensajes más rápido que la luz: son tan intransitables como el puente original. Su interés es otro. Podrían ayudar a entender qué ocurre con la información que cae en un agujero negro, uno de los grandes misterios de la física actual. En 2022, un equipo que usó el procesador cuántico Sycamore de Google simuló un modelo matemático relacionado con estas ideas. Algunos titulares hablaron de un «agujero de gusano creado en laboratorio», pero fue una simulación muy simplificada, no un túnel real."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Nathan Rosen es una figura clave en esta historia: su apellido es la R de ER y también la R de EPR. Ambos artículos aparecieron en la revista Physical Review en 1935, con unas siete semanas de diferencia. Durante casi ochenta años se consideraron temas sin relación, uno de gravedad y otro de física cuántica. La conjetura ER=EPR propone que, en el fondo, Einstein y Rosen habían estado estudiando dos aspectos de lo mismo." },
      { label: "Dato Científico", icon: "atom", text: "En 2017, los físicos Ping Gao, Daniel Jafferis y Aron Wall mostraron que, en ciertos modelos teóricos, un puente de Einstein-Rosen entre dos agujeros negros entrelazados podría volverse atravesable durante un instante si se conectan ambos lados con una interacción cuántica especial. Pero ese túnel no es un atajo: cruzarlo tarda más que enviar una señal por el espacio normal, de modo que no permite superar la velocidad de la luz." }
    ],
    fact: "El experimento de 2022, publicado en la revista Nature, usó solo 9 cúbits del procesador Sycamore para simular un sistema cuántico muy simplificado. Lo que se observó fue una señal que se comportaba como si atravesara un agujero de gusano dentro del modelo matemático. Poco después, otros investigadores publicaron críticas señalando que el modelo era demasiado simple para representar fielmente esa geometría. El debate muestra cómo la ciencia revisa sus propias afirmaciones.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5A6B7D", "#7D6A5A", "#6B7D5A", "#6A5A7D", "#7D5A6B", "#5A7D78", "#786E5A"];
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
          <linearGradient id="gradWormholeM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ATAJOS QUE NO ROMPEN EL LÍMITE DE LA LUZ</text>
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
          layoutId="activeDotWormholeM2"
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
export default function InteractiveInfographic_WormholeM2() {
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
              🏆 Velocidad de la luz, Morris-Thorne, LIGO y la conjetura ER=EPR
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
