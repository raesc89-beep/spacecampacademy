'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Jedi Themed)
   ========================================================================= */

const DecoLightsaber = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <line x1="12" y1="2" x2="12" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
    <rect x="10" y="16" width="4" height="6" rx="1" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoHolocron = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <polygon points="12,2 22,12 12,22 2,12" stroke={color} strokeWidth="1.5" fill={`${color}22`} />
    <polygon points="12,6 18,12 12,18 6,12" stroke={color} strokeWidth="1.5" opacity="0.7" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

const DecoForceRipple = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1" opacity="0.3"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.9"/>
  </svg>
);

const DecoBrain = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 4C8 4 5 7 5 11C5 12.5 5.5 13.8 6.3 14.8C6.1 16.5 7 18 9 18.5C9.5 20 11 21 12 21C13 21 14.5 20 15 18.5C17 18 17.9 16.5 17.7 14.8C18.5 13.8 19 12.5 19 11C19 7 16 4 12 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M12 4V21" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
    <path d="M8 9C9 9 9.5 10 9.5 11" stroke={color} strokeWidth="1" opacity="0.6"/>
    <path d="M16 9C15 9 14.5 10 14.5 11" stroke={color} strokeWidth="1" opacity="0.6"/>
  </svg>
);

const DecoJediSymbol = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L14 8H20L15 12L17 18L12 14.5L7 18L9 12L4 8H10L12 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1" opacity="0.4"/>
  </svg>
);

const DECO_MAP = {
  'amigdala-meditacion': [DecoBrain, DecoForceRipple],
  'mindfulness-jedi': [DecoHolocron, DecoJediSymbol],
  'neuroplasticidad': [DecoBrain, DecoLightsaber],
  'respiracion-kenobi': [DecoForceRipple, DecoHolocron],
  'inteligencia-emocional': [DecoJediSymbol, DecoForceRipple],
  'lado-oscuro-cortisol': [DecoLightsaber, DecoBrain],
  'sueno-jedi': [DecoHolocron, DecoForceRipple],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Lazar, S. W., et al. (2005). 'Meditation experience is associated with increased cortical thickness'. Neuroreport, 16(17).",
  "Goleman, D. (1995). 'Emotional Intelligence: Why It Can Matter More Than IQ'. Bantam Books.",
  "McEwen, B. S. (2007). 'Physiology and neurobiology of stress and adaptation: central role of the brain'. Physiological Reviews, 87(3).",
  "Walker, M. (2017). 'Why We Sleep: Unlocking the Power of Sleep and Dreams'. Scribner.",
  "Doidge, N. (2007). 'The Brain That Changes Itself: Stories of Personal Triumph from the Frontiers of Brain Science'. Viking Press.",
  "Tang, Y. Y., et al. (2015). 'The neuroscience of mindfulness meditation'. Nature Reviews Neuroscience, 16(4)."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'amigdala-meditacion',
    title: 'La AmÃ­gdala: Tu Alarma Interna',
    color: '#7B68EE',
    btnImage: '/assets/starwars/infographic_jedi/btn_amigdala_meditacion.png',
    image: '/assets/starwars/infographic_jedi/hero_amigdala_meditacion.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_amigdala_meditacion.png',
    bannerCaption: 'Un Padawan aprendiendo a calmar su mente en los silenciosos salones del Templo Jedi.',
    content: [
      "Imagina que dentro de tu cabeza, justo en el centro de tu cerebro, tienes un pequeÃ±o pero poderoso botÃ³n de alarma del tamaÃ±o de una almendra. Esta pequeÃ±a estructura se llama 'amÃ­gdala', y su trabajo principal es mantenerte a salvo de los peligros. Cuando nuestros ancestros vivÃ­an en cavernas y veÃ­an un tigre dientes de sable, la amÃ­gdala encendÃ­a la alarma roja, preparando el cuerpo para correr muy rÃ¡pido o pelear con todas sus fuerzas. Â¡Era como una sirena de emergencia sÃºper ruidosa!",
      "El problema es que hoy en dÃ­a no hay tigres en las calles, pero tu amÃ­gdala sigue encendiendo la alarma roja cuando tienes un examen difÃ­cil de matemÃ¡ticas, cuando te peleas con tu mejor amigo, o cuando te pones muy nervioso. Esto hace que tu corazÃ³n lata muy rÃ¡pido y tus manos suden, igual que si estuvieras en un peligro real. Cuando la amÃ­gdala grita demasiado fuerte, no deja que otra parte de tu cerebro, la que te ayuda a pensar con claridad y resolver problemas (la corteza prefrontal), haga su trabajo.",
      "AquÃ­ es donde entra la sabidurÃ­a milenaria. Los cientÃ­ficos de lugares famosos como la Universidad de Harvard han descubierto algo asombroso usando mÃ¡quinas que pueden ver dentro de nuestro cerebro. Se dieron cuenta de que las personas que practican meditaciÃ³n o 'mindfulness' todos los dÃ­as logran encoger fÃ­sicamente el tamaÃ±o de su amÃ­gdala. Es decir, con solo respirar y estar tranquilos, Â¡hacen que su botÃ³n de alarma sea menos escandaloso y mÃ¡s fÃ¡cil de controlar!",
      "Ser un Caballero Jedi requiere exactamente esta misma habilidad. Cuando un Jedi se enfrenta a un Sith con un sable de luz, su cuerpo instintivamente quiere asustarse. Pero a travÃ©s de un entrenamiento mental riguroso y la conexiÃ³n profunda con la Fuerza, un Jedi aprende a bajar el volumen de esa alarma interna. En lugar de reaccionar con miedo o ira, reaccionan con una calma absoluta y un enfoque cristalino. Es el triunfo de la mente pacÃ­fica sobre los instintos bÃ¡sicos.",
      "AsÃ­ que, la prÃ³xima vez que sientas que la alarma de tu amÃ­gdala se dispara porque estÃ¡s enojado o asustado, recuerda que tienes el poder de calmarla. Con solo cerrar los ojos, respirar lenta y profundamente unas cuantas veces, y concentrarte en el presente, estÃ¡s apagando esa alarma roja. EstÃ¡s usando la neurociencia para entrenar tu mente, dando el primer paso real para convertirte en un Maestro de tus propias emociones."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio I: La Amenaza Fantasma, durante el Ã©pico e intenso duelo final, hay un momento en que Qui-Gon Jinn y Darth Maul quedan separados temporalmente por un campo de energÃ­a rojo brillante. En lugar de enojarse, pasearse impacientemente o golpear el escudo como lo hace el Sith, el sereno Maestro Jedi Qui-Gon Jinn se arrodilla inmediatamente en el suelo del generador y comienza a meditar. Al hacerlo, apaga la respuesta de pÃ¡nico de su amÃ­gdala, baja su ritmo cardÃ­aco y recupera su claridad mental para el inminente combate.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Los estudios de resonancia magnÃ©tica funcional (fMRI) liderados por la investigadora Sara Lazar demostraron que la prÃ¡ctica constante de la meditaciÃ³n y el mindfulness durante un programa intensivo de apenas 8 semanas es tiempo suficiente para provocar una disminuciÃ³n medible y real en la densidad de la materia gris en la amÃ­gdala humana, la zona cerebral que procesa el estrÃ©s intenso, el miedo y la ansiedad.' 
      }
    ],
    fact: 'La amÃ­gdala, una estructura cerebral del tamaÃ±o de una almendra, actÃºa como el sistema de alarma principal del cuerpo. Estudios de Harvard demuestran que la meditaciÃ³n reduce su tamaÃ±o fÃ­sico y su reactividad, ayudÃ¡ndonos a mantener la calma bajo presiÃ³n extrema.'
  },
  {
    id: 'mindfulness-jedi',
    title: 'MeditaciÃ³n Jedi: La Ciencia del Mindfulness',
    color: '#00CED1',
    btnImage: '/assets/starwars/infographic_jedi/btn_mindfulness_jedi.png',
    image: '/assets/starwars/infographic_jedi/hero_mindfulness_jedi.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_mindfulness_jedi.png',
    bannerCaption: 'La profunda conexiÃ³n con la Fuerza comienza silenciando el ruido del universo exterior.',
    content: [
      "Â¿Has intentado alguna vez sentarte completamente quieto y no pensar en absolutamente nada? Si lo has intentado, seguro te diste cuenta de que es casi imposible. Tu mente parece un monito saltando de rama en rama: piensas en tu tarea, en lo que vas a cenar, en un recuerdo gracioso. A esto los budistas lo llaman 'la mente de mono'. El 'Mindfulness' o atenciÃ³n plena es una tÃ©cnica antigua que no busca callar al monito por la fuerza, sino enseÃ±arle a sentarse pacÃ­ficamente a observar.",
      "El mindfulness significa simplemente prestar muchÃ­sima atenciÃ³n al momento presente de manera intencional y sin juzgar si es bueno o malo. Es como convertirte en un observador cientÃ­fico de tus propios pensamientos. Si estÃ¡s comiendo una manzana, el mindfulness es notar el crujido, el sabor dulce, el jugo frÃ­o, en lugar de estar viendo la televisiÃ³n mientras comes en piloto automÃ¡tico. Es despertar verdaderamente al 'aquÃ­ y ahora'.",
      "Los cientÃ­ficos y doctores de instituciones como UCLA se dieron cuenta de que esta prÃ¡ctica tiene beneficios mÃ©dicos y psicolÃ³gicos increÃ­bles. Las personas que practican mindfulness mejoran su memoria, su concentraciÃ³n y son mucho mÃ¡s felices. Al entrenar el cerebro para estar en el presente, fortaleces las conexiones neuronales que te ayudan a prestar atenciÃ³n. Â¡Es como llevar a tu cerebro al gimnasio y levantar pesas invisibles de concentraciÃ³n!",
      "El CÃ³digo Jedi dice: 'No hay emociÃ³n, hay paz'. Esto no significa que los Jedi sean robots sin sentimientos, sino que practican el mindfulness mÃ¡s avanzado de la galaxia. Cuando un Jedi 'siente la Fuerza fluir a travÃ©s de Ã©l', estÃ¡ en un estado de atenciÃ³n plena perfecta. EstÃ¡n sintiendo la vida que los rodea, las rocas, los Ã¡rboles, las criaturas, sin permitir que las distracciones del pasado o las preocupaciones del futuro los desequilibren.",
      "TÃº puedes practicar este entrenamiento Jedi hoy mismo. Dedica tan solo cinco minutos al dÃ­a a sentarte en silencio y prestar atenciÃ³n exclusiva a tu respiraciÃ³n. Cuando tu mente de mono empiece a saltar hacia otros pensamientos (Â¡y lo harÃ¡!), simplemente sonrÃ­e, date cuenta de que te distrajiste, y regresa tu atenciÃ³n suavemente al aire que entra y sale de tu nariz. Con este sencillo entrenamiento diario, estarÃ¡s cultivando una mente tan clara y enfocada como la de un Maestro Jedi."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio V: El Imperio Contraataca, el sabio Maestro Yoda regaÃ±a constantemente al joven aprendiz Luke Skywalker por su falta de atenciÃ³n plena durante su duro entrenamiento en los sombrÃ­os pantanos de Dagobah. "Toda su vida ha mirado lejos, al futuro, al horizonte. Â¡Nunca su mente en donde estaba! Â¡Hmm! Â¡En lo que hacÃ­a!", exclama Yoda. Esta es una lecciÃ³n maestra y fundamental sobre el verdadero concepto psicolÃ³gico del mindfulness: la importancia vital de mantener la mente y la concentraciÃ³n ancladas rÃ­gidamente en el momento presente.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Un estudio de investigaciÃ³n exhaustivo realizado por psicÃ³logos de la Universidad de Harvard descubriÃ³ de forma asombrosa que las mentes humanas vagan y se distraen perdiendo el enfoque durante casi el 47% de sus horas de vigilia. AdemÃ¡s, concluyeron que una mente divagante es tÃ­picamente una mente infeliz, ya que solemos pensar en preocupaciones o arrepentimientos. El mindfulness nos ayuda activamente a reducir ese altÃ­simo porcentaje.' 
      }
    ],
    fact: 'El mindfulness es la prÃ¡ctica psicolÃ³gica de centrar intencionalmente toda la atenciÃ³n en el momento presente. Investigaciones de UCLA muestran que practicarlo regularmente fortalece las Ã¡reas del cerebro responsables de la memoria, el aprendizaje y la regulaciÃ³n emocional, tal como los Jedi entrenan su conexiÃ³n pacÃ­fica con la Fuerza.'
  },
  {
    id: 'neuroplasticidad',
    title: 'El Cerebro que se Entrena: Neuroplasticidad',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_jedi/btn_neuroplasticidad.png',
    image: '/assets/starwars/infographic_jedi/hero_neuroplasticidad.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_neuroplasticidad.png',
    bannerCaption: 'Las vÃ­as neuronales se fortalecen con la repeticiÃ³n, igual que el dominio del sable de luz.',
    content: [
      "Hace muchos aÃ±os, los cientÃ­ficos creÃ­an que nuestro cerebro era como una computadora de fÃ¡brica: nacÃ­as con ciertos cables conectados y, una vez que llegabas a ser adulto, esos cables no se podÃ­an cambiar nunca mÃ¡s. Si no eras bueno en matemÃ¡ticas o en mÃºsica, pensaban que estabas atrapado asÃ­ para siempre. Â¡Pero estaban completamente equivocados! Descubrieron algo llamado 'Neuroplasticidad', que es la maravillosa habilidad de tu cerebro para cambiar de forma fÃ­sica y crear nuevas conexiones.",
      "Imagina tu cerebro como un inmenso bosque inexplorado. Cuando aprendes algo nuevo por primera vez, es como caminar por entre los arbustos altos; es difÃ­cil y lento. Pero si caminas por ese mismo sendero todos los dÃ­as, aplastas la hierba y haces un caminito de tierra. Si sigues practicando, ese camino se convierte en una carretera pavimentada y luego en una autopista sÃºper rÃ¡pida por donde la informaciÃ³n viaja a la velocidad de la luz. Â¡Tus neuronas se conectan fuertemente!",
      "Por el contrario, si dejas de caminar por un sendero, la hierba vuelve a crecer y el camino desaparece. En la neurociencia, hay un dicho muy famoso que dice: 'Las neuronas que se disparan juntas, se conectan juntas'. Esto significa que cualquier cosa que practiques repetidamente (tocar el piano, resolver acertijos, o incluso ser paciente) modificarÃ¡ la estructura microscÃ³pica de tu cerebro, haciÃ©ndote cada vez mejor y mÃ¡s rÃ¡pido en esa tarea especÃ­fica.",
      "El duro entrenamiento de un Padawan Jedi en el Templo de Coruscant se basa completamente en esta ciencia de la neuroplasticidad. No nacen sabiendo cÃ³mo desviar los disparos lÃ¡ser de los droides de entrenamiento con los ojos vendados. Requiere horas, dÃ­as y aÃ±os de repeticiÃ³n incesante. Cada vez que levantan el sable, cada vez que meditan, estÃ¡n forjando y fortaleciendo autopistas neuronales en sus cerebros que les permiten tener reflejos casi sobrehumanos.",
      "TÃº tambiÃ©n tienes este superpoder plÃ¡stico dentro de tu cabeza. Si sientes que eres malo en algo, ya sea en un deporte, en leer o en dibujar, no significa que no puedas hacerlo; solo significa que aÃºn no has caminado lo suficiente por ese sendero neuronal. Con esfuerzo, repeticiÃ³n y paciencia, tienes la capacidad literal y cientÃ­fica de remodelar tu propio cerebro para lograr lo que te propongas."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio IV: Una Nueva Esperanza, Obi-Wan Kenobi le pone a Luke Skywalker un casco con el visor bajado que no le permite ver absolutamente nada, forzÃ¡ndolo a detener los rÃ¡pidos disparos de un pequeÃ±o droide escurridizo de entrenamiento usando Ãºnicamente su intuiciÃ³n. Al principio, el inexperto Luke falla miserablemente y recibe varios impactos dolorosos. Sin embargo, al seguir intentÃ¡ndolo y abrirse a sentir la Fuerza, logra desviar tres disparos seguidos, demostrando cÃ³mo su cerebro joven comenzaba a forjar rÃ¡pidamente nuevas y poderosas vÃ­as neuronales.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El famoso estudio cientÃ­fico realizado con los taxistas de la ciudad de Londres comprobÃ³ de manera irrefutable la existencia de la neuroplasticidad en adultos. Para obtener su difÃ­cil licencia, los taxistas debÃ­an memorizar miles de calles y laberÃ­nticas rutas. Las resonancias magnÃ©ticas mostraron claramente que el hipocampo de sus cerebros (el Ã¡rea crÃ­tica encargada de la memoria y navegaciÃ³n espacial) creciÃ³ fÃ­sicamente de tamaÃ±o y se volviÃ³ significativamente mÃ¡s grande y denso que el de las personas comunes.' 
      }
    ],
    fact: 'La neuroplasticidad es la capacidad del cerebro para reorganizarse y crear nuevas vÃ­as neuronales a lo largo de toda la vida. La prÃ¡ctica constante fortalece las conexiones, demostrando cientÃ­ficamente que el esfuerzo continuo puede alterar fÃ­sicamente la estructura cerebral para adquirir nuevas habilidades asombrosas.'
  },
  {
    id: 'respiracion-kenobi',
    title: 'Respira como Obi-Wan: TÃ©cnica 4-7-8',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_jedi/btn_respiracion_kenobi.png',
    image: '/assets/starwars/infographic_jedi/hero_respiracion_kenobi.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_respiracion_kenobi.png',
    bannerCaption: 'El control del aire es el control de la mente, un puente directo hacia el sistema nervioso.',
    content: [
      "Â¿SabÃ­as que tienes un 'freno de mano' secreto en tu cuerpo que puede detener el estrÃ©s casi al instante? La magia estÃ¡ escondida en algo tan simple y aburrido que hacemos miles de veces al dÃ­a sin siquiera darnos cuenta: respirar. Normalmente, la respiraciÃ³n es automÃ¡tica, pero es la Ãºnica funciÃ³n automÃ¡tica de nuestro cuerpo que tambiÃ©n podemos controlar a voluntad. Al cambiar la forma en que respiramos, podemos hackear nuestro sistema nervioso.",
      "Existe un nervio sÃºper largo e importante en tu cuerpo llamado el 'Nervio Vago'. Viaja desde tu cerebro, baja por tu cuello, y llega hasta tu corazÃ³n y tu estÃ³mago. Cuando te asustas y respiras rÃ¡pido, el nervio vago le dice a tu corazÃ³n que lata a toda prisa. Pero cuando tomas aire lentamente y, sobre todo, cuando exhalas el aire muy despacio, el nervio vago envÃ­a un poderoso mensaje calmante al corazÃ³n y al cerebro: 'Tranquilo, todo estÃ¡ a salvo'.",
      "Incluso los astronautas de la NASA, los buzos profesionales y los soldados usan tÃ©cnicas de respiraciÃ³n especiales para no entrar en pÃ¡nico en situaciones de vida o muerte. Una tÃ©cnica muy famosa y fÃ¡cil de aprender es la 'RespiraciÃ³n 4-7-8'. Consiste en tomar aire por la nariz durante 4 segundos, aguantar y sostener ese aire en los pulmones por 7 segundos, y finalmente soplar el aire por la boca muy, muy despacio durante 8 segundos.",
      "Imagina al legendario Maestro Obi-Wan Kenobi escondido en la inmensa Estrella de la Muerte, rodeado de cientos de Stormtroopers que lo buscan. Si su corazÃ³n latiera de miedo, cometerÃ­a errores fatales. A travÃ©s de la profunda conexiÃ³n con la Fuerza y el control perfecto de su respiraciÃ³n, Obi-Wan logra calmar su sistema nervioso por completo, moviÃ©ndose por los pasillos con una tranquilidad absoluta y engaÃ±ando las mentes dÃ©biles de los guardias.",
      "Puedes usar la tÃ©cnica del 4-7-8 cuando te sientas muy enojado, cuando no puedas dormir por la noche, o antes de hablar en pÃºblico en la escuela. Hazlo cuatro veces seguidas y sentirÃ¡s fÃ­sicamente cÃ³mo una ola de tranquilidad recorre tu cuerpo entero. Es una herramienta biolÃ³gica gratuita, poderosa y siempre disponible que te convierte en el verdadero dueÃ±o de tus emociones, igual que un Maestro Jedi experimentado."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la aclamada serie de televisiÃ³n Obi-Wan Kenobi, vemos al destrozado y exiliado Jedi sufriendo graves ataques de pÃ¡nico y un terrible estrÃ©s postraumÃ¡tico constante (TEPT) mientras se esconde en los desiertos de Tatooine. Para poder reconectarse nuevamente con la Fuerza, superar el miedo paralizante a Darth Vader y recuperar su antiguo y legendario poder, Obi-Wan debe volver a lo mÃ¡s bÃ¡sico de su entrenamiento en el Templo: recuperar el control consciente, rÃ­tmico y pacÃ­fico de su propia respiraciÃ³n.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'El prolongar intencionalmente el tiempo de la exhalaciÃ³n (sacar el aire mÃ¡s lento de lo que lo metes) estimula directamente y de manera mecÃ¡nica el sistema nervioso parasimpÃ¡tico del cuerpo humano. Esta es la parte de nuestro complejo sistema biolÃ³gico que se encarga del fundamental modo de "descansar y digerir", y actÃºa como el contra-balance perfecto y natural que frena la respuesta destructiva de "lucha o huida" que nos causa tanto estrÃ©s.' 
      }
    ],
    fact: 'Controlar el ritmo de la respiraciÃ³n es la forma mÃ¡s rÃ¡pida de intervenir conscientemente en el sistema nervioso autÃ³nomo. La tÃ©cnica 4-7-8, al prolongar enormemente la fase de exhalaciÃ³n, estimula el nervio vago y reduce el ritmo cardÃ­aco dramÃ¡ticamente, brindando calma instantÃ¡nea.'
  },
  {
    id: 'inteligencia-emocional',
    title: 'El Poder de la EmpatÃ­a Jedi',
    color: '#42A5F5',
    btnImage: '/assets/starwars/infographic_jedi/btn_inteligencia_emocional.png',
    image: '/assets/starwars/infographic_jedi/hero_inteligencia_emocional.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_inteligencia_emocional.png',
    bannerCaption: 'Sentir las emociones de otros en la galaxia: la ciencia de las neuronas espejo.',
    content: [
      "Ser inteligente no solo significa saber multiplicar nÃºmeros grandes o recordar muchos datos de historia. En el aÃ±o 1995, un psicÃ³logo muy famoso llamado Daniel Goleman le dijo al mundo que existe algo igual de importante: la 'Inteligencia Emocional'. Esta es la maravillosa capacidad de entender lo que tÃº mismo sientes, controlar esos sentimientos, y lo que es mÃ¡s increÃ­ble, entender y sentir genuinamente las emociones de las demÃ¡s personas a tu alrededor.",
      "Para lograr esto, nuestro cerebro tiene una herramienta secreta y mÃ¡gica descubierta recientemente llamada 'Neuronas Espejo'. Estas pequeÃ±as cÃ©lulas se activan no solo cuando tÃº haces algo, sino tambiÃ©n cuando ves a otra persona hacer algo. Si ves a tu amigo llorar o golpearse el dedo del pie, tus propias neuronas espejo se encienden en las mismas Ã¡reas de dolor en tu cerebro. Â¡Literalmente sientes una pizca de su dolor! Esto es lo que crea la empatÃ­a.",
      "La empatÃ­a es el superpoder humano que nos permite conectarnos profundamente con los demÃ¡s. Nos hace querer ayudar a alguien que estÃ¡ triste y nos hace reÃ­r cuando vemos a alguien carcajearse (por eso la risa es tan contagiosa). Las personas con alta inteligencia emocional saben leer las caras, el tono de voz y el lenguaje corporal de los demÃ¡s como si fueran un libro abierto, creando amistades fuertes y resolviendo problemas sin pelear.",
      "En el universo de Star Wars, la Fuerza fluye a travÃ©s de todos los seres vivos, conectÃ¡ndolos. Cuando un Jedi usa la Fuerza para 'sentir' las emociones o las intenciones de otra criatura, estÃ¡ usando una versiÃ³n amplificada e hiperdesarrollada de la inteligencia emocional y las neuronas espejo. No necesitan palabras; pueden sentir el miedo, la tristeza o el lado luminoso en el interior del corazÃ³n de otra persona de manera instintiva y clara.",
      "Desarrollar tu inteligencia emocional toma tiempo. El primer paso es nombrar tus emociones: decir 'estoy frustrado' en lugar de simplemente gritar y romper cosas. El segundo paso es observar a los demÃ¡s e intentar imaginar sinceramente cÃ³mo se ven las cosas desde sus propios zapatos. Al entrenar tu empatÃ­a, te vuelves un lÃ­der compasivo, alguien que trae luz y paz a tus amigos y a tu comunidad, igual que los guardianes de la paz galÃ¡ctica."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el final del Episodio VI: El Retorno del Jedi, Luke Skywalker demuestra la forma mÃ¡s elevada y pura de inteligencia emocional y empatÃ­a de toda la saga. A pesar de que su padre, Darth Vader, es un monstruo despiadado que aterroriza la galaxia, Luke se niega a pelear y dice "Siento el bien en ti, el conflicto". Gracias a esa profunda conexiÃ³n empÃ¡tica inquebrantable, Luke logra tocar el corazÃ³n enterrado de Anakin Skywalker, redimiÃ©ndolo y salvando el universo.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Las neuronas espejo fueron descubiertas casi por accidente en la dÃ©cada de 1990 por un equipo de neurocientÃ­ficos italianos liderados por Giacomo Rizzolatti mientras estudiaban los cerebros de los monos macacos. Notaron asombrados que las neuronas motoras del mono se disparaban enormemente con solo mirar a un investigador humano recoger un manÃ­, exactamente de la misma manera que si el propio mono hubiera recogido fÃ­sicamente el alimento.' 
      }
    ],
    fact: 'La Inteligencia Emocional, popularizada mundialmente por Daniel Goleman, es la capacidad de identificar, evaluar y controlar las emociones propias y ajenas. La base neurolÃ³gica de la empatÃ­a humana se atribuye fuertemente a las neuronas espejo, que nos permiten resonar emocionalmente con los demÃ¡s.'
  },
  {
    id: 'lado-oscuro-cortisol',
    title: 'El Lado Oscuro: EstrÃ©s y Cortisol',
    color: '#EF5350',
    btnImage: '/assets/starwars/infographic_jedi/btn_lado_oscuro_cortisol.png',
    image: '/assets/starwars/infographic_jedi/hero_lado_oscuro_cortisol.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_lado_oscuro_cortisol.png',
    bannerCaption: 'El miedo lleva a la ira, la ira al odio... y el estrÃ©s crÃ³nico daÃ±a el cerebro.',
    content: [
      "El sabio Maestro Yoda dijo una vez la frase mÃ¡s famosa de la psicologÃ­a galÃ¡ctica: 'El miedo es el camino hacia el Lado Oscuro. El miedo lleva a la ira, la ira lleva al odio, el odio lleva al sufrimiento'. Aunque suena a misticismo espacial, estas sabias palabras describen perfectamente lo que ocurre quÃ­micamente en nuestro propio cuerpo cuando nos dejamos consumir por el estrÃ©s negativo, la ansiedad y el pÃ¡nico constante.",
      "Cuando sentimos mucho miedo o enojo, nuestro cuerpo libera una hormona poderosa llamada 'Cortisol'. Un poquito de cortisol es bueno; te ayuda a despertar por la maÃ±ana y te da un impulso de energÃ­a si tienes que correr una carrera deportiva. Pero cuando vives constantemente enojado, estresado por las tareas o con miedo, tu cuerpo se inunda con cantidades tÃ³xicas de cortisol dÃ­a y noche, lo que los mÃ©dicos llaman 'estrÃ©s crÃ³nico'.",
      "El cortisol en exceso es como un veneno lento para tu cerebro. Los cientÃ­ficos, como el famoso investigador Bruce McEwen, descubrieron que el estrÃ©s crÃ³nico literalmente encoge partes vitales del cerebro, especÃ­ficamente el 'hipocampo', que es la zona donde guardamos los recuerdos y aprendemos cosas nuevas. AdemÃ¡s, el exceso de estrÃ©s te hace estar de mal humor, te enferma del estÃ³mago y baja las defensas de tu cuerpo para combatir los virus.",
      "La trÃ¡gica caÃ­da de Anakin Skywalker hacia el Lado Oscuro para convertirse en Darth Vader es la historia perfecta del daÃ±o que causa el estrÃ©s extremo. Anakin estaba aterrorizado y obsesionado con el miedo a perder a sus seres queridos. Esa ansiedad constante lo llenÃ³ de ira y nublÃ³ por completo su juicio y su razÃ³n. El Lado Oscuro no es magia; es la representaciÃ³n de dejar que las emociones destructivas y el cortisol tomen el control total de tus acciones.",
      "La psicologÃ­a positiva nos enseÃ±a cÃ³mo evitar caer en este Lado Oscuro emocional. Cultivar la gratitud diaria (dar gracias por lo bueno que tienes), dormir bien, hacer ejercicio, y platicar de tus miedos con alguien en quien confÃ­as, reduce drÃ¡sticamente los niveles de cortisol en tu sangre. Aprender a soltar lo que no puedes controlar, como enseÃ±an los Jedi, es el escudo cientÃ­fico mÃ¡s fuerte contra la toxicidad del estrÃ©s."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio III: La Venganza de los Sith, el Canciller Palpatine (Darth Sidious) manipula magistralmente el miedo natural del joven Anakin de perder a su esposa PadmÃ©. Palpatine actÃºa como una fuente constante de estrÃ©s psicolÃ³gico tÃ³xico, susurrÃ¡ndole mentiras que aumentan su paranoia y aislamiento. Cuando el miedo y la desesperaciÃ³n de Anakin alcanzan su punto mÃ¡ximo, su corteza prefrontal lÃ³gica se apaga por completo, y sucumbe a las pasiones violentas del Lado Oscuro.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Los estudios de neurobiologÃ­a y fisiologÃ­a humana demuestran que el llanto emocional real (las lÃ¡grimas de tristeza o ira extrema) contiene trazas y niveles significativos de cortisol y de otras hormonas del estrÃ©s. Los cientÃ­ficos postulan que el acto fÃ­sico de llorar es literalmente una forma asombrosa en que nuestro cuerpo se purga y se limpia expulsando esas sustancias quÃ­micas daÃ±inas para ayudarnos a sentirnos aliviados y en paz despuÃ©s.' 
      }
    ],
    fact: 'El cortisol es la principal hormona del estrÃ©s en el cuerpo humano. Aunque es vital para la supervivencia a corto plazo, el estrÃ©s crÃ³nico inunda el cerebro con niveles tÃ³xicos de cortisol, lo que deteriora severamente la memoria, debilita el sistema inmunolÃ³gico y nubla el juicio crÃ­tico.'
  },
  {
    id: 'sueno-jedi',
    title: 'SueÃ±o REM: El Entrenamiento Nocturno',
    color: '#AB47BC',
    btnImage: '/assets/starwars/infographic_jedi/btn_sueno_jedi.png',
    image: '/assets/starwars/infographic_jedi/hero_sueno_jedi.png',
    bannerImage: '/assets/starwars/infographic_jedi/banner_sueno_jedi.png',
    bannerCaption: 'Incluso los Maestros mÃ¡s poderosos necesitan que su cerebro se repare en la noche.',
    content: [
      "PodrÃ­as pensar que cuando duermes por la noche, tu cerebro simplemente se apaga como si fuera el interruptor de una computadora. Â¡Nada mÃ¡s lejos de la realidad! Mientras tÃº estÃ¡s profundamente dormido y roncando, tu cerebro estÃ¡ trabajando a toda mÃ¡quina, mÃ¡s activo que nunca. Dormir bien es el superpoder menos valorado y mÃ¡s increÃ­ble que tenemos, y es absolutamente necesario para mantener la cordura y aprender cosas nuevas.",
      "Hay una fase mÃ¡gica del sueÃ±o llamada 'SueÃ±o REM' (Movimiento RÃ¡pido de los Ojos). Durante esta etapa, que ocurre varias veces durante la noche, es cuando tenemos los sueÃ±os mÃ¡s vÃ­vidos y locos. Pero la ciencia moderna, liderada por expertos del sueÃ±o como Matthew Walker, ha descubierto que el sueÃ±o REM es como una terapia nocturna gratuita. El cerebro toma todas las emociones difÃ­ciles del dÃ­a, les quita la carga de estrÃ©s, y las organiza pacÃ­ficamente.",
      "AdemÃ¡s de sanar las emociones, el sueÃ±o es el momento en que el cerebro guarda la informaciÃ³n de forma permanente. Si pasaste todo el dÃ­a practicando un truco nuevo en la bicicleta o estudiando para un examen, tu cerebro repite esas mismas conexiones neuronales miles de veces durante la noche profunda para consolidar el aprendizaje. Si no duermes bien, es como si no hubieras guardado el documento de tu computadora, y al dÃ­a siguiente Â¡se te olvida casi todo!",
      "Los Jedi en el templo tienen rutinas muy estrictas de descanso. Saben que un cuerpo agotado y una mente privada de sueÃ±o son blancos fÃ¡ciles para el Lado Oscuro. Las ilusiones, la impaciencia y la pÃ©rdida de control en el uso de la Fuerza son consecuencias directas de no descansar el cerebro. La conexiÃ³n mÃ­stica a menudo se revela en los sueÃ±os y visiones nocturnas, donde la mente subconsciente estÃ¡ completamente libre del ruido.",
      "Para tener un verdadero entrenamiento nocturno de Maestro, debes alejarte de las pantallas brillantes de los celulares y tabletas al menos una hora antes de dormir (la luz azul engaÃ±a a tu cerebro haciÃ©ndole creer que es de dÃ­a). MantÃ©n tu cuarto oscuro y fresco. Al darle a tu cuerpo las valiosas 9 a 10 horas de sueÃ±o que los niÃ±os y adolescentes necesitan, estarÃ¡s construyendo un cerebro invencible, sano y listo para cualquier desafÃ­o galÃ¡ctico."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'A lo largo de toda la saga, los sueÃ±os, las visiones y el descanso son elementos cruciales en la vida de los usuarios de la Fuerza. Anakin sufre de horribles pesadillas profÃ©ticas que le impiden descansar, lo que deteriora enormemente su salud mental y aumenta su ansiedad diurna. Por otro lado, un sueÃ±o reparador y las visiones meditativas guiadas permiten a personajes sabios como Yoda o Rey encontrar respuestas profundas y claridad en momentos de mÃ¡xima confusiÃ³n.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Durante la etapa de sueÃ±o profundo no REM, el cerebro humano hace algo extraordinario y fascinante: literalmente reduce un poco el tamaÃ±o fÃ­sico de sus cÃ©lulas para permitir que el fluido cefalorraquÃ­deo fluya a raudales, actuando como un potente sistema de lavado o lavadora interna que limpia y elimina por completo las toxinas acumuladas durante las horas de vigilia, previniendo el daÃ±o cerebral a largo plazo.' 
      }
    ],
    fact: 'El sueÃ±o REM (Movimiento RÃ¡pido de los Ojos) es una fase crÃ­tica del descanso nocturno donde se produce la consolidaciÃ³n de la memoria y la regulaciÃ³n emocional profunda. El neurocientÃ­fico Matthew Walker describe el sueÃ±o como la herramienta natural mÃ¡s efectiva que poseemos para reiniciar nuestra salud cerebral y fÃ­sica diaria.'
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
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(200,220,255,0.8)';
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
        color: '#AB47BC',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(171, 71, 188, 0.4)'
      }}>
        EL CÃ“DIGO JEDI
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        NEUROCIENCIA &middot; MINDFULNESS &middot; EMPATÃA
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec7" : undefined}
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
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoJediSymbol;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoHolocron;
  
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
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic' }}>
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
          ARCHIVOS DEL TEMPLO / {node.title.toUpperCase()}
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

export default function InteractiveInfographic_SwSec7() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

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
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_jedi/bg_jedi.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

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
            <span>CONEXIÃ“N CON LA FUERZA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #AB47BC, #42A5F5)', boxShadow: '0 0 10px #42A5F5' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #00CED1, #7B68EE)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(123, 104, 238, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_jedi/sw_badge_7.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              Â¡ENTRENAMIENTO JEDI COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÃ“N (BibliografÃ­a)</h3>
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
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
