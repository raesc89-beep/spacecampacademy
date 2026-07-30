'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / EdznÃ¡ themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoGnomon({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <line x1="30" y1="50" x2="30" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="50" rx="15" ry="4" fill={color} opacity="0.3" />
      <path d="M 30 15 L 45 50 L 30 50 Z" fill={color} opacity="0.4" />
      <circle cx="30" cy="10" r="3" fill={color} opacity="0.6" />
      {/* Sun rays */}
      <line x1="30" y1="2" x2="30" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="4" x2="25" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="4" x2="35" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoZenithSun({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="10" fill={color} />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} 
            x1={30 + 12 * Math.cos(rad)} y1={30 + 12 * Math.sin(rad)} 
            x2={30 + 26 * Math.cos(rad)} y2={30 + 26 * Math.sin(rad)} 
            stroke={color} strokeWidth={i%2===0 ? "2" : "1"} strokeLinecap="round" 
          />
        );
      })}
    </svg>
  );
}

function DecoCanal({ size = 70, color = '#0288D1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 0 20 Q 15 10 30 20 T 60 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 0 30 Q 15 20 30 30 T 60 30" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7" />
      <path d="M 0 40 Q 15 30 30 40 T 60 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <rect x="10" y="15" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="40" y="25" width="6" height="4" fill={color} opacity="0.6" />
      <rect x="25" y="35" width="5" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFiveLevels({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="45" width="50" height="6" fill={color} opacity="0.8" />
      <rect x="10" y="39" width="40" height="6" fill={color} opacity="0.7" />
      <rect x="15" y="33" width="30" height="6" fill={color} opacity="0.6" />
      <rect x="20" y="27" width="20" height="6" fill={color} opacity="0.5" />
      <rect x="25" y="21" width="10" height="6" fill={color} opacity="0.4" />
      <rect x="27" y="10" width="6" height="11" fill={color} opacity="0.3" />
      <circle cx="30" cy="14" r="1.5" fill="#fff" />
      <circle cx="30" cy="18" r="1.5" fill="#fff" />
      <path d="M 28 51 L 28 21 L 32 21 L 32 51 Z" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoShadow({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <defs>
        <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="10,50 50,50 35,10 25,10" fill="url(#shadowGrad)" />
      <circle cx="30" cy="8" r="4" fill={color} opacity="0.4" />
      <line x1="20" y1="30" x2="10" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
      <line x1="40" y1="30" x2="50" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'edzna-ciudad': [DecoFiveLevels, DecoCanal, DecoZenithSun],
  'paso-cenital': [DecoZenithSun, DecoShadow, DecoGnomon],
  'gnomon-vertical': [DecoGnomon, DecoShadow, DecoZenithSun],
  'edificio-cinco-pisos': [DecoFiveLevels, DecoZenithSun, DecoCanal],
  'sistema-hidraulico': [DecoCanal, DecoZenithSun, DecoShadow],
  'latitud-tropical': [DecoZenithSun, DecoGnomon, DecoFiveLevels],
  'medicion-tiempo': [DecoShadow, DecoZenithSun, DecoGnomon],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Å prajc, I. (2001). Orientaciones AstronÃ³micas en la Arquitectura PrehispÃ¡nica, INAH',
  'Galindo Trejo, J. (2009). ArqueoastronomÃ­a en la AmÃ©rica Antigua, UNAM',
  'MalmstrÃ¶m, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press',
  'Andrews, G.F. (1995). Pyramids and Palaces, Monsters and Masks: Architecture of the Puuc Region, Labyrinthos',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'edzna-ciudad',
    title: 'La Ciudad',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m14/btn_edzna-ciudad.jpg',
    image: '/assets/maya/infographic_m14/hero_edzna-ciudad.jpg',
    content: [
      'Imagina que estÃ¡s construyendo una ciudad de bloques gigante, pero en lugar de plÃ¡stico, usas piedras enormes, y en lugar de un piso plano, estÃ¡s en medio de una selva espesa. AsÃ­ es EdznÃ¡, una antigua metrÃ³poli construida por los mayas en lo que hoy es Campeche, MÃ©xico. Su nombre significa "La Casa de los ItzÃ¡es", rindiendo honor a una importante familia que gobernÃ³ la regiÃ³n durante cientos de aÃ±os. Esta ciudad estuvo llena de vida desde el 600 a.C. hasta el 1500 d.C.',
      'A diferencia de donde vives, en EdznÃ¡ no habÃ­a rÃ­os naturales cercanos para obtener agua potable fresca. Â¡ImagÃ­nate vivir en un sitio caluroso sin agua a la mano! Pero los mayas eran ingenieros audaces que diseÃ±aron un sofisticado sistema hidrÃ¡ulico â€” una enorme red de canales y embalses artificiales para capturar, guardar y distribuir la preciosa lluvia. Literalmente transformaron un terreno salvaje en un paraÃ­so donde el agua fluÃ­a controladamente hacia cada rincÃ³n.',
      'Piensa en la metrÃ³poli como si fuera un inmenso embudo inteligente. Los arquitectos mayas construyeron plazas y plataformas con una sutil inclinaciÃ³n que casi no notarÃ­as al caminar. Pero cuando llovÃ­a fuertemente, esa leve pendiente obligaba al agua a correr directamente hacia canales subterrÃ¡neos y grandes depÃ³sitos (chultunes). Gracias a esta planificaciÃ³n brillante, la ciudad sobrevivÃ­a durante los meses secos sin preocupaciones.',
      'AdemÃ¡s de su genial manejo acuÃ¡tico, EdznÃ¡ estaba decorada con hermosas plazas, estelas de piedra (monumentos que funcionaban como libros tallados) y pirÃ¡mides imponentes que rozaban el cielo. Era una ciudad majestuosa que conectaba el suelo fÃ©rtil con los profundos misterios celestiales. La vida diaria combinaba bulliciosos mercados, ceremonias religiosas y un trabajo meticuloso de observaciÃ³n astronÃ³mica estelar.',
      'El nÃºcleo urbano era la gran acrÃ³polis central, una inmensa plataforma elevada donde descansaban los edificios supremos. Pasear por ahÃ­ en su Ã©poca de mÃ¡ximo esplendor habrÃ­a sido como visitar una capital futurista, pero en el pasado antiguo. Hoy, al observar las ruinas blancas, puedes sentir la grandeza de los arquitectos que construyeron maravillas guiados por la observaciÃ³n pura. Cada piedra guarda un mensaje sobre cÃ³mo los mayas entendÃ­an su cosmos entero.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'EdznÃ¡ alcanzÃ³ su mÃ¡ximo tamaÃ±o y esplendor alrededor del aÃ±o 900 d.C., alojando a mÃ¡s de 25,000 personas. Para alimentar a toda esta multitud, no solo bebÃ­an el agua capturada, sino que criaban peces dulces en los canales y usaban el lodo hÃºmedo del fondo como fertilizante sÃºper nutritivo para sus cultivos, logrando cosechas increÃ­blemente abundantes.' },
      { label: 'Ingenio Maya', icon: 'clock', text: 'La gigantesca red de canales funcionaba tambiÃ©n como verdaderas autopistas acuÃ¡ticas. Los ciudadanos utilizaban ligeras canoas de madera para transportar pesadas cargas de comida y piedras de construcciÃ³n rÃ¡pidamente a travÃ©s de la urbe, ahorrando muchÃ­sima energÃ­a humana en comparaciÃ³n con cargar todo sobre la espalda bajo el fuerte sol tropical.' },
    ],
    fact: 'Durante sus 2,000 aÃ±os de historia ininterrumpida, EdznÃ¡ experimentÃ³ enormes cambios arquitectÃ³nicos, fusionando distintos estilos como el PetÃ©n, el Puuc y estilos tardÃ­os. Esto nos indica que no era un pueblo aislado, sino un centro cosmopolita brillante, conectado comercialmente con lejanas capitales mayas. Sus edificios superpuestos relatan visualmente las cambiantes modas de una civilizaciÃ³n sumamente dinÃ¡mica y viva.',
  },
  {
    id: 'paso-cenital',
    title: 'El Paso Cenital',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m14/btn_paso-cenital.jpg',
    image: '/assets/maya/infographic_m14/hero_paso-cenital.jpg',
    content: [
      'Â¿Has notado cÃ³mo tu sombra cambia de tamaÃ±o drÃ¡sticamente durante el dÃ­a? En la maÃ±ana es larguÃ­sima, al mediodÃ­a se encoge bastante y en la tarde vuelve a estirarse. Bueno, imagina un momento celestial donde, justo al mediodÃ­a, tu sombra desaparece mÃ¡gicamente por completo. Como si alguien apagara las sombras del universo con un interruptor. Este evento fenomenal se llama "paso cenital", y ocurre cuando el ardiente Sol pasa directamente por encima de tu coronilla.',
      'Piensa en una linterna que alumbra una pequeÃ±a pelota desde un lado: la pelota siempre proyecta una sombra estirada. Pero si colocas la linterna exactamente arriba, en lÃ­nea recta vertical, la sombra se esconde oculta justo debajo de la pelota. Este espectÃ¡culo increÃ­ble no sucede en todo el mundo, solo ocurre dentro de las calurosas regiones tropicales. Afortunadamente, todas las ciudades mayas prosperaron en esta franja geogrÃ¡fica, observando el fenÃ³meno sin interrupciÃ³n.',
      'Para los sacerdotes mayas, este paso cenital no era simplemente un truco visual divertido, sino el cronÃ³metro cÃ³smico supremo. El inmenso Sol alcanza el cenit exactamente dos veces al aÃ±o en la regiÃ³n maya. Estos peculiares dÃ­as sin sombra funcionaban como marcadores divinos, totalmente libres de errores humanos, permitiÃ©ndoles calibrar y ajustar sus extensos calendarios matemÃ¡ticos con una perfecciÃ³n asombrosa. Â¡Era una sincronizaciÃ³n automÃ¡tica de su tiempo sagrado!',
      'Conocer la fecha exacta del paso cenital resultaba verdaderamente de vida o muerte para los habitantes. Estos dÃ­as particulares coincidÃ­an asombrosamente con la llegada inminente de las intensas lluvias anuales y el momento idÃ³neo para plantar el maÃ­z. Cuando el Sol quemaba en el cenit, la deidad encendÃ­a una seÃ±al celestial, ordenando a los agricultores comenzar las vitales siembras que mantendrÃ­an vivas a sus inmensas familias.',
      'Detectar el dÃ­a cenital preciso requerÃ­a suma paciencia y herramientas especializadas de pura lÃ³gica. Sin utilizar ningÃºn telescopio moderno, poseÃ­an una agudeza visual fenomenal. ErigÃ­an delgados postes verticales y construÃ­an gigantescas pirÃ¡mides que funcionaban como observatorios solares, confirmando matemÃ¡ticamente cuÃ¡ndo el disco luminoso tocaba la cÃºspide del firmamento. AsÃ­ se convirtieron en los astrÃ³nomos primordiales de la antigua AmÃ©rica continental.'
    ],
    expandables: [
      { label: 'Reloj CÃ³smico', icon: 'clock', text: 'A diferencia de los conocidos equinoccios, que ocurren el mismo dÃ­a en todo el planeta, la fecha precisa del paso cenital cambia segÃºn la latitud de la ciudad. Cuanto mÃ¡s hacia el norte viajes, mÃ¡s tarde ocurrirÃ¡ el fenÃ³meno. Esto causaba que cada ciudad maya festejara sus mÃ¡gicos "dÃ­as sin sombra" en fechas diferentes, generando calendarios locales Ãºnicos.' },
      { label: 'Magia AcuÃ¡tica', icon: 'atom', text: 'Durante el mÃ­stico mediodÃ­a del paso cenital, si observas cuidadosamente el interior de un profundo cenote natural, el poderoso haz de luz solar ilumina el agua cristalina hasta el fondo rocoso, sin dejar ninguna esquina oscura. Los mayas celebraban cÃ³mo la energÃ­a luminosa penetraba directamente hacia el acuÃ¡tico inframundo subterrÃ¡neo, conectando el cosmos entero.' },
    ],
    fact: 'El alucinante paso cenital solamente puede experimentarse visualmente estando entre el TrÃ³pico de CÃ¡ncer y el TrÃ³pico de Capricornio. Fuera de esta extensa franja planetaria, como en los paÃ­ses europeos o norteamericanos, el Sol jamÃ¡s alcanza un punto perfecto de 90 grados perpendiculares sobre nuestras cabezas. Por ello, los perplejos conquistadores europeos quedaron atÃ³nitos al atestiguar sombras que desaparecÃ­an totalmente, algo fÃ­sicamente imposible en sus lejanos continentes de origen.',
  },
  {
    id: 'gnomon-vertical',
    title: 'El GnomÃ³n',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m14/btn_gnomon-vertical.jpg',
    image: '/assets/maya/infographic_m14/hero_gnomon-vertical.jpg',
    content: [
      'Muchas veces, las herramientas cientÃ­ficas mÃ¡s trascendentales son tambiÃ©n las mÃ¡s rudimentarias. Imagina que tomas un largo palo recto y lo entierras perfectamente nivelado en la tierra plana. Â¡Listo! Acabas de fabricar el instrumento astronÃ³mico inicial de la humanidad entera: el majestuoso gnomÃ³n. Aunque la palabra suene curiosa (deriva del griego antiguo y significa "el que comprende"), para los mayas, esta delgada vara era el decodificador primordial del universo.',
      'El gnomÃ³n opera bÃ¡sicamente como el puntero agudo de un reloj solar. Conforme la brillante estrella avanza cruzando el cielo diurno, la vara proyecta una sombra oscura que constantemente altera su longitud y direcciÃ³n. Observando obsesivamente estos mÃ­nimos cambios diarios, los mayas descifraron los silenciosos engranajes celestiales. Aprendieron a anticipar las estaciones futuras simplemente registrando cuÃ¡n corta o larga era la franja de oscuridad al mediodÃ­a exacto.',
      'Durante la aguardada jornada del paso cenital, el gnomÃ³n se convertÃ­a en el absoluto protagonista ceremonial. En el microsegundo preciso del mediodÃ­a astronÃ³mico, cuando el sol coronaba exactamente el Ã¡pice de la bÃ³veda celeste, la sombra del palo vertical desaparecÃ­a instantÃ¡neamente. La oscuridad se encogÃ­a colapsando directamente bajo la madera. Para el expectante astrÃ³nomo maya, la nulidad de sombra representaba una confirmaciÃ³n categÃ³rica e inconfundible.',
      'Los sabios mayas nunca se limitaron a utilizar simples y frÃ¡giles ramitas maderables para sus investigaciones trascendentales. Inteligentemente, transmutaron su monumental arquitectura cÃ­vica en colosales gnomones pÃ©treos. Empleaban altas estelas rectangulares hermosamente talladas, robustos pilones y las marcadas aristas de sus inmensas pirÃ¡mides escalonadas para atrapar metÃ³dicamente la radiaciÃ³n solar y medir el incansable transcurrir del tiempo cÃ³smico.',
      'La meticulosidad astronÃ³mica que alcanzaron observando sombras puras fue deslumbrante. Marcando diariamente el extremo puntiagudo de la sombra matutina y vespertina, consiguieron estructurar formidables calendarios que abarcaban millones de dÃ­as. El humilde gnomÃ³n, una simple lÃ­nea vertical erigida desafiando la gravedad, permitiÃ³ amalgamar las complejas existencias sociales, agrÃ­colas y mÃ­sticas de la prodigiosa cultura mesoamericana.'
    ],
    expandables: [
      { label: 'Sombras Cruzadas', icon: 'clock', text: 'Para incrementar dramÃ¡ticamente la precisiÃ³n, los estudiosos mayas plantaban mÃºltiples gnomones alineados estratÃ©gicamente. Observando cautelosamente cÃ³mo se cruzaban e intersectaban las lÃ­neas visuales entre ellos durante los amaneceres, fundaban asombrosos observatorios de horizonte. Si el sol despuntaba exactamente detrÃ¡s del poste focal, inauguraban formalmente la festividad estacional correspondiente.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La utilizaciÃ³n astronÃ³mica del gnomÃ³n vertical no se restringÃ­a de ninguna manera a documentar la iluminaciÃ³n diurna. Los mayas tambiÃ©n aplicaban lÃ³gicamente estos infalibles principios geomÃ©tricos durante las oscuras noches, usando las aristas pÃ©treas para rastrear detalladamente el sinuoso trayecto de la resplandeciente Luna y del vital planeta Venus.' },
    ],
    fact: 'El eminente estudio de las cambiantes sombras proyectadas mediante postes rectos generÃ³ el nacimiento fÃ¡ctico de la trigonometrÃ­a temprana. Al medir la altura del palo vertical comparÃ¡ndola constantemente con la longitud de su oscura sombra tendida, los matemÃ¡ticos antiguos deducÃ­an Ã¡ngulos solares extremadamente precisos. El rÃºstico gnomÃ³n materializa la profunda premisa de que no requieres en absoluto tecnologÃ­a electrÃ³nica para poder realizar cÃ¡lculos y deducciones altamente sofisticadas.',
  },
  {
    id: 'edificio-cinco-pisos',
    title: 'Edificio de Cinco Pisos',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m14/btn_edificio-cinco-pisos.jpg',
    image: '/assets/maya/infographic_m14/hero_edificio-cinco-pisos.jpg',
    content: [
      'Presidiendo soberbiamente la urbe de EdznÃ¡, encontramos una estructura mÃ¡gicamente inusual dentro del orbe maya: el imponente Edificio de Cinco Pisos. ImÃ¡ginate un pastel escalonado, alzÃ¡ndose a 31 formidables metros de altura (Â¡equiparable a una moderna torre de 10 pisos!), construido macizamente utilizando reluciente piedra caliza. Este soberano portento arquitectÃ³nico domina majestuosamente la vasta Gran AcrÃ³polis ceremonial.',
      'El aspecto singular de este palacio-pirÃ¡mide reside en su insÃ³lito y funcional diseÃ±o "hÃ­brido". Regularmente, los palacios residenciales son largos recintos horizontales, mientras que las pirÃ¡mides son elevaciones sÃ³lidas culminando en reducidos templos cÃºspides. Sorprendentemente, este gigantesco edificio conjuga magistralmente ambas funciones: sus masivos niveles inferiores ostentan recÃ¡maras abovedadas, coronadas por un empinado santuario superior.',
      'Esta titÃ¡nica montaÃ±a labrada manualmente jamÃ¡s sirviÃ³ meramente para ostentar grosera opulencia jerÃ¡rquica. Su deliberada alineaciÃ³n geomÃ©trica la metamorfosea en un portentoso ingenio astronÃ³mico. La ancha fachada principal fue planificada milimÃ©tricamente, encarando directamente la trayectoria estacional del deslumbrante sol. Ingenieros y astrÃ³nomos sincronizaron genialmente sus disciplinas para forzar a las luminosas deidades solares a interactuar fÃ­sicamente con el monumento.',
      'Invariablemente, cuando la sagrada fecha del paso cenital arribaba a la metrÃ³poli, los refulgentes rayos solares llovÃ­an perentoriamente sobre la caliza. Justamente al mediodÃ­a, las colosales escalinatas, cornisas y pesados rebordes de la pirÃ¡mide cesaban radicalmente de emitir cualquier umbrÃ­a lateral. La entera edificaciÃ³n absorbÃ­a mÃ¡gicamente la lumbre cenital, transformÃ¡ndose transitoriamente en un monolÃ­tico pilar fulgurante carente de oscuridad.',
      'Coronando excelsamente la quinta planta, reside una perforada muralla pÃ©trea denominada cresterÃ­a. Cuando los sabios gobernantes escalaban las vertiginosas gradas para escudriÃ±ar cÃ³mo refulgÃ­a la radiaciÃ³n filtrÃ¡ndose transversalmente por las acotadas ventanas de piedra, conseguÃ­an refrendar inexorablemente los augurios cÃ³smicos. El soberbio edificio amalgama inseparablemente la autoridad polÃ­tica y el sagrado dominio cientÃ­fico celestial.'
    ],
    expandables: [
      { label: 'Ingenio en Piedra', icon: 'atom', text: 'Examinando las sÃ³lidas estancias contenidas interiormente, los arquitectos contemporÃ¡neos confirmaron cÃ³mo los mayas implementaron la sofisticada "bÃ³veda en saledizo". Esta ingeniosa tÃ©cnica superpone progresivamente hileras de grandes rocas hasta cerrar pesados techos interiores, permitiendo soportar asombrosamente las abrumadoras toneladas del masivo templo superior sin sufrir derrumbes estructurales.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La ancha escalinata central del monumental inmueble resguarda asombrosos secretos tallados. MÃºltiples peldaÃ±os inferiores ostentan detalladÃ­simos bloques cincelados exhibiendo elaborados jeroglÃ­ficos antiguos. Ascender por esta histÃ³rica escalera equivalÃ­a literalmente a pisotear devotamente las victoriosas efemÃ©rides y el abolengo reverencial de los poderosos caudillos fundacionales de EdznÃ¡.' },
    ],
    fact: 'El soberbio Edificio de Cinco Pisos jamÃ¡s fue alzado repentinamente, sino que materializa el denodado esfuerzo acumulado de mÃºltiples generaciones a travÃ©s de dilatados siglos. EvolucionÃ³ partiendo de un santuario basal modestÃ­simo, siendo envuelto progresivamente por monumentales aÃ±adidos exteriores. Visualmente documenta la brillante hibridaciÃ³n arquitectÃ³nica, combinando el macizo y sobrio estilo inicial PetÃ©n oculto en su masivo nÃºcleo, recubierto por los intrincadÃ­simos detalles del tardÃ­o estilo Puuc.',
  },
  {
    id: 'sistema-hidraulico',
    title: 'Sistema HidrÃ¡ulico',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m14/btn_sistema-hidraulico.jpg',
    image: '/assets/maya/infographic_m14/hero_sistema-hidraulico.jpg',
    content: [
      'SituÃ©monos mentalmente dentro de un extenso asentamiento edificado sobre barros inmanejables, los cuales mutan alternativamente de desoladores pantanos anegados en monzones a yermos polvorientos resquebrajados en estiajes severos. Semejante escenario era el durÃ­simo escollo de la metrÃ³poli. Los valerosos mayas, en lugar de claudicar aterrados, concibieron un manejo hÃ­drico colosal, demostrando un indomable tesÃ³n ingenieril.',
      'Elaboraron asombrosamente un ramificado tejido integrado por mÃ¡s de treinta kilomÃ©tricos canales zanjados y embalses formidables (aguadas). Figura estas excavaciones como titÃ¡nicas venas nutricias irrigando la totalidad cÃ­vica. El conducto hÃ­drico supremo es verdaderamente monstruoso: supera ampliamente mil metros longitudinales, acaparando cincuenta pasmosos metros horizontales, recolectando la esquiva lluvia y canalizÃ¡ndola controladamente.',
      'Evidentemente, Â¿cÃ³mo lograba engarzarse la masiva recolecciÃ³n acuÃ­fera con las inalcanzables esferas celestiales? Intersecando magistralmente la escrupulosa astronomÃ­a con la supervivencia estricta. Las inclemencias climÃ¡ticas de EdznÃ¡ gravitaban irremediablemente sobre un ciclo hÃ­drico rÃ­gido. Observando analÃ­ticamente los imperturbables cenit solares, la jerarquÃ­a astrolÃ³gica presagiaba infaliblemente el arribo perentorio del temporal lluvioso.',
      'Pronosticar certeramente la inminente precipitaciÃ³n tempestuosa otorgaba la inestimable ventaja temporal requerida para maniobrar compuertas lodosas, higienizar inmensos aljibes oportunamente y depositar las vitales semillas del sacrosanto maÃ­z en las parcelas fÃ©rtiles. Fallar catastrÃ³ficamente estos cÃ¡lculos astronÃ³micos abocarÃ­a insalvablemente a la hambruna generalizada o a devastadoras inundaciones. La precisa astrologÃ­a cimentaba la prosperidad nutricional citadina.',
      'Paralelamente al indispensable suministro potabilizado y al constante riego de los sembradÃ­os, este reticulado acuÃ¡tico propiciaba una insospechada movilidad expedita. Sustituyendo los penosÃ­simos acarreos peatonales bajo la agobiante canÃ­cula sofocante, Ã¡giles navegantes tripulaban pequeÃ±as canoas, distribuyendo pertrechos velozmente por todo el circuito. Domando el potencial devastador del lÃ­quido elemento, cristalizaron su hegemonÃ­a cÃ­vica absoluta.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Durante la penosa excavaciÃ³n de los mastodÃ³nticos canales zanjados, los incansables operarios extrajeron millares de toneladas del fecundo sustrato inferior. Magistralmente, jamÃ¡s desperdiciaron este material orgÃ¡nico: reutilizaron la totalidad del barro extraÃ­do para sobrellevar elevadas plataformas residenciales, protegiendo sagazmente sus delicadas habitaciones de las crecidas pluviales.' },
      { label: 'Mantenimiento Colosal', icon: 'clock', text: 'Indefectiblemente, la prolongada Ã©poca de acentuada sequedad propiciaba un intensivo y organizado mantenimiento comunitario de la intrincada urdimbre hÃ­drica. Pelotones de trabajadores paleaban el cenagoso limo residual depositado en la base de los acueductos, aprovechÃ¡ndolo directamente como inmejorable abono para fertilizar copiosamente los cercanos huertos familiares y vastas milpas perifÃ©ricas.' },
    ],
    fact: 'Escaneos topogrÃ¡ficos, empleando potentes rayos lÃ¡ser pulsados (LiDAR), confirmaron apabullantemente que la monumental obra civil de recolecciÃ³n fluida dominaba una astronÃ³mica cuenca cercana a los quince vastÃ­simos kilÃ³metros cuadrados. Semejantes proezas demuestran rotundamente avanzados conocimientos hidrodinÃ¡micos empÃ­ricos, equiparables plenamente a la magistral ingenierÃ­a de conducciÃ³n de acueductos ejecutada masivamente durante el apogeo del antiguo Imperio Romano.',
  },
  {
    id: 'latitud-tropical',
    title: 'Latitud Tropical',
    color: '#4FC3F7',
    btnImage: '/assets/maya/infographic_m14/btn_latitud-tropical.jpg',
    image: '/assets/maya/infographic_m14/hero_latitud-tropical.jpg',
    content: [
      'Visualiza nuestra gigantesca Tierra rotando espacialmente como un enorme trompo asimÃ©tricamente inclinado persiguiendo incesantemente al Sol. Debido a esta peculiar postura ladeada, la irradiaciÃ³n solar calÃ³rica bombardea diferencialmente amplios sectores hemisfÃ©ricos dependiendo estrictamente de la progresiÃ³n estacional del aÃ±o cronolÃ³gico. La extensa y cÃ¡lida cintura abrazando el ecuador, contenida inamoviblemente entre el lejano TrÃ³pico de CÃ¡ncer boreal y el austral TrÃ³pico de Capricornio, constituye la latitud tropical.',
      'Habitar perennemente dentro de esta prodigiosa y abrasadora zona geogrÃ¡fica representa ostentar pases de primera fila para atestiguar asombrosos eventos fotÃ³nicos. Ãšnicamente dentro de estos delimitados linderos tropicales puede el disco solar situarse impecablemente a noventa rectos grados sobre nuestra posiciÃ³n anatÃ³mica, gestando el fascinante cenit inmaculado. Poblamientos ubicados fuera del perÃ­metro, invariablemente soportan radiaciones oblicuas y persistentes proyecciones de lÃ¡nguidas sombras vespertinas.',
      'Las majestuosas e intrincadas capitales del resplandeciente universo maya, como la esplendorosa Palenque, Tikal, CopÃ¡n y evidentemente EdznÃ¡, emergieron florecientes exactamente abrigadas bajo este bendito palio tropical interhemisfÃ©rico. Consecuentemente, el deslumbrante telÃ³n bÃ³veda estelar que presenciaban y analizaban tenazmente estos formidables polÃ­matas, discrepaba superlativamente de la apagada y angulada perspectiva observable por pensadores septentrionales europeos clÃ¡sicos.',
      'Considerando inexorablemente la acentuada curvatura de nuestra abultada y esfÃ©rica morada terrestre, el anhelado fenÃ³meno cenital jamÃ¡s se manifiesta sincrÃ³nicamente. Asemejando una descomunal y lentÃ­sima barredora lumÃ­nica, el cÃ©nit progresa implacablemente barriendo el horizonte. Visita primeramente a CopÃ¡n meridional, postergÃ¡ndose dilatadas semanas hasta cobijar a la central EdznÃ¡. Por ende, dispares poblados mayas experimentaban sus fulgurantes jornadas carentes de sombras en disparatadas fechas cronolÃ³gicas del aÃ±o.',
      'Esta asincrÃ³nica eventualidad climÃ¡tica obligÃ³ imperiosamente a los excelsos matemÃ¡ticos y sacerdotes de las diversas agrupaciones ciudadanas a forjar independientemente precisas adecuaciones locales a su portentoso y generalizado almanaque de la vasta Cuenta Larga comÃºn. Ajustando minuciosamente fÃ³rmulas geomÃ©tricas avanzadas para coincidir exactamente con el Ã¡ngulo geogrÃ¡fico especÃ­fico de su regiÃ³n natal, demostraron una penetrante comprensiÃ³n conceptual de la inmensa geometrÃ­a esfÃ©rica subyacente.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El extendido y popular tÃ©rmino "TrÃ³pico" procede curiosamente del arcaico lÃ©xico helÃ©nico (tropikÃ³s) denotando el concepto cardinal de "retorno". Los antiguos vigÃ­as astrales se percataron sagazmente de que al tocar los lÃ­mites paralelos norte y sur, la candente estrella simulaba detenerse por completo para retroceder lentamente su marcha, seÃ±alando con espectacularidad los grandiosos solsticios celestiales extremos.' },
      { label: 'CopÃ¡n y AstronomÃ­a', icon: 'atom', text: 'La colosal metrÃ³poli sureÃ±a de CopÃ¡n es universalmente distinguida por su manifiesta obsesiÃ³n con la obsesiva exactitud calendÃ¡rica de ciclos entrelazados. Su latitud propicia que el avasallante rayo cenital los impacte primeramente. Los sabios erigieron monumentales estelas monolÃ­ticas en cumbres remotas del extenso valle, buscando alineaciones solares perfectas durante los albares para decretar fehacientemente el inicio ceremonial del prÃ³spero tiempo fÃ©rtil.' },
    ],
    fact: 'El inclinado y fundamental eje planetario terrestre, el cual propicia integralmente el incesante recambio periÃ³dico de todas nuestras coloridas y necesarias estaciones medioambientales, ostenta una peculiar angulaciÃ³n que fluctÃºa aproximadamente 23.5 grados. Por increÃ­ble y arcano que parezca, debido al pausado y paulatino efecto precesional astronÃ³mico espaciotemporal a lo largo de milenios, el preciso foco geomÃ©trico y los cÃ¡lculos matemÃ¡ticos de radiaciÃ³n solar esgrimidos por los mayas originales se han sutilmente desplazado del firmamento observable actual.',
  },
  {
    id: 'medicion-tiempo',
    title: 'MediciÃ³n del Tiempo',
    color: '#E65100',
    btnImage: '/assets/maya/infographic_m14/btn_medicion-tiempo.jpg',
    image: '/assets/maya/infographic_m14/hero_medicion-tiempo.jpg',
    content: [
      'Visualicemos mentalmente la titÃ¡nica encrucijada de intentar estructurar un inquebrantable calendario preciso, careciendo de brÃºjulas electromagnÃ©ticas, relojes modernos o telescopios de cuarzo amplificados. Dependiendo exclusivamente de sus prodigiosos ojos escrutadores, simples formaciones lÃ­ticas y delgados postes vegetales, los reverenciados mayas resolvieron el abstruso laberinto cÃ³smico. Ubicaban puntos topogrÃ¡ficos referenciales e inventariaban fehacientemente las extensas secuencias del cÃ­clico retorno solar por dichas muescas referenciales persistentes.',
      'No obstante, el rudimentario y falible recuento manual de albas brumosas conlleva inherentes errores acumulativos inevitables. Una prolongada densidad de opacas tormentas tropicales o ligeras dislexias numÃ©ricas arruinarÃ­an perentoriamente los pronÃ³sticos matemÃ¡ticos. Ambicionaban obsesivamente una inequÃ­voca rÃºbrica celestial, exenta totalmente de debilidad perceptiva humana. El avasallante y absoluto fenÃ³meno de extinciÃ³n umbrÃ­a del solemne paso cenital confiriÃ³ justamente aquella rotunda exactitud irrefutable demandada por sus intrincados dogmas.',
      'Semejante singularidad Ã³ptica fÃ¡ctica â€”aquel transitorio pero apoteÃ³sico instante temporal desprovisto totalmente de tinieblas proyectadasâ€” ejercÃ­a simultÃ¡neamente las rigurosas funciones de un majestuoso cronÃ³metro rectificador impecable. Invocado ceremonialmente en la gloriosa jornada central, la apabullante exactitud del mediodÃ­a astronÃ³mico facultaba a la casta erudita maya para recalibrar instantÃ¡neamente cualquier mÃ­nimo e indeseado desvÃ­o numÃ©rico que infestase gradualmente los intrincados papiro-calendarios a lo largo de un turbulento aÃ±o cÃ­vico plagado de anomalÃ­as.',
      "Semejando armÃ³nicamente un portento relojero integrado por intrincados discos dentados metÃ¡licos rotando interminablemente, orquestaron maravillosamente su paradigmÃ¡tica y sagrada 'Rueda CalendÃ¡rica'. Sincronizando perpetuamente su profundo almanaque esotÃ©rico sagrado (Tzolkin) provisto de 260 vibrantes jornadas, conjuntamente operando en paralelo al predecible recuento cÃ­vico-solar y agrÃ­cola (Haab') tasado pragmÃ¡ticamente en 365 dÃ­as reales; toda esta imponente arquitectura numÃ©rica descansaba rectificada y avalada constantemente por las puntuales intersecciones cenitales astronÃ³micas anuales.",
      'Respaldados firmemente por siglos de abnegada y purista devociÃ³n escudriÃ±adora de la altÃ­sima bÃ³veda brillante, los peritos matemÃ¡ticos mesoamericanos despuntaron elaborando un formidabilÃ­simo guarismo cronolÃ³gico tasando minuciosamente la traslaciÃ³n planetaria incesante del globo solar en 365.242 irrebatibles dÃ­as promediados reales. Tan inverosÃ­milmente soberbio fue dicho logro deductivo y empÃ­rico analÃ³gico, logrado a travÃ©s de frÃ¡giles troncos desnudos y cordeles templados artesanalmente, que virtualmente rivaliza sin ruborizarse contra las presuntuosas mediciones telescÃ³picas ultramodernas y satelitales actuales.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El enigmÃ¡tico y sacrosanto nÃºmero de 260, conformante basal de su mÃ­stico almanaque litÃºrgico, estÃ¡ entraÃ±ablemente ligado indisolublemente al astro rey calÃ³rico. Puntualmente evaluado sobre influyentes metrÃ³polis meridionales, el compÃ¡s aguardado para la traslaciÃ³n desde la inicial fulminaciÃ³n cenital observada estivalmente hasta su eventual y anhelado reencuentro de retorno, totalizaba pasmosamente una exacta contabilidad ininterrumpida de doscientas sesenta idÃ©nticas jornadas solares precisas.' },
      { label: 'CÃ³dices Antiguos', icon: 'clock', text: 'Extensa magnitud de nuestros vigentes entendimientos empÃ­ricos sobre las portentosas mecÃ¡nicas del minucioso cronometrado cÃ³smico maya florece Ã­ntegramente de un invaluable y esporÃ¡dico rescate bibliogrÃ¡fico histÃ³rico: el venerable e intrincado "CÃ³dice de Dresde". En los frÃ¡giles pliegos amate apilados con pigmentos orgÃ¡nicos imborrables, aquellos peritos estamparon pasmosas constancias tabuladas prediciendo espeluznantemente las cÃ­clicas oscilaciones de las resplandecientes esferas celestiales y los espantosos oscurecimientos ecplÃ­psales por decenas de generaciones venideras.' },
    ],
    fact: 'Reconociendo pragmÃ¡ticamente la fraccionada acumulaciÃ³n diaria de residuales minutos cÃ³smicos que impiden la simetrÃ­a gregoriana absoluta (el sobrante empÃ­rico cuantificado), los eruditos mesoamericanos rehusaron aÃ±adir toscamente burdos dÃ­as bisiestos artificiales interpolados en sus sagradas contabilidades inmemoriales originarias. Invocaron sabiamente una alternativa matemÃ¡tica purista, desarrollando laberÃ­nticas tablas de rectificaciÃ³n perpetua finamente inscritas en roca dura, cautelando imperturbablemente que el prÃ­stino transcurrir del engranaje temporal fundacional mÃ­tico del origen inmaculado fluyese majestuoso, prÃ­stino y jamÃ¡s resultase corrompido ni truncado transitoriamente.',
  },
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
      hue: Math.random() > 0.5 ? '255,214,0' : '2,136,209', // gold or blue
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,214,0,0.3))' }}>
        {/* Sun arc */}
        <path d="M 50 110 Q 300 -20, 550 110" fill="none" stroke="url(#sunGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 130;
          const colors = ['#8D6E63','#FFD600','#212121','#8D6E63','#0288D1','#4FC3F7','#E65100'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central sun icon */}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="10" fill="#FFD600" opacity="0.9" />
        <line x1="300" y1="5" x2="300" y2="10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="300" y1="50" x2="300" y2="55" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="275" y1="30" x2="280" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="320" y1="30" x2="325" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,214,0,0.1)" />
            <stop offset="50%" stopColor="rgba(255,214,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,214,0,0.1)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#FFD600" fontSize="22" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="4">EDZNÃ</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,214,0,0.7)" fontSize="12" fontWeight="700" fontFamily="sans-serif" letterSpacing="3">SOL EN EL CENIT</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,214,0,0.2)'}`,
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
          layoutId="activeDotMayaM14"
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
      display: 'flex',
      flexDirection: 'column',
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

        {/* Right: Title + first 2 paragraphs */}
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
                  background: node.color, color: '#0B0E2D',
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
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(90deg, transparent, ${node.color}40)` }} />
              <span style={{
                color: node.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px',
                textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Sparkles size={14} /> Explorar MÃ¡s
              </span>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(270deg, transparent, ${node.color}40)` }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.5))`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1,
            transform: 'rotate(-15deg)', pointerEvents: 'none',
          }}>
            <Star size={100} color={node.color} fill={node.color} />
          </div>
          <h4 style={{
            margin: '0 0 0.8rem', color: node.color, fontSize: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={14} color="#000" fill="#000" />
            </div>
            Dato Curioso
          </h4>
          <p style={{
            margin: 0, fontSize: '0.95rem', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.9)', fontStyle: 'italic',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar Component â”€â”€â”€
function ProgressBar({ total, exploredIds }) {
  const progress = (exploredIds.length / total) * 100;
  return (
    <div style={{
      width: '100%', maxWidth: '400px', margin: '2rem auto 0',
      background: 'rgba(0,0,0,0.4)', borderRadius: '20px',
      padding: '1rem 1.5rem', border: '1px solid rgba(255,214,0,0.2)',
      textAlign: 'center', position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#FFD600', fontWeight: 700 }}>
        <span>PROGRESO DE EXPLORACIÃ“N</span>
        <span>{exploredIds.length} / {total} Nodos</span>
      </div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: '#FFD600', boxShadow: '0 0 10px #FFD600' }}
        />
      </div>
      {exploredIds.length === total && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: '#4FC3F7', fontWeight: 700 }}
        >
          Â¡AnÃ¡lisis ArquitectÃ³nico y AstronÃ³mico Completado!
        </motion.div>
      )}
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM14() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
    } else {
      setActiveNodeId(id);
      if (!exploredIds.includes(id)) {
        setExploredIds(prev => [...prev, id]);
      }
    }
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #070912, #0D1226)',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        {/* Main Interface */}
        <div style={{
          background: 'rgba(15, 20, 40, 0.6)',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px',
          padding: '2rem',
          border: '1px solid rgba(255,214,0,0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Node Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
          }}>
            {INFOGRAPHIC_NODES.map((node, i) => (
              <NodeButton
                key={node.id}
                node={node}
                index={i}
                isActive={activeNodeId === node.id}
                onClick={() => handleNodeClick(node.id)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeNodeId ? (
              <ContentPanel
                key={activeNodeId}
                node={activeNode}
                onClose={() => setActiveNodeId(null)}
                setLightboxSrc={setLightboxSrc}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <Sparkles size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: 300 }}>
                  Selecciona un concepto arquitectÃ³nico o astronÃ³mico para analizar la maravilla de EdznÃ¡.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ProgressBar total={INFOGRAPHIC_NODES.length} exploredIds={exploredIds} />

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative', zIndex: 2,
        }}>
          <h4 style={{
            margin: '0 0 1rem', color: '#FFD600', fontSize: '0.9rem',
            textTransform: 'uppercase', letterSpacing: '2px',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#FFD600', borderRadius: '50%' }} />
            Referencias CientÃ­ficas y ArqueolÃ³gicas
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => <li key={i}>{bib}</li>)}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen expandida" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
