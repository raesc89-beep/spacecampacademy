'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, ChevronDown, Rocket, Microscope, Dna, Activity, HeartPulse, PawPrint } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Biological / Space themed) ─────────────────────────
function DecoHelix({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 15 Q30 35 45 15" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8"/>
      <path d="M15 45 Q30 25 45 45" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8"/>
      <line x1="20" y1="23" x2="20" y2="37" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <line x1="30" y1="30" x2="30" y2="30" stroke={color} strokeWidth="3.5" opacity="0.9" strokeLinecap="round"/>
      <line x1="40" y1="23" x2="40" y2="37" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="15" cy="15" r="2.5" fill={color} />
      <circle cx="45" cy="15" r="2.5" fill={color} />
      <circle cx="15" cy="45" r="2.5" fill={color} />
      <circle cx="45" cy="45" r="2.5" fill={color} />
    </svg>
  );
}

function DecoPaw({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 45 C45 45 45 25 30 25 C15 25 15 45 30 45 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="18" cy="18" r="4.5" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="11" r="4.5" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="42" cy="18" r="4.5" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="35" r="3.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoPulse({ size = 70, color = '#FF8A80', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 30 L20 30 L25 15 L35 45 L40 30 L55 30" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
      <circle cx="5" cy="30" r="2" fill={color} opacity="0.7"/>
      <circle cx="55" cy="30" r="2" fill={color} opacity="0.7"/>
      <circle cx="25" cy="15" r="2" fill={color} opacity="0.9"/>
      <circle cx="35" cy="45" r="2" fill={color} opacity="0.9"/>
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.7" />
      <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(120 30 30)" />
      <circle cx="54" cy="30" r="2.5" fill={color} opacity="0.8" />
      <circle cx="18" cy="18" r="2.5" fill={color} opacity="0.8" />
    </svg>
  );
}

const DECO_MAP = {
  'ensayos-biologicos': [DecoHelix, DecoOrbit, DecoPulse],
  'vuelo-primates': [DecoPulse, DecoOrbit, DecoHelix],
  'caninos-sovieticos': [DecoPaw, DecoPulse, DecoOrbit],
  'ecosistemas-cerrados': [DecoHelix, DecoOrbit, DecoPaw],
};

const BIBLIOGRAPHY = [
  'Beischer, D. E., & Fregly, A. R. (1962). \'Animals and man in space. A chronology and annotated bibliography through the year 1960\'. Office of Naval Research.',
  'Soustov, L. V., et al. (1997). \'Physiological and biochemical aspects of the space flight of the dog Laika on the second artificial Earth satellite\'. Journal of Gravitational Physiology.',
  'Krikorian, A. D., & Levine, H. G. (1991). \'Development and growth in space\'. In Plant Physiology (pp. 491-555). Academic Press.',
  'Jönsson, K. I., et al. (2008). \'Tardigrades survive exposure to space in low Earth orbit\'. Current Biology, 18(17), R729-R731.',
  'Nickerson, C. A., et al. (2000). \'Microgravity as a novel environmental signal affecting Salmonella enterica serovar Typhimurium virulence\'. Infection and Immunity, 68(6), 3147-3152.',
  'Gause, G. F., & Carmichael, E. B. (1968). \'The biological exploration of space\'. Annual Review of Physiology, 30(1), 399-424.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'ensayos-biologicos',
    title: 'Primeros Ensayos Biológicos en el Espacio',
    color: '#D87D4A',
    btnImage: '/assets/animales/infographic_m1/btn_ensayos-biologicos.jpg',
    image: '/assets/course/animales_pioneros/hero_ensayos_biologicos.jpg',
    content: [
      'La exploración espacial en sus etapas preliminares requirió la evaluación rigurosa de los efectos de la microgravedad y la radiación cósmica en organismos vivos antes de arriesgar vidas humanas. En las décadas de 1940 y 1950, los científicos lanzaron esporas de hongos y moscas de la fruta a bordo de cohetes V-2 capturados para comprender cómo la radiación a gran altitud afectaba la estructura celular y la genética básica. Estos ensayos iniciales sentaron las bases para protocolos de soporte vital más complejos, demostrando que la vida terrestre podía sobrevivir a la intensa aceleración del lanzamiento y a los peligrosos niveles de exposición a los rayos cósmicos fuera de la protección atmosférica.',
      'A medida que la carrera espacial se intensificaba, los parámetros de las misiones exigían modelos animales más complejos que pudieran proporcionar datos fisiológicos en tiempo real a los investigadores en tierra. Se desarrollaron cápsulas biológicas equipadas con biosensores rudimentarios pero efectivos, capaces de monitorizar el ritmo cardíaco, la frecuencia respiratoria y la presión arterial de los especímenes durante el ascenso, la ingravidez y el brutal descenso balístico. La telemetría obtenida de estos pioneros no humanos permitió a los ingenieros espaciales rediseñar los sistemas de control térmico y amortiguación, elementos absolutamente críticos para el diseño de las futuras cápsulas tripuladas de los programas Mercury y Vostok.',
      'Uno de los descubrimientos más trascendentales de estos vuelos balísticos tempranos fue la inesperada capacidad de adaptación del sistema vestibular animal a los entornos de gravedad cero, aunque fuera por breves minutos. Los investigadores observaron respuestas de desorientación espacial transitoria que se corregían rápidamente mediante mecanismos neuroplásticos, proporcionando los primeros indicios de que el cerebro de los mamíferos podía recalibrar sus referencias espaciales sin la constante atracción de la gravedad terrestre. Estos hallazgos neuromédicos impulsaron la creación de programas de entrenamiento en centrifugadoras y vuelos parabólicos, métodos que siguen siendo el estándar de oro en la preparación de los astronautas contemporáneos.',
      'La selección de especies biológicas para estos vuelos no fue un proceso aleatorio, sino el resultado de un análisis exhaustivo de la anatomía comparada y las limitaciones de masa de los primeros vehículos de lanzamiento orbitales y suborbitales. Se prefirieron especies con altas tasas de reproducción y metabolismos bien documentados, como los ratones y las ratas, ya que su tamaño reducido permitía incluir múltiples individuos en una sola cápsula de carga útil. Además, la genómica comparada, aunque en su infancia durante esta era pionera, sugirió correctamente que la fisiología de los roedores reaccionaría a las tensiones acústicas y vibratorias del despegue de manera análoga a la humana, validando su uso como modelos experimentales primarios en ambientes extremos.',
      'Finalmente, la recuperación exitosa de estos animales pioneros tras sus vuelos a la estratosfera y más allá, exigió avances revolucionarios en la tecnología de paracaídas y ablación térmica de las cápsulas de reentrada. El desarrollo de escudos térmicos capaces de disipar el inmenso calor generado por la fricción atmosférica y sistemas de despliegue de paracaídas barométricos automatizados fueron probados directa y exitosamente gracias a estas misiones biológicas. Por lo tanto, el legado de estos primeros especímenes trasciende la mera recopilación de datos médicos; fueron instrumentales en la certificación de las tecnologías mecánicas y estructurales que, a la postre, garantizarían el regreso seguro y rutinario de las tripulaciones humanas desde el vacío del espacio.'
    ],
    expandables: [
      { label: 'Enfoque Biológico', icon: 'Microscope', text: 'Los primeros experimentos no buscaban enviar animales por espectáculo, sino comprender las mutaciones inducidas por la radiación cósmica en el ADN celular primitivo a gran altitud.' },
      { label: 'Dato Histórico', icon: 'Activity', text: 'Las esporas y semillas enviadas en 1946 marcaron la primera vez que material genético terrestre cruzó la Línea de Kármán, sobreviviendo con éxito a los rigores del espacio.' }
    ],
    fact: 'Aunque olvidados a menudo, los insectos y esporas fueron verdaderamente los primeros organismos terrestres en experimentar las extremas condiciones del vacío espacial.'
  },
  {
    id: 'vuelo-primates',
    title: 'El Vuelo de los Primates y la Tolerancia G',
    color: '#D4B872',
    btnImage: '/assets/animales/infographic_m1/btn_vuelo-primates.jpg',
    image: '/assets/course/animales_pioneros/hero_primates_espacio.jpg',
    content: [
      'La introducción de primates no humanos en los programas de investigación espacial marcó un hito crucial en la validación biomédica de las misiones tripuladas, dado su elevado grado de similitud fisiológica y anatómica con el Homo sapiens. Específicamente, los macacos rhesus y los chimpancés fueron seleccionados por su inteligencia, su capacidad para realizar tareas psicomotoras complejas bajo condiciones de estrés extremo y su arquitectura cardiovascular comparable. Entrenados mediante protocolos de condicionamiento operante, estos primates aprendieron a manipular palancas y paneles de control durante simulaciones de vuelo, lo que permitió a los científicos terrestres evaluar el impacto directo de la aceleración gravitacional y la microgravedad prolongada en el rendimiento cognitivo y la toma de decisiones.',
      'Durante la fase crítica del despegue, los primates experimentaron fuerzas G extremas que pusieron a prueba los límites de la tolerancia cardiovascular mamífera, requiriendo el desarrollo de sofisticados asientos moldeados a medida y trajes de compresión. Estos sistemas de soporte vital estaban diseñados para prevenir el estancamiento de la sangre en las extremidades inferiores y asegurar un flujo constante de oxígeno al cerebro, mitigando el riesgo de síncope y daño neurológico isquémico. Los datos telemétricos recopilados de electrocardiogramas y sensores de presión arterial demostraron que, si bien la frecuencia cardíaca experimentaba picos dramáticos durante la ignición de los motores, el sistema circulatorio del primate podía adaptarse y estabilizarse notablemente rápido una vez alcanzada la ingravidez orbital.',
      'En el entorno de microgravedad, la biomecánica de los primates reveló fascinantes adaptaciones cinemáticas y alteraciones en el control motor, proporcionando una visión sin precedentes sobre la propiocepción sin referencias gravitacionales. Sin el vector constante de la gravedad terrestre para orientar el sistema vestibular, los animales dependieron en gran medida de las señales visuales y táctiles para mantener la orientación espacial dentro de la confinada cápsula espacial. Estas observaciones directas del comportamiento animal en órbita informaron profundamente el diseño de la ergonomía de las naves espaciales posteriores, dictando la colocación estratégica de asideros, interfaces visuales de alto contraste y sistemas de sujeción para facilitar la movilidad humana en entornos ingrávidos.',
      'Más allá de las implicaciones neuromotoras, las misiones de los chimpancés pioneros como Ham y Enos fueron instrumentales para comprender los efectos biológicos agudos de la radiación ionizante en los vuelos exoatmosféricos. Equipados con dosímetros biológicos implantados y monitores de radiación externos, los perfiles de vuelo de estos primates ayudaron a cuantificar las dosis de radiación absorbida al atravesar las anomalías geomagnéticas y las capas externas de la atmósfera terrestre. La resiliencia celular observada en estos especímenes tras el vuelo alivió significativamente las preocupaciones médicas sobre el síndrome de irradiación aguda, validando los cálculos iniciales sobre el blindaje necesario para las misiones tripuladas de corta duración en la órbita baja de la Tierra.',
      'El legado de las misiones de primates se consolidó en la confirmación inequívoca de que los organismos superiores podían no solo sobrevivir a las hostiles condiciones del espacio exterior, sino también ejecutar secuencias de comandos vitales para el control del vehículo. La precisión milimétrica con la que los chimpancés completaron sus tareas de coordinación mano-ojo durante los momentos más críticos del vuelo suborbital y orbital disipó los temores infundados de que el entorno espacial induciría un colapso cognitivo inevitable. Esta validación empírica fue el catalizador definitivo que otorgó a las agencias espaciales la confianza médica e ingenieril necesaria para autorizar y ejecutar, pocos meses después, los históricos vuelos espaciales de los primeros cosmonautas y astronautas humanos.'
    ],
    expandables: [
      { label: 'Entrenamiento Severo', icon: 'Rocket', text: 'Los macacos soportaban pruebas centrífugas que multiplicaban su peso por diez, imitando la aplastante aceleración balística de los cohetes primitivos de la Guerra Fría.' },
      { label: 'Resultados Vitales', icon: 'HeartPulse', text: 'La telemetría biomédica demostró que el ritmo cardíaco se duplicaba durante el despegue, pero se estabilizaba asombrosamente rápido una vez que se alcanzaba la microgravedad.' }
    ],
    fact: 'Ham, el chimpancé espacial, ejecutó sus tareas de activación de palancas con un margen de error menor a un segundo incluso bajo condiciones de ingravidez y estrés sónico extremo.'
  },
  {
    id: 'caninos-sovieticos',
    title: 'Los Caninos Soviéticos y el Aislamiento Orbital',
    color: '#80DEEA',
    btnImage: '/assets/animales/infographic_m1/btn_caninos-sovieticos.jpg',
    image: '/assets/course/animales_pioneros/hero_caninos_sovieticos.jpg',
    content: [
      'El programa espacial soviético adoptó un enfoque radicalmente distinto en sus ensayos biológicos al seleccionar perros callejeros de Moscú como los principales candidatos para sus misiones pioneras en órbita terrestre baja. La justificación de esta decisión se basó en la premisa de que los canes que sobrevivían a los duros inviernos urbanos y a las extremas condiciones de estrés ambiental poseían una resiliencia fisiológica superior e inherente. Estos especímenes caninos fueron sometidos a rigurosos regímenes de entrenamiento que incluían confinamiento prolongado en espacios diminutos, exposición a vibraciones acústicas ensordecedoras y simulaciones en centrífugas de alta aceleración para asegurar que pudieran soportar las brutales dinámicas de lanzamiento y las hostilidades del entorno orbital sin sucumbir al pánico paralizante.',
      'La histórica misión del satélite Sputnik 2, que llevó a la perra Laika al espacio en 1957, representó el hito de ser el primer vuelo orbital de un organismo multicelular complejo, inaugurando una nueva era de la biología espacial exoesférica. Aunque la tecnología de la época carecía de capacidades de reentrada atmosférica diseñadas para una recuperación segura, la telemetría continua enviada por los sensores implantados en Laika demostró concluyentemente que un mamífero avanzado podía sobrevivir a la brutal inserción orbital. Los electrocardiogramas y neumogramas transmitidos a la Tierra confirmaron que, a pesar del estrés fisiológico inmenso del lanzamiento, los signos vitales del can lograron una meseta de estabilización relativa una vez que experimentó los efectos estabilizadores de la ingravidez orbital y el silencio del vacío espacial.',
      'Tras los sacrificios pioneros iniciales, las misiones caninas posteriores, como las protagonizadas por los célebres Belka y Strelka, se centraron obsesivamente en el perfeccionamiento de los sistemas biológicos de retorno seguro, un imperativo absoluto para los futuros vuelos tripulados. Estas naves espaciales experimentales estaban equipadas con ingeniosos sistemas automatizados de soporte de vida que regulaban milimétricamente la presión de la cabina, purificaban la acumulación tóxica de dióxido de carbono y administraban raciones nutricionales gelatinosas. El regreso triunfal de estas perras a la estepa euroasiática tras completar múltiples órbitas alrededor del globo terráqueo validó definitivamente la integridad estructural de los módulos de descenso y la eficacia técnica de los paracaídas de recuperación de alta velocidad térmica.',
      'Los exhaustivos análisis post-vuelo realizados en los especímenes caninos retornados arrojaron datos clínicos inestimables sobre el impacto biológico a largo plazo de los vuelos orbitales extendidos, particularmente en relación con la hematología y la inmunología espacial. Los investigadores veterinarios y astrobiólogos documentaron meticulosamente alteraciones transitorias en la composición leucocitaria, fluctuaciones en los niveles de calcio óseo y una atrofia muscular predecible pero reversible inducida por el prolongado entorno de microgravedad. Estos biomarcadores tempranos sentaron las bases fundacionales de la medicina espacial moderna, permitiendo el desarrollo inicial de protocolos profilácticos y contramedidas fisiológicas, como regímenes de ejercicio específicos, que serían indispensables para mantener la salud humana en estaciones espaciales prolongadas.',
      'En última instancia, la contribución de los caninos soviéticos trasciende el mero desarrollo de hardware aeroespacial; fundamentalmente alteraron nuestra comprensión existencial de los límites biológicos de la adaptación orgánica. Estos perros pioneros no solo allanaron el terreno técnico para el vuelo de Yuri Gagarin, sino que también demostraron empíricamente la asombrosa plasticidad fisiológica de los sistemas nerviosos y cardiovasculares de los mamíferos frente a estímulos gravitacionales radicalmente alterados. Al sobrevivir y prosperar temporalmente en el entorno alienígena del espacio exterior, los sujetos de prueba caninos afirmaron la promesa intrínseca de que la vida terrestre, aunque forjada por miles de millones de años de evolución bajo gravedad planetaria, posee el potencial latente y la resistencia estructural para explorar las estrellas.'
    ],
    expandables: [
      { label: 'Tolerancia Urbana', icon: 'PawPrint', text: 'La elección de perros callejeros moscovitas no fue accidental; su capacidad probada de supervivencia en inviernos gélidos se traducía en una mayor resistencia fisiológica al estrés del vuelo.' },
      { label: 'Legado de Laika', icon: 'Star', text: 'Aunque su sacrificio fue inmensamente polémico, los datos biométricos de Laika probaron sin lugar a dudas que un corazón mamífero avanzado continuaría latiendo en órbita.' }
    ],
    fact: 'El regreso seguro de las perras Belka y Strelka incluyó no solo su bienestar físico, sino que Strelka posteriormente tuvo una camada de cachorros perfectamente sanos, demostrando que la radiación espacial no causó daño reproductivo permanente.'
  },
  {
    id: 'ecosistemas-cerrados',
    title: 'Ecosistemas Cerrados y Microorganismos Extremófilos',
    color: '#3949AB',
    btnImage: '/assets/animales/infographic_m1/btn_ecosistemas-cerrados.jpg',
    image: '/assets/course/animales_pioneros/hero_ecosistemas_extremofilos.jpg',
    content: [
      'Mientras que los mamíferos pioneros acaparaban la atención pública y mediática, la base verdaderamente revolucionaria de la astrobiología experimental se forjaba mediante el estudio meticuloso de invertebrados, plantas y microorganismos en entornos orbitales controlados. Estos diminutos pasajeros biológicos ofrecían ventajas incomparables debido a sus rápidos ciclos reproductivos y perfiles metabólicos altamente definidos, lo que permitía a los científicos documentar genéticamente múltiples generaciones bajo la influencia sostenida de la microgravedad y la radiación espacial cósmica. La experimentación con estas comunidades biológicas más simples sentó las bases ineludibles para la conceptualización de los modernos Sistemas de Soporte Vital Ecológico Cerrado (CELSS), componentes absolutamente críticos para sostener futuras colonias permanentes en Marte y más allá.',
      'Un descubrimiento asombroso en esta área de investigación microscópica espacial fue la observación empírica de que ciertos microorganismos patógenos experimentaban alteraciones radicales en su virulencia genotípica y fenotípica cuando se cultivaban en condiciones de gravedad cero prolongada. Específicamente, bacterias como Salmonella typhimurium mostraron un aumento estadísticamente significativo en su letalidad debido a modificaciones transcripcionales en las vías genéticas reguladas por la dinámica de fluidos de cizallamiento en microgravedad, lo que altera fundamentalmente cómo los microbios interactúan con las superficies celulares. Este comportamiento patológico divergente ha obligado a los farmacólogos y microbiólogos a rediseñar agresivamente los regímenes de antibióticos y las medidas estrictas de esterilización para salvaguardar la salud inmunocomprometida de las futuras tripulaciones en misiones de espacio profundo.',
      'Paralelamente a los estudios microbianos, la botánica espacial ha proporcionado conocimientos fundamentales sobre cómo la flora terrestre adapta sus intrincados mecanismos de desarrollo y orientación en la completa ausencia de un vector gravitacional direccional descendente. Los experimentos pioneros en botánica a bordo de la estación espacial Mir y la Estación Espacial Internacional han revelado que las plantas redirigen hábilmente su gravitropismo natural, desarrollando redes radiculares complejas basadas principalmente en gradientes de humedad (hidrotropismo) y señales de iluminación LED artificiales (fototropismo). Dominar la agricultura en microgravedad no es un simple ejercicio académico de fisiología vegetal, sino una necesidad ingenieril absoluta para el soporte vital humano, asegurando la purificación continua del aire respirable, el reciclaje crítico del agua y una fuente inagotable de nutrición psicológica y calórica en el espacio profundo.',
      'El campo de la astrobiología se vio particularmente conmocionado por el descubrimiento de la extraordinaria resiliencia de especies microscópicas como los tardígrados (osos de agua), que han demostrado capacidades biológicas casi invulnerables frente a los ambientes espaciales más hostiles. Cuando estos formidables extremófilos fueron expuestos directamente al letal vacío del espacio, combinando temperaturas cercanas al cero absoluto, una deshidratación extrema y niveles mortales de radiación ultravioleta cósmica, lograron sobrevivir activando un estado de anhidrobiosis paralizante conocido metabólicamente como criptobiosis profunda. La capacidad de los tardígrados para reparar el daño celular masivo y el daño severo del ADN al rehidratarse ofrece perspectivas biotecnológicas incalculables para avanzar en terapias genéticas de resistencia a la radiación y revolucionarios métodos bioquímicos de preservación de tejidos biológicos humanos para viajes interplanetarios prolongados.',
      'La culminación de estas diversas investigaciones biológicas extraterrestres converge en el diseño arquitectónico contemporáneo de biosferas autosostenibles artificiales destinadas a mantener la vida biológica durante extensas misiones interplanetarias e interestelares futuras. Mediante la sinergia orquestada de cianobacterias fijadoras de carbono, cultivos vegetales hidropónicos de alto rendimiento y sistemas biológicos eficientes de reciclaje de desechos microbianos orgánicos, los ingenieros espaciales actuales están forjando réplicas funcionales miniaturizadas y cerradas de los ciclos ecológicos intrincados de la ecosfera de nuestro propio planeta Tierra. Las lecciones críticas y dolorosamente aprendidas a lo largo de décadas de lanzar animales pioneros, plantas resilientes y microbios adaptables al inhóspito vacío orbital han demostrado fehacientemente que la supervivencia de nuestra especie a largo plazo en el sombrío y frío cosmos dependerá intrínsecamente de llevar una representación diversa y biológicamente rica de nuestro robusto ecosistema planetario natal con nosotros.'
    ],
    expandables: [
      { label: 'Resistencia Extrema', icon: 'Dna', text: 'Los tardígrados deshidratados pueden sobrevivir directamente expuestos al vacío espacial y a la brutal radiación ultravioleta del sol, reparando su ADN celular al rehidratarse en la Tierra.' },
      { label: 'Agricultura Espacial', icon: 'Microscope', text: 'Los sistemas CELSS dependen absolutamente del cultivo de plantas y microorganismos en ingravidez, cerrando el ciclo ecológico para proporcionar oxígeno y reciclar dióxido de carbono continuamente.' }
    ],
    fact: 'Ciertas cepas de bacterias como Salmonella typhimurium se vuelven genéticamente más virulentas y letales cuando se exponen a la microgravedad prolongada, obligando a replantear la esterilización de las naves espaciales.'
  }
];

// ─── Bio Particle Field (Canvas Background) ──────────────────────────────
function BioField() {
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
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 3.5 + 1.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.25,
      color: Math.random() > 0.5 ? '128, 222, 234' : '216, 125, 74',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.15;
        if (p.y < -15) { p.y = h + 15; p.x = Math.random() * w; }
        if (p.x < -15 || p.x > w + 15) p.x = Math.random() * w;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
        
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${Math.max(0, opacity * 0.25)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Biological Header ──────────────────────────────────────────────────
function BioSpaceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(128,222,234,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#bioGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, i) => {
          const t = (i + 0.5) / 4;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="5" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [4, 6, 4] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              style={{ filter: `drop-shadow(0 0 8px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="35" r="14" fill="none" stroke="#80DEEA" strokeWidth="2" opacity="0.7" />
        <circle cx="300" cy="35" r="6" fill="#80DEEA" opacity="0.6" />
        <defs>
          <linearGradient id="bioGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(128,222,234,0.15)" />
            <stop offset="50%" stopColor="rgba(128,222,234,0.85)" />
            <stop offset="100%" stopColor="rgba(128,222,234,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#80DEEA" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="2.5">ADAPTACIONES EXTREMAS</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(128,222,234,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">BIOLOGÍA AEROESPACIAL</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -5 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 280, damping: 25 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.25)'}`,
        boxShadow: isActive
          ? `0 0 22px ${node.color}55, 0 0 45px ${node.color}25, inset 0 0 18px ${node.color}35`
          : '0 5px 18px rgba(0,0,0,0.4)',
        transition: 'all 0.35s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.8rem', fontWeight: 700, letterSpacing:'0.4px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '110px',
        textShadow: isActive ? `0 0 10px ${node.color}45` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotAnimalesM1"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 10px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Expandable Section ────────────────────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};

const EXPAND_ICONS = {
  Rocket,
  Microscope,
  Dna,
  Activity,
  HeartPulse,
  PawPrint,
  Star
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
        whileHover={{ backgroundColor: `${color}15` }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.85rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color, letterSpacing: '0.6px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35 }}>
          <ChevronDown size={18} style={{ color, opacity: 0.75 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.92rem', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.88)',
              borderLeft: `3px solid ${color}35`,
              paddingLeft: '0.9rem',
            }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Content Panel ──────────────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  
  const decoPositions = [
    { top: '6%', right: '-15px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -15 },
    { bottom: '15%', right: '8px', rotate: 25 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      style={{
        background: 'rgba(12, 14, 32, 0.93)',
        backdropFilter: 'blur(28px)',
        border: `1px solid ${node.color}35`,
        borderRadius: '26px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1.2rem',
        overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem', zIndex: 10,
        background: 'rgba(0,0,0,0.65)', border: `1px solid ${node.color}45`,
        borderRadius: '50%', width: '42px', height: '42px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.25s',
      }}>
        <X size={20} />
      </button>

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '290px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}18, rgba(0,0,0,0.45))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.92,
            minHeight: '290px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{ padding: '2.2rem 2.2rem 1.8rem 1.8rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(18deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 55, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 1rem', fontSize: '1.6rem', fontWeight: 800, color: node.color, letterSpacing:'-0.03em',
            display: 'flex', alignItems: 'center', gap: '0.7rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '44px', height: '44px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}45`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.9rem', fontSize: '0.98rem', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.88)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Body Section */}
      <div style={{
        padding: '1.8rem 2.2rem 2.2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 6, pos.rotate || 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
              }}
            >
              <Deco size={58 + i * 12} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.4rem 2.2rem',
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
                  background: 'rgba(255,255,255,0.025)',
                  borderRadius: '14px',
                  padding: '1.4rem',
                  borderLeft: `3.5px solid ${node.color}35`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-10px', left: '14px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.7rem', fontWeight: 800,
                  padding: '3px 10px', borderRadius: '10px',
                  letterSpacing: '1.2px',
                }}>
                  {i === 0 ? '◈' : '◇'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.98rem', lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.88)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.4rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.015 }}
          style={{
            marginTop: '1.8rem',
            padding: '1.4rem',
            background: `linear-gradient(90deg, ${node.color}18, transparent)`,
            borderLeft: `4.5px solid ${node.color}`,
            borderRadius: '0 14px 14px 0',
            display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={26} color={node.color} style={{ flexShrink: 0, marginTop: '3px' }} />
          <p style={{ margin: 0, fontSize: '0.98rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', lineHeight: 1.65 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────
function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto 2.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)' }}>
        <span>Progreso de Exploración Biológica</span>
        <span>{visited.length} / {total} Misiones</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #80DEEA, #D87D4A)', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────
export default function InteractiveInfographic_AnimalesM1() {
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
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_animales.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2.5rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url('/assets/course/animales_pioneros/bg_animales.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.15, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(12,14,32,0.88) 0%, rgba(18,14,38,0.85) 45%, rgba(12,14,32,0.92) 100%)',
        zIndex: 1,
      }} />

      <BioField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1150px', margin: '0 auto',
        border: '1px solid rgba(128,222,234,0.15)',
        borderRadius: '26px',
        padding: '2.2rem',
        background: 'rgba(12, 14, 32, 0.45)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 22px 45px rgba(0,0,0,0.55), inset 0 0 22px rgba(128,222,234,0.06)',
      }}>
        <BioSpaceHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
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

        {/* ─── Bibliography ─── */}
        <div style={{
          marginTop: '3.5rem',
          padding: '2.2rem',
          background: 'rgba(12, 14, 32, 0.65)',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.12)',
          position: 'relative', zIndex: 2
        }}>
          <h4 style={{ color: '#D4B872', marginTop: 0, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.1rem' }}>
            <Star size={20} /> Referencias Bibliográficas
          </h4>
          <ul style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.4rem' }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.6rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
