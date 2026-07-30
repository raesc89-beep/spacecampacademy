'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Star Wars Themed)
   ========================================================================= */
const DecoStar = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill={color} opacity="0.8"/>
  </svg>
);

const DecoXWing = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M22 12L2 2L4 12L2 22L22 12Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.8"/>
    <path d="M7 7L13 12L7 17" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const DecoPlanet = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="11" ry="3" transform="rotate(-20 12 12)" stroke={color} strokeWidth="2" opacity="0.8"/>
  </svg>
);

const DecoTelescope = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="4" y="8" width="16" height="8" rx="2" transform="rotate(-30 12 12)" stroke={color} strokeWidth="2" opacity="0.8"/>
    <path d="M8 18L5 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M16 18L19 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M12 16L12 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
  </svg>
);

const DecoMoon = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" fill="none" opacity="0.8"/>
    <circle cx="9" cy="13" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="14" cy="16" r="1" fill={color} opacity="0.5"/>
    <circle cx="10" cy="8" r="1" fill={color} opacity="0.5"/>
  </svg>
);

const DecoRocket = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2C12 2 4 6 4 14C4 16 3 19 2 21C6 20 9 19 12 18C15 19 18 20 22 21C21 19 20 16 20 14C20 6 12 2 12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" fill="none"/>
    <path d="M12 22L12 18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
  </svg>
);

const DecoMolecule = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="5" cy="5" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="19" cy="5" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <circle cx="12" cy="20" r="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <path d="M7 7L10 10" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M17 7L14 10" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M12 15L12 18" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
  </svg>
);

const DECO_MAP = {
  'tatooine-soles': [DecoStar, DecoPlanet, DecoStar],
  'metodo-eclipse': [DecoTelescope, DecoStar, DecoMoon],
  'hoth-hielo': [DecoPlanet, DecoMoon, DecoStar],
  'dagobah-pantano': [DecoMolecule, DecoPlanet, DecoStar],
  'mundos-lava': [DecoPlanet, DecoStar, DecoRocket],
  'trappist-sistema': [DecoPlanet, DecoTelescope, DecoPlanet],
  'busqueda-vida': [DecoMolecule, DecoTelescope, DecoStar],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */
const BIBLIOGRAPHY = [
  "Doyle, L. R. et al. (2011). 'Kepler-16: A Transiting Circumbinary Planet.' Science, 333(6049).",
  "Mayor, M. & Queloz, D. (1995). 'A Jupiter-mass companion to a solar-type star.' Nature, 378.",
  "Gillon, M. et al. (2017). 'Seven temperate terrestrial planets around TRAPPIST-1.' Nature, 542.",
  "Madhusudhan, N. et al. (2023). 'Carbon-bearing molecules in K2-18b atmosphere.' The Astrophysical Journal Letters.",
  "Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space. Random House.",
  "Perryman, M. (2018). The Exoplanet Handbook. Cambridge University Press."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tatooine-soles',
    title: 'Tatooine: Los Dos Soles',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_mundos/btn_tatooine.png',
    image: '/assets/starwars/infographic_mundos/hero_tatooine.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_tatooine.png',
    bannerCaption: 'El doble atardecer de Tatooine â€” inspirado en el descubrimiento de Kepler-16b',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_atardecer.png', caption: 'Atardecer con dos soles sobre las chozas de Tatooine' },
      { src: '/assets/starwars/infographic_mundos/extra_tatooine_pueblo.png', caption: 'El pueblo de Tatooine bajo los dos soles del desierto' }
    ],
    content: [
      "Â¿Te imaginas caminar por la calle en un dÃ­a soleado y tener no una, sino dos sombras detrÃ¡s de ti? AsÃ­ serÃ­a la vida en un mundo con dos soles. En 2011, los astrÃ³nomos descubrieron un planeta real que orbita alrededor de un par de estrellas, igual que el famoso hogar de Luke Skywalker. Este descubrimiento sacudiÃ³ al mundo cientÃ­fico porque durante dÃ©cadas se pensÃ³ que un planeta no podrÃ­a mantener una Ã³rbita estable alrededor de dos estrellas sin ser expulsado al vacÃ­o del espacio.",
      "A estos mundos los llamamos 'planetas circumbinarios', una palabra elegante para decir que viajan en un gran cÃ­rculo alrededor de dos estrellas que giran juntas en el centro. Las dos estrellas de Kepler-16 se emparejan bailando un vals cÃ³smico, y el planeta las rodea a lo lejos observando el espectÃ¡culo. La estrella principal (Kepler-16A) es una enana naranja con un 69% de la masa de nuestro Sol, mientras que su compaÃ±era (Kepler-16B) es una enana roja mucho mÃ¡s pequeÃ±a, con solo un 20%.",
      "El planeta Kepler-16b es un gigante de gas frÃ­o, aproximadamente del tamaÃ±o de Saturno pero un poco mÃ¡s denso, lo que sugiere que tiene un nÃºcleo rocoso mÃ¡s grande. Si pudieras flotar en su atmÃ³sfera mirando al cielo, verÃ­as dos soles diferentes cruzÃ¡ndose y separÃ¡ndose como bailarines en un escenario cÃ³smico. Los cientÃ­ficos calcularon que la temperatura superficial ronda los -73Â°C, demasiado frÃ­o para agua lÃ­quida.",
      "Los atardeceres allÃ­ serÃ­an absolutamente mÃ¡gicos: los dos soles cruzarÃ­an el horizonte en momentos diferentes, creando un espectÃ¡culo de colores cambiantes que no existe en ningÃºn otro lugar conocido. Las sombras de los objetos se dividirÃ­an en dos y cambiarÃ­an de posiciÃ³n a lo largo del aÃ±o. Aunque este planeta en particular es demasiado frÃ­o y gaseoso para albergar vida, nos demuestra que el universo es mÃ¡s asombroso y parecido a la ciencia ficciÃ³n de lo que imaginÃ¡bamos.",
      "Desde el descubrimiento de Kepler-16b, los astrÃ³nomos han encontrado mÃ¡s de una docena de planetas circumbinarios confirmados, incluyendo Kepler-34b, Kepler-35b y TOI-1338b, este Ãºltimo descubierto en 2020 por un estudiante de 17 aÃ±os durante sus prÃ¡cticas de verano en la NASA. Estos hallazgos demuestran que los sistemas con dos soles no son una rareza cÃ³smica, sino que podrÃ­an representar hasta el 10% de todos los sistemas planetarios de la VÃ­a LÃ¡ctea. La pregunta ya no es si existen los mundos con doble atardecer, sino cuÃ¡ntos de ellos podrÃ­an albergar condiciones para la vida."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'La escena de Luke Skywalker contemplando el doble atardecer en Tatooine en la pelÃ­cula original de 1977 es uno de los momentos mÃ¡s icÃ³nicos del cine. Se filmÃ³ en Tozeur, TÃºnez, en el borde del desierto del Sahara, y George Lucas se inspirÃ³ en la cercana ciudad tunecina de Tataouine para darle nombre. La mÃºsica de John Williams en esa escena se llama "Binary Sunset" y es una de las piezas mÃ¡s reconocibles de la historia del cine.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Kepler-16b fue descubierto en 2011 por la misiÃ³n Kepler de la NASA mediante el mÃ©todo de trÃ¡nsito, observando cÃ³mo la luz de ambas estrellas se atenuaba periÃ³dicamente. Los cientÃ­ficos lo apodaron oficialmente "Tatooine" en honor a Star Wars. Tarda 229 dÃ­as en completar una Ã³rbita, y se encuentra a 0.7 unidades astronÃ³micas de sus estrellas, casi a la misma distancia a la que Venus orbita nuestro Sol.' 
      }
    ],
    fact: 'Kepler-16b fue el primer planeta confirmado orbitando dos estrellas, descubierto en 2011. Los cientÃ­ficos lo apodaron oficialmente "Tatooine" en honor a Star Wars. Desde entonces, se han encontrado mÃ¡s de una docena de planetas circumbinarios, demostrando que los mundos con doble sol no son raros en la galaxia.'
  },
  {
    id: 'metodo-eclipse',
    title: 'El MÃ©todo del Eclipse',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_mundos/btn_eclipse.png',
    image: '/assets/starwars/infographic_mundos/hero_eclipse.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_eclipse.png',
    bannerCaption: 'El telescopio Kepler observÃ³ mÃ¡s de 150,000 estrellas buscando mini-eclipses',
    content: [
      "Si estuvieras a kilÃ³metros de distancia mirando una farola gigante, Â¿podrÃ­as notar si una pequeÃ±a hormiga camina frente a la bombilla? Esa es exactamente la difÃ­cil tarea que hacen los telescopios espaciales para encontrar exoplanetas. Utilizan algo llamado 'mÃ©todo del trÃ¡nsito', que consiste en espiar la luz de las estrellas durante meses y meses, buscando parpadeos diminutos que revelen la presencia de un mundo oculto.",
      "Cuando un planeta cruza por delante de su estrella (desde nuestro punto de vista en la Tierra), bloquea una cantidad pequeÃ±Ã­sima de luz. Â¡Estamos hablando de apenas un 0.01% del brillo total! El brillo de la estrella disminuye un poquito durante unas pocas horas, y luego vuelve a la normalidad. Si ese patrÃ³n se repite periÃ³dicamente, Â¡tenemos un planeta! Es como detectar a alguien que pasa una y otra vez frente a la ventana de un vecino lejano.",
      "El telescopio espacial Kepler fue el campeÃ³n indiscutible de esta tÃ©cnica. Lanzado en 2009 desde Cabo CaÃ±averal, se quedÃ³ mirando fijamente una sola porciÃ³n del cielo entre las constelaciones de Cisne y Lira, midiendo el brillo de 150,000 estrellas simultÃ¡neamente con una precisiÃ³n asombrosa. Durante sus nueve aÃ±os de servicio, encontrÃ³ mÃ¡s de 2,600 exoplanetas confirmados antes de quedarse sin combustible en octubre de 2018.",
      "Otra forma ingeniosa de cazar planetas es 'escuchando' si la estrella se tambalea. Se llama velocidad radial o efecto Doppler. La gravedad del planeta tira un poco de su estrella, haciÃ©ndola tambalearse como un trompo a punto de caer. Si la estrella se acerca ligeramente hacia nosotros, su luz se vuelve un poquito mÃ¡s azul; si se aleja, un poquito mÃ¡s roja. Este elegante mÃ©todo llevÃ³ al descubrimiento del primer exoplaneta alrededor de una estrella tipo Sol, 51 Pegasi b, en 1995, un hallazgo tan importante que les valiÃ³ el Premio Nobel de FÃ­sica.",
      "Y la aventura no se detiene aquÃ­. En diciembre de 2021, la NASA lanzÃ³ el Telescopio Espacial James Webb, el observatorio mÃ¡s poderoso jamÃ¡s construido, con un espejo de oro de 6.5 metros de diÃ¡metro plegado como origami dentro de un cohete. El Webb puede analizar la luz que atraviesa las atmÃ³sferas de exoplanetas durante un trÃ¡nsito, descomponiendo esa luz en un arcoÃ­ris quÃ­mico que revela quÃ© molÃ©culas contiene: agua, metano, diÃ³xido de carbono, e incluso posibles seÃ±ales de vida. Es como leer la receta de un pastel con solo oler el horno desde la calle."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En Star Wars, los personajes viajan entre sistemas estelares con facilidad gracias al hiperimpulsor, pero en la realidad detectar planetas a esas distancias es increÃ­blemente difÃ­cil. La Alianza Rebelde habrÃ­a necesitado telescopios como Kepler o el James Webb para encontrar bases habitables ocultas en la galaxia, porque a simple vista las estrellas son solo puntos de luz sin planetas visibles.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Michel Mayor y Didier Queloz, de la Universidad de Ginebra, ganaron el Premio Nobel de FÃ­sica 2019 por descubrir 51 Pegasi b usando el mÃ©todo Doppler en el Observatorio de Haute-Provence, Francia, en 1995. Hoy en dÃ­a, instrumentos de nueva generaciÃ³n como ESPRESSO, instalado en el Very Large Telescope en Paranal, Chile, pueden detectar bamboleos tan sutiles como los causados por planetas tan pequeÃ±os como la Tierra.' 
      }
    ],
    fact: 'El telescopio espacial Kepler descubriÃ³ mÃ¡s de 2,600 exoplanetas confirmados antes de que se agotara su combustible en octubre de 2018. ObservÃ³ 150,000 estrellas simultÃ¡neamente durante nueve aÃ±os. Su sucesor, TESS (lanzado en 2018), ahora observa el cielo entero buscando mundos aÃºn mÃ¡s cercanos a nosotros.'
  },
  {
    id: 'hoth-hielo',
    title: 'Hoth: Mundos de Hielo',
    color: '#B3E5FC',
    btnImage: '/assets/starwars/infographic_mundos/btn_hoth.png',
    image: '/assets/starwars/infographic_mundos/hero_hoth.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_hoth.png',
    bannerCaption: 'Europa, la luna helada de JÃºpiter, tiene un ocÃ©ano subterrÃ¡neo que podrÃ­a albergar vida',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_hoth_vader.png', caption: 'Vader patrullando las llanuras heladas de Hoth' },
      { src: '/assets/starwars/infographic_mundos/extra_hoth_jinete.png', caption: 'Un jinete solitario sobre las colinas nevadas' }
    ],
    content: [
      "Imagina una pista de patinaje gigante del tamaÃ±o de una luna entera, llena de grietas kilomÃ©tricas y crestas afiladas como cuchillos de hielo. En nuestro propio sistema solar tenemos mundos parecidos al congelado planeta Hoth. La luna Europa, de JÃºpiter, estÃ¡ cubierta por una corteza de hielo durÃ­sima, y su superficie se congela a -160Â°C. Si pudieras pararte en ella, verÃ­as un paisaje blanco y agrietado extendiÃ©ndose hasta el horizonte, con el gigantesco JÃºpiter dominando el cielo.",
      "Pero la verdadera magia ocurre bajo ese hielo. La inmensa gravedad de JÃºpiter estira y aplasta a Europa como si fuera una pelota antiestrÃ©s cÃ³smica. A este fenÃ³meno los cientÃ­ficos lo llaman 'calentamiento mareal'. La fricciÃ³n constante dentro de la luna genera suficiente calor para derretir el hielo por debajo, formando un gigantesco ocÃ©ano oscuro que contiene el doble de agua que todos los ocÃ©anos de la Tierra combinados.",
      "Europa no es la Ãºnica luna con secretos lÃ­quidos. EncÃ©lado, una pequeÃ±a luna de Saturno de apenas 500 km de diÃ¡metro, esconde otro ocÃ©ano subterrÃ¡neo e incluso dispara enormes gÃ©iseres de agua salada hacia el espacio a velocidades de 1,400 km/h. La sonda Cassini de la NASA atravesÃ³ esas columnas de vapor en 2015, detectando hidrÃ³geno molecular y sÃ­lice, ingredientes que en la Tierra se asocian con fuentes hidrotermales donde prospera la vida.",
      "Â¿PodrÃ­a haber vida nadando en estos abismos oscuros y helados? Para averiguarlo, la NASA ha lanzado la sonda Europa Clipper en octubre de 2024, la misiÃ³n mÃ¡s ambiciosa jamÃ¡s enviada al sistema exterior. RealizarÃ¡ 49 sobrevuelos cercanos a Europa, analizando el grosor del hielo con radar y buscando zonas donde el ocÃ©ano se filtra hacia la superficie. Â¡QuizÃ¡s los verdaderos alienÃ­genas del sistema solar no sean humanoides con espadas lÃ¡ser, sino microbios nadando en un ocÃ©ano que nunca ha visto la luz del sol!",
      "En la Tierra, la vida prospera en condiciones parecidas a las de estos mundos helados. En las profundidades del ocÃ©ano, lejos de toda luz solar, existen las fuentes hidrotermales: chimeneas volcÃ¡nicas submarinas que escupen agua hirviente rica en minerales. Alrededor de estas 'chimeneas negras' viven gusanos tubulares gigantes, bacterias extremÃ³filas y cangrejos blancos ciegos que obtienen su energÃ­a de la quÃ­mica del agua, no del Sol. Si estos ecosistemas pueden prosperar en la oscuridad absoluta de nuestro propio planeta, Â¿por quÃ© no podrÃ­an existir en los ocÃ©anos ocultos bajo el hielo de Europa o EncÃ©lado?"
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Hoth es donde la Alianza Rebelde estableciÃ³ la Base Eco en El Imperio Contraataca (1980). Las escenas exteriores se filmaron en Finse, Noruega, a 1,222 metros de altitud, donde la temperatura bajaba a -29Â°C durante el rodaje. En la ficciÃ³n, la temperatura en Hoth llega a -60Â°C, Â¡pero la luna Europa es aÃºn mÃ¡s brutal con -160Â°C! Los Tauntauns, criaturas reptilianas adaptadas al frÃ­o, fueron creados con animatrÃ³nicos a tamaÃ±o real.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Europa tiene mÃ¡s agua lÃ­quida bajo su hielo que todos los ocÃ©anos de la Tierra juntos: se estiman unos 3 Ã— 10Â¹â¸ metros cÃºbicos. Su corteza de hielo mide entre 15 y 25 km de grosor, y el ocÃ©ano debajo podrÃ­a alcanzar hasta 150 km de profundidad. En la Tierra, la Fosa de las Marianas tiene apenas 11 km, asÃ­ que el ocÃ©ano de Europa serÃ­a mÃ¡s de 13 veces mÃ¡s profundo.' 
      }
    ],
    fact: 'Europa tiene mÃ¡s agua lÃ­quida bajo su hielo que todos los ocÃ©anos de la Tierra juntos, unos 3 Ã— 10Â¹â¸ metros cÃºbicos. Su ocÃ©ano podrÃ­a tener 150 km de profundidad, mÃ¡s de 13 veces la Fosa de las Marianas. La sonda Europa Clipper, lanzada en 2024, realizarÃ¡ 49 sobrevuelos para buscar condiciones habitables bajo el hielo.'
  },
  {
    id: 'dagobah-pantano',
    title: 'Dagobah: Pantanos PrehistÃ³ricos',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_mundos/btn_dagobah.png',
    image: '/assets/starwars/infographic_mundos/hero_dagobah.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_dagobah.png',
    bannerCaption: 'En el periodo CarbonÃ­fero, hace 300 millones de aÃ±os, la Tierra lucÃ­a como Dagobah',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_pantano.png', caption: 'El oscuro pantano de Dagobah bajo la lluvia' },
      { src: '/assets/starwars/infographic_mundos/extra_dagobah_xwing.png', caption: 'El X-Wing de Luke hundido en el pantano de Dagobah' }
    ],
    content: [
      "Si viajaras en el tiempo unos 300 millones de aÃ±os, aterrizarÃ­as en un planeta muy similar al pantanoso exilio de Yoda. La Tierra estaba en pleno perÃ­odo CarbonÃ­fero (359-299 millones de aÃ±os atrÃ¡s), un mundo cÃ¡lido y hÃºmedo cubierto por espesos bosques y pantanos impenetrables. No habÃ­a flores, ni pÃ¡jaros, ni mamÃ­feros. Solo helechos gigantes, licÃ³podos de 40 metros de alto y el sonido de insectos zumbando entre la niebla.",
      "Durante este perÃ­odo, la atmÃ³sfera tenÃ­a mucho mÃ¡s oxÃ­geno que hoy. Mientras que ahora respiramos un 21% de oxÃ­geno, en aquel entonces los niveles alcanzaban el 35%, casi el doble. Los cientÃ­ficos descubrieron esto analizando burbujas de aire atrapadas en Ã¡mbar fÃ³sil. Este exceso de oxÃ­geno provocÃ³ un fenÃ³meno sorprendente que habrÃ­a fascinado a cualquier biÃ³logo: Â¡los insectos crecieron a tamaÃ±os absolutamente monstruosos!",
      "Imagina libÃ©lulas gigantes del gÃ©nero Meganeura con una envergadura de alas de 70 centÃ­metros, volando como si fueran halcones entre los helechos arborescentes. Sus alas transparentes hacÃ­an un ruido ensordecedor al batirlas. En el suelo lodoso, arrastrÃ¡ndose entre las raÃ­ces sumergidas, habÃ­a milpiÃ©s llamados Arthropleura del tamaÃ±o de un coche pequeÃ±o, alcanzando los 2.3 metros de largo y medio metro de ancho. Los insectos podÃ­an ser tan grandes porque respiraban a travÃ©s de pequeÃ±os tubos (trÃ¡queas), y con tanto oxÃ­geno disponible, hasta los tubos mÃ¡s largos podÃ­an funcionar.",
      "Toda esa vegetaciÃ³n muerta se acumulÃ³ en los pantanos durante millones de aÃ±os sin pudrirse del todo, porque las bacterias y hongos de la Ã©poca aÃºn no habÃ­an evolucionado la capacidad de descomponer la lignina, la sustancia dura que da rigidez a la madera. Con el peso y el calor de la Tierra, esa materia orgÃ¡nica se comprimiÃ³ hasta convertirse en el carbÃ³n mineral que alimentÃ³ la RevoluciÃ³n Industrial. Â¡El combustible de los primeros trenes y fÃ¡bricas del siglo XIX viene literalmente de un mundo parecido a Dagobah!",
      "El CarbonÃ­fero tambiÃ©n nos dejÃ³ una lecciÃ³n sobre cÃ³mo la atmÃ³sfera controla la vida. Cuando el oxÃ­geno subiÃ³ al 35%, los insectos se hicieron gigantes, pero los incendios forestales se volvieron devastadores: con tanto combustible y tanto oxÃ­geno, enormes regiones ardÃ­an durante semanas. Eventualmente, los niveles de oxÃ­geno bajaron de nuevo, los insectos gigantes se extinguieron y los reptiles comenzaron a dominar la Tierra, preparando el escenario para los dinosaurios. Es un recordatorio fascinante de que la composiciÃ³n del aire que respiramos determina quÃ© tipo de criaturas pueden existir en nuestro planeta."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Dagobah aparece en El Imperio Contraataca (1980) como el planeta donde Yoda entrena a Luke Skywalker en los caminos de la Fuerza. Los densos pantanos se crearon con enormes decorados en los estudios Elstree en Borehamwood, Inglaterra. El puppeteer Frank Oz operaba a Yoda desde debajo del set, sumergido en agua cenagosa. Dagobah fue diseÃ±ado como un mundo lleno de vida exuberante y salvaje, pero completamente desprovisto de civilizaciÃ³n.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'En el CarbonÃ­fero, las libÃ©lulas gigantes Meganeura podÃ­an alcanzar 75 cm de envergadura y los enormes milpiÃ©s Arthropleura pesaban hasta 50 kg. El exceso de oxÃ­geno en la atmÃ³sfera permitÃ­a a sus cuerpos respirar eficientemente a travÃ©s de pequeÃ±os poros llamados espirÃ¡culos, permitiÃ©ndoles crecer a tamaÃ±os gigantescos. Los cientÃ­ficos han recreado estas condiciones en laboratorio, y efectivamente los insectos modernos crecen mÃ¡s en atmÃ³sferas enriquecidas con oxÃ­geno.' 
      }
    ],
    fact: 'En el perÃ­odo CarbonÃ­fero (359-299 Ma), las libÃ©lulas Meganeura tenÃ­an 75 cm de envergadura y los milpiÃ©s Arthropleura medÃ­an 2.3 metros de largo. El oxÃ­geno atmosfÃ©rico del 35% (vs 21% actual) permitÃ­a a los insectos respirar eficientemente a tamaÃ±os gigantescos. La materia vegetal acumulada en estos pantanos se convirtiÃ³ en los depÃ³sitos de carbÃ³n que alimentaron la RevoluciÃ³n Industrial.'
  },
  {
    id: 'mundos-lava',
    title: 'Mundos de Fuego y Lava',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_mundos/btn_lava.png',
    image: '/assets/starwars/infographic_mundos/hero_lava.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_lava.png',
    bannerCaption: '55 Cancri e: un aÃ±o dura solo 18 horas y su superficie supera los 2,000Â°C',
    extraImages: [
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_duel_1.png', caption: 'Duelo Ã©pico en Mustafar: siluetas bajo un sol abrasador de lava' },
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_duel_2.png', caption: 'Anakin y Obi-Wan cruzan sables sobre rÃ­os de magma ardiente' },
      { src: '/assets/starwars/infographic_mundos/extra_mustafar_sector.png', caption: 'Mustafar â€” Sector Atravis: el planeta volcÃ¡nico mÃ¡s temido de la galaxia' }
    ],
    content: [
      "Hay rincones del universo donde el infierno es un lugar real. Imagina un planeta rocoso que orbita tan cerca de su estrella que su superficie se derrite por completo, convirtiÃ©ndose en un ocÃ©ano hirviente de roca fundida color naranja brillante. 55 Cancri e, tambiÃ©n conocido como Janssen, es uno de esos terrorÃ­ficos 'mundos de lava'. Se encuentra a solo 40 aÃ±os-luz de nosotros, en la constelaciÃ³n de CÃ¡ncer, y fue uno de los primeros 'supertierra' descubiertos.",
      "EstÃ¡ tan cerca de su estrella madre que su aÃ±o completo (una vuelta entera alrededor de la estrella) dura tan solo 18 horas. Â¡PodrÃ­as celebrar tu cumpleaÃ±os todos los dÃ­as! Pero harÃ­a demasiado calor para la fiesta: la temperatura en su cara diurna supera los 2,500Â°C, suficiente para derretir acero, titanio y prÃ¡cticamente cualquier metal conocido. AdemÃ¡s, siempre muestra la misma cara a su estrella, creando un hemisferio de dÃ­a eterno y otro de noche perpetua.",
      "El clima en estos planetas es una pesadilla de ciencia ficciÃ³n que supera cualquier imaginaciÃ³n. En un planeta llamado WASP-76b, situado a 640 aÃ±os-luz, las nubes estÃ¡n hechas de vapor de hierro. En el lado mÃ¡s caliente (2,400Â°C), el hierro se evapora como agua en un horno. Cuando vientos huracanados de mÃ¡s de 18,000 km/h llevan ese vapor al lado oscuro y mÃ¡s frÃ­o, el hierro se condensa y llueve como gotas de metal lÃ­quido incandescente desde las nubes.",
      "Otro planeta aÃºn mÃ¡s extremo, K2-141b, tiene un ocÃ©ano de magma de 100 kilÃ³metros de profundidad y una atmÃ³sfera hecha de roca vaporizada. El 'ciclo del agua' en este mundo consiste en roca que se evapora, forma nubes de silicato y luego llueve como lava. Estos mundos ardientes nos dan una ventana al pasado de nuestra propia Tierra hace 4,500 millones de aÃ±os, cuando nuestro planeta no era mÃ¡s que una enorme bola de fuego y roca reciÃ©n nacida en el espacio, bombardeada por meteoritos.",
      "Lo mÃ¡s sorprendente es que estos planetas infernales tambiÃ©n nos ayudan a entender cÃ³mo se forman los mundos habitables. Hace 4,500 millones de aÃ±os, la Tierra primitiva era prÃ¡cticamente idÃ©ntica a estos mundos de lava. La superficie era un ocÃ©ano de magma cubierto por una atmÃ³sfera tÃ³xica de diÃ³xido de carbono y vapor de roca. Fue la lluvia de meteoritos y la desgasificaciÃ³n volcÃ¡nica las que, a lo largo de cientos de millones de aÃ±os, crearon los ocÃ©anos y la atmÃ³sfera que eventualmente permitieron la apariciÃ³n de la vida. Estudiar planetas como 55 Cancri e es como mirar una foto de bebÃ© de nuestro propio mundo."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Mustafar es el planeta volcÃ¡nico donde Anakin Skywalker y Obi-Wan Kenobi se enfrentan en su Ã©pico duelo final en La Venganza de los Sith (2005). Las escenas de lava combinaron efectos prÃ¡cticos (filmados sobre el volcÃ¡n Etna en Sicilia) con sofisticados efectos CGI de Industrial Light & Magic. En la realidad, mundos como 55 Cancri e son mucho peores que Mustafar: su superficie entera es un ocÃ©ano de lava sin ninguna isla sÃ³lida donde pisar.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En WASP-76b se produce lluvia de hierro lÃ­quido, un fenÃ³meno descubierto en marzo de 2020 por el equipo de David Ehrenreich usando el espectrÃ³grafo ESPRESSO en el Very Large Telescope de ESO en Paranal, Chile. Observaron cÃ³mo el hierro neutro se detecta abundantemente en el terminador vespertino (frontera dÃ­a-noche) pero desaparece en el terminador matutino, confirmando que el hierro se condensa y cae como lluvia metÃ¡lica en el lado nocturno.' 
      }
    ],
    fact: 'En WASP-76b llueve hierro lÃ­quido a temperaturas de mÃ¡s de 2,400Â°C. El hierro se evapora en el lado diurno permanente del planeta y cae como gotas de metal fundido en el lado nocturno oscuro. Este descubrimiento fue publicado en Nature en 2020 por el equipo de David Ehrenreich usando datos del espectrÃ³grafo ESPRESSO en Chile.'
  },
  {
    id: 'trappist-sistema',
    title: 'TRAPPIST-1: Siete Mundos',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_mundos/btn_trappist.png',
    image: '/assets/starwars/infographic_mundos/hero_trappist.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_trappist.png',
    bannerCaption: 'Los siete planetas de TRAPPIST-1 estÃ¡n tan cerca que podrÃ­as ver los vecinos en el cielo',
    content: [
      "Â¿Y si pudieras mirar al cielo nocturno y ver, en lugar de una luna solitaria, otros planetas del tamaÃ±o de la Tierra flotando enormes y cercanos entre las nubes? El sistema TRAPPIST-1, descubierto en febrero de 2017 a solo 40 aÃ±os-luz de distancia en la constelaciÃ³n de Acuario, es como una pequeÃ±a familia de mundos unidos alrededor de una fogata estelar tenue pero acogedora. Cuando se anunciÃ³ su descubrimiento, la noticia se convirtiÃ³ en trending topic mundial.",
      "La estrella TRAPPIST-1 es una 'enana roja ultrafrÃ­a', mucho mÃ¡s pequeÃ±a, frÃ­a y tenue que nuestro Sol. Para hacerte una idea de su tamaÃ±o, apenas es un 12% mÃ¡s grande que JÃºpiter y brilla con solo un 0.05% de la luminosidad solar. Por eso, sus siete planetas rocosos orbitan muy cerquita de ella para mantenerse calientes, todos ellos dentro de una distancia menor que la Ã³rbita de Mercurio alrededor de nuestro Sol. Completan una vuelta en apenas 1.5 a 19 dÃ­as.",
      "Tres de estos siete planetas (llamados TRAPPIST-1e, f y g) se encuentran en la 'zona habitable', tambiÃ©n conocida como la 'zona Ricitos de Oro'. Esto significa que no estÃ¡n ni demasiado cerca ni demasiado lejos del calor estelar, justo en el punto perfecto donde el agua lÃ­quida podrÃ­a existir en su superficie, formÃ¡ndose charcos, lagos u ocÃ©anos. TRAPPIST-1e es especialmente interesante porque tiene una densidad similar a la de la Tierra, sugiriendo que podrÃ­a tener una composiciÃ³n rocosa con hierro.",
      "Al estar todos tan apretados en un espacio tan pequeÃ±o, desde la superficie de uno verÃ­as pasar a sus hermanos mayores asomÃ¡ndose enormes entre las nubes, incluso mÃ¡s grandes que nuestra Luna vista desde la Tierra. Los planetas estÃ¡n en resonancia orbital: por cada 8 Ã³rbitas del mÃ¡s interno, los demÃ¡s completan exactamente 5, 3, 2, 3/2, 1 y 3/4 Ã³rbitas. El Telescopio Espacial James Webb estÃ¡ actualmente dedicando cientos de horas de observaciÃ³n para 'olfatear' sus atmÃ³sferas, buscando seÃ±ales de agua, diÃ³xido de carbono, metano o cualquier indicio de quÃ­mica biolÃ³gica.",
      "Sin embargo, la vida en TRAPPIST-1 enfrentarÃ­a desafÃ­os Ãºnicos. Debido a la cercanÃ­a a su estrella, todos los planetas probablemente estÃ¡n en 'acoplamiento de marea', lo que significa que siempre muestran la misma cara a su sol, como nuestra Luna con la Tierra. Esto crearÃ­a un hemisferio de dÃ­a eterno abrasador y otro de noche perpetua congelada. La zona mÃ¡s habitable serÃ­a el terminador, la delgada franja entre luz y oscuridad donde las temperaturas podrÃ­an ser moderadas. Los cientÃ­ficos especulan que los vientos ecuatoriales podrÃ­an redistribuir el calor, creando patrones climÃ¡ticos completamente alienÃ­genas que no se parecen a nada en nuestro sistema solar."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Star Wars tiene cientos de mundos habitables distribuidos por toda la galaxia, desde el desÃ©rtico Jakku hasta el boscoso Endor. El hallazgo real de siete planetas del tamaÃ±o de la Tierra en un solo sistema solar fue extraordinario. Si TRAPPIST-1 estuviera en la galaxia de Star Wars, un salto hiperespacial conectarÃ­a sus siete mundos en minutos; en la realidad, la luz tarda apenas 30 minutos en ir del planeta mÃ¡s cercano al mÃ¡s lejano del sistema.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'El sistema fue descubierto inicialmente usando un pequeÃ±o telescopio robÃ³tico de 60 cm llamado TRAPPIST (TRAnsiting Planets and PlanetesImals Small Telescope) en el Observatorio de La Silla, Chile. Las estrellas enanas rojas, aunque parecen tranquilas, pueden ser temperamentales y lanzar fuertes erupciones de rayos X y ultravioleta (llamadas "flares") que podrÃ­an arrancar las atmÃ³sferas de sus planetas cercanos. Este es el mayor peligro para la habitabilidad del sistema.' 
      }
    ],
    fact: 'TRAPPIST-1 tiene 7 planetas rocosos del tamaÃ±o de la Tierra, el mayor nÃºmero descubierto en un solo sistema. Tres podrÃ­an tener agua lÃ­quida (e, f, g). EstÃ¡n a solo 40 aÃ±os-luz de nosotros, lo suficientemente cerca para que el James Webb pueda analizar sus atmÃ³sferas. Sus Ã³rbitas estÃ¡n en perfecta resonancia matemÃ¡tica, un fenÃ³meno que fascina a los astrofÃ­sicos.'
  },
  {
    id: 'busqueda-vida',
    title: 'La BÃºsqueda de Vida',
    color: '#4FC3F7',
    btnImage: '/assets/starwars/infographic_mundos/btn_vida.png',
    image: '/assets/starwars/infographic_mundos/hero_vida.png',
    bannerImage: '/assets/starwars/infographic_mundos/banner_vida.png',
    bannerCaption: 'El James Webb detectÃ³ COâ‚‚ y metano en K2-18b â€” Â¿seÃ±ales de vida?',
    content: [
      "Â¿CÃ³mo podemos saber si hay extraterrestres en un planeta a aÃ±os-luz de distancia sin viajar hasta allÃ¡? La respuesta estÃ¡ en la atmÃ³sfera. Los telescopios mÃ¡s avanzados del mundo buscan 'biofirmas', que son combinaciones quÃ­micas que no deberÃ­an existir juntas a menos que algÃºn ser vivo las estÃ© produciendo activamente. Es el equivalente cÃ³smico de buscar huellas en la arena: no necesitas ver al caminante para saber que alguien pasÃ³ por ahÃ­.",
      "Es como oler el aroma a sopa de pollo desde el pasillo de un edificio: sabes que alguien estÃ¡ cocinando aunque no veas la cocina ni al cocinero. En la Tierra, la vida produce oxÃ­geno (mediante la fotosÃ­ntesis de plantas y algas) y metano (mediante bacterias en los pantanos y en los estÃ³magos de las vacas) constantemente. Si no hubiera seres vivos reponiendo estos gases, el oxÃ­geno y el metano reaccionarÃ­an entre sÃ­ en unos pocos miles de aÃ±os y desaparecerÃ­an. Su coexistencia es la prueba de que algo vivo los estÃ¡ fabricando.",
      "En septiembre de 2023, el Telescopio Espacial James Webb logrÃ³ un hito histÃ³rico: detectÃ³ con Ã©xito diÃ³xido de carbono y metano en la atmÃ³sfera de un exoplaneta llamado K2-18b, situado a 124 aÃ±os-luz de nosotros. Este mundo es un 'hicÃ©ano', una supertierra cubierta por un ocÃ©ano profundo con una gruesa atmÃ³sfera rica en hidrÃ³geno. Se encuentra en la zona habitable de su estrella enana roja, lo que lo convierte en un candidato extraordinario para buscar quÃ­mica biolÃ³gica.",
      "Â¡TÃº tambiÃ©n puedes ser un descubridor de mundos! Plataformas de ciencia ciudadana como Zooniverse y Planet Hunters TESS permiten a personas de todo el mundo analizar datos reales de telescopios desde su computadora o telÃ©fono mÃ³vil, y ya han contribuido al descubrimiento de exoplanetas reales. En el futuro cercano, gigantes como el ELT (Telescopio Extremadamente Grande) en Cerro Armazones, Chile, con su espejo segmentado de 39 metros de diÃ¡metro, podrÃ­an fotografiar directamente mundos alienÃ­genas y analizar sus atmÃ³sferas molÃ©cula por molÃ©cula.",
      "La carrera por encontrar vida mÃ¡s allÃ¡ de la Tierra estÃ¡ acelerÃ¡ndose como nunca antes. AdemÃ¡s del James Webb y el futuro ELT, nuevas misiones como HWO (Habitable Worlds Observatory) buscarÃ¡n tomar las primeras fotografÃ­as directas de exoplanetas similares a la Tierra y analizar si sus atmÃ³sferas contienen las combinaciones quÃ­micas que delatan la presencia de biologÃ­a. Algunos cientÃ­ficos calculan que, si la vida es comÃºn en el universo, podrÃ­amos tener evidencia firme antes de 2040. Si lo logramos, responderÃ­amos a una pregunta que la humanidad se ha hecho desde que mirÃ³ al cielo por primera vez: Â¿estamos solos?"
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Star Wars estÃ¡ repleto de vida alienÃ­gena inteligente: Wookiees, Ewoks, Twi\'leks, Hutts, y cientos de especies mÃ¡s pueblan la galaxia. En la realidad, aÃºn no hemos encontrado ninguna evidencia confirmada de vida fuera de la Tierra. Sin embargo, si comprobamos la existencia de biologÃ­a en mundos como K2-18b, Â¡serÃ­a el descubrimiento mÃ¡s importante en la historia de la humanidad, mucho mÃ¡s grande que el alunizaje del Apollo 11!' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El oxÃ­geno y el metano reaccionan quÃ­micamente entre sÃ­ para formar agua y diÃ³xido de carbono. En condiciones normales, sin seres vivos que los repongan, ambos gases desaparecerÃ­an de una atmÃ³sfera en unos pocos miles de aÃ±os. Detectarlos simultÃ¡neamente en un exoplaneta serÃ­a una de las pruebas mÃ¡s fuertes de actividad biolÃ³gica. Carl Sagan demostrÃ³ este principio en 1990 cuando la sonda Galileo detectÃ³ vida en la Tierra desde el espacio usando exactamente este mÃ©todo.' 
      }
    ],
    fact: 'En septiembre de 2023, el James Webb detectÃ³ diÃ³xido de carbono y metano en K2-18b, un exoplaneta oceÃ¡nico a 124 aÃ±os-luz en la zona habitable. El equipo de Nikku Madhusudhan (Cambridge) tambiÃ©n encontrÃ³ indicios tentativos de dimetil sulfuro (DMS), una molÃ©cula que en la Tierra solo producen organismos marinos. Si se confirma, serÃ­a la primera evidencia indirecta de biologÃ­a extraterrestre.'
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      // Shooting star occasionally
      if (Math.random() < 0.01) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#FFB74D',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(255, 183, 77, 0.4)'
      }}>
        MUNDOS EXTREMOS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        TATOOINE &middot; HOTH &middot; DAGOBAH
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <div key={n.id} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: node.color,
          borderRadius: '50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoStar;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoStar;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        {/* Grid Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.7, color: '#B0BEC5', marginTop: '1rem' }}>
              {node.content[1]}
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1A1C29 0%, transparent 20%)', pointerEvents: 'none' }} />
          </div>
        </div>
        
        {/* Magazine Body */}
        <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', marginBottom: '2.5rem' }}>
            {node.content.slice(2).map((paragraph, idx) => {
              const isWide = idx === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
              return (
                <div key={idx} style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: '-8px', left: '12px',
                    background: node.color, color: '#0B0E2D',
                    fontSize: '0.65rem', fontWeight: 800,
                    padding: '2px 8px', borderRadius: '8px',
                    letterSpacing: '1px',
                  }}>
                    {idx === 0 ? 'â—†' : 'â—‡'}
                  </div>
                  <p style={{ fontFamily: '"Lora", serif', fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                    {paragraph}
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Expandables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {node.expandables.map((exp, idx) => (
              <ExpandableSection 
                key={idx} 
                data={exp} 
                color={node.color} 
                direction={DIRECTIONS[idx % DIRECTIONS.length]} 
              />
            ))}
          </div>
          
          {/* Banner */}
          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)', pointerEvents: 'none' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
                  {node.bannerCaption}
                </p>
              )}
            </div>
          )}

          {/* Extra Images Gallery */}
          {node.extraImages && node.extraImages.length > 0 && (
            <div style={{ margin: '1.5rem 0' }}>
              <h4 style={{ fontFamily: '"Oswald", sans-serif', color: node.color, margin: '0 0 1rem 0', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={14} /> GALERÃA DEL PLANETA
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: node.extraImages.length === 1 ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                {node.extraImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: `1px solid ${node.color}30`,
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.caption || ''}
                      onClick={() => setLightboxSrc(img.src)}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,12,30,0.7) 100%)', pointerEvents: 'none' }} />
                    {img.caption && (
                      <p style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.8)',
                        margin: 0,
                        fontStyle: 'italic',
                        padding: '0 0.5rem',
                        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                        pointerEvents: 'none',
                      }}>
                        {img.caption}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Fact Box */}
          <div style={{ 
            background: `linear-gradient(135deg, ${node.color}11, ${node.color}33)`, 
            padding: '1.5rem', 
            borderRadius: '12px',
            borderLeft: `4px solid ${node.color}`,
            marginTop: '2rem'
          }}>
            <h4 style={{ fontFamily: '"Oswald", sans-serif', color: node.color, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} /> FACTO FASCINANTE
            </h4>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', color: '#FFF', margin: 0, fontStyle: 'italic' }}>
              {node.fact}
            </p>
          </div>
          
          {/* Next Button */}
          {!isLast && mounted && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                style={{
                  background: node.color,
                  color: '#000',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontFamily: '"Oswald", sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 4px 15px ${node.color}55`
                }}
              >
                Siguiente Destino <ChevronRight size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ total, visitedCount }) => {
  const percentage = Math.round((visitedCount / total) * 100);
  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '2rem auto', zIndex: 10, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#B0BEC5', fontFamily: '"Oswald", sans-serif', fontSize: '0.9rem' }}>
        <span>Progreso GalÃ¡ctico</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ height: '8px', background: '#2A2D3E', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #64B5F6, #FFB74D)', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default function InteractiveInfographic_SwSec2() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const handleNodeClick = (node) => {
    setActiveNodeId(node.id);
    if (!visitedNodes.includes(node.id)) {
      setVisitedNodes(prev => [...prev, node.id]);
    }
  };
  
  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      handleNodeClick(INFOGRAPHIC_NODES[currentIndex + 1]);
    } else {
      setActiveNodeId(null);
    }
  };
  
  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);
  const isComplete = visitedNodes.length === INFOGRAPHIC_NODES.length;
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0c1e',
      position: 'relative',
      overflow: activeNodeId ? 'hidden' : 'auto',
      padding: '3rem 1rem',
      fontFamily: '"Lora", serif',
      color: '#FFF'
    }}>
      <StarField />
      
      {/* Background image overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/assets/starwars/infographic_mundos/bg_mundos.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNodeId} />
        
        {/* Node Flow (Curved layout representation) */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '2rem', 
          margin: '4rem 0',
          position: 'relative'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              <NodeButton 
                node={node} 
                isVisited={(id) => visitedNodes.includes(id)}
                onClick={handleNodeClick}
              />
              {activeNodeId === node.id && (
                <motion.div
                  layoutId="activeDotSwSec2"
                  style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    marginLeft: '-4px',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: node.color,
                    boxShadow: `0 0 10px ${node.color}`
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <ProgressBar total={INFOGRAPHIC_NODES.length} visitedCount={visitedNodes.length} />
        
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              textAlign: 'center', 
              marginTop: '3rem', 
              padding: '2rem', 
              background: 'rgba(255, 183, 77, 0.1)', 
              borderRadius: '16px',
              border: '1px solid rgba(255, 183, 77, 0.3)'
            }}
          >
            <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#FFB74D', margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
              Â¡MÃ“DULO COMPLETADO!
            </h3>
            <p style={{ color: '#E0E0E0', margin: 0 }}>Has explorado todos los mundos extremos. Â¡La galaxia ya no tiene secretos para ti!</p>
          </motion.div>
        )}
        
        {/* Bibliography */}
        <div style={{ marginTop: '5rem', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#64B5F6', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DecoTelescope size={20} color="#64B5F6" /> ARCHIVOS JEDI (BibliografÃ­a)
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {BIBLIOGRAPHY.map((bib, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: '#78909C', lineHeight: 1.5, position: 'relative', paddingLeft: '1rem' }}>
                <span style={{ position: 'absolute', left: 0, top: '0.3rem', width: 4, height: 4, borderRadius: '50%', background: '#64B5F6' }} />
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <AnimatePresence>
        {activeNodeId && (
          <ContentPanel 
            setLightboxSrc={setLightboxSrc}
            node={activeNode} 
            onClose={() => setActiveNodeId(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
