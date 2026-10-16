'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SVG DECORATIVE ELEMENTS â€” ANTI-GRAVITY
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DecoMagneticField = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 60" width={60 * s} height={60 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
    <ellipse cx="30" cy="30" rx="26" ry="12" fill="none" stroke="#E040FB" strokeWidth="1.5" opacity=".4" />
    <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke="#00CCFF" strokeWidth="1" opacity=".3" />
    <circle cx="30" cy="30" r="3" fill="#E040FB" opacity=".6" />
    <circle cx="30" cy="18" r="1.5" fill="#00CCFF" opacity=".5" />
    <circle cx="30" cy="42" r="1.5" fill="#00CCFF" opacity=".5" />
  </motion.svg>
);

const DecoHoverboard = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 80 30" width={80 * s} height={30 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
    <rect x="10" y="5" width="60" height="10" rx="5" fill="#E040FB" opacity=".35" />
    <ellipse cx="40" cy="22" rx="30" ry="4" fill="#E040FB" opacity=".15" />
    <line x1="20" y1="15" x2="20" y2="22" stroke="#E040FB" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="60" y1="15" x2="60" y2="22" stroke="#E040FB" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
  </motion.svg>
);

const DecoSuperconductor = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 50 50" width={50 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity }}>
    <rect x="10" y="20" width="30" height="6" rx="3" fill="#00E676" opacity=".6" />
    <line x1="15" y1="26" x2="15" y2="35" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="25" y1="26" x2="25" y2="38" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="35" y1="26" x2="35" y2="35" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="10" y1="40" x2="40" y2="40" stroke="#00CCFF" strokeWidth="2" opacity=".4" />
  </motion.svg>
);

const DecoLevitatingDisc = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 40 40" width={40 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
    <ellipse cx="20" cy="15" rx="14" ry="5" fill="#7C4DFF" opacity=".4" />
    <ellipse cx="20" cy="15" rx="10" ry="3" fill="#7C4DFF" opacity=".2" />
    <ellipse cx="20" cy="30" rx="12" ry="3" fill="#7C4DFF" opacity=".1" />
  </motion.svg>
);

const DecoEddyCurrent = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 40" width={60 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3.5, repeat: Infinity }}>
    {[0, 1, 2].map(i => (
      <ellipse key={i} cx="30" cy="20" rx={12 + i * 8} ry={5 + i * 3}
        fill="none" stroke="#FF6B00" strokeWidth="1" opacity={0.3 - i * 0.08} />
    ))}
    <circle cx="30" cy="20" r="3" fill="#FF6B00" opacity=".5" />
  </motion.svg>
);

const DecoGraviton = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 40 40" width={40 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360, scale: [1, 1.15, 1] }}
    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
    <circle cx="20" cy="20" r="3" fill="#FF5252" opacity=".6" />
    {[0, 60, 120, 180, 240, 300].map(a => (
      <circle key={a}
        cx={20 + 12 * Math.cos(a * Math.PI / 180)}
        cy={20 + 12 * Math.sin(a * Math.PI / 180)}
        r="1.5" fill="#FF5252" opacity=".35" />
    ))}
    <circle cx="20" cy="20" r="15" fill="none" stroke="#FF5252" strokeWidth=".8" opacity=".2" />
  </motion.svg>
);

const DecoFluxLines = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 70 50" width={70 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 4, repeat: Infinity }}>
    {[0, 1, 2, 3].map(i => (
      <path key={i} d={`M${10 + i * 15} 40 Q${17 + i * 15} 15 ${25 + i * 15} 40`}
        fill="none" stroke="#00CCFF" strokeWidth="1.2" opacity={0.35 - i * 0.05} />
    ))}
  </motion.svg>
);

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DECO_MAP per node
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DECO_MAP = {
  pelicula: [
    <DecoHoverboard key="d0" x="5%" y="12%" s={1.3} />,
    <DecoMagneticField key="d1" x="82%" y="18%" s={0.9} />,
    <DecoFluxLines key="d2" x="8%" y="70%" s={1} />,
  ],
  maglev: [
    <DecoFluxLines key="d0" x="4%" y="10%" s={1.2} />,
    <DecoMagneticField key="d1" x="85%" y="65%" s={1} />,
    <DecoSuperconductor key="d2" x="80%" y="12%" s={0.9} />,
  ],
  lexus: [
    <DecoSuperconductor key="d0" x="6%" y="15%" s={1.1} />,
    <DecoLevitatingDisc key="d1" x="82%" y="10%" s={1} />,
    <DecoFluxLines key="d2" x="78%" y="68%" s={0.9} />,
  ],
  hendo: [
    <DecoEddyCurrent key="d0" x="5%" y="10%" s={1.2} />,
    <DecoHoverboard key="d1" x="80%" y="15%" s={1} />,
    <DecoMagneticField key="d2" x="8%" y="65%" s={0.8} />,
  ],
  newton: [
    <DecoGraviton key="d0" x="85%" y="12%" s={1.1} />,
    <DecoFluxLines key="d1" x="5%" y="60%" s={1} />,
    <DecoLevitatingDisc key="d2" x="80%" y="62%" s={0.9} />,
  ],
  quantum: [
    <DecoSuperconductor key="d0" x="6%" y="12%" s={1.3} />,
    <DecoMagneticField key="d1" x="82%" y="10%" s={1} />,
    <DecoLevitatingDisc key="d2" x="85%" y="65%" s={1} />,
  ],
  electro: [
    <DecoEddyCurrent key="d0" x="4%" y="15%" s={1.1} />,
    <DecoFluxLines key="d1" x="80%" y="12%" s={1} />,
    <DecoHoverboard key="d2" x="6%" y="68%" s={1} />,
  ],
  'futuro-antgrav': [
    <DecoGraviton key="d0" x="6%" y="10%" s={1.2} />,
    <DecoHoverboard key="d1" x="78%" y="8%" s={1.1} />,
    <DecoSuperconductor key="d2" x="82%" y="62%" s={1} />,
  ],
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INFOGRAPHIC_NODES â€” 8 nodes
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BIBLIOGRAPHY = [
  'Bachelet, E. (1912). Levitating Transmitting Apparatus, US Patent 1,020,942',
  'Earnshaw, S. (1842). On the nature of the molecular forces, Trans. Cambridge Phil. Soc. 7',
  'Braunbeck, W. (1939). Freischwebende Korper im elektrischen und magnetischen Feld, Zeitschrift fur Physik, 112',
  'Simon, M.D. Et al. (1997). Spin stabilized magnetic levitation, American Journal of Physics, 65',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "pelicula",
    "title": "El Aeropatín en la Película",
    "color": "#E040FB",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_pelicula.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_pelicula.webp",
    "content": [
      "En una de las escenas más memorables de la historia del cine de aventuras, Marty McFly escapa de la pandilla de Griff Tannen flotando grácilmente sobre una tabla rosa brillante de la marca Mattel a unos centímetros del suelo. El hoverboard de Regreso al Futuro Parte II cautivó al instante la imaginación infantil de millones de espectadores en todo el mundo. Sin embargo, para la física de la levitación y la propulsión mecánica, hacer flotar un monopatín humano sin contacto con el suelo representa un formidable desafío tecnológico.",
      "El director Robert Zemeckis contribuyó involuntariamente a una leyenda urbana colosal durante las entrevistas promocionales de 1989, cuando declaró con humor irónico que los hoverboards existían de verdad gracias a fuerzas magnéticas secretas, pero que las asociaciones de padres de familia impedían su comercialización masiva por considerarlos demasiado peligrosos. Miles de niños y familias llamaron a los almacenes de juguetes exigiendo comprar la codiciada tabla voladora, creyendo ciegamente en la broma del realizador.",
      "Para lograr el asombroso efecto visual en pantalla en una era previa a los efectos digitales por ordenador masivos, el equipo de efectos prácticos recurrió a cables invisibles de piano ultrafinos y arneses metálicos suspendidos de grúas industriales móviles. Los zapatos de Michael J. Fox estaban atornillados físicamente a la parte superior de la tabla plástica para que ambos cuerpos se movieran como una sola unidad en el aire mientras las cámaras rodaban a gran velocidad por los decorados de Universal Studios.",
      "La trama introduce además un límite físico intrigante y recordado por todos: «¡Oye, chico! Esas tablas no funcionan sobre el agua a menos que tengas potencia motriz». En el guion, el monopatín pierde sustentación y queda varado en medio del estanque de la plaza municipal cuando Marty intenta cruzarlo. Aunque en la ficción la causa es un límite de diseño ficticio, en el electromagnetismo real el agua dulce es un medio dieléctrico con baja conductividad que no permite generar corrientes inducidas de repulsión.",
      "A pesar de ser un mero artificio dramático concebido para una persecución cómica de comedia cinematográfica, el hoverboard rosa se convirtió en el santo grial de la cultura popular de finales del siglo XX. Su impacto fue tan profundo que impulsó a corporaciones automovilísticas, universidades de ingeniería y laboratorios de física aplicada a invertir millones de dólares en la creación de prototipos reales capaces de emular esa fascinante sensación de deslizarse por el aire sin fricción."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_pelicula.webp",
    "bannerCaption": "El icónico aeropatín de BTTF2 flotando sobre las calles de Hill Valley 2015",
    "fact": "La tabla aeropatín original utilizada por Michael J. Fox durante el rodaje de 1989, fabricada en madera ligera y espuma de resina con gráficos serigrafiados de Mattel, fue subastada en Londres en noviembre de 2021 alcanzando un precio de venta récord de 375.000 libras esterlinas (más de 500.000 dólares estadounidenses).",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre tabla rosa con manillar desmontable fue diseñada por el director de arte John Bell. Para rodar los primeros planos de los pies de Marty sobre el monopatín flotante, el equipo construyó tablas especiales con imanes industriales ocultos bajo las suelas de las zapatillas Nike Mag del actor, permitiéndole subir y bajar con fluidez en los planos medios sin tambalearse."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El teorema de Earnshaw, formulado por el matemático británico Samuel Earnshaw en 1842, demuestra matemáticamente que es físicamente imposible lograr una levitación magnética estática y estable utilizando exclusivamente imanes permanentes y cargas electrostáticas fijas, obligando a emplear materiales superconductores o campos dinámicos de retroalimentación."
      }
    ]
  },
  {
    "id": "maglev",
    "title": "Trenes Maglev: Levitación Real",
    "color": "#00CCFF",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_maglev.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_maglev.webp",
    "content": [
      "Mientras que el aeropatín cinematográfico flota mágicamente sobre cualquier superficie de asfalto o césped sin emitir ruido alguno, la ingeniería moderna ha conquistado la levitación a gran escala a través de los trenes de levitación magnética o Maglev. En lugar de desafiar la gravedad con tecnologías desconocidas, estos titanes del transporte terrestre emplean las fuerzas de atracción y repulsión electromagnética descritas por James Clerk Maxwell para suspender convoyes de cientos de toneladas sobre rieles de acero.",
      "Existen dos tecnologías electromagnéticas principales en la ingeniería del Maglev mundial. La primera es la suspensión electromagnética (EMS), utilizada en el sistema alemán Transrapid y desplegada comercialmente en la línea del aeropuerto de Shanghái. En este sistema, electroimanes convencionales instalados en la parte inferior del tren se curvan alrededor de la viga de acero guía y son atraídos magnéticamente hacia arriba, manteniendo una separación de solo 15 milímetros mediante sensores electrónicos de alta velocidad.",
      "La segunda variante es la suspensión electrodinámica (EDS), desarrollada por los ferrocarriles de Japón para su tren bala de levitación Chuo Shinkansen. Este coloso utiliza potentes bobinas superconductoras refrigeradas a temperaturas criogénicas montadas a bordo del tren. Cuando el tren se desplaza a gran velocidad sobre la vía de hormigón, el movimiento de sus potentes campos magnéticos induce corrientes eléctricas en las bobinas de las paredes laterales que generan un campo magnético opuesto que lo levanta.",
      "Al flotar en el aire sin tocar físicamente los rieles, los trenes Maglev eliminan por completo la fricción mecánica de rodadura de las ruedas de acero tradicionales, permitiéndoles alcanzar velocidades de crucero extraordinarias con un desgaste mecánico mínimo. La única fuerza resistente que deben vencer los motores lineales a altas velocidades es la resistencia aerodinámica del aire circundante, lo que exige perfiles hiperaerodinámicos en la carrocería inspirados en el pico del martín pescador.",
      "La gran limitación de los trenes Maglev frente al monopatín de ficción radica en su estricta dependencia de infraestructuras ferroviarias ultracomplejas y costosas. Un tren Maglev no puede levitar sobre una carretera común ni desviarse un solo milímetro fuera de su carril magnético dedicado, demostrando que en el mundo real la levitación magnética es un prodigio de la ingeniería civil guiada y no un atributo autónomo de un vehículo individual."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_maglev.webp",
    "bannerCaption": "Trenes Maglev reales: levitación magnética a más de 600 km/h",
    "fact": "El tren japonés experimental de levitación superconductora L0 Series Maglev, desarrollado por la compañía Central Japan Railway, estableció el 21 de abril de 2015 el récord mundial de velocidad para vehículos ferroviarios tripulados al registrar exactamente 603 kilómetros por hora en una pista de pruebas de Yamanashi.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Al final de Regreso al Futuro Parte III, el Doc Brown regresa triunfante a 1985 conduciendo una majestuosa locomotora de vapor del siglo XIX reconvertida en máquina del tiempo voladora mediante aeroconversión futurista del año 2015, fusionando la estética del tren clásico de carbón con la levitación electromagnética avanzada de la ciencia ficción."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La ley de inducción electromagnética de Faraday y la ley de Lenz explican el funcionamiento del Maglev electrodinámico: cuando un campo magnético se desplaza sobre un conductor metálico cerrado, induce una corriente eléctrica cuya dirección genera un campo magnético propio que se opone diametralmente al movimiento del imán emisor, generando sustentación vertical."
      }
    ]
  },
  {
    "id": "lexus",
    "title": "El Hoverboard de Lexus (2015)",
    "color": "#7C4DFF",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_lexus.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_lexus.webp",
    "content": [
      "El año 2015, la fecha exacta a la que Marty McFly viaja en el futuro de la ficción, desató una auténtica fiebre tecnológica entre las grandes corporaciones para convertir el mítico aeropatín en un producto funcional de la vida real. La marca automovilística japonesa Lexus aceptó el titánico reto de ingeniería y reclutó a un equipo internacional de científicos pioneros en superconductividad para desarrollar el proyecto SLIDE: el primer hoverboard auténtico capaz de sostener el peso de un ser humano en el aire.",
      "A diferencia del aeropatín de plástico de Mattel que funcionaba en la película por pura magia cinematográfica, el hoverboard de Lexus era una obra maestra de la termodinámica criogénica y la ciencia de materiales. El dispositivo albergaba dos criostatos herméticos fabricados en fibra de carbono y bambú natural, en cuyo interior se encontraban pastillas de material superconductor cerámico de óxido de itrio, bario y cobre (YBCO) sumergidas en nitrógeno líquido a 197 grados Celsius bajo cero.",
      "Para lograr que la tabla flotara en el aire, el equipo de ingenieros tuvo que construir en secreto un parque de monopatín especial en la localidad de Cubelles, cerca de Barcelona. La pista parecía de asfalto y madera ordinaria ante las cámaras de filmación, pero debajo de su superficie escondía cientos de metros de rieles magnéticos de neodimio de alta potencia dispuestos en una configuración geométrica continua que creaba un colchón magnético invisible.",
      "Cuando el skater profesional Ross McGouran se subió a la tabla por primera vez, experimentó las extrañas leyes de la levitación sin fricción. Deslizarse en un hoverboard real requería reaprender a patinar por completo: al carecer del agarre mecánico de las ruedas de goma sobre el suelo, cualquier pequeño balanceo del cuerpo humano amenazaba con expulsar al patinador, obligando a los deportistas a equilibrar su centro de masa con precisión acrobática.",
      "El proyecto SLIDE demostró fehacientemente que la levitación humana es posible con las leyes físicas contemporáneas, pero también expuso con crudeza sus insalvables limitaciones operativas. La tabla expulsaba columnas continuas de vapor de nitrógeno frío al exterior y requería rellenar sus depósitos criogénicos cada diez minutos de uso activo, sumado a la imposibilidad insalvable de flotar fuera de la pista magnética oculta construida a un coste millonario."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_lexus.webp",
    "bannerCaption": "El Lexus Slide: un hoverboard real que usa superconductores y nitrógeno líquido",
    "fact": "La pista construida para el hoverboard de Lexus en Barcelona requirió la instalación de más de 200 metros lineales de rieles de imanes permanentes de neodimio de alta potencia enterrados bajo láminas de madera y resina, requiriendo más de 400 días de trabajo conjunto entre científicos de Dresden, Alemania, e ingenieros automotrices.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante la preproducción de la segunda película, los productores consideraron originalmente que la tabla de Marty fuera de color negro y metalizado con motivos militares, pero el diseñador John Bell y la productora Kathleen Kennedy insistieron en que el color rosa chillón con toques fluorescentes resultaría mucho más memorable e irónico para la personalidad del héroe."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El material cerámico YBCO (YBa2Cu3O7) es un superconductor de alta temperatura crítica descubierto en 1987. A diferencia de los superconductores metálicos clásicos que requerían helio líquido a 4 kelvin, el YBCO alcanza el estado superconductor a 93 kelvin (-180,15 °C), permitiendo su enfriamiento con nitrógeno líquido comercial accesible."
      }
    ]
  },
  {
    "id": "hendo",
    "title": "El Hendo Hoverboard y Tony Hawk",
    "color": "#FF6B00",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_hendo.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_hendo.webp",
    "content": [
      "Casi al mismo tiempo que Lexus experimentaba con superconductores criogénicos en Europa, una empresa emergente californiana llamada Arx Pax sorprendió al mundo con un enfoque de ingeniería completamente diferente para emular la película de Robert Zemeckis: el Hendo Hoverboard. En lugar de enfriar materiales a temperaturas bajo cero, los inventores Jill y Greg Henderson recurrieron a la fuerza electrodinámica de las corrientes parásitas de Foucault para hacer levitar a personas en tiempo real.",
      "El Hendo Hoverboard utilizaba cuatro potentes motores eléctricos discoidales giratorios denominados «motores de arquitectura de campo magnético primario». Estos motores hacían rotar imanes permanentes a miles de revoluciones por minuto sobre una superficie metálica conductora, típicamente una plancha maciza de cobre o aluminio. El campo magnético alterno variable inducía intensas corrientes eléctricas circulares en el metal que generaban un campo magnético opuesto que levantaba la tabla.",
      "Para validar mediáticamente su invento ante la comunidad internacional, los creadores invitaron al legendario skater Tony Hawk a subirse y probar el prototipo. El vídeo de Hawk flotando a tres centímetros de altura sobre una rampa de cobre pulido dio la vuelta al planeta en pocas horas. El propio Hawk declaró con asombro que la experiencia era completamente real, aunque la ausencia total de rozamiento lateral volvía el control direccional de la tabla sumamente resbaladizo e inestable.",
      "A diferencia del silencio casi místico del aeropatín de Marty McFly en la película, el dispositivo de Hendo era una máquina ruidosa que emitía un silbido penetrante y agudo similar al de una turbina de avión en miniatura, provocado por la rotación frenética de sus rotores mecánicos internos y los ventiladores de refrigeración forzada que impedían que las baterías de litio y las bobinas se fundieran por el colosal calor acumulado.",
      "Aunque el prototipo sufría de una autonomía de batería limitada a apenas quince minutos y solo podía funcionar sobre superficies de metales no ferrosos de alta pureza como el cobre, la tecnología patentada de Hendo abrió vías de aplicación fascinantes en otros campos de la ingeniería, como el aislamiento antisísmico de edificios durante terremotos y la manipulación industrial de cargas pesadas en fábricas automatizadas."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_hendo.webp",
    "bannerCaption": "El Hendo Hoverboard: inducción electromagnética sobre superficie de cobre",
    "fact": "La campaña de financiación colectiva del Hendo Hoverboard en la plataforma Kickstarter recaudó más de 510.000 dólares estadounidenses en 2014, ofreciendo réplicas funcionales a escala real por 10.000 dólares la unidad que fueron adquiridas por coleccionistas tecnológicos de Silicon Valley y entusiastas del cine.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para filmar las tomas en las que Marty gira en el aire sobre el estanque de agua frente al tribunal, el especialista de acción Charlie Croughwell tuvo que ser suspendido de un arnés de cables móviles conectado a una grúa móvil de construcción mientras decenas de operarios tiraban coordinadamente de cuerdas para generar la ilusión de inercia y caída."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las corrientes de Foucault o corrientes parásitas fueron descubiertas por el físico francés Léon Foucault en 1851. Ocurren cuando un conductor experimenta un campo magnético variable en el tiempo; los electrones libres dentro del metal forman remolinos circulares que disipan energía térmica y generan campos de repulsión electrodinámica cuantificables."
      }
    ]
  },
  {
    "id": "newton",
    "title": "Las Leyes de Newton y la Gravedad",
    "color": "#FFA500",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_newton.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_newton.webp",
    "content": [
      "En las películas de ciencia ficción, los objetos flotantes parecen burlar las leyes de la naturaleza como si la gravedad terrestre pudiera apagarse con un simple interruptor de estado sólido. Marty McFly empuja con el pie el asfalto y se desliza sin perder velocidad ni caer al suelo. Sin embargo, para la física clásica inaugurada por Isaac Newton en sus inmortales Principia Mathematica de 1687, la gravedad no es una sugerencia optativa: es una fuerza universal implacable que actúa sobre toda masa.",
      "La primera ley de Newton, o ley de la inercia, establece que todo cuerpo permanece en estado de reposo o movimiento rectilíneo uniforme a menos que actúe sobre él una fuerza externa neta. Cuando un skater común patina sobre una acera, la fricción entre las ruedas de poliuretano y el cemento, junto con el rozamiento del aire, frena gradualmente su avance. En un hoverboard ideal sin contacto con el suelo, la fricción sólida se reduce a cero, haciendo que el móvil conserve su velocidad de forma perpetua.",
      "La segunda ley fundamental de Newton (F = m · a) dicta que para acelerar o frenar una masa corporal de setenta kilogramos es imprescindible aplicar una fuerza real en la dirección deseada. En un monopatín convencional, el usuario empuja el suelo hacia atrás con el pie; la tercera ley de Newton (acción y reacción) hace que el suelo empuje al skater hacia adelante con igual magnitud. Flotando en el aire sin tocar una superficie sólida, el patinador carece de un punto de apoyo directo para impulsarse mecánicamente.",
      "Esta paradoja mecánica explica por qué Marty McFly queda indefenso e inmóvil sobre el agua en la película cuando pierde su inercia inicial: no tiene contra qué empujar para acelerar. En un vehículo volador real, la propulsión exigiría expulsar un fluido hacia atrás a gran velocidad mediante hélices o motores a reacción, empujando masa de aire para que la reacción aerodinámica impulse la tabla hacia adelante en cumplimiento estricto de la tercera ley newtoniana.",
      "La ley de la gravitación universal formulada por Newton recuerda además que la atracción entre la Tierra y cualquier cuerpo depende exclusivamente de sus masas y de la distancia radial que los separa al cuadrado. Ninguna pintura plástica rosa ni caja de circuitos electrónicos puede cancelar esa atracción gravitatoria intrínseca; para levitar, un dispositivo debe generar continuamente una fuerza ascendente neta exactamente igual y opuesta al peso del vehículo y su ocupante."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_newton.webp",
    "bannerCaption": "Las leyes de Newton y la gravedad: el obstáculo a superar para levitar",
    "fact": "En 1665, durante la Gran Peste de Londres que obligó a cerrar la Universidad de Cambridge, Isaac Newton se confinó en la granja familiar de Woolsthorpe Manor; en ese periodo de reclusión solitaria concibió el cálculo diferencial, la descomposición de la luz blanca en el prisma y la ley de la gravitación universal tras observar la caída de manzanas en su huerto.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La escena del estanque contiene uno de los chistes visuales más celebrados de la trilogía: mientras Marty flota desesperadamente agitando los brazos sin poder moverse sobre el agua, Griff y su pandilla se acercan rugiendo montados en un gigantesco aeropatín cohete llamado «Pit Bull», equipado con dos reactores de postcombustión que les proporcionan empuje direccional continuo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para sostener en el aire a una persona de 70 kilogramos sobre la superficie terrestre, un sistema de sustentación antigravitatoria o aerodinámica debe suministrar una fuerza ascendente constante de al menos 686 newtons de magnitud (calculada como el producto de la masa por la aceleración gravitacional estándar g = 9,81 m/s²)."
      }
    ]
  },
  {
    "id": "quantum",
    "title": "Levitación Cuántica: Flux Pinning",
    "color": "#00E676",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_quantum.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_quantum.webp",
    "content": [
      "Si los efectos especiales de Hollywood representan la levitación como un truco visual de cables transparentes, la física del estado sólido alberga un fenómeno cuántico tan asombroso que supera con creces a la propia ficción: el anclaje de flujo magnético o «flux pinning». Mediante este prodigio de la mecánica cuántica moderna, un objeto sólido puede no solo flotar en el aire sobre imanes permanentes, sino quedar literalmente congelado e inmovilizado en cualquier posición espacial tridimensional.",
      "Este fenómeno se manifiesta de forma exclusiva en los llamados superconductores de tipo II cuando son enfriados por debajo de su temperatura crítica de transición. A diferencia de los superconductores ideales de tipo I que expulsan por completo todo campo magnético exterior de su interior mediante el efecto Meissner-Ochsenfeld clásico, los superconductores de tipo II permiten que ciertas líneas de flujo magnético penetren a través de su estructura cristalina en canales microscópicos.",
      "Estos canales individuales de penetración magnética se conocen como vórtices de Abrikosov, nombrados en honor al físico ruso Alexei Abrikosov, galardonado con el Premio Nobel. Cada vórtice contiene un filamento minúsculo de campo magnético rodeado por un remolino de supercorrientes cuánticas. Las imperfecciones e impurezas naturales de la red cristalina del material actúan como trampas energéticas que atrapan físicamente estos vórtices en posiciones espaciales fijas.",
      "El resultado macroscópico del anclaje de flujo es una estabilidad mecánica desconcertante que desafía las restricciones del teorema de Earnshaw. Si se coloca una pastilla superconductora con anclaje de flujo sobre una pista magnética, el superconductor levitará a una distancia exacta. Pero si se empuja la pastilla hacia abajo o hacia los lados con los dedos, o incluso si se coloca la pista completamente boca abajo, el superconductor permanece rígidamente suspendido sin caer jamás al vacío.",
      "Esta levitación cuántica pasiva no requiere ningún tipo de sensor informático, giroscopio ni baterías eléctricas para mantener la sustentación vertical: es una manifestación directa de la coherencia cuántica macroscópica de miles de millones de pares de electrones de Cooper operando en perfecta sincronía cuántica a temperaturas criogénicas, mostrando cómo las leyes del microcosmos pueden dominar objetos cotidianos de nuestro mundo visible."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_quantum.webp",
    "bannerCaption": "Quantum flux pinning: superconductores que se anclan en el aire",
    "fact": "El físico ruso Alexei Abrikosov predijo la existencia de la red periódica de vórtices magnéticos en superconductores de tipo II en 1957 empleando la teoría cuántica de Ginzburg-Landau, un logro de la física teórica soviética que fue finalmente reconocido con el Premio Nobel de Física en 2003 junto a Vitaly Ginzburg y Anthony Leggett.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La compañía cinematográfica Universal Studios llegó a patentar varios diseños de maquetas y soportes mecánicos para rodar las secuencias de vuelo de la película, incluyendo prototipos a escala de aeropatines con rodamientos de bolas minúsculos integrados en la base de la tabla para planos rodados sobre pistas de plexiglás transparente pulido."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cuanto elemental de flujo magnético cuántico (phi cero), que representa la cantidad exacta e indivisible de campo magnético que puede pasar por un solo vórtice de Abrikosov, equivale exactamente a la constante de Planck h dividida entre el doble de la carga fundamental del electrón (2e), con un valor numérico universal de 2,067833848 x 10 a la menos 15 webers."
      }
    ]
  },
  {
    "id": "electro",
    "title": "Suspensión EM en la Vida Real",
    "color": "#FFD740",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_electro.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_electro.webp",
    "content": [
      "En Regreso al Futuro Parte II, los coches y monopatines del año 2015 parecen flotar sin esfuerzo sobre autopistas llamadas «Skyways» gracias a un sistema de aeroconversión instalado por cuarenta mil dólares en talleres mecánicos callejeros. En la industria tecnológica actual, la levitación electromagnética activa no es un producto de garaje, sino una disciplina de alta precisión que gobierna sistemas críticos donde cualquier fricción mecánica destruiría mecanismos ultrasensibles.",
      "Una de las aplicaciones más consolidadas de la suspensión electromagnética se encuentra en los rodamientos magnéticos activos (AMB). Estos dispositivos suspenden ejes de turbinas de alta velocidad que giran a más de cien mil revoluciones por minuto en el vacío sin que el metal toque jamás las paredes del estator. Para impedir que el eje colapse por inestabilidades magnéticas, una red de sensores de posición inductivos mide la posición del eje miles de veces por segundo y ajusta la corriente eléctrica.",
      "Otro campo revolucionario es la levitación electrostática y óptica empleada en laboratorios de investigación de materiales espaciales. En instalaciones como el Centro de Levitación Electrostática de la NASA en el Centro Marshall de Vuelos Espaciales, gotas de metales refractarios incandescentes a más de dos mil grados Celsius flotan suspendidas en el centro de cámaras de vacío entre electrodos de alta tensión, permitiendo medir propiedades térmicas sin que el crisol contamine la muestra líquida.",
      "Las pinzas ópticas ideadas por el físico Arthur Ashkin, galardonadas con el Premio Nobel de Física en 2018, constituyen otra variante microscópica extraordinaria de suspensión electromagnética. Utilizando la presión de radiación de un haz de luz láser de precisión enfocado a través de un microscopio, los científicos pueden atrapar, levitar y mover virus, bacterias individuales y hebras de ADN vivo en tres dimensiones sin dañarlas físicamente.",
      "Estas tecnologías demuestran que domesticar los campos electromagnéticos para suspender cuerpos en el espacio exige un control de retroalimentación computacional a microescala de una sofisticación extrema. Lejos de la simplicidad de la tabla de Marty McFly, la levitación contemporánea es una danza constante de algoritmos de control digital, sensores de barrido rápido y amplificadores de potencia que compensan cada milisegundo las inestabilidades naturales del cosmos físico."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_electro.webp",
    "bannerCaption": "Suspensión electromagnética real: ingeniería de feedback activo",
    "fact": "El físico neerlandés Andre Geim logró en 1997 hacer levitar en el aire a una rana viva suspendida dentro de un campo magnético colosal de 16 teslas en la Universidad de Nijmegen gracias al diamagnetismo natural de las moléculas de agua del cuerpo del anfibio, hazaña científica que le valió el Premio Ig Nobel en el año 2000.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La secuencia de apertura de Regreso al Futuro Parte II muestra al DeLorean descendiendo desde las nubes en medio de una tormenta eléctrica hacia una autopista aérea con carriles de neón y señales de tráfico digitales flotantes, un diseño conceptual concebido por el ilustrador de ciencia ficción Syd Mead, célebre por su influyente trabajo artístico en Blade Runner."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La presión de radiación electromagnética de la luz se produce por la transferencia directa de momento lineal de los fotones cuando impactan o son absorbidos por una superficie material. En el vacío del espacio, la radiación solar ejerce una fuerza de aproximadamente 9 micronewtons por metro cuadrado sobre reflectores perfectos a la distancia de la órbita de la Tierra."
      }
    ]
  },
  {
    "id": "futuro-antgrav",
    "title": "El Futuro de la Antigravedad",
    "color": "#FF5252",
    "btnImage": "/assets/bttf/infographic_aeropatines/btn_futuro.webp",
    "image": "/assets/bttf/infographic_aeropatines/hero_futuro.webp",
    "content": [
      "A lo largo de toda la saga cinematográfica de Regreso al Futuro, el sueño supremo de la ingeniería automotriz es la conquista definitiva de la gravedad: coches familiares que despegan verticalmente para evitar los atascos de tráfico y tablas juveniles que navegan sobre el aire sin esfuerzo alguno. Mientras que el celuloide trata la antigravedad como un logro técnico mundano de la sociedad de consumo, para la física teórica contemporánea representa uno de los santos griales más esquivos del conocimiento cósmico.",
      "Desde la formulación de la relatividad general de Albert Einstein, sabemos que la gravedad no es una sustancia o un fluido que pueda ser repelido o blindado con una placa metálica aislante como se hace con las ondas de radio. La gravedad es la manifestación directa de la curvatura del espaciotiempo provocada por la densidad de masa y energía. Para crear un campo de «antigravedad» genuino a escala macroscópica sería imprescindible disponer de materia con masa negativa o densidades de energía negativa exótica.",
      "En el laboratorio de la física de partículas en el CERN de Ginebra, los científicos abordan esta incógnita analizando el comportamiento de la antimateria en experimentos de precisión como ALPHA y AEGIS. Durante años se debatió si un átomo de antihidrógeno caería hacia abajo en el campo gravitatorio de la Tierra como la materia ordinaria o si experimentaría una fuerza repulsiva ascendente hacia arriba. Los resultados experimentales concluyentes de 2023 confirmaron que la antimateria cae hacia abajo como la materia normal.",
      "A nivel cosmológico, sin embargo, el universo entero está dominado por una forma real de aceleración repulsiva: la energía oscura. Descubierta en 1998 a través de la observación de supernovas lejanas de tipo Ia, la energía oscura actúa como una presión negativa que estira el tejido del cosmos y acelera la expansión del universo observable, superando a la gravedad atractiva de toda la materia acumulada en las galaxias.",
      "Aunque no podamos embotellar la energía oscura en el chasis de un automóvil ni fabricar un aeropatín para las calles peatonales de nuestra ciudad, el afán científico por descifrar la gravedad cuántica y la física del vacío nos está dotando de tecnologías antes inimaginables. El sueño cinematográfico de Marty McFly sigue vivo como una estrella polar de inspiración que alienta a nuevas generaciones de estudiantes a estudiar física y transformar los mitos en futuros inventos reales."
    ],
    "bannerImage": "/assets/bttf/infographic_m5/banner_futuro-antgrav.webp",
    "bannerCaption": "El futuro de la antigravedad: ciudades flotantes con superconductores de temperatura ambiente",
    "fact": "El 27 de septiembre de 2023, la colaboración internacional ALPHA del CERN publicó en la prestigiosa revista Nature la confirmación experimental de que los átomos de antihidrógeno atrapados magnéticamente caen hacia abajo bajo la aceleración gravitatoria terrestre con un valor de 0,75 +/- 0,29 g, descartando la hipótesis de la antigravedad para la antimateria estándar.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el cartel publicitario del año 2015 visible en la plaza municipal de Hill Valley, un enorme anuncio luminoso ofrece la «Aeroconversión de coches por 39.999 dólares», un guiño de los guionistas que imaginaba que para cambiar las cuatro ruedas de goma por impulsores flotantes solo hacía falta llevar el vehículo a un taller mecánico ordinario de barrio."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La constante cosmológica lambda introducida por Einstein en 1917 en sus ecuaciones de campo de la relatividad general representa la densidad de energía intrínseca del espacio vacío. En la cosmología moderna describe la energía oscura, responsable de más del 68% de toda la densidad de masa-energía del universo actual en el modelo Lambda-CDM estándar."
      }
    ]
  }
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ANTI-GRAVITY FIELD â€” animated canvas
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function AntiGravityField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, w, h;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const N = 80;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.2 + 0.5,
      color: Math.random() > 0.5 ? '#E040FB' : '#00CCFF',
      isDisc: Math.random() < 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.save();
        ctx.globalAlpha = 0.4;
        if (p.isDisc) {
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 3, p.r * 1.2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SVG HEADER â€” hover
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function HoverHeader() {
  return (
    <svg viewBox="0 0 600 90" style={{ width: '100%', maxWidth: 600, display: 'block', margin: '0 auto' }}>
      {/* magnetic field rings */}
      <ellipse cx="300" cy="45" rx="280" ry="28" fill="none" stroke="#E040FB" strokeWidth="0.8" opacity=".2" />
      <ellipse cx="300" cy="45" rx="220" ry="20" fill="none" stroke="#00CCFF" strokeWidth="0.6" opacity=".18" />
      <ellipse cx="300" cy="45" rx="160" ry="14" fill="none" stroke="#7C4DFF" strokeWidth="0.5" opacity=".15" />
      {/* hoverboard silhouette */}
      <rect x="240" y="68" width="120" height="6" rx="3" fill="#E040FB" opacity=".2" />
      <ellipse cx="300" cy="78" rx="50" ry="4" fill="#E040FB" opacity=".1" />
      {/* title */}
      <text x="300" y="40" textAnchor="middle" fill="#E040FB" fontSize="20" fontWeight="800"
        fontFamily="'Orbitron',sans-serif" letterSpacing="2.5">AEROPATINES Y ANTIGRAVEDAD</text>
      <text x="300" y="58" textAnchor="middle" fill="#00CCFF" fontSize="10" fontWeight="600"
        fontFamily="'Exo 2',sans-serif" letterSpacing="4" opacity=".7">LA CIENCIA DE VOLVER AL FUTURO</text>
      {/* decorative dots */}
      <circle cx="70" cy="45" r="2" fill="#E040FB" opacity=".45" />
      <circle cx="530" cy="45" r="2" fill="#00CCFF" opacity=".45" />
      <circle cx="40" cy="45" r="1.2" fill="#7C4DFF" opacity=".3" />
      <circle cx="560" cy="45" r="1.2" fill="#7C4DFF" opacity=".3" />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   EXPANDABLE PARAGRAPH
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const EXPAND_DIRS = ['down', 'down', 'down', 'down'];
function seededDir(i) { return 'down'; }

const dirVariants = {
  down:  { hidden: { height: 0, opacity: 0, y: 8 },  visible: { height: 'auto', opacity: 1, y: 0 } },
};

function ExpandIcon({ open }) {
  return (
    <motion.svg viewBox="0 0 24 24" width={18} height={18} animate={{ rotate: open ? 90 : 0 }}
      style={{ flexShrink: 0, cursor: 'pointer' }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="#00CCFF" strokeWidth="1.5" opacity=".6" />
      <motion.path d="M9 6 L9 12 L12 9" fill="none" stroke="#E040FB" strokeWidth="1.5" strokeLinecap="round"
        animate={{ rotate: open ? 180 : 0 }} style={{ transformOrigin: '12px 12px' }} />
      <circle cx="12" cy="16" r="1" fill="#E040FB" opacity=".7" />
    </motion.svg>
  );
}

function ExpandableParagraph({ text, index, nodeColor }) {
  const [open, setOpen] = useState(false);
  const dir = seededDir(index);
  const firstSentence = text.split(/(?<=\.)\s/)[0];
  const rest = text.slice(firstSentence.length).trim();
  const v = dirVariants[dir];

  return (
    <div style={{ marginBottom: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px',
      borderLeft: `3px solid ${nodeColor}44`, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <ExpandIcon open={open} />
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#ddd' }}>
          {firstSentence}
          {!open && rest && <span style={{ color: '#888' }}> ...</span>}
        </p>
      </div>
      <AnimatePresence>
        {open && rest && (
          <motion.div
            key="exp"
            variants={v}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden', marginTop: 6, paddingLeft: 26 }}
          >
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#ccc' }}>{rest}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NODE BUTTON
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function NodeButton({ node, isActive, isExplored, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative', width: 78, height: 78, borderRadius: 8,
        border: `2px solid ${node.color}`,
        borderTop: `2px solid ${node.color}cc`,
        borderBottom: `3px solid ${node.color}66`,
        background: `linear-gradient(135deg, #1a1a2e 0%, #0f0f23 50%, #1a1a2e 100%)`,
        cursor: 'pointer', padding: 3, outline: 'none',
        boxShadow: isActive
          ? `0 0 20px ${node.color}aa, 0 0 40px ${node.color}44, inset 0 0 15px ${node.color}33, 0 4px 8px rgba(0,0,0,.6)`
          : `0 0 8px ${node.color}44, 0 2px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)`,
        transition: 'box-shadow .3s, border-color .3s',
        overflow: 'hidden',
      }}
    >
      {/* Retro CRT scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 6, zIndex: 2, pointerEvents:'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0.15) 2px, rgba(0,0,0.15) 4px)',
        mixBlendMode: 'overlay',
      }} />
      {/* Chrome corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '6px 0 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 6px 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '0 0 0 6px', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 0 6px 0', zIndex: 3 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.btnImage} alt={node.title}
        style={{ width: '100%', height: '100%', borderRadius: 5, objectFit: 'cover', filter: isActive ? 'saturate(1.3) brightness(1.1)' : 'saturate(0.85) brightness(0.9)' }}  loading="lazy" />
      {isExplored && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{
            position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 4, background:'linear-gradient(135deg, #00E676, #00C853)', border: '2px solid #0a0a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4,
            boxShadow: '0 0 8px #00E67688',
          }}>
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path d="M3 8l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      <div style={{
        position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 8, fontWeight: 800, color: node.color, letterSpacing: 1.5, textTransform:'uppercase',
        textShadow: `0 0 8px ${node.color}88, 0 1px 3px rgba(0,0,0,.9)`,
        fontFamily: "'Exo 2', 'Courier New', monospace",
      }}>
        {node.title.length > 14 ? node.title.slice(0, 13) + '…' : node.title}
      </div>
    </motion.button>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CONTENT PANEL
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ContentPanel({ node, onClose, setLightboxSrc }) {
  if (!node) return null;
  const heroParas = node.content.slice(0, 2);
  const bodyParas = node.content.slice(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto',
        background: 'rgba(8,4,18,0.94)', borderRadius: 16,
        border: `1px solid ${node.color}44`, padding: 0, overflow: 'hidden',
        boxShadow: `0 0 40px ${node.color}22`,
      }}
    >
      {/* close btn */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(255,255,255,0.08)',
        border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <X size={16} color="#fff" />
      </button>

      {/* â”€â”€â”€ HERO: two-column (estándar Abu Simbel) â”€â”€â”€ */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
        minHeight: '280px',
      }}>
        {/* hero image */}
        <div style={{
          position: 'relative', overflow: 'hidden', height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title}
            onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none' }} />
        </div>
        {/* hero text */}
        <div style={{ padding: '28px 28px 20px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{
            margin: '0 0 14px', fontSize: 22, fontWeight: 800, color: node.color,
            fontFamily: "'Orbitron',sans-serif", letterSpacing: 1,
          }}>{node.title}</h2>
          {heroParas.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: '#ccc', margin: '0 0 10px' }}>{p}</p>
          ))}
        </div>
      </div>

      {/* â”€â”€â”€ MAGAZINE BODY â€” M9-standard 2-column grid â”€â”€â”€ */}
      <div style={{ padding: '20px 28px 14px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
        }}>
          {bodyParas.map((p, i) => {
            const isWide = i === bodyParas.length - 1 && (bodyParas.length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: 12,
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -8, left: 12, background: node.color, color:'#0a0a1a',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: 8, letterSpacing: 1,
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: '#ccc' }}>{p}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* â”€â”€â”€ FACT â”€â”€â”€ */}
      <div style={{
        margin: '0 28px 20px', padding: '14px 16px', borderRadius: 10,
        background: `linear-gradient(90deg, ${node.color}14, transparent)`,
        borderLeft: `4px solid ${node.color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Sparkles size={14} color={node.color} />
          <span style={{ fontSize: 11, fontWeight: 800, color: node.color, textTransform: 'uppercase', letterSpacing: 1 }}>
            Dato Fascinante
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#bbb', fontStyle: 'italic' }}>{node.fact}</p>
      </div>
    
      {/* Banner image */}
      {node.bannerImage && (
        <div className="mt-4 mx-7 mb-4 rounded-xl overflow-hidden border border-white/10">
          <img
            src={node.bannerImage}
            alt={node.bannerCaption || node.title}
            className="w-full object-cover"
            style={{ maxHeight: '220px' }}
          />
          {node.bannerCaption && (
            <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
              {node.bannerCaption}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PROGRESS BAR
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ProgressBar({ explored, total }) {
  const pct = Math.round((explored / total) * 100);
  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>Progreso</span>
        <span style={{ fontSize: 11, color: '#E040FB', fontWeight: 700 }}>{explored}/{total} explorados</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#E040FB,#00CCFF)' }}
        />
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN COMPONENT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function InteractiveInfographic_BttfM5() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeId) || null;
  const allExplored = explored.size === INFOGRAPHIC_NODES.length;

  const handleSelect = useCallback((id) => {
    setActiveId(id);
    setExplored(prev => { const s = new Set(prev); s.add(id); return s; });
  }, []);

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0520 0%, #1a0a2e 40%, #0d0418 100%)',
      fontFamily: "'Exo 2','Segoe UI',sans-serif", color: '#fff',
    }}>
      {/* bg image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/bttf/infographic_aeropatines/bg_aeropatines.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
      }} />

      {/* canvas particles */}
      <AntiGravityField />

      {/* decorations for active node */}
      {activeId && DECO_MAP[activeId] && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          {DECO_MAP[activeId]}
        </div>
      )}

      {/* â”€â”€â”€ CONTENT â”€â”€â”€ */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px 16px 48px' }}>
        {/* header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <HoverHeader />
        </motion.div>

        {/* node buttons */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 36, margin: '40px auto 36px', maxWidth: 700,
        }}>
          {INFOGRAPHIC_NODES.map(n => (
            <NodeButton key={n.id} node={n} isActive={activeId === n.id}
              isExplored={explored.has(n.id)} onClick={() => handleSelect(n.id)} />
          ))}
        </div>

        {/* progress */}
        <div style={{ marginBottom: 30 }}>
          <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
        </div>

        {/* panel */}
        <AnimatePresence mode="wait">
          {activeNode && <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveId(null)} setLightboxSrc={setLightboxSrc} />}
        </AnimatePresence>

        {/* completion message */}
        <AnimatePresence>
          {allExplored && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{
                marginTop: 36, textAlign: 'center', padding: '28px 20px', borderRadius: 16,
                background: 'rgba(224,64,251,0.08)', border: '1px solid #E040FB44', maxWidth: 520, margin: '36px auto 0',
              }}
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Star size={36} color="#E040FB" fill="#E040FB" style={{ margin: '0 auto 10px', display: 'block' }} />
              </motion.div>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#E040FB', margin: '0 0 8px', fontFamily: "'Orbitron',sans-serif" }}>
                ðŸ›¹ ¡Has dominado la Antigravedad!
              </p>
              <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
                Ahora puedes tomar el quiz para ganar tu insignia de Ingeniero Antigravitacional
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* â”€â”€â”€ Bibliografía â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem', padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '0 0 16px 16px',
        }}>
          <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
            textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
            listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
            {BIBLIOGRAPHY.map((ref, i) => (
              <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
