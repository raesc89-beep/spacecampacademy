'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ─── SVG Decorative Elements (Space Medicine themed) ────────────────────────
function DecoHeartbeat({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.22, ...style }}>
      {/* ECG heartbeat line */}
      <polyline
        points="0,20 12,20 16,20 20,8 24,30 28,14 32,22 36,20 50,20 54,20 58,6 62,32 66,18 70,20"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
      />
      {/* Pulse dots */}
      <circle cx="20" cy="8" r="1.5" fill={color} opacity="0.5" />
      <circle cx="58" cy="6" r="1.5" fill={color} opacity="0.5" />
      <circle cx="24" cy="30" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoBone({ size = 60, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized bone */}
      <ellipse cx="15" cy="15" rx="8" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="45" cy="45" rx="8" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="20" y1="19" x2="40" y2="41" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Calcium markers */}
      <circle cx="28" cy="28" r="2" fill={color} opacity="0.3" />
      <circle cx="33" cy="33" r="1.5" fill={color} opacity="0.25" />
      {/* Loss arrows */}
      <path d="M48 18 L54 12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M50 22 L56 16" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoRadiation({ size = 70, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Radiation trefoil */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {[0, 120, 240].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 30 + 8 * Math.cos(rad);
        const y1 = 30 + 8 * Math.sin(rad);
        const x2 = 30 + 22 * Math.cos(rad);
        const y2 = 30 + 22 * Math.sin(rad);
        return (
          <g key={i}>
            <path
              d={`M ${30 + 8 * Math.cos(rad - 0.4)} ${30 + 8 * Math.sin(rad - 0.4)} A 8 8 0 0 1 ${30 + 8 * Math.cos(rad + 0.4)} ${30 + 8 * Math.sin(rad + 0.4)} L ${30 + 22 * Math.cos(rad + 0.5)} ${30 + 22 * Math.sin(rad + 0.5)} A 22 22 0 0 0 ${30 + 22 * Math.cos(rad - 0.5)} ${30 + 22 * Math.sin(rad - 0.5)} Z`}
              fill={color} opacity="0.25"
            />
          </g>
        );
      })}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoEye({ size = 65, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 65 40" style={{ opacity: 0.22, ...style }}>
      {/* Eye shape */}
      <path d="M5 20 Q32 2 60 20 Q32 38 5 20 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Iris */}
      <circle cx="32" cy="20" r="9" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Pupil */}
      <circle cx="32" cy="20" r="4" fill={color} opacity="0.35" />
      {/* Highlight */}
      <circle cx="35" cy="17" r="1.5" fill={color} opacity="0.6" />
      {/* Optic nerve lines */}
      <line x1="32" y1="29" x2="32" y2="38" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="30" x2="26" y2="38" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="36" y1="30" x2="38" y2="38" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoBrain({ size = 65, color = '#B43A3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Left hemisphere */}
      <path d="M30 8 Q12 10 10 28 Q8 42 22 50 Q28 53 30 52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Right hemisphere */}
      <path d="M30 8 Q48 10 50 28 Q52 42 38 50 Q32 53 30 52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Central fissure */}
      <line x1="30" y1="8" x2="30" y2="52" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Gyri folds */}
      <path d="M18 18 Q22 14 26 18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M14 28 Q20 24 24 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M34 18 Q38 14 42 18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M36 28 Q42 24 46 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Neural sparks */}
      <circle cx="20" cy="36" r="1.5" fill={color} opacity="0.4" />
      <circle cx="40" cy="36" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoStethoscope({ size = 70, color = '#8491A0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tubing */}
      <path d="M20 8 Q20 30 30 38 Q40 30 40 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Chest piece */}
      <circle cx="30" cy="42" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="42" r="4" fill={color} opacity="0.2" />
      {/* Ear tips */}
      <circle cx="20" cy="8" r="3" fill={color} opacity="0.3" />
      <circle cx="40" cy="8" r="3" fill={color} opacity="0.3" />
      {/* Sound waves */}
      <path d="M22 42 Q18 42 16 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M38 42 Q42 42 44 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="30" cy="55" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'efectos-microgravedad': [DecoBone, DecoHeartbeat, DecoStethoscope],
  'radiacion-cosmica': [DecoRadiation, DecoBone, DecoHeartbeat],
  'sistema-cardiovascular': [DecoHeartbeat, DecoStethoscope, DecoBone],
  'vision-en-el-espacio': [DecoEye, DecoBrain, DecoHeartbeat],
  'psicologia-aislamiento': [DecoBrain, DecoEye, DecoStethoscope],
  'medicina-emergencia': [DecoStethoscope, DecoRadiation, DecoBone],
  'investigacion-medica-iss': [DecoHeartbeat, DecoRadiation, DecoBrain],
};

// ─── Content Data ─────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Clément, G. (2011). Fundamentals of Space Medicine, 2nd Ed. Springer',
  'Williams, D., et al. (2009). Acclimation during space flight: effects on human physiology. Canadian Medical Association Journal, 180(13)',
  'Garrett-Bakelman, F.E., et al. (2019). The NASA Twins Study: A multidimensional analysis of a year-long human spaceflight. Science, 364(6436)',
  'NASA Human Research Program (2020). Human Research Roadmap: Risks to Human Health on Exploration Missions. NASA Technical Report',
  'Stenger, M.B., et al. (2017). Evidence Report: Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS). NASA Johnson Space Center',
  'Basner, M., et al. (2014). Mars 520-d mission simulation reveals protracted crew hypokinesis and alterations of sleep duration. PNAS, 111(23)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'efectos-microgravedad',
    title: 'Efectos de la Microgravedad',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'Cuando un astronauta llega a la Estación Espacial Internacional, su cuerpo comienza a experimentar cambios fisiológicos significativos en las primeras 24 a 72 horas. El fenómeno más inmediato es el desplazamiento de fluidos corporales hacia la cabeza, conocido como "fluid shift". En la Tierra, la gravedad mantiene aproximadamente 2 litros de sangre y líquidos en las piernas. Sin gravedad, esos líquidos se redistribuyen hacia el torso y la cabeza, provocando lo que los astronautas llaman "cara de luna llena": el rostro se hincha visiblemente, las venas del cuello se dilatan y la presión dentro del cráneo se incrementa entre un 10% y un 20% respecto a los valores normales en la Tierra.',
      'La pérdida de masa ósea es uno de los efectos más preocupantes de la estancia prolongada en el espacio. Los estudios realizados por la NASA entre 2001 y 2015 demuestran que los astronautas pierden entre un 1% y un 2% de densidad ósea por cada mes en microgravedad, particularmente en los huesos que soportan peso como el fémur, la pelvis y las vértebras lumbares. Este ritmo de pérdida es aproximadamente 10 veces más rápido que el de la osteoporosis terrestre en personas mayores. El mecanismo se relaciona con la falta de carga mecánica: sin gravedad, los osteoclastos (células que destruyen hueso) se activan más que los osteoblastos (células que construyen hueso), rompiendo el equilibrio normal.',
      'La atrofia muscular representa otro desafío serio para los astronautas. Sin la resistencia constante de la gravedad, los músculos posturales y antigravitatorios —como los de las piernas, la espalda y el cuello— comienzan a perder volumen y fuerza. Estudios realizados con astronautas en la estación rusa Mir demostraron que, sin contramedidas adecuadas, un astronauta podía perder hasta un 20% de su masa muscular en las piernas durante una misión de 6 meses. Los músculos tipo I (de contracción lenta, responsables de mantener la postura) son los más afectados, mientras que los músculos tipo II (de contracción rápida, usados para movimientos explosivos) se deterioran a menor velocidad.',
      'Para combatir estos efectos, los astronautas de la ISS deben realizar un mínimo de 2.5 horas de ejercicio diario utilizando tres equipos especializados: el dispositivo ARED (Advanced Resistive Exercise Device), que usa cilindros de vacío para simular cargas de hasta 272 kilogramos; la cinta de correr COLBERT, donde el astronauta corre sujeto con arneses elásticos; y la bicicleta estática CEVIS. Desde la implementación del ARED en 2008, los datos médicos muestran una reducción notable de la pérdida ósea comparada con misiones anteriores que solo disponían de máquinas de ejercicio más básicas, aunque no se ha logrado eliminar la pérdida por completo.',
      'El sistema vestibular, encargado del equilibrio y la orientación espacial, sufre una reprogramación profunda en microgravedad. Los otolitos del oído interno, que en la Tierra detectan la dirección de la gravedad, dejan de proporcionar referencias de "arriba" y "abajo". Esto causa el denominado síndrome de adaptación espacial (SAS), que afecta a entre el 60% y el 80% de los astronautas durante sus primeros 2 a 3 días en órbita. Los síntomas incluyen náuseas, desorientación y dificultad para coordinar movimientos. Al regresar a la Tierra, el proceso se invierte: muchos astronautas reportan mareos intensos y dificultad para caminar durante varios días, un período que la NASA denomina "readaptación gravitacional".',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta Scott Kelly, quien pasó 340 días consecutivos en la ISS entre 2015 y 2016, creció 5 centímetros de estatura durante su misión. La explicación es que sin gravedad, los discos intervertebrales de la columna se expanden al no soportar el peso del cuerpo. Sin embargo, este crecimiento es temporal: Kelly recuperó su estatura normal pocas semanas después de regresar a la Tierra, reportando además dolor de espalda durante la readaptación.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La densidad ósea perdida en el espacio no se recupera totalmente al volver a la Tierra. Un estudio publicado en Scientific Reports en 2022 por Leigh Gabel y su equipo de la Universidad de Calgary analizó a 17 astronautas tras misiones de 4 a 7 meses. Un año después de regresar, la mayoría había recuperado solo el 50% al 75% de la densidad ósea perdida en la tibia. Los que estuvieron más de 6 meses mostraron menor recuperación.' },
    ],
    fact: 'En la Tierra, la columna vertebral soporta una carga de compresión que aumenta de la zona cervical a la lumbar. Un adulto promedio mide aproximadamente 1 centímetro menos al final del día que al despertar, simplemente por la compresión de los discos durante las horas de vigilia. En el espacio, esa compresión desaparece completamente, lo que agranda los discos pero también debilita los ligamentos y músculos paravertebrales. El 52% de los astronautas reporta dolor lumbar durante misiones de larga duración según datos del programa médico de la ISS recopilados entre 2000 y 2018.',
  },
  {
    id: 'radiacion-cosmica',
    title: 'Radiación Cósmica',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'El espacio exterior es un entorno de radiación constante. Los astronautas están expuestos a dos fuentes principales de radiación ionizante: los rayos cósmicos galácticos (GCR) y los eventos de partículas solares (SPE). Los GCR son núcleos atómicos de alta energía —principalmente protones, pero también iones de helio, carbono, hierro y otros elementos pesados— que viajan a velocidades cercanas a la de la luz. Se originan fuera del sistema solar, probablemente en supernovas y otros eventos cósmicos violentos. Su energía puede superar los 10^20 electronvoltios, lo que les permite atravesar varios centímetros de aluminio, el material principal del casco de la ISS.',
      'Los eventos de partículas solares (SPE) representan un riesgo diferente pero potencialmente más agudo. Durante las erupciones solares y las eyecciones de masa coronal, el Sol libera enormes cantidades de protones de alta energía en pocas horas. El evento más intenso registrado ocurrió en agosto de 1972, entre las misiones Apollo 16 y Apollo 17. Si astronautas hubieran estado en la superficie lunar sin protección adecuada durante ese evento, habrían recibido una dosis estimada de 3.6 sieverts, suficiente para causar síndrome agudo de radiación con náuseas, vómitos y deterioro del sistema inmunológico. La NASA monitorea la actividad solar en tiempo real para emitir alertas tempranas a la tripulación de la ISS.',
      'La medición de la dosis de radiación que recibe cada astronauta es una práctica médica obligatoria. Cada miembro de la tripulación porta un dosímetro personal durante toda la misión. En la ISS, que orbita dentro de la magnetosfera terrestre, los astronautas reciben aproximadamente entre 150 y 200 milisieverts (mSv) por cada 6 meses de misión. Para comparar: una radiografía de tórax genera alrededor de 0.1 mSv y la dosis anual natural en la Tierra oscila entre 2 y 3 mSv. La NASA establece límites de exposición profesional que varían según la edad y el sexo del astronauta, con un tope máximo diseñado para que el riesgo adicional de mortalidad por cáncer no supere el 3%.',
      'El blindaje contra la radiación en el espacio presenta un dilema de ingeniería. Los materiales densos como el plomo, eficaces contra los rayos X en la Tierra, resultan contraproducentes en el espacio: cuando un ion pesado de alta energía impacta contra un núcleo atómico de plomo, se produce una lluvia de partículas secundarias (fragmentación nuclear) que puede ser más dañina que la radiación original. Por ello, la NASA y la ESA investigan materiales ricos en hidrógeno, como el polietileno de alta densidad, que frenan las partículas con menos fragmentación. Prototipos de paneles de blindaje fabricados con hidrogenated boron nitride nanotubes (BNNT) han mostrado resultados prometedores en pruebas realizadas en el Brookhaven National Laboratory desde 2016.',
      'El riesgo de cáncer por radiación espacial es la principal preocupación a largo plazo para los astronautas. Los iones pesados de los GCR, particularmente los núcleos de hierro (Fe-56), causan un tipo de daño al ADN denominado "roturas de doble cadena agrupadas" que las células reparan con mayor dificultad que el daño producido por radiación terrestre convencional. Investigaciones del NASA Space Radiation Laboratory en Brookhaven han demostrado que estos iones pueden dañar múltiples genes simultáneamente en un solo impacto celular. Para una misión de 3 años a Marte, la dosis acumulada estimada supera los 1,000 mSv, lo que incrementaría el riesgo de cáncer fatal entre un 5% y un 10% según los modelos de riesgo actualizados en 2021.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astronautas reportan un fenómeno visual curioso cuando cierran los ojos para dormir: destellos luminosos que aparecen como rayas o puntos brillantes. Estos "fosfenos cósmicos" fueron descritos por primera vez por Buzz Aldrin durante la misión Apollo 11 en 1969. Se producen cuando un rayo cósmico de alta energía atraviesa la retina o el nervio óptico, estimulando directamente las células fotorreceptoras. En la ISS, los astronautas reportan ver entre uno y varios destellos por hora.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Anomalía del Atlántico Sur (SAA) es una región donde el cinturón interior de radiación de Van Allen se aproxima a solo 200 kilómetros de la superficie terrestre. Cuando la ISS cruza esta zona —varias veces al día—, la dosis de radiación a bordo se multiplica por un factor de 5 a 10 respecto al resto de la órbita. Los equipos electrónicos sensibles se apagan temporalmente al cruzar la SAA, y los astronautas evitan las caminatas espaciales durante esos tránsitos, que duran entre 10 y 20 minutos cada vez.' },
    ],
    fact: 'Chris Hadfield, astronauta canadiense y comandante de la Expedición 35 de la ISS en 2013, describió cómo la radiación espacial afectaba los sensores de las cámaras fotográficas a bordo: "De vez en cuando, un píxel muere en el sensor CCD porque un rayo cósmico destruyó ese punto del chip". Este mismo efecto ocurre en las células humanas: cada día en la ISS, aproximadamente 100,000 células del cuerpo de un astronauta son atravesadas por partículas de radiación cósmica, según estimaciones del Centro Espacial Johnson de la NASA publicadas en 2018.',
  },
  {
    id: 'sistema-cardiovascular',
    title: 'El Sistema Cardiovascular',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'El corazón humano, que en la Tierra trabaja constantemente contra la gravedad para bombear sangre hacia el cerebro y las extremidades superiores, experimenta una remodelación estructural en el espacio. Estudios de ultrasonido cardíaco realizados a astronautas en la ISS han documentado que el corazón adopta una forma más esférica en microgravedad: el ventrículo izquierdo se vuelve un 9.4% más redondo después de 6 meses, según datos publicados por el Dr. James Thomas del equipo médico de la NASA en 2014. Esta remodelación se debe a que el corazón deja de trabajar contra la gravedad y pierde parte de la carga mecánica que mantiene su forma elíptica habitual.',
      'La intolerancia ortostática es uno de los problemas cardiovasculares más comunes al regresar a la Tierra. Tras semanas o meses sin gravedad, el sistema cardiovascular pierde parte de su capacidad para regular la presión arterial cuando el astronauta se pone de pie. Los barorreceptores del cuello y el arco aórtico se desensibilizan, y el volumen total de sangre disminuye entre un 10% y un 15% durante la misión espacial. El resultado es que, al volver a sentir el tirón gravitatorio terrestre, muchos astronautas experimentan mareos, visión borrosa y, en ocasiones, síncope (pérdida momentánea de conciencia) al incorporarse. Este efecto afecta con mayor intensidad a las mujeres astronautas, según datos recopilados entre 1995 y 2017.',
      'El síndrome VIIP, ahora renombrado como SANS (Spaceflight Associated Neuro-ocular Syndrome), es una condición descubierta en 2011 que afecta al sistema vascular del ojo y del cerebro. En la Tierra, la presión intracraneal varía entre 7 y 15 mmHg cuando la persona está de pie, debido al drenaje gravitacional de la sangre venosa. En microgravedad, esa presión se eleva crónicamente a valores entre 20 y 25 mmHg. Esta presión sostenida empuja contra los nervios ópticos y el globo ocular, causando edema del disco óptico, aplanamiento posterior del globo y pliegues coroideos. Aproximadamente el 29% de los astronautas en misiones cortas y el 60% en misiones largas muestran algún grado de cambio ocular detectable.',
      'La presión venosa yugular aumenta notablemente en el espacio. En un estudio publicado en JAMA Network Open en 2019 por el Dr. Karina Marshall-Goebel, se realizaron ecografías de las venas yugulares a 11 astronautas durante su estancia en la ISS. Los resultados revelaron que el flujo sanguíneo en la vena yugular interna se volvía estático o incluso retrógrado en 6 de los 11 participantes. En un caso, se detectó un trombo (coágulo) en la vena yugular de un astronauta durante la misión, lo que constituyó el primer caso documentado de trombosis venosa profunda en el espacio. El astronauta fue tratado con anticoagulantes orales mediante telemedicina con hematólogos en tierra.',
      'Las contramedidas cardiovasculares implementadas en la ISS incluyen ejercicio aeróbico diario, el uso de trajes de presión negativa en la parte inferior del cuerpo (LBNP suits) y protocolos de hidratación salina antes del regreso a la Tierra. El dispositivo "Chibis", utilizado por los cosmonautas rusos desde la era Mir, aplica presión negativa a las piernas para forzar el retorno de líquidos a las extremidades inferiores, simulando parcialmente el efecto de la gravedad sobre la distribución vascular. Estudios comparativos entre el protocolo ruso y el americano han demostrado que ambos enfoques reducen pero no eliminan la intolerancia ortostática. La NASA trabaja actualmente en una centrifugadora de brazo corto que podría generar gravedad artificial parcial durante el sueño.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer caso de trombosis venosa profunda en el espacio fue descubierto accidentalmente en 2019 cuando un astronauta participaba en un estudio de investigación con ecografía de las venas del cuello. Los médicos en tierra guiaron el diagnóstico y tratamiento por telemedicina. El astronauta tomó inyecciones de enoxaparina (un anticoagulante) durante 33 días y luego cambió a apixabán oral durante los 4 meses restantes de la misión, completándola sin complicaciones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El corazón humano late aproximadamente 100,000 veces al día en la Tierra. En el espacio, la frecuencia cardíaca en reposo disminuye entre 5 y 10 latidos por minuto durante las primeras semanas porque el corazón tiene menos trabajo contra la gravedad. Sin embargo, la capacidad cardiovascular máxima (VO2max) cae entre un 15% y un 25% durante misiones de 6 meses, según mediciones realizadas con ergómetros de ciclo a bordo de la ISS entre 2006 y 2019, lo que implica menor resistencia aeróbica al regresar.' },
    ],
    fact: 'En 2016, investigadores del Centro Espacial Johnson publicaron que la presión arterial sistólica de los astronautas no cambia significativamente en el espacio, pero la presión diferencial (la diferencia entre sistólica y diastólica) se reduce aproximadamente un 8%. Esto se debe a que la redistribución de fluidos aumenta el retorno venoso al corazón, elevando la precarga pero disminuyendo la resistencia periférica. El dato resulta relevante porque significa que las mediciones estándar de presión arterial en la Tierra no predicen adecuadamente el estado cardiovascular real de un astronauta en órbita.',
  },
  {
    id: 'vision-en-el-espacio',
    title: 'Visión en el Espacio',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'El síndrome neuro-ocular asociado al vuelo espacial, conocido por sus siglas en inglés como SANS (Spaceflight Associated Neuro-ocular Syndrome), fue identificado oficialmente en 2011 cuando la NASA compiló datos de exámenes oftalmológicos pre y post-vuelo acumulados durante una década. Los hallazgos revelaron que un porcentaje alto de astronautas desarrollaba cambios estructurales en los ojos después de misiones de larga duración en la ISS. Los cinco signos cardinales del SANS incluyen: edema del disco óptico (inflamación del punto donde el nervio óptico entra al ojo), aplanamiento del polo posterior del globo ocular, pliegues coroideos, desplazamiento hipermetrópico (visión lejana) y manchas de algodón en la retina.',
      'La causa subyacente del SANS sigue siendo objeto de investigación activa, pero la hipótesis principal apunta al aumento crónico de la presión intracraneal. En la Tierra, cuando una persona se acuesta, la presión intracraneal sube de 7 a 15 mmHg, y cuando se pone de pie, baja a valores entre 0 y 5 mmHg. Este ciclo diario permite que los vasos y nervios intracraneales "descansen" de la presión alta. En el espacio, la postura no influye en la presión, que permanece elevada de forma constante alrededor de 20 mmHg. Esta exposición sostenida, día tras día durante meses, genera estrés mecánico sobre las estructuras del nervio óptico y la vaina que lo rodea, provocando edema y remodelación tisular.',
      'Los cambios visuales reportados por los astronautas son medibles y, en algunos casos, requieren intervención. De los 300 astronautas examinados entre 2001 y 2020, aproximadamente el 29% de quienes volaron misiones cortas (menos de 30 días) y el 60% de quienes volaron misiones largas (más de 30 días) presentaron al menos un signo del SANS. Algunos astronautas necesitan cambiar la graduación de sus lentes durante la misión: la ISS mantiene un "kit de ajuste de gafas" con diferentes graduaciones a bordo. El astronauta John Phillips reportó en 2005 que su visión pasó de 20/20 a 20/100 durante su misión de 6 meses, un cambio que persistió parcialmente tras su regreso.',
      'La presión del líquido cefalorraquídeo juega un papel central en el mecanismo del SANS. Este líquido baña el cerebro y la médula espinal, y también fluye a lo largo de la vaina del nervio óptico hasta el ojo. En microgravedad, la redistribución cefálica de fluidos incrementa la producción o reduce la absorción de líquido cefalorraquídeo, aumentando la presión dentro de la vaina del nervio óptico. La NASA ha desarrollado un dispositivo portátil llamado "ONSD ultrasound" que mide el diámetro de la vaina del nervio óptico mediante ecografía ocular no invasiva. Mediciones superiores a 5.8 milímetros sugieren presión intracraneal elevada y activan protocolos de seguimiento médico más frecuentes.',
      'Las contramedidas en desarrollo contra el SANS incluyen estrategias tanto mecánicas como farmacológicas. La NASA prueba el dispositivo de presión negativa en la parte inferior del cuerpo (LBNP) como método para reducir la presión intracraneal al forzar el retorno de fluidos hacia las piernas. Prototipos de gafas de presión positiva ocular, que aplican una contrapresión suave directamente sobre el globo ocular, se encuentran en fase de pruebas preliminares. En el ámbito farmacológico, se evalúa el uso de acetazolamida (un diurético que reduce la producción de líquido cefalorraquídeo) como posible tratamiento preventivo. Para las futuras misiones a Marte de 3 años, la solución podría ser gravedad artificial mediante centrifugación, la única estrategia que eliminaría la causa raíz del problema.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La ISS mantiene a bordo un equipo portátil de fondo de ojo (oftalmoscopio) que permite a los astronautas fotografiar su propia retina siguiendo instrucciones de oftalmólogos en tierra. Las imágenes de alta resolución se transmiten al Centro Espacial Johnson, donde especialistas las comparan con las fotografías de referencia tomadas antes de la misión. Este sistema de teleoftalmología ha permitido detectar cambios retinianos en fases tempranas y ajustar las contramedidas antes de que los síntomas se agraven.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en JAMA Ophthalmology en 2020 reveló que los astronautas varones tienen mayor probabilidad de desarrollar SANS que las astronautas mujeres. De 25 astronautas masculinos evaluados, el 72% mostró signos del síndrome, comparado con el 37% de 8 astronautas femeninas. La diferencia podría estar relacionada con variaciones en la compliance (elasticidad) de la vaina del nervio óptico entre sexos, aunque la muestra es aún pequeña para conclusiones definitivas.' },
    ],
    fact: 'El astronauta Michael Barratt, quien también es médico, descubrió sus propios cambios visuales durante su misión en la ISS en 2009 cuando notó que no podía enfocar correctamente su libro de lectura. Al reportar el problema al equipo médico en tierra, los oftalmólogos de la NASA le indicaron cómo realizarse un autoexamen de fondo de ojo usando el equipo de a bordo. Las imágenes confirmaron edema papilar bilateral. Este caso contribuyó directamente a que la NASA estableciera el programa de vigilancia oftalmológica obligatoria para todas las misiones de larga duración a partir de 2010.',
  },
  {
    id: 'psicologia-aislamiento',
    title: 'Psicología del Aislamiento',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'El confinamiento prolongado en un espacio reducido, lejos de familia y amigos, con un grupo pequeño de personas y sin posibilidad de salida, genera efectos psicológicos que las agencias espaciales estudian con rigor desde los años 1960. La estación Mir soviética registró el primer incidente documentado de conflicto interpersonal serio en el espacio cuando, durante la misión Soyuz T-14 en 1985, un cosmonauta fue evacuado prematuramente debido a un cuadro de estrés agudo y depresión. Desde entonces, la selección psicológica de astronautas incluye pruebas estandarizadas de tolerancia al aislamiento, estabilidad emocional y habilidades de comunicación en grupo que pueden durar semanas enteras.',
      'El experimento Mars-500, conducido por el Instituto de Problemas Biomédicos de Rusia en Moscú entre 2010 y 2011, simuló un viaje completo a Marte con 6 voluntarios de diferentes nacionalidades encerrados durante 520 días en un módulo de 550 metros cúbicos. Los resultados, publicados en PNAS en 2013 por Mathieu Basner y colaboradores, revelaron patrones preocupantes: 4 de los 6 participantes desarrollaron trastornos del sueño significativos, la actividad física disminuyó un 25% durante la segunda mitad del experimento, y se documentaron episodios de letargo y reducción de la motivación que los investigadores denominaron "hipokinesia conductual". Un tripulante experimentó depresión crónica durante los últimos 3 meses.',
      'El programa HERA (Human Exploration Research Analog) de la NASA en el Centro Espacial Johnson de Houston utiliza un hábitat de 148 metros cúbicos donde equipos de 4 voluntarios conviven durante períodos de 30 a 45 días en condiciones de aislamiento controlado. Los participantes realizan tareas similares a las de una misión espacial real: experimentos científicos, operaciones simuladas de vehículos, y comunicaciones con un centro de control con retraso temporal incorporado de hasta 10 minutos. Sensores ambientales y cámaras registran datos las 24 horas. Los estudios HERA han identificado que la fase más difícil psicológicamente no es el inicio ni el final, sino el "tercer cuarto" de la misión, cuando la novedad ha desaparecido pero el final aún se percibe lejano.',
      'La dinámica de tripulación es un factor determinante para el éxito de las misiones. Las agencias espaciales han aprendido que grupos con miembros de personalidades complementarias funcionan mejor que grupos homogéneos. Los investigadores del programa NEEMO (NASA Extreme Environment Mission Operations), que sitúa a astronautas en un laboratorio submarino frente a la costa de Florida, han documentado que los equipos necesitan al menos un miembro con habilidades de mediación social, alguien capaz de detectar y desactivar tensiones antes de que escalen. Las tripulaciones de la ISS reciben entrenamiento específico en resolución de conflictos y comunicación asertiva en el Gagarin Cosmonaut Training Center en Star City, Rusia.',
      'La telemedicina psicológica es una herramienta que se utiliza de forma rutinaria en la ISS desde 2001. Los astronautas tienen acceso semanal a sesiones privadas de videoconferencia con psicólogos del equipo de apoyo conductual de la NASA (Behavioral Health and Performance team), protegidas con encriptación para garantizar confidencialidad. Además del apoyo profesional, la NASA implementa medidas de bienestar como el envío de paquetes sorpresa con comida favorita en las naves de abastecimiento, videollamadas familiares frecuentes y la celebración de eventos culturales a bordo. Los cosmonautas rusos utilizan la llamada "caja de regalos psicológica", preparada por sus familias antes de la misión, que contiene objetos personales, cartas y recuerdos para abrir en momentos específicos del vuelo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante el experimento SFINCSS (Simulation of Flight of International Crew on Space Station) en 1999-2000 en Moscú, un incidente de conflicto entre participantes de diferentes nacionalidades obligó a la instalación de cerraduras internas en los módulos del simulador. El evento fue clasificado durante años, pero su análisis posterior condujo a cambios importantes en los protocolos de selección y entrenamiento psicológico multicultural para las tripulaciones internacionales de la ISS, incluyendo entrenamiento obligatorio en sensibilidad cultural.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Investigadores del University of Pennsylvania Perelman School of Medicine analizaron los patrones de sueño de los tripulantes de Mars-500 y descubrieron que el reloj circadiano de los participantes se desincronizó progresivamente a lo largo de la misión. Sin las señales naturales de luz solar, los ciclos de sueño-vigilia se alargaron en promedio 25 minutos por día, generando una acumulación de deuda de sueño que se correlacionó con deterioro cognitivo medido en pruebas de atención y toma de decisiones realizadas semanalmente.' },
    ],
    fact: 'El fenómeno psicológico conocido como "overview effect" (efecto perspectiva), descrito por Frank White en 1987, se refiere al cambio cognitivo profundo que experimentan los astronautas al observar la Tierra desde el espacio. El astronauta Ron Garan lo describió así: "Desde la ISS puedes ver un continente entero cubierto por una tormenta de arena que cruza desde el Sahara hasta el Amazonas, y comprendes que no existen las fronteras". Estudios de neuroimagen realizados en 2019 por la Universidad de Pensilvania mostraron que astronautas que pasaron más de 3 meses en el espacio presentaban cambios medibles en la conectividad del córtex prefrontal.',
  },
  {
    id: 'medicina-emergencia',
    title: 'Medicina de Emergencia',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'En la ISS, al menos dos miembros de la tripulación están certificados como Crew Medical Officers (CMO), responsables de proporcionar atención médica de emergencia a bordo. La formación de un CMO incluye 80 horas de entrenamiento médico en el Centro Espacial Johnson, que cubren procedimientos de soporte vital básico y avanzado, uso de desfibrilador externo automático, manejo de vía aérea, inyecciones intramusculares e intravenosas, suturas, extracción dental básica y atención de quemaduras. El CMO no necesita ser médico de profesión: ingenieros, pilotos y científicos reciben esta formación. El entrenamiento se refuerza con sesiones de práctica trimestrales en vuelo mediante telemedicina.',
      'La telemedicina es la columna vertebral de la atención sanitaria en la ISS. Los astronautas pueden comunicarse con el Surgeon Console del Centro de Control de Misión en Houston, donde un equipo de médicos de vuelo está disponible las 24 horas. Las consultas se realizan mediante videoconferencia cifrada, y los médicos en tierra pueden guiar procedimientos complejos en tiempo real. La ISS cuenta con un ecógrafo portátil (modelo GE Vivid-i) que permite al CMO realizar ecografías abdominales, cardíacas, musculoesqueléticas y oculares bajo dirección remota. Este equipo ha sido utilizado para diagnosticar cálculos renales, evaluar lesiones musculares, monitorear la función cardíaca y detectar el caso de trombosis venosa profunda mencionado anteriormente.',
      'El botiquín médico de la ISS se denomina Crew Health Care System (CHeCS) y contiene aproximadamente 190 medicamentos diferentes, organizados por categorías: analgésicos, antibióticos, antihistamínicos, medicamentos cardiovasculares, descongestionantes, sedantes y medicamentos para el mareo espacial. El kit incluye también equipos quirúrgicos estériles básicos, material de sutura, férulas inflables, vendajes de diferentes tipos, un desfibrilador y un kit de intubación. Un problema específico del espacio es que la farmacocinética de los medicamentos cambia en microgravedad: la absorción oral se modifica por la redistribución de fluidos gastrointestinales, y la vida útil de algunos fármacos se reduce por la exposición a radiación cósmica.',
      'Las emergencias médicas más probables a bordo de la ISS incluyen: traumatismos por impacto con equipos (la causa más frecuente de lesiones menores), problemas dentales, cálculos renales (cuyo riesgo aumenta un 30% en el espacio debido a la desmineralización ósea y los cambios en el pH urinario), reacciones alérgicas a sustancias del ambiente cerrado, y eventos cardíacos. El protocolo de evacuación médica contempla el uso de la cápsula Soyuz (o la Crew Dragon de SpaceX) como "ambulancia espacial": en una emergencia grave, un astronauta puede ser regresado a la Tierra en aproximadamente 3.5 horas desde la decisión de evacuación hasta el aterrizaje, siempre que las condiciones de reentrada lo permitan.',
      'La preparación para cirugía en el espacio es un área de investigación activa que adquiere urgencia de cara a las misiones a Marte, donde la evacuación a la Tierra no será posible. La microgravedad presenta desafíos únicos para cualquier procedimiento quirúrgico: la sangre no fluye hacia abajo sino que forma esferas flotantes, los intestinos no se retraen por gravedad, y el cirujano necesita estar fijado al paciente y a la estructura de la nave. Investigadores de la Universidad Carnegie Mellon y la NASA han experimentado con cámaras quirúrgicas transparentes que encierran el campo operatorio y con técnicas de cirugía laparoscópica adaptadas al entorno sin gravedad. En 2006, el cirujano Dominique Martin realizó la primera cirugía simulada en vuelo parabólico (gravedad cero durante 22 segundos) como parte del proyecto MARSTEC financiado por la Agencia Espacial Europea.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astronautas tienen prohibido consumir bebidas carbonatadas en la ISS. Sin gravedad, el gas carbónico no se separa del líquido como en la Tierra, provocando eructos que arrastran contenido gástrico (reflujo). Pero más relevante aún es que el gas acumulado en el estómago no asciende naturalmente al esófago para ser expulsado: permanece distribuido por todo el sistema digestivo, causando distensión abdominal y molestias. La Coca-Cola Company y Pepsi enviaron dispensadores especiales en los años 1985 y 1990 respectivamente, pero ninguno resultó práctico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los cálculos renales son la emergencia médica que ha causado más evacuaciones de la ISS. La incidencia de cálculos entre astronautas es un 30% mayor que en la población general de la misma edad y condición física. La explicación es doble: la desmineralización ósea libera calcio al torrente sanguíneo que se filtra en los riñones, y la reducción del consumo de agua (por la incomodidad del sistema urinario espacial) concentra la orina. La NASA exige que los astronautas beban un mínimo de 2 litros de agua diarios y realicen análisis de orina periódicos para monitorear niveles de calcio y oxalato.' },
    ],
    fact: 'En septiembre de 2020, el astronauta de la NASA Chris Cassidy y los cosmonautas Anatoly Ivanishin e Ivan Vagner detectaron una fuga de aire en el módulo Zvezda de la ISS mediante un procedimiento que involucró sellar cada módulo por separado durante la noche y monitorear la presión. Localizaron la fuga con la ayuda de hojas de té flotantes que se acumularon cerca de la grieta. La reparación temporal se realizó con cinta Kapton y sellador epóxico. Este tipo de mantenimiento preventivo forma parte del entrenamiento médico ambiental de los astronautas, que incluye la detección de contaminantes atmosféricos y la respuesta a despresurización.',
  },
  {
    id: 'investigacion-medica-iss',
    title: 'Investigación Médica en la ISS',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/astrotrain_m5.png',
    image: '/assets/astrotrain/astrotrain_m5.png',
    content: [
      'El NASA Twins Study, publicado en la revista Science en abril de 2019, es el estudio médico más completo jamás realizado sobre los efectos del vuelo espacial en el cuerpo humano. Los gemelos idénticos Scott y Mark Kelly, ambos astronautas, participaron en un diseño experimental sin precedentes: Scott pasó 340 días en la ISS mientras Mark permanecía en la Tierra como "control" genético perfecto. El estudio involucró a 84 investigadores de 12 universidades que analizaron más de 300 muestras biológicas. Los resultados revelaron que Scott experimentó cambios en la expresión de más de 7,000 genes (el 7% de su genoma), alteraciones en su microbioma intestinal, inflamación vascular, engrosamiento de las paredes de la arteria carótida, alargamiento temporal de los telómeros cromosómicos y cambios cognitivos medibles.',
      'La cristalización de proteínas en microgravedad es una de las contribuciones más directas de la ISS a la medicina terrestre. En el espacio, los cristales de proteínas crecen más lentamente y con mayor regularidad que en la Tierra, donde la convección y la sedimentación distorsionan su estructura. Estos cristales de alta calidad permiten determinar la estructura tridimensional de las proteínas con mayor precisión mediante difracción de rayos X. La empresa japonesa JAXA ha liderado el programa PCG (Protein Crystal Growth) desde 2003, produciendo cristales que han ayudado a diseñar fármacos más efectivos. Un ejemplo es la mejora del medicamento Xalkori (crizotinib) de Pfizer para el cáncer de pulmón: los cristales cultivados en la ISS revelaron detalles de la unión proteína-fármaco que no se podían observar en cristales terrestres.',
      'Los experimentos con células madre y organoides en la ISS han abierto nuevas vías de investigación biomédica. En microgravedad, las células madre se comportan de forma diferente: su tasa de proliferación cambia, su diferenciación sigue patrones distintos y pueden formar estructuras tridimensionales que no se logran fácilmente en cultivos terrestres. En 2019, investigadores del Cedars-Sinai Medical Center enviaron organoides intestinales humanos a la ISS y descubrieron que la microgravedad aceleró su maduración, permitiendo generar tejido intestinal funcional en semanas en lugar de meses. Estos hallazgos tienen aplicaciones potenciales en medicina regenerativa y en la fabricación de tejidos para trasplante.',
      'JAXA (la Agencia de Exploración Aeroespacial de Japón) opera el módulo Kibo en la ISS, donde se han realizado más de 1,000 experimentos biomédicos desde 2008. Entre los más relevantes están los estudios de envejecimiento acelerado: dado que los efectos de la microgravedad sobre los huesos, músculos y el sistema cardiovascular se asemejan a un proceso de envejecimiento acelerado, los datos obtenidos en el espacio ayudan a comprender y tratar condiciones geriátricas en la Tierra. El experimento "Mouse Habitat Unit" de JAXA mantuvo ratones vivos en la ISS durante 35 días en 2016 y demostró que la gravedad artificial parcial (generada por centrifugación) prevenía parcialmente la pérdida ósea, un resultado con implicaciones directas para el diseño de futuras naves interplanetarias.',
      'El desarrollo de fármacos en el espacio se ha convertido en un campo comercial emergente. Empresas farmacéuticas como Merck, Eli Lilly y AstraZeneca han enviado experimentos a la ISS para estudiar la formulación de medicamentos en microgravedad. El anticuerpo monoclonal pembrolizumab (Keytruda) de Merck, utilizado en inmunoterapia contra el cáncer, fue cristalizado en la ISS en 2017, logrando cristales de mayor pureza que permitieron optimizar su formulación para inyección subcutánea en lugar de intravenosa, lo que simplifica su administración. La Estación Nacional de Laboratorio de la ISS (ISS National Lab) ha facilitado más de 500 proyectos de investigación con entidades comerciales desde 2011, generando datos que han contribuido a 12 patentes farmacéuticas registradas hasta 2023.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los telómeros de Scott Kelly —las "tapas" protectoras en los extremos de los cromosomas, que normalmente se acortan con la edad— se alargaron durante su año en el espacio, lo contrario de lo esperado. Sin embargo, al regresar a la Tierra, sus telómeros se acortaron rápidamente por debajo de los valores previos a la misión. Los investigadores creen que el alargamiento temporal pudo deberse al aumento de la enzima telomerasa como respuesta al estrés del vuelo espacial, seguido de un "rebote" al regresar a condiciones normales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bioimpresión 3D en el espacio es una realidad. En 2019, la empresa rusa 3D Bioprinting Solutions imprimió tejido de cartílago humano y una glándula tiroides de ratón a bordo de la ISS utilizando campos magnéticos para posicionar las células sin necesidad de un andamiaje de soporte (que sí se requiere en la Tierra por la gravedad). En 2022, la empresa Redwire imprimió un menisco de rodilla humano en la ISS con células madre. Estas tecnologías podrían permitir fabricar tejidos y órganos para trasplante directamente en el espacio durante misiones de larga duración.' },
    ],
    fact: 'El astronauta japonés Koichi Wakata realizó en 2009 un experimento de salud bucal en la ISS que reveló que la composición bacteriana de la saliva cambia en el espacio. Las bacterias Streptococcus mutans (principales causantes de caries) aumentaron su concentración en un 40% respecto a los valores prevuelos. La explicación involucra la redistribución de fluidos faciales, cambios en el flujo salival y la modificación del pH oral en microgravedad. Estos datos condujeron al desarrollo de protocolos de higiene dental mejorados que ahora incluyen enjuagues bucales antimicrobianos específicos como parte del kit médico obligatorio de cada tripulante.',
  },
];

// ─── Medical Particle Field (Canvas Background) ──────────────────────────────
function MedicalField() {
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

// ─── Space Medicine Header ───────────────────────────────────────────────────
function SpaceMedicineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Medical arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#medGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
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
        {/* Central cross icon */}
        <rect x="293" y="18" width="14" height="4" rx="2" fill="#C44B4B" opacity="0.6" />
        <rect x="298" y="13" width="4" height="14" rx="2" fill="#C44B4B" opacity="0.6" />
        <circle cx="300" cy="20" r="14" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.4" />
        <defs>
          <linearGradient id="medGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MEDICINA ESPACIAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CUERPO HUMANO EN ÓRBITA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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
          layoutId="activeDotAstroTrainM5"
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Render ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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

// ─── Progress Bar ─────────────────────────────────────────────────────────────
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

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_AstroTrainM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(20,12,18,0.8) 40%, rgba(10,10,15,0.88) 100%), url(/assets/astrotrain/astrotrain_m5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(196,75,75,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MedicalField />

      <SpaceMedicineHeader />

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
              🏆 ¡Has dominado los secretos de la Medicina Espacial!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Médico Espacial
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
