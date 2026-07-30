'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Star Wars Themed)
   ========================================================================= */

const DecoHyperspace = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <line x1="2" y1="12" x2="10" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <line x1="14" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <line x1="4" y1="6" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="8" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const DecoBlackHole = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.9"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" stroke={color} strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

const DecoCompass = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill={color} opacity="0.8"/>
  </svg>
);

const DecoWavefront = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const DecoRuler = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="2" y="10" width="20" height="4" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="6" y1="10" x2="6" y2="12" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="10" y1="10" x2="10" y2="14" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="14" y1="10" x2="14" y2="12" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="18" y1="10" x2="18" y2="14" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoLightBeam = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 22L4 4L20 4L12 22Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <line x1="12" y1="4" x2="12" y2="22" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2"/>
  </svg>
);

const DecoShip = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8"/>
    <path d="M12 16L12 2" stroke={color} strokeWidth="2" opacity="0.5"/>
  </svg>
);

const DecoStar = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill={color} opacity="0.8"/>
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

const DECO_MAP = {
  'parsec-definicion': [DecoRuler, DecoCompass, DecoShip],
  'paralaje-estelar': [DecoLightBeam, DecoStar, DecoTelescope],
  'escalera-distancias': [DecoRuler, DecoStar, DecoLightBeam],
  'velocidad-luz': [DecoHyperspace, DecoWavefront, DecoStar],
  'warp-drive': [DecoWavefront, DecoShip, DecoHyperspace],
  'agujeros-negros': [DecoBlackHole, DecoWavefront, DecoStar],
  'navegacion-estelar': [DecoCompass, DecoShip, DecoStar],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Einstein, A. (1905). 'Zur Elektrodynamik bewegter KÃ¶rper', Annalen der Physik, 17",
  "Bessel, F. W. (1838). 'Bestimmung der Entfernung des 61sten Sterns des Schwans', Astronomische Nachrichten, 16",
  "Leavitt, H. S. & Pickering, E. C. (1912). 'Periods of 25 Variable Stars in the Small Magellanic Cloud', Harvard College Observatory Circular, 173",
  "Alcubierre, M. (1994). 'The warp drive: hyper-fast travel within general relativity', Classical and Quantum Gravity, 11",
  "Event Horizon Telescope Collaboration (2019). 'First M87 Event Horizon Telescope Results I', The Astrophysical Journal Letters, 875",
  "Gaia Collaboration (2022). 'Gaia Data Release 3', Astronomy & Astrophysics, 674"
];

const FALCON_GALLERY = [
  { src: '/assets/starwars/infographic_kessel/falcon_poster_art.png', caption: 'Carguero corelliano YT-1300, la nave mÃ¡s rÃ¡pida de la galaxia segÃºn Han Solo' },
  { src: '/assets/starwars/infographic_kessel/falcon_blueprint.jpg', caption: 'Planos tÃ©cnicos del YT-1300: vista superior, lateral y frontal con anotaciones en Aurebesh' },
  { src: '/assets/starwars/infographic_kessel/falcon_tie_chase.png', caption: 'El HalcÃ³n Milenario evadiendo cazas TIE sobre Jakku en El Despertar de la Fuerza (2015)' },
  { src: '/assets/starwars/infographic_kessel/falcon_hyperspace.jpg', caption: 'RepresentaciÃ³n del salto al hiperespacio: las estrellas se alargan por la dilataciÃ³n relativista' },
  { src: '/assets/starwars/infographic_kessel/falcon_topdown.png', caption: 'Vista cenital del HalcÃ³n Milenario mostrando su icÃ³nico diseÃ±o de disco asimÃ©trico' },
];

const INFOGRAPHIC_NODES = [
  {
    id: 'parsec-definicion',
    title: 'Â¿QuÃ© es un Parsec?',
    color: '#00CFFF',
    btnImage: '/assets/starwars/infographic_kessel/btn_parsec.png',
    image: '/assets/starwars/infographic_kessel/hero_parsec.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_parsec.png',
    bannerCaption: 'El HalcÃ³n Milenario navegando el temible Corredor de Kessel acortando distancias.',
    content: [
      "Â¿Te imaginas presumir de ser el corredor mÃ¡s rÃ¡pido en una pista, pero en lugar de decir que terminaste en diez segundos, dices que la corriste en cien metros? Esto es exactamente lo que hace Han Solo en la primera pelÃ­cula de Star Wars cuando afirma que su nave, el HalcÃ³n Milenario, completÃ³ el famoso Corredor de Kessel en menos de doce parsecs. Durante mucho tiempo los fans pensaron que era un error garrafal, porque un parsec es una unidad de distancia astronÃ³mica, no de tiempo. Es como si dijeras que llegaste a tu escuela en cinco kilÃ³metros en lugar de decir que llegaste en quince minutos. Â¡Pero en el espacio profundo, medir distancias es la clave!",
      "Un parsec, que significa 'paralaje de un segundo de arco', es una unidad fundamental que usan los astrÃ³nomos reales todos los dÃ­as. Equivale exactamente a 3.26 aÃ±os luz, lo que se traduce en la abrumadora e incomprensible cifra de 30.9 billones de kilÃ³metros. Cuando los cientÃ­ficos hablan sobre la lejanÃ­a entre diferentes estrellas en nuestra galaxia, casi nunca usan los kilÃ³metros porque los nÃºmeros serÃ­an demasiado grandes y engorrosos de escribir. En su lugar, el parsec les proporciona una medida mucho mÃ¡s manejable para cartografiar el inmenso universo. Por ejemplo, la estrella mÃ¡s cercana a nuestro Sistema Solar, PrÃ³xima Centauri, se encuentra a tan solo 1.3 parsecs de distancia.",
      "Para entender cÃ³mo funciona realmente un parsec, debemos pensar en la geometrÃ­a del Sistema Solar. Se define utilizando el radio de la Ã³rbita de la Tierra alrededor del Sol como lÃ­nea de base. Si pudieras viajar muy lejos en el espacio y mirar hacia atrÃ¡s hacia nuestro Sistema Solar, verÃ­as que la distancia entre la Tierra y el Sol se hace cada vez mÃ¡s pequeÃ±a visualmente. La distancia exacta en la que esa separaciÃ³n entre la Tierra y el Sol parece medir apenas un 'segundo de arco' (una diminuta fracciÃ³n de un grado) es exactamente lo que definimos como un parsec. Es un concepto matemÃ¡tico hermoso que conecta nuestra pequeÃ±a Ã³rbita terrestre con el vasto ocÃ©ano cÃ³smico.",
      "Entonces, Â¿cÃ³mo arreglÃ³ George Lucas el aparente error de Han Solo en las pelÃ­culas posteriores? La respuesta fue ingeniosa e introdujo nueva fÃ­sica fascinante. Resulta que el Corredor de Kessel es una ruta hiperespacial traicionera llena de agujeros negros y peligros cÃ³smicos llamada 'Las Fauces'. La ruta estÃ¡ndar era segura y larga. Lo que Han Solo hizo no fue volar mÃ¡s rÃ¡pido en tÃ©rminos de velocidad, sino volar de manera mucho mÃ¡s peligrosa, rozando los pozos gravitatorios letales de los agujeros negros para acortar la trayectoria fÃ­sica. Al tomar atajos extremadamente arriesgados que destruirÃ­an cualquier otra nave, logrÃ³ reducir la distancia total del viaje a menos de doce parsecs.",
      "Esta explicaciÃ³n tiene mucho sentido cientÃ­fico cuando consideramos cÃ³mo la gravedad extrema distorsiona verdaderamente el tejido del espacio y el tiempo. En nuestro universo real, la gravedad no solo atrae las cosas, sino que curva las rutas que la luz y las naves espaciales deben seguir. Acortar distancias navegando inteligentemente cerca de masas masivas es algo que nuestras propias sondas espaciales hacen al aprovechar la 'asistencia gravitatoria' de planetas como JÃºpiter. AsÃ­, el alarde de Han Solo se transformÃ³ de un posible error de guiÃ³n a una fascinante demostraciÃ³n de navegaciÃ³n astrofÃ­sica avanzada, demostrando que en el universo, la ruta mÃ¡s corta no siempre es una lÃ­nea recta."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la pelÃ­cula Solo: Una Historia de Star Wars (2018), finalmente pudimos presenciar exactamente cÃ³mo el joven Han Solo completÃ³ la legendaria hazaÃ±a del Corredor de Kessel. Utilizando el HalcÃ³n Milenario y la pericia de navegaciÃ³n de un droide conectado a la nave, Han se desviÃ³ intencionalmente de la ruta comercial segura. Al acercarse peligrosamente a un agujero negro supermasivo conocido como "El Sumidero", logrÃ³ trazar un camino mucho mÃ¡s corto y directo, justificando asÃ­ para siempre el uso de parsecs como medida de distancia en lugar de tiempo.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El tÃ©rmino "parsec" fue acuÃ±ado por primera vez en el aÃ±o 1913 por el astrÃ³nomo britÃ¡nico Herbert Hall Turner. ResultÃ³ ser una invenciÃ³n lingÃ¼Ã­stica brillante y prÃ¡ctica, combinando las primeras sÃ­labas de las palabras "paralaje" y "segundo". Aunque el pÃºblico general estÃ¡ mucho mÃ¡s familiarizado con el concepto de "aÃ±os luz" gracias a la ciencia ficciÃ³n y la divulgaciÃ³n popular, el parsec sigue siendo la unidad estÃ¡ndar y preferida de medida en todos los artÃ­culos de investigaciÃ³n astrofÃ­sica profesional en la actualidad.' 
      }
    ],
    fact: 'Un parsec equivale a 3.26 aÃ±os luz o aproximadamente 30.9 billones de kilÃ³metros. Se define como la distancia a la cual el radio medio de la Ã³rbita terrestre subtiende un Ã¡ngulo de un segundo de arco. Esta medida, basada fundamentalmente en la trigonometrÃ­a de nuestro propio Sistema Solar, es la unidad de distancia mÃ¡s utilizada por los astrÃ³nomos profesionales para mapear el universo a gran escala.'
  },
  {
    id: 'paralaje-estelar',
    title: 'El Truco del Paralaje',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_kessel/btn_paralaje.png',
    image: '/assets/starwars/infographic_kessel/hero_paralaje.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_paralaje.png',
    bannerCaption: 'La Tierra en su Ã³rbita ofrece dos perspectivas distintas para medir distancias.',
    content: [
      "Si alguna vez quieres sentirte como un verdadero astrÃ³nomo desde el sofÃ¡ de tu casa, intenta este sencillo experimento: levanta un dedo frente a tu cara y cierra un ojo, luego Ã¡brelo y cierra el otro. NotarÃ¡s que tu dedo parece saltar de un lado a otro en relaciÃ³n con el fondo de la habitaciÃ³n. Este efecto Ã³ptico fascinante se conoce como 'paralaje'. Tu cerebro utiliza constantemente esta ligera diferencia de perspectiva entre tus dos ojos para calcular a quÃ© distancia se encuentran las cosas y darte la percepciÃ³n de profundidad tridimensional en tu vida diaria.",
      "Los astrÃ³nomos usan exactamente este mismo truco para medir las inmensas distancias a las estrellas cercanas, pero en lugar de usar dos ojos separados por unos pocos centÃ­metros, usan el planeta Tierra entero. Al estar nuestro planeta en constante movimiento alrededor del Sol, podemos tomar una fotografÃ­a del cielo estrellado hoy y esperar exactamente seis meses para tomar otra. En ese medio aÃ±o, la Tierra se ha movido al lado opuesto de su Ã³rbita, proporcionando a los cientÃ­ficos una 'distancia entre los ojos' gigantesca de unos 300 millones de kilÃ³metros. Â¡Es el parpadeo cÃ³smico definitivo!",
      "Friedrich Bessel fue el brillante pionero que logrÃ³ medir la primera paralaje estelar exitosa de la historia en el aÃ±o 1838. EligiÃ³ una estrella llamada 61 Cygni porque sabÃ­a que se movÃ­a inusualmente rÃ¡pido en el cielo, lo que sugerÃ­a que estaba relativamente cerca de nosotros. El cambio de posiciÃ³n de la estrella que Bessel logrÃ³ medir fue increÃ­blemente diminuto, menos de un segundo de arco, pero fue suficiente para calcular por fin, por primera vez en toda la historia de la humanidad, la verdadera y asombrosa distancia entre nuestro Sistema Solar y otra estrella vecina en la galaxia.",
      "Para entender lo difÃ­cil que es medir el paralaje estelar, imagina el nivel de precisiÃ³n astronÃ³mica requerida. El Ã¡ngulo que los astrÃ³nomos intentan detectar es a menudo equivalente a intentar medir el ancho de una pequeÃ±a moneda situada en la superficie de la Luna, observÃ¡ndola directamente desde la Tierra. Durante muchas dÃ©cadas, este mÃ©todo estuvo severamente limitado por las turbulencias de nuestra propia atmÃ³sfera terrestre, que difuminaba la luz de las estrellas y hacÃ­a que medir Ã¡ngulos tan microscÃ³picos fuera una tarea casi titÃ¡nica y repleta de incertidumbres observacionales.",
      "Todo esto cambiÃ³ radicalmente con la llegada de las misiones espaciales. La Agencia Espacial Europea (ESA) lanzÃ³ el satÃ©lite Hipparcos en 1989 y posteriormente el revolucionario observatorio Gaia en 2013. Libre de las distorsiones de la atmÃ³sfera terrestre, Gaia ha logrado medir con una precisiÃ³n asombrosa las posiciones, distancias y movimientos de casi dos mil millones de estrellas en nuestra VÃ­a LÃ¡ctea. Este mapa estelar tridimensional sin precedentes es lo mÃ¡s parecido que tenemos en la vida real a las avanzadas computadoras de navegaciÃ³n hiperespacial que utilizan las formidables naves del universo de Star Wars."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el universo de Star Wars, calcular rutas hiperespaciales es extremadamente complejo y requiere computadoras de navegaciÃ³n avanzadas ("navicomputers"). Si una nave salta al hiperespacio sin calcular correctamente las posiciones estelares y el paralaje de los objetos astronÃ³micos, corre el riesgo de estrellarse directamente contra una estrella, un asteroide o rebotar demasiado cerca del pozo gravitatorio de una supernova masiva, un destino catastrÃ³fico que Han Solo describe vÃ­vidamente a Luke Skywalker para explicar por quÃ© no pueden simplemente escapar de Tatooine de manera inmediata.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'La sonda espacial New Horizons de la NASA, tras su histÃ³rico y emocionante sobrevuelo de PlutÃ³n, viajÃ³ tan lejos en los confines oscuros y helados del Sistema Solar que logrÃ³ capturar el primer paralaje interestelar verdaderamente visible a simple vista. En el aÃ±o 2020, desde una asombrosa distancia de mÃ¡s de 7 mil millones de kilÃ³metros de la Tierra, la sonda tomÃ³ fotografÃ­as precisas de las estrellas PrÃ³xima Centauri y Wolf 359, las cuales se veÃ­an claramente en posiciones distintas y desplazadas en comparaciÃ³n a las que observamos normalmente desde nuestro cÃ¡lido planeta azul.' 
      }
    ],
    fact: 'Friedrich Bessel midiÃ³ la primera paralaje estelar de la historia en 1838 para la estrella 61 Cygni. En la actualidad, el telescopio espacial Gaia de la Agencia Espacial Europea ha cartografiado detalladamente casi dos mil millones de estrellas con una impresionante precisiÃ³n de microsegundos de arco, creando sin lugar a dudas el mapa tridimensional mÃ¡s detallado de nuestra galaxia jamÃ¡s concebido por la mente humana.'
  },
  {
    id: 'escalera-distancias',
    title: 'La Escalera CÃ³smica',
    color: '#AB47BC',
    btnImage: '/assets/starwars/infographic_kessel/btn_escalera.png',
    image: '/assets/starwars/infographic_kessel/hero_escalera.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_escalera.png',
    bannerCaption: 'Cada peldaÃ±o de la escalera cÃ³smica nos permite medir distancias cada vez mÃ¡s inmensas.',
    content: [
      "Â¿CÃ³mo medirÃ­as la distancia a una ciudad lejana si no tuvieras un mapa ni un odÃ³metro en tu auto? En la Tierra es relativamente fÃ¡cil usar reglas o lÃ¡sers, pero en el espacio profundo, los astrÃ³nomos no tienen una cinta mÃ©trica infinita. Una vez que las estrellas estÃ¡n demasiado lejos, el truco del paralaje estelar deja de funcionar porque el salto visual es tan microscÃ³pico que nuestros instrumentos no pueden detectarlo. Es aquÃ­ donde la ingeniosidad humana tuvo que construir lo que hoy conocemos cariÃ±osamente como la 'Escalera de Distancias CÃ³smicas', un mÃ©todo paso a paso para medir el inabarcable universo.",
      "El primer gran peldaÃ±o de esta escalera se construyÃ³ gracias a la brillante astrÃ³noma Henrietta Swan Leavitt en el aÃ±o 1912. Ella estaba analizando montones de placas fotogrÃ¡ficas y descubriÃ³ un tipo especial de estrellas latientes llamadas 'Cefeidas'. Henrietta notÃ³ un patrÃ³n asombrosamente rÃ­tmico y hermoso: cuanto mÃ¡s brillante era intrÃ­nsecamente la estrella, mÃ¡s tiempo tardaba en parpadear o latir. Este descubrimiento cambiÃ³ la historia, porque al medir simplemente el tiempo que tardaba en pulsar una estrella lejana, los astrÃ³nomos ahora podÃ­an saber exactamente cuÃ¡nta luz emitÃ­a de verdad.",
      "Piensa en las Cefeidas como si fueran faros en una costa oscura, conocidos como 'candelas estÃ¡ndar'. Si sabes que todas las bombillas de 100 vatios tienen un brillo especÃ­fico, y ves una a lo lejos que parece muy tenue, puedes calcular con gran exactitud a quÃ© distancia debe estar para verse tan dÃ©bil. La regla de Henrietta Leavitt permitiÃ³ a gigantes de la astronomÃ­a como Edwin Hubble medir por primera vez la distancia a la galaxia de AndrÃ³meda, demostrando con asombro que el universo era muchÃ­simo mÃ¡s grande y vasto de lo que cualquiera habÃ­a atrevido a soÃ±ar en aquel momento.",
      "Pero la escalera no se detiene ahÃ­. Para medir distancias aÃºn mÃ¡s colosales, mÃ¡s allÃ¡ de donde podemos distinguir estrellas individuales brillantes, los astrofÃ­sicos utilizan el segundo peldaÃ±o: las explosiones estelares masivas llamadas supernovas de Tipo Ia. Estas explosiones cataclÃ­smicas ocurren cuando una pequeÃ±a pero densa estrella enana blanca devora demasiado material de una estrella compaÃ±era cercana hasta llegar a un lÃ­mite de masa crÃ­tico y explotar. Debido a que siempre explotan al alcanzar exactamente la misma cantidad de masa, el estallido siempre tiene una luminosidad mÃ¡xima idÃ©ntica, sirviendo como una bombilla de proporciones galÃ¡cticas.",
      "Cada nuevo escalÃ³n de nuestra escalera cÃ³smica depende crucialmente del peldaÃ±o anterior para ser calibrado y confirmado. Medimos las Cefeidas cercanas usando el confiable mÃ©todo de paralaje, y luego utilizamos esas Cefeidas ya medidas para calibrar a quÃ© distancia exacta se encuentran las poderosas supernovas, lo que nos permite explorar los confines del universo observable. Esta cadena ininterrumpida de descubrimientos astronÃ³micos es lo que nos permite trazar con confianza los abismos del cosmos, desde nuestro humilde vecindario estelar hasta las galaxias mÃ¡s lejanas y antiguas concebibles."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el universo expandido de Star Wars, los exploradores hiperespaciales y los audaces cartÃ³grafos estelares tenÃ­an que descubrir y documentar gradualmente las rutas seguras de la inmensa galaxia a travÃ©s del tiempo, trazando saltos hiperespaciales apoyados en faros de navegaciÃ³n cÃ³smica (nav beacons) y mapeando meticulosamente los distintos sectores. AsÃ­ como nosotros construimos la escalera de distancias cÃ³smicas peldaÃ±o a peldaÃ±o, la antigua civilizaciÃ³n galÃ¡ctica tuvo que expandirse lentamente de sistema en sistema utilizando balizas para no perderse en la vastedad insondable del hiperespacio.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'A pesar de ser una de las mentes mÃ¡s brillantes de su generaciÃ³n y haber descubierto la crucial ley de las variables Cefeidas que permitiÃ³ a la humanidad medir el universo a gran escala, Henrietta Swan Leavitt no recibiÃ³ el reconocimiento formal ni el salario que verdaderamente merecÃ­a durante su vida en el Observatorio de Harvard. AÃ±os mÃ¡s tarde, cuando un colega intentÃ³ finalmente nominarla para el prestigioso Premio Nobel de FÃ­sica por su revolucionaria labor, descubriÃ³ con tristeza que ella habÃ­a fallecido varios aÃ±os antes, impidiÃ©ndole recibir el merecido honor.' 
      }
    ],
    fact: 'Henrietta Swan Leavitt descubriÃ³ en 1912 la relaciÃ³n perÃ­odo-luminosidad de las estrellas variables Cefeidas, un avance monumental que sentÃ³ las bases para medir distancias intergalÃ¡cticas extremas. Este descubrimiento fundamental fue la clave indispensable que permitiÃ³ a Edwin Hubble en la dÃ©cada de 1920 demostrar fehacientemente que el universo se estÃ¡ expandiendo y que existen innumerables galaxias gigantescas mucho mÃ¡s allÃ¡ de las tenues fronteras de nuestra VÃ­a LÃ¡ctea.'
  },
  {
    id: 'velocidad-luz',
    title: 'Nada Supera a la Luz',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_kessel/btn_velocidad.png',
    image: '/assets/starwars/infographic_kessel/hero_velocidad.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_velocidad.png',
    bannerCaption: 'La luz viaja a 300,000 km/s â€” el lÃ­mite absoluto del cosmos.',
    content: [
      "Si existiera una policÃ­a de trÃ¡nsito en el cosmos, tendrÃ­a un trabajo muy sencillo, porque en nuestro universo solo existe un Ãºnico y estricto lÃ­mite de velocidad que nadie puede romper: la velocidad de la luz. Conocida por la famosa letra 'c', la luz viaja en el vacÃ­o a la asombrosa e incomprensible rapidez de casi 300,000 kilÃ³metros por cada segundo que pasa. A esta vertiginosa velocidad, un rayo de luz podrÃ­a dar la vuelta a la Tierra entera siete veces y media en un solo segundo, o viajar desde la superficie de nuestra Luna hasta nuestros ojos en poco mÃ¡s de un segundo.",
      "Pero, Â¿por quÃ© nada puede ir mÃ¡s rÃ¡pido que la luz? La culpa de esta prohibiciÃ³n cÃ³smica la tiene un genio llamado Albert Einstein y su famosa teorÃ­a de la Relatividad Especial, publicada en 1905. Einstein descubriÃ³ que a medida que un objeto con masa, como una nave espacial o una persona, se mueve mÃ¡s y mÃ¡s rÃ¡pido acelerando por el espacio, la energÃ­a que se requiere para empujarlo y aumentar aÃºn mÃ¡s su velocidad crece exponencialmente. Para que algo sÃ³lido lograra alcanzar la velocidad exacta de la luz, requerirÃ­a una cantidad infinita de energÃ­a, lo cual es fÃ­sicamente imposible en nuestra realidad.",
      "Este lÃ­mite de velocidad impone una condiciÃ³n fascinante en la astronomÃ­a: cuando miramos al cielo nocturno profundo, en realidad estamos mirando hacia el pasado distante. Porque la luz de las estrellas necesita tiempo para cruzar las inmensas distancias, siempre vemos los objetos cÃ³smicos tal como eran cuando la luz saliÃ³ de ellos. Cuando observas el sol en un dÃ­a brillante, no estÃ¡s viendo el sol en este mismo instante, sino el sol tal como era hace ocho agotadores minutos, que es el tiempo que tardan sus fotones en viajar por el vasto vacÃ­o espacial hasta alcanzar la superficie de nuestro planeta.",
      "Telescopios modernos increÃ­blemente poderosos, como el Telescopio Espacial James Webb (JWST), son esencialmente inmensas y sofisticadas mÃ¡quinas del tiempo. Pueden observar el dÃ©bil resplandor de galaxias antiguas que se formaron hace mÃ¡s de trece mil millones de aÃ±os, apenas poco tiempo despuÃ©s del mismÃ­simo Big Bang que dio origen a todo lo que existe. La luz de estas primitivas galaxias ha estado viajando a travÃ©s de la enorme expansiÃ³n del universo durante miles de millones de aÃ±os ininterrumpidos antes de chocar finalmente con los espejos dorados de nuestros telescopios en Ã³rbita terrestre.",
      "Otro fenÃ³meno asombroso causado por la inmensidad del universo y la velocidad finita de la luz es el 'corrimiento al rojo'. A medida que el propio tejido del espacio se estira y el universo continÃºa expandiÃ©ndose rÃ¡pidamente, las ondas de luz que viajan a travÃ©s de Ã©l tambiÃ©n se estiran implacablemente. Como si fuera una liga elÃ¡stica que se tensa, la luz originalmente azul se estira hasta volverse roja o incluso transformarse en radiaciÃ³n infrarroja invisible. Por esta profunda y fascinante razÃ³n, los telescopios mÃ¡s modernos que buscan las galaxias mÃ¡s distantes deben estar equipados con cÃ¡maras tÃ©rmicas especializadas en detectar luz infrarroja altamente estirada."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el rico y expansivo universo de Star Wars, los ingenieros espaciales lograron evadir magistralmente el estricto e inquebrantable lÃ­mite de velocidad de la luz mediante el ingenioso uso del "hiperimpulsor". En lugar de tratar de acelerar inÃºtilmente a travÃ©s del espacio normal en un viaje que tomarÃ­a miles de aÃ±os, el hiperimpulsor permite a la nave dar un asombroso salto hacia una dimensiÃ³n paralela conocida como el hiperespacio, un atajo cÃ³smico donde las rÃ­gidas leyes convencionales de la fÃ­sica relativista y las distancias tradicionales del universo no aplican de la misma manera limitante.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La TeorÃ­a de la Relatividad Especial de Albert Einstein (1905) estableciÃ³ para siempre de manera concluyente que la velocidad de la luz en el inmenso vacÃ­o (c = 299,792.458 kilÃ³metros por segundo) es absolutamente la velocidad mÃ¡xima e insuperable a la que cualquier tipo de materia convencional, energÃ­a cuantificable o seÃ±al de informaciÃ³n puede viajar lÃ³gicamente a travÃ©s de la vasta extensiÃ³n del espacio cÃ³smico, dictando asÃ­ la inquebrantable estructura de causalidad en nuestra misteriosa y maravillosa realidad fÃ­sica.' 
      }
    ],
    fact: 'El lÃ­mite absoluto de velocidad cÃ³smica c (la velocidad de la luz) es de casi 300,000 kilÃ³metros por segundo, lo suficientemente veloz para darle siete vueltas completas a nuestro planeta Tierra en un solo segundo. Al mirar el firmamento estrellado, vemos inevitablemente hacia el pasado: la luz de la galaxia de AndrÃ³meda que percibimos en este momento tardÃ³ la asombrosa cantidad de 2.5 millones de largos aÃ±os en alcanzarnos.'
  },
  {
    id: 'warp-drive',
    title: 'El Motor de Curvatura',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_kessel/btn_warp.png',
    image: '/assets/starwars/infographic_kessel/hero_warp.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_warp.png',
    bannerCaption: 'Del concepto de Alcubierre a los solitones de Lentz: la evoluciÃ³n del motor de curvatura.',
    content: [
      "Â¿Es realmente imposible viajar mÃ¡s rÃ¡pido que la luz sin romper las leyes estrictas de la fÃ­sica fundamental? Sorprendentemente, un brillante y atrevido fÃ­sico teÃ³rico mexicano llamado Miguel Alcubierre propuso una idea revolucionaria en el aÃ±o 1994 que dejÃ³ boquiabiertos a muchos cientÃ­ficos. Inspirado por la icÃ³nica ciencia ficciÃ³n de Star Trek, desarrollÃ³ una asombrosa soluciÃ³n matemÃ¡tica basada en las mismÃ­simas ecuaciones de la relatividad de Einstein, un concepto teÃ³rico que hoy en dÃ­a todo el mundo conoce como el famoso e intrigante 'Motor de Curvatura' o 'Warp Drive'.",
      "El concepto ingenioso de Alcubierre es el siguiente: la nave en sÃ­ misma no se mueve mÃ¡s rÃ¡pido que la luz a travÃ©s de su espacio inmediato, algo que Einstein prohibiÃ³ estrictamente. En lugar de eso, la nave se encapsula de forma segura dentro de una 'burbuja de curvatura' o burbuja de espacio-tiempo. El motor hipotÃ©tico comprime o encoge rÃ¡pidamente el espacio situado justo delante de la nave y expande velozmente el espacio ubicado justo detrÃ¡s de ella. Al hacer esto, la nave simplemente surfea dÃ³cilmente en una ola del propio tejido espaciotemporal, deslizÃ¡ndose de forma majestuosa.",
      "Para imaginarlo de una manera mucho mÃ¡s cotidiana y fÃ¡cil de entender, piensa en ti mismo de pie en una cinta transportadora mecÃ¡nica, como las que hay en los aeropuertos. TÃº no estÃ¡s corriendo velozmente ni rompiendo el rÃ©cord mundial de cien metros lisos; en realidad estÃ¡s totalmente quieto sobre la goma de la cinta. Es la misma cinta (el tejido mismo del espacio-tiempo) la que se estÃ¡ moviendo a tu alrededor y transportÃ¡ndote de manera eficiente. De esta forma astuta, el universo permite que la burbuja de curvatura avance por el cosmos a velocidades infinitamente superiores a la luz.",
      "Por supuesto, esta idea tan maravillosamente exÃ³tica tenÃ­a originalmente un defecto colosal. Para poder encoger y expandir el espacio de la manera necesaria, las ecuaciones matemÃ¡ticas originales requerÃ­an la existencia de 'energÃ­a negativa' o materia exÃ³tica con masa negativa, algo que hasta el dÃ­a de hoy nunca hemos visto ni comprobado que exista en la naturaleza. AdemÃ¡s, la cantidad absurda de energÃ­a requerida superaba con creces toda la energÃ­a presente en el mismÃ­simo universo observable, haciendo que el prometedor motor Warp pareciera una imposibilidad pura para la eternidad.",
      "Sin embargo, la incesante investigaciÃ³n cientÃ­fica no se ha detenido nunca. Recientemente, en el aÃ±o 2021, un astrofÃ­sico llamado Erik Lentz publicÃ³ unas ecuaciones mucho mÃ¡s optimistas demostrando que los motores de curvatura basados puramente en la geometrÃ­a de los solitones (ondas autosuficientes estables) podrÃ­an llegar a construirse operando Ãºnicamente con fuentes convencionales de energÃ­a positiva. Y aunque todavÃ­a requerirÃ­a la inmensa cantidad de energÃ­a de cientos de veces la masa del planeta JÃºpiter convertida en energÃ­a pura, significa que viajar a las estrellas podrÃ­a ser finalmente posible."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Cuando el intrÃ©pido y legendario HalcÃ³n Milenario da el famoso y vertiginoso salto hiperespacial, las estrellas visibles a travÃ©s de su amplia cabina de mando se alargan formando espectaculares estrÃ­as brillantes de pura luz blanca (starlines). Esta inolvidable y emocionante representaciÃ³n visual cinematogrÃ¡fica captura perfectamente de forma artÃ­stica cÃ³mo se percibirÃ­a y sentirÃ­a ser encapsulado mÃ¡gicamente en un tÃºnel dimensional distorsionado y ser lanzado brutalmente a viajar por el cosmos a velocidades inalcanzables rompiendo los lÃ­mites de la fÃ­sica convencional conocida.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'La prestigiosa agencia espacial NASA financiÃ³ durante mucho tiempo un interesante y discreto programa de fÃ­sica propulsora altamente experimental y revolucionario dirigido por el destacado cientÃ­fico Harold White en el Centro Espacial Johnson en Houston. El equipo del Dr. White intentÃ³ crear pequeÃ±Ã­simas e imperceptibles burbujas de curvatura microscÃ³picas (warps) utilizando un complejo y delicado instrumento lÃ¡ser de interferometrÃ­a muy avanzado, probando la fascinante hipÃ³tesis de que el tejido del espacio mismo realmente puede llegar a deformarse artificialmente en los modernos laboratorios.' 
      }
    ],
    fact: 'El fÃ­sico mexicano Miguel Alcubierre demostrÃ³ magistralmente en 1994 que un verdadero viaje a velocidades aparentemente superlumÃ­nicas es teÃ³ricamente y matemÃ¡ticamente posible deformando y retorciendo el tejido del espacio-tiempo (el Motor Warp). En el aÃ±o 2021, el investigador Erik Lentz propuso de manera brillante una nueva soluciÃ³n para lograr motores de curvatura estables de geometrÃ­a hiperbÃ³lica que asombrosamente no requieren el uso de la imposible energÃ­a negativa, reavivando grandemente las serias esperanzas cientÃ­ficas de lograr algÃºn dÃ­a lejanos viajes interestelares humanos.'
  },
  {
    id: 'agujeros-negros',
    title: 'El Sumidero de Kessel',
    color: '#EF5350',
    btnImage: '/assets/starwars/infographic_kessel/btn_agujeros.png',
    image: '/assets/starwars/infographic_kessel/hero_agujeros.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_agujeros.png',
    bannerCaption: 'Los agujeros negros retuercen tanto la gravedad que ni siquiera la luz puede escapar de su interior.',
    content: [
      "En la historia del Corredor de Kessel, la zona mÃ¡s conocida es 'Las Fauces', un cÃºmulo poblado por agujeros negros. Estos pozos gravitatorios no son solo ciencia ficciÃ³n. En el universo real, los agujeros negros son objetos fascinantes y misteriosos del cosmos inexplorado.",
      "Un agujero negro se forma tÃ­picamente cuando una estrella sÃºper masiva, al menos unas veinte veces mÃ¡s pesada que nuestro propio modesto Sol, agota por completo todo su combustible de fusiÃ³n nuclear y muere exhausta. Al detenerse bruscamente la reacciÃ³n que generaba su energÃ­a hacia afuera, no hay nada que soporte el abrumador peso de la estrella, y la poderosa gravedad aplasta su enorme nÃºcleo violentamente hacia adentro. Todo el material gigantesco se comprime incesantemente hasta quedar atrapado en un minÃºsculo e infinitamente denso punto geomÃ©trico que los astrofÃ­sicos llaman la 'singularidad'.",
      "La atracciÃ³n gravitatoria de estos colapsos espectaculares es tan asombrosamente colosal e intensa que domina absolutamente su vecindario espacial cercano. Hay una temida y definitiva frontera o lÃ­mite invisible alrededor del mortÃ­fero agujero negro llamada cariÃ±osamente el 'horizonte de sucesos'. Si algo, incluso la luz mÃ¡s veloz del universo, cruza desprevenidamente esa invisible lÃ­nea de no retorno gravitatorio, quedarÃ¡ atrapado sin remedio para toda la eternidad. Es por esta simple pero aplastante razÃ³n que los denominamos agujeros verdaderamente 'negros', ya que no emiten luz.",
      "QuizÃ¡s el aspecto mÃ¡s contraintuitivo de los poderosos agujeros negros es el fenÃ³meno increÃ­ble conocido formalmente en la fÃ­sica relativista como la 'dilataciÃ³n gravitacional del tiempo'. A medida que un valiente observador espacial se acerca temerariamente a un inmenso campo gravitacional, el tiempo literalmente se ralentiza y frena su ritmo de avance constante para esa persona en relaciÃ³n y comparaciÃ³n con las demÃ¡s personas que se encuentran muy lejos, protegidas, seguras y libres de esa distorsiÃ³n cÃ³smica fundamental y abrumadoramente intensa de la relatividad.",
      "Este asombroso efecto no es exclusivo Ãºnicamente de los lejanos monstruos astronÃ³micos; lo experimentamos de forma dÃ©bil aquÃ­ mismo en nuestro planeta. Los relojes atÃ³micos ultra precisos situados dentro de los modernos satÃ©lites de GPS en Ã³rbita estÃ¡n mÃ¡s lejos de la enorme atracciÃ³n gravitacional de la Tierra que nosotros y, en consecuencia, deben corregir su ritmo inexorablemente por 38 microsegundos cada bendito dÃ­a, Â¡o de lo contrario nuestra navegaciÃ³n terrestre se desviarÃ­a catastrÃ³ficamente! Acercarse a un agujero negro llevarÃ­a esta loca alteraciÃ³n del tiempo al lÃ­mite mÃ¡s absoluto."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la pelÃ­cula "Solo: Una Historia de Star Wars", el HalcÃ³n Milenario y su tripulaciÃ³n enfrentan el peligro de la atracciÃ³n gravitatoria de El Sumidero de Kessel. Han Solo utiliza un pequeÃ±o frasco del combustible lÃ­quido (coaxium) en bruto para darle a los motores un impulso que les permita escapar justo antes de cruzar el horizonte de sucesos.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Durante muchas dÃ©cadas pasadas los formidables agujeros negros fueron meramente considerados como unos fascinantes y desconcertantes constructos teÃ³ricos o curiosidades matemÃ¡ticas puras, pero en el aÃ±o histÃ³rico del 2019, la audaz ColaboraciÃ³n Internacional del Event Horizon Telescope (EHT) publicÃ³ con enorme orgullo la primera e histÃ³rica fotografÃ­a autÃ©ntica de la oscura silueta supermasiva del gigantesco agujero negro y su disco brillante de acreciÃ³n ubicado resplandecientemente en el brillante y agitado corazÃ³n de la galaxia Messier 87 (M87*).' 
      }
    ],
    fact: 'El consorcio internacional Event Horizon Telescope Collaboration (EHT) publicÃ³ asombrosamente en el glorioso aÃ±o del 2019 la primera evidencia visual e imagen absolutamente histÃ³rica del agujero negro supermasivo localizado firmemente en el violento y luminoso centro de la activa galaxia M87*, confirmando con un Ã©xito arrollador e innegable todas y cada una de las grandes y osadas predicciones teÃ³ricas hechas por Einstein.'
  },
  {
    id: 'navegacion-estelar',
    title: 'GPS del Espacio Profundo',
    color: '#42A5F5',
    btnImage: '/assets/starwars/infographic_kessel/btn_navegacion.png',
    image: '/assets/starwars/infographic_kessel/hero_navegacion.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_navegacion.png',
    bannerCaption: 'La Red del Espacio Profundo mantiene contacto con nuestras sondas mÃ¡s lejanas.',
    content: [
      "Navegar por nuestro Sistema Solar, y mÃ¡s aÃºn por el espacio interestelar, es un gran desafÃ­o tÃ©cnico. Â¿CÃ³mo sabe una sonda espacial como la Voyager 1 en quÃ© lugar se encuentra cuando viaja a miles de millones de kilÃ³metros de la Tierra?",
      "Las sondas interplanetarias Voyager 1 y Voyager 2, lanzadas por la NASA en 1977, orientan su rumbo empleando 'rastreadores de estrellas'. Estos sensores visuales escanean el cielo para ubicar la luz de estrellas de referencia brillantes, como Canopus o nuestro Sol, calculando asÃ­ sus coordenadas espaciales exactas.",
      "Para comunicarse con estas naves, la NASA utiliza la Red del Espacio Profundo (DSN). Es una red de grandes antenas parabÃ³licas ubicadas en California, Madrid y Canberra. Esto garantiza que, mientras la Tierra rota, siempre haya una antena apuntando hacia las naves.",
      "Para futuros viajes interestelares, los astrÃ³nomos proponen usar pÃºlsares (estrellas de neutrones que giran rÃ¡pidamente y emiten radiaciÃ³n) como un Sistema de Posicionamiento Global galÃ¡ctico. Sus pulsaciones son tan constantes que funcionan como relojes de precisiÃ³n en el espacio.",
      "Este concepto es parte de investigaciones reales. Proyectos como 'Breakthrough Starshot' buscan impulsar pequeÃ±as sondas utilizando rayos lÃ¡ser desde la Tierra, con el objetivo de alcanzar un 20% de la velocidad de la luz hacia nuestra vecina estelar mÃ¡s cercana, Alfa Centauri."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En Star Wars, los droides astromecÃ¡nicos como R2-D2 son los verdaderos hÃ©roes de la navegaciÃ³n hiperespacial. Se conectan directamente al sistema de vuelo de los cazas X-Wing y calculan instantÃ¡neamente las rutas hiperespaciales seguras, actuando como computadoras de navegaciÃ³n vivientes. Sin un droide astromecÃ¡nico, un piloto rebelde arriesga estrellarse contra una estrella o quedarse varado en el vacÃ­o. Es la versiÃ³n galÃ¡ctica de intentar conducir por una ciudad desconocida sin GPS ni mapa.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Las sondas Pioneer 10 y Pioneer 11 llevan una placa dorada diseÃ±ada por Carl Sagan y Frank Drake que muestra la posiciÃ³n de nuestro Sol usando 14 pÃºlsares como referencia. Cada pÃºlsar tiene su frecuencia grabada en cÃ³digo binario, formando un mapa Ãºnico que cualquier civilizaciÃ³n avanzada podrÃ­a usar para encontrar la Tierra. La Voyager 1, lanzada en 1977, es actualmente el objeto humano mÃ¡s lejano, a mÃ¡s de 24 mil millones de kilÃ³metros, y sus seÃ±ales de radio tardan casi 23 horas en llegar a nosotros.' 
      }
    ],
    fact: 'La Red del Espacio Profundo (DSN) de la NASA opera tres complejos de antenas en California, Madrid y Canberra, garantizando cobertura de comunicaciÃ³n las 24 horas. La Voyager 1, a mÃ¡s de 24 mil millones de km, transmite con apenas 23 vatios de potencia (como una bombilla de nevera) y sus seÃ±ales tardan casi un dÃ­a en llegar. El proyecto Breakthrough Starshot propone enviar nanosondas al 20% de la velocidad de la luz hacia PrÃ³xima Centauri, llegando en solo 20 aÃ±os.'
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
        PARSECS Y KESSEL
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        DISTANCIAS &middot; PARALAJE &middot; HIPERESPACIO
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec1" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
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
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
              width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
            }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[1]}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
                {node.fact}
              </p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}55` }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ cursor: 'pointer', width: '100%', height: 'auto', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif' }}>
                  {node.bannerCaption}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[3]}
          </p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[4]}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
          ARCHIVOS DE LA ALIANZA / {node.title.toUpperCase()}
        </div>
        <button 
          onClick={onNext}
          style={{ 
            background: node.color, 
            color: '#000', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            fontFamily: '"Oswald", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 4px 15px ${node.color}66`
          }}
        >
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec1() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const shuffledFalcons = useMemo(() => {
    const arr = [...FALCON_GALLERY];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    if (!visitedNodes.has(node.id)) {
      setVisitedNodes(prev => new Set(prev).add(node.id));
    }
  };

  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      const nextNode = INFOGRAPHIC_NODES[currentIndex + 1];
      handleNodeClick(nextNode);
    } else {
      setActiveNode(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_kessel/bg_kessel.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>PROGRESO DE DESCARGA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #42A5F5, #AB47BC)', boxShadow: '0 0 10px #42A5F5' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #FFB74D, #FF7043)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#000', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(255, 183, 77, 0.4)' }}
            >
              <Sparkles size={24} />
              Â¡DATOS DE NAVEGACIÃ“N DESCARGADOS CON Ã‰XITO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* GalerÃ­a del HalcÃ³n Milenario */}
        <div style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#FFB74D', fontSize: '1.4rem', textAlign: 'center', marginBottom: '1.5rem', textShadow: '0 0 20px rgba(255,183,77,0.3)' }}>
            ðŸš€ EL HALCÃ“N MILENARIO EN EL CORREDOR DE KESSEL
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1rem' 
          }}>
            {shuffledFalcons.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,183,77,0.3)',
                  background: '#0B0D17',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
                onClick={() => setLightboxSrc(img.src)}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '160px' }}>
                  <img 
                    src={img.src} 
                    alt={img.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(5,6,10,0.85) 100%)' }} />
                </div>
                <p style={{ 
                  padding: '0.6rem 0.8rem', 
                  margin: 0, 
                  fontSize: '0.8rem', 
                  color: '#B0BEC5', 
                  fontFamily: '"Oswald", sans-serif',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}>
                  {img.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS JEDI (BibliografÃ­a)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            setLightboxSrc={setLightboxSrc}
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
