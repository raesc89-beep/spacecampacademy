'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Astronaut Training themed) ————————————————
function DecoHelmet({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Helmet visor */}
      <circle cx="30" cy="28" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="26" rx="14" ry="12" fill={color} opacity="0.15" />
      {/* Reflection arc */}
      <path d="M22 20 Q26 14 34 16" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Collar ring */}
      <path d="M14 40 Q22 48 30 48 Q38 48 46 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Antenna */}
      <line x1="44" y1="16" x2="52" y2="8" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="53" cy="7" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoRocket({ size = 70, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rocket body */}
      <path d="M30 5 Q35 15 35 30 L35 42 L25 42 L25 30 Q25 15 30 5Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Nose cone */}
      <path d="M27 15 L30 5 L33 15" fill={color} opacity="0.2" />
      {/* Fins */}
      <path d="M25 38 L18 48 L25 44" fill={color} opacity="0.3" />
      <path d="M35 38 L42 48 L35 44" fill={color} opacity="0.3" />
      {/* Exhaust flames */}
      <path d="M27 42 Q30 55 33 42" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M28 42 Q30 50 32 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Window */}
      <circle cx="30" cy="24" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStarField({ size = 80, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stars scattered */}
      {[
        [10, 12], [25, 8], [45, 14], [52, 28], [8, 38],
        [40, 42], [18, 50], [50, 50], [30, 30],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke={color} strokeWidth="1" opacity={0.3 + i * 0.05} />
          <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 3} stroke={color} strokeWidth="1" opacity={0.3 + i * 0.05} />
        </g>
      ))}
      {/* Orbit arc */}
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoPool({ size = 70, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 50" style={{ opacity: 0.22, ...style }}>
      {/* Pool outline */}
      <rect x="5" y="10" width="60" height="35" rx="6" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Water waves */}
      <path d="M10 25 Q17 20 25 25 Q33 30 40 25 Q47 20 55 25" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M10 32 Q17 27 25 32 Q33 37 40 32 Q47 27 55 32" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Diver silhouette */}
      <circle cx="35" cy="20" r="2.5" fill={color} opacity="0.4" />
      <line x1="35" y1="22" x2="35" y2="30" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="35" y1="25" x2="31" y2="22" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="35" y1="25" x2="39" y2="22" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Bubbles */}
      <circle cx="28" cy="18" r="1.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="25" cy="14" r="1" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoSimulator({ size = 70, color = '#B43A3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Monitor frame */}
      <rect x="10" y="8" width="40" height="28" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Screen content lines */}
      <line x1="15" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="15" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="24" x2="25" y2="24" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="28" y1="24" x2="42" y2="24" stroke={color} strokeWidth="1" opacity="0.25" />
      {/* Stand */}
      <line x1="30" y1="36" x2="30" y2="44" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="22" y1="44" x2="38" y2="44" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* VR goggles floating beside */}
      <ellipse cx="52" cy="14" rx="5" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="47" y1="14" x2="44" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoJet({ size = 80, color = '#8491A0', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Jet body */}
      <path d="M8 22 L25 22 L35 16 L58 14 L70 18 L72 22 L70 26 L58 26 L35 28 L25 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Wings */}
      <path d="M35 20 L28 8 L42 16" fill={color} opacity="0.2" />
      <path d="M35 24 L28 36 L42 28" fill={color} opacity="0.2" />
      {/* Tail fin */}
      <path d="M68 18 L72 10 L74 18" fill={color} opacity="0.25" />
      {/* Speed trails */}
      <line x1="2" y1="20" x2="8" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="4" y1="24" x2="8" y2="24" stroke={color} strokeWidth="1" opacity="0.25" />
      {/* Exhaust */}
      <circle cx="74" cy="22" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'sueno-astronauta': [DecoHelmet, DecoStarField, DecoRocket],
  'nasa-seleccion-historia': [DecoRocket, DecoHelmet, DecoStarField],
  'formacion-academica': [DecoSimulator, DecoStarField, DecoHelmet],
  'entrenamiento-basico': [DecoJet, DecoHelmet, DecoPool],
  'piscina-gigante': [DecoPool, DecoHelmet, DecoRocket],
  'simuladores-vr': [DecoSimulator, DecoJet, DecoStarField],
  'astronautas-futuro': [DecoRocket, DecoStarField, DecoSimulator],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'NASA. (2020). Astronaut Selection and Training Fact Sheet, NASA Johnson Space Center, NP-2020-03-012-JSC',
  'Hadfield, C. (2013). An Astronaut\'s Guide to Life on Earth, Little, Brown and Company',
  'Massimino, M. (2016). Spaceman: An Astronaut\'s Unlikely Journey to Unlock the Secrets of the Universe, Crown Archetype',
  'Kelly, S. (2017). Endurance: A Year in Space, A Lifetime of Discovery, Alfred A. Knopf',
  'Peake, T. (2017). Ask an Astronaut: My Guide to Life in Space, Century Publishing',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'sueno-astronauta',
    title: 'El Sueño de Ser Astronauta',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/infographic_m1/btn_sueno-astronauta.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_sueno-astronauta.jpg',
    content: [
      'Convertirse en astronauta es uno de los objetivos profesionales más difíciles de alcanzar en el mundo. De cada convocatoria que abre la NASA, miles y miles de personas presentan su solicitud con la esperanza de volar al espacio, pero el número de seleccionados se cuenta con los dedos de las manos. En la convocatoria de 2017, la NASA recibió 18,300 solicitudes para su clase de astronautas, y seleccionó únicamente a 12 personas. Eso representa una tasa de aceptación del 0.065%, una cifra menor que la de cualquier universidad o programa de élite conocido en la Tierra. Cada uno de esos 12 candidatos superó a más de 1,500 competidores por cada puesto disponible.',
      'La Agencia Espacial Europea (ESA) también presenta cifras de competencia muy altas. En su proceso de selección más reciente, realizado entre 2021 y 2022, la ESA recibió más de 22,500 solicitudes provenientes de ciudadanos de sus estados miembros. Tras meses de evaluaciones que incluyeron pruebas cognitivas, médicas, psicológicas y entrevistas con paneles de expertos, solo 17 personas fueron seleccionadas como astronautas de carrera y de reserva. La ESA también marcó un precedente al seleccionar por primera vez a un parastronauta, un candidato con discapacidad física, como parte de su compromiso con la inclusión en la exploración espacial.',
      'Más allá de la NASA y la ESA, otras agencias espaciales alrededor del mundo también reclutan astronautas. La agencia japonesa JAXA, la Agencia Espacial Canadiense (CSA) y Roscosmos en Rusia mantienen sus propios programas de selección, cada uno con requisitos adaptados a sus necesidades nacionales. China opera el programa de taikonautas a través de la CMSA, con criterios que privilegian el historial militar y la experiencia de vuelo. Independientemente de la agencia, el denominador común es la preparación rigurosa: un título universitario STEM, experiencia profesional demostrable y una salud física y mental que cumpla estándares muy elevados.',
      'El proceso de selección no evalúa solamente conocimientos técnicos y aptitud física. Las pruebas psicológicas constituyen una parte central del filtro. Los evaluadores analizan la capacidad del candidato para mantener la calma en situaciones de emergencia, convivir durante meses en espacios reducidos con personas de distintas culturas e idiomas, y resolver conflictos interpersonales de manera constructiva. Un profesional con un curriculum académico notable pero con dificultades para trabajar en equipo no será seleccionado. La NASA ha identificado que la cohesión del equipo durante misiones prolongadas es tan crítica como la competencia técnica individual.',
      'Una vez que un candidato supera todas las rondas eliminatorias y recibe la notificación de selección, su viaje apenas comienza. No se convierte de forma inmediata en astronauta: recibe el título de "Candidato a Astronauta" (ASCAN, por sus siglas en inglés) y debe completar aproximadamente dos años de entrenamiento básico intensivo. Este período incluye el estudio de los sistemas de la Estación Espacial Internacional, aprendizaje obligatorio del idioma ruso, entrenamiento de supervivencia en agua y tierra, vuelos en aviones T-38 y cientos de horas de práctica en simuladores. Solo al finalizar este período con éxito recibe la designación formal de astronauta de la NASA.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta José Hernández, hijo de trabajadores agrícolas migrantes mexicanos, fue rechazado por la NASA once veces antes de ser aceptado en su duodécimo intento en 2004. Durante esos años de rechazos, Hernández continuó preparándose: obtuvo un título de ingeniería eléctrica, trabajó en tecnología de detección de cáncer de mama y acumuló experiencia técnica relevante. Finalmente voló al espacio en la misión STS-128 del transbordador Discovery en agosto de 2009, demostrando que la persistencia es una cualidad tan valiosa como el talento natural.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los exámenes médicos para la selección de astronautas incluyen pruebas de tolerancia a la presión intracraneal, ya que el 70% de los astronautas en misiones de larga duración desarrollan el Síndrome Neuro-Ocular Asociado al Vuelo Espacial (SANS). Esta condición, causada por la redistribución de fluidos corporales en microgravedad, puede aplanar el globo ocular y dañar el nervio óptico. Por eso la NASA realiza exámenes oftalmológicos detallados antes de la selección y monitorea la visión de cada astronauta durante toda su carrera activa.' },
    ],
    fact: 'La clase de astronautas de la NASA de 2013, conocida como "Los 8 Magníficos", incluyó a la primera mujer de origen iraní seleccionada como astronauta de la NASA, Jasmin Moghbeli, quien se convirtió en piloto de helicópteros de combate AH-1W SuperCobra del Cuerpo de Marines antes de su selección. Esta clase también incluyó a Christina Koch, quien establecería en 2020 el récord de la estancia continua más larga de una mujer en el espacio: 328 días consecutivos a bordo de la Estación Espacial Internacional.',
  },
  {
    id: 'nasa-seleccion-historia',
    title: 'Historia de la Selección NASA',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/infographic_m1/btn_nasa-seleccion-historia.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_nasa-seleccion-historia.jpg',
    content: [
      'La historia de la selección de astronautas de la NASA comenzó en 1959, cuando el presidente Dwight D. Eisenhower ordenó que los primeros astronautas fueran pilotos de pruebas militares. De un grupo inicial de 508 pilotos, la NASA seleccionó a siete hombres para formar el grupo Mercury 7: Scott Carpenter, Gordon Cooper, John Glenn, Gus Grissom, Wally Schirra, Alan Shepard y Deke Slayton. Todos eran varones blancos, menores de 40 años, con al menos 1,500 horas de vuelo y una estatura máxima de 180 cm para caber en la diminuta cápsula Mercury. Alan Shepard se convirtió en el primer estadounidense en el espacio el 5 de mayo de 1961.',
      'Con el programa Gemini y las misiones Apollo, la NASA amplió sus criterios de selección. El Grupo 4 (1965) fue el primero en incluir científicos civiles además de pilotos militares, reconociendo que las misiones lunares requerirían competencias geológicas y científicas. Harrison Schmitt, geólogo del Grupo 4, se convirtió en el primer científico profesional en pisar la Luna durante Apollo 17 en diciembre de 1972. Esta evolución en los criterios de selección reflejó el cambio de paradigma de la exploración espacial: de demostrar capacidad tecnológica a realizar investigación científica de alto nivel en otros mundos.',
      'El programa del transbordador espacial, que operó entre 1981 y 2011, transformó radicalmente quién podía convertirse en astronauta. Por primera vez se creó la categoría de "especialista de misión", que no requería experiencia de pilotaje. En 1978, la NASA seleccionó el Grupo 8, que incluyó a las primeras mujeres astronautas estadounidenses (Sally Ride, Judith Resnik, Anna Fisher, Shannon Lucid, Rhea Seddon y Kathryn Sullivan) y al primer afroamericano (Guion Bluford). Sally Ride se convirtió en la primera mujer estadounidense en el espacio el 18 de junio de 1983, a bordo del transbordador Challenger.',
      'Durante las décadas de 1990 y 2000, la NASA continuó diversificando sus clases de astronautas y ampliando los perfiles profesionales aceptados. Los candidatos ya no eran exclusivamente pilotos o ingenieros aeronáuticos: la agencia comenzó a seleccionar médicos, biólogos marinos, oceanógrafos y expertos en sistemas informáticos. El astronauta Franklin Chang-Díaz, de origen costarricense, voló siete misiones espaciales entre 1986 y 2002, igualando el récord de Jerry Ross. Mae Jemison se convirtió en la primera mujer afroamericana en el espacio en 1992, y Eileen Collins en la primera mujer en comandar una misión del transbordador en 1999.',
      'Las clases más recientes de astronautas de la NASA reflejan una diversidad de formación profesional sin precedentes. La clase de 2021, denominada "las Tortugas" (un homenaje a las tortugas que la NASA envió al espacio en los primeros experimentos con animales), incluye pilotos de combate, médicos de emergencias, físicos de partículas e ingenieros biomédicos. Los requisitos actuales exigen un título universitario en un campo STEM (ciencia, tecnología, ingeniería o matemáticas), al menos tres años de experiencia profesional relevante o 1,000 horas como piloto al mando de aviones a reacción. La estatura permitida oscila entre 157 cm y 190.5 cm.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'John Glenn, miembro original del Mercury 7, regresó al espacio en 1998 a bordo del transbordador Discovery a los 77 años de edad, convirtiéndose en la persona de mayor edad en volar al espacio. Su misión STS-95 incluyó experimentos sobre los efectos del vuelo espacial en el envejecimiento. Glenn había sido el primer estadounidense en orbitar la Tierra el 20 de febrero de 1962, completando tres órbitas en la cápsula Friendship 7. Entre ambos vuelos transcurrieron 36 años, el intervalo más largo entre vuelos espaciales de un mismo astronauta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La NASA utiliza pruebas de tolerancia ortostática para evaluar cómo responde el sistema cardiovascular de los candidatos al cambio de posición. En una prueba de mesa basculante (tilt table test), el candidato pasa de posición horizontal a una inclinación de 70 grados mientras se monitorean su frecuencia cardíaca, presión arterial y flujo sanguíneo cerebral. Esta prueba predice la capacidad del astronauta para tolerar la redistribución de fluidos que ocurre en microgravedad, donde hasta 2 litros de sangre se desplazan desde las piernas hacia la cabeza y el tórax.' },
    ],
    fact: 'Los Mercury 7 recibieron un contrato exclusivo con la revista LIFE que les pagaba 500,000 dólares (equivalentes a unos 5 millones actuales ajustados por inflación) divididos entre los siete por los derechos sobre sus historias personales. Este acuerdo fue organizado por la NASA para proteger la privacidad de las familias y evitar la competencia entre medios de comunicación. Paradójicamente, el contrato hizo a los astronautas muy reconocidos públicamente y creó la imagen heroica del "astronauta americano" que definió la cultura popular de la era espacial durante décadas.',
  },
  {
    id: 'formacion-academica',
    title: 'Formación Académica',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/infographic_m1/btn_formacion-academica.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_formacion-academica.jpg',
    content: [
      'La base académica requerida para ser astronauta de la NASA comienza con una licenciatura en un campo STEM: ciencia, tecnología, ingeniería o matemáticas. Sin embargo, los datos de las clases seleccionadas muestran que la mayoría de los astronautas activos poseen títulos avanzados que van más allá del mínimo exigido. Según estadísticas de la NASA actualizadas a 2023, aproximadamente el 45% de los astronautas activos tienen un doctorado (Ph.D.) o un título de médico (M.D.), y otro 30% posee al menos una maestría. Las disciplinas más representadas incluyen ingeniería aeroespacial, física, biología, medicina y ciencias de la computación.',
      'La formación médica se ha vuelto especialmente relevante para las misiones de larga duración. Los astronautas con títulos de medicina aportan conocimientos críticos sobre fisiología humana, respuesta del cuerpo al estrés extremo y procedimientos de emergencia médica. El astronauta-médico puede monitorear la salud de la tripulación, administrar tratamientos básicos y realizar procedimientos menores como extracciones de sangre, ecografías guiadas desde tierra y suturas. En misiones futuras a Marte, donde la comunicación con la Tierra tendrá un retraso de hasta 24 minutos, la presencia de al menos un miembro de la tripulación con formación médica avanzada será indispensable.',
      'Para los candidatos que optan por la vía de pilotaje en lugar de la experiencia profesional STEM, la NASA exige un mínimo de 1,000 horas acumuladas como piloto al mando de aviones a reacción. Muchos astronautas pilotos provienen de la Escuela de Pilotos de Pruebas de la Fuerza Aérea de los Estados Unidos en la Base Edwards, California, o de su equivalente en la Marina en Patuxent River, Maryland. La formación como piloto de pruebas es particularmente valorada porque enseña a evaluar el rendimiento de aeronaves en condiciones límite, a reaccionar ante fallos inesperados en pleno vuelo y a documentar datos técnicos bajo presión extrema.',
      'Los requisitos físicos, aunque no exigen un rendimiento atlético olímpico, establecen estándares médicos precisos. La visión del candidato debe ser corregible a 20/20 en cada ojo. La presión arterial en posición sentada no debe superar los 140/90 mmHg. La estatura debe ubicarse entre 157 cm y 190.5 cm, un rango determinado por las dimensiones de las cápsulas espaciales actuales, especialmente la Crew Dragon de SpaceX y la Soyuz rusa. Los exámenes médicos incluyen pruebas cardiovasculares de esfuerzo, audiometrías, evaluaciones neurológicas completas, resonancias magnéticas y análisis extensos de sangre y orina para descartar condiciones que podrían agravarse en microgravedad.',
      'La capacidad de aprender idiomas es otro requisito que los candidatos no deben subestimar. Desde el inicio del programa de cooperación con Rusia en la Estación Espacial Internacional en 1998, el aprendizaje del idioma ruso se ha convertido en una parte obligatoria del entrenamiento. Los astronautas deben alcanzar un nivel funcional que les permita comunicarse con los cosmonautas, leer los manuales de la Soyuz y comprender las instrucciones del centro de control de Moscú. El entrenamiento lingüístico incluye clases diarias durante el período ASCAN, inmersión cultural en Rusia y exámenes de competencia periódicos. Algunos astronautas, como el canadiense Chris Hadfield, han sido elogiados por alcanzar un dominio notable del ruso.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Jonny Kim, seleccionado como astronauta de la NASA en 2017, tiene una trayectoria profesional que desafía cualquier expectativa. Antes de ser astronauta, Kim sirvió como SEAL de la Marina de los Estados Unidos con más de 100 misiones de combate, luego obtuvo un título de medicina en la Universidad de Harvard y completó su residencia médica en emergencias. Su perfil demuestra que la NASA busca individuos con una combinación de disciplina, resiliencia, habilidad técnica y capacidad de liderazgo probada en entornos de alto riesgo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La NASA utiliza un sistema de evaluación médica con clasificación de riesgo que identifica más de 300 condiciones médicas potenciales que podrían descalificar a un candidato. Entre las más relevantes están la susceptibilidad a cálculos renales (que en microgravedad pueden formarse con mayor frecuencia debido a cambios en el metabolismo del calcio), arritmias cardíacas que podrían agravarse con el estrés del lanzamiento, y condiciones musculoesqueléticas que impedirían la actividad física intensa requerida durante los dos años de entrenamiento básico y las misiones en órbita.' },
    ],
    fact: 'Un análisis publicado por la NASA en 2020 reveló que los astronautas seleccionados entre 2009 y 2017 tenían una edad promedio de 34 años al momento de su selección, con un rango que abarcaba desde los 26 hasta los 46 años. El astronauta más joven seleccionado en la historia moderna de la NASA fue Hayley Arceneaux, quien voló en la misión Inspiration4 de SpaceX en septiembre de 2021 a los 29 años como especialista médica, aunque técnicamente fue una misión comercial privada y no una selección de la NASA.',
  },
  {
    id: 'entrenamiento-basico',
    title: 'Entrenamiento Básico',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/infographic_m1/btn_entrenamiento-basico.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_entrenamiento-basico.jpg',
    content: [
      'Una vez seleccionados, los candidatos a astronauta (ASCAN) se trasladan al Centro Espacial Lyndon B. Johnson en Houston, Texas, donde comienzan un programa de entrenamiento básico que dura aproximadamente dos años. Este período, que la NASA denomina formalmente "Astronaut Candidate Training", cubre una gama amplia de habilidades que incluyen el estudio de la ciencia orbital, los sistemas de la Estación Espacial Internacional, procedimientos de caminata espacial, vuelo en aviones T-38, supervivencia en agua y entrenamiento físico intensivo. El objetivo es transformar a profesionales especializados en operadores espaciales versátiles.',
      'El avión T-38 Talon es una pieza central del entrenamiento de astronautas desde la década de 1960. Este avión supersónico de entrenamiento, fabricado por Northrop, vuela a velocidades de hasta 1,380 km/h (Mach 1.13) y puede alcanzar altitudes de 16,000 metros. Los astronautas no pilotos vuelan como copiloto para desarrollar habilidades de toma de decisiones rápidas, comunicación en entornos de alta velocidad y manejo del estrés fisiológico. Cada ASCAN debe completar un mínimo de 15 horas de vuelo por mes en el T-38 durante su período de entrenamiento, acumulando familiaridad con protocolos de aviación y operaciones multi-tarea bajo presión.',
      'El entrenamiento de supervivencia en agua, denominado "Water Survival Training", se realiza en las instalaciones de la NASA en Houston y prepara a los astronautas para un amerizaje de emergencia. Los candidatos aprenden a salir de una cápsula simulada que flota en el agua, que se ha volcado o que se está hundiendo progresivamente. Practican el despliegue de balsas de emergencia, el uso de equipos de señalización como bengalas y espejos, y técnicas para mantenerse a flote durante períodos prolongados. Con el regreso de los amerizajes como método estándar de retorno (tanto la Crew Dragon de SpaceX como la cápsula Orión amerizarán en el océano), este entrenamiento ha recuperado una relevancia que había disminuido durante la era del transbordador.',
      'El programa ASCAN incluye un componente de entrenamiento de supervivencia terrestre que prepara a los astronautas para aterrizajes fuera del área designada. Los candidatos pasan entre 3 y 5 días en entornos hostiles — bosques, desiertos o zonas montañosas — donde deben construir refugios con materiales disponibles, encontrar y purificar agua, administrar alimentos limitados y enviar señales de rescate. Este entrenamiento es heredero directo de las experiencias reales de aterrizajes de emergencia, como la de los cosmonautas Belyayev y Leonov, quienes en 1965 aterrizaron a 400 km del punto previsto en un bosque siberiano y pasaron dos noches a temperaturas bajo cero antes de ser rescatados.',
      'El componente académico del entrenamiento ASCAN es riguroso y abarca materias que muchos candidatos no habrán estudiado previamente. Los astronautas reciben instrucción formal en mecánica orbital, sistemas de propulsión, materiales y estructuras espaciales, robótica, geología planetaria, meteorología y ciencias de la Tierra. Las clases son impartidas por ingenieros de la NASA, científicos del Jet Propulsion Laboratory y profesores universitarios invitados. Los candidatos también reciben entrenamiento en fotografía espacial de la Tierra, una habilidad que combina ciencia con arte y que produce las imágenes que utiliza la comunidad científica para estudiar cambios climáticos, desastres naturales y fenómenos geológicos desde la perspectiva orbital.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astronautas de la NASA realizan entrenamiento de egreso de emergencia de la plataforma de lanzamiento, una práctica que consiste en deslizarse por un cable de acero desde la torre de lanzamiento hasta un búnker de protección a nivel del suelo, a más de 100 metros de distancia horizontal. Este sistema, instalado en el Complejo de Lanzamiento 39 en el Centro Espacial Kennedy, permite evacuar a la tripulación y al equipo de apoyo en menos de 30 segundos en caso de una emergencia antes del lanzamiento, como una fuga de combustible o un incendio en la plataforma.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El avión T-38 Talon ha sido utilizado por la NASA desde 1961 y tiene un récord de seguridad notable, aunque no exento de accidentes. La flota de T-38 de la NASA ha registrado más de 600,000 horas de vuelo. La aeronave expone a los tripulantes a fuerzas de hasta 7.3 G durante maniobras, lo que entrena el sistema cardiovascular de los astronautas para las fuerzas G experimentadas durante el lanzamiento (aproximadamente 3.2 G máximo en la Crew Dragon) y la reentrada atmosférica (hasta 4.5 G en la Soyuz).' },
    ],
    fact: 'Durante el entrenamiento ASCAN, cada candidato debe aprobar un examen de certificación de buceo autónomo (SCUBA) como requisito previo para el entrenamiento en el Laboratorio de Flotabilidad Neutra. Los candidatos que no poseen certificación de buceo previo la obtienen durante las primeras semanas del programa. La certificación requiere demostrar competencia en respiración con regulador, manejo de equipos a profundidad y protocolos de emergencia submarina. Este requisito existe porque el entrenamiento de EVA (caminata espacial) en la piscina de flotabilidad neutra es una de las actividades más críticas y frecuentes del programa de preparación para misiones.',
  },
  {
    id: 'piscina-gigante',
    title: 'La Piscina Gigante',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/infographic_m1/btn_piscina-gigante.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_piscina-gigante.jpg',
    content: [
      'El Laboratorio de Flotabilidad Neutra (NBL, por sus siglas en inglés) de la NASA es una de las instalaciones de entrenamiento más singulares del mundo. Ubicado en el Sonny Carter Training Facility, junto al Centro Espacial Johnson en Houston, Texas, este laboratorio alberga una piscina que contiene aproximadamente 23.5 millones de litros de agua (6.2 millones de galones). Sus dimensiones son notables: 62 metros de largo, 31 metros de ancho y 12.2 metros de profundidad. Para poner estas cifras en contexto, la piscina podría contener nueve piscinas olímpicas dentro de su volumen, y su profundidad equivale a un edificio de cuatro pisos sumergido bajo la superficie del agua.',
      'En el fondo y a lo largo de la piscina se encuentran réplicas a escala real de los módulos de la Estación Espacial Internacional. Los astronautas descienden en trajes presurizados — que simulan las características de los trajes espaciales EMU — y practican las tareas específicas que realizarán durante caminatas espaciales reales. Los técnicos ajustan cuidadosamente los pesos y los dispositivos de flotación en cada traje hasta alcanzar la condición de "flotabilidad neutra", un estado en el que el astronauta no se hunde ni flota, sino que permanece suspendido a cualquier profundidad. Esta condición replica la sensación de ingravidez, aunque el agua genera una resistencia al movimiento que no existe en el vacío del espacio.',
      'Cada sesión de entrenamiento en el NBL dura entre 5 y 7 horas y requiere un equipo de apoyo considerable. Un equipo típico incluye entre 4 y 6 buzos de seguridad que acompañan a cada astronauta bajo el agua, técnicos de superficie que monitorean las comunicaciones y el suministro de aire, un director de pruebas que coordina las actividades desde una sala de control con cámaras submarinas, y médicos de guardia. Se estima que por cada hora de caminata espacial real programada, un astronauta acumula al menos 7 horas de entrenamiento en la piscina del NBL. Para una misión con tres caminatas espaciales de 6 horas cada una, esto implica aproximadamente 126 horas de inmersión.',
      'El entrenamiento en el NBL no se limita a practicar tareas manuales. Los astronautas también utilizan las sesiones de inmersión para familiarizarse con las herramientas específicas que emplearán en el espacio, como llaves dinamométricas diseñadas para funcionar con guantes presurizados, pistolas de anclaje para sujetar equipos a la estructura de la estación y conectores eléctricos y de fluidos que deben manipularse con precisión milimétrica. Cada herramienta está codificada por colores y marcada con indicadores táctiles que permiten su identificación incluso cuando la visibilidad dentro del casco es limitada o cuando los guantes gruesos reducen la sensibilidad en los dedos.',
      'La temperatura del agua en el NBL se mantiene entre 27°C y 30°C (80-86°F) para optimizar la comodidad y la seguridad de los astronautas durante las largas sesiones de inmersión. A pesar de esta temperatura controlada, los astronautas pueden experimentar hipotermia localizada en las extremidades después de varias horas bajo el agua, ya que los trajes presurizados no proporcionan el mismo aislamiento térmico que tendrán en el espacio. El laboratorio cuenta con un sistema de filtración que procesa todo el volumen de agua cada 19 horas, manteniendo una claridad óptica que permite a las cámaras submarinas capturar cada movimiento con detalle. La piscina también dispone de una grúa puente con capacidad de 10 toneladas para mover las réplicas de los módulos dentro y fuera del agua.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta Luca Parmitano, de la ESA, experimentó una emergencia real durante una caminata espacial en julio de 2013 cuando su casco comenzó a llenarse de agua debido a una fuga en el sistema de refrigeración del traje. El agua, que en microgravedad no caía sino que se adhería a su cabeza formando una burbuja, cubrió sus ojos, nariz y oídos, impidiéndole ver y comunicarse. Parmitano logró regresar a la esclusa de aire guiándose por el cable de seguridad. Este incidente llevó a la NASA a rediseñar los protocolos de emergencia para EVA y a instalar almohadillas absorbentes dentro de los cascos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La flotabilidad neutra en agua no replica de forma idéntica la microgravedad del espacio. Mientras que en órbita un astronauta puede girar su cuerpo completo con un mínimo esfuerzo, en la piscina la resistencia viscosa del agua frena el movimiento y crea fuerzas de arrastre que no existen en el vacío. Los ingenieros del NBL compensan esta diferencia mediante modelos computacionales que ajustan los tiempos estimados de cada tarea: una operación que toma 45 minutos en la piscina puede completarse en 30 minutos en el espacio, o tardar 60 minutos si implica manipulación de objetos masivos que en el agua flotan de manera distinta.' },
    ],
    fact: 'La construcción del Laboratorio de Flotabilidad Neutra se completó en 1997, reemplazando a la piscina más pequeña conocida como WETF (Weightless Environment Training Facility), que la NASA había utilizado desde 1980. El costo de construcción del NBL superó los 100 millones de dólares. La piscina requiere un mantenimiento continuo que consume más de 2 millones de dólares anuales, incluyendo la purificación del agua, el mantenimiento de las réplicas sumergidas y la operación de los sistemas de soporte. A pesar de este costo, el NBL sigue siendo la herramienta más efectiva disponible para entrenar caminatas espaciales en la Tierra.',
  },
  {
    id: 'simuladores-vr',
    title: 'Simuladores y Realidad Virtual',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/infographic_m1/btn_simuladores-vr.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_simuladores-vr.jpg',
    content: [
      'El Centro Espacial Johnson alberga el Space Vehicle Mockup Facility (SVMF), una instalación que contiene réplicas a escala real de prácticamente todos los módulos de la Estación Espacial Internacional. Los astronautas pasan semanas enteras dentro de estas réplicas, practicando procedimientos operativos estándar y respondiendo a emergencias simuladas con un grado de realismo que involucra alarmas auditivas, cambios de iluminación y la participación de instructores que actúan como controladores de misión. Las tres categorías de emergencia — incendio, despresurización rápida y fuga de amoníaco tóxico del sistema de refrigeración — se practican repetidamente hasta que los astronautas pueden ejecutar los protocolos de forma automática, incluso en condiciones de fatiga o desorientación.',
      'El entrenamiento con el brazo robótico Canadarm2, desarrollado por la Agencia Espacial Canadiense, es una de las habilidades técnicas más complejas que deben dominar los astronautas. El Canadarm2 mide 17.6 metros de largo, puede manipular cargas de hasta 116 toneladas en microgravedad y opera con dos modos de control: automático y manual. En el simulador, los astronautas practican la captura de naves de abastecimiento como la Cygnus y la HTV japonesa, el reposicionamiento de módulos y la asistencia a astronautas durante caminatas espaciales. La captura de una nave que se aproxima a la estación requiere coordinar la velocidad del brazo con la velocidad relativa de la nave, utilizando únicamente cámaras externas y datos de telemetría.',
      'La realidad virtual ha transformado el entrenamiento de astronautas durante la última década. La NASA desarrolló el sistema SAFER (Simplified Aid For EVA Rescue) Virtual Reality Trainer, que permite a los astronautas practicar el uso de la mochila propulsora de emergencia que llevan durante las caminatas espaciales. Utilizando visores de realidad virtual de alta resolución y guantes hápticos que simulan la resistencia de los objetos, los astronautas pueden ensayar escenarios complejos como la reparación de paneles solares dañados, la instalación de experimentos científicos en el exterior de la estación y la navegación alrededor de la estructura completa de la ISS en un entorno tridimensional inmersivo.',
      'Los simuladores de la nave Crew Dragon de SpaceX representan un salto generacional en la interfaz de control de vehículos espaciales. A diferencia de la Soyuz rusa, que utiliza interruptores mecánicos y diales analógicos distribuidos en paneles que rodean a los tripulantes, la Crew Dragon presenta una interfaz basada en pantallas táctiles de gran formato similares a las de una tableta. Los astronautas practican la secuencia completa de vuelo — desde el lanzamiento hasta el acoplamiento y el regreso — en réplicas de la cabina ubicadas en las instalaciones de SpaceX en Hawthorne, California. Aunque la nave opera de forma autónoma en condiciones normales, los astronautas deben demostrar competencia en el control manual para contingencias.',
      'La integración de inteligencia artificial y simulación por computadora permite que los astronautas entrenen en escenarios que serían imposibles de recrear físicamente. Los sistemas de simulación de la NASA generan fallos aleatorios en los sistemas de soporte vital, alteraciones en la trayectoria orbital y degradaciones progresivas de componentes que obligan a la tripulación a diagnosticar problemas, priorizar respuestas y ejecutar soluciones en tiempo real. Los datos de rendimiento de cada sesión de simulación se registran y analizan para identificar áreas de mejora individual y grupal. Un astronauta típico completará más de 1,500 horas de entrenamiento en simuladores antes de su primera misión al espacio.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'SpaceX puso a disposición del público un simulador gratuito de acoplamiento de la Crew Dragon con la ISS en su sitio web. Este simulador, construido con la misma interfaz que utilizan los astronautas durante su entrenamiento, permite a cualquier persona intentar acoplar la cápsula a la estación controlando los seis grados de libertad (traslación y rotación en tres ejes). El simulador demostró que la mayoría de los usuarios novatos necesitan más de 30 minutos para completar el acoplamiento, mientras que los astronautas entrenados lo realizan en aproximadamente 5 minutos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El simulador de la Soyuz en la Ciudad de las Estrellas, cerca de Moscú, incluye una réplica de la cabina con un diámetro interior de apenas 2.2 metros. Los tres tripulantes deben sentarse con las rodillas dobladas hacia el pecho durante todo el vuelo de aproximadamente 6 horas hasta la ISS. Los astronautas que entrenan en este simulador describen la experiencia como "estar dentro de un armario con dos compañeros mientras alguien sacude el armario". La versión más reciente de la Soyuz, la MS, tiene 36 modificaciones respecto a la TMA, incluyendo sistemas digitales que reemplazaron controles analógicos de la era soviética.' },
    ],
    fact: 'La NASA desarrolló la tecnología de realidad virtual para el entrenamiento de astronautas desde 1993, cuando el Virtual Reality Laboratory del Johnson Space Center creó los primeros entornos inmersivos para practicar operaciones con el brazo robótico y caminatas espaciales. Esta tecnología, financiada originalmente con presupuesto del programa espacial, fue transferida posteriormente al sector privado y médico, donde se utiliza hoy en día para cirugía asistida por realidad virtual, tratamiento de fobias y trastorno de estrés postraumático, y entrenamiento de pilotos comerciales. El programa espacial ha generado más de 2,000 tecnologías derivadas que se utilizan en la vida cotidiana.',
  },
  {
    id: 'astronautas-futuro',
    title: 'Astronautas del Futuro',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/infographic_m1/btn_astronautas-futuro.jpg',
    image: '/assets/astrotrain/infographic_m1/hero_astronautas-futuro.jpg',
    content: [
      'La era de los vuelos comerciales tripulados ha redefinido quién puede viajar al espacio. Desde el primer vuelo operacional de la Crew Dragon de SpaceX el 15 de noviembre de 2020 (misión Crew-1), la NASA dejó de depender exclusivamente de la nave rusa Soyuz para transportar astronautas a la ISS. Boeing también desarrolló la cápsula Starliner CST-100 como parte del programa Commercial Crew de la NASA, que adjudicó contratos por un valor combinado de 6,800 millones de dólares a ambas empresas. Este modelo de asociación público-privada ha reducido los costos de acceso a la órbita baja y ha abierto la posibilidad de que ciudadanos privados compren asientos en vuelos espaciales.',
      'El programa Artemis de la NASA representa el próximo capítulo de la exploración humana del espacio. Nombrado en honor a la diosa griega hermana gemela de Apolo, Artemis tiene como objetivo devolver a los seres humanos a la superficie de la Luna por primera vez desde la misión Apollo 17 en diciembre de 1972. El cohete Space Launch System (SLS), con 98 metros de altura y 39.1 meganewtons de empuje al despegar, es el vehículo más potente construido por la NASA. La misión Artemis I completó un vuelo no tripulado alrededor de la Luna en 2022, y Artemis II enviará a cuatro astronautas en un sobrevuelo lunar. Artemis III tiene previsto llevar a los primeros astronautas a la superficie, incluyendo a la primera mujer y a la primera persona de color en pisar la Luna.',
      'Los astronautas que viajarán a Marte necesitarán un perfil de competencias radicalmente distinto al de los astronautas actuales de la ISS. Un viaje a Marte dura entre 6 y 9 meses en cada sentido, con una estadía en superficie de aproximadamente 26 meses mientras los planetas se realinean para el viaje de regreso, lo que suma una misión total de unos 3 años. Durante ese período, la tripulación no podrá ser reabastecida ni evacuada. Las comunicaciones con la Tierra tendrán un retraso de entre 4 y 24 minutos en cada sentido. Los astronautas marcianos deberán funcionar como médicos, geólogos, ingenieros de mantenimiento, agricultores (para cultivar alimentos a bordo) y psicólogos de sí mismos.',
      'La radiación cósmica constituye uno de los riesgos más graves para los astronautas en misiones fuera de la protección del campo magnético terrestre. Mientras que los astronautas de la ISS reciben una dosis de radiación de aproximadamente 150 milisieverts por cada 6 meses en órbita (comparado con 3.6 milisieverts anuales para una persona en la superficie terrestre), los astronautas en tránsito a Marte estarían expuestos a rayos cósmicos galácticos y eventos de partículas solares que podrían elevar su dosis acumulada a 1,000 milisieverts o más. Esta exposición aumenta significativamente el riesgo de cáncer, cataratas, daño al sistema nervioso central y efectos cardiovasculares que los científicos están trabajando para mitigar con nuevos materiales de blindaje y fármacos radioprotectores.',
      'El futuro de la exploración espacial también involucra destinos más allá de Marte. La estación Gateway, una miniestación que orbitará la Luna, servirá como punto de escala para misiones hacia la superficie lunar y como laboratorio para probar tecnologías de vida en el espacio profundo. Las lunas de Júpiter y Saturno — particularmente Europa, con su océano subterráneo bajo una corteza de hielo de 15 a 25 kilómetros de espesor, y Encélado, que expulsa géiseres de agua al espacio — son destinos donde los científicos consideran más probable encontrar las condiciones para la vida extraterrestre. Aunque las misiones tripuladas a estos destinos están a décadas de distancia, cada generación de astronautas entrenados hoy construye el camino hacia esos objetivos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La misión Inspiration4 de SpaceX, lanzada el 15 de septiembre de 2021, fue el primer vuelo orbital tripulado exclusivamente por civiles sin ningún astronauta profesional a bordo. La tripulación de cuatro personas, liderada por el empresario Jared Isaacman, incluyó a Hayley Arceneaux (asistente médica y sobreviviente de cáncer infantil con una prótesis en la rodilla), Sian Proctor (geóloga y piloto) y Chris Sembroski (veterano de la Fuerza Aérea y técnico de datos). La misión orbitó la Tierra a 585 km de altitud — más alto que la ISS y que cualquier misión tripulada desde las misiones de reparación del Hubble — durante 3 días.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El experimento Mars-500, conducido entre junio de 2010 y noviembre de 2011 en Moscú, confinó a seis voluntarios durante 520 días en un módulo sellado para simular un viaje a Marte. Los resultados revelaron que cuatro de los seis participantes experimentaron trastornos del sueño significativos, dos mostraron síntomas de depresión leve, y la dinámica social del grupo se deterioró después del cuarto mes de aislamiento. Estos datos han impulsado a la NASA a invertir en investigación sobre contramedidas psicológicas, incluyendo sistemas de iluminación que simulan ciclos solares naturales y programas de soporte emocional mediante realidad virtual.' },
    ],
    fact: 'Los planes de SpaceX para la colonización de Marte incluyen el envío previo de naves Starship no tripuladas cargadas con suministros, hábitats inflables, sistemas de producción de combustible a partir del CO₂ marciano (proceso Sabatier) y paneles solares antes de que llegue la primera tripulación humana. La nave Starship, con 121 metros de altura total incluyendo el propulsor Super Heavy, está diseñada para ser íntegramente reutilizable y transportar hasta 100 toneladas de carga a la superficie de Marte. Elon Musk ha declarado el objetivo de establecer una ciudad autosuficiente de un millón de personas en Marte para finales del siglo XXI, un proyecto que requeriría aproximadamente 1,000 vuelos de Starship.',
  },
];

// ——— Astronaut Training Particle Field (Canvas Background) ——————————————
function AstroField() {
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
      hue: Math.random() > 0.5 ? '196,75,75' : '168,181,192', // mission red or space silver
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

// ——— Astronaut Training Header ——————————————————————————————————————
function AstroTrainHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Mission arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#astroGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 mission markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C44B4B','#A8B5C0','#D45A5A','#96A3AE','#B43A3A','#8491A0','#E46A6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central helmet icon */}
        <circle cx="300" cy="28" r="14" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="300" cy="26" rx="9" ry="7" fill="none" stroke="#C44B4B" strokeWidth="1" opacity="0.4" />
        <path d="M290 36 Q296 42 300 42 Q304 42 310 36" fill="none" stroke="#C44B4B" strokeWidth="1.2" opacity="0.5" />
        <defs>
          <linearGradient id="astroGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CAMINO A LAS ESTRELLAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">SELECCIÓN Y ENTRENAMIENTO DE ASTRONAUTAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(196,75,75,0.2)'}`,
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
          layoutId="activeDotAstroTrainM1"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Conditional Video Render ——— */}
        {node.video && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <VideoPlayer
              src={node.video.src}
              title={node.video.title}
              color={node.color}
              poster={node.video.poster}
            />
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(196,75,75,0.15)',
    }}>
      <Star size={14} style={{ color: '#C44B4B', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C44B4B, #A8B5C0)', borderRadius: '3px', boxShadow: '0 0 8px rgba(196,75,75,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C44B4B', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_AstroTrainM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(25,10,15,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/astrotrain/astrotrain_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(196,75,75,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AstroField />

      <AstroTrainHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(196,75,75,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(196,75,75,0.08)', borderRadius: '16px',
              border: '1px solid rgba(196,75,75,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C44B4B', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado el Camino a las Estrellas!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Candidato Espacial
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ——— Bibliografía ——— */}
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
