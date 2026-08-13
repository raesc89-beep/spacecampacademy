'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Marie Curie / Warsaw themed) ————————————————
function DecoAtomOrbit({ size = 70, color = '#4CAF50', style = {} }) {
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

function DecoTestTube({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Test tube body */}
      <rect x="22" y="8" width="16" height="34" rx="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Liquid inside */}
      <rect x="24" y="28" width="12" height="12" rx="6" fill={color} opacity="0.25" />
      {/* Rim */}
      <line x1="20" y1="8" x2="40" y2="8" stroke={color} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="28" cy="24" r="1.5" fill={color} opacity="0.4" />
      <circle cx="32" cy="20" r="1" fill={color} opacity="0.3" />
      <circle cx="30" cy="16" r="1.5" fill={color} opacity="0.35" />
      {/* Glow emanation */}
      <circle cx="30" cy="34" r="10" fill={color} opacity="0.08" />
      <circle cx="30" cy="34" r="16" fill={color} opacity="0.04" />
    </svg>
  );
}

function DecoBookOpen({ size = 80, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Left page */}
      <path d="M40 10 Q25 8 10 14 L10 40 Q25 34 40 36 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Right page */}
      <path d="M40 10 Q55 8 70 14 L70 40 Q55 34 40 36 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Spine */}
      <line x1="40" y1="10" x2="40" y2="36" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Text lines left */}
      <line x1="18" y1="22" x2="34" y2="20" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="27" x2="34" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="32" x2="34" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Text lines right */}
      <line x1="46" y1="20" x2="62" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="46" y1="25" x2="62" y2="27" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoEagle({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized Polish eagle / wings */}
      <path d="M30 12 Q20 20 10 28 Q18 26 24 30 Q18 34 10 38 Q22 36 30 44 Q38 36 50 38 Q42 34 36 30 Q42 26 50 28 Q40 20 30 12Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" />
      {/* Crown */}
      <path d="M24 14 L27 10 L30 14 L33 10 L36 14" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Center */}
      <circle cx="30" cy="28" r="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoRadiation({ size = 70, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Radiation trefoil */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {[0, 120, 240].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x2 = 30 + 18 * Math.sin(rad);
        const y2 = 30 - 18 * Math.cos(rad);
        return (
          <g key={i}>
            <path d={`M30 30 L${30 + 12 * Math.sin(rad - 0.4)} ${30 - 12 * Math.cos(rad - 0.4)} A12 12 0 0 1 ${30 + 12 * Math.sin(rad + 0.4)} ${30 - 12 * Math.cos(rad + 0.4)} Z`} fill={color} opacity="0.2" />
            <circle cx={x2} cy={y2} r="1.5" fill={color} opacity="0.5" />
          </g>
        );
      })}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function DecoQuill({ size = 70, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Quill pen */}
      <path d="M42 8 Q38 18 28 28 Q24 32 20 38 L18 42 L22 40 Q28 36 32 32 Q42 22 48 14 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" />
      {/* Feather barbs */}
      <path d="M42 8 Q48 14 50 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M42 8 Q36 12 34 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Ink dots */}
      <circle cx="18" cy="44" r="2" fill={color} opacity="0.3" />
      <circle cx="14" cy="48" r="1.5" fill={color} opacity="0.25" />
      <circle cx="22" cy="47" r="1" fill={color} opacity="0.2" />
      {/* Writing line */}
      <path d="M16 50 Q25 48 35 50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'polonia-imperio-ruso': [DecoEagle, DecoBookOpen, DecoQuill],
  'maria-sklodowska': [DecoTestTube, DecoAtomOrbit, DecoBookOpen],
  'la-institutriz': [DecoQuill, DecoBookOpen, DecoEagle],
  'universidad-volante': [DecoBookOpen, DecoEagle, DecoQuill],
  'sueno-paris': [DecoAtomOrbit, DecoTestTube, DecoRadiation],
  'primeros-estudios': [DecoTestTube, DecoRadiation, DecoAtomOrbit],
  'encuentro-pierre': [DecoRadiation, DecoAtomOrbit, DecoTestTube],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Quinn, S. (1995). Marie Curie: A Life, Simon & Schuster',
  'Curie, E. (1937). Madame Curie: A Biography, Doubleday',
  'Goldsmith, B. (2005). Obsessive Genius: The Inner World of Marie Curie, W.W. Norton',
  'Emling, S. (2012). Marie Curie and Her Daughters, Palgrave Macmillan',
  'Dry, S. (2003). Curie, Haus Publishing (Life & Times Series)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'polonia-imperio-ruso',
    title: 'Polonia Bajo el Imperio Ruso',
    color: '#4CAF50',
    btnImage: '/assets/marie_curie/infographic_m1/btn_polonia-imperio-ruso.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_polonia-imperio-ruso.jpg',
    content: [
      'En 1795, las tres potencias vecinas —Rusia, Prusia y Austria— completaron la tercera y última partición de Polonia, borrando al país del mapa europeo durante 123 años. La región central, que incluía Varsovia, quedó bajo control directo del Imperio Ruso del zar Alejandro I y sus sucesores. Los polacos perdieron su gobierno, su ejército y su soberanía. Esta situación política marcó cada aspecto de la vida cotidiana de las familias polacas durante todo el siglo XIX, incluyendo la de los Skłodowski, la familia donde nacería Maria.',
      'Las autoridades zaristas implementaron una política sistemática de rusificación en el territorio polaco. A partir de 1869, el idioma ruso se convirtió en la lengua obligatoria en todas las escuelas y oficinas gubernamentales. Hablar polaco en clase estaba prohibido y castigado. Los profesores polacos debían enseñar historia rusa en lugar de historia polaca. Los libros de texto en polaco fueron confiscados y reemplazados por manuales en ruso. Los nombres de las calles de Varsovia se cambiaron al ruso, y hasta los letreros comerciales debían estar en el idioma del imperio.',
      'El sistema educativo se convirtió en un campo de batalla cultural. Cuando un inspector ruso visitaba una escuela, los estudiantes tenían que esconder rápidamente sus libros en polaco bajo los pupitres y recitar lecciones en ruso. Maria Skłodowska vivió esta situación en su propia escuela: su compañera de clase era llamada a recitar los nombres de los zares rusos ante los inspectores, mientras que en secreto los niños memorizaban poesía y literatura polaca. Este doble juego educativo se convirtió en parte normal de la infancia de toda una generación.',
      'Las universidades del Imperio Ruso cerraron sus puertas a las mujeres polacas de manera categórica. La Universidad de Varsovia, renombrada como Universidad Imperial de Varsovia en 1869, prohibía el ingreso femenino sin excepciones. Las mujeres polacas que deseaban educación superior debían buscarla fuera del imperio: en Suiza, Francia o Bélgica. Esta barrera doble —ser mujer y ser polaca— definió el camino que Maria tendría que recorrer para cumplir su vocación científica, obligándola a buscar alternativas clandestinas primero y a emigrar después.',
      'La resistencia polaca ante la opresión rusa tomó muchas formas. Tras el fracaso de las insurrecciones armadas de 1830 y 1863, los polacos adoptaron una estrategia de resistencia cultural conocida como "trabajo orgánico" (praca organiczna). En lugar de luchar con armas, resistían preservando su idioma, su literatura, su ciencia y su identidad. Esta filosofía de resistencia mediante la educación y el conocimiento influyó directamente en la familia Skłodowski y en la formación de la joven Maria, quien desde niña entendió que estudiar y aprender era también un acto político de defensa de su pueblo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tras la insurrección de enero de 1863, el gobierno zarista ejecutó a más de 400 rebeldes polacos y deportó a unos 20,000 a Siberia. Las propiedades de los participantes fueron confiscadas. El abuelo paterno de Maria, Józef Skłodowski, perdió parte de sus bienes durante estas represalias, lo que empujó a la familia hacia una situación económica difícil que Maria experimentaría durante toda su juventud.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La rusificación de Polonia tuvo un efecto paradójico en la ciencia: al prohibir la educación en polaco, obligó a los intelectuales polacos a dominar varios idiomas desde jóvenes. Maria Skłodowska hablaba con fluidez polaco, ruso, francés y alemán antes de cumplir 18 años. Esta habilidad lingüística le permitió leer publicaciones científicas en sus idiomas originales cuando llegó a París, dándole una ventaja sobre muchos de sus compañeros franceses que solo leían en su propio idioma.' },
    ],
    fact: 'Polonia desapareció de los mapas oficiales de Europa durante exactamente 123 años, desde la tercera partición de 1795 hasta la restauración de la independencia el 11 de noviembre de 1918, al final de la Primera Guerra Mundial. Durante ese período, más de 10 millones de polacos vivieron como súbditos de imperios extranjeros. Maria Skłodowska nació en 1867, exactamente a la mitad de ese período de ocupación, y no viviría para ver a su patria libre hasta que ya tenía 51 años de edad.',
  },
  {
    id: 'maria-sklodowska',
    title: 'Maria Skłodowska',
    color: '#6A1B9A',
    btnImage: '/assets/marie_curie/infographic_m1/btn_maria-sklodowska.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_maria-sklodowska.jpg',
    content: [
      'Maria Salomea Skłodowska nació el 7 de noviembre de 1867 en el número 16 de la calle Freta, en el casco antiguo de Varsovia. Fue la quinta y última hija de Władysław Skłodowski y Bronisława Skłodowska, née Boguska. Sus hermanos mayores eran Zofia (nacida en 1862), Józef (1863), Bronisława (1865) y Helena (1866). La familia vivía en un apartamento conectado al internado para niñas que dirigía la madre, donde el sonido constante de clases y recitaciones era parte del ambiente cotidiano del hogar.',
      'Su padre, Władysław Skłodowski, era profesor de matemáticas y física en el Liceo de Varsovia. Tenía formación universitaria en San Petersburgo y dominaba el ruso, el alemán y el francés, además del polaco. Cada sábado por la noche, reunía a sus cinco hijos para lecturas en voz alta de literatura polaca y extranjera. También llevaba a casa instrumentos científicos del laboratorio escolar —tubos de ensayo, electroscopios, una balanza de precisión— y los usaba para enseñar principios de física a sus hijos. Maria quedaba cautivada observando esos aparatos tras el cristal del armario donde su padre los guardaba.',
      'La infancia de Maria estuvo marcada por dos tragedias que la moldearon. En enero de 1876, cuando Maria tenía ocho años, su hermana mayor Zofia murió de tifus a los 14 años. Dos años después, el 9 de mayo de 1878, su madre Bronisława falleció de tuberculosis. La enfermedad la había consumido durante años, obligándola a mantener distancia física de sus hijos para no contagiarlos. Maria tenía solo diez años cuando perdió a su madre. Según relatos familiares, la niña atravesó un período de duelo silencioso y profundo que duró meses.',
      'A pesar del dolor, Maria demostró una capacidad intelectual fuera de lo común desde temprana edad. A los cuatro años ya leía con soltura. Según cuenta su hermana Helena, un día Maria tomó el libro de lectura de Bronia y comenzó a leerlo en voz alta sin titubear; luego rompió a llorar, temiendo que la regañaran por "leer sin permiso". En la escuela rusa, destacó en todas las materias, y a los 15 años, en junio de 1883, se graduó con medalla de oro del Gimnasio número 3 de Varsovia, ocupando el primer lugar de su promoción entre todos los estudiantes.',
      'Después de su graduación, Maria sufrió lo que los médicos de la época describieron como un "colapso nervioso", probablemente provocado por la acumulación de esfuerzo académico y las pérdidas familiares. Su padre, preocupado, la envió a pasar un año en el campo con parientes en las regiones de Skalbmierz y Zwola. Allí, Maria montó a caballo, nadó en ríos, asistió a bailes de carnaval y descansó por primera vez en años. En cartas a su amiga Kazia Przyborowska, describió ese año como el más feliz de su juventud. Regresó a Varsovia renovada y lista para enfrentar su siguiente desafío: encontrar la manera de estudiar ciencias en un sistema que se lo prohibía.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La calle Freta 16, donde nació Maria Skłodowska, es hoy el Museo de Marie Curie en Varsovia. El edificio fue restaurado después de los daños sufridos durante la Segunda Guerra Mundial y abrió como museo en 1967, en el centenario del nacimiento de Maria. Conserva documentos originales, fotografías familiares y reproducciones de los instrumentos científicos que su padre guardaba en el armario de cristal que tanto la cautivaba de niña.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La tuberculosis que mató a la madre de Maria era causada por la bacteria Mycobacterium tuberculosis, identificada por Robert Koch en 1882, cuatro años después de la muerte de Bronisława. En la década de 1870, no existía ni vacuna ni antibiótico contra la enfermedad. El bacilo se transmitía por el aire, lo que explica por qué la madre mantenía distancia de sus hijos. La vacuna BCG no se aplicó por primera vez en humanos hasta 1921, y la estreptomicina, primer antibiótico eficaz contra la tuberculosis, no se descubrió hasta 1943.' },
    ],
    fact: 'Władysław Skłodowski perdió su puesto como subdirector del Liceo en 1873, cuando Maria tenía seis años, porque las autoridades rusas descubrieron que mantenía sentimientos patrióticos polacos. La pérdida del cargo significó también la pérdida del apartamento vinculado al puesto. Para compensar la reducción de ingresos, Władysław empezó a aceptar alumnos internos en su propia casa, llegando a alojar hasta diez estudiantes. Fue probablemente uno de estos estudiantes internos quien trajo el tifus que mató a Zofia en 1876.',
  },
  {
    id: 'la-institutriz',
    title: 'La Institutriz',
    color: '#66BB6A',
    btnImage: '/assets/marie_curie/infographic_m1/btn_la-institutriz.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_la-institutriz.jpg',
    content: [
      'Al regresar del campo en 1884, Maria se enfrentó a la dura realidad: necesitaba dinero para estudiar, pero las universidades del imperio no la admitirían por ser mujer. Con su hermana Bronia, idearon un plan que cambiaría sus vidas: Maria trabajaría como institutriz para financiar los estudios de medicina de Bronia en la Universidad de París. Una vez graduada, Bronia devolvería el favor financiando los estudios de Maria. Este pacto entre hermanas, basado en la confianza y el sacrificio mutuo, se mantuvo durante casi cinco años de separación y trabajo continuo.',
      'En enero de 1886, Maria aceptó un puesto como gobernanta en la familia Żorawski, en la finca rural de Szczuki, a unos 150 kilómetros al norte de Varsovia. Sus responsabilidades incluían educar a las dos hijas mayores de la familia, Bronka y Andzia, además de supervisar las tareas del hogar. El salario era de 500 rublos al año, del cual Maria enviaba la mayor parte a Bronia en París. Vivía en una habitación modesta de la casa principal y comía con la familia, pero su posición social como empleada estaba claramente definida.',
      'Durante sus horas libres en Szczuki, Maria continuó su formación autodidacta con una disciplina notable. Su padre le enviaba por correo libros de física, química y matemáticas. Estudiaba álgebra, geometría analítica y los tratados de física de los profesores Daniel y Ganot. En una carta a su hermano Józef, escribió: "He adquirido el hábito de levantarme a las seis de la mañana para estudiar hasta las ocho, antes de que empiecen mis clases". Calculaba que dedicaba al menos cuatro horas diarias a su propia formación, un esfuerzo de autoestudio que pocos universitarios igualaban.',
      'En Szczuki, Maria inició una actividad que la ponía en serio peligro: enseñar a leer y escribir en polaco a los hijos de los campesinos de la zona. Esta escuela clandestina, con unos 18 alumnos entre niños y adultos, violaba directamente las leyes zaristas que prohibían la educación de los campesinos en idioma polaco. Si la policía imperial la hubiera descubierto, habría enfrentado prisión o deportación a Siberia. La hija mayor de los Żorawski le ayudaba en esta tarea, proporcionando un espacio en la finca para las clases secretas.',
      'Durante su estancia en Szczuki, Maria se enamoró de Kazimierz Żorawski, el hijo mayor de la familia, que entonces estudiaba matemáticas en la Universidad de Varsovia. El sentimiento era mutuo y Kazimierz pidió permiso a sus padres para casarse con ella. Los Żorawski rechazaron la propuesta con rotundidad: Maria era una empleada doméstica, y el matrimonio con alguien de condición social inferior era inaceptable para una familia de terratenientes. Este rechazo fue un golpe doloroso para Maria, pero fortaleció su resolución de forjarse un futuro independiente a través de la ciencia. Años después, siendo ya Premio Nobel, Maria se cruzó con Kazimierz en una conferencia; él era entonces profesor de matemáticas en la Universidad de Cracovia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Antes del puesto en Szczuki, Maria trabajó brevemente como institutriz para una familia de abogados en Varsovia. La experiencia fue negativa: la familia la trataba con condescendencia y le prohibía usar la biblioteca de la casa. Maria renunció tras unos meses. En una carta a su prima Henriette, escribió que prefería "servir en una casa donde al menos pudiera estudiar en paz" antes que soportar la humillación de ser tratada como inferior sin compensación intelectual alguna.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los libros que Władysław enviaba a Maria incluían obras fundamentales de la física del siglo XIX. El tratado de Adolphe Ganot, "Traité élémentaire de physique" (1851), cubría mecánica, acústica, óptica, electricidad y magnetismo en más de 1,100 páginas. El texto de Paul Émile Daniel incluía problemas de cálculo diferencial. Esta formación autodidacta le dio a Maria una base sólida que le permitió, al llegar a la Sorbona, dominar materias que muchos estudiantes franceses encontraban difíciles.' },
    ],
    fact: 'Kazimierz Żorawski, el joven que no pudo casarse con Maria por la oposición de su familia, se convirtió en un matemático distinguido especializado en geometría diferencial. Fue profesor en la Universidad de Cracovia y presidente de la Sociedad Matemática de Varsovia. Según testimonios recogidos por Robert Reid en su biografía de 1974, en sus últimos años Kazimierz solía sentarse durante largo rato frente a la estatua de Marie Curie que se erigió ante el Instituto del Radio en Varsovia, contemplándola en silencio.',
  },
  {
    id: 'universidad-volante',
    title: 'La Universidad Volante',
    color: '#7B1FA2',
    btnImage: '/assets/marie_curie/infographic_m1/btn_universidad-volante.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_universidad-volante.jpg',
    content: [
      'El Uniwersytet Latający ("Universidad Volante" o "Universidad Flotante") fue una institución clandestina de educación superior que operó en Varsovia entre 1885 y 1905. Recibía ese nombre porque cambiaba constantemente de ubicación para evadir a la policía secreta zarista, la Ojrana. Las clases se impartían en apartamentos privados, sótanos de iglesias, consultorios médicos y trastiendas de comercios. Nunca se reunían dos veces consecutivas en el mismo lugar, y los estudiantes recibían la dirección de la siguiente sesión mediante notas cifradas entregadas en mano.',
      'La Universidad Volante surgió de la tradición del "positivismo varsoviano", un movimiento intelectual que promovía la educación, la ciencia y el progreso económico como herramientas de emancipación nacional. Fue fundada y organizada por mujeres, entre ellas Jadwiga Szczawińska-Dawidowa. En sus aulas clandestinas se enseñaba anatomía humana, historia natural, sociología, historia de Polonia, literatura polaca y matemáticas avanzadas. Los profesores eran académicos polacos que arriesgaban sus carreras y su libertad personal para participar en esta empresa educativa secreta.',
      'Maria Skłodowska se inscribió en la Universidad Volante alrededor de 1884-1885, junto con su hermana Bronia. Asistía a sesiones de ciencias naturales y anatomía, donde por primera vez tuvo acceso a un microscopio y realizó disecciones de especímenes biológicos. También estudió sociología con Augustyn Wróblewski y recibió clases de química práctica en un laboratorio improvisado en una trastienda. Estas experiencias confirmaron su vocación científica y le proporcionaron conocimientos prácticos que complementaban su autoestudio teórico de los libros que le enviaba su padre.',
      'El riesgo de participar en la Universidad Volante era concreto y medible. Entre 1885 y 1905, la policía zarista realizó múltiples redadas contra instituciones educativas clandestinas en Varsovia. Los castigos incluían multas de hasta 300 rublos (equivalente a varios meses de salario de un profesor), expulsión del territorio del Reino de Polonia, o deportación a Siberia para los organizadores. Varios profesores de la Universidad Volante fueron detenidos y encarcelados brevemente. Maria y sus compañeros tomaban precauciones como llevar los cuadernos de notas ocultos bajo la ropa y memorizar las lecciones para destruir los apuntes escritos.',
      'La Universidad Volante tuvo un impacto duradero en la sociedad polaca y en la historia de la educación. Se estima que más de 5,000 estudiantes, en su mayoría mujeres, pasaron por sus aulas clandestinas entre 1885 y 1905. Cuando Polonia recuperó la independencia en 1918, la institución fue legalizada y se transformó en la Sociedad de Cursos Científicos Libres (Towarzystwo Kursów Naukowych), que en 1920 obtuvo reconocimiento oficial como universidad. Varias de sus antiguas alumnas se convirtieron en las primeras mujeres profesionales de la Polonia independiente: médicas, abogadas, profesoras universitarias y científicas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Ojrana, la policía secreta del zar, empleaba una red de informantes infiltrados en los movimientos estudiantiles polacos. Se estima que uno de cada diez participantes en organizaciones clandestinas podía ser un informante. Los organizadores de la Universidad Volante desarrollaron un sistema de células independientes: cada grupo de 8-10 estudiantes conocía solo a su profesor y al coordinador de su célula, pero no a los miembros de otros grupos. Este sistema de compartimentación, similar al usado por organizaciones de resistencia del siglo XX, protegía al conjunto si un grupo era descubierto.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En la Universidad Volante, Maria tuvo su primer contacto con el positivismo de Auguste Comte (1798-1857), la filosofía que sostenía que el conocimiento válido solo proviene de la observación empírica y el método científico. Comte clasificó las ciencias en una jerarquía que iba de las matemáticas (la más abstracta) a la sociología (la más compleja). Esta base filosófica influyó en el enfoque experimental que Maria aplicaría después en sus investigaciones sobre la radiactividad, privilegiando siempre la medición y la evidencia por encima de la especulación teórica.' },
    ],
    fact: 'La Universidad Volante no fue la única institución clandestina de educación en la Polonia ocupada. En la región de Galicia (bajo control austríaco), las restricciones eran menos severas, y las mujeres podían asistir a conferencias universitarias como oyentes desde 1878. Esto creó una paradoja geográfica: las mujeres polacas tenían derechos educativos diferentes según qué imperio las gobernara. Maria consideró brevemente estudiar en Cracovia (territorio austríaco), pero la distancia, el costo y la preferencia de Bronia por París determinaron la elección final de la Sorbona como destino.',
  },
  {
    id: 'sueno-paris',
    title: 'El Sueño de París',
    color: '#81C784',
    btnImage: '/assets/marie_curie/infographic_m1/btn_sueno-paris.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_sueno-paris.jpg',
    content: [
      'En noviembre de 1891, a los 24 años de edad, Maria Skłodowska abordó un tren de cuarta clase en la estación de Varsovia con destino a París. El viaje duró tres días completos, cruzando Alemania antes de llegar a la Gare du Nord. Llevaba consigo una maleta pequeña, una manta plegable, algo de comida para el camino y los ahorros que le quedaban de sus años como institutriz. Al llegar a la capital francesa, se dirigió al apartamento de su hermana Bronia, que ya vivía en París con su esposo Kazimierz Dłuski, un médico polaco exiliado.',
      'Maria se inscribió en la Facultad de Ciencias de la Universidad de París (la Sorbona) el 3 de noviembre de 1891, registrándose con el nombre francés "Marie Sklodowska". De los 1,825 estudiantes matriculados ese año en la Facultad de Ciencias, solo 23 eran mujeres, y Marie era una de las dos únicas extranjeras. Pagó una matrícula de 210 francos por año, cantidad que representaba una porción significativa de sus limitados recursos. Los cursos incluían física experimental, física matemática, química general y cálculo diferencial e integral.',
      'Tras unos meses viviendo con Bronia, Marie decidió mudarse sola para estar más cerca de la universidad y poder estudiar sin interrupciones. Alquiló una habitación en un sexto piso sin ascensor en la Rue Flatters, en el Barrio Latino. La habitación carecía de agua corriente, calefacción y gas para cocinar. En invierno, las temperaturas bajaban tanto que el agua se congelaba en la jarra de su mesita de noche. Marie estudiaba envuelta en toda la ropa que tenía, y en una ocasión se desmayó de hambre en la biblioteca; su cuñado Kazimierz Dłuski la encontró y la llevó a comer.',
      'La pobreza de Marie en París era severa pero voluntaria. Su presupuesto mensual era de aproximadamente 100 francos (equivalente a unos 40 dólares de la época), de los cuales 40 iban al alquiler. Con el resto debía cubrir matrícula, libros, comida y carbón para calentarse. Comía de forma precaria: chocolate, pan y, ocasionalmente, huevos o fruta. Años después, recordaría este período sin amargura, afirmando que la libertad de estudiar lo que quería compensaba todas las incomodidades materiales. La Sorbona le ofrecía lo que Varsovia le negaba: acceso irrestricto al conocimiento.',
      'París en 1891 era una metrópolis de 2.4 millones de habitantes en plena Belle Époque. La Torre Eiffel, construida dos años antes para la Exposición Universal de 1889, dominaba el horizonte. El metro aún no existía (se inauguró en 1900) y el transporte público dependía de tranvías tirados por caballos y ómnibus. La Sorbona, fundada en 1257, ocupaba sus edificios reconstruidos entre 1884 y 1901 en el Barrio Latino. Marie caminaba cada mañana desde su habitación hasta la universidad, un trayecto de unos 20 minutos, atravesando el bulevar Saint-Michel y la Place de la Sorbonne.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El tren de cuarta clase que Marie tomó desde Varsovia no tenía asientos tapizados, solo bancos de madera. Los pasajeros viajaban hacinados y debían llevar su propia comida para los tres días de trayecto. Marie llevó un taburete plegable porque a veces no había espacio en los bancos. Años después, en sus notas autobiográficas de 1923, recordó el viaje como un momento de transición simbólica: dejaba atrás la opresión del imperio ruso y entraba en un país donde el conocimiento no tenía restricciones de género.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Sorbona de 1891 era uno de los centros científicos más avanzados del mundo. Su Facultad de Ciencias contaba con laboratorios de física equipados con instrumentos de precisión fabricados por las casas Ruhmkorff y Breguet. El departamento de física estaba dirigido por Gabriel Lippmann (Premio Nobel de Física en 1908 por la fotografía en color), quien sería el director de tesis de Marie. Los laboratorios disponían de galvanómetros, electrómetros de Thomson y cámaras de ionización, instrumentos que Marie aprendería a dominar con destreza.' },
    ],
    fact: 'La matrícula de Marie en la Sorbona se conserva en los archivos de la Universidad de París. Está registrada como "Sklodowska, Marie", con la fecha de inscripción del 3 de noviembre de 1891, número de matrícula 17943. Fue la 1,826ª persona inscrita en la Facultad de Ciencias ese año académico. Estos documentos originales sobrevivieron a las dos guerras mundiales y están ahora digitalizados como parte del patrimonio histórico de la universidad. La firma de Marie en el registro muestra una caligrafía firme y clara, con trazos que revelan la práctica meticulosa de una autodidacta acostumbrada a tomar notas.',
  },
  {
    id: 'primeros-estudios',
    title: 'Primeros Estudios',
    color: '#8E24AA',
    btnImage: '/assets/marie_curie/infographic_m1/btn_primeros-estudios.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_primeros-estudios.jpg',
    content: [
      'Marie se dedicó a sus estudios en la Sorbona con una intensidad que sus compañeros describirían después como "casi sobrehumana". Se levantaba a las seis de la mañana, estudiaba hasta la hora de las clases, asistía a las lecciones, trabajaba en el laboratorio hasta las seis de la tarde, cenaba algo ligero y volvía a estudiar hasta las dos de la madrugada. Este régimen de 18 a 20 horas diarias de trabajo intelectual y experimental era sostenible solo por su capacidad de concentración y su motivación. Dominó el francés académico en pocos meses, pasando de tomar apuntes con dificultad a redactar informes de laboratorio con soltura.',
      'En julio de 1893, Marie se presentó al examen de licenciatura en física (licence ès sciences physiques). De los 30 candidatos que se presentaron, Marie obtuvo el primer lugar. Esta clasificación era relevante porque determinaba el acceso a becas y puestos de laboratorio. Al año siguiente, en 1894, obtuvo su segunda licenciatura, en matemáticas, clasificándose segunda de su promoción. Este doble título la convertía en una de las personas más cualificadas de su generación en la Sorbona, y la primera mujer de origen polaco en obtener ambas licenciaturas en la universidad.',
      'El laboratorio de Gabriel Lippmann fue el espacio donde Marie desarrolló sus primeras habilidades experimentales. Lippmann, que recibiría el Premio Nobel de Física en 1908 por su método de fotografía en color basado en interferencia óptica, era un experimentador meticuloso que exigía precisión milimétrica a sus estudiantes. Marie aprendió a calibrar instrumentos de medición, a manejar electrómetros sensibles y a diseñar montajes experimentales reproducibles. Estas habilidades técnicas, adquiridas entre 1892 y 1894, serían fundamentales para sus futuras investigaciones sobre radiactividad.',
      'En 1894, Marie recibió un encargo de la Sociedad para el Fomento de la Industria Nacional (Société d\'Encouragement pour l\'Industrie Nationale): estudiar las propiedades magnéticas de diferentes tipos de acero. Este fue su primer proyecto de investigación independiente. Necesitaba medir la magnetización de muestras de acero con precisión, pero el pequeño laboratorio que le habían asignado en la Sorbona no disponía del espacio ni del equipamiento adecuado. Fue esta necesidad de un laboratorio más grande lo que, por intervención del profesor Józef Kowalski, la llevaría a conocer a Pierre Curie.',
      'La beca Alexandrovitch, otorgada por el gobierno polaco en el exilio a estudiantes polacos sobresalientes en el extranjero, fue un apoyo financiero que Marie recibió en 1894 por valor de 600 rublos (equivalente a unos 1,500 francos). Esta beca le permitió concentrarse en su segunda licenciatura sin tener que dar tantas clases particulares de matemáticas, que era su principal fuente de ingresos complementaria. Marie devolvió el importe total de la beca años después, cuando sus circunstancias económicas mejoraron, para que otro estudiante polaco pudiera beneficiarse. Este gesto reflejaba su sentido de responsabilidad comunitaria y su vínculo con la diáspora polaca en París.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Sociedad para el Fomento de la Industria Nacional fue fundada en 1801 por Napoleón Bonaparte. Cuando Marie recibió su encargo en 1894, la sociedad llevaba casi un siglo promoviendo la investigación aplicada en Francia. El estudio sobre las propiedades magnéticas del acero que le encargaron tenía aplicaciones directas en la industria metalúrgica francesa, que necesitaba datos precisos sobre la permeabilidad magnética de diferentes aleaciones para mejorar la fabricación de transformadores eléctricos y motores.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El electrómetro que Marie aprendió a usar en el laboratorio de Lippmann era un instrumento capaz de medir corrientes eléctricas del orden de picoamperios (10⁻¹² amperios). El modelo más avanzado disponible era el electrómetro de cuadrantes de Thomson (Lord Kelvin), que utilizaba una aguja suspendida por un hilo de cuarzo dentro de cuatro sectores metálicos. La desviación de la aguja, observada mediante un microscopio, indicaba la carga eléctrica. Marie dominó este instrumento con tal habilidad que Pierre Curie quedaría después impactado por la precisión de sus mediciones.' },
    ],
    fact: 'Marie no solo devolvió la beca Alexandrovitch: la devolvió con intereses, a pesar de que no se le exigía hacerlo. En una carta al comité de la beca fechada en 1897, escribió que consideraba el dinero como un préstamo de honor de la comunidad polaca, no como un regalo. El comité quedó sorprendido porque ningún beneficiario anterior había devuelto el monto. Este episodio se cita en la biografía de Susan Quinn (1995) como ejemplo del código ético riguroso que Marie Curie mantuvo durante toda su vida profesional.',
  },
  {
    id: 'encuentro-pierre',
    title: 'El Encuentro con Pierre',
    color: '#388E3C',
    btnImage: '/assets/marie_curie/infographic_m1/btn_encuentro-pierre.jpg',
    image: '/assets/marie_curie/infographic_m1/hero_encuentro-pierre.jpg',
    content: [
      'Pierre Curie nació el 15 de mayo de 1859 en París, hijo de Eugène Curie, un médico con intereses científicos. Pierre y su hermano Jacques fueron educados en casa por su padre, quien consideraba que el sistema escolar francés sofocaba la creatividad. Pierre obtuvo su licenciatura en física a los 16 años y su maestría a los 18. Para 1894, cuando conoció a Marie, ya era jefe de laboratorio en la Escuela Municipal de Física y Química Industrial de París (ESPCI) y había publicado trabajos relevantes sobre la simetría de los cristales y las propiedades del magnetismo.',
      'El descubrimiento más importante de Pierre antes de conocer a Marie fue la piezoelectricidad, realizado junto con su hermano Jacques en 1880. Descubrieron que ciertos cristales, como el cuarzo y la turmalina, generan una carga eléctrica cuando se los comprime mecánicamente. También demostraron el efecto inverso: al aplicar un campo eléctrico, el cristal se deforma. Los hermanos Curie diseñaron un electrómetro piezoeléctrico de cuarzo que permitía medir cargas eléctricas con una precisión sin precedentes. Este instrumento sería la herramienta clave que Marie utilizaría después para medir la radiactividad.',
      'El encuentro entre Marie y Pierre tuvo lugar en la primavera de 1894, durante una cena en el domicilio del profesor Józef Kowalski, un físico polaco que enseñaba en la Universidad de Friburgo. Kowalski conocía el problema de Marie con el espacio de laboratorio y sabía que Pierre tenía un laboratorio en la ESPCI. Los presentó esperando una colaboración profesional. La conversación esa noche giró en torno a la simetría en los cristales y las propiedades magnéticas de los materiales. Según el relato de Eve Curie, su hija, Pierre quedó cautivado por la combinación de rigor intelectual y apasionamiento científico de Marie.',
      'Pierre cortejó a Marie durante varios meses con una mezcla de timidez personal y audacia intelectual. Le regaló una copia firmada de su artículo "Sur la symétrie dans les phénomènes physiques" (Sobre la simetría en los fenómenos físicos), publicado en el Journal de Physique en 1894. En sus cartas, no hablaba de flores ni de paseos románticos, sino de la belleza de las ecuaciones y del futuro de la investigación científica. En una carta fechada el 10 de agosto de 1894, Pierre escribió a Marie: "Sería algo hermoso pasar la vida uno cerca del otro, hipnotizados por nuestros sueños: tu sueño patriótico, nuestro sueño humanitario y nuestro sueño científico."',
      'Marie y Pierre se casaron el 26 de julio de 1895 en una ceremonia civil en el ayuntamiento de Sceaux, un municipio al sur de París donde vivía la familia Curie. No hubo ceremonia religiosa: Pierre era agnóstico y Marie había perdido la fe tras las muertes de su hermana y su madre. Marie no usó vestido blanco; llevó un traje azul oscuro que después utilizó como ropa de laboratorio durante años. Con el dinero recibido como regalo de boda, la pareja compró dos bicicletas y pasó su luna de miel recorriendo la campiña de Isla de Francia y Auvernia. Estas bicicletas se convirtieron en su medio de transporte habitual, y las usaron durante años para desplazarse entre su domicilio y los laboratorios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Pierre Curie descubrió en 1895 que los materiales ferromagnéticos pierden sus propiedades magnéticas al calentarse por encima de una temperatura específica, hoy conocida como "temperatura de Curie" o "punto de Curie". Para el hierro, esta temperatura es de 770°C. Este descubrimiento fue parte de su tesis doctoral, titulada "Propriétés magnétiques des corps à diverses températures" (Propiedades magnéticas de los cuerpos a diversas temperaturas), que defendió el 6 de marzo de 1895, cuatro meses antes de su boda con Marie.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La piezoelectricidad descubierta por los hermanos Curie en 1880 es hoy una tecnología presente en la vida cotidiana. Los encendedores de cocina usan un cristal piezoeléctrico que genera una chispa al ser golpeado. Los relojes de cuarzo funcionan porque un cristal de cuarzo vibra a una frecuencia precisa de 32,768 Hz cuando se le aplica una corriente eléctrica. Los micrófonos de contacto, los sensores de presión, las ecografías médicas y los inyectores de combustible de automóviles modernos utilizan todos el principio descubierto por Pierre y Jacques Curie hace más de 140 años.' },
    ],
    fact: 'El ayuntamiento de Sceaux donde se casaron Marie y Pierre Curie el 26 de julio de 1895 conserva el acta de matrimonio original. El documento registra a la novia como "Marie Sklodowska, sin profesión, nacida en Varsovia el 7 de noviembre de 1867" y al novio como "Pierre Curie, profesor de física, nacido en París el 15 de mayo de 1859". Los testigos fueron el padre de Pierre, Eugène Curie, y un colega científico. No había ningún familiar polaco de Marie presente en la ceremonia, ya que los costos del viaje desde Varsovia eran prohibitivos para la familia Skłodowski.',
  },
];

// ——— Radium Particle Field (Canvas Background) ——————————————————————————
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

// ——— Curie Header ————————————————————————————————————————————————————
function CurieHeader() {
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
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.3" />
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.3" transform="rotate(60 300 30)" />
        <defs>
          <linearGradient id="curieGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(106,27,154,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA NIÑA DE VARSOVIA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MARIA SKŁODOWSKA · 1867–1895</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) —————————————————————
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
          layoutId="activeDotCurieM1"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

        {/* ——— Video Section (conditional) ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————————
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

// ——— Main Infographic Component ——————————————————————————————————————————
export default function InteractiveInfographic_CurieM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/curie_m1.png)',
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

      <CurieHeader />

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
              🏆 ¡Has descubierto la historia de Maria Skłodowska!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia Estrella de Varsovia
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
