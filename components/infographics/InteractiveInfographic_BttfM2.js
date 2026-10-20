'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Travel themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoClockwork({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Clock hands */}
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Hour markers */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
      {/* Gear teeth */}
      {[15,45,75,105,135,165,195,225,255,285,315,345].map((a,i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30+23*Math.cos(rad)-2} y={30+23*Math.sin(rad)-2} width="4" height="4" fill={color} opacity="0.3" transform={`rotate(${a} ${30+23*Math.cos(rad)} ${30+23*Math.sin(rad)})`} />;
      })}
    </svg>
  );
}

function DecoLightning({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Main timeline */}
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Branch */}
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Nodes */}
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      {/* Arrow */}
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      {/* Electrons */}
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Concentric spiraling rings */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      {/* Distortion streaks */}
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoDeLoreanSvg({ size = 80, color = '#90CAF9', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Car body silhouette */}
      <path d="M10 28 L18 28 L22 18 L35 14 L55 14 L62 18 L70 28 L72 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="24" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Speed trails */}
      <line x1="2" y1="20" x2="12" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="4" y1="24" x2="14" y2="24" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="6" y1="28" x2="10" y2="28" stroke={color} strokeWidth="1" opacity="0.2" />
      {/* Fire trails */}
      <path d="M72 26 Q76 24 78 26 Q76 28 72 26" fill={color} opacity="0.3" />
      <path d="M72 30 Q76 28 78 30 Q76 32 72 30" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFormula({ size = 70, color = '#FFAB91', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* E=mcÂ² stylized */}
      <text x="10" y="28" fill={color} fontSize="20" fontWeight="bold" fontFamily="serif" opacity="0.4">E=mcÂ²</text>
      {/* Floating particles */}
      <circle cx="58" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="62" cy="18" r="1" fill={color} opacity="0.4" />
      <circle cx="55" cy="36" r="1.5" fill={color} opacity="0.5" />
      <circle cx="8" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Wavy lines */}
      <path d="M5 38 Q15 34 25 38 Q35 42 45 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'relatividad-basico': [DecoClockwork, DecoFormula, DecoAtomSvg],
  'delorean-velocidad': [DecoDeLoreanSvg, DecoLightning, DecoClockwork],'paradoja-abuelo': [DecoTimeline, DecoWormhole, DecoClockwork],'einstein-relatividad': [DecoFormula, DecoAtomSvg, DecoClockwork],
  'muchos-mundos': [DecoWormhole, DecoTimeline, DecoAtomSvg],
  'predicciones-2015': [DecoDeLoreanSvg, DecoLightning, DecoFormula],'ciencia-ficcion': [DecoWormhole, DecoFormula, DecoTimeline],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Einstein, A. (1905). Zur Elektrodynamik bewegter Korper, Annalen der Physik, 17',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "relatividad-basico",
    diagramImage: '/assets/bttf/infographic_m2/diagram_relatividad-basico.webp',
    diagramCaption: 'Las bases de la relatividad especial de Einstein y la dilatación del tiempo',
    "title": "¿Qué es el Tiempo?",
    "color": "#6EC6FF",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_relatividad.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_relatividad.webp",
    "content": [
      "En el cine de ciencia ficción, el tiempo suele representarse como un río constante sobre el que una máquina puede navegar hacia atrás o adelante con solo pulsar un interruptor en el tablero. Regreso al Futuro utiliza esta convención narrativa para llevar a Marty McFly a 1955 sin alterar de golpe la física del universo visible. Sin embargo, la física moderna demuestra que el tiempo no fluye de manera uniforme ni aislada: forma una malla indisociable con el espacio tridimensional llamada espaciotiempo, donde cada observador mide ritmos distintos según su velocidad y el campo gravitatorio circundante.",
      "Durante siglos, la mecánica clásica formulada por Isaac Newton sostuvo que un reloj maestro marcaba los segundos de forma idéntica en cualquier rincón del cosmos. Para Newton, un segundo transcurrido en la Tierra era exactamente igual a un segundo en los anillos de Saturno o en los confines de la galaxia. Esta visión intuitiva gobernó la ciencia hasta principios del siglo XX, pero experimentos ópticos cruciales demostraron anomalías que obligaron a replantear cómo la luz se propaga en el vacío sin importar el movimiento relativo de su fuente emisora.",
      "Albert Einstein revolucionó nuestra concepción en 1905 al formular la teoría de la relatividad especial, demostrando que la velocidad de la luz en el vacío es una constante universal insuperable, fijada en 299.792.458 metros por segundo. Para preservar esta invariancia de la luz para todos los observadores inerciales, el tiempo y la longitud espacial deben volverse magnitudes relativas y flexibles. Si un cuerpo se mueve a velocidades cercanas a este límite cósmico, su reloj interno avanza perceptiblemente más despacio en comparación con un observador en reposo.",
      "La termodinámica añade otra pieza fundamental al enigma mediante la llamada flecha del tiempo, regida por la segunda ley del universo observable. Esta ley establece que en cualquier sistema termodinámico aislado la entropía global, entendida como el número de microestados accesibles o medida del desorden, tiende inevitablemente a aumentar con cada transformación energética. Por esta razón vemos huevos romperse o tazas de café enfriarse, pero jamás observamos de forma espontánea cómo los fragmentos dispersos de cerámica rota se ensamblan para regresar íntegros a la mesa.",
      "Comprender la verdadera naturaleza del tiempo implica reconocer que el pasado, el presente y el futuro no están grabados en compartimentos estáticos del universo. En la cosmología relativista, el concepto de presente universal desaparece por completo: dos sucesos que parecen ocurrir exactamente al mismo instante para un observador terrestre pueden suceder en momentos distintos para un piloto que viaja a bordo de una nave interplanetaria de alta aceleración, revelando que la cronología depende del marco de referencia adoptado."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Regreso al Futuro, el condensador de flujo inventado por Emmett Brown necesita alcanzar exactamente 88 millas por hora para abrir la brecha temporal. Robert Zemeckis y Bob Gale eligieron esa velocidad específica simplemente porque el número 88 resultaba sumamente fácil de recordar para el público y lucía imponente con tipografía digital roja en el velocímetro del deportivo DeLorean DMC-12 durante las secuencias nocturnas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La dilatación temporal predicha por la relatividad einsteiniana es un fenómeno comprobado experimentalmente con relojes atómicos ultraprecisos de cesio y estroncio. Si una nave viajara al 99,9% de la velocidad de la luz durante un año según sus propios cronómetros de a bordo, al regresar a la Tierra descubriría que en la superficie del planeta han transcurrido más de veintidós años completos para sus habitantes."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_relatividad-basico.webp",
    "bannerCaption": "Las bases de la relatividad especial de Einstein y la dilatación del tiempo",
    "fact": "Los satélites de la red GPS orbitan la Tierra a 20.200 kilómetros de altitud y a casi 14.000 kilómetros por hora; por efectos combinados de velocidad y menor gravedad, sus relojes atómicos ganan 38 microsegundos netos cada día, desfase que obligaría a recalibrar las coordenadas con errores acumulativos de más de 11 kilómetros diarios si no se aplicara la corrección relativista."
  },
  {
    "id": "delorean-velocidad",
    diagramImage: '/assets/bttf/infographic_m2/diagram_delorean-velocidad.webp',
    diagramCaption: 'El DeLorean alcanza las 88 mph y activa el desplazamiento temporal',
    "title": "88 Millas por Hora",
    "color": "#FFD740",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_delorean.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_delorean.webp",
    "content": [
      "El clímax de cada salto temporal en la trilogía ocurre cuando el DeLorean DMC-12 supera las 88 millas por hora, dejando dos surcos ardientes de fuego sobre el asfalto del estacionamiento de Twin Pines Mall. En la cinematografía de Hollywood, esta cifra funciona como un umbral casi mágico que separa la cotidianidad de los años ochenta de la década de 1950. Sin embargo, para la física del transporte y la relatividad cinemática, viajar a 141,6 kilómetros por hora apenas equivale a la velocidad de crucero en una autopista alemana contemporánea.",
      "El velocímetro original de fábrica del DeLorean DMC-12 de 1981 solo marcaba hasta 85 millas por hora debido a una estricta ley federal de seguridad vial promulgada en Estados Unidos por el presidente Jimmy Carter. La producción cinematográfica tuvo que encargar un velocímetro modificado a medida con lecturas de hasta 95 millas por hora para que la aguja pudiera sobrepasar el número 88 en pantalla, demostrando cómo los requisitos dramáticos transformaron un detalle automovilístico cotidiano en un ícono de la cultura popular mundial.",
      "Si analizamos el consumo energético necesario para acelerar una masa vehicular de 1.230 kilogramos hasta 141,6 kilómetros por hora, la energía cinética requerida es de apenas 950 kilojulios, una cifra diminuta en comparación con la potencia monstruosa de 1,21 gigavatios que el Doc Brown declara necesaria para el condensador de flujo. El verdadero reto físico del viaje no reside en la aceleración mecánica del motor de combustión PRV V6, sino en suministrar una potencia eléctrica colosal en una fracción infinitesimal de segundo.",
      "Desde la perspectiva de la física de altas energías, cruzar el espacio convencional a velocidades terrestres no altera la geometría del vacío cuántico ni genera trayectorias temporales cerradas. Para curvar el espaciotiempo de modo que dos puntos cronológicos distantes entren en contacto topológico, los modelos teóricos modernos exigen concentraciones energéticas comparables a las densidades del núcleo de una estrella de neutrones o la presencia hipotética de densidades de masa negativa que violen las condiciones de energía clásicas.",
      "La aceleración continua también impone restricciones fisiológicas severas sobre el organismo de los tripulantes humanos. En la escena cinematográfica, el vehículo salta al instante hacia otra época sin que Marty o su perro Einstein sufran el impacto de fuerzas gravitatorias letales por desaceleración súbita. En un dispositivo físico real, cualquier transición discontinua en el espacio o el tiempo generaría aceleraciones infinitas capaces de disgregar los enlaces moleculares de la materia orgánica si no mediara un campo protector inercial."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El diseño original del guion no utilizaba un automóvil sino una vieja nevera doméstica conectada a una prueba nuclear en el desierto de Nevada. Steven Spielberg y Robert Zemeckis decidieron descartar la idea por temor a que niños pequeños imitaran a Marty y se quedaran encerrados dentro de refrigeradores domésticos sin ventilación, eligiendo el DeLorean por su aspecto futurista de nave espacial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad de 88 millas por hora equivale exactamente a 39,34 metros por segundo, lo que representa solo el 0,000013% de la velocidad límite de la luz en el vacío. A esa velocidad terrestre, el factor de dilatación temporal relativista de Lorentz es tan insignificante que un reloj a bordo apenas se retrasaría una millonésima de segundo tras circular continuamente durante miles de años sin descanso."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_delorean-velocidad.webp",
    "bannerCaption": "El DeLorean alcanza las 88 mph y activa el desplazamiento temporal",
    "fact": "La potencia eléctrica de 1,21 gigavatios requerida por el condensador de flujo equivale a 1.210.000.000 de vatios, la potencia media suministrada por un reactor nuclear de fisión comercial como los de la planta de Palo Verde en Arizona o la descarga simultánea concentrada de un rayo de tormenta eléctrica promedio con una intensidad de 30.000 amperios a 40.000 voltios sostenidos."
  },
  {
    "id": "paradoja-abuelo",
    diagramImage: '/assets/bttf/infographic_m2/diagram_paradoja-abuelo.webp',
    diagramCaption: 'La paradoja del abuelo: el dilema lógico del viaje al pasado',
    "title": "La Paradoja del Abuelo",
    "color": "#FF8A80",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_paradoja.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_paradoja.webp",
    "content": [
      "El conflicto dramático central de Regreso al Futuro surge cuando Marty McFly interrumpe accidentalmente el primer encuentro fortuito de sus padres adolescentes en 1955, provocando que su propia fotografía comience a desvanecerse gradualmente. Esta imagen visual de los cuerpos transparentes representa la paradoja del abuelo, uno de los dilemas lógicos más célebres de la física teórica y la filosofía causal, donde una modificación retroactiva del pasado amenaza con destruir la causa que posibilitó el propio viaje temporal.",
      "La formulación clásica del enigma plantea un escenario inquietante: si un viajero viaja en el tiempo hacia el pasado y elimina a su abuelo biológico antes de que conciba a sus progenitores, el viajero nunca habría nacido en el futuro. Pero si nunca llegó a nacer en el presente, resulta imposible que haya podido construir una máquina para viajar al pasado y ejecutar dicho acto. Esta contradicción lógica autorreferencial demuestra que una línea temporal única no puede admitir trayectorias de acción mutuamente excluyentes sin quebrarse.",
      "En la cinematografía, la desaparición progresiva de Marty y sus hermanos se escenifica de forma lenta y dramática, dándole una ventana de varios días para corregir la situación en el baile del instituto. Sin embargo, la lógica matemática binaria no admite estados intermedios de existencia: un objeto cuántico o una persona no pueden encontrarse parcialmente nacidos a escala macroscópica. O el evento causal ocurre de forma concluyente en el entramado cósmico, o la coherencia interna de la realidad colapsa en el acto.",
      "Para resolver este atolladero sin renunciar a las soluciones de la relatividad general que permiten curvas temporales cerradas, los físicos teóricos exploran dos grandes avenidas conceptuales. La primera es el principio de autoconsistencia propuesto por el astrofísico ruso Igor Novikov, que estipula que las leyes físicas globales conspiran localmente para impedir cualquier acontecimiento incompatible con la historia ya registrada, haciendo que cualquier tentativa de frustrar el pasado resulte intrínsecamente fallida o termine causando el evento original.",
      "La segunda alternativa recurre a la mecánica cuántica y a la interpretación de los múltiples mundos postulada por Hugh Everett III en 1957. Bajo este enfoque, cuando Marty aterriza en 1955 y altera las circunstancias del noviazgo paterno, no modifica su propio pasado histórico, sino que bifurca el estado cuántico del universo hacia una nueva rama causal alternativa, protegiendo su propia existencia previa en la línea de origen mientras experimenta una realidad divergente e independiente."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre fotografía familiar de Marty donde sus hermanos Linda y Dave van desapareciendo miembro por miembro fue lograda mediante complejas técnicas ópticas artesanales en 1985. En la escena del baile del Encanto Bajo el Mar, el guitarrista comienza a perder la fuerza motriz de su mano derecha al ritmo de «Earth Angel», visualizando la amenaza inminente de su desaparición ontológica total."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En computación cuántica moderna, simulaciones realizadas con fotones individuales que atraviesan curvas temporales cerradas simuladas han demostrado que los estados cuánticos pueden evitar paradojas mediante la no-linealidad estadística, donde las probabilidades de sucesos inconsistentes se anulan por interferencia destructiva cuántica, preservando la coherencia global del sistema emisor."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_paradoja-abuelo.webp",
    "bannerCaption": "La paradoja del abuelo: el dilema lógico del viaje al pasado",
    "fact": "El físico teórico Joseph Polchinski formuló una variante rigurosa de la paradoja enviando una bola de billar mecánica a través de un agujero de gusano: los cálculos de Novikov demostraron que la bola siempre colisiona de refilón consigo misma con la fuerza y ángulo exactos para desviarse lo justo y entrar al túnel temporal, cumpliendo la trayectoria sin contradicción matemática alguna."
  },
  {
    "id": "einstein-relatividad",
    diagramImage: '/assets/bttf/infographic_m2/diagram_einstein-relatividad.webp',
    diagramCaption: 'Einstein y su teoría de la relatividad que redefinió el tiempo y el espacio',
    "title": "Einstein y el Tiempo Elástico",
    "color": "#B388FF",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_einstein.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_einstein.webp",
    "content": [
      "El perro pastor del Doc Brown lleva con orgullo el nombre de Einstein, un homenaje explícito al sabio alemán que desmontó la rigidez del cosmos newtoniano. En la primera prueba práctica de la máquina en el aparcamiento comercial, el científico envía a su mascota un minuto hacia el futuro cronometrado con relojes gemelos sincronizados. Esta secuencia recrea con asombrosa fidelidad pedagógica los célebres experimentos mentales que Albert Einstein ideó para demostrar que el paso del tiempo depende enteramente de la trayectoria del observador.",
      "La teoría de la relatividad especial, publicada en 1905, demostró que el tiempo se dilata cuando la velocidad de un móvil se aproxima a la de la radiación electromagnética. Si un objeto incrementa su velocidad respecto a un marco de referencia estacionario, la distancia espacial se contrae en la dirección del movimiento y los intervalos temporales se ensanchan según el factor gamma ideado por el matemático neerlandés Hendrik Lorentz, obligando a los relojes en movimiento relativo a retrasarse respecto a los estáticos.",
      "Diez años más tarde, en 1915, Einstein amplió este marco al presentar su obra cumbre: la teoría de la relatividad general, incorporando los efectos gravitatorios. La presencia de masa y energía no ejerce una fuerza mágica a distancia como creía la física dieciochesca, sino que deforma y curva la propia geometría del espaciotiempo tetradimensional circundante. Cuanto más intenso resulta el potencial gravitatorio cerca de un cuerpo masivo, más lentamente transcurre el tiempo en comparación con regiones de espacio vacío lejano.",
      "Este fenómeno de dilatación temporal gravitatoria no es una ilusión óptica ni una falla mecánica de los engranajes relojeros, sino una propiedad fundamental del tejido del cosmos. Un reloj atómico situado al nivel del mar en la costa marina late de forma mesurablemente más pausada que un reloj idéntico ubicado en la cima del monte Everest, debido a que el primer dispositivo se encuentra sumergido en un campo gravitatorio terrestre marginalmente más profundo y denso.",
      "En la narrativa cinematográfica, el salto del perro Einstein hacia el futuro dura un instante absoluto sin requerir velocidades relativistas continuas gracias a la ficción del condensador de flujo. Sin embargo, en el mundo real, los viajes al futuro no requieren máquinas imposibles: ocurren cada segundo de forma medible. Todos viajamos al futuro a razón de un segundo por segundo, y los cosmonautas que habitan estaciones espaciales a gran velocidad experimentan un adelanto temporal real respecto a quienes nos quedamos en tierra."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El perro del Doc Brown en la versión cinematográfica definitiva es un simpático perro pastor de raza catalana llamado Einstein, pero en los borradores tempranos de 1980 el fiel compañero del científico era un chimpancé travieso llamado Shemp, cambiado por recomendación del ejecutivo de Universal Pictures Sid Sheinberg, quien sostenía que las películas con simios nunca generaban beneficios en taquilla."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El astronauta ruso Gennady Padalka ostentó el récord de permanencia acumulada en órbita con 879 días espaciales distribuidos en múltiples misiones. Debido a su velocidad orbital de 28.000 kilómetros por hora atenuada parcialmente por la altitud, Padalka viajó hacia el futuro de la Tierra aproximadamente 0,023 segundos reales más que sus compatriotas que nunca abandonaron la superficie terrestre."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_einstein-relatividad.webp",
    "bannerCaption": "Einstein y su teoría de la relatividad que redefinió el tiempo y el espacio",
    "fact": "En 1971, los físicos Joseph Hafele y Richard Keating montaron cuatro relojes atómicos comerciales de haz de cesio a bordo de vuelos regulares de aviones comerciales que dieron la vuelta completa al planeta; al comparar las lecturas finales con los relojes de referencia del Observatorio Naval estadounidense, confirmaron la dilatación temporal einsteiniana con una precisión superior al 98% de lo predicho matemáticamente."
  },
  {
    "id": "muchos-mundos",
    diagramImage: '/assets/bttf/infographic_m2/diagram_muchos-mundos.webp',
    diagramCaption: 'La teoría cuántica de los muchos mundos y las líneas temporales paralelas',
    "title": "Líneas Temporales Paralelas",
    "color": "#CE93D8",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_mundos.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_mundos.webp",
    "content": [
      "En Regreso al Futuro Parte II, el Doc Brown utiliza una pizarra de tiza en el laboratorio alternativo de 1985 para explicar gráficamente cómo el robo del almanaque deportivo por parte del anciano Biff Tannen distorsionó la realidad. Dibujando una línea horizontal continua que representa la historia conocida, el Doc traza una rama secundaria que surge de 1955 y bautiza ese desvío como «1985 alternativo», un mundo distópico gobernado por la corrupción que sustituyó al vecindario pacífico original de Hill Valley.",
      "Esta elegante explicación pedagógica frente al pizarrón conectó directamente a millones de jóvenes espectadores con uno de los conceptos más apasionantes de la física teórica contemporánea: el multiverso y la teoría de los muchos mundos. Formulada formalmente por el físico Hugh Everett III en su tesis doctoral de la Universidad de Princeton, esta interpretación propone que cada vez que un sistema mecánico cuántico se enfrenta a varios resultados posibles, la función de onda universal no colapsa, sino que todas las posibilidades ocurren simultáneamente en ramificaciones independientes.",
      "A diferencia del multiverso de Everett, donde la bifurcación no destruye el universo precedente sino que coexiste paralelamente en el gigantesco espacio de Hilbert matemático, el universo de la película opera bajo una física de sobreescritura continua. En la pantalla, cuando se crea la línea temporal corrupta de Biff, el futuro luminoso previo parece borrarse o quedar inaccesible, lo que obliga a los protagonistas a regresar nuevamente al punto de inflexión en 1955 para quemar el almanaque y restaurar el cauce original.",
      "Desde la perspectiva de la física de partículas y la cosmología de cuerdas, los universos paralelos podrían existir sin necesidad de máquinas del tiempo macroscópicas. Modelos inflacionarios como los desarrollados por Alan Guth y Andrei Linde sugieren que nuestro Big Bang no fue un suceso aislado, sino parte de una inflación cósmica eterna donde brotan constantemente universos burbuja aislados unos de otros por distancias espaciales que se expanden a mayor velocidad que la luz.",
      "La interacción entre estas líneas divergentes plantea desafíos termodinámicos colosales. Si una persona viaja físicamente a otra línea de tiempo, transfiere de forma efectiva masa, energía e información fuera de su universo de origen hacia el receptor. En física clásica, las leyes de conservación de la energía son estrictas a nivel global; violar estas reglas requeriría mecanismos de compensación simétrica donde partículas exóticas fluyeran en sentido inverso para preservar el equilibrio termodinámico total del multiverso."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre escena de la pizarra donde Emmett Brown ilustra la línea temporal alternativa fue grabada en una sola toma magistral por Christopher Lloyd, quien memorizó la compleja terminología temporal ideada por los guionistas para dotar de una credibilidad académica incuestionable a uno de los giros de guion más intrincados de la historia del cine comercial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La interpretación de muchos mundos de Everett resuelve la paradoja de la medida en mecánica cuántica suprimiendo el misterioso colapso de la función de onda de Copenhague. En esta formulación matemática, la decoherencia cuántica explica de manera rigurosa por qué los seres macroscópicos jamás percibimos las ramas superpuestas, preservando el determinismo físico en todo momento."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_muchos-mundos.webp",
    "bannerCaption": "La teoría cuántica de los muchos mundos y las líneas temporales paralelas",
    "fact": "El físico Max Tegmark clasificó formalmente cuatro niveles de multiverso físico: el Nivel I de regiones espaciales infinitas más allá de nuestro horizonte cosmológico de 46.500 millones de años luz, el Nivel II de universos inflacionarios con leyes físicas distintas, el Nivel III de Everett basado en la bifurcación cuántica del espacio de Hilbert y el Nivel IV de estructuras puramente matemáticas autónomas."
  },
  {
    "id": "predicciones-2015",
    diagramImage: '/assets/bttf/infographic_m2/diagram_predicciones-2015.webp',
    diagramCaption: 'Las predicciones de BTTF para el año 2015: ¿cuáles se hicieron realidad?',
    "title": "Predicciones del Futuro",
    "color": "#80CBC4",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_predicciones.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_predicciones.webp",
    "content": [
      "El salto hacia el año 2015 en la segunda entrega cinematográfica sumergió al público en un Hill Valley hipertecnológico repleto de coches voladores guiados por autopistas aéreas luminosas, aeropatinetas que desafían la gravedad terrestre y zapatillas con robótica de autoajuste automático. Robert Zemeckis y su equipo artístico consultaron a futurólogos, diseñadores e ingenieros industriales a finales de los años ochenta con el objetivo expreso de proyectar tecnologías verosímiles pero visualmente atractivas para el cambio de milenio.",
      "Al contrastar la ficción con la realidad empírica que efectivamente vivimos en 2015, la tasa de acierto del equipo cinematográfico resultó sorprendente en áreas clave de la ingeniería de telecomunicaciones y el software de consumo. La película anticipó con asombrosa lucidez el despliegue universal de las videoconferencias de pantalla plana en el salón doméstico mediante pantallas similares a las plataformas modernas de Zoom o Skype, la identificación biométrica por huella dactilar para abrir cerraduras y el uso cotidiano de gafas de realidad virtual.",
      "Sin embargo, el filme erró notablemente en otros aspectos tecnológicos y sociales debido al sesgo analógico dominante en 1989. La visión de Zemeckis imaginó un futuro donde los faxes de papel térmico continuaban instalados en cada rincón de la vivienda inteligente escupiendo cartas de despido laboral en segundos, sin anticipar que la revolución invisible de Internet globalizada, los protocolos web y la telefonía móvil de bolsillo con pantallas táctiles liquidarían el fax como medio primordial de mensajería empresarial.",
      "En el ámbito de la propulsión y el transporte urbano, los coches voladores con reactores nucleares de fusión doméstica Mr. Fusion siguen siendo inviables en nuestras metrópolis actuales. Las leyes de la hidrodinámica atmosférica y la eficiencia energética demuestran que mantener suspendido un vehículo convencional de dos toneladas en el aire requiere un gasto continuo de energía diez veces superior al rodaje mecánico sobre asfalto, sumado a los riesgos inasumibles de accidentes y colisiones en corredores aéreos poblados.",
      "A pesar de estas discrepancias técnicas, el 2015 de la ficción cumplió una función inspiradora invaluable para el progreso contemporáneo. Numerosas corporaciones tecnológicas de vanguardia dedicaron cuantiosos recursos de ingeniería para desarrollar prototipos funcionales de zapatillas autoajustables y monopatines magnéticos en homenaje explícito a la fecha señalada por el filme, demostrando cómo los sueños de la ciencia ficción impulsan la innovación industrial tangible de nuestra sociedad."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La multinacional Nike comercializó en 2016 una edición limitada y funcional de las célebres zapatillas Nike Mag con cordones motorizados que se abrochan automáticamente al detectar la presión plantar del usuario. La recaudación millonaria de la subasta pública fue donada íntegramente a la Fundación Michael J. Fox para apoyar la investigación biomédica contra el párkinson."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El reactor doméstico Mr. Fusion instalado en el DeLorean funcionaba presuntamente convirtiendo cáscaras de plátano y cerveza en energía limpia. En la física estelar real, la fusión nuclear requiere calentar núcleos de hidrógeno e isótopos a temperaturas de más de cien millones de grados Celsius para superar la repulsión electrostática de Coulomb y liberar energía neta abundante."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_predicciones-2015.webp",
    "bannerCaption": "Las predicciones de BTTF para el año 2015: ¿cuáles se hicieron realidad?",
    "fact": "El 21 de octubre de 2015, la fecha exacta a la que Marty McFly arriba en el futuro cinematográfico, los cines de más de cincuenta países reestrenaron la película de forma simultánea, congregando a cientos de miles de espectadores que acudieron disfrazados con chalecos térmicos naranjas y gorras holográficas a celebrar el impacto cultural de esta visión de la ciencia aplicada."
  },
  {
    "id": "ciencia-ficcion",
    diagramImage: '/assets/bttf/infographic_m2/diagram_ciencia-ficcion.webp',
    diagramCaption: 'La ciencia ficción como catalizadora de la investigación científica real',
    "title": "Ciencia Ficción como Brújula",
    "color": "#FFAB91",
    "btnImage": "/assets/bttf/infographic_viajes_tiempo/btn_cienciaficcion.webp",
    "image": "/assets/bttf/infographic_viajes_tiempo/hero_cienciaficcion.webp",
    "content": [
      "Las grandes obras de ciencia ficción no tienen como misión predecir el porvenir con rigor milimétrico, sino encender la llama de la curiosidad intelectual en las generaciones jóvenes y cuestionar el rumbo ético de nuestras creaciones técnicas. Regreso al Futuro logró algo extraordinario dentro de la cultura contemporánea: transformó nociones abstractas y complejas de la relatividad general y la mecánica cuántica en una aventura comprensible, divertida y profundamente entrañable para el público infantil y juvenil de todo el mundo.",
      "Científicos de prestigio internacional, desde astrofísicos dedicados al estudio de la cosmología primordial hasta ingenieros en robótica aeroespacial, han confesado abiertamente haber descubierto su vocación científica tras quedar maravillados en su niñez por los instrumentos luminosos del laboratorio casero del Doc Brown. La imagen de un científico apasionado, bondadoso y comprometido con la experimentación rigurosa ayudó a desterrar el cliché añejo del sabio loco destructivo que imperaba en la literatura gótica decimonónica.",
      "El relato de viajes en el tiempo funciona asimismo como un potente laboratorio conceptual donde poner a prueba los límites de las leyes fundamentales de la naturaleza. Cuando físicos teóricos como Kip Thorne o Stephen Hawking se sentaron a calcular la viabilidad matemática de atravesar agujeros de gusano o la conjetura de protección cronológica, lo hicieron empleando ecuaciones serias de la relatividad general, motivados por interrogantes planteados inicialmente por relatos literarios y cinematográficos universales.",
      "Esta retroalimentación constante entre el arte audiovisual y el avance del conocimiento genera un círculo virtuoso indispensable. Los cineastas se nutren de los últimos descubrimientos de los observatorios astronómicos y aceleradores de partículas para dotar de textura a sus universos narrativos, mientras que los investigadores encuentran en la iconografía cinematográfica analogías visuales elocuentes para divulgar descubrimientos herméticos ante la sociedad civil que financia sus proyectos de exploración.",
      "El mensaje final de la trilogía, pronunciado por el Doc Brown junto a su locomotora temporal al final de la tercera entrega, resuena con una vigencia científica y humana intacta: el futuro de la humanidad no está escrito de forma inmutable en ningún código determinista previo, sino que se forja día a día a través de nuestras decisiones individuales, nuestro trabajo colectivo, nuestra educación científica y nuestra inagotable capacidad creadora para soñar."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Christopher Lloyd modeló los gestos corporales y la intensidad vocal del doctor Emmett Brown inspirándose de manera deliberada en dos personalidades colosales del siglo XX: el célebre físico Albert Einstein por su genialidad humanista y el director de orquesta Leopold Stokowski por su enérgica y pasional gestualidad física al dirigir partituras complejas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El astrofísico Kip Thorne comenzó sus investigaciones formales sobre agujeros de gusano transitables impulsado por una consulta del divulgador Carl Sagan para su novela Contacto. Esos cálculos teóricos rigurosos demostraron matemáticamente que una garganta gravitatoria requeriría materia exótica con densidad de energía negativa para mantenerse abierta contra el colapso gravitacional."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m2/banner_ciencia-ficcion.webp",
    "bannerCaption": "La ciencia ficción como catalizadora de la investigación científica real",
    "fact": "El físico Stephen Hawking organizó el 28 de junio de 2009 una famosa fiesta de bienvenida para viajeros del tiempo en la Universidad de Cambridge, pero envió las invitaciones formales con coordenadas geográficas exactas de latitud y longitud solo después de que la fiesta concluyó; nadie acudió al evento, consolidando con humor su conjetura de protección cronológica del cosmos."
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
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
      hue: Math.random() > 0.5 ? '160,200,255' : '200,160,255', // blue or purple
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

// â”€â”€â”€ Time Travel Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(110,198,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6EC6FF','#FFD740','#FF8A80','#B388FF','#CE93D8','#80CBC4','#FFAB91'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central clock icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#6EC6FF" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#6EC6FF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(110,198,255,0.2)" />
            <stop offset="50%" stopColor="rgba(110,198,255,0.9)" />
            <stop offset="100%" stopColor="rgba(110,198,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#6EC6FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIAJES EN EL TIEMPO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(110,198,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DETRÁS DE LA FICCIÓN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching M9 Dendera style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(110,198,255,0.2)'}`,
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotBttfM2"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}
              {/* Banner image */}
              {node.bannerImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={node.bannerImage}
                    alt={node.bannerCaption || node.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  {node.bannerCaption && (
                    <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}

        {/* Fact Box */}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(110,198,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#6EC6FF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #6EC6FF, #B388FF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(110,198,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6EC6FF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/bttf/infographic_viajes_tiempo/bg_viajes_tiempo.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(110,198,255,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <TimeTravelHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(110,198,255,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(110,198,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(110,198,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#6EC6FF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† ¡Has dominado los secretos del Viaje en el Tiempo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Viajero Temporal
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ Bibliografía â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
