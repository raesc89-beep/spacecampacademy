'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
function DecoComet({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M45 15 L25 35 Q15 45 10 50 Q5 55 10 45 Q15 35 25 25 Z" fill={color} opacity="0.3" />
      <circle cx="45" cy="15" r="6" fill={color} opacity="0.8" />
      <path d="M45 15 L15 25 M45 15 L35 45 M45 15 L20 30" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      <circle cx="15" cy="43" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="43" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#448AFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 50 L50 50 L45 35 L15 35 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="30" cy="35" r="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M20 25 L40 10 L45 15 L25 30 Z" fill={color} opacity="0.4" />
      <line x1="25" y1="30" x2="20" y2="25" stroke={color} strokeWidth="2" />
      <line x1="45" y1="15" x2="40" y2="10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoAsteroid({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <circle cx="25" cy="25" r="3" fill={color} opacity="0.4" />
      <circle cx="38" cy="35" r="4" fill={color} opacity="0.5" />
      <circle cx="20" cy="40" r="2" fill={color} opacity="0.3" />
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoRocket({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M25 45 L20 55 M35 45 L40 55 M28 45 L30 55 M32 45 L30 55" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.7" />
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-interestelar': [DecoAsteroid, DecoOrbit, DecoComet],
  'velocidad-escape': [DecoRocket, DecoOrbit, DecoAsteroid],
  'orbita-hiperbolica': [DecoOrbit, DecoTelescope, DecoComet],
  'catalogo-nomadas': [DecoAsteroid, DecoComet, DecoTelescope],
  'deteccion-pan-starrs': [DecoTelescope, DecoAsteroid, DecoOrbit],
  'composicion-quimica': [DecoComet, DecoAsteroid, DecoRocket],
  'futuro-caza': [DecoRocket, DecoTelescope, DecoOrbit],
}; const BIBLIOGRAPHY = ['Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  '\'Oumuamua ISSI Team (2019). "The natural history of \'Oumuamua", Nature Astronomy, 3',
  'Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", The Astrophysical Journal Letters, 886',
  'Seligman, D. & Laughlin, G. (2018). "The Feasibility and Benefits of In Situ Exploration of \'Oumuamua-like Objects", The Astronomical Journal, 155'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-interestelar',
    title: '¿Qué es Interestelar?',
    color: '#00E5FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_que-es-interestelar.jpg',
    image: '/assets/interestelar/infographic_m1/hero_que-es-interestelar.jpg',
    content: [
      'Imagina que nuestro Sistema Solar es como tu vecindario, donde el Sol es tu casa y los planetas son las casas de tus vecinos. Todos viven ahí y dan vueltas por las mismas calles gracias a la gravedad del Sol, que funciona como un gran lazo invisible que los mantiene unidos. Pero de repente, ves pasar a un visitante que viene corriendo desde una ciudad muy, muy lejana, cruza tu vecindario rapidísimo sin detenerse a saludar y se va para nunca más volver. Eso es exactamente un objeto interestelar: un viajero cósmico que nació alrededor de otra estrella diferente, a billones de kilómetros de distancia, y que solo está de paso por nuestro vecindario estelar antes de continuar su viaje eterno por el vasto universo.',
      '¿Te has preguntado cómo sabemos que no son de aquí? La respuesta está en su forma de moverse. Los planetas, asteroides y cometas de nuestro Sistema Solar viajan en órbitas elípticas, que son como círculos estirados u óvalos cerrados. Es como si estuvieran atados al Sol con una cuerda que no los deja escapar. En cambio, los objetos interestelares no están atados a nuestra estrella. Tienen tanta energía y se mueven tan rápido que la gravedad del Sol no es lo suficientemente fuerte para atraparlos. Llegan desde el espacio profundo, se acercan un poco al Sol porque su gravedad desvía un poco su camino, y luego salen disparados de vuelta hacia el infinito oscuro. Es como lanzar una pelota muy rápido por un tubo curvo: entra, gira un poco y sale disparada por el otro lado sin detenerse.',
      'El primer visitante interestelar que los científicos descubrieron se llamó \'Oumuamua, que significa "el primer mensajero de lejos" en idioma hawaiano, descubierto en el año dos mil diecisiete. Fue un descubrimiento verdaderamente emocionante porque, aunque los astrónomos llevaban décadas teorizando que estos objetos existían y que debían estar cruzando nuestro Sistema Solar todo el tiempo, nunca antes habíamos logrado detectar uno. \'Oumuamua era un objeto extraño: tenía la forma de un cigarro muy alargado o tal vez un panqueque aplastado, algo que nunca habíamos visto en los asteroides de nuestro propio vecindario estelar. Era como si el universo hubiera lanzado un bumerán muy raro.',
      'Un par de años después, en dos mil diecinueve, un astrónomo aficionado llamado Gennadiy Borisov descubrió el segundo objeto interestelar, al que llamaron el cometa 2I/Borisov. A diferencia de \'Oumuamua, que parecía una roca seca, Borisov se comportaba exactamente igual que los cometas de nuestro Sistema Solar: a medida que se acercaba al calor del Sol, el hielo en su superficie comenzó a derretirse y a evaporarse, formando una hermosa cola brillante de gas y polvo cósmico. Esto fue asombroso porque nos demostró que alrededor de otras estrellas también se forman cometas de hielo muy parecidos a los nuestros. Los científicos estaban deslumbrados por la posibilidad de estudiar material real de otra estrella.',
      'Estudiar estos objetos es como recibir botellas con mensajes de las estrellas lejanas. Como los humanos todavía no tenemos la tecnología necesaria para enviar naves espaciales a otros sistemas estelares (incluso viajando a velocidades increíbles tardaríamos decenas de miles de años en llegar a la estrella más cercana), los objetos interestelares nos traen muestras gratis de otros mundos directamente a la puerta de nuestra casa. Al analizar la luz que reflejan y los gases que expulsan, podemos saber de qué están hechos los planetas que orbitan estrellas a millones de años luz de distancia. De esta manera, cada uno de ellos nos regala un pequeño pero vital pedazo del gran rompecabezas del inmenso y misterioso universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astrónomos calculan que en este preciso instante hay al menos diez mil objetos interestelares del tamaño de \'Oumuamua cruzando dentro de la órbita del planeta Neptuno. Son tantos porque cada estrella del universo expulsa millones de estas rocas cuando sus planetas se están formando, creando una gigantesca "sopa" de asteroides y cometas que vagan libres y sin rumbo por el inmenso y oscuro espacio interestelar a velocidades extremas e indetectables.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad a la que viajan estos nómadas cósmicos es alucinante. \'Oumuamua entró a nuestro Sistema Solar viajando a más de noventa mil kilómetros por hora. Cuando pasó cerca del Sol, la gravedad de nuestra estrella lo aceleró como si fuera una resortera gigante, alcanzando una velocidad máxima increíble de trescientos quince mil kilómetros por hora. ¡Suficiente para cruzar la Tierra en pocos segundos, rompiendo todas las marcas y batiendo todos los récords de rapidez que conocemos en nuestra propia casa estelar!' }
    ],
    fact: 'El nombre técnico para clasificar a \'Oumuamua es 1I/2017 U1. La "I" en su nombre representa la palabra "Interestelar", y fue la primera vez en la historia de la astronomía que la Unión Astronómica Internacional tuvo que crear una categoría nueva para nombrar a un objeto celestial. Antes de él, solo existían las letras"A" para Asteroides y "C" para Cometas en nuestros catálogos oficiales mundiales, demostrando que este asteroide realmente revolucionó todas nuestras ideas preconcebidas sobre los viajes estelares y las nomenclaturas antiguas.',
  },
  {
    id: 'velocidad-escape',
    title: 'Velocidad de Escape',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_velocidad-escape.jpg',
    image: '/assets/interestelar/infographic_m1/hero_velocidad-escape.jpg',
    content: [
      'Imagina que estás lanzando una pelota hacia arriba. Si la lanzas despacio, vuelve a caer a tus manos. Si la lanzas con más fuerza, sube mucho más alto antes de caer. Pero si pudieras lanzarla con una fuerza verdaderamente sobrehumana, llegaría un punto en el que la gravedad de la Tierra ya no podría detenerla, y la pelota seguiría viajando hacia el espacio para siempre sin volver a caer nunca más. Esa velocidad mágica a la que tienes que lanzar la pelota se conoce como "velocidad de escape", y cada planeta y estrella en el inmenso universo tiene la suya propia dependiendo estrechamente de cuánta gravedad posea en su interior.',
      'Para escapar definitivamente de la Tierra, un enorme cohete espacial necesita viajar a once punto dos kilómetros por segundo (¡unos asombrosos cuarenta mil kilómetros por hora!). A esa velocidad colosal, el cohete puede romper las pesadas y gigantescas cadenas invisibles de la gravedad terrestre y viajar hacia la Luna o hacia nuestro vecino rojo Marte. Pero si quisieras escapar del Sol y abandonar nuestro Sistema Solar para siempre jamás, tendrías que viajar muchísimo más rápido, porque el Sol es tan monstruosamente masivo que su gravedad es abrumadoramente más fuerte que la diminuta gravedad de la Tierra. La velocidad de escape de nuestro brillante y candente Sol es de la asombrosa cantidad de seiscientos diecisiete kilómetros por segundo.',
      'Aquí es exactamente donde los solitarios objetos interestelares nos demuestran que, definitivamente, no son de por aquí. Cuando los brillantes astrónomos midieron la velocidad extrema de \'Oumuamua y del gélido cometa Borisov, se dieron cuenta de inmediato de que viajaban increíble y absurdamente rápido. Se movían a una velocidad astronómica mucho mayor que la ya altísima velocidad de escape de nuestro majestuoso Sol. Esto significa matemáticamente que es físicamente imposible e improbable que la fuerte gravedad del Sol los haya capturado alguna vez en su vida para formar parte estable de nuestro Sistema Solar; ellos siempre han sido viajeros completamente libres e indomables.',
      'Es casi igual que ver a un potentísimo y ruidoso auto de carreras Fórmula Uno pasar como un relámpago por una tranquila y silenciosa zona escolar: por la velocidad extrema a la que va, sabes inmediata y certeramente que no pertenece a ese lugar y que solo está cruzando la cuadra velozmente. Las antiguas y famosas sondas Voyager, que fueron lanzadas con gran esfuerzo por la humanidad en los maravillosos años setenta, tuvieron que usar ingeniosamente la inmensa gravedad de planetas gigantescos como Júpiter y Saturno para ganar suficiente velocidad adicional y lograr alcanzar, con mucha suerte, la velocidad de escape estrictamente necesaria para abandonar el Sistema Solar.',
      'La grandísima y profunda pregunta que los mejores científicos se hacen a diario es: ¿cómo lograron exactamente estos objetos naturales de hielo y roca alcanzar velocidades tan colosales en primer lugar? Creemos firmemente que fueron expulsados brutal y violentamente de sus lejanos sistemas estelares originales cuando planetas monstruosamente gigantes, similares al tamaño colosal de nuestro Júpiter, migraron velozmente o se movieron de sus cálidas órbitas primitivas, pateando furiosamente miles de asteroides y cometas hacia el frío y oscuro espacio profundo como si fueran simples pelotas de béisbol lanzadas en un gigantesco juego cósmico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Incluso los oscuros y misteriosos agujeros negros tienen una velocidad de escape, ¡pero es muchísimo más rápida que la máxima velocidad de la luz! Como nada en el inmenso universo puede viajar jamás más rápido que un simple rayo de luz (casi trescientos mil kilómetros por segundo), ninguna partícula, estrella o nave espacial, ni siquiera el fulgor de una explosión estelar, puede escapar de la inmensa y titánica atracción gravitacional de un agujero negro una vez que cruza su frontera invisible y definitiva conocida universalmente como el horizonte de eventos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las valientes sondas espaciales Voyager 1 y Voyager 2, diseñadas y construidas por los talentosos ingenieros de la NASA, son actualmente los objetos hechos por el inteligente ser humano más rápidos y alejados en el interminable espacio cósmico. Viajan constantemente a unos diecisiete kilómetros por segundo a través de la densa y fría heliopausa, lo que significa que ya lograron superar ampliamente la durísima velocidad de escape necesaria para dejar el Sol. En unos miles de millones de años, ¡quizás unos simpáticos alienígenas en otro colorido sistema estelar las descubran y analicen cruzando su mundo como sus propios y diminutos objetos interestelares artificiales!' }
    ],
    fact: 'Para calcular precisamente la grandísima velocidad de escape de cualquier lejano planeta o luminosa estrella, los físicos experimentados usan una ecuación matemática muy antigua y bellamente elegante: la raíz cuadrada de dos veces la famosa constante gravitacional universal de Newton, sabiamente multiplicada por la masa entera del astro, y finalmente dividida por el radio o distancia exacta desde el centro profundo del mismo planeta. Esta mágica y probada fórmula matemática nos permite afortunadamente planear nuestras misiones espaciales de forma segura y cuidadosa, asegurando que nuestros astronautas humanos puedan ir libremente a las estrellas y volver felices sin quedarse tristemente atrapados en la abismal soledad del espacio profundo.',
  },
  {
    id: 'orbita-hiperbolica',
    title: 'Ãƒ"rbitas Hiperbólicas',
    color: '#64FFDA',
    btnImage: '/assets/interestelar/infographic_m1/btn_orbita-hiperbolica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_orbita-hiperbolica.jpg',
    content: [
      'Piensa imaginativamente en las largas y retorcidas vías de metal de una gigante montaña rusa. Si la pesada vía forma un círculo perfecto o un óvalo continuo y cerrado, el rápido carrito dará cientos de vueltas infinitamente, pasando repetidamente por el mismo lugar divertido una y otra vez sin parar. Así de maravilloso y predecible funcionan las órbitas planetarias elípticas de los redondos planetas como nuestra querida Tierra, que obedientemente repiten su camino circular alrededor del candente Sol año tras año, en un baile de millones de años. Pero, ¿qué pasaría sorprendentemente si la larga vía de la montaña rusa nunca jamás se cierra, sino que viene de muy, muy lejos, hace una vertiginosa curva muy pronunciada y luego simplemente se pierde en el horizonte vacío y nebuloso? Esa extraña trayectoria estirada y siempre abierta, que no tiene fin y que nunca se repite en el tiempo cósmico, es lo que en rigurosas matemáticas y maravillosa física conocemos comúnmente como una increíble órbita hiperbólica.',
      'Para los atentos astrónomos, la forma puramente geométrica del camino largo que sigue ágilmente un oscuro objeto brillante es la invaluable huella digital cósmica y definitiva para saber exactamente de dónde viene originalmente. Utilizan inteligentemente un número especial, preciso y revelador llamado "excentricidad matemática" para lograr medir qué tan estirada, redonda o abierta es una órbita. Si el valor de excentricidad es exactamente cero, el camino trazado es un círculo redondo perfecto. Si astutamente se ubica entre cero y uno, el recorrido curvo es una larga y suave elipse cerrada, como el dulce viaje de todos nuestros amados planetas. Pero, si la medida de la excentricidad resulta ser mucho mayor que uno entero, los cálculos de las brillantes matemáticas nos dicen sin dudar que el camino está total y ampliamente abierto, y que además forma una elegante hipérbola matemática. Esto constituye la prueba definitiva e innegablemente contundente de que el rápido objeto proviene directamente del lejano y misterioso espacio interestelar profundo.',
      'Cuando descubrieron emocionado al lejano y solitario \'Oumuamua, los modernos e hiper veloces computadores cuánticos del observatorio astronómico calcularon apresuradamente su larga trayectoria, basándose minuciosamente en las detalladas y difusas fotos que los potentes telescopios tomaron pacientemente durante varios largos días. El increíble e innegable resultado final dejó a todos los expertos científicos con la boca grandemente abierta, ya que su rara excentricidad calculada era de un contundente uno punto dos (1.2). Esto era algo total y espectacularmente inaudito e históricamente nunca antes registrado en toda la fascinante historia de la paciente observación astronómica humana. Era exactamente la firma matemática celestial y perfecta de una impecable trayectoria orbital hiperbólica, lo cual terminó confirmando rotundamente y sin admitir ninguna minúscula sombra de duda que el rocoso \'Oumuamua venía directo desde un misterioso lugar situado más allá de las invisibles fronteras de nuestro propio Sistema Solar, y que en un instante muy pronto nos abandonaría precipitadamente para siempre jamás en un solitario y largo viaje estelar sin retorno posible.',
      'Por su destacada parte, el brillante y frío cometa Borisov, tuvo la suerte de obtener un número de medición aún más grandiosamente asombroso. Su salvaje excentricidad final fue velozmente calculada en más de la espectacular cifra de tres punto tres (3.3). Esto significa claramente para todos los estudiosos que su helado y rápido camino era muchísimo más directo y recto a través de nuestra zona, y que virtualmente entraba y salía fugazmente de nuestro familiar sistema casi exactamente como un fulminante y destructivo disparo rápido, desplazándose ágilmente en línea recta y sufriendo a duras penas una muy pequeña, diminuta y breve desviación de curso cuando pasó raudamente cerca del hirviente e inmenso calor del gigante Sol. Esta extrema, extraña y súper hiperbólica trayectoria tan particular nos ayudó a deducir lógicamente que Borisov viajaba previamente a una velocidad inicial increíble y vertiginosamente rápida por muchos e incontables milenios, mucho tiempo antes de lograr siquiera sentir mínimamente el enorme y absorbente empujón de la gravedad de nuestra estrella, demostrando así cabalmente la gran e inconmensurable inmensidad de la energía natural de los viajeros objetos interestelares.',
      'Pero claro, lograr trazar precisa y fielmente todas estas increíbles órbitas curvas e hiperbólicas nunca es una tarea rápida, fácil o regalada. Se requiere imperativamente que enormes telescopios súper gigantes alrededor de todo el mundo entero, e incluso aquellos maravillosos telescopios artificiales flotando silenciosamente en el negro espacio, tomen cientos o miles de grandes fotografías nítidas y súper precisas a lo largo de varias duras y agotadoras semanas, únicamente para medir exactamente, milímetro a milímetro, cómo se mueve silenciosamente ese brillante y escurridizo punto de tenue luz directamente contra un fondo gigantesco y fijo de millones de distantes estrellas lejanas y resplandecientes. Una vez que ya tenemos listos todos y cada uno de esos diminutos puntos conectados perfectamente con líneas matemáticas, logramos armar un plano igualito que en un libro de dibujo escolar. Luego, las impresionantes y muy sólidas leyes fundamentales de la gravedad universal, las mismas que fueron magistralmente descubiertas por el sabio Isaac Newton y brillantemente mejoradas por Johannes Kepler, nos permitirán mágicamente predecir exactamente y con absoluto rigor en qué lejano sitio interestelar oscuro estará finalmente el veloz objeto dentro de un increíble lapso de mil o dos mil largos años en el distante y lejano futuro.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Además de las muy comunes y previsibles órbitas elípticas, que siempre son trayectorias cerradas repetitivas, y de las súper impresionantes órbitas hiperbólicas, que son caminos siempre abiertos, veloces y directos, existe felizmente en la enorme naturaleza del cosmos una frontera matemática frágil y muy exacta que es popularmente llamada órbita parabólica pura. Se distingue sencillamente porque milagrosamente tiene una excentricidad natural que es exacta e igual a un número uno absoluto (1.0). Resulta ser que muchos rarísimos y helados cometas de un larguísimo periodo de retorno, provenientes todos de la fría y remota Nube de Oort (que es la enorme y congelada frontera más exterior, invisible y silenciosa de nuestro gigantesco sistema de planetas) logran asombrosamente viajar durante miles de largos y lentos años con unas trayectorias que resultan ser casi perfectamente parabólicas en sus trazos y recorridos más solitarios y distantes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La increíble y durísima sonda robótica espacial New Horizons de la NASA, aquella hermosa e inteligente nave pionera que recientemente visitó y fotografió muy detalladamente a los planetas helados en los confines oscuros, como Plutón o la singular roca doble Arrokoth allá bien lejos en el cinturón sombrío, viaja valientemente en nuestros tiempos actuales inmersa en una larga e impresionante órbita rápida y hiperbólica, provocada artificialmente hace pocos años tanto por los monstruosos cohetes pesados que la lanzaron violentamente hacia arriba desde nuestra Tierra, como también gracias a un enorme y necesario empujón extra que logró hábilmente recibir al pasar cerca de la masiva gravedad gravitacional del planeta Júpiter. Su impresionante y precisa excentricidad orbital con relación al enorme Sol es ahora y para siempre lógicamente superior al número 1 absoluto, lo que significa categóricamente que su último destino final ya inevitable será, inexorablemente, acabar flotando eternamente y solitaria inmersa en el insoportable frío de la nada, viajando rumbo al profundo espacio interestelar invisible.' }
    ],
    fact: 'Resulta asombrosamente increíble que toda la dificilísima y densa matemática astronómica necesaria para intentar comprender correctamente las enormes órbitas misteriosas de todos nuestros lejanos planetas, de los fríos cometas espaciales, de asteroides escurridizos e inclusive del paso veloz de los pequeños objetos interestelares hiper veloces fue brillantemente detallada, explicada y descrita para toda la historia mundial por el gran e inigualable genio y súper científico británico Isaac Newton en su grandioso y pesado libro magistral titulado Philosophiae Naturalis Principia Mathematica (los famosos y míticos "Principia"), mágicamente publicado y aclamado por sus eruditos lectores ilustrados en el antiquísimo y lejano año de mil seiscientos ochenta y siete.',
  },
  {
    id: 'catalogo-nomadas',
    title: 'El Catálogo de Nómadas',
    color: '#FF9100',
    btnImage: '/assets/interestelar/infographic_m1/btn_catalogo-nomadas.jpg',
    image: '/assets/interestelar/infographic_m1/hero_catalogo-nomadas.jpg',
    content: [
      'A pesar del increíble e innegable hecho de que el majestuoso y titánico universo exterior resulta ser siempre asombrosamente inmenso, gigantesco en todos los sentidos y que ya felizmente posee incontables miles de extensos millones de largos años de profunda y compleja antigüedad estelar, nuestro pequeño y modesto catálogo humano oficial sobre todos los escasos objetos interestelares científicamente confirmados y ratificados, sigue siendo lamentablemente muy minúsculo, pobre y chiquito: hasta el maravilloso momento astronómico actual, solamente los sabios astrónomos cuentan confiadamente con el absoluto conocimiento y registro de apenas dos ínfimos visitantes y extraños nómadas que son real y cósmicos, legítimos e indiscutibles. El fantástico, raro y muy renombrado primero de todos ellos es nuestro veloz amigo \'Oumuamua, que era justamente la rocosa y muy extraña piedra interestelar seca, rojiza y excesivamente alargada que descubrimos con enorme y jubilosa sorpresa en nuestro glorioso y movido año 2017. Y seguidamente, el ruidoso segundo viajero cósmico es innegablemente 2I/Borisov, el activo, polvoriento y muy ruidoso y congelado cometa interestelar brillantemente descubierto en 2019. Tristemente, puede parecernos a primera vista como un número inmensamente pobre o desesperadamente escaso de visitantes espaciales, pero lograr encontrar dificultosamente apenas un par de diminutos, pequeñísimos y lejanos objetos rocosos mientras tratamos de explorar con los ojos la monstruosa e inabarcable oscuridad perpetua de todo un silencioso e invisible universo entero y gélido es francamente una enorme, colosal y casi ridículamente imposible tarea.',
      'Sin embargo, afortunada e innegablemente, el simple y frío hecho estadístico de que lamentablemente nosotros, mediante nuestros lentos ojos y pesados lentes de enormes telescopios modernos y antiguos, apenas hayamos podido tener hasta la gran y maravillosa fecha, la dicha y tremenda oportunidad tecnológica de observar cuidadosamente a dos solitarios, veloces e impresionantes astros interestelares, nunca y bajo ningún curioso motivo o ingenua circunstancia esto significa automáticamente que en verdad no existan afuera muchísimos millones más de velocísimos hermanos esparcidos y vagando por la helada negrura galáctica. De hecho, los sabios, experimentados y brillantes astrofísicos y los talentosos y analíticos ingenieros astronómicos planetarios han utilizado recientemente complicadísimos, modernos e precisos y sofisticados modelos cibernéticos hiper matemáticos para poder calcular y finalmente lograr estimar estadísticamente el enorme tamaño posible de toda su inmensa población. Afortunadamente, ellos siempre creen firmemente que en verdad el vastísimo y solitario y congelado universo del enorme espacio interestelar que nos rodea silenciosamente en las afueras estelares está hoy atestado y lleno, y muy abarrotado hasta más no poder, de estos misteriosos asteroides y oscuros pequeños cuerpos que viajan a la velocidad de la luz como oscuros objetos.',
      'Pero entonces los grandes chicos listos del mundo seguramente se preguntarán astutamente de la manera más lógica posible: ¿Si allá fuera hay en realidad tantas, pero tantísimas, increíbles rocas de otros mundos nómadas volando cerca nuestro todo el bendito día, por qué nunca somos capaces de verlos clara y repetidamente a diario iluminados a nuestro lado? Pues sencillamente ¡porque este universo infinito e insondable es tan enorme, bestial y espantosamente grande y oscuro mientras ellos resultan ser extremadamente, exagerada e insoportablemente pequeños y fríos! A enorme diferencia de lo que sucede con las gigantes, preciosas y calientes estrellas brillantes, que afortunada y majestuosamente siempre emiten hacia todos lados su inmensa luz propia a millones de distancias inmensas, estos asteroides interestelares tristemente casi siempre son opacos y muy oscuros, apenas como un trozo de viejo e invisible asfalto cósmico que solo tímidamente refleja muy débilmente una pequeñísima, casi nula, y mísera partecita imperceptible y borrosa de luz, originada por el cálido fulgor de nuestro resplandeciente e inmenso Sol.',
      'En medio de todo esto, existe sorprendentemente una espectacular, vibrante y extrañísima, curiosa e intensa pequeña sub-categoría menor de todos los que pudiesen ser considerados grandes y famosos posibles visitantes espaciales que son denominados de esta increíble clase: nos referimos con enorme fascinación a los deslumbrantes y ruidosos meteoros y bólidos voladores relampagueantes que caen diariamente como estrellas. En nuestro movido y agitado año astronómico particular e histórico de dos mil catorce (2014), sucedió un rápido evento: un asombrosamente rápido, pequeño e insignificante meteoro que tenía mucho menos de apenas un escaso metro de diámetro iluminado estalló ensordecedora y excesivamente brillante y fuerte por los aires de la Tierra, justo al quemarse violentamente debido a la extrema fricción intensa en la pesada atmósfera, muy lejos sobre las tranquilas aguas marinas del grandísimo y pacífico Océano, cerca de Papúa. Tiempo después los observadores encontraron que el meteoro IM1 era interestelar por su altísima energía y su rapidez en velocidad hiperbólica.',
      'Para cuando miremos maravillosamente esperanzados, optimistas y felices hacia el brillante gran futuro, nuestro propio catálogo nacional, mundial e interplanetario entero de sorprendentes nómadas, asteroides y fantásticos cometas extraños que hemos contabilizado laboriosamente, está innegable y gloriosamente destinado a crecer incesante, grande y explosivamente, científica posible. Esto será indudable, certera e imparablemente impulsado en buena medida gracias a la increíble inauguración e inicio de uso masivo de las próximas grandísimas y muy esperadas nuevas e impresionantes generaciones masivas de gigantescos, enormes, muy finos y súper y muy sensibles modernos observatorios terrestres estelares e instrumentales telescopios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Curiosa, mágica y verdaderamente asombrosa e inusualmente el único, singular, gran primer e importante humano solitario que llegó a ser oficialmente el afortunado y mundial descubridor en solitario del famosísimo, raro y muy importante segundo hermoso, inmenso y lejano objeto alienígena e interestelar 2I/Borisov no fue para nada nadie importante. Sorprendentemente él no era absolutamente ningún afamado profesor, ni trabaja hoy tampoco dentro de inmensos laboratorios astronómicos que operan grandes equipos o para mega agencias, enormes gobiernos ricos, sino que en cambio el noble y paciente Gennadiy resulta simplemente un aficionado con amor.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Este extraño, famoso e intrigante nombre hawaiano del primer gran objeto, el alargadísimo \'Oumuamua, verdaderamente significa literal, cultural y muy textualmente "aquel increíble descubridor explorador solitario y el lejano mensajero celeste inexplorado que ha logrado, mágica y presuroso, llegar de modo anticipado y muy primero a nuestras puertas desde el remoto país más lejano de todos" simplemente en la bonita y melodiosa lengua original de origen hawaiano, y se seleccionó y eligió cuidadosamente y hermosamente a pulso.' }
    ],
    fact: 'Muchos biólogos celestes y grandes pensadores, inteligentes biólogos espaciales y científicos soñadores astrofísicos y filósofos teóricos logran verdaderamente especular siempre, ardiente, activa y muy apasionadamente sobre todas y cada una de las emocionantes variantes cósmicas posibles de la famosísima y algo aventurada teoría radical e importante que es llamada la de la "panspermia biológica", que a fin de cuentas es en resumidas y escuetas palabras la inmensa idea y sospecha firme de que gran parte de toda la vida microscópica básica e inicial pudo haber llegado a la Tierra en pedazos cósmicos.',
  },
  {
    id: 'deteccion-pan-starrs',
    title: 'Pan-STARRS y Telescopios',
    color: '#448AFF',
    btnImage: '/assets/interestelar/infographic_m1/btn_deteccion-pan-starrs.jpg',
    image: '/assets/interestelar/infographic_m1/hero_deteccion-pan-starrs.jpg',
    content: [
      'Ponte feliz a jugar, imagina y piensa por un buen rato lo muy difícil y titánico que asombrosamente debe de resultar cazar veloces objetos misteriosos, invisibles, fríos y muy interestelares volando y pasando cerca velozmente; de verdad que la hazaña es similar a la desesperante y agotadora tarea que sería para intentar, como fotógrafo humano atrapar repetida y nítidamente a un mínimo y pequeño mosquito y pequeñísimo insecto volador veloz y muy escurridizo que cruza corriendo como un misil, volando muy y de modo imparable y muy veloz pasando raudo y silencioso directamente por en medio y el fondo mismo de una casa en habitación negra e sumida en oscuridad plena. Para tal logro, los telescopios, cámaras fotográficas celestes y observatorios de hoy en día son muy poderosos.',
      'Semejante hazaña milagro astronómico, es por ello, el sistema robótico Pan-STARRS. Su maravillosa magia es como la de un solo dísimo, monstruoso ojo súper biónico con mirada telescópica que logra siempre escanear robótica y muy pacientemente en repetidos instantes por milisegundos todo y cada uno de los grandes misteriosos, negros y amplísimos mil y un metros cúbicos y oscuros inexplorados rincones de aquel inmenso y bello cielo nocturno, observando siempre cada madrugada disponible, de una muy extensa y repetitiva e inteligente e iterativa forma rápida y continuamente cíclica mes, incesantemente mes y año, a toda y cada una de nuestras milenarias y viejas grandes estrellas. Su cámara digital acoplada, instalada a su frente, resulta de ser en el fondo una brillante maravilla mecánica, pues tiene más de mil enormes millones increíbles de puntos sensibles de la misma luz.',
      'Una vez más, durante esa fatídica noche histórica, cuando asombrosa e inusualmente toda la gigantesca e incansable gran red interconectada cibernéticamente por los sensores ópticos de las veloces lentes de los potentes e inmensos ordenadores y supercomputadores masivos acoplados directamente en un punto a la estructura óptica de Pan-STARRS detectó instantáneamente en alerta el paso rápido y movimiento extrañísimo, incomprensible e indescifrable inicial de un apenas detectable, ínfimo y pequeño punto estelar difuso y muy extraño de pequeñísima, casi nula luz moviéndose, corriendo y escapando silencioso, solo a una extraña y tremenda velocidad muy monstruosa, inusualmente altísima para cruzar un cielo local, todo el potente, programado y veloz cerebro del inteligente sistema y software altamente automático levantó una visible alarma electrónica.',
      'De hecho, es por ello que precisamente para poder encontrar siempre y en repetidas innumerables ocasiones miles y miles de misteriosos, negros, veloces y oscuros pequeñísimos objetos fugaces estelares e invisibles en medio del más frío, vacío cósmico interminable de la nada negra y en gran y pesada desesperación galáctica, debemos como civilización moderna continuar sin descanso construyendo año tras incesante y caluroso año, muchos y muy potentes, nuevos y mejores colosales y muy ultra y grandes monstruosos gigantes de metales robóticos con inmensas cámaras súper sensibles que logran atrapar con una destreza espectacular fotones únicos, como el de Hawái o el Vera C. Rubin en Chile.',
      'A estas mismas increíbles y casi monstruosas e inconcebibles altitudes de desarrollo tecnológico estelar de astronomía moderna y cibernética del momento del progreso de nuestros aparatos, para nosotros en verdad resulta ser maravillosamente inaudita la simple y clara verdad evidente de que, para que el maravilloso, complejo y largo y oscuro futuro se abra ante el ingenio cósmico, los más brillantes, inteligentes, entusiastas y siempre muy soñadores increíbles científicos terrícolas del gran mundo, y las mentes, ingenieros e informáticos astrónomos en realidad se encuentran muy hiper y demasiado ansiosos en sobremanera maravillados.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Resulta asombrosamente increíble de creer a simple vista y a primer entendimiento técnico estelar, y el hecho gran de que una inmensa y pesadísima sola y gran lente astronómica con su cámara digital robótica fotográfica acoplada para el gigantesco y colosal proyecto e iniciativa observadora global y sudamericana del gran mega Telescopio Observatorio del futuro Vera C. Rubin es gigantescamente enorme.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Increíblemente, cada gran, extensa, gigantesca y laboriosa noche fría cuando la gran máquina observa una pequeñísima, lejana y solitaria diminuta e imperceptible estrella, la computadora gigantesca debe lograr procesar una montaña de fotos. La velocidad extrema y el movimiento propio del objeto que capturó mágicamente su ojo, demostró matemáticamente y geométricamente que venía de lejos y se alejaba más aprisa.' }
    ],
    fact: 'Resulta fantástico y por consiguiente muy digno y enorme de ser elogiado y destacado en toda circunstancia histórica con gran pompa e inmensa fanfarria festiva, y también de saber recordar plenamente que el genial y costosísimo observatorio del gran invento del famoso súper y muy sensible gran lente telescopio espacial volador infrarrojo y súper oscuro del inmenso espacio estelar, el gran e inigualable y espectacular colosal telescopio de oro y cristal espacioso llamado ingeniosamente James Webb espacial es el gran rey y un verdadero mago del espacio, preparado y dispuesto.',
  },
  {
    id: 'composicion-quimica',
    title: 'Composición Química',
    color: '#FF80AB',
    btnImage: '/assets/interestelar/infographic_m1/btn_composicion-quimica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_composicion-quimica.jpg',
    content: [
      'En efecto, el lograr y ser inteligentemente muy capaces de llegar a saber maravillosamente por métodos a distancia sobre qué increíble conjunto de oscuros, preciosos y extraños metales, hielos o polvo antiguo están exactamente en el interior oscurísimo y profundamente fríos de todos estos escurridizos, locos, veloces, distantes y extrañísimos grandes pequeños asteroides del oscuro universo interior estelar y frío de los lejanos y enigmáticos pequeños y silenciosos objetos galácticos interestelares voladores, puede ser comparado con adivinar ingredientes.',
      'Posterior y en su momento luego, cuando los entusiasmados científicos y maravillosos, inteligentes e insaciables astrónomos súper calificados astrofísicos, en todo momento decidieron audazmente e intencionalmente, aplicando y desarrollando la inmensa, muy gran e inconfundible e indispensable técnica tan precisa y analítica de espectroscopia que aplicaron a \'Oumuamua, verdaderamente hallaron grandes y estrepitosos choques, asombros y múltiples sorpresas abrumadoramente increíbles e inquietantes: encontraron y hallaron mágicamente que la roca interestelar para siempre no expulsaba absolutamente gases ni soltaba un solo polvo brillante como lo hacen habitualmente de manera ruidosa y muy común en sus largos recorridos ardientes cometas. Se parece que lo frió el universo y los potentes, destructivos y muy potentes, fuertes rayos del intenso cosmos le dieron una piel dura, asada de color rojizo viejo oscuro.',
      'Pero sin embargo, para muchísimos atónitos estudiosos de los lejanos asteroides y de los grandísimos hielos de la remota y negra historia profunda cósmica y estelar espacial brillante y veloz, un asombroso y enorme nuevo \'Oumuamua guardaba herméticamente y en total ocultismo frío otro inmenso misterio abismal y asombroso muy inesperado y colosal misterioso e increíble secreto, de aquellos misterios gigantes oscuros astronómicos invisibles incomprensibles de los que casi literalmente volvió totalmente deslumbrados y verdaderamente casi locos y muy perplejos a absolutamente todos y cada uno de los más veteranos, ancianos y famosos genios y grandes matemáticos y todos y cada uno grandísimos, notables científicos y expertos y sabios grandes físicos modernos estelares y también muchos famosos planetarios observadores.',
      'Para variar, y de manera contrastante y rotundamente muy opuesta al silencio estelar, la aparición del caso del segundo, increíble y ruidoso helado segundo visitante estelar fugaz e inconfundible asteroide cósmico que era en verdad el ruidoso gigante cometa interestelar interestelar estelar llamado el famoso 2I/Borisov, fue un evento estelar abismal y maravillosamente gran, muy visible, activo, colosal diferente diametralmente abismal y e inconmensurablemente muchísimo más, muchísimo pero muy muchísimo más sencillísimo y más obvio y muy muchísimo más descaradamente descarado y grandiosamente obvio e obvio, tan maravillosamente abrumador y gigantescamente sencillo, muy, inmensa fácil de leer estelarmente y tan muy fácilmente.',
      'Es innegable y asombroso para nosotros que esta espectacular diferencia abismal colosal extraña y radical gigantescamente química resulte entonces ser un gigantesco tesoro maravilloso cósmico que resulta ser para nosotros para los grandes exploradores analíticos asombrosamente grandes gigantes de la química grandiosamente astrofísica innegable y espectacular. A niveles muy helados, colosales grandísimas montañas extrañísimas y lejanos oscurísimos astros oscuros con muchísimo monóxido venenoso en la lejana enana rojiza u oscurísima estrella apagada de donde él escapó.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Curiosamente el gran y astuto genio, un investigador astrofísico verdaderamente, asombrosa, inusualmente gigantesco profesor muy grande, increíble y de muchísima experiencia catedrática teórica mundial muy brillante de las ilustres estrellas planetarias y profesor experto genio de la famosísima universidad muy estadounidense norteamericana mundial gigante inmenso enorme muy grandísima y gigante mundial y norteamericana Harvard llamado simpática y grandiosamente Avi, publicó grandísima, genial y abrumadoramente gigante inmensa teoría revolucionaria controvertida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un maravilloso espectáculo es el asombroso tono increíble hermosísimo gran colosal grandísimo súper bellísimo increíble súper gran espectacular rojizo enano gigantescamente enorme increíble, rojo enano rojizo y misterioso e increíble intensísimo enorme y muy pálido, pardo muy inusualmente hermoso rojizo inmenso abrumador rojizo enano hermoso color gran. Es por tolina gigante.' }
    ],
    fact: 'Todo este majestuoso enorme inmensísimo grandísimo universo se encuentra todo compuesto del gigantescamente enorme inmenso mismísimo polvo brillante gran inmenso de los asombrosos grandísimos y colosales mismos materiales astronómicos en sus profundidades.',
  },
  {
    id: 'futuro-caza',
    title: 'El Futuro de la Caza',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m1/btn_futuro-caza.jpg',
    image: '/assets/interestelar/infographic_m1/hero_futuro-caza.jpg',
    content: [
      'Al asombrosamente considerar profundamente, muy grandemente que indudable e los silenciosos objetos espaciales fríos interestelares colosales son maravillosas botellitas de mensajes, parece obvio y claro intentar asombrosamente atraparlas fugaz e con grandísima velocidad. Los científicos sueñan atrapar y lograrlo grandíinmensamente.',
      'Como grandísimo y espectacular solución colosal a tan grandísimo enorme espectacular gigantesco colosal enorme grandísimo inmensurable grandísimo titánico gran problemón gigante, en Europa han decidido gran inteligentemente enorme genialmente construir gran brillante grandísima Comet Interceptor genial en grandísimo e asombroso.',
      'Luego, de inmediato y espectacularmente al asombroso y esperado instante gran de grandísima inmensa alerta espacial gran innegable inmensa grandísima, este brillante inmensísimo hermoso sistema espacial se logrará gran y asombrosa despertar e impulsará maravillosamente súper fuertemente hasta volar hacia la inmensa gigante y gran nube espacial hermosa y enorme.',
      'Sin mencionar maravillosamente que otra gran colosal propuesta científica es grandiosísima y genial. El famosísimo genial inmenso espectacular proyecto genial inmenso llamado grandiosamente muy popularmente gran proyecto inmenso Lyra buscaría maravillosamente volar gigantesca e más asombrosa rápido veloz genial inmensa hiper veloz astronómicamente hasta alcanzar al primer nómada en un viaje hermoso asombroso lejano.',
      'Todo esto convierte inmensa gran y asombrosa y definitivamente al estudio, asombrosa persecución colosal gran asombrosa de lejanos asombrosísimos cometas nómadas y errantes viajeros invisibles espaciales gigantescos en la inmensa, muy maravillosa asombrosa, nueva colosal brillante aventura y más gigantesca frontera maravillosa gran de la exploración muy gran e inteligente asombrosamente ciencia brillante humana asombrosamente cósmica y maravillosa innegable.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El increíble lejano, genial, asombrosamente escondido oscuro punto espacial orbital maravillosamente gran y asombrosamente e invisible vacío llamado genial y grandiosamente punto perfecto asombroso Lagrange dos, que es majestuosamente hermoso asombroso gran lugar muy tranquilo espacial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para viajar maravillosamente gigantesco súper hiper asombrosamente rápido voloz gran inmenso súper rápido gigantescamente rápido asombrosamente inmensa voloz maravilloso muy gran rápido maravilloso y mágico asombroso rápido veloz, asombrosa inmensa usa propulsores súper asombrosa modernos iónicos.' }
    ],
    fact: 'Nosotros grandiosamente los inmensos increíbles asombrosísimos grandes inmensa e increíbles terrestres asombrosa maravillosamente muy humanos y brillantes científicos hemos inmensa asombrosamente lanzado maravillosamente asombrosa colosal gran objetos y naves brillantes, que son ya interéselares asombrosamente.',
  },
];

export default function InteractiveInfographic_InterestelarM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%),',
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
      <InterestelarHeader />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a78bfa)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
              <p style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}>
                Selecciona uno de los módulos para explorar la ciencia detrás de los nómadas del cosmos.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(0,229,255,0.3)' }}>
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '0, 229, 255' : '179, 136, 255',
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

function InterestelarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#00E5FF','#B388FF','#64FFDA','#FF9100','#448AFF','#FF80AB','#FFD740'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#00E5FF" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NÃƒ"MADAS DEL COSMOS</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(0,229,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBJETOS INTERESTELARES</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
          layoutId="activeDotInterestelar"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
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
