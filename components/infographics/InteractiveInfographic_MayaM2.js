'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoSerpentHead({ size = 70, color = '#FF6D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 30 30 40 Q40 50 50 40 L55 45 L50 55 L10 55 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 40 L5 30 L15 25 L30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="35" r="3" fill={color} opacity="0.6" />
      <path d="M40 45 Q45 40 50 45" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Feathers */}
      <path d="M15 25 Q20 15 10 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M20 28 Q30 18 20 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStaircase({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 55 L55 55 L55 45 L45 45 L45 35 L35 35 L35 25 L25 25 L25 15 L15 15 L15 5 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="55" x2="15" y2="15" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="25" y1="55" x2="25" y2="25" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="35" y1="55" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="45" y1="55" x2="45" y2="45" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoSunRays({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 15 * Math.cos(rad)} y1={30 + 15 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function DecoTriangle({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 10,50 50,50" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <polygon points="30,20 18,45 42,45" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <polygon points="30,30 25,40 35,40" fill={color} opacity="0.4" />
      {/* Light ray intersecting */}
      <line x1="0" y1="20" x2="60" y2="40" stroke={color} strokeWidth="1" opacity="0.7" strokeDasharray="4,2" />
    </svg>
  );
}

function DecoCalendarWheel({ size = 70, color = '#00C853', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner dots */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Divisions */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="1" />
        );
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'piramide-castillo': [DecoStaircase, DecoTriangle, DecoCalendarWheel],
  'equinoccio-serpiente': [DecoSerpentHead, DecoSunRays, DecoTriangle],
  'geometria-solar': [DecoSunRays, DecoTriangle, DecoStaircase],
  'calendario-piedra': [DecoCalendarWheel, DecoStaircase, DecoSunRays],
  'acustica-quetzal': [DecoSerpentHead, DecoTriangle, DecoCalendarWheel],
  'construccion-capas': [DecoStaircase, DecoTriangle, DecoSerpentHead],
  'patrimonio-mundial': [DecoCalendarWheel, DecoSunRays, DecoStaircase],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lubman, D. (1998). "An Archaeological Study of Chirped Echo from the Mayan Pyramid at ChichÃ©n ItzÃ¡", JASA, 104',
  'Carlson, J.B. (1999). "Pilgrimage and the Equinox Serpent of Light and Shadow Phenomenon at the Castillo", Archaeoastronomy, 14',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Ringle, W. et al. (1998). "The Return of Quetzalcoatl: Evidence for the Spread of a World Religion", Ancient Mesoamerica, 9',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'piramide-castillo',
    title: 'El Castillo',
    color: '#FF6D00',
    btnImage: '/assets/maya/infographic_m2/btn_piramide-castillo.jpg',
    image: '/assets/maya/infographic_m2/hero_piramide-castillo.jpg',
    content: [
      'La pirÃ¡mide conocida como "El Castillo" se levanta majestuosa en el centro de ChichÃ©n ItzÃ¡. Imagina un edificio de 30 metros de altura, casi como un bloque de apartamentos de 10 pisos, pero construido hace unos mil aÃ±os, alrededor del aÃ±o 1000 d.C. No solo es una tumba o un templo comÃºn, es una obra maestra de la arquitectura monumental maya.',
      'Su estructura estÃ¡ formada por 9 terrazas escalonadas. En la cosmovisiÃ³n maya, el universo tiene diferentes niveles, y estas 9 plataformas representan los 9 niveles del XibalbÃ¡, el inframundo maya. Es como si la pirÃ¡mide fuera un modelo a escala de todo su universo espiritual, construido bloque por bloque de piedra caliza, uniendo el cielo y el inframundo.',
      'Pero lo mÃ¡s asombroso de El Castillo son sus escaleras. Si las miras de cerca, verÃ¡s que tiene escalinatas en sus cuatro lados. Cada escalera tiene 91 escalones. Si multiplicamos 91 por 4, nos da 364. Y si sumamos la plataforma superior del templo como el paso final, obtenemos exactamente 365, Â¡el mismo nÃºmero de dÃ­as en un aÃ±o solar!',
      'Esta pirÃ¡mide es, de hecho, un inmenso calendario de piedra. Los mayas observaban el cielo con extrema precisiÃ³n. Sin telescopios modernos, lograron calcular la duraciÃ³n del aÃ±o solar (el Haab) con un margen de error mÃ­nimo comparado con nuestros cÃ¡lculos actuales. Construyeron esta pirÃ¡mide para demostrar su control sobre el tiempo y el espacio.',
      'AdemÃ¡s, la ubicaciÃ³n de El Castillo no fue un accidente. EstÃ¡ posicionada con una desviaciÃ³n cuidadosa respecto al norte verdadero. Esta ligera rotaciÃ³n de la estructura permite que, en dÃ­as especÃ­ficos del aÃ±o, el sol interactÃºe con la arquitectura de formas increÃ­bles. Es un gigantesco reloj solar y un escenario para demostraciones astronÃ³micas mÃ¡gicas.',
    ],
    expandables: [
      { label: 'El Haab Maya', icon: 'clock', text: 'El calendario Haab de 365 dÃ­as se dividÃ­a en 18 meses de 20 dÃ­as cada uno (360 dÃ­as), mÃ¡s un periodo final llamado "Wayeb" de 5 dÃ­as. Durante el Wayeb, se creÃ­a que las barreras entre los mundos se debilitaban, por lo que era un tiempo de rituales y mucha precauciÃ³n.' },
      { label: 'Un Nombre EspaÃ±ol', icon: 'clock', text: 'El nombre "El Castillo" se lo dieron los conquistadores espaÃ±oles en el siglo XVI porque la imponente estructura les recordaba a las fortalezas europeas. Sin embargo, para los mayas, este era el Templo de KukulcÃ¡n, el dios serpiente emplumada de la sabidurÃ­a y el viento.' },
    ],
    fact: 'En el interior de la pirÃ¡mide principal que vemos hoy, Â¡hay otra pirÃ¡mide oculta mÃ¡s antigua! Es una prÃ¡ctica comÃºn en MesoamÃ©rica: los gobernantes construÃ­an sus nuevos templos envolviendo y ampliando los edificios anteriores, como si fueran muÃ±ecas rusas gigantes hechas de piedra maciza y estuco.',
  },
  {
    id: 'equinoccio-serpiente',
    title: 'La Serpiente de Luz',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m2/btn_equinoccio-serpiente.jpg',
    image: '/assets/maya/infographic_m2/hero_equinoccio-serpiente.jpg',
    content: [
      'Dos veces al aÃ±o, un espectÃ¡culo mÃ¡gico ocurre en El Castillo. Ocurre durante los equinoccios de primavera y otoÃ±o, que suelen caer alrededor del 20 de marzo y el 22 de septiembre. Durante estas fechas, el dÃ­a y la noche tienen exactamente la misma duraciÃ³n en todo el planeta. Es un momento de equilibrio cÃ³smico.',
      'Al final de la tarde en estos dÃ­as, a medida que el sol comienza a ponerse, sus rayos golpean la esquina noroeste de las 9 terrazas escalonadas de la pirÃ¡mide. Esto proyecta una serie de sombras triangulares sobre la alfarda (el borde de piedra) de la escalinata norte. Imagina el sol actuando como un proyector de cine sobre una pantalla de piedra.',
      'Conforme el sol desciende en el horizonte, estas sombras forman un patrÃ³n exacto de 7 triÃ¡ngulos de luz y sombra. Estos triÃ¡ngulos parecen conectarse perfectamente con la enorme cabeza de serpiente de piedra tallada que se encuentra en la base de la escalinata. El efecto visual completo es el de una gigantesca serpiente luminosa bajando del cielo.',
      'Esta "Serpiente de Luz" es la manifestaciÃ³n de KukulcÃ¡n, la serpiente emplumada. Para los antiguos mayas, este evento visual era una seÃ±al divina. KukulcÃ¡n descendÃ­a del cielo a la tierra para bendecir las cosechas, marcar el inicio del ciclo agrÃ­cola de primavera, o anunciar el momento de las recolecciones en otoÃ±o. Era pura magia astronÃ³mica.',
      'El fenÃ³meno es dinÃ¡mico. No es solo una imagen estÃ¡tica. Comienza lentamente y a lo largo de aproximadamente tres horas, la serpiente parece deslizarse hacia abajo y ondulando por el costado de la pirÃ¡mide a medida que cambia el Ã¡ngulo del sol. Â¡Es una pelÃ­cula de animaciÃ³n en piedra impulsada por el movimiento de nuestro sistema solar!',
    ],
    expandables: [
      { label: 'Un Dios Viajero', icon: 'atom', text: 'KukulcÃ¡n es la versiÃ³n maya del dios QuetzalcÃ³atl de la cultura tolteca y azteca en el centro de MÃ©xico. Significa "Serpiente Emplumada", combinando al quetzal (el ave del cielo) y la serpiente (el animal de la tierra). Era un dios unificador en MesoamÃ©rica.' },
      { label: 'PrecisiÃ³n Relojera', icon: 'clock', text: 'El evento no dura solo un dÃ­a, sino que es visible durante varios dÃ­as alrededor de las fechas de los equinoccios, pero alcanza su mÃ¡xima perfecciÃ³n de 7 triÃ¡ngulos completos y perfectos exactamente en el dÃ­a del equinoccio, dependiendo de las condiciones de las nubes.' },
    ],
    fact: 'El diseÃ±o es tan meticuloso que un pequeÃ±o error en el Ã¡ngulo de inclinaciÃ³n de los muros de la pirÃ¡mide, o en la orientaciÃ³n de sus esquinas respecto a la posiciÃ³n del sol en el ecuador, habrÃ­a arruinado completamente el efecto. Los arquitectos mayas no solo entendÃ­an astronomÃ­a, dominaban la geometrÃ­a 3D.',
  },
  {
    id: 'geometria-solar',
    title: 'GeometrÃ­a Solar',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m2/btn_geometria-solar.jpg',
    image: '/assets/maya/infographic_m2/hero_geometria-solar.jpg',
    content: [
      'Â¿CÃ³mo lograron los mayas que la luz formara exactamente la figura de una serpiente? No fue magia, fue una combinaciÃ³n maestra de matemÃ¡ticas avanzadas, topografÃ­a, astronomÃ­a y geometrÃ­a. El secreto estÃ¡ en cÃ³mo diseÃ±aron y colocaron la pirÃ¡mide en el terreno. Fue construida para jugar con la luz del sol como un espejo gigante.',
      'El Castillo no apunta exactamente al norte. EstÃ¡ rotado aproximadamente unos 20 grados al este del norte verdadero. Y esto es crucial: ChichÃ©n ItzÃ¡ se encuentra en la latitud de 20 grados norte. Esta coincidencia matemÃ¡tica entre la latitud de la ciudad y el Ã¡ngulo de construcciÃ³n del edificio es el motor principal del fenÃ³meno de luz y sombra.',
      'AdemÃ¡s de la orientaciÃ³n, la forma de las terrazas es clave. Si miras las 9 plataformas desde arriba, notarÃ¡s que no tienen paredes rectas. Las esquinas estÃ¡n diseÃ±adas con formas redondeadas y Ã¡ngulos precisos. Cuando la luz rasante del atardecer choca contra estos bordes especÃ­ficos, proyecta esos 7 triÃ¡ngulos que forman el cuerpo de la serpiente.',
      'Piensa en ello como un rompecabezas tridimensional resuelto con sombras. El Ã¡ngulo del sol debe ser exacto (equinoccio), la inclinaciÃ³n de las paredes de las terrazas debe ser exacta, y la pendiente de la alfarda de la escalera tambiÃ©n debe estar en perfecta sincronÃ­a para "atrapar" esas sombras. Todo tuvo que calcularse antes de poner la primera piedra.',
      'Los constructores no usaron computadoras ni programas de diseÃ±o 3D. Observaron pacientemente los ciclos solares durante dÃ©cadas o siglos desde observatorios como El Caracol (tambiÃ©n en ChichÃ©n ItzÃ¡). Entendieron cÃ³mo se movÃ­an los astros y aplicaron ese conocimiento para diseÃ±ar su arquitectura sagrada.',
    ],
    expandables: [
      { label: 'Luz y Sombra', icon: 'clock', text: 'El uso de la luz y la sombra en la arquitectura antigua se llama "hierofanÃ­a", una revelaciÃ³n de lo sagrado a travÃ©s de fenÃ³menos fÃ­sicos. Para los mayas, el sol no solo iluminaba, sino que hablaba y animaba a los dioses de piedra cuando se daban las alineaciones correctas.' },
      { label: 'MatemÃ¡tica Maya', icon: 'atom', text: 'Los mayas usaban un sistema matemÃ¡tico vigesimal (base 20) e inventaron el concepto del cero de forma independiente mucho antes que las culturas europeas. Su sÃ­mbolo para el cero era una concha, lo que les permitÃ­a hacer cÃ¡lculos astronÃ³micos y calendÃ¡ricos de enorme complejidad.' },
    ],
    fact: 'Debido a la precesiÃ³n de los equinoccios (un bamboleo lento de la Tierra en su eje), la posiciÃ³n de las estrellas cambia con los milenios. Sin embargo, el fenÃ³meno de la serpiente de luz se basa en el ciclo anual del sol, por lo que sigue funcionando hoy casi igual de bien que hace mil aÃ±os cuando fue inaugurada la pirÃ¡mide.',
  },
  {
    id: 'calendario-piedra',
    title: 'Calendario en Piedra',
    color: '#29B6F6',
    btnImage: '/assets/maya/infographic_m2/btn_calendario-piedra.jpg',
    image: '/assets/maya/infographic_m2/hero_calendario-piedra.jpg',
    content: [
      'Ya vimos que los 365 escalones de El Castillo simbolizan el aÃ±o Haab, nuestro aÃ±o solar. Pero la pirÃ¡mide codifica mucha mÃ¡s informaciÃ³n temporal. Es literalmente una computadora de piedra que calcula los ciclos cÃ³smicos de los mayas. Imagina tener todo el sistema de cronometraje de una civilizaciÃ³n tallado en la forma de tu edificio principal.',
      'Por ejemplo, las terrazas de la pirÃ¡mide. Cada una de las 4 caras de la pirÃ¡mide estÃ¡ dividida por la escalera central. Si observas los lados de las 9 terrazas, la escalera corta esas terrazas creando 18 secciones por cada cara de la pirÃ¡mide. Estos 18 sectores representan los 18 meses (uinales) de 20 dÃ­as que forman el calendario solar Haab.',
      'Pero hay otro calendario maya fundamental: el TzolkÃ­n, o calendario sagrado, de 260 dÃ­as (usado para rituales y para nombrar a las personas). Y luego estÃ¡ la Rueda CalendÃ¡rica, que es el gran engranaje donde el Haab y el TzolkÃ­n encajan. Un ciclo completo de la Rueda CalendÃ¡rica dura 52 aÃ±os solares. Esto era como su "siglo".',
      'Y aquÃ­ viene otro secreto de El Castillo: las fachadas de cada lado de la pirÃ¡mide tienen grandes paneles decorativos tallados en la piedra. Si cuentas cuidadosamente estos paneles incrustados en la arquitectura, encontrarÃ¡s que hay exactamente 52 tableros en cada lado del templo. Es decir, los 52 aÃ±os que toma completar un ciclo mayor de la Rueda CalendÃ¡rica.',
      'Toda la estructura es una inmensa ecuaciÃ³n. NÃºmeros astronÃ³micos y ciclos de tiempo estÃ¡n horneados en el diseÃ±o de las terrazas, paneles y escalones. Los mayas no solo construÃ­an para que se viera bien; diseÃ±aban sus templos para que fueran monumentos perpetuos al tiempo mismo, funcionando en perfecta sincronÃ­a cÃ³smica.',
    ],
    expandables: [
      { label: 'El Fuego Nuevo', icon: 'atom', text: 'El ciclo de 52 aÃ±os era el mÃ¡s importante para los mesoamericanos. Al final de un ciclo, creÃ­an que el mundo podrÃ­a acabar. Si el sol volvÃ­a a salir y las PlÃ©yades cruzaban el cenit, celebraban la "Ceremonia del Fuego Nuevo", encendiendo hogueras para asegurar otros 52 aÃ±os de vida y sol.' },
      { label: 'Dos Engranajes', icon: 'clock', text: 'Imagina el calendario Haab y el TzolkÃ­n como dos grandes engranajes, uno con 365 dientes y otro con 260 dientes. Si haces girar ambos al mismo tiempo partiendo del mismo punto, tardarÃ¡n exactamente 52 aÃ±os solares (o 73 ciclos sagrados) en volver a alinearse en la misma posiciÃ³n inicial.' },
    ],
    fact: 'AdemÃ¡s del Haab y el TzolkÃ­n, los mayas usaban la "Cuenta Larga" para registrar fechas desde un punto de inicio mÃ­tico en el 3114 a.C. Esto les permitÃ­a fechar monumentos y estelas con una precisiÃ³n que abarcaba miles de aÃ±os, calculando eventos pasados y futuros con una notaciÃ³n numÃ©rica elegante de puntos y barras.',
  },
  {
    id: 'acustica-quetzal',
    title: 'AcÃºstica del Quetzal',
    color: '#00C853',
    btnImage: '/assets/maya/infographic_m2/btn_acustica-quetzal.jpg',
    image: '/assets/maya/infographic_m2/hero_acustica-quetzal.jpg',
    content: [
      'Si alguna vez visitas El Castillo, probablemente verÃ¡s a guÃ­as turÃ­sticos aplaudiendo frente a las grandes escalinatas. Esto no es solo para llamar la atenciÃ³n, es para demostrar uno de los efectos acÃºsticos mÃ¡s extraordinarios del mundo antiguo. Al aplaudir frente a la pirÃ¡mide, el edificio no te devuelve un simple eco de aplauso.',
      'El sonido que rebota desde los altos escalones de piedra se distorsiona de una forma muy peculiar. EscucharÃ¡s un sonido agudo, metÃ¡lico y reverberante que hace: "Â¡CHIRRP!". Este eco inusual suena idÃ©nticamente al canto del quetzal resplandeciente, el ave mÃ¡s sagrada del mundo maya y el sÃ­mbolo alado del dios KukulcÃ¡n.',
      'Â¿CÃ³mo es posible? Cuando las ondas de sonido del aplauso viajan hacia la pirÃ¡mide, rebotan en los 91 escalones de piedra. Cada escalÃ³n estÃ¡ un poquito mÃ¡s lejos que el anterior. Esto significa que el sonido rebotado en los escalones mÃ¡s altos tarda un poco mÃ¡s en regresar a tus oÃ­dos que el sonido que rebota en los escalones bajos.',
      'Ese pequeÃ±o retraso continuo entre los mÃºltiples ecos crea un efecto de "chirrido acÃºstico". En acÃºstica moderna, esto se llama una seÃ±al de frecuencia modulada o "chirp". Los cientÃ­ficos acÃºsticos han grabado el eco de la pirÃ¡mide y el canto real del quetzal y, al analizarlos en un espectrograma, descubrieron que las frecuencias y el patrÃ³n de las ondas son increÃ­blemente similares.',
      'Â¿Fue intencional? Muchos expertos creen que sÃ­. Los mayas no construyeron escalones de tamaÃ±o aleatorio. La altura y profundidad precisas de los peldaÃ±os de la escalinata norte fueron diseÃ±adas no solo para proyectar las sombras de la Serpiente de Luz, sino para hacer que el edificio "cantara" con la voz del ave sagrada. Â¡Arquitectura audiovisual mil aÃ±os antes del cine!',
    ],
    expandables: [
      { label: 'El Ave Sagrada', icon: 'clock', text: 'El quetzal macho tiene largas plumas de cola color esmeralda que pueden medir mÃ¡s de un metro de largo. En la antigÃ¼edad, estas plumas valÃ­an mÃ¡s que el oro y se usaban para hacer los majestuosos penachos de los gobernantes mayas y aztecas. Era el ave de la libertad.' },
      { label: 'El Gran Juego de Pelota', icon: 'clock', text: 'ChichÃ©n ItzÃ¡ tiene otro milagro acÃºstico en su Gran Juego de Pelota. Un susurro en uno de los pequeÃ±os templos en los extremos puede escucharse claramente a mÃ¡s de 135 metros de distancia en el otro extremo, y los ecos allÃ­ rebotan hasta 7 veces debido a los altos muros paralelos.' },
    ],
    fact: 'El ingeniero acÃºstico David Lubman presentÃ³ un estudio pionero sobre este eco en 1998, demostrando cientÃ­ficamente la asombrosa similitud entre el sonido del aplauso rebotado y la firma sÃ³nica de un quetzal. Esto cambiÃ³ la forma en que los arqueÃ³logos estudian la mÃºsica y el sonido en las ruinas mesoamericanas.',
  },
  {
    id: 'construccion-capas',
    title: 'ConstrucciÃ³n en Capas',
    color: '#D50000',
    btnImage: '/assets/maya/infographic_m2/btn_construccion-capas.jpg',
    image: '/assets/maya/infographic_m2/hero_construccion-capas.jpg',
    content: [
      'Al mirar El Castillo, estÃ¡s viendo solo la capa mÃ¡s nueva de la cebolla arquitectÃ³nica. Como muchas estructuras importantes en MesoamÃ©rica, esta pirÃ¡mide fue construida sobre y alrededor de edificios mÃ¡s antiguos, sellÃ¡ndolos por completo en su interior en lugar de demolerlos. Los mayas literalmente "enterraban" sus viejos templos.',
      'En la dÃ©cada de 1930, un equipo de arqueÃ³logos mexicanos realizÃ³ un trabajo detectivesco. Decidieron hacer tÃºneles cuidadosos en la base de El Castillo para ver quÃ© habÃ­a dentro. Lo que encontraron fue espectacular: descubrieron una pirÃ¡mide interior casi intacta (ahora conocida como la Subestructura), con sus propios escalones y su propio templo en la cima.',
      'Este templo interior, apodado "KukulcÃ¡n I", tambiÃ©n tenÃ­a maravillas. En su sala principal, iluminada solo por linternas, los arqueÃ³logos encontraron dos esculturas asombrosas que los mayas habÃ­an dejado allÃ­ hace siglos. Una era un Chac Mool (una figura de piedra reclinada que sostenÃ­a un recipiente para ofrendas) y la otra era el famoso Trono del Jaguar Rojo.',
      'El Trono del Jaguar es una escultura de piedra con la forma de un jaguar rugiendo, pintada de un rojo brillante. Lo mÃ¡s increÃ­ble es que sus manchas son incrustaciones de discos de jade real, de un color verde vibrante. Sus ojos y dientes tambiÃ©n tienen decoraciones preciosas. Estaba escondido en el corazÃ³n oscuro de la pirÃ¡mide.',
      'Esta prÃ¡ctica de construir en capas permitÃ­a a cada nuevo gobernante de ChichÃ©n ItzÃ¡ demostrar su poder haciendo el templo principal aÃºn mÃ¡s grande, mientras conservaba la santidad de los templos anteriores en el nÃºcleo del edificio. Es una historia geolÃ³gica artificial construida durante siglos por manos humanas.',
    ],
    expandables: [
      { label: 'Una Tercera PirÃ¡mide', icon: 'atom', text: 'Â¡La historia no termina ahÃ­! En 2015, utilizando tomografÃ­a elÃ©ctrica de resistividad 3D, ingenieros descubrieron que dentro de KukulcÃ¡n I hay AÃšN OTRA pirÃ¡mide mÃ¡s pequeÃ±a enterrada (KukulcÃ¡n 0). Es una muÃ±eca rusa de tres capas que abarca la evoluciÃ³n completa de ChichÃ©n ItzÃ¡.' },
      { label: 'El Cenote Oculto', icon: 'atom', text: 'Ese mismo escaneo 3D revelÃ³ otro secreto profundo: toda la pirÃ¡mide de El Castillo estÃ¡ construida directamente sobre un gran cenote oculto, un rÃ­o o cueva subterrÃ¡nea llena de agua. Para los mayas, los cenotes eran las puertas principales al inframundo, haciendo del lugar el punto mÃ¡s sagrado posible.' },
    ],
    fact: 'El color original de la pirÃ¡mide exterior no era del tono gris piedra que vemos hoy en dÃ­a. Â¡Estaba completamente cubierta de estuco y pintada de rojo intenso, con detalles en azul brillante y verde! En los dÃ­as soleados del apogeo maya, este edificio enorme brillaba deslumbrante a kilÃ³metros de distancia.',
  },
  {
    id: 'patrimonio-mundial',
    title: 'Patrimonio Mundial',
    color: '#D7CCC8',
    btnImage: '/assets/maya/infographic_m2/btn_patrimonio-mundial.jpg',
    image: '/assets/maya/infographic_m2/hero_patrimonio-mundial.jpg',
    content: [
      'ChichÃ©n ItzÃ¡ es hoy uno de los sitios arqueolÃ³gicos mÃ¡s famosos del mundo, y El Castillo es su joya mÃ¡s preciada. En 1988, la UNESCO reconociÃ³ la inmensa importancia cultural y arquitectÃ³nica de la antigua ciudad y la declarÃ³ oficialmente Patrimonio de la Humanidad. Esto significa que pertenece a la herencia de todo el planeta.',
      'Su fama global se disparÃ³ de nuevo en 2007, cuando decenas de millones de personas votaron alrededor del mundo para seleccionar las "Nuevas Siete Maravillas del Mundo Moderno". ChichÃ©n ItzÃ¡ y su pirÃ¡mide principal ganaron un lugar en esta prestigiosa lista, junto con maravillas como el Coliseo de Roma y la Gran Muralla China.',
      'Pero ser una maravilla mundial conlleva enormes desafÃ­os. Cada aÃ±o, casi 3 millones de turistas visitan ChichÃ©n ItzÃ¡, especialmente durante el fenÃ³meno de la Serpiente de Luz en el equinoccio. Este enorme volumen de personas causa un gran desgaste en el sitio. La piedra caliza de los escalones, que ya tiene mil aÃ±os, se gasta rÃ¡pidamente con los pasos.',
      'Por esta razÃ³n, desde 2006, las autoridades prohibieron escalar la gran pirÃ¡mide de El Castillo. Antes era comÃºn que la gente subiera por la estrecha y empinada escalinata, lo que tambiÃ©n causaba accidentes peligrosos. Ahora, la estructura se puede admirar y fotografiar desde su base, garantizando su preservaciÃ³n para las futuras generaciones.',
      'Los esfuerzos de conservaciÃ³n son constantes. Los arqueÃ³logos trabajan arduamente para limpiar el moho, reparar el estuco, y estudiar la estructura sin daÃ±arla usando tecnologÃ­as modernas con lÃ¡sers y escÃ¡neres de radar. Proteger El Castillo es asegurar que el conocimiento astronÃ³mico y la ingenierÃ­a brillante de los mayas nunca sean olvidados.',
    ],
    expandables: [
      { label: 'Redescubrimiento', icon: 'clock', text: 'DespuÃ©s de la caÃ­da del Imperio Maya, ChichÃ©n ItzÃ¡ fue abandonada lentamente y la selva devorÃ³ los edificios. No fue hasta el siglo XIX, con exploradores como John Lloyd Stephens y Frederick Catherwood (quien hizo increÃ­bles dibujos de las ruinas en 1843), que el mundo moderno se fascinÃ³ con el sitio.' },
      { label: 'Un Cielo para el MaÃ±ana', icon: 'clock', text: 'AdemÃ¡s de conservar las ruinas de piedra, existe un movimiento para conservar el "Cielo Oscuro" alrededor de sitios astronÃ³micos antiguos como este, reduciendo la contaminaciÃ³n lumÃ­nica urbana para que podamos seguir viendo las estrellas tal como los antiguos astrÃ³nomos mayas las veÃ­an.' },
    ],
    fact: 'En la dÃ©cada de 1920, la InstituciÃ³n Carnegie financiÃ³ gran parte de las excavaciones y restauraciones iniciales de ChichÃ©n ItzÃ¡, trabajando con el gobierno mexicano. Un arqueÃ³logo y diplomÃ¡tico pionero, Sylvanus Morley, dirigiÃ³ estos enormes esfuerzos de excavaciÃ³n, desenterrando literalmente una de las grandes ciudades perdidas de la selva.',
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
      hue: Math.random() > 0.5 ? '255,109,0' : '0,200,83', // orange or jade
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
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,109,0,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6D00','#8D6E63','#FFD600','#29B6F6','#00C853','#D50000','#D7CCC8'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central icon */}
        <path d="M 285 30 L 315 30 L 300 10 Z" fill="none" stroke="#FF6D00" strokeWidth="1.5" opacity="0.6" />
        <path d="M 290 35 L 310 35 L 300 15 Z" fill="none" stroke="#FF6D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,109,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,109,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,109,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD600" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">KUKULCÃN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,109,0,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="3">LA SERPIENTE DE LUZ</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,109,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
          layoutId="activeDotMayaM2"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} /> ExploraciÃ³n Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact Footer â”€â”€â”€ */}
        {node.fact && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}30`,
            borderRadius: '16px',
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '45px', height: '45px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, border: `1px solid ${node.color}40`,
            }}>
              <Star size={22} color={node.color} />
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '1rem' }}>Hecho Asombroso</h5>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const percent = Math.round((exploredIds.size / nodes.length) * 100);
  return (
    <div style={{
      width: '100%', maxWidth: '800px', margin: '0 auto 2rem',
      background: 'rgba(10,12,30,0.6)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px',
      padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
      position: 'relative', zIndex: 2,
    }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFD600', width: '45px' }}>{percent}%</span>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#FFD600', borderRadius: '3px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {nodes.map((n, i) => (
          <button
            key={i}
            onClick={() => onSelect(n.id)}
            style={{
              width: '12px', height: '12px', borderRadius: '50%',
              border: 'none', cursor: 'pointer',
              background: exploredIds.has(n.id) ? n.color : 'rgba(255,255,255,0.2)',
              boxShadow: exploredIds.has(n.id) ? `0 0 5px ${n.color}` : 'none',
              transition: 'all 0.3s',
            }}
            title={n.title}
          />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    setExploredIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#050714',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <TimeTravelHeader />
        
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2,
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

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Bibliography Section */}
        {!activeNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h4 style={{ color: '#FFD600', margin: '0 0 1rem', fontSize: '1rem', letterSpacing: '1px' }}>FUENTES Y BIBLIOGRAFÃA</h4>
            <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((bib, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{bib}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
