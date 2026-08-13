'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Gaseous Planets themed) ─────────────────────────
function DecoAtmosphere({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 30 Q 20 20, 30 30 T 50 30" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M 5 40 Q 25 25, 35 40 T 55 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M 15 20 Q 30 10, 40 20 T 60 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.8" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.8" />
      <circle cx="20" cy="40" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoMagneticField({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="30" cy="30" rx="10" ry="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="30" cy="30" rx="20" ry="25" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="4 2" />
      <ellipse cx="30" cy="30" rx="28" ry="25" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <path d="M 30 5 L 25 15 L 35 15 Z" fill={color} opacity="0.6" />
      <path d="M 30 55 L 25 45 L 35 45 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoRings({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="8" fill={color} opacity="0.9" />
      <ellipse cx="30" cy="30" rx="26" ry="8" fill="none" stroke={color} strokeWidth="2" opacity="0.8" transform="rotate(-15 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="6" fill="none" stroke={color} strokeWidth="1" opacity="0.6" transform="rotate(-15 30 30)" />
      <ellipse cx="30" cy="30" rx="18" ry="4" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" transform="rotate(-15 30 30)" />
    </svg>
  );
}

const DECO_MAP = {
  'jupiter-rey': [DecoAtmosphere, DecoMagneticField, DecoRings],
  'saturno-anillos': [DecoRings, DecoMagneticField, DecoAtmosphere],
  'urano-inclinado': [DecoRings, DecoAtmosphere, DecoMagneticField],
  'neptuno-vientos': [DecoAtmosphere, DecoMagneticField, DecoRings],
}; 

const BIBLIOGRAPHY = [
  'NASA (2025). "Jupiter Exploration: Juno Mission Findings", NASA Planetary Science Directorate.',
  'Dougherty, M.K. et al. (2009). "Saturn from Cassini-Huygens", Springer Science & Business Media.',
  'Smith, B.A. et al. (1986). "Voyager 2 in the Uranian System: Imaging Science Results", Science, Vol 233.',
  'Hammel, H.B. et al. (1989). "Neptune\'s Wind Speeds Obtained by Tracking Clouds in Voyager 2 Images", Science, Vol 246.',
  'Guillot, T. (2005). "The Interiors of Giant Planets: Models and Outstanding Questions", Annual Review of Earth and Planetary Sciences.',
  'Bagenal, F. et al. (2014). "Jupiter: The Planet, Satellites and Magnetosphere", Cambridge University Press.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'jupiter-rey',
    title: 'Júpiter: El Rey',
    color: '#D87D4A',
    btnImage: '/assets/course/viaje-planetas-gaseosos/btn_jupiter.jpg',
    image: '/assets/course/viaje-planetas-gaseosos/hero_jupiter.jpg',
    bannerImage: '/assets/course/viaje-planetas-gaseosos/banner_gaseosos.jpg',
    bannerCaption: 'Júpiter gobierna como el monarca absoluto de nuestro sistema estelar.',
    content: [
      'Júpiter es el planeta más grande de nuestro sistema solar, un coloso compuesto principalmente de hidrógeno y helio, sorprendentemente similar en composición a una estrella. Con una masa que es más de 300 veces la de la Tierra, su inmensa gravedad actúa como un escudo protector cósmico para los planetas interiores, atrayendo asteroides y cometas peligrosos hacia su atmósfera antes de que puedan amenazar nuestro frágil hogar rocoso. Es verdaderamente tan inmenso que más de 1,300 planetas como la Tierra podrían caber en su vasto interior sin ningún problema, convirtiéndolo en un verdadero monarca celestial incuestionable en nuestro vecindario estelar.',
      'A diferencia de los familiares planetas rocosos como el nuestro, Júpiter carece por completo de una superficie sólida donde aterrizar. Si una nave intentara descender en él, simplemente se hundiría cada vez más profundo a través de densísimas nubes de amoníaco y cristales de hielo de agua, enfrentando presiones colosales que eventualmente la aplastarían sin piedad mucho antes de alcanzar el supuesto núcleo. Este gigante gaseoso se caracteriza visualmente por sus espectaculares bandas de nubes multicolores, las cuales son impulsadas incesantemente por vientos supersónicos que superan fácilmente velocidades de 600 kilómetros por hora.',
      'El rasgo más inconfundible y distintivo de la tumultuosa atmósfera joviana es la Gran Mancha Roja, una gigantesca tormenta anticiclónica que lleva ardiendo y arremolinándose continuamente durante al menos los últimos 350 años de observación humana. Esta monumental y caótica borrasca tiene un tamaño superior al de la propia Tierra entera y sus implacables vientos periféricos giran frenéticamente en sentido antihorario a más de 400 kilómetros por hora. Aunque los astrónomos han notado que se reduce, sigue siendo la tormenta más grandiosa de todo nuestro sistema estelar.',
      'En las insondables y oscuras profundidades bajo estas turbulentas nubes, las presiones son tan incomprensiblemente extremas que el gas hidrógeno primitivo se comprime forzosamente hasta convertirse en un denso líquido conductor de electricidad, extrañamente conocido por los físicos como hidrógeno metálico. Este gigantesco océano giratorio de metal líquido bajo presión actúa como una inmensa dinamo planetaria, generando el campo magnético más poderoso y letal de todo el sistema solar, superado únicamente por el propio Sol, extendiéndose por millones de kilómetros en el vacío espacial circundante.',
      'Dedicar recursos a estudiar a Júpiter es absolutamente fundamental para que la humanidad logre comprender no solo los complejos orígenes primigenios de nuestro propio sistema planetario, sino también la verdadera naturaleza de la gran mayoría de los exoplanetas descubiertos orbitando otras estrellas lejanas, los cuales suelen ser gigantes gaseosos de características similares. Las modernas sondas espaciales como la intrépida misión Juno han revelado recientemente que el núcleo oculto de Júpiter no es un simple trozo sólido y denso, sino una mezcla difusa, exótica y turbulenta de elementos pesados.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Júpiter rota sobre su propio eje a una velocidad vertiginosa, mucho más rápido que cualquier otro planeta de nuestro sistema solar. ¡Logra completar un día entero en menos de 10 horas terrestres! Esta asombrosa y frenética rotación centrífuga causa que el gigantesco planeta sea notablemente achatado en los fríos polos y muy abultado en el ecuador, un fascinante fenómeno físico fácilmente observable por astrónomos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radiación ionizante atrapada en la colosal magnetósfera de Júpiter es aproximadamente mil veces superior a la dosis letal para cualquier ser humano. Precisamente por esta peligrosa razón, sondas como la Galileo y Juno tuvieron que resguardar sus sensibles ordenadores centrales dentro de pesadas bóvedas acorazadas de titanio para evitar la total destrucción de los circuitos integrados.' }
    ],
    fact: 'Si Júpiter hubiera logrado reunir y asimilar apenas unas 80 veces más masa estelar durante su violenta formación inicial, la inmensa presión gravitatoria y la extrema temperatura en su núcleo habrían sido más que suficientes para encender la fusión nuclear. ¡Júpiter se habría convertido oficialmente en una estrella enana roja!'
  },
  {
    id: 'saturno-anillos',
    title: 'Saturno: El Señor',
    color: '#D4B872',
    btnImage: '/assets/course/viaje-planetas-gaseosos/btn_saturno.jpg',
    image: '/assets/course/viaje-planetas-gaseosos/hero_saturno.jpg',
    bannerImage: '/assets/course/viaje-planetas-gaseosos/banner_gaseosos.jpg',
    bannerCaption: 'Los espectaculares anillos de Saturno, formados por innumerables fragmentos helados.',
    content: [
      'Saturno es indiscutiblemente la joya visual suprema de nuestro vecindario cósmico, famoso en todo el mundo por su espectacular e inigualable sistema de brillantes anillos. Siendo el segundo planeta más grande del sistema solar después del monarca Júpiter, Saturno es otro colosal gigante gaseoso compuesto abrumadoramente por los elementos más ligeros del universo: hidrógeno y helio puros. A pesar de su gargantuesco tamaño físico, Saturno posee una densidad global curiosamente tan increíblemente baja que es el único planeta conocido que, de existir un océano oceánico lo suficientemente grande en el universo para contenerlo, flotaría sin hundirse como una manzana.',
      'El aspecto más hipnótico y legendario de este distante planeta son sus anillos superlativos, los cuales no son bandas sólidas inquebrantables como parecen de lejos, sino incontables millones de fragmentos individuales giratorios de hielo cristalino, roca espacial y polvo microscópico. Algunos de estos fragmentos helados son tan minúsculos como delicados granos de arena fina, mientras que otros son auténticos peñascos espaciales tan grandes como montañas enteras, todos ellos atrapados en una perfecta danza orbital gravitatoria alrededor del inmenso ecuador de Saturno, extendiéndose ampliamente por cientos de miles de kilómetros en la negrura del espacio.',
      'Aunque desde la Tierra los majestuosos anillos de Saturno aparentan ser estructuras densas y casi planas, en realidad son dinámicos y están constantemente influenciados por la asombrosa gravedad de las muchas lunas del planeta. Estos satélites naturales, apodados poéticamente lunas "pastoras", circulan hábilmente a través de los anillos, atrayendo material suelto y esculpiendo mediante fuerzas de marea las divisiones oscuras y los afilados bordes que confieren a los anillos su característico y elegante aspecto de disco de vinilo cósmico. Se trata de un mecanismo celestial que revela la asombrosa complejidad orquestal de la gravitación.',
      'La extensa atmósfera turbulenta de Saturno presenta sus propios misterios fascinantes que desconciertan a la astrofísica moderna, destacándose de forma notable un gigantesco y persistente patrón de nubes en forma de hexágono perfecto situado exactamente en el helado polo norte del planeta. Esta monumental y enigmática tormenta poligonal tiene un diámetro que supera ampliamente al de la propia Tierra, y los astrofísicos asumen que se mantiene increíblemente estable durante décadas o siglos enteros mediante complejas ondas estacionarias atmosféricas y corrientes de chorro de altísima velocidad que giran interminablemente.',
      'Las valiosas décadas de asombrosa exploración interplanetaria por sondas como la histórica y exitosa nave Cassini nos han revelado que los icónicos anillos podrían ser relativamente jóvenes en escalas de tiempo cósmicas. Algunos científicos sostienen apasionadamente la teoría de que estos anillos se formaron hace apenas 100 millones de años a partir de la trágica destrucción violenta de una pobre luna helada atrapada por el límite gravitatorio de Roche. ¡Lo más impactante es que actualmente están desapareciendo gradualmente en forma de "lluvia de anillo"!'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A pesar de poseer un tamaño cien veces mayor que el nuestro, la extraña densidad volumétrica promedio de Saturno es sorprendentemente inferior a la del agua líquida (menos de 1 gramo por centímetro cúbico). Es el único mundo planetario conocido en todo el majestuoso sistema solar con esta fascinante característica física, provocada por su inmensa composición aeriforme carente de rocas densas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El grosor promedio físico de los principales anillos espectaculares de Saturno es sorprendentemente de unos escasos 10 a 20 metros de altitud, a pesar de abarcar y prolongarse horizontalmente a través de distancias inconcebibles de casi 300,000 kilómetros totales. ¡Son estructuras astronómicamente afiladas y más delgadas proporcionalmente que el filo de la cuchilla de afeitar más cortante jamás fabricada por la humanidad!' }
    ],
    fact: 'La impresionante y misteriosa tormenta hexagonal que gira eternamente sobre el frío polo norte de Saturno cambia periódicamente de color brillante. Pasa de un tono azulado profundo invernal a un tono dorado amarillento en el cálido verano debido a los incesantes cambios fotoquímicos y la luz solar que interactúa con las partículas estratosféricas durante sus largas estaciones planetarias que duran siete años terrestres.'
  },
  {
    id: 'urano-inclinado',
    title: 'Urano: El Inclinado',
    color: '#80DEEA',
    btnImage: '/assets/course/viaje-planetas-gaseosos/btn_urano.jpg',
    image: '/assets/course/viaje-planetas-gaseosos/hero_urano.jpg',
    bannerImage: '/assets/course/viaje-planetas-gaseosos/banner_gaseosos.jpg',
    bannerCaption: 'Urano es un mundo congelado e inclinado sobre su costado.',
    content: [
      'Urano, el séptimo enigmático planeta desde nuestro ardiente Sol, se clasifica rigurosamente en la astronomía moderna como un enigmático gigante de hielo en lugar de un gigante gaseoso convencional como los gigantescos Júpiter y Saturno. Aunque indiscutiblemente posee una espesa y turbulenta atmósfera de gas hidrógeno y liviano helio, la mayor parte de su densa masa interna y profunda está misteriosamente constituida por una densa e interminable "sopa" súper caliente y a altísima presión conformada esencialmente de fluidos congelados como agua pura, asfixiante amoníaco y denso metano líquido comprimido.',
      'El brillante y hermoso tono azul celeste pálido inconfundible de este solitario planeta frío no se debe en absoluto a la presencia de océanos acuosos de agua líquida como en la Tierra, sino estrictamente a la abundancia sustancial del gas metano tóxico acumulado en las elevadas y frías capas superiores de su atmósfera joviana exterior. El espeso gas de metano flotante actúa como un gigantesco y eficiente filtro planetario que absorbe rápidamente casi toda la luz roja visible proveniente de nuestro distante Sol, reflejando exclusivamente el resplandor de los gélidos tonos azulados y verdosos de la luz blanca entrante.',
      'La característica física indiscutiblemente más insólita, extraña y llamativa de la fisonomía de Urano es la pronunciada y dramática inclinación absoluta de su eje de rotación magnética. A diferencia drástica del resto de los conocidos y estudiados planetas de nuestra vecindad galáctica, Urano no orbita majestuosamente girando de pie como un trompo, sino que está violentamente volcado totalmente de costado sobre su plano orbital elíptico, orbitando como un barril cósmico o una pelota rodante, con los helados polos apuntando curiosamente casi de manera directa hacia la radiación calórica del distante Sol.',
      'Debido directamente a esta absurda e insólita inclinación axial ecuatorial superior a los 90 grados, Urano experimenta las estaciones climáticas más ridículamente extremas e impitigables de la historia del sistema solar conocido por los científicos contemporáneos. Como cada larguísimo año en Urano dura unos agónicos 84 prolongados años terrestres completos, cada solitario y frío polo sumido en la oscuridad absoluta experimenta más de cuatro tortuosas y aburridas décadas seguidas de completa luz solar directa cegadora ininterrumpida, seguidas obligatoriamente de otras interminables cuatro largas décadas de profunda noche gélida y oscurísima soledad invernal.',
      'Los brillantes investigadores y astrofísicos dedicados teorizan convencidamente que esta desastrosa orientación planetaria anómala que desconcierta a todos fue originada y provocada seguramente en el pasado primitivo y violento del sistema solar incipiente por la monumental y catastrófica colisión frontal de un objeto macizo errante, probablemente poseedor del descomunal tamaño físico del actual planeta Tierra. Este violento choque interplanetario ancestral derribó y volcó completamente y para siempre al pobre gigante helado, condenándolo inexorablemente a girar eternamente rodando inclinado por los milenios de los siglos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Sorprendentemente, Urano fue históricamente el primer y revolucionario cuerpo celeste planetario en ser oficialmente descubierto en la ciencia contemporánea utilizando la valiosa e ingeniosa tecnología del telescopio óptico de espejos. Fue inesperadamente localizado en el negro firmamento nocturno en el año de 1781 por el curioso y diligente astrónomo anglo-alemán William Herschel, quien inocentemente pensó primero que había tropezado accidentalmente por suerte astronómica con un sencillo e inofensivo cometa pasajero.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El gigante de hielo Urano irradia hacia la negrura del espacio sorprendentemente muchísima menos calor energético térmico de la que debería tener considerando sus proporciones y volumen colosales. A diferencia clara de los fogosos Júpiter y Saturno, el núcleo profundo del gélido Urano está misteriosamente inactivo térmicamente o congelado, lo cual le confiere el título oficial de poseer incontestablemente la atmósfera más asombrosamente fría en general de nuestro majestuoso sistema.' }
    ],
    fact: 'El complejo sistema orbital de Urano no solo posee numerosas lunas y pequeños satélites helados con irregulares formas curiosas orbitando, sino que también alberga su propio sistema tenue, frágil e invisible de unos trece oscuros anillos de polvo espacial que, por supuesto debido a su inclinación volcadora axial de locos, ¡giran de manera absurda verticalmente como una colosal e infinita rueda de la fortuna celestial de feria galáctica en vez de horizontalmente!'
  },
  {
    id: 'neptuno-vientos',
    title: 'Neptuno: Supersónico',
    color: '#3949AB',
    btnImage: '/assets/course/viaje-planetas-gaseosos/btn_neptuno.jpg',
    image: '/assets/course/viaje-planetas-gaseosos/hero_neptuno.jpg',
    bannerImage: '/assets/course/viaje-planetas-gaseosos/banner_gaseosos.jpg',
    bannerCaption: 'Neptuno, el distante gigante de hielo barrido por implacables tormentas.',
    content: [
      'Neptuno es con total seguridad el planeta orbital oficial más alejado y solitario de nuestro magnífico y candente Sol en la era actual espacial. Al igual y de idéntica constitución elemental que su cercano hermano helado Urano, este inmenso gigante azul oscuro está catalogado científicamente bajo la familia astrofísica de los fríos gigantes de hielo pesados. Su lejanía extrema es verdaderamente tan incomprensiblemente vasta que la diminuta e imperceptible luz de nuestro brillante Sol tarda casi unas agónicas y largas cuatro extenuantes horas viajando incesantemente en el vacío para lograr apenas iluminarlo débilmente.',
      'A pesar abrumadoramente de recibir muchísima menos energía térmica solar radiante y vigorosa que el resto de los planetas debido a su gran distancia helada, Neptuno extrañamente posee y hace alarde de albergar el clima tormentoso e implacable más dinámico y extremadamente violento conocido jamás por la astronomía contemporánea en nuestro sistema planetario estelar. Sus poderosos vientos supersónicos huracanados soplan de manera escalofriante alcanzando picos alarmantes que superan sin esfuerzo alguno la tremenda velocidad de los 2,000 escandalosos kilómetros por majestuosa hora atmosférica de pura destrucción en chorro libre.',
      'Estos salvajes ventarrones desenfrenados y furiosos circulan continuamente en dirección completamente opuesta y contraria y rebelde a la rotación orbital diaria del propio cuerpo planetario giratorio, empujando oscuras y espesas nubes compuestas químicamente de hielo de metano cristalizado altamente congelado a través del gélido firmamento profundo azul ultramar. Se requiere por obligación teórica la existencia real de un núcleo increíblemente denso, radiactivamente calientísimo y furioso en sus adentros profundos y recónditos para lograr generar semejante energía bestial que impulse y active mecánicamente tan brutales ráfagas descontroladas.',
      'Históricamente durante la gloriosa e histórica década exploratoria de 1980, la heroica e infatigable sonda interplanetaria solitaria conocida como la mítica Voyager 2 logró descubrir fugazmente allí una pavorosa borrasca en las nubes altas bautizada sombríamente por la prensa y agencias asombradas de la época como la amenazante "Gran Mancha Oscura", una monstruosa anomalía anticiclónica oscura muy similar en características temibles a la famosa versión centenaria y eterna de Júpiter. Fascinantemente, a diferencia del huracán infinito eterno de Júpiter, los telescopios determinaron que estas manchas oscuras veloces tienden y suelen asombrosamente aparecer repetidamente y desvanecerse evaporándose por completo en apenas cortísimos ciclos interanuales.',
      'El brillante e indudablemente fascinante hallazgo observacional originario y primigenio inicial del lejano Neptuno es famoso y reconocido históricamente en los anales académicos ilustrados debido ciertamente y únicamente a que fue asombrosa y audazmente el primer cuerpo astronómico gigantesco descubierto exclusivamente usando y aplicando deducciones predictivas y precisas puramente matemáticas y aritméticas de Newton en vez de la cansina observación óptica y ciega rutinaria de escrutinio telescópico clásico. Excepcionales matemáticos astrofísicos valientemente dedujeron sabiamente su misma existencia y tamaño al percatarse y descubrir inteligentemente sutiles irregularidades gravitacionales detectadas minúsculamente en la extraña trayectoria orbital de Urano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Curiosamente e inesperadamente, en las lejanísimas, enigmáticas y presurizadas profundidades opresivas del oscuro océano oceánico líquido interno sub-superficial de Neptuno, las abrumadoras e inhumanas condiciones ambientales químicas son posiblemente tan brutalmente extremas que los poderosos científicos e investigadores planetarios modernos ciertamente sospechan y deducen formalmente que verdaderamente llueven duros y preciosos diamantes sólidos de puro y compacto cristal de carbono precipitándose masivamente hacia el oscuro fondo del asfixiante núcleo gigante.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Inesperadamente la extraña y particular luna capturada más masiva, redonda y fría de este gigante de hielo conocida míticamente como Tritón es astronómicamente el único y singular satélite grandioso notable que audazmente orbita incansablemente y gira veloz de forma retrógrada anómala (se mueve descaradamente al glorioso revés con rebeldía caprichosa) del sentido habitual normal de giro de todo el enorme planeta gaseoso, lo cual afirma indudablemente que definitivamente Tritón fue alguna vez en su historia arcaica helada violentamente acorralado y apresado furtivamente de repente por la gigantesca garra gravitatoria invisible de Neptuno hace mucho.' }
    ],
    fact: 'Tan extremadamente lento e imperceptible es verdaderamente su amplio e inmenso viaje orbital elíptico en la distante y fría oscuridad galáctica transneptuniana a través de las silenciosas estrellas lejanísimas que, sorprendentemente e increíblemente, nuestro brillante vecino lejano azul marino Neptuno acaba de completar de cumplir y celebrar apenas un solo año nuevo solitario y lejano neptuniano desde que su enorme cuerpo azul fue divisado y descubierto asombrosamente por primera vez en el victoriano e ilustre y remoto año de 1846 en Europa central.'
  }
];

// ─── Temporal Particle Field (Canvas Background) ─────────────────────────
function GasGiantField() {
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
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 3 + 1,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.5 ? '216, 125, 74' : '57, 73, 171',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.drift + Math.sin(t * p.speed) * 0.5;
        p.y -= 0.1;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Header ──────────────────────────────────────────────────────────
function InteractiveHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, i) => {
          const t = (i + 1) / 5;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="5" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [4, 7, 4] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">GIGANTES GASEOSOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ASTRONOMÍA PLANETARIA</text>
      </svg>
    </div>
  );
}

// ─── Node Button ──────────────────────────────────────────────────────────
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%',
        overflow: 'hidden', border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20` : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotGaseosos" style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: node.color, boxShadow: `0 0 8px ${node.color}`,
        }} />
      )}
    </motion.button>
  );
}

// ─── Expandable Section ──────────────────────────────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem', borderRadius: '14px', border: `1px solid ${color}25`,
      overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ backgroundColor: `${color}12` }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)' }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
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

// ─── Content Panel ──────────────────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [{ top: '8%', right: '-10px', rotate: 15 }, { top: '45%', left: '-15px', rotate: -10 }, { bottom: '12%', right: '5px', rotate: 20 }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{ background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px', position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden' }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: node.color, transition: 'all 0.2s' }}>
        <X size={18} />
      </button>

      {/* Hero Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none' }} />
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

      {/* Magazine Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* Optional Banner */}
        {node.bannerImage && (
          <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => setLightboxSrc(node.bannerImage)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.bannerImage} alt={node.bannerCaption || ''} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)', pointerEvents: 'none' }} />
            {node.bannerCaption && (
              <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {node.bannerCaption}
              </p>
            )}
          </div>
        )}

        {/* Expandables */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* Fact Box */}
        <motion.div whileHover={{ scale: 1.01 }} style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0', display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_GaseososM1() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      backgroundColor: '#0a0a14',
      position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem', overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('/assets/course/viaje-planetas-gaseosos/bg_gaseosos.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.15, pointerEvents: 'none',
      }} />
      <GasGiantField />

      <div style={{
        position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)', borderRadius: '24px', padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)', backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <InteractiveHeader />
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '3rem 0' }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton key={node.id} node={node} index={idx}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', borderRadius: '0 0 16px 16px' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1rem' }}>📚 Fuentes y Referencias</h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            {BIBLIOGRAPHY.map((ref, i) => <li key={i}>{ref}</li>)}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
