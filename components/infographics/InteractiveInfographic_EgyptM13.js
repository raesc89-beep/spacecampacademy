'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (inline, no external images needed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.25, ...style, pointerEvents: 'none' }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#7EC8E3', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <path d="M10 24 Q40 0 70 24 Q40 48 10 24Z" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="24" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.7" />
      <path d="M40 32 Q35 42 28 46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="22" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoScarab({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <circle cx="30" cy="14" r="10" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="36" rx="12" ry="16" fill={color} opacity="0.3" />
      <path d="M18 30 Q2 18 6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 Q58 18 54 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="6" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="8" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="52" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <polygon points="40,4 72,52 8,52" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="56,8 80,52 40,52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="2" r="2" fill={color} opacity="0.8" />
      <circle cx="56" cy="6" r="1.5" fill={color} opacity="0.6" />
      <circle cx="48" cy="0" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C4A7E7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      {[{x:30,y:10,r:3},{x:15,y:25,r:2},{x:45,y:20,r:2.5},{x:20,y:45,r:2},{x:40,y:42,r:3},{x:30,y:30,r:4},{x:10,y:12,r:1.5},{x:50,y:48,r:1.5}].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={color} opacity={0.6} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={color} opacity={0.1} />
        </g>
      ))}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'calendario-365': [DecoStarCluster, DecoAnkh, DecoEye],
  'calendario-lunar': [DecoEye, DecoStarCluster, DecoPyramid],
  'tres-estaciones': [DecoPyramid, DecoAnkh, DecoScarab],
  'sirio-sopdet': [DecoStarCluster, DecoEye, DecoScarab],
  'julio-cesar': [DecoAnkh, DecoPyramid, DecoStarCluster],
  'gregorio-reforma': [DecoEye, DecoStarCluster, DecoAnkh],
  'haab-maya': [DecoScarab, DecoPyramid, DecoStarCluster],
};

const BIBLIOGRAPHY = [
  'Parker, R. A. (1950). The Calendars of Ancient Egypt. Studies in Ancient Oriental Civilization, 26',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. II: Calendars, Clocks, and Astronomy. American Philosophical Society',
  'Depuydt, L. (1997). Civil Calendar and Lunar Calendar in Ancient Egypt. Peeters Publishers',
  'Neugebauer, O. (1957). The Exact Sciences in Antiquity. Dover Publications',
  'Brewer, D. J. & Teeter, E. (1999). Egypt and the Egyptians. Cambridge University Press',
  'Richards, E. G. (1998). Mapping Time: The Calendar and Its History. Oxford University Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "calendario-365",
    "title": "El Primer Calendario de 365 Días",
    "color": "#80D080",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-365.png",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-365.png",
    "content": [
      "El calendario que usas todos los días para saber cuándo es tu cumpleaños, tus vacaciones o el fin de semana, es un invento que tiene más de 5,000 años de historia. Nació en las orillas del río Nilo. Los antiguos egipcios fueron los primeros seres humanos en crear un calendario civil de exactamente 365 días, completamente independiente de las fases de la Luna, basándose exclusivamente en el movimiento del Sol y las estrellas.",
      "A diferencia de otros pueblos antiguos, los egipcios resolvieron el rompecabezas del tiempo de una forma matemática. Observaron el cielo durante generaciones y descubrieron que el año solar exacto, el tiempo que tarda la Tierra en dar una vuelta completa al Sol, dura aproximadamente 365 días y un cuarto. A partir de este descubrimiento, crearon un calendario dividido en 12 meses idénticos, donde cada mes tenía exactamente 30 días, formando un bloque de 360 días que era fácil de calcular.",
      "Pero los matemáticos egipcios sabían que 360 días no eran suficientes para completar el viaje orbital de nuestro planeta alrededor del Sol. Si dejaban el calendario así, las estaciones del año se desfasarían. Para solucionar este problema, añadieron 5 días extra al final del año. Estos 5 días adicionales, conocidos como 'días epagómenos', eran un puente entre el año viejo y el nuevo, logrando alcanzar los 365 días necesarios para mantener su mundo sincronizado.",
      "Para los ciudadanos del antiguo Egipto, estos 5 días extra eran considerados días poderosos y mágicos. Creían que se encontraban fuera del tiempo normal, en una zona de transición donde se celebraban los cumpleaños de los dioses: Osiris, Horus, Seth, Isis y Neftis. Durante estos cinco días epagómenos, la vida cotidiana se detenía y los trabajos pesados se suspendían.",
      "La sincronización entre el tiempo humano y el tiempo astronómico era crucial para la supervivencia de su civilización. Este ingenioso sistema de 365 días fue tan exitoso y práctico que sentó las bases para todos los calendarios futuros de la humanidad. Cada vez que miras la fecha en la pantalla de tu teléfono, estás utilizando una versión moderna de aquel sistema egipcio."
    ],
    "fact": "Los sacerdotes-astrónomos egipcios, conocidos como 'Khery-hebet', eran los guardianes del tiempo. Cada mes observaban el cielo nocturno con instrumentos de medición, como el 'merkhet', para confirmar que las estrellas estaban en sus posiciones correctas, garantizando que el imperio mantuviera una sincronización precisa.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Aunque el calendario civil tenía 365 días y era utilizado para la administración del gobierno y la recolección de impuestos, los sacerdotes mantenían un calendario lunar paralelo estrictamente para fines religiosos. Esto significa que un ciudadano egipcio común vivía en dos dimensiones de tiempo simultáneas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La precisión del antiguo calendario egipcio revela un conocimiento avanzado de mecánica celeste. Aunque el año solar dura exactamente 365.24219 días, el sistema egipcio de 365 días fijos, sin contemplar el año bisiesto, provocaba que su calendario retrocediera un día astronómico cada cuatro años."
      }
    ]
  },
  {
    "id": "calendario-lunar",
    "title": "El Problema del Calendario Lunar",
    "color": "#7EC8E3",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-lunar.png",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-lunar.png",
    "content": [
      "Antes de que la civilización egipcia revolucionara la forma de medir el tiempo, la mayoría de las civilizaciones antiguas utilizaban calendarios lunares, basados en observar las fases de la Luna en el cielo nocturno. Mirar cómo la Luna crece desde una fina cuña hasta un disco completo era un reloj evidente y accesible para cualquier persona que elevara la mirada hacia las estrellas.",
      "Sin embargo, este antiguo sistema lunar tenía un problema matemático que complicaba la vida. El mes lunar dura aproximadamente 29.5 días. Si sumamos 12 de estos meses, obtenemos 354 días en el año, lo cual es 11 días más corto que los 365 días que tarda la Tierra en orbitar el Sol.",
      "Las consecuencias de este corto calendario lunar eran significativas. Al faltar 11 días cada año en relación con las estaciones climáticas impulsadas por el Sol, un mes de 'primavera' dentro de un calendario lunar terminaría desplazándose de forma continua a lo largo de un ciclo de 33 años. Eventualmente ese mismo mes de 'primavera' aterrizaría en pleno invierno.",
      "Coordinar un calendario lunar con las estaciones climáticas que dictaban cuándo sembrar o cosechar resultaba un desafío inmanejable. Las civilizaciones agrarias, como el Antiguo Egipto, requerían un sistema predecible y fijo que no se desplazara a través de las diferentes épocas.",
      "Fue entonces que los egipcios comprendieron que la Luna simplemente no constituía un marcador de tiempo confiable a gran escala. Necesitaban anclar su civilización al ciclo del Sol y al movimiento de las estrellas fijas."
    ],
    "fact": "Diversas civilizaciones, como los mesopotámicos, intentaron solucionar el problema del calendario lunar añadiendo meses adicionales de forma irregular, pero el sistema solar egipcio resultó más organizado y preciso.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La herencia del calendario lunar sigue presente en algunas culturas. En el calendario islámico, que es lunar y no usa meses bisiestos, el mes de Ramadán recorre todas las estaciones a lo largo de un ciclo que abarca 33 años solares."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El desfase de 11 días entre el año solar de 365 días y un año lunar de 354 días sucede porque el ciclo de las fases de la Luna terrestre no está perfectamente sincronizado con el tiempo que tarda la Tierra en dar la vuelta al Sol."
      }
    ]
  },
  {
    "id": "tres-estaciones",
    "title": "Akhet, Peret y Shemu",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic_calendario/btn_tres-estaciones.png",
    "image": "/assets/egypt/infographic_calendario/hero_tres-estaciones.png",
    "content": [
      "Aunque el mundo moderno experimenta cuatro estaciones en el año (verano, otoño, invierno y primavera), el año civil de los egipcios estaba dividido en solo tres estaciones de cuatro meses cada una, sintonizadas con los ciclos naturales de su territorio.",
      "La primera estación se llamaba 'Akhet' (la inundación). Durante esta temporada, el río Nilo experimentaba crecidas que desbordaban sus riberas naturales. Esta agua empapaba los campos de cultivo y dejaba un lodo oscuro lleno de nutrientes, preparando el terreno desértico para la agricultura.",
      "A continuación llegaba la segunda estación, 'Peret' (la siembra y el crecimiento). Una vez que las aguas de la inundación comenzaban a retroceder, los agricultores egipcios aprovechaban para plantar sus semillas en el lodo recién formado.",
      "Finalmente, el calor inauguraba la tercera estación, 'Shemu' (la cosecha), la época seca en la cual el Sol maduraba los cultivos. Los campos rebosaban de grano y los campesinos trabajaban para recolectar las toneladas de trigo.",
      "Este ciclo continuo de inundación, siembra y cosecha constituía la columna vertebral de la civilización egipcia. A través de este calendario de tres estaciones, los egipcios lograban predecir el comportamiento del río y planificar la producción de alimentos."
    ],
    "fact": "Durante la estación de inundaciones 'Akhet', como no se podía cultivar nada, los campesinos eran reclutados por los gobernantes para trabajar en proyectos de construcción, como templos y pirámides.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los antiguos egipcios utilizaban instrumentos llamados 'nilómetros'. Se trataba de escaleras talladas en la roca que descendían hacia el río para medir y registrar el nivel del agua durante la inundación."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las intensas lluvias que ocasionaban la crecida del Nilo en 'Akhet' no sucedían en el desierto egipcio, sino en las zonas montañosas de Etiopía."
      }
    ]
  },
  {
    "id": "sirio-sopdet",
    "title": "Sirio y el Orto Heliaco",
    "color": "#B388FF",
    "btnImage": "/assets/egypt/infographic_calendario/btn_sirio-sopdet.png",
    "image": "/assets/egypt/infographic_calendario/hero_sirio-sopdet.png",
    "content": [
      "Para lograr sincronizar su calendario solar fijo con las estaciones del río Nilo, los astrónomos egipcios fijaron su vista en las estrellas. Buscaron un indicador visible en el cielo nocturno. Su solución fue Sirio, la estrella blanca más luminosa de toda la bóveda estelar.",
      "Ellos bautizaron a esta estrella con el nombre de Sopdet. Los astrónomos observaron durante años de estudio que, después de estar oculta por el resplandor del Sol durante decenas de días, la estrella Sirio volvía a asomarse visible en el cielo.",
      "Este renacimiento de la estrella, reapareciendo en el horizonte justo antes de que amaneciera, es conocido científicamente hoy como el 'orto helíaco'. Sorprendentemente, este evento celestial sucedía de manera cíclica cada 365 días completos.",
      "Por un capricho de la astronomía, este orto helíaco exacto de la estrella Sirio coincidía casi con precisión en el verano con la fecha en que las aguas de la inundación del Nilo llegaban a la capital de Menfis.",
      "Esto significaba que la astronomía y el calendario agrícola estaban sincronizados cósmicamente. Esto garantizaba la planificación de las cosechas y la prosperidad que sostuvo a la civilización egipcia."
    ],
    "fact": "La estrella Sirius A tiene una diminuta y caliente compañera cósmica llamada Sirius B. Estas dos estrellas giran en un baile gravitacional alrededor de su centro común.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La estrella Sirio forma una reconocible constelación llamada el Can Mayor. Los antiguos griegos decían que los días calurosos de verano, o la 'canícula', iniciaban exactamente con su orto helíaco."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El 'orto helíaco' se define en astrofísica como la primera aparición de un objeto celestial brillante sobre el horizonte, despuntando poco antes de que amanezca el Sol."
      }
    ]
  },
  {
    "id": "julio-cesar",
    "title": "De Egipto a Roma: El Calendario Juliano",
    "color": "#FF8A65",
    "btnImage": "/assets/egypt/infographic_calendario/btn_julio-cesar.png",
    "image": "/assets/egypt/infographic_calendario/hero_julio-cesar.png",
    "content": [
      "Si avanzamos en el tiempo unos cuantos miles de años desde Egipto hasta encontrarnos en la antigua Roma, descubriremos que el famoso líder y estratega Julio César modificó el calendario basándose en la ciencia egipcia.",
      "Alrededor del año 46 a.C., la ciudad de Roma se hallaba estancada en un sistema caótico lunisolar. César se impresionó con el calendario civil matemático y exacto de los antiguos sabios egipcios.",
      "Para implementar esta enorme adaptación astronómica, trajo a Roma a un sabio erudito de la ciudad de Alejandría llamado Sosígenes. Juntos implementaron una reforma profunda al calendario romano.",
      "Sosígenes resolvió el complejo problema matemático de los 365 días y su cuarto de día. Propuso incluir un año bisiesto, añadiendo un día extra al mes de febrero cada cuatro años.",
      "Esta reforma produjo el célebre calendario juliano. Este fue el sistema de medir el tiempo que dominaría al mundo durante siglos, estabilizando finalmente las fechas y las estaciones."
    ],
    "fact": "La reforma fue tan drástica que provocó que el año 46 a.C. llegara a contar con 445 días. Se le llamó el 'año de la confusión'.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El mes de julio fue nombrado en honor a Julio César, mientras que el mes de agosto lo fue en honor a su sucesor, Augusto César."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La aproximación de 365.25 días era útil, pero el año astronómico real tiene 365.24219 días, provocando un pequeño margen de error que se iría acumulando con los siglos."
      }
    ]
  },
  {
    "id": "gregorio-reforma",
    "title": "La Reforma Gregoriana de 1582",
    "color": "#4FC3F7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_gregorio-reforma.png",
    "image": "/assets/egypt/infographic_calendario/hero_gregorio-reforma.png",
    "content": [
      "Aunque el calendario juliano funcionó bastante bien durante más de un milenio en Europa, la diferencia microscópica de 0.0078 días entre el año juliano (365.25 días) y el verdadero año solar (365.2422 días) se fue acumulando. Para el siglo XVI, el calendario oficial se había desfasado 10 días completos con respecto a las posiciones estelares.",
      "Para remediar este desfase, que afectaba la celebración de festividades como la Pascua, el papa Gregorio XIII reunió a un equipo de matemáticos y astrónomos en Roma para diseñar una segunda actualización al calendario egipcio en el año 1582.",
      "La primera acción de la reforma gregoriana consistió en eliminar de golpe aquellos 10 días que se habían acumulado erróneamente. Esto significó que en muchos territorios, las personas se acostaron la noche del jueves 4 de octubre, y despertaron en un viernes 15 de octubre de 1582.",
      "Para evitar que este desfase regresara en el futuro, el equipo ajustó la regla que marcaba los años bisiestos. Decretaron que los años que terminan en dos ceros, como 1900, no serían bisiestos, a menos que fueran divisibles por 400. Esto resultó ser el toque preciso que estabilizó las fechas.",
      "Este calendario gregoriano se convirtió en un estándar. Hoy en día se usa en todo el planeta de forma universal. El calendario exacto que dirige nuestra época cibernética es el descendiente directo de aquel invento milenario de los faraones."
    ],
    "fact": "El Imperio británico se rehusó a aceptar este calendario hasta el siglo XVIII. Para cuando lo adoptaron en 1752, tuvieron que eliminar 11 días completos de su calendario.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Miguel de Cervantes y William Shakespeare murieron en la misma fecha (23 de abril de 1616), pero con un desfase de 10 días reales, ya que España usaba el calendario gregoriano e Inglaterra aún usaba el juliano."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La fórmula gregoriana del año bisiesto reduce el error a tan solo un día de desfase cada 3,300 años, logrando una precisión asombrosa para la época."
      }
    ]
  },
  {
    "id": "haab-maya",
    "title": "Los Mayas: Otro 365",
    "color": "#A5D6A7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_haab-maya.png",
    "image": "/assets/egypt/infographic_calendario/hero_haab-maya.png",
    "content": [
      "Mientras los astrónomos egipcios observaban el cielo a orillas del río Nilo, los sabios de civilizaciones al otro lado del océano también miraban el cielo estrellado con interés.",
      "Miles de años después, en un mundo verde y húmedo de espesas selvas centroamericanas, los mayas desarrollaron el calendario Haab, de manera completamente independiente.",
      "Resulta asombroso que los mayas descubrieron, al igual que los egipcios, la misma cantidad exacta de 365 días necesarios para completar un ciclo solar. Ambas culturas llegaron a la misma conclusión observando los mismos astros.",
      "Sin embargo, los mayas dividieron el año de una forma ligeramente diferente. Usaban 18 meses de exactamente 20 días cada uno, más cinco días extras al final.",
      "Estos cinco días adicionales eran llamados 'Wayeb'. Al igual que en el antiguo Egipto, estos días fuera del tiempo regular eran considerados de mala suerte. Esta convergencia demuestra que la observación atenta de la naturaleza produjo soluciones paralelas universales."
    ],
    "fact": "La convergencia de soluciones astronómicas independientes entre culturas separadas por miles de kilómetros es un fenómeno fascinante del desarrollo humano.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas no utilizaban el calendario Haab por sí solo. Lo combinaban con otro calendario sagrado de 260 días llamado Tzolk'in."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los sabios mayas calcularon la duración del año de forma espectacular y precisa, superando la exactitud del calendario juliano que se usaba en Europa en su época."
      }
    ]
  }
];

// â”€â”€â”€ Star Field Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StarField() {
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
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px', pointerEvents: 'none' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(232,201,106,0.3))' }}>
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#nutGrad)" strokeWidth="3" strokeLinecap="round" />
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => (
          <motion.circle key={i} cx={cx} cy={10 + Math.abs(cx - 300) * 0.15 + 15} r="3" fill="#FFD700"
            animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
          />
        ))}
        <circle cx="30" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="300" cy="8" r="7" fill="rgba(232,201,106,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(232,201,106,0.5))' }} />
        <defs>
          <linearGradient id="nutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,201,106,0.3)" />
            <stop offset="50%" stopColor="rgba(232,201,106,0.9)" />
            <stop offset="100%" stopColor="rgba(232,201,106,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E8C96A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL NILO DE NUT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,201,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL TIEMPO Y LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (circular image-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(232,201,106,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
         loading="lazy" />
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
          layoutId="activeDot"
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

// â”€â”€â”€ ExpandableSection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ExpandableSection({ item, color }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon === 'sparkles' ? Sparkles : Star;
  
  return (
    <div style={{ marginBottom: '1rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: `linear-gradient(90deg, ${color}15, transparent)`,
          border: `1px solid ${color}30`, borderRadius: '12px', padding: '1rem',
          cursor: 'pointer', color: '#FFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ background: `${color}30`, padding: '0.5rem', borderRadius: '50%' }}>
            <Icon size={18} style={{ color }} />
          </div>
          <span style={{ fontWeight: 'bold', color }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronRight size={18} style={{ color }} /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '1rem', marginTop: '0.5rem',
              background: 'rgba(255,255,255,0.03)',
              borderLeft: `3px solid ${color}`,
              borderRadius: '0 12px 12px 0',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.95rem', lineHeight: 1.7
            }}>
              {item.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ ContentPanel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(12, 12, 35, 0.9)',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px'
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none'
          }} />
        </div>

        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
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
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2, marginBottom: '2rem' }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto', background: `rgba(255,255,255,0.02)`, borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px'
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 2 }}>
          {node.expandables && node.expandables.map((exp, i) => (
             <ExpandableSection key={i} item={exp} color={node.color} />
          ))}
        </div>

        {node.fact && (
          <div style={{
            marginTop: '1.5rem', background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px', padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(232,201,106,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFD700', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E8C96A, #FFD700)', borderRadius: '3px', boxShadow: '0 0 8px rgba(232,201,106,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E8C96A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM13() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      background: 'url(/assets/egypt/infographic_calendario/bg_calendario.png) center/cover no-repeat, linear-gradient(180deg, #0B0E2D 0%, #1A1040 40%, #0B0E2D 100%)',
      backgroundBlendMode: 'overlay',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(232,201,106,0.12)', boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 14, 45, 0.75)', zIndex: 0, pointerEvents: 'none' }} />
      <StarField />
      <NutHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(232,201,106,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem 1.2rem',
        position: 'relative', zIndex: 2, marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)', borderRadius: '0 0 16px 16px', position: 'relative', zIndex: 2
      }}>
        <h4 style={{ color: '#E8C96A', margin: '0 0 1rem', fontSize: '1.1rem' }}>ðŸ“š Fuentes y Referencias</h4>
        <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          {BIBLIOGRAPHY.map((ref, i) => <li key={i}>{ref}</li>)}
        </ul>
      </div>

      {lightboxSrc && <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}
