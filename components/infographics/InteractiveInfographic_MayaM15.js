'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya Codex themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoCodexFold({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 10 L25 5 L40 10 L55 5 L55 50 L40 55 L25 50 L10 55 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="25" y1="5" x2="25" y2="50" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="10" x2="40" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <rect x="15" y="15" width="6" height="6" fill={color} opacity="0.4" />
      <rect x="45" y="15" width="6" height="6" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoVenusTable({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 17 * Math.cos(rad)} cy={30 + 17 * Math.sin(rad)} r="3" fill={color} opacity="0.7" />;
      })}
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoEclipseRing({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 A20 20 0 1 1 10 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M10 30 A20 20 0 0 1 30 10" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFF8E1" stroke={color} strokeWidth="1" />
      <path d="M20 40 L15 45 M40 40 L45 45 M20 20 L15 15" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoQuill({ size = 70, color = '#00695C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M50 10 C40 10 30 20 20 40 C18 45 15 50 10 50 C15 45 20 40 25 35 C35 25 45 15 50 10 Z" fill={color} opacity="0.5" stroke={color} strokeWidth="1" />
      <line x1="50" y1="10" x2="20" y2="40" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="48" r="2" fill={color} />
      <path d="M10 50 Q15 55 20 52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyphColumn({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="5" width="20" height="50" fill="none" stroke={color} strokeWidth="1.5" rx="3" />
      <rect x="23" y="8" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="24" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="40" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.6" />
      <circle cx="15" cy="30" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'codice-descubrimiento': [DecoCodexFold, DecoQuill, DecoGlyphColumn],
  'estructura-fisica': [DecoCodexFold, DecoGlyphColumn, DecoQuill],
  'tablas-venus': [DecoVenusTable, DecoGlyphColumn, DecoCodexFold],
  'tablas-eclipses': [DecoEclipseRing, DecoVenusTable, DecoCodexFold],
  'tablas-lluvia': [DecoQuill, DecoEclipseRing, DecoGlyphColumn],
  'matematica-codice': [DecoGlyphColumn, DecoVenusTable, DecoCodexFold],
  'supervivencia-codice': [DecoCodexFold, DecoQuill, DecoEclipseRing],
};

const BIBLIOGRAPHY = [
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Coe, M.D. & Van Stone, M. (2005). Reading the Maya Glyphs, Thames & Hudson',
  'Thompson, J.E.S. (1972). A Commentary on the Dresden Codex, American Philosophical Society',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Love, B. (1994). The Paris Codex: Handbook for a Maya Priest, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'codice-descubrimiento',
    title: 'El Descubrimiento',
    color: '#C62828',
    btnImage: '/assets/maya/infographic_m15/btn_codice-descubrimiento.jpg',
    image: '/assets/maya/infographic_m15/hero_codice-descubrimiento.jpg',
    content: [
      'Imagina encontrar un libro antiguo sin saber de dÃ³nde viene. AsÃ­ comenzÃ³ la historia moderna del CÃ³dice de Dresde. En el aÃ±o 1739, Johann Christian GÃ¶tze, director de la Biblioteca Real de Sajonia en la ciudad de Dresde, Alemania, comprÃ³ este extraÃ±o documento a un propietario privado en Viena. Nadie sabÃ­a quiÃ©n lo habÃ­a escrito, quÃ© idioma contenÃ­a o cÃ³mo habÃ­a cruzado el ocÃ©ano desde AmÃ©rica hasta Europa.',
      'Durante casi un siglo, el cÃ³dice fue un misterio total. Era como un rompecabezas cuyas piezas no encajaban con ningÃºn otro libro conocido. Los eruditos europeos lo miraban con fascinaciÃ³n, pero sus extraÃ±os dibujos de dioses, animales y sÃ­mbolos geomÃ©tricos eran indescifrables. Fue hasta el siglo XIX cuando un bibliotecario llamado Ernst FÃ¶rstemann comenzÃ³ a estudiar seriamente sus pÃ¡ginas y descubriÃ³ que los puntos y barras eran un sistema matemÃ¡tico.',
      'El viaje de este libro estuvo lleno de peligros. El mayor riesgo ocurriÃ³ durante la Segunda Guerra Mundial. En 1945, los Aliados bombardearon intensamente la ciudad de Dresde, destruyendo gran parte de sus edificios. La biblioteca donde se guardaba el cÃ³dice sufriÃ³ daÃ±os inmensos. El libro logrÃ³ sobrevivir gracias a que estaba resguardado en un sÃ³tano, pero sufriÃ³ fuertes daÃ±os por el agua utilizada para apagar los incendios del edificio.',
      'Hoy en dÃ­a, el CÃ³dice de Dresde se conserva en la SÃ¤chsische Landesbibliothek (Biblioteca Estatal de Sajonia). Se exhibe en una sala especial con temperatura y humedad controladas para evitar que el papel antiguo se deshaga. Es un tesoro invaluable porque es uno de los pocos libros mayas que sobrevivieron a la destrucciÃ³n colonial. Es como tener un mensaje directo del pasado, guardado celosamente.',
      'Los historiadores creen que el cÃ³dice fue enviado a Europa poco despuÃ©s de la conquista espaÃ±ola, tal vez como un regalo para el rey Carlos V. Durante cientos de aÃ±os pasÃ³ de mano en mano entre nobles y coleccionistas antes de llegar a la biblioteca. Su supervivencia es un verdadero milagro histÃ³rico, una pequeÃ±a ventana que nos permite observar la inmensa sabidurÃ­a cientÃ­fica y astronÃ³mica de la antigua civilizaciÃ³n maya.'
    ],
    expandables: [
      { label: 'Un Tesoro Rescatado', icon: 'clock', text: 'El daÃ±o por agua de 1945 fue un momento crÃ­tico. El agua hizo que los pigmentos antiguos comenzaran a correrse y manchar las pÃ¡ginas. Los restauradores tuvieron que trabajar con extremo cuidado durante aÃ±os para secar el documento sin romperlo. Gracias a fotografÃ­as tomadas antes de la guerra, sabemos cÃ³mo lucÃ­an las partes que se borraron.' },
      { label: 'El Primer Vistazo', icon: 'clock', text: 'Cuando Alexander von Humboldt, el famoso explorador y cientÃ­fico alemÃ¡n, vio el cÃ³dice en el siglo XIX, incluyÃ³ algunas pÃ¡ginas en sus publicaciones. Esto ayudÃ³ a que cientÃ­ficos de todo el mundo conocieran el documento, iniciando la carrera internacional para descifrar la misteriosa escritura maya y sus complejos nÃºmeros matemÃ¡ticos.' }
    ],
    fact: 'El CÃ³dice de Dresde no es un libro que se lee de izquierda a derecha como los nuestros. Los investigadores descubrieron que sus pÃ¡ginas contienen secciones independientes llamadas "almanaques", y cada almanaque tiene un orden de lectura especÃ­fico, a menudo en zigzag. Â¡Es como leer un mapa del cielo donde cada direcciÃ³n tiene un significado matemÃ¡tico diferente!'
  },
  {
    id: 'estructura-fisica',
    title: 'Estructura FÃ­sica',
    color: '#5D4037',
    btnImage: '/assets/maya/infographic_m15/btn_estructura-fisica.jpg',
    image: '/assets/maya/infographic_m15/hero_estructura-fisica.jpg',
    content: [
      'Si piensas en un libro actual, imaginas hojas de papel cosidas en el lomo. El CÃ³dice de Dresde es completamente diferente. Es una tira larguÃ­sima que mide unos impresionantes 3.56 metros de largo. Para poder guardarlo y leerlo, los mayas lo doblaron como un acordeÃ³n, creando 39 hojas que se pueden leer por ambos lados. Este formato se llama "libro biombo" o formato en acordeÃ³n, ideal para desplegar en mesas ceremoniales.',
      'El material sobre el que estÃ¡ escrito es otra maravilla. No es papel hecho de pulpa de madera comÃºn. Los artesanos mayas utilizaban la corteza interna de un Ã¡rbol de higuera silvestre. A este material especial lo llamaban "amate". Para prepararlo, remojaban la corteza, la golpeaban con piedras especiales hasta dejarla fina, y finalmente la cubrÃ­an con una capa de cal blanca para crear una superficie lisa donde pintar.',
      'Los artistas mayas, conocidos como "escribas", eran personas de muy alto rango en la sociedad. Utilizaban pinceles finÃ­simos hechos con pelo de animales para dibujar los glifos. Estos escribas trabajaban con una precisiÃ³n increÃ­ble, dibujando pequeÃ±os sÃ­mbolos matemÃ¡ticos y rostros de dioses en espacios de apenas un centÃ­metro cuadrado. Su pulso firme era el de un experto artista y matemÃ¡tico al mismo tiempo.',
      'Para pintar el cÃ³dice, usaron pigmentos naturales. El negro brillante se hacÃ­a con carbÃ³n fino; el rojo intenso venÃ­a de minerales como la hematita o de insectos como la cochinilla; y el famoso "Azul Maya", un color turquesa brillante, se lograba mezclando arcilla con la planta del aÃ±il. Este azul es tan resistente que ha mantenido su brillo durante siglos a pesar de la humedad y el tiempo transcurrido.',
      'Los expertos creen que el libro que tenemos en Dresde no es el texto original, sino una copia hecha alrededor del siglo XI o XII (entre los aÃ±os 1000 y 1200 d.C.) en la regiÃ³n de ChichÃ©n ItzÃ¡, YucatÃ¡n. Es como cuando sacas una fotocopia de los apuntes de tu profesor, pero los mayas copiaban a mano antiguos tratados astronÃ³micos que tenÃ­an cientos de aÃ±os de antigÃ¼edad, asegurando que el conocimiento no se perdiera.'
    ],
    expandables: [
      { label: 'El Papel Amate', icon: 'atom', text: 'El proceso de crear papel amate (corteza batida) requerÃ­a gran habilidad. Los arqueÃ³logos han encontrado los "golpeadores de corteza" de piedra que usaban los artesanos. La capa de cal blanca aplicada encima actuaba como un sellador; sin ella, la tinta se habrÃ­a esparcido por las fibras de la madera como agua en una servilleta de papel.' },
      { label: 'Manos Diferentes', icon: 'atom', text: 'Al analizar cuidadosamente el estilo de los dibujos, los investigadores han descubierto que al menos ocho artistas diferentes trabajaron en la creaciÃ³n del CÃ³dice de Dresde. Cada escriba tenÃ­a su propia manera particular de dibujar ciertos glifos o rostros de dioses, revelando que el libro fue un enorme trabajo en equipo.' }
    ],
    fact: 'El formato de acordeÃ³n de 39 pÃ¡ginas permite que el libro tenga en total 78 "pÃ¡ginas" legibles (cuatro pÃ¡ginas se dejaron en blanco). Este diseÃ±o plegable era increÃ­blemente prÃ¡ctico: un sacerdote podÃ­a abrir el libro exactamente en la secciÃ³n que necesitaba consultar para una ceremonia especÃ­fica, sin tener que pasar pÃ¡ginas una por una como hacemos hoy.'
  },
  {
    id: 'tablas-venus',
    title: 'Tablas de Venus',
    color: '#1565C0',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-venus.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-venus.jpg',
    content: [
      'Imagina intentar predecir el movimiento de un planeta sin usar telescopios, computadoras ni calculadoras. Eso es exactamente lo que lograron los astrÃ³nomos mayas con el planeta Venus. En las pÃ¡ginas 24 y de la 46 a la 50 del cÃ³dice, se encuentran las famosas "Tablas de Venus". Estas tablas registran el ciclo completo del planeta visto desde la Tierra, dividiÃ©ndolo en cuatro fases distintas durante un largo perÃ­odo.',
      'Venus es el objeto mÃ¡s brillante en el cielo nocturno despuÃ©s de la Luna. Para los mayas, no era solo un planeta hermoso; representaba una fuerza poderosa y peligrosa asociada con deidades guerreras. El ciclo de Venus, desde que aparece como estrella de la maÃ±ana hasta que se convierte en estrella de la tarde, dura en promedio 584 dÃ­as. Las tablas del cÃ³dice registran estos ciclos con una precisiÃ³n que sorprende a los astrÃ³nomos modernos.',
      'Las tablas no solo cuentan un ciclo corto. Son capaces de rastrear a Venus durante mÃ¡s de 33,000 dÃ­as consecutivos. Â¡Eso es como llevar un calendario de eventos durante 90 aÃ±os sin equivocarse! Los sacerdotes utilizaban esta informaciÃ³n para predecir cuÃ¡ndo el planeta aparecerÃ­a por primera vez en el horizonte antes del amanecer, un evento llamado "salida helÃ­aca", que consideraban un momento crÃ­tico lleno de gran poder.',
      'El mayor triunfo de los matemÃ¡ticos mayas en estas tablas fue manejar el error acumulado. El ciclo de Venus no dura exactamente 584 dÃ­as; en realidad, es de 583.92 dÃ­as. Esa pequeÃ±Ã­sima diferencia parece insignificante, pero a lo largo de dÃ©cadas, los dÃ­as se desajustarÃ­an. Los mayas inventaron un sistema de correcciÃ³n, como nuestros aÃ±os bisiestos, para restar dÃ­as de su calendario y mantener las predicciones perfectas.',
      'Gracias a estas correcciones matemÃ¡ticas avanzadas, las Tablas de Venus del CÃ³dice de Dresde son consideradas los datos astronÃ³micos mÃ¡s exactos del planeta Venus creados antes de la invenciÃ³n del telescopio en Europa. Es una prueba contundente de que la observaciÃ³n constante y la matemÃ¡tica inteligente pueden igualar o superar la tecnologÃ­a moderna. Los mayas eran verdaderos maestros del cielo. Imagina que son detectives estelares anotando pistas cada noche sin fallar. AsÃ­ armaron un reloj cÃ³smico perfecto usando solamente sus ojos naturales y muchÃ­sima paciencia.'
    ],
    expandables: [
      { label: 'Las Cuatro Fases', icon: 'atom', text: 'Los mayas dividieron el viaje de Venus en cuatro estaciones visuales: 236 dÃ­as como estrella de la maÃ±ana, 90 dÃ­as desaparecido detrÃ¡s del Sol, 250 dÃ­as como estrella de la tarde, y 8 dÃ­as desaparecido frente al Sol. Esta observaciÃ³n detallada muestra una comprensiÃ³n profunda de cÃ³mo los planetas orbitan alrededor de nuestra estrella central.' },
      { label: 'CorrecciÃ³n del Calendario', icon: 'clock', text: 'En la pÃ¡gina 24, el cÃ³dice muestra mÃºltiplos del ciclo de Venus y fechas especÃ­ficas donde los sacerdotes debÃ­an saltarse dÃ­as para corregir el calendario. Es un algoritmo de correcciÃ³n astronÃ³mica increÃ­blemente elegante. Cuando los europeos descubrieron esto, quedaron estupefactos ante la brillantez matemÃ¡tica maya.' }
    ],
    fact: 'La salida helÃ­aca de Venus (cuando aparece en el cielo justo antes del amanecer despuÃ©s de dÃ­as de estar oculto) era considerada un momento muy peligroso. Los mayas creÃ­an que la luz del planeta brillaba como rayos o lanzas que afectaban a los reyes y las cosechas, por lo que usaban el CÃ³dice de Dresde para saber exactamente cuÃ¡ndo debÃ­an prepararse para estos dÃ­as crÃ­ticos.'
  },
  {
    id: 'tablas-eclipses',
    title: 'Tablas de Eclipses',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-eclipses.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-eclipses.jpg',
    content: [
      'Un eclipse solar â€”cuando el dÃ­a se oscurece repentinamenteâ€” aterrorizaba a muchas culturas antiguas. Pero los mayas, en lugar de solo asustarse, decidieron estudiar el fenÃ³meno. En las pÃ¡ginas 51 a 58 del CÃ³dice de Dresde, los astrÃ³nomos crearon un manual completo para advertir sobre la posible ocurrencia de eclipses solares y lunares. Era su propio sistema de alerta temprana contra la oscuridad. Piensa en este manual como una alarma climÃ¡tica para el espacio exterior. Si sabÃ­an cuÃ¡ndo vendrÃ­a la gran sombra, podÃ­an prepararse tranquilos sin tener miedo.',
      'Para construir esta tabla, los mayas registraron pacientemente las fases de la luna durante generaciones. Descubrieron un patrÃ³n matemÃ¡tico asombroso: agruparon 405 meses lunares (lunaciones) que equivalen a 11,960 dÃ­as. Este nÃºmero mÃ¡gico es un ciclo gigante que conecta los movimientos del Sol, la Luna y la Tierra, permitiendo predecir cuÃ¡ndo se alinearÃ¡n para formar un eclipse. Es como descubrir el ritmo secreto de una danza cÃ³smica entre tres amigos gigantes. Al conocer los pasos exactos, sabÃ­an cuÃ¡ndo los grandes bailarines iban a encontrarse.',
      'Las tablas estÃ¡n divididas en 69 grupos de lunas. Para los matemÃ¡ticos, lo fascinante es que los mayas agruparon los meses en paquetes de 5 y 6 lunaciones. Â¿Por quÃ©? Porque descubrieron que los eclipses solo pueden ocurrir en esos intervalos especÃ­ficos (aproximadamente cada 148 o 177 dÃ­as). Es como saber que el autobÃºs escolar solo pasa a ciertas horas; si sabes el horario, sabes cuÃ¡ndo estar alerta. Tener estos paquetes predecibles funcionaba como un calendario escolar gigante. AsÃ­ nunca llegaban tarde para observar el asombroso espectÃ¡culo del cielo.',
      'El manuscrito contiene dibujos muy descriptivos para marcar estos eventos peligrosos. Muestran sÃ­mbolos del Sol o de la Luna colgando de bandas celestiales, a veces acompaÃ±ados de monstruos oscuros que parecen devorar la luz. Estos dibujos no eran simple arte; eran advertencias de "temporada de peligro" para que los sacerdotes realizaran ceremonias que ayudaran al Sol a sobrevivir al ataque celestial.',
      'Aunque la tabla es brillante, no garantizaba que el eclipse serÃ­a visible desde la ciudad maya. PredecÃ­a cuÃ¡ndo las condiciones matemÃ¡ticas eran correctas para un eclipse en alguna parte del planeta Tierra. Funcionaba perfectamente como una herramienta de predicciÃ³n funcional, lo que demuestra que los mayas entendÃ­an la periodicidad de las Ã³rbitas espaciales con un nivel de sofisticaciÃ³n extraordinario.'
    ],
    expandables: [
      { label: 'El NÃºmero MÃ¡gico 11,960', icon: 'atom', text: 'El ciclo de 11,960 dÃ­as es excepcional porque conecta los ciclos lunares, el aÃ±o solar e incluso el calendario sagrado maya de 260 dÃ­as (el Tzolkin). 11,960 es exactamente divisible por 260 (46 aÃ±os sagrados). Para los mayas, encontrar nÃºmeros que sincronizaran mÃºltiples calendarios naturales era la mayor prueba del orden divino del universo.' },
      { label: 'ImÃ¡genes del Peligro', icon: 'clock', text: 'En la tabla, entre las columnas de nÃºmeros matemÃ¡ticos, hay imÃ¡genes de serpientes celestes o criaturas mordiendo el glifo kin (el Sol). Para los mayas, un eclipse era una batalla cÃ³smica. La tabla funcionaba como un horario para saber cuÃ¡ndo el dios del sol necesitarÃ­a ayuda de los humanos a travÃ©s de ofrendas.' }
    ],
    fact: 'Los astrÃ³nomos modernos han introducido los datos de la tabla de eclipses del CÃ³dice de Dresde en computadoras y confirmaron que la tabla cubre un perÃ­odo real de 33 aÃ±os (el siglo VIII d.C.), logrando predecir las "ventanas" de tiempo para los eclipses solares con una precisiÃ³n impecable. Â¡Es un observatorio astronÃ³mico en papel!'
  },
  {
    id: 'tablas-lluvia',
    title: 'Tablas de Lluvia y Marte',
    color: '#00695C',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-lluvia.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-lluvia.jpg',
    content: [
      'Mientras Venus y los eclipses eran eventos dramÃ¡ticos, la supervivencia diaria de los mayas dependÃ­a de algo mucho mÃ¡s terrenal: la agricultura. Una gran parte del CÃ³dice de Dresde estÃ¡ dedicada a almanaques que conectan los ciclos del cielo con las lluvias y las estaciones de siembra. Es esencialmente el calendario del agricultor mÃ¡s avanzado del mundo antiguo, uniendo el cielo y la tierra. Era su propia aplicaciÃ³n climÃ¡tica, pero escrita en frÃ¡gil papel. Sin esta valiosa guÃ­a, las fuertes plantas simplemente no podrÃ­an crecer altas.',
      'En estas secciones, el dios principal que aparece una y otra vez es Chaac, el poderoso dios maya de la lluvia. Los artistas lo dibujaron portando hachas que simbolizan los truenos y vasijas de donde derrama el agua vital sobre los campos de maÃ­z. Estas ilustraciones estÃ¡n estrechamente ligadas a los cuatro puntos cardinales, indicando de quÃ© direcciÃ³n vendrÃ­an los vientos y las tormentas estacionales.',
      'Pero no todo era lluvia; los mayas tambiÃ©n vigilaban al planeta Marte. En unas pÃ¡ginas fascinantes del cÃ³dice, los expertos han identificado tablas dedicadas a este planeta rojo. Marte tiene un movimiento extraÃ±o en el cielo nocturno llamado "movimiento retrÃ³grado" â€” a veces parece detenerse y moverse hacia atrÃ¡s. Los mayas mapearon estos curiosos retrocesos celestiales con gran paciencia. Imagina un veloz coche que frena y viaja en reversa repentinamente. AsÃ­ veÃ­an ellos al planeta marciano, como un corredor espacial haciendo trucos increÃ­bles.',
      'El almanaque de Marte asocia al planeta con una extraÃ±a deidad de largo hocico que desciende del cielo cÃ³smico. El ciclo registrado en estas tablas es de 780 dÃ­as, que es asombrosamente preciso: el perÃ­odo real en el que Marte y la Tierra vuelven a alinearse con el Sol (perÃ­odo sinÃ³dico) es de 779.94 dÃ­as. Su registro es prÃ¡cticamente perfecto sin usar herramientas modernas de mediciÃ³n Ã³ptica. Lograr esta precisiÃ³n matemÃ¡tica es como adivinar el nÃºmero exacto de pequeÃ±os dulces sin tocarlos. Usaron su ingenio humano para ganar este juego celestial.',
      'Estos almanaques eran manuales prÃ¡cticos de supervivencia. Los sacerdotes usaban el libro para decirle a la gente cuÃ¡ndo quemar la selva, cuÃ¡ndo sembrar la semilla del maÃ­z y cuÃ¡ndo prepararse para fuertes tormentas. Al combinar los ciclos de Marte, las fases de la luna y las estaciones de lluvia, el cÃ³dice era una computadora de papel que garantizaba que la civilizaciÃ³n tuviera comida cada aÃ±o. Como un Ãºtil recetario, indicaba los ingredientes precisos del tiempo atmosfÃ©rico. AsÃ­ lograban obtener las mejores cosechas para alimentar a miles de hambrientos aldeanos.'
    ],
    expandables: [
      { label: 'El Dios Chaac', icon: 'atom', text: 'Chaac es fÃ¡cilmente reconocible en el cÃ³dice por su larga nariz rizada y colmillos. A menudo se le representa en grupos de cuatro, cada uno asociado a un color cardinal: rojo (Este), blanco (Norte), negro (Oeste) y amarillo (Sur). Estas direcciones eran fundamentales para predecir el clima agrÃ­cola en la penÃ­nsula de YucatÃ¡n.' },
      { label: 'El Planeta Rojo', icon: 'atom', text: 'El ciclo de 780 dÃ­as de Marte es muy interesante. Los mayas lo dividieron en intervalos de 78 dÃ­as. Para entender esto con el sistema Feynman: imagina una pista de carreras ovalada. La Tierra corre rÃ¡pido por el carril interior, y Marte corre lento por el exterior. Cada 780 dÃ­as, la Tierra da una vuelta de ventaja y vuelve a rebasar a Marte.' }
    ],
    fact: 'Una secciÃ³n del cÃ³dice (pÃ¡gina 74) muestra una imagen aterradora que los arqueÃ³logos llaman "El Diluvio". Se ve un gigantesco cocodrilo celestial vomitando una tormenta masiva, mientras una diosa anciana vierte cÃ¡ntaros de agua destructiva. Los expertos debaten si representa la estaciÃ³n de huracanes o una profecÃ­a del fin del mundo maya por ahogamiento.'
  },
  {
    id: 'matematica-codice',
    title: 'La MatemÃ¡tica',
    color: '#F9A825',
    btnImage: '/assets/maya/infographic_m15/btn_matematica-codice.jpg',
    image: '/assets/maya/infographic_m15/hero_matematica-codice.jpg',
    content: [
      'Para entender el universo, primero debes dominar los nÃºmeros. El CÃ³dice de Dresde es un monumento brillante a la matemÃ¡tica maya. Ellos utilizaban un sistema vigesimal, lo que significa que en lugar de contar de 10 en 10 como hacemos nosotros, contaban de 20 en 20. Imagina contar usando no solo los diez dedos de tus manos, sino sumando tambiÃ©n los diez dedos de tus pies. Â¡AsÃ­ pensaban los matemÃ¡ticos mayas!',
      'Su forma de escribir los nÃºmeros era increÃ­blemente simple y poderosa: un punto representaba el uno, y una barra horizontal representaba el cinco. Para escribir el nÃºmero 13, simplemente dibujabas dos barras (que suman 10) y tres puntos encima. Con solo estos dos sÃ­mbolos bÃ¡sicos, podÃ­an construir nÃºmeros gigantescos apilÃ¡ndolos en columnas verticales ascendentes. Imagina usar bloques de construcciÃ³n donde los puntos son bloques pequeÃ±os y las barras son bloques largos. Apilando estas simples piezas podÃ­an construir grandes torres que alcanzaban el vasto cielo.',
      'El mayor genio de su sistema fue la invenciÃ³n del cero matemÃ¡tico, que dibujaban con un sÃ­mbolo en forma de concha de caracol. Muchas civilizaciones antiguas, como los romanos, no tenÃ­an el nÃºmero cero, lo que hacÃ­a que sus cÃ¡lculos grandes fueran una pesadilla. El cero maya permitÃ­a mantener la posiciÃ³n de grandes cantidades, revolucionando su capacidad para calcular eventos que sucederÃ­an miles de aÃ±os en el futuro.',
      'El cÃ³dice estÃ¡ lleno de largas columnas de nÃºmeros que, cuando se traducen, revelan "Fechas de Cuenta Larga". Este era un calendario continuo que marcaba los dÃ­as transcurridos desde el dÃ­a cero de la creaciÃ³n del mundo maya (que equivale a nuestro aÃ±o 3114 a.C.). Las pÃ¡ginas muestran multiplicaciones masivas, con nÃºmeros que suman millones de dÃ­as transcurridos con precisiÃ³n absoluta. Funciona como el medidor de un auto nuevo que nunca se detiene. SeguÃ­a contando cada dÃ­a como un viaje infinito por la gran autopista del tiempo.',
      'Lo mÃ¡s impresionante es cÃ³mo usaban la matemÃ¡tica para corregir sus propios errores. El cÃ³dice incluye "algoritmos" antiguos â€” series de instrucciones matemÃ¡ticas paso a paso. Si un ciclo cÃ³smico no encajaba perfectamente, el documento enseÃ±aba al sacerdote cÃ³mo sumar o restar ciertas cantidades matemÃ¡ticas para recalibrar los relojes. Es verdadera programaciÃ³n de computadoras, hecha completamente a mano sobre corteza de Ã¡rbol.'
    ],
    expandables: [
      { label: 'El Cero de Concha', icon: 'clock', text: 'El concepto del cero como valor posicional es uno de los mayores logros intelectuales de la humanidad. Los mayas lo desarrollaron de manera independiente siglos antes que los europeos. Su sÃ­mbolo de concha (probablemente representando un puÃ±o vacÃ­o) permitÃ­a distinguir entre el nÃºmero 20 y el nÃºmero 400 en su sistema apilado.' },
      { label: 'Multiplicaciones Antiguas', icon: 'atom', text: 'Varias pÃ¡ginas del CÃ³dice de Dresde contienen lo que esencialmente son "tablas de multiplicar" gigantes. En lugar de tener que hacer cÃ¡lculos largos cada vez, los sacerdotes podÃ­an buscar rÃ¡pidamente en el libro mÃºltiplos precalculados de ciclos importantes, como mÃºltiplos de 91 dÃ­as o de 78 dÃ­as. Un ahorro de tiempo vital.' }
    ],
    fact: 'El sistema de Cuenta Larga en el cÃ³dice puede calcular fechas en el pasado y futuro profundo. El llamado "NÃºmero Serpiente" en las pÃ¡ginas del cÃ³dice contiene un cÃ¡lculo matemÃ¡tico que viaja hacia atrÃ¡s en el tiempo por mÃ¡s de 12 millones de dÃ­as, apuntando a eventos mÃ­ticos que ocurrieron antes de la creaciÃ³n humana. Â¡El infinito matemÃ¡tico en sus manos!'
  },
  {
    id: 'supervivencia-codice',
    title: 'Supervivencia',
    color: '#FFF8E1',
    btnImage: '/assets/maya/infographic_m15/btn_supervivencia-codice.jpg',
    image: '/assets/maya/infographic_m15/hero_supervivencia-codice.jpg',
    content: [
      'El CÃ³dice de Dresde es un superviviente extraordinario de una de las mayores tragedias culturales de la historia humana. En la actualidad, solo existen cuatro cÃ³dices mayas autÃ©nticos en todo el mundo: el de Dresde, el de Madrid, el de ParÃ­s y el reciÃ©n validado CÃ³dice Maya de MÃ©xico (antes Grolier). Â¿Por quÃ© existen tan pocos libros de una civilizaciÃ³n que construyÃ³ inmensas ciudades y pirÃ¡mides? Imagina que de una gran biblioteca solo logran rescatarse cuatro libritos. Es un gran misterio que revela la dolorosa fragilidad del conocimiento humano.',
      'La respuesta se encuentra en un evento sombrÃ­o ocurrido en el siglo XVI. En julio del aÃ±o 1562, en el pueblo de ManÃ­ en YucatÃ¡n, un obispo franciscano llamado Diego de Landa realizÃ³ un "auto de fe". En un intento por imponer la religiÃ³n europea, ordenÃ³ quemar en una enorme hoguera pÃºblica miles de objetos sagrados y, trÃ¡gicamente, un gran nÃºmero de cÃ³dices mayas antiguos. Fue como si un fuerte incendio borrara la memoria central de una computadora antigua. Muchas increÃ­bles historias y descubrimientos cientÃ­ficos se esfumaron rÃ¡pidamente entre el oscuro humo.',
      'El propio obispo Landa escribiÃ³ sobre este fuego destructivo, afirmando que los libros contenÃ­an "supersticiones y falsedades del demonio", y relatÃ³ cÃ³mo los nativos mayas lloraron amargamente mientras el conocimiento de sus ancestros se reducÃ­a a cenizas. En esa sola tarde, se quemaron siglos incalculables de literatura, astronomÃ­a, medicina e historia antigua centroamericana. Es triste como formatear el disco duro de un gran cientÃ­fico. Miles de asombrosos inventos y relatos maravillosos desaparecieron por completo en unas breves horas.',
      'Los cuatro libros que sobrevivieron escaparon de este fuego porque probablemente fueron enviados secretamente a Europa por soldados curiosos o sacerdotes antes de la quema masiva. El CÃ³dice de Dresde es considerado unÃ¡nimemente como el mÃ¡s hermoso y cientÃ­ficamente complejo de los cuatro sobrevivientes, una obra maestra que nos muestra lo que perdimos aquel dÃ­a en las hogueras de ManÃ­. Estos cuatro hÃ©roes de papel cruzaron el mar escondidos como invaluables tesoros. Hoy nos recuerdan la tremenda inteligencia de una cultura brillante.',
      'Cada vez que miramos las pÃ¡ginas del CÃ³dice de Dresde, no solo vemos tablas astronÃ³micas y dibujos matemÃ¡ticos hermosos; estamos mirando el legado resistente del pueblo maya. Es una enciclopedia frÃ¡gil de papel de corteza que venciÃ³ las distancias oceÃ¡nicas, escapÃ³ de la inquisiciÃ³n colonial, sobreviviÃ³ los bombardeos de la guerra moderna y sigue asombrando a los cientÃ­ficos del mundo actual.'
    ],
    expandables: [
      { label: 'Los Cuatro Sobrevivientes', icon: 'atom', text: 'Los otros tres libros se nombran por las ciudades donde residen actualmente: el CÃ³dice de ParÃ­s (que trata sobre rituales), el CÃ³dice de Madrid (un manual astrolÃ³gico para agricultores), y el CÃ³dice Maya de MÃ©xico (un fragmento enfocado solo en el planeta Venus, considerado el mÃ¡s antiguo de todos).' },
      { label: 'La IronÃ­a HistÃ³rica', icon: 'clock', text: 'ParadÃ³jicamente, el mismo obispo Diego de Landa que quemÃ³ los libros escribiÃ³ despuÃ©s una crÃ³nica llamada "RelaciÃ³n de las cosas de YucatÃ¡n". En este libro documentÃ³ el alfabeto maya de manera imperfecta, pero sus notas fueron la clave fundamental (la "Piedra de Rosetta") que permitiÃ³ a los expertos modernos descifrar la escritura y leer el CÃ³dice de Dresde.' }
    ],
    fact: 'El conocimiento contenido en el CÃ³dice de Dresde era tan avanzado que cuando el astrÃ³nomo estadounidense John Teeple descifrÃ³ las tablas de eclipses en la dÃ©cada de 1920, la comunidad cientÃ­fica internacional finalmente reconociÃ³ que los antiguos mayas tenÃ­an matemÃ¡ticos brillantes que rivalizaban en conocimientos con los astrÃ³nomos de la antigua Grecia.'
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
      hue: Math.random() > 0.5 ? '198,40,40' : '21,101,192', // Red or Blue (codex colors)
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

// â”€â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(198,40,40,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C62828','#5D4037','#1565C0','#212121','#00695C','#F9A825','#FFF8E1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <rect x="290" y="20" width="20" height="20" fill="none" stroke="#C62828" strokeWidth="1.5" opacity="0.6" rx="3" />
        <circle cx="300" cy="30" r="4" fill="#C62828" opacity="0.5" />
        <line x1="285" y1="30" x2="315" y2="30" stroke="#C62828" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(198,40,40,0.2)" />
            <stop offset="50%" stopColor="rgba(198,40,40,0.9)" />
            <stop offset="100%" stopColor="rgba(198,40,40,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C62828" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CÃ“DICE DE DRESDE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(198,40,40,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL LIBRO ASTRONÃ“MICO DE LOS MAYAS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,248,225,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          layoutId="activeDotMaya"
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(25, 20, 15, 0.92)',
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
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#000',
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '2rem', padding: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}40`,
            borderRadius: '16px',
            display: 'flex', gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                SabidurÃ­a CÃ³dice
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
      border: '1px solid rgba(198,40,40,0.15)',
    }}>
      <Star size={14} style={{ color: '#C62828', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C62828, #F9A825)', borderRadius: '3px', boxShadow: '0 0 8px rgba(198,40,40,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C62828', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM15() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,10,10,0.85) 0%, rgba(20,15,10,0.8) 40%, rgba(15,10,10,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <MayaHeader />
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1rem',
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
          {activeData ? (
            <ContentPanel
              key={activeData.id}
              node={activeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '3rem',
                color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '16px',
                marginTop: '1rem',
              }}
            >
              <Sparkles size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Selecciona un nodo interactivo para explorar los misterios astronÃ³micos y matemÃ¡ticos del CÃ³dice de Dresde.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            BibliografÃ­a y Fuentes del MÃ³dulo
          </h4>
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                lineHeight: 1.4,
              }}>
                <span style={{ color: '#C62828' }}>â– </span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox src={lightboxSrc} alt="Codex detailed view" onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
