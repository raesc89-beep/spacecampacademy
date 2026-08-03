'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFluxCapacitor({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <path d="M30 30 L15 15 M30 30 L45 15 M30 30 L30 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="45" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="48" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DECO_MAP = {
  'proyecto-mercury': [DecoGear, DecoClockFace, DecoBolt],
  'friendship-7': [DecoFluxCapacitor, DecoAtomSvg, DecoBolt],
  'vuelo-orbital': [DecoWormhole, DecoTimeline, DecoClockFace],
  'reentrada-critica': [DecoBolt, DecoWormhole, DecoAtomSvg],
  'legado-glenn': [DecoTimeline, DecoAtomSvg, DecoGear],
};

const BIBLIOGRAPHY = [
  "Glenn, J. (1999). 'John Glenn: A Memoir', Bantam Books",
  "Swenson, L. S., Grimwood, J. M., & Alexander, C. C. (1966). 'This New Ocean: A History of Project Mercury', NASA",
  "Burgess, C. (2015). 'Faith 7: L. Gordon Cooper, Jr., and the Final Mercury Mission', Springer",
  "Wolfe, T. (1979). 'The Right Stuff', Farrar, Straus and Giroux",
  "Kranz, G. (2000). 'Failure Is Not an Option: Mission Control from Mercury to Apollo 13 and Beyond', Simon & Schuster",
  "Siddiqi, A. A. (2000). 'Challenge to Apollo: The Soviet Union and the Space Race, 1945–1974', NASA"
];

const INFOGRAPHIC_NODES = [
  {
    id: 'proyecto-mercury',
    title: 'Proyecto Mercury',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_john.jpg',
    image: '/assets/course/animales_pioneros/hero_john.jpg',
    content: [
      'El Proyecto Mercury representó el primer esfuerzo tripulado del programa espacial de los Estados Unidos, marcando un hito fundamental en la carrera espacial y sentando las bases tecnológicas, fisiológicas y operativas para la posterior exploración lunar. Su objetivo principal no solo era poner a un ser humano en órbita terrestre, sino también comprender de manera exhaustiva las capacidades de supervivencia y rendimiento humano bajo las extremas condiciones del espacio exterior, incluyendo la microgravedad, la alta aceleración y el aislamiento psicológico. La infraestructura de soporte vital, las redes de comunicaciones globales y las operaciones de recuperación oceánica que se desarrollaron durante este período formativo continúan influyendo en las metodologías de la exploración espacial moderna, sirviendo como arquetipo para misiones posteriores mucho más ambiciosas.',
      'Desde una perspectiva de ingeniería aeroespacial, el diseño de la cápsula Mercury supuso un desafío sin precedentes, requiriendo la miniaturización de sistemas críticos de telemetría, soporte vital y navegación dentro de un volumen interno extremadamente restringido. Los ingenieros de la incipiente NASA, liderados por el Grupo de Tareas Espaciales en el Centro de Investigación Langley, debieron innovar constantemente para garantizar redundancias de seguridad sin exceder los estrictos límites de masa impuestos por la capacidad de carga útil de los vehículos de lanzamiento disponibles en esa época, específicamente los cohetes Redstone y Atlas, originalmente diseñados como misiles balísticos intercontinentales y adaptados apresuradamente para transportar tripulación humana con las consiguientes modificaciones de fiabilidad.',
      'El riguroso proceso de selección y entrenamiento de los astronautas del programa Mercury, conocidos mundialmente como los Mercury Seven, estableció un estándar fisiológico y psicológico extraordinariamente alto que definiría el perfil del explorador espacial durante décadas. Los candidatos, exclusivamente pilotos de pruebas militares con vasta experiencia en aeronaves de alto rendimiento, fueron sometidos a regímenes de pruebas médicas y psicológicas que bordeaban los límites de la resistencia humana, simulando perfiles de aceleración extrema en centrifugadoras, descompresión súbita en cámaras de vacío y aislamiento sensorial prolongado, todo con el propósito de asegurar que poseían la resiliencia necesaria para afrontar contingencias imprevistas en un entorno donde el margen de error era absolutamente cero.',
      'La implementación de una red de seguimiento y comunicaciones de alcance verdaderamente global, la Mercury Space Flight Network (MSFN), constituyó un triunfo logístico y diplomático de la misma magnitud que los logros técnicos del vehículo espacial propiamente dicho. Esta red requería la instalación y coordinación en tiempo real de estaciones de rastreo por radar y antenas de telemetría en ubicaciones remotas alrededor del mundo, incluyendo instalaciones en Australia, Nigeria, España y diversas embarcaciones oceanográficas distribuidas estratégicamente. La capacidad de mantener contacto de voz y recibir datos biométricos y telemétricos críticos del vehículo en órbita fue esencial para la seguridad de la misión y el control operativo centralizado desde Cabo Cañaveral.',
      'La culminación de estos esfuerzos colosales no solo demostró la viabilidad del vuelo espacial tripulado, sino que también catalizó una transformación profunda en la educación, la industria y la percepción pública de la ciencia y la tecnología. El programa Mercury estimuló el desarrollo acelerado de disciplinas como la ciencia de los materiales, la informática de sistemas en tiempo real y la medicina aeroespacial, generando tecnologías derivadas que eventualmente encontrarían aplicaciones vitales en la vida cotidiana. Además, el programa unificó a la nación en torno a un objetivo audaz y pacífico, estableciendo un legado de innovación audaz, meticulosidad en la ingeniería aeroespacial y valor inquebrantable que pavimentaría el camino inevitable hacia el programa Apollo y, finalmente, el aterrizaje histórico en la superficie de la Luna.'
    ],
    expandables: [
      {
        label: 'La Carrera Espacial',
        icon: 'zap',
        text: 'El contexto geopolítico de la Guerra Fría fue el catalizador principal del Proyecto Mercury. La competencia ideológica y tecnológica entre Estados Unidos y la Unión Soviética transformó la exploración espacial en un escenario crucial para demostrar superioridad nacional. El lanzamiento del Sputnik y el vuelo de Gagarin intensificaron enormemente la presión política sobre la incipiente NASA.\n\nPara contrarrestar los éxitos soviéticos, el gobierno estadounidense movilizó recursos sin precedentes, fusionando centros de investigación militares y civiles bajo la égida de una agencia civil unificada. Esta concentración de talento científico, capacidad industrial y voluntad política generó avances tecnológicos que en tiempos de paz habrían requerido décadas de desarrollo iterativo.\n\nEl programa no solo impulsó la tecnología aeroespacial, sino que revolucionó la electrónica de consumo, los materiales compuestos y la gestión de proyectos a gran escala. Las técnicas de control de calidad y análisis de fiabilidad desarrolladas para garantizar la seguridad de los astronautas establecieron nuevos estándares industriales aplicados globalmente.\n\nAdemás del impacto tecnológico, el Proyecto Mercury transformó la diplomacia y las relaciones públicas. La decisión de Estados Unidos de realizar sus misiones espaciales bajo el escrutinio público mundial y los medios de comunicación contrastó marcadamente con el secreto soviético, convirtiendo cada lanzamiento en un evento televisivo global.\n\nEste enfoque abierto, aunque arriesgado ante posibles fracasos, cultivó una fascinación global por la exploración espacial y cimentó el apoyo público necesario para sostener los enormes presupuestos requeridos, sentando las bases sociopolíticas indispensables para el posterior e inmensamente más ambicioso Proyecto Apollo.'
      },
      {
        label: 'Ingeniería Extrema',
        icon: 'atom',
        text: 'El diseño de la cápsula Mercury exigió resolver problemas termodinámicos inéditos, siendo el más crítico la reentrada atmosférica. El concepto revolucionario del cuerpo romo (blunt body), desarrollado por H. Julian Allen, demostró que una forma convexa disiparía la inmensa energía cinética calentando el aire circundante en lugar de la estructura del vehículo, un principio fundamental aún utilizado.\n\nPara gestionar el calor residual, los ingenieros optaron por un escudo térmico ablativo compuesto de resinas de fibra de vidrio que se vaporizaba controladamente, llevando consigo el calor abrasador lejos de la nave. Esta solución, aunque elegante, requirió extensas pruebas en túneles de viento hipersónicos y vuelos suborbitales preliminares no tripulados para validar su integridad estructural bajo estrés extremo.\n\nLa miniaturización de componentes electrónicos, particularmente el uso de transistores en lugar de válvulas de vacío, fue imperativa para empaquetar sistemas de navegación, comunicaciones y soporte vital dentro del estrecho volumen útil de la cápsula. El diseño modular de los sistemas internos permitía un diagnóstico y reemplazo rápido de componentes defectuosos en la plataforma de lanzamiento.\n\nLa redundancia sistémica se convirtió en el dogma de la ingeniería aeroespacial tripulada. Cada sistema crítico poseía respaldos independientes manuales o automáticos. Por ejemplo, el sistema de control de actitud utilizaba dos redes de propulsores separadas alimentadas por peróxido de hidrógeno, asegurando que la nave pudiera orientarse correctamente para la reentrada incluso ante múltiples fallos.\n\nLa ergonomía del asiento moldeado a medida del astronauta fue crucial para mitigar los efectos debilitantes de las altas fuerzas G durante el despegue y la reentrada. Cada detalle, desde la ubicación de los interruptores hasta la visibilidad de los diales bajo intensas vibraciones, fue analizado microscópicamente para maximizar la eficacia del piloto en condiciones de estrés fisiológico extremo.'
      }
    ],
    fact: '¡De los 508 pilotos militares altamente cualificados que revisó la incipiente NASA en 1959, solo siete hombres superaron las infernales pruebas médicas y psicológicas para convertirse en los célebres Mercury Seven originales!'
  },
  {
    id: 'friendship-7',
    title: 'Friendship 7',
    color: '#D4B872',
    btnImage: '/assets/course/animales_pioneros/btn_john.jpg',
    image: '/assets/course/animales_pioneros/hero_john.jpg',
    content: [
      'La cápsula Friendship 7, pilotada por el astronauta John Glenn, se erige como una de las maravillas de la ingeniería aeroespacial más emblemáticas de la historia, siendo el vehículo que permitió a Estados Unidos alcanzar su primer vuelo orbital tripulado. Este ingenio tecnológico, designado oficialmente como Mercury-Atlas 6 (MA-6), poseía una forma cónica distintiva diseñada meticulosamente para optimizar la aerodinámica durante el brutal proceso de reentrada atmosférica. Con un diámetro máximo de apenas 1,89 metros en su base y una altura de 2,9 metros, el volumen presurizado interno era increíblemente claustrofóbico, equivalente al de una cabina telefónica, requiriendo que el astronauta estuviera prácticamente calzado a medida dentro de la estructura, rodeado de un panel de instrumentos extraordinariamente complejo y denso.',
      'El sistema de control de actitud de la Friendship 7, fundamental para mantener la orientación correcta del vehículo tanto en órbita como durante la crítica fase de reentrada, utilizaba un sofisticado sistema de retrocohetes y propulsores de peróxido de hidrógeno. A diferencia de las misiones suborbitales anteriores, el vuelo orbital requería una precisión absoluta en la alineación del escudo térmico antes de encender los motores de frenado; cualquier desviación de los ángulos calculados, incluso por unos pocos grados, podría resultar en un rebote contra las capas superiores de la atmósfera o en un ángulo de descenso excesivamente pronunciado que incineraría la nave. Glenn disponía de un sistema de control manual tipo "fly-by-wire", pionero en su época, que le permitía anular los sistemas automáticos en caso de un fallo informático, una redundancia que resultaría vital.',
      'El sistema de soporte vital ambiental (ECS) de la cápsula era una proeza de miniaturización y eficiencia de circuito cerrado, diseñado para mantener a Glenn con vida en el vacío letal del espacio durante un máximo de veintiocho horas, aunque la misión estaba planificada para solo unas cinco. Este sistema proporcionaba oxígeno puro a una presión de cinco libras por pulgada cuadrada, gestionaba rigurosamente la eliminación del dióxido de carbono mediante cartuchos de hidróxido de litio, y controlaba la humedad y la temperatura interna disipando el calor metabólico y de los equipos electrónicos hacia el espacio a través de un intercambiador de calor de agua. La integridad de este sistema era la delgada línea que separaba el éxito de la misión de una catástrofe inmediata.',
      'El vehículo de lanzamiento Atlas LV-3B, encargado de propulsar la Friendship 7 a velocidades orbitales, era un cohete de etapa y media originalmente concebido como un misil balístico intercontinental portador de cabezas nucleares. Adaptado para vuelos tripulados mediante la adición de un Sistema de Detección de Abortos (ASDS) diseñado para detectar anomalías catastróficas y activar la torre de escape en fracciones de segundo, el Atlas utilizaba una estructura de tanque de acero inoxidable extremadamente delgada que requería estar constantemente presurizada para no colapsar bajo su propio peso. Su propulsión, generada por una combinación de oxígeno líquido y queroseno refinado (RP-1), debía funcionar de manera impecable durante cinco infernales minutos de ascenso ininterrumpido.',
      'La denominación "Friendship 7", elegida personalmente por John Glenn, reflejaba no solo el espíritu de cooperación internacional que caracterizaba las aspiraciones pacíficas del programa espacial, sino que también incorporaba el número siete en honor a los siete astronautas originales del Proyecto Mercury, un símbolo de profunda camaradería. Cada detalle del vehículo, desde el periscopio óptico que le permitía observar la Tierra hasta el rudimentario pero eficaz sistema de grabación fisiológica, representaba el pináculo de la capacidad tecnológica y el ingenio humano de principios de los años sesenta, un testimonio perdurable de la tenacidad de los miles de ingenieros y técnicos que trabajaron incansablemente para garantizar que esta diminuta nave pudiera desafiar y vencer las formidables barreras del vuelo orbital.'
    ],
    expandables: [
      {
        label: 'Soporte Vital',
        icon: 'zap',
        text: 'El Sistema de Control Ambiental (ECS) de la cápsula Mercury era una maravilla de ingeniería de circuito cerrado diseñada para replicar un entorno terrestre habitable en el vacío hostil. Funcionando a una presión reducida de cinco libras por pulgada cuadrada con una atmósfera de oxígeno puro al cien por ciento, minimizó significativamente el peso estructural y previno el riesgo letal de la enfermedad por descompresión.\n\nEl control de la temperatura interna constituyó un desafío formidable, ya que el espacio fluctúa entre el frío del vacío y el calor radiante abrasador del sol. El sistema utilizaba un intercambiador de calor sublimador de agua porosa, que absorbía el calor metabólico del astronauta y de los equipos electrónicos, disipándolo al vacío exterior mediante la sublimación controlada de vapor de agua.\n\nLa gestión rigurosa del dióxido de carbono exhalado era crítica para prevenir la asfixia insidiosa. Se emplearon contenedores densamente empaquetados de hidróxido de litio, un compuesto químico que reacciona con el CO2 para formar carbonato de litio y agua, purificando eficientemente el aire reciclado que circulaba continuamente a través del traje presurizado del astronauta.\n\nEn caso de despresurización catastrófica de la cabina, el traje de presión a medida de Glenn, derivado de diseños de aviación a gran altitud y equipado con un casco sellado y un visor de plexiglás, actuaría como una nave espacial en miniatura, inflándose automáticamente y manteniendo la presión vital y el suministro de oxígeno de emergencia durante un tiempo limitado.\n\nLa monitorización fisiológica constante, pionera en telemedicina, transmitía continuamente electrocardiogramas, frecuencia respiratoria y temperatura corporal profunda a las estaciones terrestres, permitiendo a los médicos aeroespaciales evaluar en tiempo real la adaptación del astronauta a la microgravedad y anticipar cualquier anomalía médica severa.'
      },
      {
        label: 'El Cohete Atlas',
        icon: 'atom',
        text: 'El vehículo portador Atlas LV-3B, esencial para alcanzar la asombrosa velocidad orbital de 28,000 kilómetros por hora, representaba la cúspide de la tecnología de propulsión de la época, aunque originalmente fue concebido como un misil balístico intercontinental (ICBM) destinado a transportar ojivas termonucleares pesadas sobre distancias transoceánicas.\n\nSu diseño arquitectónico, denominado de "etapa y media", era excepcionalmente innovador. Constaba de dos motores propulsores laterales y un motor sustentador central que compartían un conjunto común de tanques de propelente. Durante el ascenso, los propulsores laterales se separaban para aligerar peso, mientras que el sustentador continuaba impulsando el vehículo hacia el vacío.\n\nLa característica más distintiva y arriesgada del Atlas era su estructura de "tanque globo". Las paredes del tanque de acero inoxidable eran más delgadas que una moneda de diez centavos, careciendo de soporte interno. Su integridad estructural dependía enteramente de estar presurizado con gas inerte; si la presión fallaba, el inmenso cohete colapsaría bajo su propio peso en la plataforma.\n\nAdaptar un misil diseñado para la destrucción en un vehículo calificado para tripulantes humanos requirió modificaciones exhaustivas para mejorar la fiabilidad sistémica. El desarrollo del Sistema de Detección de Abortos (ASDS), capaz de monitorear presiones, voltajes y vibraciones críticas, fue fundamental para activar la torre de escape en milisegundos si se detectaba una falla catastrófica inminente.\n\nLa propulsión se basaba en la violenta combustión de queroseno altamente refinado (RP-1) y oxígeno líquido criogénico (LOX). El manejo de LOX, que hierve a temperaturas extremadamente bajas, presentaba desafíos logísticos colosales en la plataforma de lanzamiento, requiriendo sistemas de purga continua que producían el característico y dramático penacho de vapor blanco alrededor del vehículo antes del despegue.'
      }
    ],
    fact: 'Las paredes del inmenso cohete Atlas eran tan increíblemente finas que tenían que mantenerse presurizadas constantemente con nitrógeno; si perdían presión, ¡todo el cohete colapsaría bajo su propio peso como un globo desinflado!'
  },
  {
    id: 'vuelo-orbital',
    title: 'El Vuelo Orbital',
    color: '#80DEEA',
    btnImage: '/assets/course/animales_pioneros/btn_john.jpg',
    image: '/assets/course/animales_pioneros/hero_john.jpg',
    content: [
      'El 20 de febrero de 1962, tras una serie de frustrantes y prolongados retrasos debidos a condiciones meteorológicas adversas y problemas técnicos minuciosamente evaluados, John Glenn hizo historia al convertirse en el primer estadounidense en orbitar el planeta Tierra. Propulsado por el ensordecedor rugido del cohete Atlas, la aceleración sometió a Glenn a fuerzas de hasta seis veces la gravedad terrestre, empujándolo violentamente contra su asiento moldeado a medida mientras atravesaba las capas más densas de la atmósfera. Al alcanzar la velocidad orbital crítica de aproximadamente 28.000 kilómetros por hora y apagar los motores principales, experimentó la transición repentina y desorientadora de la aceleración extrema a la ingravidez absoluta, marcando el inicio de su viaje alrededor del globo terráqueo a altitudes que variaban entre los 159 y 261 kilómetros.',
      'Durante su extraordinario trayecto orbital, que completó la circunvalación de la Tierra cada 88 minutos y medio, Glenn llevó a cabo un riguroso y meticuloso programa de observaciones científicas, pruebas médicas y comprobaciones de sistemas. Evaluó exhaustivamente su capacidad para orientarse y realizar tareas complejas en microgravedad, demostrando concluyentemente que el cuerpo y la mente humana podían funcionar eficientemente en el espacio sin los graves efectos perjudiciales que algunos fisiólogos habían pronosticado. Además, operó manualmente los propulsores de control de actitud de la nave, observó y fotografió formaciones meteorológicas detalladas, e hizo un seguimiento de su propio estado cardiovascular y respiratorio, transmitiendo un flujo constante de datos inestimables a los médicos e ingenieros en tierra.',
      'Uno de los fenómenos visuales más inesperados y enigmáticos documentados por Glenn durante sus órbitas fue la observación de lo que él describió poéticamente como "luciérnagas" o "estrellas brillantes" que rodeaban y acompañaban a la cápsula al amanecer orbital. Estos diminutos puntos luminosos, que se movían lentamente en un patrón arremolinado fuera de la ventana de su nave, generaron una considerable perplejidad y especulación inmediata tanto en el espacio como en el control de misión. Posteriormente, durante la misión de Scott Carpenter, se determinó de manera concluyente que estas misteriosas partículas no eran más que cristales de hielo procedentes del condensador de agua de la propia nave, sublimados al salir al vacío espacial y bellamente iluminados por los primeros rayos del sol al asomar por el horizonte terrestre.',
      'La navegación y el seguimiento de la nave Friendship 7 supusieron un desafío logístico de escala mundial, requiriendo la sincronización milimétrica de estaciones terrestres y buques de seguimiento a lo largo y ancho del ecuador. Mientras Glenn sobrevolaba la oscuridad del lado nocturno de la Tierra, las ciudades de Perth y Rockingham en Australia Occidental encendieron todas sus luces, creando un vasto y brillante patrón urbano que Glenn pudo observar claramente desde su elevada posición espacial, un gesto de solidaridad global que le valió a Perth el perdurable apodo de la "Ciudad de la Luz". Esta interacción demostró el profundo impacto unificador que el programa espacial estaba comenzando a ejercer sobre la población mundial, trascendiendo las fronteras políticas en medio de las tensiones de la Guerra Fría.',
      'La experiencia sensorial y psicológica del vuelo orbital de Glenn alteró fundamentalmente nuestra comprensión del lugar de la humanidad en el vasto cosmos. Desde su estrecho punto de vista, observó amaneceres y atardeceres orbitales espectaculares, describiendo la atmósfera terrestre como una frágil y delgada banda iridiscente que separaba la superficie brillante del planeta del vacío negro y absoluto del espacio exterior. Sus detalladas descripciones verbales y la inestimable evidencia fotográfica que recopiló no solo proporcionaron a los científicos datos atmosféricos cruciales, sino que también regalaron a la humanidad una perspectiva completamente nueva y profundamente conmovedora de nuestro propio y solitario mundo, sembrando las primeras semillas de una conciencia planetaria unificada y ecológica que florecería en las décadas siguientes.'
    ],
    expandables: [
      {
        label: 'Efectos Fisiológicos',
        icon: 'zap',
        text: 'Antes del vuelo orbital de Glenn, la comunidad médica mantenía serias aprehensiones sobre la viabilidad a largo plazo del organismo humano en el entorno antinatural de la microgravedad. Las teorías pesimistas sugerían que las funciones biológicas básicas, como la deglución y el peristaltismo intestinal, podrían paralizarse, y que el sistema cardiovascular no lograría bombear sangre eficazmente hacia el cerebro.\n\nDurante sus casi cinco horas de ingravidez, Glenn refutó contundentemente muchas de estas funestas predicciones. Demostró experimentalmente que la ingesta de alimentos semisólidos empaquetados en tubos compresibles, y la absorción de líquidos, eran fisiológicamente posibles y tolerables sin causar náuseas o complicaciones gástricas graves, un dato crucial para planificar misiones lunares prolongadas.\n\nSu agudeza visual y orientación espacial tampoco se vieron significativamente comprometidas por la ausencia de gravedad. Los médicos temían que la alteración en el oído interno o sistema vestibular provocara un mareo espacial incapacitante y desorientación letal. Sin embargo, Glenn reportó sentirse cómodo, manteniendo el sentido de dirección relativo a la nave y a la Tierra en todo momento.\n\nEl sistema cardiovascular humano demostró una asombrosa capacidad de adaptación aguda. Aunque los médicos monitorizaron meticulosamente sus trazados electrocardiográficos en busca de arritmias peligrosas inducidas por el estrés térmico o la ingravidez, su corazón mantuvo un ritmo regular, adaptándose rápidamente a la menor demanda física requerida para circular sangre en la ingravidez.\n\nSin embargo, el vuelo sí reveló sutiles cambios fisiológicos que motivaron investigaciones biomédicas posteriores, incluyendo la leve redistribución de fluidos corporales hacia la parte superior del cuerpo. Estas observaciones iniciales formaron la base empírica para desarrollar protocolos de ejercicio y contramedidas médicas que hoy mantienen saludables a los astronautas en la Estación Espacial Internacional.'
      },
      {
        label: 'Las Luciérnagas',
        icon: 'atom',
        text: 'El fenómeno visual inesperado de las brillantes "luciérnagas" o "copos de nieve luminiscentes", presenciado por John Glenn al salir de la sombra nocturna de la Tierra hacia el amanecer orbital, se convirtió instantáneamente en uno de los misterios científicos más comentados y poéticos de los primeros vuelos espaciales, generando innumerables conjeturas e hipótesis descabelladas.\n\nLa descripción precisa de Glenn relató miles de pequeñas partículas fluorescentes, de color amarillo verdoso brillante, moviéndose con una lenta y majestuosa velocidad relativa frente a la estrecha ventana de su nave, pareciendo arremolinarse caprichosamente. Este desconcertante espectáculo visual no estaba previsto en absoluto en ninguno de los exhaustivos perfiles teóricos de la misión orbital.\n\nInicialmente, la comunidad científica especuló fervientemente sobre diversas causas, desde exóticos fenómenos de luminiscencia atmosférica superior y partículas de polvo cósmico cargadas eléctricamente atrapadas en el campo magnético de la Tierra, hasta la desgasificación imprevista y potencialmente peligrosa de la pintura protectora o materiales sellantes del fuselaje exterior de la propia cápsula.\n\nEl enigma fue resuelto brillantemente durante la subsiguiente misión Aurora 7, comandada por el astronauta Scott Carpenter. Al golpear intencionadamente la pared interna de la cabina, Carpenter observó que una enorme nube de estas partículas luminosas se desprendía del exterior, confirmando de manera concluyente que el origen del fenómeno residía inequívocamente en la nave misma.\n\nLa explicación científica final determinó que el agua expulsada por el sistema de control ambiental de la nave se congelaba instantáneamente al contacto con el vacío espacial, formando diminutos cristales de hielo en el exterior. Al ser iluminados oblicuamente por los primeros rayos intensos de la luz solar en el amanecer orbital, estos cristales dispersaban la luz brillante, creando la efímera y hermosa ilusión.'
      }
    ],
    fact: 'John Glenn experimentó picos de gravedad de hasta 8G (ocho veces su propio peso) durante su dramática y aterradora reentrada, un nivel de aplastamiento físico que requería tensar todos sus músculos para no desmayarse instantáneamente.'
  },
  {
    id: 'reentrada-critica',
    title: 'Reentrada Crítica',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_john.jpg',
    image: '/assets/course/animales_pioneros/hero_john.jpg',
    content: [
      'A medida que la misión Friendship 7 se acercaba a su culminación tras completar con éxito dos órbitas completas, un sensor de telemetría defectuoso transmitió una señal de advertencia escalofriante al control de misión en Cabo Cañaveral, indicando que el escudo térmico de ablación de la nave podría haberse aflojado. El escudo térmico, un componente absolutamente crítico compuesto de resina de fibra de vidrio y diseñado para quemarse y disipar los miles de grados de calor generados por la fricción durante la reentrada atmosférica, estaba sujeto al vehículo mediante un paquete de retrocohetes atado con correas metálicas. Si la señal era precisa y el escudo se separaba prematuramente al descartar los retrocohetes antes de la reentrada, la cápsula y su ocupante serían vaporizados instantáneamente al impactar contra la atmósfera.',
      'El director de vuelo Christopher Kraft y su equipo de ingenieros de sistemas se enfrentaron a un dilema de vida o muerte de una complejidad abrumadora, requiriendo decisiones críticas basadas en datos ambiguos y potencialmente defectuosos. Tras consultas frenéticas y tensos debates sobre la validez de la señal del interruptor, decidieron alterar radicalmente el procedimiento de reentrada estándar. La orden transmitida a Glenn fue no expulsar el paquete de retrocohetes después del encendido de frenado, manteniendo las correas en su lugar con la desesperada esperanza de que la presión aerodinámica mantuviera el escudo térmico sujeto contra el fondo de la nave el tiempo suficiente para que el inmenso calor y las fuerzas G lo aseguraran firmemente en su posición durante la zambullida.',
      'La tensión alcanzó niveles agonizantes durante el período de ionización, un intervalo de varios minutos en los que la enorme barrera de plasma supercalentado que envuelve la nave bloquea absolutamente todas las comunicaciones por radio, creando un apagón de comunicaciones ensordecedor. En tierra, los controladores de vuelo y millones de personas en todo el mundo contuvieron el aliento mientras esperaban confirmar si Glenn había sobrevivido al infernal descenso. En el interior de la cápsula, Glenn experimentó un infierno visual y auditivo aterrador, observando grandes trozos de material del paquete de retrocohetes ardiendo, fundiéndose y pasando rápidamente por su pequeña ventana mientras la nave soportaba temperaturas superiores a los 1.600 grados Celsius y deceleraciones desgarradoras.',
      'El alivio fue palpable y explosivo cuando la voz inconfundible de John Glenn rompió finalmente el profundo silencio del apagón de comunicaciones, informando con extraordinaria calma que el vehículo estaba intacto y que el drogue de estabilización y el paracaídas principal se habían desplegado exitosamente. El aterrizaje oceánico, o amerizaje, se produjo de manera precisa y segura en las agitadas aguas del Atlántico, a unos mil trescientos kilómetros al sureste de las Bermudas. Las operaciones de recuperación, lideradas por el destructor de la Armada de los Estados Unidos USS Noa, se ejecutaron con una eficiencia impecable, izando la cápsula a bordo y concluyendo victoriosamente una de las misiones espaciales más dramáticas, tensas y definitorias de toda la era Mercury.',
      'Las investigaciones exhaustivas y los meticulosos análisis post-vuelo confirmaron irrefutablemente que el problema había sido causado íntegramente por un microinterruptor eléctrico defectuoso en el sistema de instrumentación, y que el escudo térmico de ablación había permanecido firmemente asegurado en su posición correcta durante todo el transcurso de la misión. Esta experiencia aterradora pero finalmente exitosa validó de forma espectacular la decisión de diseñar el sistema con control manual, destacando el valor incalculable de tener un piloto humano altamente capacitado capaz de analizar, adaptar y gestionar contingencias operativas imprevistas. Este evento crucial influyó decisivamente en la filosofía de diseño y los protocolos operativos de las futuras naves espaciales Gemini y Apollo, priorizando siempre la intervención y el control humano activo sobre la automatización total.'
    ],
    expandables: [
      {
        label: 'Control de Misión',
        icon: 'zap',
        text: 'La dramática crisis del escudo térmico experimentada durante la misión Friendship 7 representó el bautismo de fuego absoluto para el incipiente concepto del Control de Misión centralizado. Dirigido magistralmente por el legendario Director de Vuelo Christopher Kraft, este equipo interdisciplinario pionero tuvo que forjar metodologías operativas críticas para la resolución de emergencias espaciales letales en tiempo real.\n\nLa estructura organizativa implementada por Kraft delegaba la monitorización de sistemas específicos a ingenieros altamente especializados, denominados controladores de vuelo. En este incidente, el Oficial de Sistemas y Medio Ambiente y el Oficial de Retrocohetes detectaron el fallo telemétrico y analizaron exhaustivamente las terribles implicaciones termodinámicas de una separación prematura del escudo protector.\n\nLa toma de decisiones en el Centro de Control del Proyecto Mercury operaba bajo una intensa presión psicológica, requiriendo equilibrar la confianza en instrumentación potencialmente defectuosa frente al juicio humano e intuición de ingeniería. La decisión unánime de Kraft de alterar el protocolo de reentrada inyectando una maniobra no probada fue un acto de audacia y genialidad operativa sin precedentes.\n\nLa comunicación con la nave espacial durante la emergencia ilustró los complejos protocolos de flujo de información. Para evitar alarmar prematuramente al piloto y mantener su concentración operativa, el Control de Misión inicialmente interrogó a Glenn sobre el estado del interruptor de despliegue mediante preguntas indirectas, antes de ordenarle directamente mantener el paquete de retrocohetes asegurado.\n\nEl éxito absoluto en la gestión de esta crisis potencialmente fatal validó innegablemente el modelo operativo del Control de Misión, estableciendo la premisa fundamental de que un equipo terrestre excepcionalmente capacitado y coordinado, trabajando en perfecta simbiosis con el astronauta a bordo, es absolutamente indispensable para garantizar la seguridad y supervivencia en la exploración humana del espacio profundo.'
      },
      {
        label: 'Reentrada Térmica',
        icon: 'atom',
        text: 'El proceso físico de la reentrada atmosférica es indiscutiblemente la fase más violenta, destructiva y exigente desde el punto de vista de la termodinámica aplicada de cualquier misión espacial orbital. Al reingresar a la tenue atmósfera superior a velocidades hipersónicas cercanas a Mach 25, la inmensa energía cinética orbital de la nave debe ser disipada íntegramente mediante fricción y compresión aerodinámica.\n\nContrariamente a la creencia popular, el calor extremo no se genera principalmente por la fricción directa del aire contra el casco, sino por la brutal compresión del gas inmediatamente frente a la trayectoria de vuelo de la cápsula. Esta onda de choque supercalentada se convierte en un plasma ionizado que envuelve el vehículo, alcanzando temperaturas superficiales que superan fácilmente el punto de fusión de los metales convencionales.\n\nEl escudo ablativo de la Friendship 7, el salvavidas físico de Glenn, empleaba el principio de la ablación térmica. Fabricado con un intrincado compuesto de resinas de fibra de vidrio y materiales elastoméricos, estaba diseñado para carbonizarse deliberadamente y desprenderse microscópicamente bajo el intenso calor, arrastrando eficazmente la inmensa energía térmica lejos del casco estructural presurizado de la nave.\n\nLa envoltura de plasma ionizado generada durante esta deceleración infernal actúa simultáneamente como una barrera electromagnética impenetrable que bloquea absolutamente todas las comunicaciones por radiofrecuencia (RF) bidireccionales entre la nave espacial y las estaciones terrestres de seguimiento, provocando el tenso e infame período de silencio operativo conocido como "apagón de comunicaciones" (blackout).\n\nLas fuerzas de deceleración experimentadas por el piloto, las fuerzas G, alcanzan picos extremos durante la reentrada balística. Glenn soportó una compresión prolongada de casi ocho veces la fuerza de gravedad estándar (8G), una fuerza física abrumadora que requiere una condición cardiovascular excepcional, entrenamiento en técnicas de respiración a presión y un traje G especializado para evitar la pérdida de consciencia letal.'
      }
    ],
    fact: 'La nave Friendship 7 estaba controlada por un ordenador tan rudimentario y primitivo en comparación con los actuales, que un reloj inteligente moderno de muñeca tiene literalmente cientos de miles de veces más potencia de procesamiento.'
  },
  {
    id: 'legado-glenn',
    title: 'Legado de Glenn',
    color: '#2C3E50',
    btnImage: '/assets/course/animales_pioneros/btn_john.jpg',
    image: '/assets/course/animales_pioneros/hero_john.jpg',
    content: [
      'El legado perdurable e inspirador de John Glenn y su monumental vuelo orbital trasciende ampliamente los inmensos logros técnicos y científicos que caracterizaron al Proyecto Mercury, consolidándolo como una figura verdaderamente legendaria e icónica en los anales de la historia de la exploración espacial mundial. Su vuelo en la Friendship 7 restauró en un momento crítico la confianza nacional e internacional en las incipientes capacidades del programa espacial de los Estados Unidos, proporcionando un contrapeso psicológico vital y enormemente necesario a los formidables y tempranos éxitos soviéticos, como el histórico vuelo orbital de Yuri Gagarin. Glenn se convirtió instantáneamente en un símbolo imperecedero de valor inquebrantable, dedicación patriótica y competencia profesional suprema, atributos que definieron profundamente la percepción del astronauta en la era dorada del espacio.',
      'Más allá de su estatus heroico como astronauta pionero, Glenn canalizó su vasta experiencia técnica y su profundo compromiso cívico en una dilatada y extraordinariamente influyente carrera política, sirviendo durante más de dos décadas como Senador de los Estados Unidos por el estado de Ohio. En el complejo escenario legislativo, se erigió como un firme, articulado e incansable defensor de la inversión sostenida y significativa en investigación científica básica, la exploración espacial audaz, el fortalecimiento de la educación pública en ciencias y matemáticas y el avance incesante de la tecnología como motores fundamentales del progreso, la prosperidad económica a largo plazo y el liderazgo global ininterrumpido del país en una era cada vez más tecnológica y competitiva.',
      'En un asombroso y sin precedentes retorno al escenario espacial, John Glenn hizo historia una vez más en 1998 cuando, a la notable edad de setenta y siete años, voló a bordo del Transbordador Espacial Discovery en la misión STS-95. Este segundo y extraordinario viaje espacial, además de su indudable valor simbólico e inspirador que capturó nuevamente la imaginación del público mundial, tuvo un propósito científico altamente riguroso y focalizado: investigar profundamente las sorprendentes y complejas similitudes fisiológicas observadas entre los efectos biológicos del envejecimiento humano natural en la Tierra y el rápido deterioro muscular, óseo y del sistema inmunológico experimentado por los astronautas durante misiones prolongadas en entornos de microgravedad, aportando datos biomédicos de un valor incalculable.',
      'La vida de John Glenn representa de manera inmejorable la asombrosa trayectoria del progreso tecnológico y el indomable espíritu de exploración humana a lo largo del siglo XX. Desde sus primeros días volando intrépidamente aviones de combate a hélice durante los intensos conflictos de la Segunda Guerra Mundial y la Guerra de Corea, pasando por su labor como arriesgado piloto de pruebas supersónico empujando los límites de la aviación aeronáutica, hasta culminar en sus dos viajes espaciales históricos que enmarcaron prácticamente toda la historia del programa de vuelos espaciales tripulados estadounidenses. Su carrera singularmente notable encarna la evolución espectacular de la aviación atmosférica hasta la exploración profunda del espacio, demostrando una inquebrantable dedicación al servicio público y a la expansión continua y valiente de los horizontes del conocimiento humano.',
      'El espíritu intrépido y pionero, la excepcional competencia profesional y la profunda integridad personal que caracterizaron indeleblemente cada una de las misiones y responsabilidades asumidas por John Glenn continúan sirviendo como un modelo de inspiración perdurable y extraordinariamente poderoso para las sucesivas generaciones de astronautas, ingenieros aeroespaciales y exploradores científicos en todo el mundo. A medida que la humanidad vuelve su mirada audaz hacia horizontes cada vez más distantes y desafiantes en las vastas profundidades del sistema solar, preparándose para establecer presencias permanentes en la superficie lunar y lanzar misiones tripuladas sin precedentes a Marte, los valiosos precedentes operativos, fisiológicos y de ingeniería establecidos por el vuelo de la Friendship 7 y el temple demostradamente inquebrantable del hombre que la pilotó seguirán siendo los cimientos sobre los cuales se construirá invariablemente nuestro asombroso futuro cósmico.'
    ],
    expandables: [
      {
        label: 'Impacto Cultural',
        icon: 'zap',
        text: 'El monumental vuelo orbital de John Glenn ejerció un impacto catalítico, profundo e inmediato sobre la psique cultural, la política nacional y la dirección tecnológica de los Estados Unidos durante el tenso e impredecible apogeo de la Guerra Fría. En una nación ansiosa y vulnerable tras los triunfos espaciales soviéticos iniciales, el éxito resonante de Glenn proporcionó una inyección indispensable de euforia patriótica y renovada confianza.\n\nLa inmensa escala de la aclamación pública recibida por Glenn no tuvo precedentes en la historia reciente, evidenciada dramáticamente por el masivo desfile de teletipos a lo largo del icónico Cañón de los Héroes en Nueva York. Este desbordamiento de admiración colectiva lo transformó instantáneamente de un condecorado piloto de combate en un héroe nacional casi mítico, la encarnación misma de los ideales del coraje, la innovación y la destreza estadounidense.\n\nEl efecto inspirador del programa Mercury estimuló un profundo renacimiento y una masiva reinversión gubernamental en los currículos educativos de ciencias, matemáticas e ingeniería (STEM) a lo largo y ancho del país. La figura de Glenn, proyectando una imagen de competencia científica absoluta y serena determinación, motivó directamente a una generación entera de jóvenes estudiantes a seguir con pasión carreras en disciplinas científico-tecnológicas.\n\nEn el complejo ámbito de la geopolítica internacional, el éxito innegable de la misión Friendship 7 demostró al mundo, y particularmente a las naciones no alineadas, que el programa espacial estadounidense, aunque fuertemente ligado a la competencia ideológica militar, estaba inexorablemente comprometido con la exploración científica pacífica, abierta y transparente, estableciendo un agudo contraste moral con el secretismo soviético.\n\nEl legado cultural imperecedero de Glenn se materializó de innumerables maneras, permeando la literatura, el cine y el discurso público, consolidando permanentemente la figura del astronauta como la máxima expresión del explorador moderno de fronteras desconocidas. Su vuelo inscribió indeleblemente en la conciencia global la convicción audaz de que el destino final y natural de la humanidad se encuentra en las vastas y prometedoras profundidades del espacio cósmico.'
      },
      {
        label: 'El Regreso en el Discovery',
        icon: 'atom',
        text: 'La asombrosa participación de John Glenn en la misión STS-95 del Transbordador Espacial Discovery en 1998, volando valientemente a la edad récord de setenta y siete años, constituyó un evento histórico sin parangón que fusionó brillantemente el profundo simbolismo del legado pionero con investigaciones biomédicas geriátricas de vanguardia y absoluto rigor científico.\n\nEl principal objetivo científico y médico de su inclusión excepcional en la tripulación fue investigar exhaustiva y meticulosamente las fascinantes, aunque deletéreas, similitudes fisiológicas que existen entre el proceso de envejecimiento natural de los ancianos en la Tierra y las patologías de degradación rápida experimentadas por los astronautas sanos expuestos a periodos prolongados de microgravedad.\n\nDurante su estancia de nueve días en la compleja órbita terrestre, Glenn sirvió voluntariamente como sujeto principal y operador meticuloso de una elaborada batería de rigurosos experimentos fisiológicos, metabólicos e inmunológicos. Estos ensayos monitorizaron y analizaron en detalle alteraciones críticas en sus ritmos circadianos, la pérdida acelerada de masa ósea, el metabolismo alterado de proteínas musculares y el funcionamiento deprimido del sistema inmunológico en el espacio.\n\nLos valiosísimos datos empíricos recolectados de su propio organismo, comparados con meticulosos análisis de referencia pre-vuelo realizados décadas antes y en tierra firme, proporcionaron a los gerontólogos y médicos aeroespaciales información invaluable e irremplazable sobre los misteriosos mecanismos celulares del envejecimiento, acelerando el desarrollo de prometedoras contramedidas tanto para astronautas en misiones marcianas futuras como para mejorar la calidad de vida de los ancianos en la Tierra.\n\nMás allá del innegable valor biomédico, el espectacular y exitoso regreso al espacio de uno de los Siete de Mercury originales sirvió como un testimonio verdaderamente poderoso y universal sobre la inagotable vitalidad, la curiosidad intelectual insaciable y el inmenso potencial continuo de las personas mayores. Demostró categórica e inspiradoramente al mundo que la pasión por el descubrimiento científico, la aventura intelectual y el servicio público no disminuyen en absoluto con la edad avanzada.'
      }
    ],
    fact: '¡John Glenn posee el asombroso récord mundial de ser la persona de mayor edad en viajar al espacio, logrando esta hazaña a los 77 años a bordo del Transbordador Discovery en 1998, 36 años después de su primer vuelo!'
  }
];

function OrbitField() {
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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
      gearSize: Math.random() * 3 + 1,
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
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
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

function OrbitHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 5 }, (_, i) => {
          const t = (i + 1) / 6;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB','#2C3E50'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <path d="M300 22 l1 2 a10 10 0 0 1 2 1 l2 -1 l2 2 l-1 2 a10 10 0 0 1 1 2 l2 1 l-2 2 l-1 2 a10 10 0 0 1 -2 1 l-2 1 l-2 -2 l-1 -2 a10 10 0 0 1 -1 -2 l-2 -1 l2 -2 z" fill="none" stroke="#D87D4A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="10" fill="none" stroke="#D87D4A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#D87D4A" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">JOHN GLENN Y EL MERCURY</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LOS PRIMEROS ORBITALES</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotPionerosM3"
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
  
  // Rule: each section/expandable MUST have exactly 5 paragraphs
  const paragraphs = item.text.split('\n\n');

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
            {paragraphs.map((para, i) => (
               <p key={i} style={{
                 margin: '0 0 0.8rem 0', fontSize: '0.9rem', lineHeight: 1.75,
                 color: 'rgba(255,255,255,0.85)',
                 borderLeft: `3px solid ${color}30`,
                 paddingLeft: '0.8rem',
               }}>
                 {para}
               </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>

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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_PionerosM3() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <OrbitField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <OrbitHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {!activeNode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}
          >
            Toca cada círculo para explorar
          </motion.p>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
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

        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(216,125,74,0.1), rgba(128,222,234,0.1))',
                borderRadius: '16px', border: '1px solid rgba(216,125,74,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#D87D4A', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                🏆 ¡Has completado la Misión de Pioneros Orbitales!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado toda la información sobre John Glenn y el Proyecto Mercury.
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#D87D4A', color: '#0B0E2D',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(216,125,74,0.4)'
              }}>
                Continuar <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#D87D4A', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
