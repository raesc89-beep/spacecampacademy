'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SVG Decorative Elements (Interstellar themed) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
};

const BIBLIOGRAPHY = [
  'Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  '\'Oumuamua ISSI Team (2019). "The natural history of \'Oumuamua", Nature Astronomy, 3',
  'Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", The Astrophysical Journal Letters, 886',
  'Seligman, D. & Laughlin, G. (2018). "The Feasibility and Benefits of In Situ Exploration of \'Oumuamua-like Objects", The Astronomical Journal, 155'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-interestelar',
    title: 'Ã‚Â¿QuÃƒÂ© es Interestelar?',
    color: '#00E5FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_que-es-interestelar.jpg',
    image: '/assets/interestelar/infographic_m1/hero_que-es-interestelar.jpg',
    content: [
      'Imagina que nuestro Sistema Solar es como tu vecindario, donde el Sol es tu casa y los planetas son las casas de tus vecinos. Todos viven ahÃƒÂ­ y dan vueltas por las mismas calles gracias a la gravedad del Sol, que funciona como un gran lazo invisible que los mantiene unidos. Pero de repente, ves pasar a un visitante que viene corriendo desde una ciudad muy, muy lejana, cruza tu vecindario rapidÃƒÂ­simo sin detenerse a saludar y se va para nunca mÃƒÂ¡s volver. Eso es exactamente un objeto interestelar: un viajero cÃƒÂ³smico que naciÃƒÂ³ alrededor de otra estrella completamente diferente, a billones de kilÃƒÂ³metros de distancia, y que solo estÃƒÂ¡ de paso por nuestro vecindario estelar antes de continuar su viaje eterno por el vasto universo.',
      'Ã‚Â¿Te has preguntado cÃƒÂ³mo sabemos que no son de aquÃƒÂ­? La respuesta estÃƒÂ¡ en su forma de moverse. Los planetas, asteroides y cometas de nuestro Sistema Solar viajan en ÃƒÂ³rbitas elÃƒÂ­pticas, que son como cÃƒÂ­rculos estirados u ÃƒÂ³valos cerrados. Es como si estuvieran atados al Sol con una cuerda que no los deja escapar. En cambio, los objetos interestelares no estÃƒÂ¡n atados a nuestra estrella. Tienen tanta energÃƒÂ­a y se mueven tan rÃƒÂ¡pido que la gravedad del Sol no es lo suficientemente fuerte para atraparlos. Llegan desde el espacio profundo, se acercan un poco al Sol porque su gravedad desvÃƒÂ­a un poco su camino, y luego salen disparados de vuelta hacia el infinito oscuro. Es como lanzar una pelota muy rÃƒÂ¡pido por un tubo curvo: entra, gira un poco y sale disparada por el otro lado sin detenerse.',
      'El primer visitante interestelar que los cientÃƒÂ­ficos descubrieron se llamÃƒÂ³ \'Oumuamua, que significa "el primer mensajero de lejos" en idioma hawaiano, descubierto en el aÃƒÂ±o dos mil diecisiete. Fue un descubrimiento verdaderamente emocionante porque, aunque los astrÃƒÂ³nomos llevaban dÃƒÂ©cadas teorizando que estos objetos existÃƒÂ­an y que debÃƒÂ­an estar cruzando nuestro Sistema Solar todo el tiempo, nunca antes habÃƒÂ­amos logrado detectar uno. \'Oumuamua era un objeto sumamente extraÃƒÂ±o: tenÃƒÂ­a la forma de un cigarro muy alargado o tal vez un panqueque aplastado, algo que nunca habÃƒÂ­amos visto en los asteroides de nuestro propio vecindario estelar. Era como si el universo hubiera lanzado un bumerÃƒÂ¡n muy raro.',
      'Un par de aÃƒÂ±os despuÃƒÂ©s, en dos mil diecinueve, un astrÃƒÂ³nomo aficionado llamado Gennadiy Borisov descubriÃƒÂ³ el segundo objeto interestelar, al que llamaron el cometa 2I/Borisov. A diferencia de \'Oumuamua, que parecÃƒÂ­a una roca seca, Borisov se comportaba exactamente igual que los cometas de nuestro Sistema Solar: a medida que se acercaba al calor del Sol, el hielo en su superficie comenzÃƒÂ³ a derretirse y a evaporarse, formando una hermosa cola brillante de gas y polvo cÃƒÂ³smico. Esto fue asombroso porque nos demostrÃƒÂ³ que alrededor de otras estrellas tambiÃƒÂ©n se forman cometas de hielo muy parecidos a los nuestros. Los cientÃƒÂ­ficos estaban deslumbrados por la posibilidad de estudiar material real de otra estrella.',
      'Estudiar estos objetos es como recibir botellas con mensajes de las estrellas lejanas. Como los humanos todavÃƒÂ­a no tenemos la tecnologÃƒÂ­a necesaria para enviar naves espaciales a otros sistemas estelares (incluso viajando a velocidades increÃƒÂ­bles tardarÃƒÂ­amos decenas de miles de aÃƒÂ±os en llegar a la estrella mÃƒÂ¡s cercana), los objetos interestelares nos traen muestras gratis de otros mundos directamente a la puerta de nuestra casa. Al analizar la luz que reflejan y los gases que expulsan, podemos saber de quÃƒÂ© estÃƒÂ¡n hechos los planetas que orbitan estrellas a millones de aÃƒÂ±os luz de distancia. De esta manera, cada uno de ellos nos regala un pequeÃƒÂ±o pero vital pedazo del gran rompecabezas del inmenso y misterioso universo.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'Los astrÃƒÂ³nomos calculan que en este preciso instante hay al menos diez mil objetos interestelares del tamaÃƒÂ±o de \'Oumuamua cruzando dentro de la ÃƒÂ³rbita del planeta Neptuno. Son tantos porque cada estrella del universo expulsa millones de estas rocas cuando sus planetas se estÃƒÂ¡n formando, creando una gigantesca "sopa" de asteroides y cometas que vagan libres y sin rumbo por el inmenso y oscuro espacio interestelar a velocidades extremas e indetectables.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'La velocidad a la que viajan estos nÃƒÂ³madas cÃƒÂ³smicos es verdaderamente alucinante. \'Oumuamua entrÃƒÂ³ a nuestro Sistema Solar viajando a mÃƒÂ¡s de noventa mil kilÃƒÂ³metros por hora. Cuando pasÃƒÂ³ cerca del Sol, la gravedad de nuestra estrella lo acelerÃƒÂ³ como si fuera una resortera gigante, alcanzando una velocidad mÃƒÂ¡xima increÃƒÂ­ble de trescientos quince mil kilÃƒÂ³metros por hora. Ã‚Â¡Suficiente para cruzar la Tierra en pocos segundos, rompiendo todas las marcas y batiendo todos los rÃƒÂ©cords de rapidez que conocemos en nuestra propia casa estelar!' }
    ],
    fact: 'El nombre tÃƒÂ©cnico para clasificar a \'Oumuamua es 1I/2017 U1. La "I" en su nombre representa la palabra "Interestelar", y fue la primera vez en la historia de la astronomÃƒÂ­a que la UniÃƒÂ³n AstronÃƒÂ³mica Internacional tuvo que crear una categorÃƒÂ­a completamente nueva para nombrar a un objeto celestial. Antes de ÃƒÂ©l, solo existÃƒÂ­an las letras "A" para Asteroides y "C" para Cometas en nuestros catÃƒÂ¡logos oficiales mundiales, demostrando que este asteroide realmente revolucionÃƒÂ³ todas nuestras ideas preconcebidas sobre los viajes estelares y las nomenclaturas antiguas.',
  },
  {
    id: 'velocidad-escape',
    title: 'Velocidad de Escape',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_velocidad-escape.jpg',
    image: '/assets/interestelar/infographic_m1/hero_velocidad-escape.jpg',
    content: [
      'Imagina que estÃƒÂ¡s lanzando una pelota hacia arriba. Si la lanzas despacio, vuelve a caer a tus manos. Si la lanzas con mÃƒÂ¡s fuerza, sube mucho mÃƒÂ¡s alto antes de caer. Pero si pudieras lanzarla con una fuerza verdaderamente sobrehumana, llegarÃƒÂ­a un punto en el que la gravedad de la Tierra ya no podrÃƒÂ­a detenerla, y la pelota seguirÃƒÂ­a viajando hacia el espacio para siempre sin volver a caer nunca mÃƒÂ¡s. Esa velocidad mÃƒÂ¡gica a la que tienes que lanzar la pelota se conoce como "velocidad de escape", y cada planeta y estrella en el inmenso universo tiene la suya propia dependiendo estrechamente de cuÃƒÂ¡nta gravedad posea en su interior.',
      'Para escapar definitivamente de la Tierra, un enorme cohete espacial necesita viajar a once punto dos kilÃƒÂ³metros por segundo (Ã‚Â¡unos asombrosos cuarenta mil kilÃƒÂ³metros por hora!). A esa velocidad colosal, el cohete puede romper las pesadas y gigantescas cadenas invisibles de la gravedad terrestre y viajar hacia la Luna o hacia nuestro vecino rojo Marte. Pero si quisieras escapar del Sol y abandonar nuestro Sistema Solar para siempre jamÃƒÂ¡s, tendrÃƒÂ­as que viajar muchÃƒÂ­simo mÃƒÂ¡s rÃƒÂ¡pido, porque el Sol es tan monstruosamente masivo que su gravedad es abrumadoramente mÃƒÂ¡s fuerte que la diminuta gravedad de la Tierra. La velocidad de escape de nuestro brillante y candente Sol es de la asombrosa cantidad de seiscientos diecisiete kilÃƒÂ³metros por segundo.',
      'AquÃƒÂ­ es exactamente donde los solitarios objetos interestelares nos demuestran que, definitivamente, no son de por aquÃƒÂ­. Cuando los brillantes astrÃƒÂ³nomos midieron la velocidad extrema de \'Oumuamua y del gÃƒÂ©lido cometa Borisov, se dieron cuenta de inmediato de que viajaban increÃƒÂ­ble y absurdamente rÃƒÂ¡pido. Se movÃƒÂ­an a una velocidad astronÃƒÂ³mica mucho mayor que la ya altÃƒÂ­sima velocidad de escape de nuestro majestuoso Sol. Esto significa matemÃƒÂ¡ticamente que es fÃƒÂ­sicamente imposible e improbable que la fuerte gravedad del Sol los haya capturado alguna vez en su vida para formar parte estable de nuestro Sistema Solar; ellos siempre han sido viajeros completamente libres e indomables.',
      'Es casi igual que ver a un potentÃƒÂ­simo y ruidoso auto de carreras FÃƒÂ³rmula Uno pasar como un relÃƒÂ¡mpago por una tranquila y silenciosa zona escolar: por la velocidad extrema a la que va, sabes inmediata y certeramente que no pertenece a ese lugar y que solo estÃƒÂ¡ cruzando la cuadra velozmente. Las antiguas y famosas sondas Voyager, que fueron lanzadas con gran esfuerzo por la humanidad en los maravillosos aÃƒÂ±os setenta, tuvieron que usar ingeniosamente la inmensa gravedad de planetas gigantescos como JÃƒÂºpiter y Saturno para ganar suficiente velocidad adicional y lograr alcanzar, con mucha suerte, la velocidad de escape estrictamente necesaria para abandonar el Sistema Solar.',
      'La grandÃƒÂ­sima y profunda pregunta que los mejores cientÃƒÂ­ficos se hacen a diario es: Ã‚Â¿cÃƒÂ³mo lograron exactamente estos objetos naturales de hielo y roca alcanzar velocidades tan increÃƒÂ­blemente colosales en primer lugar? Creemos firmemente que fueron expulsados brutal y violentamente de sus lejanos sistemas estelares originales cuando planetas monstruosamente gigantes, similares al tamaÃƒÂ±o colosal de nuestro JÃƒÂºpiter, migraron velozmente o se movieron de sus cÃƒÂ¡lidas ÃƒÂ³rbitas primitivas, pateando furiosamente miles de asteroides y cometas hacia el frÃƒÂ­o y oscuro espacio profundo como si fueran simples pelotas de bÃƒÂ©isbol lanzadas en un gigantesco juego cÃƒÂ³smico.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'Incluso los oscuros y misteriosos agujeros negros tienen una velocidad de escape, Ã‚Â¡pero es muchÃƒÂ­simo mÃƒÂ¡s rÃƒÂ¡pida que la mÃƒÂ¡xima velocidad de la luz! Como nada en el inmenso y vasto universo puede viajar jamÃƒÂ¡s mÃƒÂ¡s rÃƒÂ¡pido que un simple rayo de luz (casi trescientos mil kilÃƒÂ³metros por segundo), absolutamente ninguna partÃƒÂ­cula, estrella o nave espacial, ni siquiera el fulgor de una explosiÃƒÂ³n estelar, puede escapar de la inmensa y titÃƒÂ¡nica atracciÃƒÂ³n gravitacional de un agujero negro una vez que cruza su frontera invisible y definitiva conocida universalmente como el horizonte de eventos.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'Las valientes sondas espaciales Voyager 1 y Voyager 2, diseÃƒÂ±adas y construidas por los talentosos ingenieros de la NASA, son actualmente los objetos hechos por el inteligente ser humano mÃƒÂ¡s rÃƒÂ¡pidos y alejados en el interminable espacio cÃƒÂ³smico. Viajan constantemente a unos diecisiete kilÃƒÂ³metros por segundo a travÃƒÂ©s de la densa y frÃƒÂ­a heliopausa, lo que significa que ya lograron superar ampliamente la durÃƒÂ­sima velocidad de escape necesaria para dejar el Sol. En unos miles de millones de aÃƒÂ±os, Ã‚Â¡quizÃƒÂ¡s unos simpÃƒÂ¡ticos alienÃƒÂ­genas en otro colorido sistema estelar las descubran y analicen cruzando su mundo como sus propios y diminutos objetos interestelares artificiales!' }
    ],
    fact: 'Para calcular precisamente la grandÃƒÂ­sima velocidad de escape de cualquier lejano planeta o luminosa estrella, los fÃƒÂ­sicos experimentados usan una ecuaciÃƒÂ³n matemÃƒÂ¡tica muy antigua y bellamente elegante: la raÃƒÂ­z cuadrada de dos veces la famosa constante gravitacional universal de Newton, sabiamente multiplicada por la masa entera del astro, y finalmente dividida por el radio o distancia exacta desde el centro profundo del mismo planeta. Esta mÃƒÂ¡gica y probada fÃƒÂ³rmula matemÃƒÂ¡tica nos permite afortunadamente planear nuestras misiones espaciales de forma muy segura y cuidadosa, asegurando que nuestros astronautas humanos puedan ir libremente a las estrellas y volver felices sin quedarse tristemente atrapados en la abismal soledad del espacio profundo.',
  },
  {
    id: 'orbita-hiperbolica',
    title: 'Ãƒâ€œrbitas HiperbÃƒÂ³licas',
    color: '#64FFDA',
    btnImage: '/assets/interestelar/infographic_m1/btn_orbita-hiperbolica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_orbita-hiperbolica.jpg',
    content: [
      'Piensa imaginativamente en las largas y retorcidas vÃƒÂ­as de metal de una gigante montaÃƒÂ±a rusa. Si la pesada vÃƒÂ­a forma un cÃƒÂ­rculo perfecto o un ÃƒÂ³valo continuo y cerrado, el rÃƒÂ¡pido carrito darÃƒÂ¡ cientos de vueltas infinitamente, pasando repetidamente por el mismo lugar divertido una y otra vez sin parar. AsÃƒÂ­ de maravilloso y predecible funcionan las ÃƒÂ³rbitas planetarias elÃƒÂ­pticas de los redondos planetas como nuestra querida Tierra, que obedientemente repiten su camino circular alrededor del candente Sol aÃƒÂ±o tras aÃƒÂ±o, en un baile de millones de aÃƒÂ±os. Pero, Ã‚Â¿quÃƒÂ© pasarÃƒÂ­a sorprendentemente si la larga vÃƒÂ­a de la montaÃƒÂ±a rusa nunca jamÃƒÂ¡s se cierra, sino que viene de muy, muy lejos, hace una vertiginosa curva extremadamente pronunciada y luego simplemente se pierde en el horizonte vacÃƒÂ­o y nebuloso? Esa extraÃƒÂ±a trayectoria estirada y siempre abierta, que no tiene fin y que absolutamente nunca se repite en el tiempo cÃƒÂ³smico, es lo que en rigurosas matemÃƒÂ¡ticas y maravillosa fÃƒÂ­sica conocemos comÃƒÂºnmente como una increÃƒÂ­ble ÃƒÂ³rbita hiperbÃƒÂ³lica.',
      'Para los atentos astrÃƒÂ³nomos, la forma puramente geomÃƒÂ©trica del camino largo que sigue ÃƒÂ¡gilmente un oscuro objeto brillante es la invaluable huella digital cÃƒÂ³smica y definitiva para saber exactamente de dÃƒÂ³nde viene originalmente. Utilizan inteligentemente un nÃƒÂºmero especial, preciso y revelador llamado "excentricidad matemÃƒÂ¡tica" para lograr medir quÃƒÂ© tan estirada, redonda o abierta es una ÃƒÂ³rbita. Si el valor de excentricidad es exactamente cero, el camino trazado es un cÃƒÂ­rculo redondo perfecto. Si astutamente se ubica entre cero y uno, el recorrido curvo es una larga y suave elipse cerrada, como el dulce viaje de todos nuestros amados planetas. Pero, si la medida de la excentricidad resulta ser mucho mayor que uno entero, los cÃƒÂ¡lculos de las brillantes matemÃƒÂ¡ticas nos dicen sin dudar que el camino estÃƒÂ¡ total y ampliamente abierto, y que ademÃƒÂ¡s forma una elegante hipÃƒÂ©rbola matemÃƒÂ¡tica. Esto constituye la prueba definitiva e innegablemente contundente de que el rÃƒÂ¡pido objeto proviene directamente del lejano y misterioso espacio interestelar profundo.',
      'Cuando descubrieron emocionado al lejano y solitario \'Oumuamua, los modernos e hiper veloces computadores cuÃƒÂ¡nticos del observatorio astronÃƒÂ³mico calcularon apresuradamente su larga trayectoria, basÃƒÂ¡ndose minuciosamente en las detalladas y difusas fotos que los potentes telescopios tomaron pacientemente durante varios largos dÃƒÂ­as. El increÃƒÂ­ble e innegable resultado final dejÃƒÂ³ a todos los expertos cientÃƒÂ­ficos con la boca grandemente abierta, ya que su rara excentricidad calculada era de un contundente uno punto dos (1.2). Esto era algo total y espectacularmente inaudito e histÃƒÂ³ricamente nunca antes registrado en toda la fascinante historia de la paciente observaciÃƒÂ³n astronÃƒÂ³mica humana. Era exactamente la firma matemÃƒÂ¡tica celestial y perfecta de una impecable trayectoria orbital hiperbÃƒÂ³lica, lo cual terminÃƒÂ³ confirmando rotundamente y sin admitir ninguna minÃƒÂºscula sombra de duda que el rocoso \'Oumuamua venÃƒÂ­a directo desde un misterioso lugar situado mÃƒÂ¡s allÃƒÂ¡ de las invisibles fronteras de nuestro propio Sistema Solar, y que en un instante muy pronto nos abandonarÃƒÂ­a precipitadamente para siempre jamÃƒÂ¡s en un solitario y largo viaje estelar sin retorno posible.',
      'Por su destacada parte, el brillante y frÃƒÂ­o cometa Borisov, tuvo la suerte de obtener un nÃƒÂºmero de mediciÃƒÂ³n aÃƒÂºn mÃƒÂ¡s grandiosamente asombroso. Su salvaje excentricidad final fue velozmente calculada en mÃƒÂ¡s de la espectacular cifra de tres punto tres (3.3). Esto significa claramente para todos los estudiosos que su helado y rÃƒÂ¡pido camino era muchÃƒÂ­simo mÃƒÂ¡s directo y recto a travÃƒÂ©s de nuestra zona, y que virtualmente entraba y salÃƒÂ­a fugazmente de nuestro familiar sistema casi exactamente como un fulminante y destructivo disparo rÃƒÂ¡pido, desplazÃƒÂ¡ndose ÃƒÂ¡gilmente en lÃƒÂ­nea recta y sufriendo a duras penas una muy pequeÃƒÂ±a, diminuta y breve desviaciÃƒÂ³n de curso cuando pasÃƒÂ³ raudamente cerca del hirviente e inmenso calor del gigante Sol. Esta extrema, extraÃƒÂ±a y sÃƒÂºper hiperbÃƒÂ³lica trayectoria tan particular nos ayudÃƒÂ³ enormemente a deducir lÃƒÂ³gicamente que Borisov viajaba previamente a una velocidad inicial increÃƒÂ­ble y vertiginosamente rÃƒÂ¡pida por muchos e incontables milenios, mucho tiempo antes de lograr siquiera sentir mÃƒÂ­nimamente el enorme y absorbente empujÃƒÂ³n de la gravedad de nuestra estrella, demostrando asÃƒÂ­ cabalmente la grandiosa e inconmensurable inmensidad de la energÃƒÂ­a natural de los viajeros objetos interestelares.',
      'Pero claro, lograr trazar precisa y fielmente todas estas increÃƒÂ­bles ÃƒÂ³rbitas curvas e hiperbÃƒÂ³licas nunca es una tarea rÃƒÂ¡pida, fÃƒÂ¡cil o regalada. Se requiere imperativamente que enormes telescopios sÃƒÂºper gigantes alrededor de todo el mundo entero, e incluso aquellos maravillosos telescopios artificiales flotando silenciosamente en el negro espacio, tomen cientos o miles de grandiosas fotografÃƒÂ­as nÃƒÂ­tidas y sÃƒÂºper precisas a lo largo de varias duras y agotadoras semanas, ÃƒÂºnicamente para medir exactamente, milÃƒÂ­metro a milÃƒÂ­metro, cÃƒÂ³mo se mueve silenciosamente ese brillante y escurridizo punto de tenue luz directamente contra un fondo gigantesco y fijo de millones de distantes estrellas lejanas y resplandecientes. Una vez que ya tenemos listos todos y cada uno de esos diminutos puntos conectados perfectamente con lÃƒÂ­neas matemÃƒÂ¡ticas, logramos armar un plano igualito que en un libro de dibujo escolar. Luego, las impresionantes y muy sÃƒÂ³lidas leyes fundamentales de la gravedad universal, las mismas que fueron magistralmente descubiertas por el sabio Isaac Newton y brillantemente mejoradas por Johannes Kepler, nos permitirÃƒÂ¡n mÃƒÂ¡gicamente predecir exactamente y con absoluto rigor en quÃƒÂ© lejano sitio interestelar oscuro estarÃƒÂ¡ finalmente el veloz objeto dentro de un increÃƒÂ­ble lapso de mil o dos mil largos aÃƒÂ±os en el distante y lejano futuro.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'AdemÃƒÂ¡s de las muy comunes y previsibles ÃƒÂ³rbitas elÃƒÂ­pticas, que siempre son trayectorias cerradas repetitivas, y de las sÃƒÂºper impresionantes ÃƒÂ³rbitas hiperbÃƒÂ³licas, que son caminos siempre abiertos, veloces y directos, existe felizmente en la enorme naturaleza del cosmos una frontera matemÃƒÂ¡tica completamente frÃƒÂ¡gil y muy exacta que es popularmente llamada ÃƒÂ³rbita parabÃƒÂ³lica pura. Se distingue sencillamente porque milagrosamente tiene una excentricidad natural que es exacta e increÃƒÂ­blemente igual a un nÃƒÂºmero uno absoluto (1.0). Resulta ser que muchos rarÃƒÂ­simos y helados cometas de un larguÃƒÂ­simo periodo de retorno, provenientes todos de la frÃƒÂ­a y remota Nube de Oort (que es la enorme y congelada frontera mÃƒÂ¡s exterior, invisible y silenciosa de nuestro gigantesco sistema de planetas) logran asombrosamente viajar durante miles de largos y lentos aÃƒÂ±os con unas trayectorias que resultan ser casi perfectamente parabÃƒÂ³licas en sus trazos y recorridos mÃƒÂ¡s solitarios y distantes.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'La increÃƒÂ­ble y durÃƒÂ­sima sonda robÃƒÂ³tica espacial New Horizons de la NASA, aquella hermosa e inteligente nave pionera que recientemente visitÃƒÂ³ y fotografiÃƒÂ³ muy detalladamente a los planetas helados en los confines oscuros, como PlutÃƒÂ³n o la singular roca doble Arrokoth allÃƒÂ¡ bien lejos en el cinturÃƒÂ³n sombrÃƒÂ­o, viaja valientemente en nuestros tiempos actuales inmersa en una larga e impresionante ÃƒÂ³rbita rÃƒÂ¡pida y verdaderamente hiperbÃƒÂ³lica, provocada artificialmente hace pocos aÃƒÂ±os tanto por los monstruosos cohetes pesados que la lanzaron violentamente hacia arriba desde nuestra Tierra, como tambiÃƒÂ©n gracias a un enorme y necesario empujÃƒÂ³n extra que logrÃƒÂ³ hÃƒÂ¡bilmente recibir al pasar cerca de la masiva gravedad gravitacional del planeta JÃƒÂºpiter. Su impresionante y precisa excentricidad orbital con relaciÃƒÂ³n al enorme Sol es ahora y para siempre lÃƒÂ³gicamente superior al nÃƒÂºmero 1 absoluto, lo que significa categÃƒÂ³ricamente que su ÃƒÂºltimo destino final ya inevitable serÃƒÂ¡, inexorablemente, acabar flotando eternamente y solitaria inmersa en el insoportable frÃƒÂ­o de la nada, viajando rumbo al profundo espacio interestelar invisible.' }
    ],
    fact: 'Resulta asombrosamente increÃƒÂ­ble que toda la dificilÃƒÂ­sima y densa matemÃƒÂ¡tica astronÃƒÂ³mica necesaria para intentar comprender correctamente las enormes ÃƒÂ³rbitas misteriosas de todos nuestros lejanos planetas, de los frÃƒÂ­os cometas espaciales, de asteroides escurridizos e inclusive del paso veloz de los pequeÃƒÂ±os objetos interestelares hiper veloces fue brillantemente detallada, explicada y descrita para toda la historia mundial por el gran e inigualable genio y sÃƒÂºper cientÃƒÂ­fico britÃƒÂ¡nico Isaac Newton en su grandioso y pesado libro magistral titulado Philosophiae Naturalis Principia Mathematica (los famosos y mÃƒÂ­ticos "Principia"), mÃƒÂ¡gicamente publicado y aclamado por sus eruditos lectores ilustrados en el antiquÃƒÂ­simo y lejano aÃƒÂ±o de mil seiscientos ochenta y siete.',
  },
  {
    id: 'catalogo-nomadas',
    title: 'El CatÃƒÂ¡logo de NÃƒÂ³madas',
    color: '#FF9100',
    btnImage: '/assets/interestelar/infographic_m1/btn_catalogo-nomadas.jpg',
    image: '/assets/interestelar/infographic_m1/hero_catalogo-nomadas.jpg',
    content: [
      'A pesar del increÃƒÂ­ble e innegable hecho de que el majestuoso y titÃƒÂ¡nico universo exterior resulta ser siempre asombrosamente inmenso, gigantesco en todos los sentidos y que ya felizmente posee incontables miles de extensos millones de largos aÃƒÂ±os de profunda y compleja antigÃƒÂ¼edad estelar, nuestro pequeÃƒÂ±o y modesto catÃƒÂ¡logo humano oficial sobre todos los escasos objetos interestelares cientÃƒÂ­ficamente confirmados y ratificados, sigue siendo lamentablemente muy minÃƒÂºsculo, pobre y chiquito: hasta el maravilloso momento astronÃƒÂ³mico actual, solamente los sabios astrÃƒÂ³nomos cuentan confiadamente con el absoluto conocimiento y registro de apenas dos ÃƒÂ­nfimos visitantes y extraÃƒÂ±os nÃƒÂ³madas que son real y verdaderamente cÃƒÂ³smicos, legÃƒÂ­timos e indiscutibles. El fantÃƒÂ¡stico, raro y muy renombrado primero de todos ellos es ciertamente nuestro veloz amigo \'Oumuamua, que era justamente la rocosa y muy extraÃƒÂ±a piedra interestelar seca, rojiza y excesivamente alargada que descubrimos con enorme y jubilosa sorpresa en nuestro glorioso y movido aÃƒÂ±o 2017. Y seguidamente, el ruidoso segundo viajero cÃƒÂ³smico es innegablemente 2I/Borisov, el activo, polvoriento y muy ruidoso y congelado cometa interestelar brillantemente descubierto en 2019. Tristemente, puede parecernos a primera vista como un nÃƒÂºmero inmensamente pobre o desesperadamente escaso de visitantes espaciales, pero lograr encontrar dificultosamente apenas un par de diminutos, pequeÃƒÂ±ÃƒÂ­simos y lejanos objetos rocosos mientras tratamos de explorar con los ojos la monstruosa e inabarcable oscuridad perpetua de todo un silencioso e invisible universo entero y gÃƒÂ©lido es francamente una enorme, colosal y casi ridÃƒÂ­culamente imposible tarea.',
      'Sin embargo, afortunada e innegablemente, el simple y frÃƒÂ­o hecho estadÃƒÂ­stico de que lamentablemente nosotros, mediante nuestros lentos ojos y pesados lentes de enormes telescopios modernos y antiguos, apenas hayamos podido tener hasta la gran y maravillosa fecha, la dicha y tremenda oportunidad tecnolÃƒÂ³gica de observar cuidadosamente a dos solitarios, veloces e impresionantes astros interestelares, nunca y bajo absolutamente ningÃƒÂºn curioso motivo o ingenua circunstancia esto significa automÃƒÂ¡ticamente que en verdad no existan afuera muchÃƒÂ­simos millones mÃƒÂ¡s de velocÃƒÂ­simos hermanos esparcidos y vagando por la helada negrura galÃƒÂ¡ctica. De hecho, los sabios, experimentados y brillantes astrofÃƒÂ­sicos y los talentosos y analÃƒÂ­ticos ingenieros astronÃƒÂ³micos planetarios han utilizado recientemente complicadÃƒÂ­simos, modernos e increÃƒÂ­blemente precisos y sofisticados modelos cibernÃƒÂ©ticos hiper matemÃƒÂ¡ticos para poder calcular y finalmente lograr estimar estadÃƒÂ­sticamente el enorme tamaÃƒÂ±o posible de toda su inmensa poblaciÃƒÂ³n. Afortunadamente, ellos siempre creen firmemente que en verdad el vastÃƒÂ­simo y solitario y congelado universo del enorme espacio interestelar que nos rodea silenciosamente en las afueras estelares estÃƒÂ¡ hoy verdaderamente atestado y completamente lleno, y muy abarrotado hasta mÃƒÂ¡s no poder, de estos misteriosos asteroides y oscuros pequeÃƒÂ±os cuerpos que viajan a la velocidad de la luz como oscuros objetos.',
      'Pero entonces los grandes chicos listos del mundo seguramente se preguntarÃƒÂ¡n astutamente de la manera mÃƒÂ¡s lÃƒÂ³gica posible: Ã‚Â¿Si allÃƒÂ¡ fuera hay en realidad tantas, pero tantÃƒÂ­simas, increÃƒÂ­bles rocas de otros mundos nÃƒÂ³madas volando cerca nuestro todo el bendito dÃƒÂ­a, por quÃƒÂ© nunca somos capaces de verlos clara y repetidamente a diario iluminados a nuestro lado? Pues sencillamente Ã‚Â¡porque este universo infinito e insondable es tan descomunal, bestial y espantosamente grande y oscuro mientras ellos resultan ser extremadamente, exagerada e insoportablemente pequeÃƒÂ±os y frÃƒÂ­os! A enorme diferencia de lo que sucede con las gigantes, preciosas y calientes estrellas brillantes, que afortunada y majestuosamente siempre emiten hacia todos lados su inmensa luz propia a millones de distancias inmensas, estos asteroides interestelares tristemente casi siempre son opacos y muy oscuros, apenas como un trozo de viejo e invisible asfalto cÃƒÂ³smico que solo tÃƒÂ­midamente refleja muy dÃƒÂ©bilmente una pequeÃƒÂ±ÃƒÂ­sima, casi nula, y mÃƒÂ­sera partecita imperceptible y borrosa de luz, originada por el cÃƒÂ¡lido fulgor de nuestro resplandeciente e inmenso Sol.',
      'En medio de todo esto, existe sorprendentemente una muy espectacular, vibrante y ciertamente extraÃƒÂ±ÃƒÂ­sima, curiosa e intensa pequeÃƒÂ±a sub-categorÃƒÂ­a menor de todos los que pudiesen ser considerados grandes y famosos posibles visitantes espaciales que son denominados de esta increÃƒÂ­ble clase: nos referimos con enorme fascinaciÃƒÂ³n a los deslumbrantes y ruidosos meteoros y bÃƒÂ³lidos voladores relampagueantes que caen diariamente como estrellas. En nuestro movido y agitado aÃƒÂ±o astronÃƒÂ³mico particular e histÃƒÂ³rico de dos mil catorce (2014), sucediÃƒÂ³ un rÃƒÂ¡pido evento: un asombrosamente rÃƒÂ¡pido, pequeÃƒÂ±o e insignificante meteoro que tenÃƒÂ­a mucho menos de apenas un escaso metro de diÃƒÂ¡metro iluminado estallÃƒÂ³ ensordecedora y excesivamente brillante y fuerte por los aires de la Tierra, justo al quemarse violentamente debido a la extrema fricciÃƒÂ³n intensa en la pesada atmÃƒÂ³sfera, muy lejos sobre las tranquilas aguas marinas del grandÃƒÂ­simo y pacÃƒÂ­fico OcÃƒÂ©ano, cerca de PapÃƒÂºa. Tiempo despuÃƒÂ©s los observadores encontraron que el meteoro IM1 era interestelar por su altÃƒÂ­sima energÃƒÂ­a y su rapidez en velocidad hiperbÃƒÂ³lica.',
      'Para cuando miremos maravillosamente esperanzados, optimistas y felices hacia el brillante gran futuro, nuestro propio catÃƒÂ¡logo nacional, mundial e interplanetario entero de sorprendentes nÃƒÂ³madas, asteroides y fantÃƒÂ¡sticos cometas extraÃƒÂ±os que hemos contabilizado laboriosamente, estÃƒÂ¡ innegable y gloriosamente destinado a crecer incesante, grande y explosivamente sin ninguna duda cientÃƒÂ­fica posible. Esto serÃƒÂ¡ indudable, certera e imparablemente impulsado en buena medida gracias a la increÃƒÂ­ble inauguraciÃƒÂ³n e inicio de uso masivo de las prÃƒÂ³ximas grandÃƒÂ­simas y muy esperadas nuevas e impresionantes generaciones masivas de gigantescos, enormes, extremadamente finos y sumamente sÃƒÂºper y muy sensibles modernos observatorios terrestres estelares e instrumentales telescopios.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'Curiosa, mÃƒÂ¡gica y verdaderamente asombrosa e inusualmente el ÃƒÂºnico, singular, gran primer e importante humano solitario que llegÃƒÂ³ a ser oficialmente el afortunado y mundial descubridor en solitario del famosÃƒÂ­simo, raro y muy importante segundo hermoso, inmenso y lejano objeto alienÃƒÂ­gena e interestelar 2I/Borisov no fue para nada nadie importante. Sorprendentemente ÃƒÂ©l no era absolutamente ningÃƒÂºn afamado profesor, ni trabaja hoy tampoco dentro de inmensos laboratorios astronÃƒÂ³micos que operan grandes equipos o para mega agencias, enormes gobiernos ricos, sino que en cambio el noble y paciente Gennadiy resulta simplemente un aficionado con amor.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'Este extraÃƒÂ±o, famoso e intrigante nombre hawaiano del primer gran objeto, el alargadÃƒÂ­simo \'Oumuamua, verdaderamente significa literal, cultural y muy textualmente "aquel increÃƒÂ­ble descubridor explorador solitario y el lejano mensajero celeste inexplorado que ha logrado, mÃƒÂ¡gica y presuroso, llegar de modo anticipado y muy primero a nuestras puertas desde el remoto paÃƒÂ­s mÃƒÂ¡s lejano de todos" simplemente en la bonita y melodiosa lengua original de origen hawaiano, y se seleccionÃƒÂ³ y eligiÃƒÂ³ cuidadosamente y hermosamente a pulso.' }
    ],
    fact: 'Muchos biÃƒÂ³logos celestes y grandes pensadores, inteligentes biÃƒÂ³logos espaciales y cientÃƒÂ­ficos soÃƒÂ±adores astrofÃƒÂ­sicos y filÃƒÂ³sofos teÃƒÂ³ricos logran verdaderamente especular siempre, ardiente, activa y muy apasionadamente sobre todas y cada una de las emocionantes variantes cÃƒÂ³smicas posibles de la famosÃƒÂ­sima y algo aventurada teorÃƒÂ­a radical e importante que es llamada la de la "panspermia biolÃƒÂ³gica", que a fin de cuentas es en resumidas y escuetas palabras la inmensa idea y sospecha firme de que gran parte de toda la vida microscÃƒÂ³pica bÃƒÂ¡sica e inicial pudo haber llegado a la Tierra en pedazos cÃƒÂ³smicos.',
  },
  {
    id: 'deteccion-pan-starrs',
    title: 'Pan-STARRS y Telescopios',
    color: '#448AFF',
    btnImage: '/assets/interestelar/infographic_m1/btn_deteccion-pan-starrs.jpg',
    image: '/assets/interestelar/infographic_m1/hero_deteccion-pan-starrs.jpg',
    content: [
      'Ponte feliz a jugar, imagina y piensa por un buen rato lo muy difÃƒÂ­cil y verdaderamente titÃƒÂ¡nico que asombrosamente debe de resultar cazar veloces objetos misteriosos, invisibles, frÃƒÂ­os y muy interestelares volando y pasando cerca velozmente; de verdad que la hazaÃƒÂ±a es enormemente similar a la desesperante y agotadora tarea que serÃƒÂ­a para intentar, como fotÃƒÂ³grafo humano atrapar repetida y nÃƒÂ­tidamente a un mÃƒÂ­nimo y pequeÃƒÂ±o mosquito y pequeÃƒÂ±ÃƒÂ­simo insecto volador veloz y muy escurridizo que cruza corriendo como un misil, volando extremadamente y de modo imparable y muy veloz pasando raudo y silencioso directamente por en medio y el fondo mismo de una casa en habitaciÃƒÂ³n completamente negra e increÃƒÂ­blemente sumida en oscuridad plena. Para tal logro, los telescopios, cÃƒÂ¡maras fotogrÃƒÂ¡ficas celestes y observatorios de hoy en dÃƒÂ­a son extremadamente poderosos.',
      'Semejante hazaÃƒÂ±a inmensa y gran milagro astronÃƒÂ³mico, es por ello, el sistema robÃƒÂ³tico Pan-STARRS. Su maravillosa magia es como la de un solo inmenso y grandÃƒÂ­simo, monstruoso ojo sÃƒÂºper biÃƒÂ³nico con mirada telescÃƒÂ³pica que logra verdaderamente siempre escanear robÃƒÂ³tica y muy pacientemente en repetidos instantes por milisegundos todo y cada uno de los grandes misteriosos, negros y amplÃƒÂ­simos mil y un metros cÃƒÂºbicos y oscuros inexplorados rincones de aquel inmenso y bello cielo nocturno, observando siempre cada madrugada disponible, de una muy extensa y repetitiva e inteligente e iterativa forma rÃƒÂ¡pida y continuamente cÃƒÂ­clica mes, incesantemente mes y aÃƒÂ±o, a toda y cada una de nuestras milenarias y viejas grandes estrellas. Su inmensa y gran cÃƒÂ¡mara digital acoplada, instalada a su frente, resulta de ser en el fondo una brillante maravilla mecÃƒÂ¡nica, pues tiene mÃƒÂ¡s de mil enormes millones increÃƒÂ­bles de puntos sensibles de la misma luz.',
      'Una vez mÃƒÂ¡s, durante esa fatÃƒÂ­dica noche histÃƒÂ³rica, cuando asombrosa e inusualmente toda la gigantesca e incansable gran red interconectada cibernÃƒÂ©ticamente por los sensores ÃƒÂ³pticos de las veloces lentes de los potentes e inmensos ordenadores y supercomputadores masivos acoplados directamente en un punto a la estructura ÃƒÂ³ptica de Pan-STARRS detectÃƒÂ³ instantÃƒÂ¡neamente en alerta el paso rÃƒÂ¡pido y movimiento extraÃƒÂ±ÃƒÂ­simo, incomprensible e indescifrable inicial de un apenas detectable, ÃƒÂ­nfimo y pequeÃƒÂ±o punto estelar difuso y muy extraÃƒÂ±o de pequeÃƒÂ±ÃƒÂ­sima, casi nula luz moviÃƒÂ©ndose, corriendo y escapando silencioso, solo a una extraÃƒÂ±a y tremenda velocidad extremadamente monstruosa, inusualmente altÃƒÂ­sima para cruzar un cielo local, todo el potente, programado y veloz cerebro del inteligente sistema y software altamente automÃƒÂ¡tico levantÃƒÂ³ una visible alarma electrÃƒÂ³nica.',
      'De hecho, es por ello que precisamente para poder encontrar siempre y en repetidas innumerables ocasiones miles y miles de misteriosos, negros, veloces y oscuros pequeÃƒÂ±ÃƒÂ­simos objetos fugaces estelares e invisibles en medio del mÃƒÂ¡s frÃƒÂ­o, vacÃƒÂ­o cÃƒÂ³smico interminable de la nada negra y en gran y pesada desesperaciÃƒÂ³n galÃƒÂ¡ctica, debemos como civilizaciÃƒÂ³n inmensamente moderna continuar sin descanso construyendo aÃƒÂ±o tras incesante y caluroso aÃƒÂ±o, muchos y muy potentes, nuevos y mejores colosales y extremadamente ultra y grandes monstruosos gigantes de metales robÃƒÂ³ticos con inmensas cÃƒÂ¡maras sÃƒÂºper sensibles que logran atrapar con una destreza espectacular fotones ÃƒÂºnicos, como el de HawÃƒÂ¡i o el Vera C. Rubin en Chile.',
      'A estas mismas increÃƒÂ­bles y casi monstruosas e inconcebibles altitudes de desarrollo tecnolÃƒÂ³gico estelar de astronomÃƒÂ­a moderna y cibernÃƒÂ©tica del momento del progreso de nuestros aparatos, para nosotros en verdad resulta ser maravillosamente inaudita la simple y clara verdad evidente de que, para que el maravilloso, complejo y largo y oscuro futuro se abra ante el ingenio cÃƒÂ³smico, los mÃƒÂ¡s brillantes, inteligentes, entusiastas y siempre muy soÃƒÂ±adores increÃƒÂ­bles cientÃƒÂ­ficos terrÃƒÂ­colas del gran mundo, y las mentes, ingenieros e informÃƒÂ¡ticos astrÃƒÂ³nomos en realidad se encuentran verdaderamente muy hiper y demasiado ansiosos en sobremanera maravillados.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'Resulta asombrosamente increÃƒÂ­ble de creer verdaderamente a simple vista y a primer entendimiento tÃƒÂ©cnico estelar, y el hecho grandioso de que una inmensa y pesadÃƒÂ­sima sola y gran lente astronÃƒÂ³mica con su cÃƒÂ¡mara digital robÃƒÂ³tica fotogrÃƒÂ¡fica acoplada para el gigantesco y colosal proyecto e iniciativa observadora global y sudamericana del gran mega Telescopio Observatorio del futuro Vera C. Rubin es gigantescamente enorme.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'IncreÃƒÂ­blemente, cada grandiosa, extensa, gigantesca y laboriosa noche frÃƒÂ­a cuando la gran mÃƒÂ¡quina observa una pequeÃƒÂ±ÃƒÂ­sima, lejana y solitaria diminuta e imperceptible estrella, la computadora gigantesca debe lograr procesar una montaÃƒÂ±a de fotos. La velocidad extrema y el movimiento propio del objeto que capturÃƒÂ³ mÃƒÂ¡gicamente su ojo, demostrÃƒÂ³ matemÃƒÂ¡ticamente y geomÃƒÂ©tricamente que venÃƒÂ­a de lejos y se alejaba mÃƒÂ¡s aprisa.' }
    ],
    fact: 'Resulta indiscutiblemente fantÃƒÂ¡stico y por consiguiente muy digno y enorme de ser elogiado y destacado en toda circunstancia histÃƒÂ³rica con gran pompa e inmensa fanfarria festiva, y tambiÃƒÂ©n de saber recordar plenamente que el genial y costosÃƒÂ­simo observatorio del grandioso invento del famoso sÃƒÂºper y muy sensible gran lente telescopio espacial volador infrarrojo y sÃƒÂºper oscuro del inmenso espacio estelar, el grandioso e inigualable y espectacular colosal telescopio de oro y cristal espacioso llamado ingeniosamente James Webb espacial es el gran rey y un verdadero mago del espacio, preparado y dispuesto.',
  },
  {
    id: 'composicion-quimica',
    title: 'ComposiciÃƒÂ³n QuÃƒÂ­mica',
    color: '#FF80AB',
    btnImage: '/assets/interestelar/infographic_m1/btn_composicion-quimica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_composicion-quimica.jpg',
    content: [
      'En efecto, el lograr y ser inteligentemente muy capaces de llegar a saber maravillosamente por mÃƒÂ©todos a distancia sobre quÃƒÂ© increÃƒÂ­ble conjunto de oscuros, preciosos y extraÃƒÂ±os metales, hielos o polvo antiguo estÃƒÂ¡n exactamente en el interior oscurÃƒÂ­simo y profundamente frÃƒÂ­os de todos estos escurridizos, locos, veloces, distantes y extraÃƒÂ±ÃƒÂ­simos grandes pequeÃƒÂ±os asteroides del oscuro universo interior estelar y frÃƒÂ­o de los lejanos y enigmÃƒÂ¡ticos pequeÃƒÂ±os y silenciosos objetos galÃƒÂ¡cticos interestelares voladores, puede ser comparado con adivinar ingredientes.',
      'Posterior y verdaderamente en su momento luego, cuando los entusiasmados cientÃƒÂ­ficos y maravillosos, inteligentes e insaciables astrÃƒÂ³nomos sÃƒÂºper calificados astrofÃƒÂ­sicos, en todo momento decidieron audazmente e intencionalmente, aplicando y desarrollando la inmensa, muy grandiosa e inconfundible e indispensable tÃƒÂ©cnica tan precisa y analÃƒÂ­tica de espectroscopia que aplicaron a \'Oumuamua, verdaderamente hallaron grandes y estrepitosos choques, asombros y mÃƒÂºltiples sorpresas abrumadoramente increÃƒÂ­bles e inquietantes: encontraron y hallaron mÃƒÂ¡gicamente que la roca interestelar para siempre no expulsaba absolutamente gases ni soltaba un solo polvo brillante como lo hacen habitualmente de manera ruidosa y muy comÃƒÂºn en sus largos recorridos ardientes cometas. Se parece que lo friÃƒÂ³ el universo y los potentes, destructivos y muy potentes, fuertes rayos del intenso cosmos le dieron una piel dura, asada de color rojizo viejo oscuro.',
      'Pero sin embargo, para muchÃƒÂ­simos atÃƒÂ³nitos estudiosos de los lejanos asteroides y de los grandÃƒÂ­simos hielos de la remota y negra historia profunda cÃƒÂ³smica y estelar espacial brillante y veloz, un asombroso y enorme nuevo \'Oumuamua guardaba hermÃƒÂ©ticamente y en total ocultismo frÃƒÂ­o otro inmenso misterio abismal y asombroso muy inesperado y colosal misterioso e increÃƒÂ­ble secreto, de aquellos misterios gigantes oscuros astronÃƒÂ³micos invisibles incomprensibles de los que casi literalmente volviÃƒÂ³ totalmente deslumbrados y verdaderamente casi locos y muy perplejos a absolutamente todos y cada uno de los mÃƒÂ¡s veteranos, ancianos y famosos genios y grandes matemÃƒÂ¡ticos y todos y cada uno grandÃƒÂ­simos, notables cientÃƒÂ­ficos y expertos y sabios grandes fÃƒÂ­sicos modernos estelares y tambiÃƒÂ©n muchos famosos planetarios observadores.',
      'Para variar, y de manera verdaderamente contrastante y rotundamente muy opuesta al silencio estelar, la apariciÃƒÂ³n del caso del segundo, increÃƒÂ­ble y verdaderamente ruidoso helado segundo visitante estelar fugaz e inconfundible asteroide cÃƒÂ³smico que era en verdad el ruidoso gigante cometa interestelar interestelar estelar llamado el famoso 2I/Borisov, fue un evento estelar abismal y maravillosamente completamente grandioso, muy visible, activo, colosal diferente diametralmente abismal y absolutamente e inconmensurablemente muchÃƒÂ­simo mÃƒÂ¡s, muchÃƒÂ­simo pero muy muchÃƒÂ­simo mÃƒÂ¡s sencillÃƒÂ­simo y mÃƒÂ¡s increÃƒÂ­blemente obvio y muy enormemente muchÃƒÂ­simo mÃƒÂ¡s descaradamente sumamente inmensamente descarado y grandiosamente obvio e increÃƒÂ­blemente sumamente obvio, tan maravillosamente abrumador y gigantescamente sencillo, enormemente muy, muy inmensa fÃƒÂ¡cil de leer estelarmente y tan muy fÃƒÂ¡cilmente.',
      'Es innegable y asombroso para nosotros que esta espectacular diferencia abismal colosal inmensamente extraÃƒÂ±a y radical gigantescamente quÃƒÂ­mica innegablemente resulte entonces ser indudablemente un gigantesco tesoro maravilloso cÃƒÂ³smico que resulta ser para nosotros verdaderamente para los grandes exploradores analÃƒÂ­ticos asombrosamente grandes gigantes de la quÃƒÂ­mica grandiosamente astrofÃƒÂ­sica innegable y espectacular. A niveles muy helados, colosales grandÃƒÂ­simas montaÃƒÂ±as extraÃƒÂ±ÃƒÂ­simas y lejanos oscurÃƒÂ­simos astros oscuros con muchÃƒÂ­simo monÃƒÂ³xido venenoso en la lejana enana rojiza u oscurÃƒÂ­sima estrella apagada de donde ÃƒÂ©l escapÃƒÂ³.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'Curiosamente el grandioso y astuto genio, un investigador astrofÃƒÂ­sico verdaderamente, asombrosa, inusualmente gigantesco profesor muy grande, increÃƒÂ­ble y de muchÃƒÂ­sima experiencia catedrÃƒÂ¡tica teÃƒÂ³rica mundial muy brillante de las ilustres estrellas planetarias y profesor experto genio de la famosÃƒÂ­sima universidad muy estadounidense norteamericana mundial gigante inmenso innegablemente enorme muy grandÃƒÂ­sima y sumamente gigante mundial y norteamericana Harvard llamado simpÃƒÂ¡tica y grandiosamente Avi, publicÃƒÂ³ grandÃƒÂ­sima, genial y abrumadoramente gigante inmensa teorÃƒÂ­a revolucionaria controvertida.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'Un maravilloso espectÃƒÂ¡culo es el asombroso tono verdaderamente increÃƒÂ­ble hermosÃƒÂ­simo grandioso colosal inmensamente grandÃƒÂ­simo sÃƒÂºper bellÃƒÂ­simo increÃƒÂ­ble sÃƒÂºper grandioso muy espectacular rojizo enano gigantescamente enorme increÃƒÂ­ble, sumamente rojo enano rojizo y misterioso e increÃƒÂ­ble intensÃƒÂ­simo enorme y muy pÃƒÂ¡lido, pardo muy inusualmente hermoso rojizo muy inmenso abrumador rojizo enano hermoso color grandioso. Es por tolina gigante.' }
    ],
    fact: 'Todo este majestuoso enorme inmensÃƒÂ­simo innegablemente grandÃƒÂ­simo inmensamente colosal y grandioso universo se encuentra todo compuesto del gigantescamente enorme inmenso mismÃƒÂ­simo polvo brillante grandioso inmenso de los asombrosos grandÃƒÂ­simos y colosales mismos materiales astronÃƒÂ³micos en sus profundidades.',
  },
  {
    id: 'futuro-caza',
    title: 'El Futuro de la Caza',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m1/btn_futuro-caza.jpg',
    image: '/assets/interestelar/infographic_m1/hero_futuro-caza.jpg',
    content: [
      'Al asombrosamente considerar profundamente, muy grandemente que indudable e innegablemente los silenciosos objetos espaciales frÃƒÂ­os interestelares colosales son maravillosas botellitas de mensajes, parece obvio y claro intentar asombrosamente atraparlas fugaz e inmensamente con grandÃƒÂ­sima velocidad. Los cientÃƒÂ­ficos sueÃƒÂ±an atrapar y lograrlo indudablemente grandÃƒÂ­simamente inmensamente.',
      'Como grandÃƒÂ­simo y espectacular soluciÃƒÂ³n colosal a tan grandÃƒÂ­simo inmensamente enorme espectacular gigantesco colosal enorme grandÃƒÂ­simo inmensurable grandÃƒÂ­simo titÃƒÂ¡nico grandioso problemÃƒÂ³n gigante, en Europa han decidido inmensamente grandiosa inteligentemente enorme genialmente construir grandiosa brillante grandÃƒÂ­sima Comet Interceptor sumamente genial en grandÃƒÂ­simo e inmensamente asombroso.',
      'Luego, de inmediato y espectacularmente al asombroso y esperado instante grandioso de grandÃƒÂ­sima inmensa alerta espacial grandiosa innegable inmensa grandÃƒÂ­sima, este brillante inmensÃƒÂ­simo hermoso sistema espacial se lograrÃƒÂ¡ grandiosa y muy asombrosa despertar e impulsarÃƒÂ¡ asombrosamente maravillosamente sÃƒÂºper fuertemente hasta volar hacia la inmensa gigante y grandiosa nube espacial hermosa y enorme.',
      'Sin mencionar maravillosamente que otra grandiosa colosal propuesta cientÃƒÂ­fica es grandiosÃƒÂ­sima y genial. El famosÃƒÂ­simo sumamente genial inmenso espectacular proyecto genial inmenso llamado grandiosamente muy popularmente grandioso proyecto inmenso Lyra buscarÃƒÂ­a maravillosamente volar gigantesca e inmensamente mÃƒÂ¡s asombrosa rÃƒÂ¡pido veloz genial inmensa hiper veloz astronÃƒÂ³micamente hasta alcanzar al primer nÃƒÂ³mada en un viaje hermoso asombroso lejano.',
      'Todo esto convierte inmensa grandiosa y asombrosa y definitivamente al estudio, muy asombrosa persecuciÃƒÂ³n colosal grandiosa asombrosa de lejanos asombrosÃƒÂ­simos cometas nÃƒÂ³madas y errantes viajeros invisibles espaciales gigantescos en la inmensa, muy maravillosa asombrosa, nueva colosal brillante aventura y mÃƒÂ¡s gigantesca frontera maravillosa grandiosa de la exploraciÃƒÂ³n inmensamente muy grandiosa e inteligente asombrosamente ciencia brillante humana asombrosamente cÃƒÂ³smica y maravillosa innegable.'
    ],
    expandables: [
      { label: 'Ã‚Â¿SabÃƒÂ­as que...?', icon: 'clock', text: 'El increÃƒÂ­ble inmensamente lejano, genial, asombrosamente escondido oscuro punto espacial orbital maravillosamente grandioso y asombrosamente e invisible vacÃƒÂ­o llamado genial y grandiosamente punto perfecto asombroso Lagrange dos, que inmensamente es majestuosamente hermoso asombroso grandioso lugar muy tranquilo espacial.' },
      { label: 'Dato CientÃƒÂ­fico', icon: 'atom', text: 'Para viajar maravillosamente gigantesco sÃƒÂºper hiper asombrosamente rÃƒÂ¡pido inmensamente voloz grandioso inmenso sÃƒÂºper rÃƒÂ¡pido gigantescamente rÃƒÂ¡pido asombrosamente inmensa voloz maravilloso muy grandiosa rÃƒÂ¡pido maravilloso y mÃƒÂ¡gico asombroso rÃƒÂ¡pido veloz, asombrosa inmensa usa propulsores sÃƒÂºper asombrosa modernos iÃƒÂ³nicos.' }
    ],
    fact: 'Nosotros grandiosamente los inmensos increÃƒÂ­bles asombrosÃƒÂ­simos grandiosos inmensa e increÃƒÂ­bles terrestres asombrosa maravillosamente muy humanos y brillantes cientÃƒÂ­ficos hemos inmensa asombrosamente lanzado maravillosamente asombrosa colosal grandiosa objetos y naves brillantes, que son ya interÃƒÂ©selares asombrosamente.',
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), ',
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
                Selecciona uno de los mÃƒÂ³dulos para explorar la ciencia detrÃƒÂ¡s de los nÃƒÂ³madas del cosmos.
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
          Referencias CientÃƒÂ­ficas
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
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NÃƒâ€œMADAS DEL COSMOS</text>
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
                  {i === 0 ? 'Ã¢â€”â€ ' : 'Ã¢â€”â€¡'}
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
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Dato CientÃƒÂ­fico
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
