'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Electricity Rivalry themed) ────────────────────
function DecoLightbulb({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Bulb glass */}
      <ellipse cx="30" cy="22" rx="14" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Filament */}
      <path d="M25 22 Q28 14 30 22 Q32 14 35 22" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Base */}
      <rect x="24" y="36" width="12" height="8" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="40" x2="36" y2="40" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Glow rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const r1 = 18, r2 = 22;
        return <line key={i} x1={30 + r1 * Math.cos(rad)} y1={22 + r1 * Math.sin(rad)} x2={30 + r2 * Math.cos(rad)} y2={22 + r2 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.3" />;
      })}
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#D4A535', style = {} }) {
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

function DecoGenerator({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer housing */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Armature coils */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 6 * Math.cos(rad)} y1={30 + 6 * Math.sin(rad)} x2={30 + 17 * Math.cos(rad)} y2={30 + 17 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />;
      })}
      {/* Magnetic poles */}
      <path d="M6 25 Q3 30 6 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M54 25 Q57 30 54 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function DecoWaveform({ size = 80, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* AC sine wave */}
      <path d="M5 20 Q15 5 25 20 Q35 35 45 20 Q55 5 65 20 Q75 35 80 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* DC flat line for contrast */}
      <line x1="5" y1="35" x2="75" y2="35" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
      {/* Labels */}
      <text x="70" y="16" fill={color} fontSize="6" opacity="0.5" fontFamily="monospace">AC</text>
      <text x="70" y="34" fill={color} fontSize="6" opacity="0.3" fontFamily="monospace">DC</text>
    </svg>
  );
}

function DecoTowerPole({ size = 70, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tower structure */}
      <line x1="30" y1="5" x2="20" y2="55" stroke={color} strokeWidth="1.5" />
      <line x1="30" y1="5" x2="40" y2="55" stroke={color} strokeWidth="1.5" />
      {/* Cross braces */}
      <line x1="23" y1="20" x2="37" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="35" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Transmission wires */}
      <path d="M5 12 Q18 18 30 8 Q42 18 55 12" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Insulators */}
      <circle cx="30" cy="8" r="2" fill={color} opacity="0.4" />
      <circle cx="15" cy="14" r="1.5" fill={color} opacity="0.3" />
      <circle cx="45" cy="14" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCoil({ size = 60, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tesla coil shape */}
      <rect x="25" y="42" width="10" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="42" x2="30" y2="18" stroke={color} strokeWidth="2" opacity="0.6" />
      {/* Discharge arcs */}
      <path d="M30 18 Q20 10 12 14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 18 Q40 10 48 14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 18 Q22 6 18 4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M30 18 Q38 6 42 4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Sparks at tips */}
      <circle cx="12" cy="14" r="1.5" fill={color} opacity="0.5" />
      <circle cx="48" cy="14" r="1.5" fill={color} opacity="0.5" />
      <circle cx="18" cy="4" r="1" fill={color} opacity="0.4" />
      <circle cx="42" cy="4" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'dos-genios-dos-visiones': [DecoLightbulb, DecoBolt, DecoGenerator],
  'encuentro-nueva-york': [DecoGenerator, DecoCoil, DecoLightbulb],
  'la-ruptura': [DecoBolt, DecoWaveform, DecoTowerPole],
  'westinghouse-entra': [DecoWaveform, DecoGenerator, DecoCoil],
  'batalla-opinion-publica': [DecoBolt, DecoLightbulb, DecoTowerPole],
  'chicago-1893-ac-gana': [DecoLightbulb, DecoTowerPole, DecoWaveform],
  'veredicto-historia': [DecoCoil, DecoGenerator, DecoBolt],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age. Princeton University Press',
  'Jonnes, J. (2003). Empires of Light: Edison, Tesla, Westinghouse, and the Race to Electrify the World. Random House',
  'Stross, R. (2007). The Wizard of Menlo Park: How Thomas Alva Edison Invented the Modern World. Crown Publishers',
  'Israel, P. (1998). Edison: A Life of Invention. John Wiley & Sons',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla. Citadel Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'dos-genios-dos-visiones',
    title: 'Dos Genios, Dos Visiones',
    color: '#6B7B8A',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'Nikola Tesla nació el 10 de julio de 1856 en Smiljan, un pueblo del Imperio Austrohúngaro que hoy forma parte de Croacia. Hijo de un sacerdote ortodoxo serbio y una madre inventora de utensilios domésticos, Tesla mostró desde niño una capacidad para la visualización mental que le permitía diseñar máquinas completas sin dibujar un solo plano. Estudió ingeniería en la Escuela Politécnica de Graz, Austria, donde aprendió sobre motores de corriente continua y comenzó a cuestionar su diseño, convencido de que existía una forma más eficiente de generar y distribuir electricidad usando corrientes alternas rotativas.',
      'Thomas Alva Edison nació el 11 de febrero de 1847 en Milan, Ohio, Estados Unidos. Fue un inventor prolífico y autodidacta que acumuló 1,093 patentes a lo largo de su vida, más que cualquier otro inventor estadounidense de su época. Edison perfeccionó la bombilla incandescente en 1879 tras probar más de 3,000 materiales para el filamento, y construyó la primera central eléctrica comercial del mundo en Pearl Street, Manhattan, en 1882. Su método era empírico: probaba miles de variaciones hasta encontrar la que funcionaba, en contraste directo con el enfoque teórico-matemático de Tesla.',
      'Las diferencias entre ambos iban más allá del método científico. Edison era un hombre de negocios que entendía el mercado y las patentes como herramientas comerciales. Tesla era un científico orientado a la investigación pura que a menudo descuidaba los aspectos financieros de sus inventos. Edison prefería la corriente continua (DC), que fluye en una sola dirección, mientras que Tesla defendía la corriente alterna (AC), que cambia de dirección periódicamente y permite el uso de transformadores para elevar o reducir el voltaje según las necesidades de transmisión a larga distancia.',
      'El contraste también se manifestaba en su estilo de vida. Edison trabajaba en Menlo Park, Nueva Jersey, con un equipo de hasta 200 empleados en lo que llamaba su "fábrica de inventos". Tesla trabajaba frecuentemente solo o con pocos asistentes, confiando en su capacidad de visualización mental para diseñar dispositivos completos antes de construir un solo prototipo. Mientras Edison dormía pocas horas y se jactaba de ello, Tesla también dormía poco pero por razones distintas: sufría de insomnio y dedicaba las noches a resolver problemas teóricos complejos.',
      'Esta rivalidad no fue solo personal sino también filosófica: representaba dos formas de entender la innovación tecnológica. Edison encarnaba el empirismo práctico anglosajón, donde el progreso surge de la experimentación sistemática y la comercialización inmediata. Tesla representaba la tradición continental europea, donde la teoría matemática precede a la práctica y la ciencia pura tiene valor independiente de su aplicación comercial. La tensión entre estos dos enfoques definió la electrificación del mundo moderno y sigue vigente hoy en los debates sobre investigación básica versus investigación aplicada.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla hablaba ocho idiomas con fluidez: serbocroata, checo, inglés, francés, alemán, húngaro, italiano y latín. Además, poseía una memoria eidética que le permitía memorizar libros enteros después de leerlos una sola vez. Edison, por su parte, tenía una pérdida auditiva significativa desde la infancia que él mismo atribuyó a un episodio en un tren cuando tenía 12 años, aunque los médicos señalaban una mastoiditis mal tratada como causa más probable.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La corriente continua (DC) mantiene un flujo constante de electrones en una sola dirección, como el agua que fluye por una tubería recta. La corriente alterna (AC) invierte la dirección del flujo de electrones periódicamente, a una frecuencia de 60 Hz en América (60 cambios de dirección por segundo) y 50 Hz en Europa. Esta alternancia permite usar transformadores electromagnéticos para elevar el voltaje a miles de voltios para la transmisión y reducirlo para el uso doméstico, algo físicamente imposible con corriente continua.' },
    ],
    fact: 'Edison estableció su laboratorio de Menlo Park en 1876 con una inversión inicial de $2,500 dólares (equivalentes a unos $70,000 actuales). En los primeros seis años produjo más de 400 patentes, incluyendo el fonógrafo en 1877 y la bombilla práctica en 1879. Tesla, por contraste, llegó a Estados Unidos en 1884 con solo 4 centavos en el bolsillo, una carta de recomendación y los diseños de su motor de corriente alterna completamente desarrollados en su mente, sin un solo dibujo en papel.',
  },
  {
    id: 'encuentro-nueva-york',
    title: 'El Encuentro en Nueva York',
    color: '#D4A535',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'En junio de 1884, Nikola Tesla llegó a Nueva York con una carta de recomendación escrita por Charles Batchelor, uno de los principales colaboradores de Edison en Europa. La carta, según la biografía de Tesla, decía: "Conozco a dos grandes hombres, y usted es uno de ellos; el otro es este joven". Tesla había trabajado previamente para la Continental Edison Company en París, donde reparaba y mejoraba los generadores de corriente continua que Edison vendía en Europa, demostrando una habilidad técnica que impresionó a sus superiores.',
      'Edison contrató a Tesla de inmediato y le asignó tareas de reparación y mejora de los dínamos de corriente continua que alimentaban su red eléctrica en Manhattan. Tesla propuso rediseñar los generadores para hacerlos más eficientes, y según su propio relato, Edison le ofreció una bonificación de $50,000 dólares si lograba completar las mejoras. Tesla trabajó durante varios meses, a menudo más de 18 horas diarias, rediseñando 24 tipos diferentes de dínamos para la Edison Machine Works, introduciendo mejoras significativas en el diseño de los reguladores automáticos y los conmutadores.',
      'Durante los meses que trabajó para Edison, Tesla observó de primera mano las limitaciones del sistema de corriente continua. Las centrales de Edison solo podían transmitir electricidad a distancias de aproximadamente 1.5 kilómetros desde la planta generadora, lo que significaba que cada barrio necesitaba su propia central eléctrica. Los cables de cobre necesarios para transmitir corriente continua a bajo voltaje eran gruesos y caros. Tesla sabía que la corriente alterna resolvía estos problemas, pero Edison se negaba a considerar la alternativa porque ya había invertido millones de dólares en infraestructura de corriente continua.',
      'La relación laboral entre Tesla y Edison duró aproximadamente seis meses. Aunque trabajaban en el mismo edificio, sus interacciones revelan diferencias fundamentales en temperamento y método. Edison consideraba a Tesla un soñador teórico y le decía que sus ideas sobre corriente alterna eran "una pérdida de tiempo". Tesla, por su parte, encontraba frustrante el método de prueba y error de Edison, al que describió más tarde como: "Si Edison necesitara encontrar una aguja en un pajar, procedería a examinar paja por paja hasta encontrarla. Yo observaría el pajar y razonaría dónde sería más probable que estuviera".',
      'El ambiente en la Edison Machine Works era intenso. Edison mantenía a sus empleados trabajando turnos de hasta 20 horas, y él mismo dormía en catres dentro del laboratorio. Tesla se adaptó a este ritmo pero nunca compartió la visión de Edison sobre la corriente continua. Durante estos meses, Tesla continuó desarrollando mentalmente sus diseños para el motor de inducción de corriente alterna, el sistema polifásico y el transformador rotativo que eventualmente cambiarían el curso de la historia eléctrica. La convivencia profesional plantó las semillas del conflicto que definiría la electrificación del planeta.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Tesla llegó a Nueva York en 1884, la ciudad tenía apenas dos años de electricidad comercial. La central de Pearl Street, inaugurada por Edison el 4 de septiembre de 1882, alimentaba solo 85 clientes y 400 bombillas en un radio de 1.5 kilómetros en el bajo Manhattan. La mayor parte de la ciudad todavía se iluminaba con gas. Para llegar a la oficina de Edison en la Quinta Avenida, Tesla caminó desde el muelle de inmigración porque le habían robado el equipaje durante el viaje en barco desde Francia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los generadores de corriente continua de Edison producían electricidad a 110 voltios. A este voltaje, la pérdida de energía por resistencia en los cables de cobre era tan alta que después de 1.5 kilómetros de distancia, la señal eléctrica era demasiado débil para encender una bombilla. La Ley de Ohm (V=IR) explica este fenómeno: a mayor distancia, mayor resistencia (R), y mayor caída de voltaje (V). La corriente alterna evita este problema porque los transformadores pueden elevar el voltaje a 100,000 voltios o más para la transmisión, reduciendo las pérdidas a menos del 3%.' },
    ],
    fact: 'La carta de recomendación de Charles Batchelor que Tesla llevó a Edison ha sido debatida por historiadores. El biógrafo W. Bernard Carlson (Princeton, 2013) señala que no existe evidencia documental directa de la famosa frase "conozco a dos grandes hombres". Sin embargo, los registros de la Edison Machine Works confirman que Tesla fue contratado el 8 de junio de 1884 con un salario de $18 dólares semanales (equivalente a unos $550 actuales), una cifra modesta incluso para la época, que refleja su estatus de inmigrante recién llegado.',
  },
  {
    id: 'la-ruptura',
    title: 'La Ruptura',
    color: '#7A8B96',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'La ruptura entre Tesla y Edison se produjo a principios de 1885, cuando Tesla reclamó la bonificación de $50,000 dólares que Edison supuestamente le había prometido por mejorar los generadores de corriente continua. Según el relato de Tesla, Edison respondió: "Tesla, usted no entiende el humor americano". Edison le ofreció en cambio un aumento de $10 semanales sobre su salario de $18. Tesla rechazó la oferta y renunció de inmediato. Este incidente, documentado en la autobiografía de Tesla "My Inventions" publicada en 1919, se ha convertido en uno de los momentos más citados de la historia de la tecnología.',
      'Los historiadores debaten la veracidad exacta del episodio de los $50,000. El biógrafo Paul Israel (Edison: A Life of Invention, 1998) señala que Edison rara vez hacía promesas financieras de ese calibre a empleados individuales y que la cifra representaba casi la mitad de las ganancias anuales de la Edison Machine Works. Sin embargo, el patrón de Edison de no cumplir acuerdos verbales con inventores y empleados está bien documentado en múltiples fuentes contemporáneas, lo que da credibilidad general al relato de Tesla sobre el incumplimiento.',
      'Después de dejar Edison, Tesla atravesó el período más difícil de su vida. Durante casi un año, entre 1885 y 1886, no encontró financiamiento para sus proyectos de corriente alterna y se vio obligado a aceptar trabajos manuales para sobrevivir. Cavó zanjas para la compañía de telégrafos Western Union a $2 dólares diarios, un trabajo que el ingeniero describía como humillante para alguien con su formación académica. Durante este período, Tesla comentó que el trabajo de zanjero le permitió "pensar con claridad" sobre sus diseños mientras ejercitaba el cuerpo.',
      'En 1886, dos empresarios llamados Robert Lane y Benjamin Vail se interesaron en las ideas de Tesla y financiaron la creación de la Tesla Electric Light & Manufacturing Company en Rahway, Nueva Jersey. Sin embargo, los inversores querían que Tesla desarrollara un sistema de iluminación por arco eléctrico, no su motor de corriente alterna. Tesla completó el trabajo pero fue excluido de la empresa por sus propios socios, quienes retuvieron las patentes de iluminación y lo dejaron sin compensación. Esta segunda traición financiera reforzó la desconfianza de Tesla hacia los hombres de negocios.',
      'El período de dificultades terminó en abril de 1887, cuando Tesla conoció al abogado de patentes Charles F. Peck y al empresario Alfred S. Brown, quienes comprendieron el potencial revolucionario de su sistema de corriente alterna polifásica. Juntos fundaron la Tesla Electric Company en un laboratorio en el 89 de Liberty Street, Manhattan. En apenas un año, Tesla registró más de 30 patentes relacionadas con su motor de inducción, el sistema polifásico y los transformadores de corriente alterna. El 16 de mayo de 1888, Tesla presentó su conferencia "A New System of Alternate Current Motors and Transformers" ante el American Institute of Electrical Engineers, una presentación que cambió la historia de la ingeniería eléctrica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El salario de $2 diarios que Tesla ganaba cavando zanjas en 1885 equivale a aproximadamente $60 dólares actuales ajustados por inflación. Para poner esto en perspectiva, un ingeniero eléctrico cualificado en Nueva York ganaba entre $15 y $25 semanales en esa época. Tesla pasó de diseñar generadores que alimentaban la red eléctrica de Manhattan a cavar las zanjas donde se enterraban los cables. El capataz de la cuadrilla no tenía idea de que uno de sus trabajadores era un ingeniero politécnico europeo con conocimientos que cambiarían el mundo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor de inducción de corriente alterna que Tesla diseñó durante este período utiliza un principio llamado "campo magnético rotativo". Cuando se aplican corrientes alternas desfasadas a bobinas dispuestas en un patrón circular dentro del motor, se crea un campo magnético que gira a velocidad constante. Este campo arrastra al rotor (la parte giratoria) mediante inducción electromagnética, sin necesidad de escobillas ni conmutadores mecánicos. Este diseño es tan eficiente que el 90% de los motores eléctricos del mundo actual siguen usando exactamente el mismo principio que Tesla patentó en 1888.' },
    ],
    fact: 'La conferencia de Tesla del 16 de mayo de 1888 ante el American Institute of Electrical Engineers incluyó demostraciones prácticas de su motor de inducción funcionando con corriente alterna bifásica. El ingeniero George Westinghouse envió representantes a la conferencia y, pocas semanas después, viajó personalmente a Nueva York para reunirse con Tesla. El resultado fue uno de los contratos más importantes de la historia de la tecnología: Westinghouse adquirió las patentes de Tesla por $60,000 dólares en efectivo más $2.50 por cada caballo de fuerza de capacidad eléctrica vendida usando su sistema.',
  },
  {
    id: 'westinghouse-entra',
    title: 'Westinghouse Entra en Escena',
    color: '#C49225',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'George Westinghouse era un inventor e industrial de Pittsburgh, Pensilvania, que ya había hecho fortuna con el freno neumático para trenes, patentado en 1869 cuando tenía solo 22 años. Westinghouse comprendía tanto la ingeniería como los negocios, y en 1886 había fundado la Westinghouse Electric Company para competir directamente con Edison en el mercado de la electricidad. A diferencia de Edison, Westinghouse reconoció desde el principio las ventajas técnicas de la corriente alterna y había adquirido previamente las patentes del transformador de corriente alterna de los inventores húngaros Ganz & Co. y del sistema de distribución AC de Lucien Gaulard y John Dixon Gibbs.',
      'En julio de 1888, Westinghouse visitó el laboratorio de Tesla en Liberty Street, Manhattan, y negoció la adquisición de sus patentes de corriente alterna. El acuerdo final incluía $60,000 dólares en efectivo (equivalentes a unos $1.8 millones actuales), acciones de Westinghouse Electric, y regalías de $2.50 por cada caballo de fuerza de capacidad eléctrica vendida bajo las patentes de Tesla. Tesla también aceptó trabajar como consultor para Westinghouse en Pittsburgh durante un año, con un salario mensual de $2,000 dólares, para ayudar a adaptar sus diseños teóricos a la producción industrial.',
      'La alianza Tesla-Westinghouse transformó la Guerra de las Corrientes de una competencia comercial en una batalla tecnológica a gran escala. Edison controlaba la infraestructura eléctrica de las principales ciudades de la costa este con su sistema de corriente continua, pero Westinghouse podía ofrecer electricidad a distancias mucho mayores con costos de infraestructura significativamente menores. Mientras Edison necesitaba una central eléctrica cada 1.5 kilómetros, una sola central de corriente alterna podía abastecer una ciudad entera mediante líneas de transmisión de alto voltaje.',
      'Sin embargo, la relación laboral directa entre Tesla y Westinghouse fue breve y no siempre armoniosa. Tesla pasó un año en Pittsburgh (1888-1889) intentando adaptar sus motores a la frecuencia de 133 Hz que Westinghouse ya usaba en su sistema monofásico existente. Tesla insistía en que 60 Hz era la frecuencia óptima para sus motores polifásicos, pero Westinghouse tenía equipos instalados que funcionaban a 133 Hz. Finalmente, Tesla regresó a Nueva York frustrado por los compromisos técnicos, pero la colaboración dio fruto: el equipo de ingenieros de Westinghouse, liderado por Charles F. Scott, logró integrar los diseños de Tesla en un sistema comercial viable.',
      'La crisis financiera de 1890 puso a la Westinghouse Electric Company al borde de la quiebra. Los banqueros exigieron a Westinghouse que renegociara el contrato de regalías con Tesla, que a ese ritmo habría costado a la empresa más de $12 millones de dólares (equivalentes a unos $380 millones actuales). Westinghouse visitó a Tesla personalmente y le explicó la situación. Según múltiples fuentes históricas, Tesla rompió el contrato de regalías frente a Westinghouse, renunciando a lo que habría sido una fortuna personal, porque creía que el éxito de la corriente alterna era más relevante que su propia riqueza. Este acto de generosidad o ingenuidad financiera es uno de los episodios más debatidos de la historia de la tecnología.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si Tesla hubiera mantenido el contrato de regalías de $2.50 por caballo de fuerza, los cálculos del historiador Marc Seifer estiman que habría acumulado más de $300 millones de dólares durante su vida (equivalentes a unos $12,000 millones actuales). Esto lo habría convertido en una de las personas más ricas de la historia. En cambio, Tesla murió en 1943 en una habitación del Hotel New Yorker de Manhattan, prácticamente sin dinero, mientras Westinghouse Electric se había convertido en una de las corporaciones más grandes del mundo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La frecuencia de 60 Hz que Tesla recomendaba para la corriente alterna fue finalmente adoptada como estándar en Norteamérica y parte de Latinoamérica. Europa adoptó 50 Hz como su estándar. La diferencia se debe a que los sistemas europeos se desarrollaron independientemente usando generadores con diferentes números de polos magnéticos. A 60 Hz, un motor de dos polos gira a 3,600 revoluciones por minuto; a 50 Hz gira a 3,000 RPM. Ambas frecuencias funcionan bien para la mayoría de aplicaciones, pero los equipos diseñados para una frecuencia no funcionan correctamente con la otra.' },
    ],
    fact: 'El freno neumático de Westinghouse, patentado en 1869, fue una innovación que salvó miles de vidas en la industria ferroviaria al permitir que el maquinista frenara todos los vagones simultáneamente mediante aire comprimido, en lugar de depender de frenadores manuales en cada vagón. Westinghouse tenía 161 patentes propias cuando conoció a Tesla, lo que lo convertía en uno de los pocos industriales que podía comprender genuinamente la genialidad técnica de las invenciones de Tesla. Esta comprensión mutua entre inventor y empresario fue fundamental para el triunfo de la corriente alterna.',
  },
  {
    id: 'batalla-opinion-publica',
    title: 'La Batalla de la Opinión Pública',
    color: '#8A9AA6',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'Cuando Edison comprendió que la corriente alterna de Tesla-Westinghouse representaba una amenaza seria para su imperio de corriente continua, lanzó una campaña de desprestigio que los historiadores han denominado la "Guerra de las Corrientes". A partir de 1887, Edison y su asociado Harold P. Brown organizaron demostraciones públicas en las que electrocutaban perros y gatos callejeros con corriente alterna para demostrar que era letal. Estas demostraciones se realizaron en el laboratorio de Edison en West Orange, Nueva Jersey, ante periodistas y funcionarios públicos, con el objetivo de asociar la corriente alterna con la muerte.',
      'El episodio más controvertido de la campaña de Edison involucró la ejecución de William Kemmler, un vendedor de verduras condenado a muerte por asesinar a su pareja con un hacha en Buffalo, Nueva York, en 1889. Edison y Brown colaboraron con el estado de Nueva York para diseñar la primera silla eléctrica, que funcionaba con corriente alterna de Westinghouse. La ejecución se llevó a cabo el 6 de agosto de 1890 en la prisión de Auburn y fue un fracaso técnico: la primera descarga de 1,000 voltios durante 17 segundos no mató a Kemmler, quien continuó respirando. Se requirió una segunda descarga de 2,000 voltios que duró varios minutos, produciendo quemaduras en el cuerpo.',
      'La prensa cubrió la ejecución de Kemmler con horror. El reportero del New York World la describió como "un espectáculo mucho peor que el ahorcamiento". Westinghouse comentó: "Habrían hecho mejor trabajo con un hacha". Sin embargo, la estrategia de Edison tuvo un efecto paradójico: aunque generó temor público hacia la corriente alterna, también demostró que la electricidad AC era efectivamente más potente que la DC, lo cual era precisamente una de sus ventajas técnicas. Los ingenieros y científicos reconocían que el peligro radicaba en el voltaje y la corriente aplicados, no en el tipo de corriente.',
      'Es necesario corregir un mito popular: el episodio de Topsy, la elefanta electrocutada en Coney Island el 4 de enero de 1903, no fue parte de la Guerra de las Corrientes. Los historiadores Michael Daly (Topsy: The Startling Story of the Crooked Tailed Elephant, 2013) y Rutgers University han demostrado que para 1903 la Guerra de las Corrientes ya había terminado, Edison no estuvo directamente involucrado en la electrocución de Topsy, y el motivo fue que el animal había matado a tres cuidadores. La Edison Manufacturing Company filmó el evento, pero como registro documental, no como propaganda anti-AC.',
      'La campaña de desprestigio de Edison también incluyó el intento de acuñar el verbo "to westinghouse" como sinónimo de electrocutar, y la distribución de panfletos titulados "A Warning from the Edison Electric Light Company" en los que se detallaban supuestos peligros de la corriente alterna en el hogar. Edison llegó a contratar a niños para que recolectaran perros y gatos callejeros por 25 centavos cada uno para sus demostraciones de electrocución. Estas tácticas, aunque efectivas a corto plazo para generar miedo, no pudieron detener la superioridad técnica de la corriente alterna, que se hizo evidente en la práctica cuando Westinghouse comenzó a ganar contratos de iluminación municipal en ciudades de todo el país.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Harold P. Brown, el ingeniero que realizó las demostraciones públicas de electrocución de animales con corriente alterna, se presentaba como un "investigador independiente" preocupado por la seguridad pública. Sin embargo, documentos descubiertos en 1889 por el New York Sun revelaron que Brown había sido financiado secretamente por Edison y la Edison General Electric Company. Los documentos mostraban pagos directos de Edison a Brown y correspondencia donde coordinaban las demostraciones y la campaña contra Westinghouse.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La peligrosidad de la electricidad depende del amperaje (la cantidad de corriente que fluye por el cuerpo), no del tipo de corriente (AC vs DC). Una corriente de tan solo 0.1 amperios puede causar fibrilación cardíaca letal en un ser humano, ya sea AC o DC. La corriente alterna es ligeramente más peligrosa al tacto porque a 60 Hz produce contracciones musculares tetánicas que impiden que la víctima suelte el conductor. Sin embargo, a voltajes iguales, la corriente continua produce quemaduras térmicas más graves por su flujo constante. Ambos tipos de corriente son letales bajo condiciones similares.' },
    ],
    fact: 'La primera silla eléctrica fue diseñada por Arthur Kennelly, un ingeniero de Edison, y Harold P. Brown. El estado de Nueva York aprobó la electrocución como método de ejecución en 1888 con la Electrical Execution Act, reemplazando al ahorcamiento. Westinghouse contrató al mejor abogado de Nueva York para intentar bloquear el uso de sus generadores en la silla eléctrica, argumentando que constituía "castigo cruel e inusual". El caso llegó a la Corte Suprema de Estados Unidos (In re Kemmler, 1890), que dictaminó que la electrocución era constitucional.',
  },
  {
    id: 'chicago-1893-ac-gana',
    title: 'Chicago 1893: AC Gana',
    color: '#B88420',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'La Exposición Universal de Chicago de 1893, oficialmente llamada World\'s Columbian Exposition, fue el escenario donde la corriente alterna de Tesla y Westinghouse demostró su superioridad de forma definitiva ante el mundo. La feria, que celebraba el cuarto centenario del viaje de Colón a América, ocupaba 2.4 kilómetros cuadrados junto al lago Míchigan y atrajo a 27.3 millones de visitantes durante sus seis meses de operación, del 1 de mayo al 30 de octubre de 1893. La iluminación de la feria se convirtió en la demostración tecnológica más visible de la década.',
      'Edison General Electric (que en 1892 se había fusionado para formar General Electric) presentó una oferta de $1.8 millones de dólares para iluminar la feria con corriente continua. Westinghouse presentó una contraoferta de $399,000 dólares usando corriente alterna, menos de la cuarta parte del precio de Edison. Los organizadores seleccionaron a Westinghouse. Para cumplir el contrato, Westinghouse fabricó en sus talleres de Pittsburgh 12 generadores de corriente alterna de 1,000 caballos de fuerza cada uno, alimentados por máquinas de vapor, y 92,620 lámparas incandescentes. Sin poder usar las bombillas patentadas por Edison, Westinghouse desarrolló un diseño alternativo de bombilla con filamento sellado al vacío en dos piezas.',
      'La noche de la inauguración, el presidente Grover Cleveland presionó un botón dorado que encendió simultáneamente más de 100,000 bombillas incandescentes, iluminando la "Ciudad Blanca" con una luz que los visitantes describieron como sobrenatural. Para poner esto en perspectiva, toda la ciudad de Chicago en ese momento tenía aproximadamente 35,000 luces eléctricas. La feria por sí sola triplicaba la capacidad de iluminación de la ciudad. Los visitantes, muchos de los cuales nunca habían visto electricidad, quedaron profundamente impresionados por la demostración que transformó la noche en día.',
      'Tesla participó personalmente en la feria con un stand propio en el Edificio de Electricidad, donde realizó demostraciones de sus inventos. Mostró su motor de inducción polifásico, el "Huevo de Colón" (un huevo de cobre que giraba y se ponía de pie sobre su eje gracias a un campo magnético rotativo), lámparas fluorescentes sin cables que se encendían por inducción, y tubos de descarga de gas que anticipaban la iluminación de neón. También realizó demostraciones donde pasaba corrientes de alta frecuencia a través de su propio cuerpo, encendiendo bombillas que sostenía en sus manos sin sufrir daño, una demostración que contradecía la propaganda de Edison sobre la peligrosidad de la corriente alterna.',
      'El éxito de Chicago tuvo consecuencias directas. En noviembre de 1893, apenas semanas después del cierre de la feria, la International Niagara Commission otorgó a Westinghouse el contrato para construir la central hidroeléctrica de las Cataratas del Niágara, el proyecto de generación eléctrica más ambicioso del mundo. La comisión, presidida por Lord Kelvin (quien inicialmente favorecía la corriente continua), cambió de opinión tras presenciar la demostración de Chicago. La Era de la Corriente Continua de Edison había terminado, reemplazada por el sistema de corriente alterna que Tesla había concebido mientras caminaba por un parque de Budapest en febrero de 1882.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El "Huevo de Colón" de Tesla fue uno de los inventos más populares de la feria de Chicago. Consistía en una mesa con bobinas electromagnéticas escondidas debajo que generaban un campo magnético rotativo. Cuando se colocaba un huevo de cobre sobre la mesa, el campo inducía corrientes en el metal que hacían girar al huevo cada vez más rápido hasta que se ponía de pie sobre su extremo, desafiando la gravedad. Tesla lo llamó así en referencia a la leyenda de Colón y el huevo, demostrando que su solución al problema del motor eléctrico era tan elegante como la de Colón.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las 92,620 lámparas de la feria de Chicago consumían aproximadamente 12,000 caballos de fuerza de electricidad (unos 9 megavatios). Los 12 generadores de Westinghouse producían corriente alterna bifásica a 60 Hz, que se elevaba a 2,300 voltios para la distribución dentro de la feria. En comparación, una central de corriente continua de Edison habría necesitado cables de cobre 20 veces más gruesos para transmitir la misma cantidad de energía a la misma distancia, haciendo el proyecto económicamente inviable con tecnología DC.' },
    ],
    fact: 'La Exposición de Chicago de 1893 también fue donde se introdujeron al público la rueda de la fortuna (diseñada por George Ferris como respuesta a la Torre Eiffel de la Exposición de París de 1889), la cremallera, el jugo de naranja Tropicana, los Cracker Jacks, y la primera serie de postales ilustradas de Estados Unidos. Sin embargo, ninguna de estas innovaciones tuvo tanto impacto a largo plazo como la demostración de que la corriente alterna podía iluminar una ciudad entera de forma segura, eficiente y económica.',
  },
  {
    id: 'veredicto-historia',
    title: 'El Veredicto de la Historia',
    color: '#5A6B7A',
    btnImage: '/assets/tesla/tesla_m6.png',
    image: '/assets/tesla/tesla_m6.png',
    content: [
      'La Guerra de las Corrientes concluyó formalmente en 1896 cuando la Central Hidroeléctrica de las Cataratas del Niágara, diseñada con la tecnología de corriente alterna de Tesla y construida por Westinghouse, comenzó a transmitir electricidad a Buffalo, Nueva York, a 32 kilómetros de distancia. Este logro demostró de manera concluyente que la corriente alterna podía generar, transmitir y distribuir energía eléctrica a escala industrial. En 1896, la propia General Electric (sucesora de Edison General Electric) comenzó a fabricar equipos de corriente alterna, reconociendo tácitamente la derrota tecnológica de la corriente continua para la distribución eléctrica.',
      'Sin embargo, reducir la historia a "Tesla ganó y Edison perdió" es una simplificación excesiva. Edison contribuyó de forma determinante a la electrificación del mundo. Su central de Pearl Street de 1882 estableció el concepto de distribución eléctrica centralizada. Su sistema de medición eléctrica permitió facturar el consumo de cada cliente. Sus mejoras a la bombilla incandescente hicieron la iluminación eléctrica práctica. Y su modelo de "laboratorio de inventos" en Menlo Park fue el precursor de los modernos centros de investigación y desarrollo corporativo. General Electric, la empresa que creció de su trabajo, sigue siendo una de las mayores corporaciones industriales del mundo.',
      'Las contribuciones de Tesla se extendieron mucho más allá de la corriente alterna. Su motor de inducción es la base del 90% de los motores eléctricos que funcionan hoy en el mundo. Sus patentes de radio (restauradas por la Corte Suprema de Estados Unidos en 1943, meses después de su muerte) establecieron los principios de la transmisión inalámbrica. Sus experimentos con corrientes de alta frecuencia anticiparon la diatermia médica, y su bobina de Tesla sigue siendo esencial en la investigación de física de plasmas y en las fuentes de alimentación de los televisores de tubo catódico.',
      'La unidad de medida del campo magnético lleva el nombre de Tesla desde 1960 por decisión de la Conferencia General de Pesos y Medidas. Un tesla (1 T) equivale a 10,000 gauss en el sistema CGS. Para referencia, el campo magnético de la Tierra mide aproximadamente 0.00005 teslas (50 microteslas), un imán de refrigerador típico genera 0.005 teslas, y una máquina de resonancia magnética hospitalaria produce entre 1.5 y 3 teslas. Edison no tiene una unidad de medida con su nombre, pero su legado empresarial es igualmente duradero: el modelo de innovación corporativa que estableció sigue siendo el estándar de la industria tecnológica moderna.',
      'La rivalidad Tesla-Edison refleja una tensión permanente en la historia de la tecnología: la investigación teórica versus la aplicación práctica, el genio individual versus el equipo corporativo, la ciencia pura versus el mercado. Ambos enfoques son necesarios y complementarios. Tesla demostró que las ideas teóricas pueden transformar civilizaciones, pero sin empresarios como Westinghouse y sin la infraestructura comercial que Edison ayudó a crear, la corriente alterna habría permanecido como una curiosidad de laboratorio. Hoy, la empresa Tesla Inc., fundada por Elon Musk en 2003 y nombrada en honor al inventor serbio, usa corriente continua en sus baterías de automóviles eléctricos, una ironía que demuestra que ambos tipos de corriente tienen aplicaciones relevantes en el siglo XXI.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1915, Reuters informó que Tesla y Edison compartirían el Premio Nobel de Física. Sin embargo, ninguno de los dos recibió el premio, que fue otorgado ese año a William Henry Bragg y William Lawrence Bragg por sus trabajos en cristalografía de rayos X. Existen múltiples teorías sobre lo que ocurrió: algunos historiadores sugieren que Tesla rechazó compartir el premio con Edison; otros señalan que el comité Nobel simplemente cambió de opinión. Los archivos del comité Nobel permanecen sellados durante 50 años, y los de 1915 no contienen evidencia de una nominación formal conjunta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Hoy la corriente continua (DC) ha resurgido en aplicaciones específicas. Los paneles solares generan DC. Las baterías almacenan y descargan DC. Los cables submarinos de alta tensión en corriente continua (HVDC) transmiten electricidad entre países con pérdidas menores que los cables AC en distancias superiores a 600 kilómetros. Los centros de datos de Google, Amazon y Microsoft usan distribución interna en DC a 48 voltios para mayor eficiencia energética. La red eléctrica moderna es un sistema híbrido AC/DC que vindica tanto a Tesla como a Edison simultáneamente.' },
    ],
    fact: 'Nikola Tesla murió el 7 de enero de 1943 en la habitación 3327 del Hotel New Yorker en Manhattan, a los 86 años. Sus últimos años los pasó alimentando palomas en los parques de Nueva York. Edison había muerto el 18 de octubre de 1931, a los 84 años, en su mansión de West Orange, Nueva Jersey. En su funeral, el presidente Herbert Hoover pidió a los estadounidenses que apagaran las luces durante un minuto en honor al hombre que había hecho tanto por la iluminación eléctrica. Hoy, ambos inventores son recordados en el Salón de la Fama de los Inventores Nacionales de Estados Unidos, donde sus contribuciones complementarias son reconocidas como pilares de la civilización eléctrica moderna.',
  },
];

// ─── Electric Spark Field (Canvas Background) ───────────────────────────────
function ElectricField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ─── War of Currents Header ──────────────────────────────────────────────────
function RivalryHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Rivalry arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#rivalryGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central bolt icon */}
        <path d="M304 18 L296 32 L302 32 L294 46 L312 28 L304 28 Z" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" strokeLinejoin="round" />
        <defs>
          <linearGradient id="rivalryGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(107,123,138,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(107,123,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TESLA vs EDISON</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA GUERRA DE LAS CORRIENTES</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ─────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotTeslaM6"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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

        {/* ─── Video Section ─── */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #6B7B8A, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_TeslaM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/tesla/infographic_tesla_edison/bg_tesla_edison.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ElectricField />

      <RivalryHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado la Guerra de las Corrientes!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Historiador Eléctrico
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
