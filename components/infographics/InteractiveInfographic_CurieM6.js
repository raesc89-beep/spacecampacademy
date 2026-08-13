'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Radiation & Legacy themed) ────────────────────
function DecoRadiationSymbol({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.6" />
      {/* Radiation trefoil blades */}
      {[0, 120, 240].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const rad2 = ((a + 60) * Math.PI) / 180;
        return (
          <path key={i}
            d={`M30,30 L${30 + 24 * Math.cos(rad)},${30 + 24 * Math.sin(rad)} A24,24 0 0,1 ${30 + 24 * Math.cos(rad2)},${30 + 24 * Math.sin(rad2)} Z`}
            fill={color} opacity="0.25"
          />
        );
      })}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoCoffin({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pantheon dome silhouette */}
      <path d="M10 45 L10 30 Q10 10 30 8 Q50 10 50 30 L50 45 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Columns */}
      <line x1="18" y1="45" x2="18" y2="28" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="30" y1="45" x2="30" y2="22" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="42" y1="45" x2="42" y2="28" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Star at top */}
      <circle cx="30" cy="14" r="2" fill={color} opacity="0.5" />
      {/* Base line */}
      <line x1="8" y1="45" x2="52" y2="45" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Decorative triangular pediment */}
      <path d="M12 30 L30 18 L48 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoFlask({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Erlenmeyer flask */}
      <path d="M24 8 L24 22 L10 48 L50 48 L36 22 L36 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="22" y1="8" x2="38" y2="8" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Liquid level */}
      <path d="M16 38 Q30 34 44 38 L50 48 L10 48 Z" fill={color} opacity="0.15" />
      {/* Bubbles */}
      <circle cx="25" cy="40" r="1.5" fill={color} opacity="0.5" />
      <circle cx="32" cy="36" r="1" fill={color} opacity="0.4" />
      <circle cx="35" cy="42" r="1.5" fill={color} opacity="0.5" />
      {/* Glow from liquid */}
      <circle cx="30" cy="42" r="8" fill={color} opacity="0.08" />
    </svg>
  );
}

function DecoAtomCurie({ size = 60, color = '#7B1FA2', style = {} }) {
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

function DecoMedal({ size = 70, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medal ribbon */}
      <path d="M22 5 L22 22 L30 18 L38 22 L38 5" fill={color} opacity="0.2" />
      {/* Medal circle */}
      <circle cx="30" cy="36" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="36" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star inside medal */}
      <path d="M30 26 L32 32 L38 32 L33 36 L35 42 L30 38 L25 42 L27 36 L22 32 L28 32 Z" fill={color} opacity="0.3" />
      {/* Sparkle dots */}
      <circle cx="48" cy="20" r="1" fill={color} opacity="0.4" />
      <circle cx="12" cy="28" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA-like double helix representing scientific legacy */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Connecting rungs */}
      {[12, 20, 28, 36, 44, 52].map((y, i) => (
        <line key={i} x1={20 + (i % 2 === 0 ? 5 : -5)} y1={y} x2={40 + (i % 2 === 0 ? -5 : 5)} y2={y} stroke={color} strokeWidth="1" opacity="0.3" />
      ))}
      {/* Glowing nodes */}
      <circle cx="20" cy="25" r="2" fill={color} opacity="0.5" />
      <circle cx="40" cy="25" r="2" fill={color} opacity="0.5" />
      <circle cx="20" cy="45" r="2" fill={color} opacity="0.5" />
      <circle cx="40" cy="45" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'ultimos-anios': [DecoRadiationSymbol, DecoFlask, DecoAtomCurie],
  'muerte-legado': [DecoCoffin, DecoRadiationSymbol, DecoFlask],
  'el-pantheon': [DecoCoffin, DecoMedal, DecoRadiationSymbol],
  'familia-curie': [DecoHelix, DecoAtomCurie, DecoMedal],
  'curie-cultura': [DecoMedal, DecoFlask, DecoHelix],
  'instituto-curie': [DecoFlask, DecoAtomCurie, DecoRadiationSymbol],
  'inspiracion-eterna': [DecoHelix, DecoMedal, DecoCoffin],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Quinn, S. (1995). Marie Curie: A Life, Simon & Schuster',
  'Curie, E. (1937). Madame Curie: A Biography, Doubleday',
  'Goldsmith, B. (2005). Obsessive Genius: The Inner World of Marie Curie, W.W. Norton',
  'Redniss, L. (2010). Radioactive: Marie & Pierre Curie, A Tale of Love and Fallout, It Books/HarperCollins',
  'Pasachoff, N. (1996). Marie Curie and the Science of Radioactivity, Oxford University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'ultimos-anios',
    title: 'Los Últimos Años de Marie',
    color: '#4CAF50',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'Los últimos años de Marie Curie estuvieron marcados por un contraste entre el reconocimiento internacional y un deterioro físico progresivo causado por décadas de trabajo con materiales radiactivos. Desde su segundo Premio Nobel en 1911 hasta su muerte en 1934, Marie continuó investigando y dirigiendo el Instituto del Radio de París sin reducir su ritmo de trabajo, a pesar de que su cuerpo mostraba señales cada vez más claras de daño por radiación. Sus manos presentaban quemaduras crónicas que no cicatrizaban, y sus dedos estaban frecuentemente vendados mientras manipulaba tubos de ensayo en el laboratorio.',
      'En 1921, Marie viajó a Estados Unidos invitada por la periodista Marie Meloney del magazine The Delineator. El presidente Warren G. Harding le entregó un gramo de radio — valorado en 100,000 dólares de la época, equivalente a más de 1.7 millones de dólares actuales — comprado con donaciones de mujeres estadounidenses. Este viaje fue agotador para su salud debilitada; en varias ocasiones tuvo que cancelar eventos públicos por fatiga extrema, y su hija Irène la acompañó para sustituirla en algunas apariciones.',
      'Marie desarrolló cataratas en ambos ojos entre 1920 y 1930, sometiéndose a cuatro operaciones quirúrgicas separadas. Los cirujanos notaron que sus cataratas eran inusualmente densas para su edad, un efecto que hoy los médicos reconocen como consecuencia directa de la exposición prolongada a radiación ionizante. Durante los períodos de recuperación, Marie escribía sus notas científicas con letras enormes usando lápices gruesos porque apenas podía ver el papel, y usaba seudónimos al registrarse en los hospitales para evitar la atención de la prensa.',
      'Los análisis de sangre realizados a Marie en sus últimos años mostraban recuentos anormalmente bajos de glóbulos blancos y rojos, un indicador de daño en la médula ósea. Sin embargo, ella se negaba a aceptar que la radiación pudiera ser responsable de su enfermedad. En aquella época, los efectos biológicos de la radiación no se comprendían del todo; Marie había trabajado durante años con radio guardándolo en los bolsillos de su bata, y sus cuadernos de laboratorio permanecen tan contaminados que hoy requieren almacenamiento en cajas forradas de plomo en la Biblioteca Nacional de Francia.',
      'A pesar de su deterioro físico, Marie mantuvo una actividad científica y diplomática notable. Fue miembro del Comité de Cooperación Intelectual de la Liga de Naciones — el organismo precursor de la UNESCO — convirtiéndose en la primera mujer en ocupar ese cargo. Viajó a España, Brasil, Bélgica y Checoslovaquia promoviendo la cooperación científica internacional, y en 1929 realizó un segundo viaje a Estados Unidos para obtener otro gramo de radio destinado al Instituto del Radio de Varsovia, que ella ayudó a fundar en su Polonia natal.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los cuadernos de laboratorio de Marie Curie, conservados en la Biblioteca Nacional de Francia en París, siguen siendo radiactivos más de 90 años después de su muerte. Cualquier investigador que desee consultarlos debe firmar un formulario de exención de responsabilidad y usar guantes y ropa protectora especial. Los niveles de contaminación medidos en las páginas provienen principalmente de radio-226, un isótopo con una vida media de 1,600 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radiación ionizante daña el ADN de las células del cuerpo humano. Cuando las células de la médula ósea acumulan suficiente daño, pierden la capacidad de producir células sanguíneas normales. Este mecanismo, descubierto décadas después de la muerte de Marie, explica por qué desarrolló anemia aplásica. La dosis de radiación acumulada por Marie durante sus décadas de trabajo se estima en varios sieverts, muy por encima del límite anual de 20 milisieverts establecido hoy para trabajadores de la industria nuclear.' }
    ],
    fact: 'Marie Curie solía llevar frascos con isótopos radiactivos en los bolsillos de su bata y guardaba tubos de ensayo con sales de radio en el cajón de su escritorio. Describió en su diario personal cómo las sustancias radiactivas producían un resplandor azul verdoso en la oscuridad que ella encontraba "hermoso". Este fenómeno, conocido como luminiscencia por radiación, se debe a que las partículas alfa y beta emitidas por el radio excitan las moléculas del aire circundante, haciéndolas emitir fotones visibles.'
  },
  {
    id: 'muerte-legado',
    title: 'Muerte y Legado Inmediato',
    color: '#6A1B9A',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'El 4 de julio de 1934, Marie Curie falleció en el sanatorio de Sancellemoz, ubicado en Passy, en los Alpes franceses, a los 66 años de edad. La causa oficial de su muerte fue anemia aplásica, una enfermedad en la que la médula ósea deja de producir suficientes células sanguíneas — glóbulos rojos, glóbulos blancos y plaquetas. Los médicos que la atendieron determinaron que esta condición había sido causada directamente por la exposición prolongada a radiación durante más de tres décadas de trabajo científico.',
      'Los últimos días de Marie en Sancellemoz fueron descritos por su hija Ève en la biografía publicada en 1937. Marie tenía fiebre alta que no respondía a ningún tratamiento, y sus análisis de sangre mostraban valores de hemoglobina peligrosamente bajos. Incluso en su lecho de muerte, Marie revisaba datos experimentales y corregía un manuscrito científico. Su hermana Bronisława viajó desde Polonia para estar a su lado, pero Marie apenas podía hablar en sus últimas horas. Fue enterrada el 6 de julio junto a Pierre Curie en el cementerio de Sceaux, el mismo pueblo donde se habían casado en julio de 1895.',
      'El ataúd de Marie Curie fue construido con un revestimiento interior de plomo de un milímetro de espesor, una precaución necesaria porque su cuerpo estaba tan contaminado con radio-226 que emitía niveles detectables de radiación gamma. Cuando sus restos fueron exhumados en 1995 para el traslado al Panteón, los técnicos del Office de Protection contre les Rayonnements Ionisants (OPRI) midieron los niveles de radiación del ataúd y confirmaron que, aunque detectables, estaban dentro de rangos seguros para la manipulación con protección estándar.',
      'Inmediatamente después de su muerte, el Instituto del Radio continuó operando bajo la dirección de André Debierne, un colaborador cercano de Marie desde 1899. La comunidad científica internacional reconoció su pérdida: Albert Einstein, quien la había visitado en varias ocasiones, escribió que Marie Curie fue "la única persona a quien la fama no corrompió". El gobierno francés ofreció una pensión a su familia, pero sus hijas Irène y Ève insistieron en mantener la independencia económica que su madre siempre había valorado.',
      'El legado inmediato de Marie se materializó en las instituciones que fundó. El Instituto del Radio de París, que ella dirigió desde 1914, continuó produciendo investigaciones pioneras en física nuclear y medicina radiológica. El Instituto del Radio de Varsovia, inaugurado en 1932 con el segundo gramo de radio que Marie obtuvo en su viaje a Estados Unidos de 1929, se convirtió en el principal centro de tratamiento oncológico de Polonia. Ambas instituciones siguen operativas hoy, más de nueve décadas después de la muerte de su fundadora, y han tratado a cientos de miles de pacientes de cáncer.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ève Curie, la hija menor de Marie, fue la única miembro de la familia que no se dedicó a la ciencia. Se convirtió en periodista, pianista y escritora, y publicó en 1937 "Madame Curie", una biografía de su madre que se tradujo a 25 idiomas y se convirtió en un referente mundial. Ève también trabajó como corresponsal de guerra durante la Segunda Guerra Mundial y fue embajadora ante la OTAN. Se casó con Henry Labouisse, director ejecutivo de UNICEF, quien recibió el Nobel de la Paz en 1965, sumando así otro Nobel más a la historia familiar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La anemia aplásica inducida por radiación ocurre cuando las células madre hematopoyéticas de la médula ósea sufren daño irreparable en su ADN. Estas células madre son particularmente vulnerables a la radiación porque se dividen con frecuencia. Cuando mueren o dejan de funcionar, el cuerpo pierde progresivamente la capacidad de renovar su sangre. Los síntomas incluyen fatiga severa, susceptibilidad a infecciones y hemorragias, todos documentados en los registros médicos de Marie Curie durante sus últimos años de vida.' }
    ],
    fact: 'El radio-226 que contaminaba el cuerpo y los objetos personales de Marie Curie tiene una vida media de 1,600 años, lo que significa que la mitad de los átomos radiactivos presentes en 1934 todavía estarán emitiendo radiación en el año 3534. Sus pertenencias personales — incluyendo su libro de cocina, sus muebles y su ropa — están almacenadas en la Biblioteca Nacional de Francia dentro de contenedores sellados forrados de plomo, y no estarán seguras para manipulación sin protección durante varios milenios.'
  },
  {
    id: 'el-pantheon',
    title: 'El Panteón',
    color: '#66BB6A',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'El 20 de abril de 1995, los restos de Marie y Pierre Curie fueron trasladados desde el cementerio de Sceaux al Panteón de París, el monumento neoclásico ubicado en el Barrio Latino que Francia reserva para honrar a sus ciudadanos más distinguidos. Marie se convirtió en la primera mujer en recibir este honor por sus propios méritos científicos. Hasta esa fecha, solo una mujer había sido inhumada en el Panteón: Sophie Berthelot, pero fue admitida en 1907 únicamente como acompañante de su esposo Marcellin Berthelot, el químico.',
      'La ceremonia fue presidida por el presidente François Mitterrand, quien pronunció un discurso que se considera uno de los más significativos sobre el papel de las mujeres en la ciencia. Mitterrand declaró que el ingreso de Marie Curie al Panteón representaba "el reconocimiento debido a una gran científica, la conquista de la ciencia por una mujer, la fe en la ciencia y la dedicación a los demás". Lech Wałęsa, presidente de Polonia y también Premio Nobel, asistió como invitado de honor, representando el país natal de Marie.',
      'El traslado requirió medidas de seguridad radiológica sin precedentes para una ceremonia de Estado. Técnicos del OPRI (Office de Protection contre les Rayonnements Ionisants) abrieron el ataúd original para verificar los niveles de contaminación radiactiva. Se determinó que el cuerpo de Marie contenía niveles residuales de radio-226, pero que la radiación emitida era suficientemente baja para permitir el traslado seguro. Los restos fueron colocados en un nuevo ataúd con un revestimiento adicional de plomo antes de ser depositados en la cripta del Panteón.',
      'El Panteón de París alberga los restos de 81 personas consideradas héroes nacionales de Francia, incluyendo a Voltaire, Jean-Jacques Rousseau, Victor Hugo, Émile Zola y Alexandre Dumas. Marie Curie descansa en la cripta junto a Pierre, manteniendo unidos en la muerte a la pareja que revolucionó la física en vida. La inscripción en su tumba reconoce sus dos Premios Nobel y su contribución al conocimiento de la radioactividad. Desde 1995, solo otras cuatro mujeres han ingresado al Panteón: Geneviève de Gaulle-Anthonioz y Germaine Tillion en 2015, Simone Veil en 2018 y Joséphine Baker en 2021.',
      'La decisión de trasladar a Marie al Panteón generó un debate nacional en Francia sobre la representación de las mujeres en los monumentos y la memoria colectiva. Grupos feministas y científicos llevaban décadas solicitando este reconocimiento. El gesto de Mitterrand fue interpretado como una corrección histórica largamente aplazada. Marie Curie sigue siendo la única científica mujer en el Panteón, un dato que refleja tanto la singularidad de su contribución como la persistente desigualdad de representación en los espacios de honor institucional. La cripta donde reposa se ha convertido en uno de los puntos más visitados del monumento, con más de 700,000 visitantes anuales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Panteón de París fue construido originalmente entre 1758 y 1790 como la Iglesia de Sainte-Geneviève, diseñada por el arquitecto Jacques-Germain Soufflot por encargo del rey Luis XV. Durante la Revolución Francesa fue transformado en un mausoleo civil para los "Grandes Hombres" de la nación. Su fachada neoclásica tiene 22 columnas corintias y la inscripción "AUX GRANDS HOMMES LA PATRIE RECONNAISSANTE" (A los grandes hombres, la patria agradecida). La ironía de esta inscripción masculina no pasó desapercibida cuando Marie Curie fue la primera mujer en ser honrada allí por méritos propios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El péndulo de Foucault que cuelga dentro del Panteón fue instalado originalmente por el físico Léon Foucault en 1851 para demostrar visualmente la rotación de la Tierra. El péndulo, una esfera de latón de 28 kilogramos suspendida de un cable de 67 metros, oscila en un plano fijo mientras el edificio rota debajo de él. En la latitud de París (48.8°N), el plano de oscilación completa un giro aparente de 360 grados cada 31 horas y 50 minutos. Marie Curie habría apreciado esta demostración de física fundamental en el mismo edificio donde ahora reposa.' }
    ],
    fact: 'Cuando el presidente Mitterrand anunció el traslado de Marie Curie al Panteón en 1995, la nieta de Marie, Hélène Langevin-Joliot — física nuclear y directora de investigación en el CNRS — participó en la ceremonia como representante de la familia. Hélène, hija de Irène y Frédéric Joliot-Curie, continuó la tradición científica familiar investigando la estructura del núcleo atómico. En su discurso, recordó que su abuela Marie siempre insistió en que "en la ciencia, debemos interesarnos en las cosas, no en las personas", una frase que la propia Marie escribió en una carta fechada en 1903.'
  },
  {
    id: 'familia-curie',
    title: 'La Familia Curie',
    color: '#7B1FA2',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'La familia Curie constituye la dinastía científica más reconocida de la historia, acumulando cinco Premios Nobel entre sus miembros directos y sus cónyuges. Marie Curie recibió el Nobel de Física en 1903 (compartido con Pierre Curie y Henri Becquerel) y el Nobel de Química en 1911. Su hija mayor Irène Joliot-Curie y su yerno Frédéric Joliot-Curie recibieron el Nobel de Química en 1935 por el descubrimiento de la radioactividad artificial. Y Henry Labouisse, esposo de la hija menor Ève, recibió el Nobel de la Paz en 1965 como director de UNICEF.',
      'Irène Joliot-Curie (1897-1956) creció literalmente en el laboratorio de sus padres, observando cómo procesaban pechblenda cuando era una niña. Educada bajo la tutela directa de Marie, se doctoró en la Sorbona en 1925 con una tesis sobre los rayos alfa del polonio — el mismo elemento que su madre había descubierto 27 años antes. En 1926 se casó con Frédéric Joliot, un físico que trabajaba como asistente en el Instituto del Radio. Juntos formaron una pareja científica que los contemporáneos comparaban con Marie y Pierre por su colaboración metódica y complementaria.',
      'El descubrimiento más importante de Irène y Frédéric fue la radioactividad artificial en enero de 1934, apenas seis meses antes de la muerte de Marie. Demostraron que al bombardear aluminio-27 con partículas alfa, se producía fósforo-30, un isótopo radiactivo que no existe en la naturaleza pero que emite positrones al desintegrarse. Marie pudo conocer este resultado antes de morir y, según el testimonio de Frédéric, fue "la última gran alegría científica de su vida". Este descubrimiento transformó la medicina nuclear moderna.',
      'Los hijos de Irène y Frédéric continuaron la tradición familiar en la ciencia. Hélène Langevin-Joliot (nacida en 1927) se convirtió en física nuclear y fue directora de investigación en el Centro Nacional de Investigación Científica (CNRS) de Francia, especializándose en la estructura del núcleo atómico. Pierre Joliot (nacido en 1932) se hizo biofísico y fue director de investigación en el CNRS, estudiando la fotosíntesis y las reacciones de transferencia de electrones en sistemas biológicos. Ambos nietos rechazaron las comparaciones con sus célebres abuelos, insistiendo en que su trabajo se valorara por sus propios méritos.',
      'Frédéric Joliot-Curie desempeñó un papel central en el programa nuclear francés. En 1948 fue nombrado Alto Comisionado de Energía Atómica de Francia y supervisó la construcción del primer reactor nuclear francés, ZOÉ, en el centro de investigación de Fontenay-aux-Roses. Fue destituido en 1950 por sus opiniones políticas, pero su contribución técnica sentó las bases del programa nuclear civil francés. Irène, por su parte, fue Subsecretaria de Estado de Investigación Científica en 1936, convirtiéndose en una de las primeras mujeres en ocupar un cargo ministerial en Francia. Falleció en 1956 de leucemia, una enfermedad atribuida, al igual que la de su madre, a la exposición prolongada a materiales radiactivos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La educación de Irène fue poco convencional. Marie Curie, junto con otros científicos destacados como Paul Langevin y Jean Perrin, creó una "cooperativa escolar" informal donde cada padre enseñaba su especialidad a los hijos del grupo. Marie enseñaba física, Langevin daba matemáticas, y Perrin explicaba química. Esta educación alternativa se realizó entre 1907 y 1909, y varios de los niños del grupo se convirtieron después en científicos profesionales. Marie consideraba que la educación convencional era demasiado rígida y no fomentaba la curiosidad natural.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radioactividad artificial descubierta por Irène y Frédéric Joliot-Curie en 1934 permite crear isótopos radiactivos que no existen en la naturaleza. Hoy, estos isótopos se usan en más de 40 millones de procedimientos médicos anuales en todo el mundo. El tecnecio-99m, producido artificialmente, se emplea en el 80% de los estudios de medicina nuclear. El yodo-131 trata enfermedades tiroideas. El flúor-18 se usa en tomografías PET para detectar tumores. Todo esto tiene su origen directo en el trabajo de la segunda generación de la familia Curie.' }
    ],
    fact: 'La familia Curie acumula un total de cinco Premios Nobel: Marie recibió dos (Física 1903, Química 1911), Irène y Frédéric compartieron uno (Química 1935) y Henry Labouisse recibió el de la Paz (1965) como director de UNICEF. Ninguna otra familia en la historia ha igualado esta cifra. Además, si contamos a Pierre Curie (quien compartió el Nobel con Marie en 1903) como miembro familiar, son cuatro personas biológicamente conectadas con premios Nobel en ciencias exactas, una concentración de talento científico sin paralelo documentado en la historia de la humanidad.'
  },
  {
    id: 'curie-cultura',
    title: 'Marie Curie en la Cultura',
    color: '#81C784',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'Marie Curie se ha convertido en una de las figuras científicas más representadas en la cultura popular, apareciendo en películas, libros, estampillas postales, billetes y monedas de múltiples países. La primera película sobre su vida fue "Madame Curie" (1943), dirigida por Mervyn LeRoy y protagonizada por Greer Garson y Walter Pidgeon, basada en la biografía escrita por Ève Curie en 1937. La película fue nominada a siete premios Óscar de la Academia, incluyendo Mejor Película, y presentó al público estadounidense una imagen idealizada pero respetuosa de la científica.',
      'En 2019, la directora francesa Marjane Satrapi — conocida por la novela gráfica "Persépolis" — dirigió "Radioactive", una película protagonizada por Rosamund Pike como Marie Curie y Sam Riley como Pierre. La película utilizó un enfoque narrativo innovador, intercalando escenas de la vida de Marie con flash-forwards que mostraban las consecuencias históricas de sus descubrimientos: los bombardeos de Hiroshima en 1945, el accidente nuclear de Chernóbil en 1986 y los tratamientos de radioterapia contra el cáncer. Esta estructura conectó la ciencia de Marie con sus impactos positivos y negativos en la historia posterior.',
      'Marie Curie ha aparecido en la moneda y los sellos postales de al menos 15 países diferentes. Polonia la honró en el billete de 20,000 zlotys (1989-1995) y en monedas conmemorativas de plata. Francia emitió un sello postal en 1938 y la incluyó en el billete de 500 francos entre 1994 y 2002 — fue la última persona real en aparecer en un billete francés antes de la adopción del euro. También aparece en sellos de países como Suecia, Guinea, Mali, Gabón y República Centroafricana, reflejando el alcance global de su reconocimiento.',
      'El Museo Curie, ubicado en el 1 rue Pierre et Marie Curie en el 5° arrondissement de París, ocupa el antiguo laboratorio de Marie en el Instituto del Radio. Inaugurado en 1964, el museo conserva el despacho y el laboratorio personal de Marie tal como estaban durante sus años de trabajo, incluyendo sus instrumentos científicos originales como el electrómetro piezoeléctrico diseñado por Pierre. El museo recibe aproximadamente 25,000 visitantes al año y la entrada es gratuita. Sus exposiciones incluyen documentos originales, fotografías de la época y réplicas de los aparatos que Marie utilizó para medir la radioactividad.',
      'En literatura, Marie Curie ha inspirado más de 200 biografías publicadas en al menos 30 idiomas. Entre las más reconocidas están "Marie Curie: A Life" de Susan Quinn (1995), que utilizó documentos previamente inaccesibles del archivo familiar; "Obsessive Genius" de Barbara Goldsmith (2005), que analizó la psicología detrás de su perseverancia; y "Radioactive" de Lauren Redniss (2010), que combinó biografía con ilustraciones artísticas originales y ganó el National Book Award. En el ámbito educativo, Marie es la científica más mencionada en libros de texto de ciencias de educación primaria y secundaria en Europa, según un estudio de 2018 de la European Schoolnet.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Google le dedicó a Marie Curie un Doodle interactivo el 7 de noviembre de 2011 — el 144° aniversario de su nacimiento — que fue visto por más de mil millones de personas en todo el mundo. El Doodle mostraba a Marie en su laboratorio rodeada de instrumentos científicos brillantes. Además, el cráter Curie en la Luna (diámetro de 151 km) y el cráter Curie en Marte (diámetro de 98 km) llevan su nombre, al igual que el asteroide 7000 Curie, descubierto en 1939 por el astrónomo Fernand Rigaux en el Real Observatorio de Bélgica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El elemento 96 de la tabla periódica, el Curio (Cm), fue nombrado en honor de Marie y Pierre Curie en 1944 por Glenn Seaborg, Ralph James y Albert Ghiorso en el Laboratorio Metalúrgico de la Universidad de Chicago. El Curio es un actínido sintético altamente radiactivo con un número atómico de 96 y una masa atómica de 247. Su isótopo más estable, el curio-247, tiene una vida media de 15.6 millones de años. Se utiliza como fuente de partículas alfa en generadores termoeléctricos de radioisótopos para misiones espaciales, incluyendo los rovers Curiosity y Perseverance de la NASA en Marte.' }
    ],
    fact: 'La unidad de medida de la radioactividad "curie" (Ci) fue definida en 1910 por el Congreso Internacional de Radiología y Electricidad como la cantidad de radiación emitida por un gramo de radio-226 puro. Esta unidad equivale a exactamente 3.7 × 10^10 desintegraciones por segundo (37 gigabecquereles). Aunque el sistema internacional adoptó el becquerel (Bq) como unidad oficial en 1975, el curie sigue siendo ampliamente utilizado en medicina nuclear y en la industria en Estados Unidos. El nombre honra tanto a Marie como a Pierre Curie por su trabajo conjunto en el estudio de la radioactividad.'
  },
  {
    id: 'instituto-curie',
    title: 'El Instituto Curie Hoy',
    color: '#8E24AA',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'El Instituto Curie, fundado por Marie Curie en 1914 como el Instituto del Radio, es hoy uno de los centros de investigación oncológica y tratamiento del cáncer más importantes del mundo. Ubicado en el corazón de París, en la rue d\'Ulm del 5° arrondissement, el instituto emplea a más de 3,400 investigadores, médicos, enfermeros y personal administrativo. Su misión combina tres pilares: investigación fundamental en biología y física, investigación clínica aplicada al cáncer, y tratamiento directo de pacientes, atendiendo a más de 50,000 pacientes cada año en sus hospitales.',
      'La división de investigación del Instituto Curie alberga 87 equipos científicos organizados en 14 unidades de investigación, muchas de ellas en colaboración con el CNRS (Centro Nacional de Investigación Científica) y el INSERM (Instituto Nacional de Salud e Investigación Médica). Las áreas de investigación incluyen genómica del cáncer, inmunología tumoral, biología celular, biofísica y desarrollo de nuevos fármacos. El instituto publica más de 600 artículos científicos al año en revistas de alto impacto y posee una cartera de más de 130 familias de patentes activas relacionadas con diagnóstico y tratamiento oncológico.',
      'Una de las contribuciones más significativas del Instituto Curie a la medicina moderna es el desarrollo de la terapia con protones para el tratamiento del cáncer. El centro de protonterapia de Orsay, gestionado por el Instituto Curie desde 1991, fue uno de los primeros en Europa en utilizar haces de protones para destruir tumores con precisión milimétrica, minimizando el daño al tejido sano circundante. Esta tecnología es particularmente efectiva para tumores cerebrales pediátricos, melanomas oculares y tumores de la base del cráneo, y ha tratado a más de 10,000 pacientes desde su inauguración.',
      'El Instituto Curie también desempeña un papel relevante en la formación de nuevas generaciones de científicos y médicos. Su programa doctoral acoge a más de 200 estudiantes de doctorado simultáneamente, provenientes de más de 40 países diferentes. El instituto ofrece programas de máster especializados en biología del cáncer, biofísica y medicina de precisión en colaboración con universidades parisinas como la Sorbona y la Universidad Paris-Saclay. Los graduados del Instituto Curie ocupan posiciones de liderazgo en centros de investigación y hospitales oncológicos de todo el mundo.',
      'En 2020, el Instituto Curie inauguró un nuevo edificio de investigación diseñado específicamente para albergar laboratorios de medicina personalizada y análisis genómico a gran escala. Este edificio cuenta con secuenciadores de última generación capaces de analizar el genoma completo de un tumor en menos de 48 horas, permitiendo a los oncólogos seleccionar tratamientos específicos para las mutaciones genéticas de cada paciente individual. El presupuesto anual del instituto supera los 380 millones de euros, financiados por una combinación de fondos públicos, donaciones privadas y los ingresos generados por sus patentes. Marie Curie probablemente no imaginó que el modesto laboratorio que fundó en 1914 se convertiría en una institución de esta magnitud.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Instituto Curie conserva una tradición iniciada por la propia Marie: cada año, el 7 de noviembre — aniversario del nacimiento de Marie Curie — se celebra una ceremonia interna donde investigadores jóvenes presentan sus descubrimientos más recientes ante toda la comunidad del instituto. Esta tradición, llamada "Journée Marie Curie", conecta simbólicamente a las nuevas generaciones de científicos con la fundadora. Además, el edificio original donde Marie tenía su laboratorio personal ahora funciona como el Museo Curie, abierto al público gratuitamente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La protonterapia utiliza haces de protones acelerados a velocidades de hasta 180,000 km/s (60% de la velocidad de la luz) para destruir células tumorales. A diferencia de los rayos X convencionales que depositan energía a lo largo de todo su recorrido, los protones depositan la mayor parte de su energía en un punto preciso llamado "pico de Bragg", descubierto por William Henry Bragg en 1903. Esto permite irradiar el tumor con dosis altas mientras se protege el tejido sano circundante, reduciendo los efectos secundarios hasta en un 60% comparado con la radioterapia convencional.' }
    ],
    fact: 'El Instituto Curie ha contribuido directamente a tres Premios Nobel además de los de Marie: Pierre-Gilles de Gennes recibió el Nobel de Física en 1991 por su trabajo sobre cristales líquidos y polímeros realizado parcialmente en los laboratorios del instituto. En total, investigadores asociados al Instituto Curie han publicado más de 25,000 artículos científicos desde su fundación en 1914, y las técnicas de radioterapia desarrolladas a partir de los principios descubiertos por Marie han contribuido al tratamiento exitoso de más de 15 millones de pacientes de cáncer en todo el mundo durante el último siglo.'
  },
  {
    id: 'inspiracion-eterna',
    title: 'Inspiración Eterna',
    color: '#388E3C',
    btnImage: '/assets/curie/curie_m6.png',
    image: '/assets/curie/curie_m6.png',
    content: [
      'Marie Curie dejó un legado que trasciende sus descubrimientos científicos y se extiende al terreno de la inspiración personal y la transformación social. Su frase más citada — "Nada en la vida debe ser temido, solamente comprendido. Ahora es el momento de comprender más, para temer menos" — encapsula una filosofía de vida basada en la curiosidad y el coraje intelectual. Esta cita, registrada originalmente en inglés como "Nothing in life is to be feared, it is only to be understood", ha sido reproducida en millones de aulas, laboratorios y publicaciones educativas en todo el mundo.',
      'El impacto de Marie Curie en la participación de las mujeres en la ciencia es verificable con datos concretos. Antes de 1903, cuando Marie recibió su primer Nobel, ninguna mujer había ganado ese premio. En los 120 años transcurridos desde entonces, 65 mujeres han recibido un Premio Nobel en diferentes categorías. En el campo específico de la ciencia, Marie fue la primera de 25 mujeres laureadas con Nobel en Física, Química o Medicina. Según datos de la UNESCO de 2023, las mujeres representan el 33.3% de los investigadores a nivel mundial, un porcentaje que ha crecido desde el 28% registrado en 2015, aunque persisten desigualdades significativas por región.',
      'Numerosas instituciones educativas y científicas llevan el nombre de Marie Curie. La Universidad Marie Curie-Skłodowska en Lublin, Polonia, fundada en 1944, atiende a más de 18,000 estudiantes. El programa "Marie Skłodowska-Curie Actions" de la Unión Europea, creado en 1996, ha financiado la formación de más de 130,000 investigadores de 130 países con un presupuesto acumulado superior a los 7,000 millones de euros. La organización benéfica Marie Curie del Reino Unido, fundada en 1948, opera nueve centros de cuidados paliativos y emplea a más de 2,700 enfermeras especializadas que atienden a pacientes terminales en sus propios hogares.',
      'La historia de Marie Curie también sirve como caso de estudio sobre las barreras institucionales que enfrentan las mujeres en la ciencia. A pesar de sus dos Premios Nobel, Marie fue rechazada por la Academia de Ciencias de Francia en enero de 1911 por un margen de solo dos votos (28 contra 30). La misoginia del proceso fue evidente: un académico argumentó públicamente que "las mujeres no pueden ser miembros de la Academia". Marie nunca volvió a presentar su candidatura. La Academia de Ciencias de Francia no admitió a una mujer hasta 1979, cuando la física Yvonne Choquet-Bruhat fue elegida, 68 años después del rechazo a Marie.',
      'Albert Einstein, que visitó a Marie Curie en varias ocasiones, escribió en 1935 que ella era "la única persona a quien la fama no había corrompido" y que "siempre antepuso el servicio público a su vida personal". Esta observación coincide con el hecho documentado de que Marie nunca patentó el proceso de aislamiento del radio, renunciando deliberadamente a beneficios económicos potenciales para que otros científicos pudieran usar sus métodos libremente. Cuando Einstein la visitó en la playa, la encontró dibujando ecuaciones en la arena para explicar física a los niños del vecindario. Marie creía que compartir el conocimiento era tan importante como generarlo, una convicción que sigue inspirando a educadores y científicos más de 90 años después de su muerte.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie nunca patentó sus descubrimientos. Cuando ella y Pierre desarrollaron el proceso para aislar el radio de la pechblenda, decidieron conscientemente publicar todos los detalles del método sin solicitar patentes. Pierre argumentó que "sería contrario al espíritu científico" restringir el acceso al conocimiento. Esta decisión les costó una fortuna: el radio se convirtió en un material con un valor de mercado de 100,000 dólares por gramo en la década de 1920, y los laboratorios de todo el mundo usaron el método Curie para producirlo comercialmente sin pagar regalías a la familia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El programa "Marie Skłodowska-Curie Actions" (MSCA) de la Unión Europea es el mayor programa de movilidad científica del mundo. Entre 2014 y 2020, bajo el programa Horizonte 2020, financió a 65,000 investigadores con un presupuesto de 6,162 millones de euros. El programa actual, Horizonte Europa (2021-2027), tiene un presupuesto de 6,600 millones de euros. Los investigadores financiados por MSCA han producido más de 200,000 publicaciones científicas y registrado más de 2,000 patentes. El programa lleva el nombre completo de Marie, incluyendo su apellido polaco Skłodowska, como reconocimiento a sus raíces.' }
    ],
    fact: 'Marie Curie es la única persona en la historia que ha recibido Premios Nobel en dos disciplinas científicas diferentes: Física (1903) y Química (1911). Solo otra persona ha recibido dos Premios Nobel en ciencias: Linus Pauling, quien ganó el de Química (1954) y el de la Paz (1962), pero uno de ellos no fue en ciencias. Frederick Sanger ganó dos Nobel de Química (1958 y 1980), pero ambos fueron en la misma disciplina. El logro de Marie — dominar y revolucionar dos campos científicos distintos — permanece sin paralelo 113 años después de su segundo Nobel.'
  },
];

// ─── Radiant Particle Field (Canvas Background) ─────────────────────────────
function RadiantField() {
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

// ─── Legacy Header ──────────────────────────────────────────────────────────
function LegacyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Legacy arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#legacyGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central radiation symbol */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="6" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="3" fill="#4CAF50" opacity="0.5" />
        <defs>
          <linearGradient id="legacyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(106,27,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LEGADO DE MARIE CURIE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">UNA LUZ QUE NO SE APAGA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
          layoutId="activeDotCurieM6"
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
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

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_CurieM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/curie_m6.png)',
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
      <RadiantField />

      <LegacyHeader />

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
              🏆 ¡Has explorado todo el legado de Marie Curie!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Legado Radiante
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
