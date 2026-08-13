'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Women in Science themed) ————————————————————
function DecoMicroscope({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Eyepiece */}
      <rect x="27" y="4" width="6" height="10" rx="2" fill={color} opacity="0.4" />
      {/* Tube */}
      <rect x="28" y="14" width="4" height="20" fill={color} opacity="0.3" />
      {/* Objective lens */}
      <circle cx="30" cy="36" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Stage */}
      <rect x="18" y="40" width="24" height="3" rx="1" fill={color} opacity="0.4" />
      {/* Base */}
      <path d="M15 50 Q30 46 45 50 L42 54 L18 54 Z" fill={color} opacity="0.3" />
      {/* Light rays */}
      <line x1="30" y1="43" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="25" y1="44" x2="22" y2="50" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="35" y1="44" x2="38" y2="50" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* DNA double helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Rungs */}
      <line x1="24" y1="10" x2="36" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="18" x2="42" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="25" x2="40" y2="25" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="33" x2="42" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="40" x2="40" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="48" x2="36" y2="48" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Base pair dots */}
      <circle cx="30" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="25" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="40" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#66BB6A', style = {} }) {
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

function DecoNobel({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medal circle */}
      <circle cx="30" cy="28" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="28" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star in medal */}
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = ((a - 90) * Math.PI) / 180;
        const x = 30 + 7 * Math.cos(rad);
        const y = 28 + 7 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity="0.5" />;
      })}
      <circle cx="30" cy="28" r="3" fill={color} opacity="0.3" />
      {/* Ribbon */}
      <path d="M22 44 L30 38 L38 44" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="22" y1="44" x2="20" y2="54" stroke={color} strokeWidth="2" opacity="0.3" />
      <line x1="38" y1="44" x2="40" y2="54" stroke={color} strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

function DecoRadiation({ size = 70, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Trefoil radiation symbol */}
      <circle cx="30" cy="30" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {[0, 120, 240].map((a, i) => {
        const rad1 = ((a - 30) * Math.PI) / 180;
        const rad2 = ((a + 30) * Math.PI) / 180;
        return (
          <path key={i}
            d={`M ${30 + 8 * Math.cos(rad1)} ${30 + 8 * Math.sin(rad1)} A 18 18 0 0 1 ${30 + 8 * Math.cos(rad2)} ${30 + 8 * Math.sin(rad2)} L ${30 + 22 * Math.cos(((a) * Math.PI) / 180)} ${30 + 22 * Math.sin(((a) * Math.PI) / 180)} Z`}
            fill={color} opacity="0.2" stroke={color} strokeWidth="0.8"
          />
        );
      })}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function DecoScale({ size = 80, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      {/* Balance scale - justice/equality */}
      <line x1="40" y1="6" x2="40" y2="44" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Beam */}
      <line x1="12" y1="18" x2="68" y2="18" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Fulcrum triangle */}
      <path d="M36 10 L40 4 L44 10" fill={color} opacity="0.3" />
      {/* Left pan */}
      <path d="M8 18 Q10 30 20 30 Q24 30 24 18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Right pan */}
      <path d="M56 18 Q58 30 68 30 Q72 30 72 18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Base */}
      <rect x="30" y="44" width="20" height="3" rx="1.5" fill={color} opacity="0.3" />
      {/* Decorative dots */}
      <circle cx="16" cy="24" r="1.5" fill={color} opacity="0.4" />
      <circle cx="64" cy="24" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'barreras-historicas': [DecoScale, DecoNobel, DecoMicroscope],
  'irene-joliot-curie': [DecoRadiation, DecoAtomSvg, DecoNobel],
  'lise-meitner': [DecoAtomSvg, DecoRadiation, DecoScale],
  'rosalind-franklin': [DecoHelix, DecoMicroscope, DecoAtomSvg],
  'chien-shiung-wu': [DecoAtomSvg, DecoNobel, DecoRadiation],
  'mujeres-nobel-ciencias': [DecoNobel, DecoScale, DecoMicroscope],
  'efecto-marie-curie': [DecoRadiation, DecoHelix, DecoScale],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Quinn, S. (1995). Marie Curie: A Life, Simon & Schuster',
  'McGrayne, S.B. (1993). Nobel Prize Women in Science: Their Lives, Struggles, and Momentous Discoveries, Birch Lane Press',
  'Maddox, B. (2002). Rosalind Franklin: The Dark Lady of DNA, HarperCollins',
  'Chiang, T.-C. (2014). Madame Wu Chien-Shiung: The First Lady of Physics Research, World Scientific',
  'Sime, R.L. (1996). Lise Meitner: A Life in Physics, University of California Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'barreras-historicas',
    title: 'Barreras Históricas',
    color: '#4CAF50',
    btnImage: '/assets/marie_curie/infographic_m4/btn_barreras-historicas.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_barreras-historicas.jpg',
    content: [
      'Durante la mayor parte de la historia occidental, las mujeres fueron excluidas de las universidades, las academias científicas y los laboratorios profesionales. En 1732, la física italiana Laura Bassi se convirtió en la segunda mujer en el mundo en obtener un doctorado universitario y la primera en conseguir un puesto como profesora de física en la Universidad de Bolonia, pero su caso fue una rarísima excepción que no se repetiría durante más de un siglo. Las universidades de Oxford y Cambridge no otorgaron títulos completos a mujeres hasta 1920 y 1948 respectivamente, y la École Polytechnique de París no admitió alumnas hasta 1972.',
      'La Real Sociedad de Londres, fundada en 1660 como una de las instituciones científicas más antiguas del mundo, no admitió mujeres hasta 1945, casi tres siglos después de su fundación. La Academia Francesa de Ciencias rechazó la candidatura de Marie Curie en 1911 por dos votos, a pesar de que ya había ganado dos Premios Nobel, eligiendo en su lugar al físico Édouard Branly. La Academia no admitiría a su primera mujer miembro, la física Yvonne Choquet-Bruhat, hasta 1979, sesenta y ocho años después del rechazo de Curie.',
      'El problema no era solo institucional sino también legal. En muchos países europeos durante el siglo XIX y principios del XX, las mujeres casadas no podían firmar contratos, abrir cuentas bancarias ni registrar patentes sin el permiso de sus esposos. Esto significaba que sus descubrimientos científicos podían ser legalmente atribuidos a sus maridos o supervisores masculinos. La matemática Emmy Noether, considerada por Einstein como la mujer más relevante en la historia de las matemáticas, trabajó sin salario en la Universidad de Gotinga durante cuatro años porque las regulaciones prohibían que una mujer ocupara un puesto académico remunerado.',
      'Las barreras también eran sociales y culturales. Hasta bien entrado el siglo XX, se enseñaba activamente que el cerebro femenino era biológicamente incapaz de razonamiento científico avanzado. El psicólogo Edward Clarke de Harvard publicó en 1873 el libro "Sex in Education", argumentando que la educación rigurosa dañaría los órganos reproductivos de las mujeres. Este tipo de pseudociencia fue utilizada durante décadas como justificación para limitar el acceso de las mujeres a la educación superior y a carreras en investigación.',
      'A pesar de todas estas restricciones, mujeres como Émilie du Châtelet tradujeron y ampliaron los Principia de Newton en el siglo XVIII, Caroline Herschel descubrió ocho cometas y fue la primera mujer en recibir un salario como astrónoma real en 1787, y Ada Lovelace escribió el primer algoritmo computacional en 1843. Estas pioneras sentaron las bases para que Marie Curie pudiera abrir definitivamente las puertas de la ciencia profesional a las mujeres en el siglo XX, demostrando que las barreras eran sociales, no intelectuales.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Marie Curie llegó a París en 1891, la Sorbona tenía 9.000 estudiantes, de los cuales solo 210 eran mujeres, un 2,3%. Marie fue una de solo dos mujeres en la facultad de ciencias. Hoy, en Francia, las mujeres representan el 55% de los estudiantes universitarios, pero solo el 28% en carreras de ingeniería y el 30% en informática, lo que muestra que las barreras han cambiado de forma pero no han desaparecido por completo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en 2012 por la revista Proceedings of the National Academy of Sciences demostró que, cuando se presentaban solicitudes de trabajo idénticas para un puesto de laboratorio con un nombre femenino o masculino, los profesores de ambos sexos calificaban al candidato masculino como más competente y le ofrecían un salario inicial un 12% más alto. Este fenómeno se conoce como sesgo implícito de género y persiste en muchas instituciones científicas actuales.' },
    ],
    fact: 'La filósofa Hipatia de Alejandría (c. 355–415 d.C.) fue directora de la escuela neoplatónica de esa ciudad y realizó contribuciones en matemáticas, astronomía e ingeniería hidráulica. Fue asesinada por una turba en el año 415. Desde su muerte hasta que Laura Bassi obtuvo su cátedra en Bolonia en 1732, transcurrieron más de 1.300 años en los que prácticamente ninguna mujer ocupó un puesto académico oficial en Europa occidental.',
  },
  {
    id: 'irene-joliot-curie',
    title: 'Irène Joliot-Curie',
    color: '#6A1B9A',
    btnImage: '/assets/marie_curie/infographic_m4/btn_irene-joliot-curie.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_irene-joliot-curie.jpg',
    content: [
      'Irène Curie nació el 12 de septiembre de 1897 en París, hija de Marie y Pierre Curie. Creció rodeada de ciencia: su abuelo paterno, Eugène Curie, médico comprometido que vivía con la familia, fue quien se encargó de su educación temprana mientras sus padres trabajaban en el laboratorio. Marie diseñó para Irène y otros hijos de colegas científicos una escuela cooperativa donde Paul Langevin enseñaba matemáticas, Jean Perrin daba clases de química y la propia Marie impartía física. Este modelo educativo único expuso a Irène desde los diez años a algunos de los mejores científicos de Francia.',
      'Durante la Primera Guerra Mundial, con solo diecisiete años, Irène acompañó a su madre al frente de batalla para operar equipos de radiografía portátil, las llamadas "Petites Curies". Entre 1914 y 1918, madre e hija trabajaron juntas realizando radiografías a soldados heridos para localizar balas y fragmentos de metralla antes de las cirugías. Irène operó equipos de rayos X de forma independiente en varios hospitales de campaña cerca del frente, exponiéndose a dosis significativas de radiación que probablemente contribuyeron a su muerte posterior por leucemia.',
      'En 1926, Irène se casó con Frédéric Joliot, un asistente de investigación en el Instituto del Radio dirigido por Marie Curie. Ambos adoptaron el apellido compuesto Joliot-Curie. Juntos comenzaron a investigar la estructura del átomo, bombardeando elementos ligeros como el boro y el aluminio con partículas alfa provenientes del polonio, el mismo elemento que Marie había descubierto. Su colaboración científica era complementaria: Irène tenía una formación experimental rigurosa heredada de su madre, mientras que Frédéric aportaba una capacidad analítica y teórica que les permitía interpretar sus resultados de forma original.',
      'En enero de 1934, Irène y Frédéric Joliot-Curie realizaron el descubrimiento que les otorgaría el Premio Nobel de Química en 1935: la radioactividad artificial. Demostraron que al bombardear aluminio (número atómico 13) con partículas alfa, se producía un nuevo isótopo de fósforo (fósforo-30) que era radioactivo y no existía en la naturaleza. Por primera vez en la historia, los seres humanos habían creado un elemento radioactivo que no se encontraba naturalmente en el planeta. Este avance abrió la puerta a la producción de isótopos radiactivos para medicina nuclear y diagnóstico por imagen.',
      'Marie Curie vivió lo suficiente para presenciar este descubrimiento, falleciendo el 4 de julio de 1934, apenas seis meses después. Con el Nobel de Irène en 1935, la familia Curie acumuló un total de cinco Premios Nobel: dos de Marie, uno de Pierre, uno de Irène y uno de Frédéric. Es la familia con más Premios Nobel en la historia. Irène también fue nombrada Subsecretaria de Estado de Investigación Científica en el gobierno del Frente Popular de Francia en 1936, convirtiéndose en una de las primeras mujeres en ocupar un cargo ministerial en Francia. Murió el 17 de marzo de 1956, a los 58 años, de leucemia causada por la exposición a la radiación durante su trabajo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Irène y Frédéric estuvieron a punto de descubrir el neutrón en 1932 pero interpretaron incorrectamente sus resultados experimentales. Observaron que la radiación emitida al bombardear berilio con partículas alfa arrancaba protones de la parafina, pero concluyeron que se trataba de rayos gamma de alta energía. James Chadwick, en Cambridge, leyó su artículo, repitió el experimento y demostró que las partículas eran neutrones, ganando el Nobel de Física en 1935, el mismo año que los Joliot-Curie ganaron el de Química.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radioactividad artificial descubierta por los Joliot-Curie es la base de la medicina nuclear moderna. Hoy se producen más de 40 millones de procedimientos de medicina nuclear al año en todo el mundo, utilizando isótopos radiactivos artificiales como el tecnecio-99m para diagnóstico por imagen, el yodo-131 para tratar el cáncer de tiroides, y el flúor-18 para tomografías PET que detectan tumores. Cada uno de estos procedimientos existe gracias a aquel experimento de 1934 con aluminio y partículas alfa.' },
    ],
    fact: 'Los cuadernos de laboratorio de Marie Curie, heredados por Irène, siguen siendo altamente radioactivos más de 90 años después de ser escritos. Se conservan en cajas forradas de plomo en la Biblioteca Nacional de Francia en París. Cualquier persona que desee consultarlos debe firmar una exención de responsabilidad y usar equipo de protección, incluyendo guantes y bata. Las páginas están contaminadas con radio-226, que tiene una vida media de 1.600 años, por lo que seguirán siendo peligrosas durante miles de años más.',
  },
  {
    id: 'lise-meitner',
    title: 'Lise Meitner',
    color: '#66BB6A',
    btnImage: '/assets/marie_curie/infographic_m4/btn_lise-meitner.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_lise-meitner.jpg',
    content: [
      'Lise Meitner nació el 7 de noviembre de 1878 en Viena, Austria, en una familia judía de clase media. Austria no permitía a las mujeres asistir a instituciones de educación superior, por lo que Meitner tuvo que prepararse de forma privada para los exámenes de ingreso a la Universidad de Viena, donde fue admitida en 1901 como una de las pocas mujeres de la facultad de ciencias. Estudió física bajo la tutela de Ludwig Boltzmann, uno de los fundadores de la mecánica estadística, quien la inspiró con su rigor matemático. En 1906, obtuvo su doctorado en física, siendo apenas la segunda mujer en lograrlo en la Universidad de Viena.',
      'En 1907, Meitner se trasladó a Berlín para estudiar con Max Planck, el padre de la teoría cuántica. Allí conoció al químico Otto Hahn, con quien inició una colaboración científica que duraría treinta años. Sin embargo, las condiciones eran humillantes: el director del Instituto de Química, Emil Fischer, prohibía la presencia de mujeres en el edificio, por lo que Meitner tuvo que instalar su laboratorio en un sótano con acceso separado y sin permiso para usar los baños del piso principal. Durante sus primeros años, trabajó sin salario oficial, manteniéndose con una pequeña asignación de su padre en Viena.',
      'A lo largo de tres décadas, Meitner y Hahn realizaron investigaciones sobre elementos radioactivos y reacciones nucleares. Meitner fue nombrada directora del departamento de física del Instituto Kaiser Wilhelm de Química en 1917, un logro notable para una mujer en esa época. En 1923, descubrió la emisión no radiativa que hoy lleva su nombre provisional, el efecto Auger (redescubierto independientemente por Pierre Auger dos años después, quien recibió todo el crédito). Albert Einstein la llamaba "nuestra Marie Curie alemana", reconociendo su capacidad experimental y teórica.',
      'En 1938, tras la anexión de Austria por la Alemania nazi, Meitner, de ascendencia judía, tuvo que huir de Berlín con solo diez marcos en el bolsillo y un anillo de diamantes que su colega Hahn le dio para sobornar guardias fronterizos si era necesario. Se refugió en Estocolmo, Suecia, donde continuó su trabajo en condiciones precarias. A finales de 1938, Hahn y Fritz Strassmann, todavía en Berlín, le comunicaron por carta un resultado que no podían explicar: al bombardear uranio con neutrones, habían obtenido bario, un elemento mucho más ligero.',
      'En diciembre de 1938, durante un paseo por la nieve con su sobrino Otto Robert Frisch, también físico, Meitner resolvió el enigma. Utilizando el modelo de gota líquida del núcleo propuesto por Niels Bohr, calculó que el núcleo de uranio se había partido en dos, liberando una cantidad de energía de aproximadamente 200 millones de electronvoltios por átomo, consistente con la ecuación E=mc² de Einstein. Frisch llamó al proceso "fisión", tomando el término de la biología celular. Hahn publicó los resultados experimentales sin incluir a Meitner como coautora y recibió el Premio Nobel de Química en 1944 en solitario. El comité Nobel no reconoció la contribución de Meitner, una omisión que historiadores de la ciencia consideran una de las mayores injusticias en la historia del premio.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Meitner rechazó participar en el Proyecto Manhattan a pesar de ser invitada. Cuando le propusieron colaborar en la construcción de la bomba atómica, respondió: "No tendré nada que ver con una bomba". Después de Hiroshima, un periodista la llamó "la madre de la bomba atómica", un título que Meitner rechazó con indignación, señalando que ella se había opuesto al uso militar de la fisión nuclear desde el principio.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 1997, el elemento 109 de la tabla periódica fue nombrado meitnerio (Mt) en honor a Lise Meitner, convirtiéndola en la segunda mujer, después de Marie Curie (curio, Cm), en tener un elemento químico con su nombre. El meitnerio es un elemento superpesado sintético producido por primera vez en 1982 en el laboratorio GSI de Darmstadt, Alemania, mediante la fusión de átomos de bismuto con iones de hierro acelerados a velocidades cercanas al 10% de la velocidad de la luz.' },
    ],
    fact: 'Lise Meitner fue nominada al Premio Nobel de Física 48 veces entre 1924 y 1965 sin recibirlo nunca. Los archivos del Comité Nobel, abiertos al público 50 años después de cada decisión, revelan que en 1944 varios evaluadores recomendaron incluir a Meitner en el premio otorgado a Hahn, pero la mayoría del comité consideró que su contribución era "meramente teórica". Esta interpretación contradice el consenso histórico actual de que la explicación teórica de Meitner fue tan importante como los datos experimentales de Hahn.',
  },
  {
    id: 'rosalind-franklin',
    title: 'Rosalind Franklin',
    color: '#7B1FA2',
    btnImage: '/assets/marie_curie/infographic_m4/btn_rosalind-franklin.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_rosalind-franklin.jpg',
    content: [
      'Rosalind Elsie Franklin nació el 25 de julio de 1920 en Notting Hill, Londres, en una familia judía acomodada. Desde muy joven mostró una aptitud para las ciencias y las matemáticas. Estudió química en el Newnham College de Cambridge, donde se graduó en 1941. Durante la Segunda Guerra Mundial, trabajó en la British Coal Utilisation Research Association estudiando la microestructura del carbón y el grafito, investigación que resultó en cinco publicaciones científicas y una tesis doctoral que completó en Cambridge en 1945. Su trabajo sobre la porosidad del carbón contribuyó al desarrollo de filtros para máscaras de gas más efectivos.',
      'Entre 1947 y 1950, Franklin perfeccionó sus habilidades en cristalografía de rayos X en el Laboratoire Central des Services Chimiques en París, donde aprendió técnicas avanzadas de difracción que serían cruciales para su trabajo posterior. En enero de 1951, se incorporó al King College de Londres para trabajar en la estructura del ADN utilizando difracción de rayos X. Junto con su estudiante de doctorado Raymond Gosling, produjo imágenes de difracción de una calidad sin precedentes, diferenciando por primera vez las formas A y B del ADN, un avance técnico que nadie más había logrado.',
      'En mayo de 1952, Franklin tomó la Fotografía 51, una imagen de difracción de rayos X de la forma B del ADN que mostraba con claridad un patrón en forma de X característico de una estructura helicoidal. Esta fotografía es considerada una de las imágenes más importantes en la historia de la biología. Sin el conocimiento ni el consentimiento de Franklin, su colega Maurice Wilkins mostró la Fotografía 51 a James Watson en enero de 1953. Watson escribiría después en su libro "La Doble Hélice" que al ver la imagen, "se me abrió la boca y el corazón empezó a latirme con fuerza".',
      'Watson y Francis Crick, trabajando en Cambridge, utilizaron los datos de difracción de Franklin, incluyendo mediciones precisas que ella había presentado en un informe interno del Medical Research Council, para construir su modelo de la doble hélice del ADN, publicado en la revista Nature el 25 de abril de 1953. El artículo de Watson y Crick mencionaba el trabajo de Franklin y Wilkins solo como confirmación experimental de su modelo, sin reconocer que los datos de Franklin habían sido la base crucial para su descubrimiento. Franklin publicó su propio artículo en el mismo número de Nature, pero fue presentado como mero soporte experimental.',
      'Franklin murió de cáncer de ovario el 16 de abril de 1958, a los 37 años, probablemente debido a la exposición prolongada a la radiación de rayos X durante su trabajo. En 1962, Watson, Crick y Wilkins recibieron el Premio Nobel de Fisiología o Medicina por el descubrimiento de la estructura del ADN. Franklin no fue mencionada en los discursos de aceptación. El comité Nobel no otorga premios póstumos, pero los historiadores debaten si habría sido incluida de haber vivido, dado que las reglas permitían hasta tres laureados y ella era claramente una candidata con méritos propios. Su contribución solo fue plenamente reconocida décadas después de su muerte.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Después de dejar el King College en 1953, Franklin realizó un trabajo pionero sobre la estructura del virus del mosaico del tabaco (TMV) y del virus de la polio en el Birkbeck College de Londres. Demostró que el ARN del TMV está enrollado en una hélice dentro de una cubierta proteica hueca, trabajo que fue fundamental para la virología estructural. Aaron Klug, su colaborador más cercano, continuó su investigación y recibió el Nobel de Química en 1982, dedicando parte de su discurso a reconocer las contribuciones de Franklin.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Fotografía 51 tardó 62 horas de exposición continua a los rayos X para ser capturada. Franklin utilizó una fibra de ADN de solo 0,1 milímetros de diámetro, montada en un cabello humano, y la mantuvo en una atmósfera controlada al 92% de humedad relativa para estabilizar la forma B del ADN. La imagen resultante reveló que el ADN tiene un diámetro de 20 ángströms, un paso de hélice de 34 ángströms y 10 pares de bases por vuelta, datos cuantitativos que Watson y Crick necesitaban para construir su modelo tridimensional.' },
    ],
    fact: 'En 2023, un análisis publicado en la revista Nature reveló que las libretas de laboratorio de Franklin demuestran que ella había determinado independientemente que el ADN tenía una estructura de doble hélice con las bases nitrogenadas orientadas hacia el interior antes de que Watson y Crick publicaran su modelo. Sus notas de febrero de 1953 contienen cálculos que indican dos cadenas antiparalelas con las fosfatas en el exterior, la misma conclusión que Watson y Crick presentaron dos meses después como su propia idea original.',
  },
  {
    id: 'chien-shiung-wu',
    title: 'Chien-Shiung Wu',
    color: '#81C784',
    btnImage: '/assets/marie_curie/infographic_m4/btn_chien-shiung-wu.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_chien-shiung-wu.jpg',
    content: [
      'Chien-Shiung Wu nació el 31 de mayo de 1912 en Liuhe, una pequeña ciudad cerca de Shanghái, China. Su padre, Wu Zhongyi, era un educador progresista que fundó la primera escuela para niñas en la región, desafiando la tradición confuciana de que las mujeres no necesitaban educación formal. Su nombre, Chien-Shiung, significa "héroe fuerte", una elección que reflejaba las convicciones de su padre sobre la igualdad de género. Estudió física en la Universidad Nacional Central de Nankín y, en 1936, viajó a Estados Unidos para realizar estudios de posgrado en la Universidad de California, Berkeley, donde se doctoró bajo la dirección de Ernest Lawrence, inventor del ciclotrón.',
      'Durante la Segunda Guerra Mundial, Wu trabajó en el Proyecto Manhattan en la División de Ingeniería Atómica de la Universidad de Columbia, investigando el proceso de enriquecimiento de uranio por difusión gaseosa, un componente esencial para la construcción de la bomba atómica. Resolvió un problema técnico que había paralizado el reactor nuclear de Hanford: identificó que el xenón-135, un producto de fisión, estaba absorbiendo neutrones y envenenando la reacción en cadena. Su solución permitió que el reactor funcionara correctamente. A pesar de esta contribución, su papel permaneció clasificado y no recibió reconocimiento público durante décadas.',
      'En 1956, los físicos teóricos Tsung-Dao Lee y Chen-Ning Yang propusieron que la paridad, una simetría fundamental que establece que las leyes de la física no distinguen entre izquierda y derecha, podría no conservarse en las interacciones nucleares débiles. Esta hipótesis contradecía una suposición básica de la física desde los tiempos de Newton, y la mayoría de los físicos la consideraban inverosímil. Lee y Yang necesitaban un experimentalista de primera categoría para probar su teoría y recurrieron a Wu, reconocida como la mayor experta mundial en desintegración beta.',
      'Wu diseñó y ejecutó un experimento de precisión en el Laboratorio Nacional de la Oficina de Estándares en Washington, D.C., durante el invierno de 1956-1957. Enfrió cristales de cobalto-60 a 0,01 grados sobre el cero absoluto (-273,14 °C) utilizando un potente electroimán para alinear los núcleos atómicos en una dirección. Si la paridad se conservaba, los electrones emitidos durante la desintegración beta debían salir en proporciones iguales hacia arriba y hacia abajo. El resultado fue contundente: los electrones salían preferentemente en una dirección, demostrando que la naturaleza sí distingue entre izquierda y derecha a nivel subatómico.',
      'El descubrimiento, publicado en enero de 1957, provocó una revolución en la física de partículas. Lee y Yang recibieron el Premio Nobel de Física en octubre de ese mismo año, solo nueve meses después de la publicación, uno de los reconocimientos más rápidos en la historia del Nobel. Wu, quien diseñó, ejecutó e interpretó el experimento que confirmó la teoría, no fue incluida en el premio. La omisión fue ampliamente criticada por la comunidad científica. El propio Lee escribió que "la contribución de Wu fue tan importante como la nuestra". Wu recibió numerosos premios posteriores, incluyendo la primera Medalla Wolf de Física en 1978, y fue conocida como la "Primera Dama de la Física".',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Wu fue tan rigurosa en sus experimentos que otros físicos acuñaron la expresión "si Wu lo dice, es correcto" para referirse a resultados experimentales de confiabilidad indiscutible. Cuando Enrico Fermi, uno de los físicos más importantes del siglo XX, encontraba discrepancias entre sus predicciones teóricas y los resultados experimentales de otros laboratorios, decía: "pregúntenle a la señorita Wu". Su reputación de precisión era tan sólida que sus resultados rara vez eran cuestionados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La violación de la paridad descubierta por el experimento de Wu tiene consecuencias directas para explicar por qué existe el universo tal como lo conocemos. Si todas las simetrías fueran perfectas, la materia y la antimateria se habrían aniquilado mutuamente después del Big Bang, dejando un universo vacío. La asimetría en las interacciones débiles, demostrada por Wu, es uno de los mecanismos que permitieron que sobreviviera un ligero exceso de materia sobre antimateria, dando origen a las estrellas, los planetas y la vida.' },
    ],
    fact: 'En 1963, Wu realizó una verificación experimental del teorema de conservación del vector corriente (CVC) en la desintegración beta, confirmando una predicción teórica de Richard Feynman y Murray Gell-Mann. Este resultado, junto con su experimento de paridad, consolidó el modelo teórico de las interacciones débiles que posteriormente se unificó con el electromagnetismo en la teoría electrodébil de Weinberg, Salam y Glashow, premiada con el Nobel de Física en 1979. Los tres laureados reconocieron explícitamente que el trabajo experimental de Wu había sido esencial para validar la teoría.',
  },
  {
    id: 'mujeres-nobel-ciencias',
    title: 'Mujeres Nobel en Ciencias',
    color: '#8E24AA',
    btnImage: '/assets/marie_curie/infographic_m4/btn_mujeres-nobel-ciencias.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_mujeres-nobel-ciencias.jpg',
    content: [
      'Desde que Marie Curie recibió el Nobel de Física en 1903, solo 25 mujeres han ganado Premios Nobel en las categorías científicas (Física, Química y Fisiología o Medicina) hasta 2024, de un total de más de 640 laureados. En Física, apenas cinco mujeres lo han recibido: Marie Curie (1903), Maria Goeppert Mayer por su modelo de capas nucleares (1963), Donna Strickland por amplificación de pulsos láser chirped (2018), Andrea Ghez por el descubrimiento del agujero negro supermasivo en el centro de la Vía Láctea (2020), y Anne L\'Huillier por métodos de generación de pulsos de luz de attosegundos (2023).',
      'En Química, la lista incluye a Marie Curie nuevamente (1911), Irène Joliot-Curie por la radioactividad artificial (1935), Dorothy Crowfoot Hodgkin por determinar las estructuras tridimensionales de la penicilina y la vitamina B12 mediante cristalografía de rayos X (1964), Ada Yonath por la estructura del ribosoma (2009), Frances Arnold por la evolución dirigida de enzimas (2018), Emmanuelle Charpentier y Jennifer Doudna por el desarrollo de CRISPR-Cas9 como herramienta de edición genética (2020), y Carolyn Bertozzi por la química bioortogonal (2022).',
      'Dorothy Hodgkin, nacida en El Cairo en 1910, resolvió la estructura de la insulina después de 35 años de trabajo continuo, publicando el resultado final en 1969. Cuando ganó el Nobel en 1964, los periódicos británicos titularon "Ama de casa de Oxford gana el Nobel", ignorando sus tres décadas de investigación cristalográfica. Hodgkin fue también mentora de Margaret Thatcher cuando esta estudió química en Oxford, y es la única mujer británica en haber recibido un Nobel científico. Su trabajo sobre la vitamina B12 fue descrito por el comité Nobel como "un triunfo de la perseverancia y la capacidad técnica".',
      'El ritmo de reconocimiento se ha acelerado en el siglo XXI. Entre 1903 y 2000, solo once mujeres ganaron premios Nobel científicos en casi un siglo completo. Entre 2000 y 2024, catorce mujeres lo han logrado en solo veinticuatro años. Este cambio refleja tanto el aumento gradual de mujeres en posiciones de investigación de alto nivel como una mayor conciencia por parte de los comités de selección sobre los sesgos históricos del premio. Sin embargo, las mujeres siguen representando menos del 4% del total de laureados en ciencias.',
      'Andrea Ghez, laureada en 2020, lideró un equipo que monitoreó las órbitas de estrellas cerca del centro de la Vía Láctea durante más de veinte años utilizando el telescopio Keck en Hawái con óptica adaptativa. Sus observaciones demostraron que las estrellas orbitan un objeto invisible con una masa de cuatro millones de soles concentrada en una región menor que nuestro sistema solar: el agujero negro supermasivo Sagitario A*. Es la cuarta mujer en recibir el Nobel de Física en 117 años de historia del premio, lo que ilustra la lentitud del progreso en la disciplina científica donde las mujeres siguen estando más subrepresentadas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Emmanuelle Charpentier y Jennifer Doudna ganaron el Nobel de Química en 2020 por desarrollar CRISPR-Cas9, una herramienta de edición genética que funciona como unas "tijeras moleculares" capaces de cortar y modificar el ADN con precisión. Desde la publicación de su trabajo en 2012, CRISPR ha sido utilizada en más de 10.000 laboratorios en todo el mundo y ha generado ensayos clínicos para tratar enfermedades genéticas como la anemia falciforme, ciertos tipos de cáncer y la distrofia muscular.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Maria Goeppert Mayer desarrolló el modelo de capas nucleares que explica por qué ciertos números de protones o neutrones (2, 8, 20, 28, 50, 82, 126), llamados "números mágicos", hacen que los núcleos atómicos sean particularmente estables. Su modelo predijo correctamente las propiedades de cientos de isótopos. A pesar de su trabajo pionero, Goeppert Mayer no recibió un puesto remunerado en una universidad estadounidense durante la mayor parte de su carrera; trabajó como "voluntaria asociada" sin salario en la Universidad de Chicago durante más de una década.' },
    ],
    fact: 'Si se suman todos los años de carrera científica de las 25 mujeres Nobel en ciencias, el promedio entre el inicio de su investigación doctoral y la recepción del premio es de 32 años, comparado con un promedio de 24 años para los laureados masculinos. Este dato sugiere que las mujeres necesitan acumular significativamente más evidencia y reconocimiento antes de ser consideradas para el máximo galardón científico, un fenómeno documentado por la socióloga de la ciencia Harriet Zuckerman en su estudio de 1977 sobre la élite científica.',
  },
  {
    id: 'efecto-marie-curie',
    title: 'El Efecto Marie Curie',
    color: '#388E3C',
    btnImage: '/assets/marie_curie/infographic_m4/btn_efecto-marie-curie.jpg',
    image: '/assets/marie_curie/infographic_m4/hero_efecto-marie-curie.jpg',
    content: [
      'El "efecto Marie Curie" describe el impacto que el ejemplo de una mujer científica visible puede tener en las aspiraciones profesionales de niñas y jóvenes mujeres. Un estudio de 2019 publicado en la revista Science of Education analizó datos de 67 países y encontró que en las naciones donde las contribuciones de mujeres científicas reciben más cobertura mediática y educativa, las niñas muestran un 18% más de interés en carreras STEM (ciencia, tecnología, ingeniería y matemáticas) comparado con países donde esa cobertura es menor. El nombre y la historia de Marie Curie se citan consistentemente como la referencia más reconocida entre estudiantes de ambos sexos al preguntar por una mujer científica.',
      'La UNESCO, a través de su programa L\'Oréal-UNESCO "Para las Mujeres en la Ciencia" creado en 1998, ha premiado y otorgado becas a más de 4.100 científicas de 110 países en 25 años. El programa reconoce anualmente a cinco científicas establecidas, una por continente, y otorga quince becas internacionales de investigación a jóvenes científicas. La Unión Europea mantiene las Acciones Marie Skłodowska-Curie (MSCA), con un presupuesto de 6.600 millones de euros entre 2021 y 2027, que financia la movilidad y formación de investigadores de todas las disciplinas, con el nombre de Curie como símbolo de excelencia científica sin barreras de género.',
      'Las estadísticas globales muestran avances significativos pero desiguales. Según datos del Instituto de Estadística de la UNESCO de 2023, las mujeres representan el 33,3% de los investigadores a nivel mundial, un aumento desde el 28,4% en 2015. En América Latina, la proporción es superior al promedio global, con países como Argentina (53%), Venezuela (53%) y Guatemala (51%) donde las mujeres son mayoría entre los investigadores. En cambio, en Japón solo el 16,9% de los investigadores son mujeres, y en la República de Corea el 21,3%. En el continente africano, las cifras varían desde el 45% en Sudáfrica hasta menos del 15% en Chad y Etiopía.',
      'La brecha de género se intensifica en los niveles más altos de liderazgo científico. Un informe de la revista Nature de 2022 reveló que, aunque las mujeres representan casi el 50% de los doctorados en ciencias biológicas en Estados Unidos y Europa, solo ocupan el 26% de los puestos de catedrático titular y dirigen el 18% de los laboratorios de investigación. En física, la proporción es aún menor: las mujeres obtienen el 20% de los doctorados pero ocupan solo el 11% de las cátedras. Este fenómeno, conocido como "tubería con fugas" (leaky pipeline), describe cómo las mujeres abandonan la carrera académica en cada etapa de promoción a tasas mayores que sus colegas masculinos.',
      'El legado de Marie Curie como inspiración se mide también en resultados concretos. En 2023, dos misiones espaciales llevaron el nombre de mujeres científicas: el telescopio de rayos X Einstein Probe en honor a las contribuciones de mujeres en astrofísica, y la misión JUICE de la Agencia Espacial Europea, liderada por la científica planetaria Michele Dougherty. Más de 300 universidades y centros de investigación en todo el mundo llevan nombres de mujeres científicas. En Francia, el elemento curio (Cm, número atómico 96) y el elemento polonio (Po, número atómico 84) llevan los nombres elegidos por Marie Curie, recordando que una mujer inmigrante con pocos recursos cambió la tabla periódica para siempre.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El "efecto modelo a seguir" tiene base neurológica documentada. Un estudio de neuroimagen de 2020 publicado en Social Cognitive and Affective Neuroscience mostró que cuando niñas de 10 a 14 años leían biografías de mujeres científicas reales, se activaban las áreas cerebrales asociadas con la autoimagen futura y la motivación intrínseca (corteza prefrontal medial y estriado ventral) en mayor medida que cuando leían las mismas biografías con nombres masculinos. El efecto era más pronunciado en niñas que previamente declaraban poco interés en ciencias.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un meta-análisis de 2021 publicado en Psychological Bulletin, que reunió datos de 1,6 millones de estudiantes en 70 países, encontró que la brecha de género en rendimiento matemático y científico varía entre el 0% y el 5% según el país, pero la brecha en confianza y autoeficacia en ciencias alcanza el 15-20% en detrimento de las niñas incluso en países donde el rendimiento es igual. Esto indica que el problema no es de capacidad sino de percepción, y que la visibilidad de modelos femeninos en ciencia tiene un efecto directo en reducir esa brecha de confianza.' },
    ],
    fact: 'Marie Curie sigue siendo, más de 90 años después de su muerte en 1934, la científica más reconocida del mundo según encuestas internacionales. Un sondeo de 2019 realizado por la empresa 3M en 14 países encontró que el 85% de los encuestados podían nombrar a Marie Curie como científica, frente al 62% que podía nombrar a Albert Einstein y el 50% que reconocía a Stephen Hawking. En Francia, su imagen figuró en los billetes de 500 francos entre 1994 y 2002, y en 1995 se convirtió en la primera mujer enterrada por sus propios méritos en el Panteón de París.',
  },
];

// ——— Radium Particle Field (Canvas Background) ————————————————————————
function RadiumField() {
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
      hue: Math.random() > 0.5 ? '76,175,80' : '106,27,154', // green or violet
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

// ——— Women in Science Header ————————————————————————————————————
function WomenInScienceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#curieGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4CAF50','#6A1B9A','#66BB6A','#7B1FA2','#81C784','#8E24AA','#388E3C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central atom icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#4CAF50" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.4" />
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.4" transform="rotate(60 300 30)" />
        <defs>
          <linearGradient id="curieGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(106,27,154,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MUJERES EN LA CIENCIA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">PIONERAS QUE CAMBIARON EL MUNDO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(76,175,80,0.2)'}`,
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
          layoutId="activeDotCurieM4"
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

        {/* ——— Conditional Video Player ——— */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(76,175,80,0.15)',
    }}>
      <Star size={14} style={{ color: '#4CAF50', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4CAF50, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(76,175,80,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————
export default function InteractiveInfographic_CurieM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/curie_m4.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(76,175,80,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RadiumField />

      <WomenInScienceHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(76,175,80,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(76,175,80,0.08)', borderRadius: '16px',
              border: '1px solid rgba(76,175,80,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4CAF50', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has conocido a las Pioneras de la Ciencia!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Mujeres en la Ciencia
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
