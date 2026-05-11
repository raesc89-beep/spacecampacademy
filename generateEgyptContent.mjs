import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const EGYPT_RICH_MODULES = [
  {
    id: "egypt_m1",
    order: 1001,
    titleEn: "Nabta Playa",
    titleEs: "Nabta Playa: El Primer Observatorio",
    badge: "Keeper of the Stones",
    badgeEs: "Guardián de las Piedras",
    badgeIcon: "/assets/egypt/m1_nabta_playa.png",
    color: "#D4A843",
    icon: "/assets/egypt/m1_nabta_playa.png",
    contentEs: {
      sections: [
        {
          id: "m1_sec1",
          title: "El Círculo Megalítico",
          text: [
            "Mucho antes de que se construyeran las famosas pirámides, en las profundidades del desierto del Sahara, existió un misterioso círculo de piedras conocido como Nabta Playa.",
            "Hace más de 7,000 años, las tribus nómadas utilizaban este asombroso monumento para rastrear el solsticio de verano y la llegada de las lluvias.",
            "Es considerado el observatorio astronómico más antiguo del mundo, ¡incluso más antiguo que Stonehenge en Inglaterra!"
          ],
          image: "/assets/egypt/m1_nabta_playa.png",
          style: "normal"
        },
        {
          id: "m1_sec2",
          title: "La Alineación de Orión",
          text: [
            "Los expertos han descubierto que las piedras centrales de Nabta Playa estaban alineadas con el cinturón de la constelación de Orión.",
            "Para los antiguos, las estrellas no solo eran hermosas luces en el cielo, sino un reloj gigante que les indicaba cuándo debían mover sus rebaños al agua.",
            "Este profundo entendimiento del cosmos sentó las bases astronómicas que más tarde heredarían los faraones de Kemet."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué era Nabta Playa?", options: ["Un templo de oro", "El observatorio astronómico más antiguo", "Una pirámide", "Un barco"], a: 1 },
      { q: "¿Con qué constelación estaban alineadas algunas piedras?", options: ["Orión", "Osa Menor", "Escorpio", "Pegaso"], a: 0 },
      { q: "¿Para qué servía rastrear el solsticio?", options: ["Para saber cuándo dormir", "Predecir la llegada de las lluvias", "Hacer fiestas de cumpleaños", "Pintar las rocas"], a: 1 },
      { q: "¿Es Nabta Playa más antiguo que Stonehenge?", options: ["Sí", "No", "Se construyeron el mismo día", "Nunca existió"], a: 0 },
      { q: "¿Dónde está ubicado Nabta Playa?", options: ["En el desierto del Sahara", "En el fondo del mar", "En Europa", "En Marte"], a: 0 }
    ]
  },
  {
    id: "egypt_m2",
    order: 1002,
    titleEn: "The Decans",
    titleEs: "Los Decanos: El Reloj Estelar",
    badge: "Master of Time",
    badgeEs: "Maestro del Tiempo",
    badgeIcon: "/assets/egypt/m2_decanos.png",
    color: "#6A9FD4",
    icon: "/assets/egypt/m2_decanos.png",
    contentEs: {
      sections: [
        {
          id: "m2_sec1",
          title: "Dividiendo la Noche",
          text: [
            "¿Alguna vez te preguntaste cómo sabían la hora en la antigüedad antes de los relojes digitales? Los sacerdotes astrónomos de Egipto inventaron un sistema increíble.",
            "Eligieron 36 grupos de estrellas especiales que aparecían a lo largo de la noche a los que llamaron 'Decanos'.",
            "A medida que la noche avanzaba, la aparición de un nuevo decano en el horizonte indicaba que había pasado exactamente una hora."
          ],
          image: "/assets/egypt/m2_decanos.png",
          style: "normal"
        },
        {
          id: "m2_sec2",
          title: "Magia y Astronomía",
          text: [
            "Los decanos no solo marcaban el tiempo; también eran considerados poderosos dioses o espíritus que gobernaban el destino de las personas.",
            "Estos guardianes del tiempo fueron pintados en los techos de las tumbas de los faraones, creando hermosos mapas estelares llamados 'relojes diagonales estelares'.",
            "Nuestro sistema moderno de dividir la noche en 12 horas tiene su origen directo en estos increíbles observadores de estrellas."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué eran los decanos?", options: ["Sacerdotes jóvenes", "36 grupos de estrellas", "Pirámides pequeñas", "Ríos antiguos"], a: 1 },
      { q: "¿Para qué servían?", options: ["Dar la hora por la noche", "Medir la lluvia", "Predecir terremotos", "Cultivar maíz"], a: 0 },
      { q: "¿Cuántas horas nocturnas definieron los egipcios gracias a esto?", options: ["24", "10", "12", "5"], a: 2 },
      { q: "¿Dónde pintaban los mapas de los decanos?", options: ["En el piso de las casas", "En los techos de tumbas faraónicas", "En papiros desechables", "En la arena"], a: 1 },
      { q: "¿Qué creían que eran los decanos además de estrellas?", options: ["Dioses y espíritus del destino", "Piedras mágicas", "Monstruos marinos", "Naves espaciales"], a: 0 }
    ]
  },
  {
    id: "egypt_m3",
    order: 1003,
    titleEn: "Sopdet and Sirius",
    titleEs: "Sopdet y Sirio",
    badge: "Bringer of the Flood",
    badgeEs: "Invocador del Nilo",
    badgeIcon: "/assets/egypt/m3_sopdet.png",
    color: "#C0E8FF",
    icon: "/assets/egypt/m3_sopdet.png",
    contentEs: {
      sections: [
        {
          id: "m3_sec1",
          title: "La Estrella más Brillante",
          text: [
            "Sirio es la estrella más brillante de todo el cielo nocturno, y para los antiguos egipcios era la estrella más importante de todas.",
            "La llamaban 'Sopdet' (y más tarde Sothis). Representaba a una diosa fundamental que garantizaba la vida en todo Egipto.",
            "Sopdet desaparecía del cielo nocturno durante 70 días cada año, como si viajara por el inframundo, para renacer gloriosamente."
          ],
          image: "/assets/egypt/m3_sopdet.png",
          style: "normal"
        },
        {
          id: "m3_sec2",
          title: "El Orto Helíaco y la Inundación",
          text: [
            "El día en que Sopdet volvía a ser visible justo antes del amanecer (un evento llamado 'orto helíaco'), comenzaba el Año Nuevo egipcio.",
            "¿Por qué era tan importante? Porque este evento celestial ocurría al mismo tiempo que el Nilo comenzaba a inundarse.",
            "La crecida del río traía barro negro y fértil, permitiendo a los agricultores plantar sus cultivos. ¡Sin Sopdet y el Nilo, Egipto no habría existido!"
          ],
          image: "/assets/egypt/hub_character.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Cuál es la estrella más brillante del cielo nocturno?", options: ["El Sol", "Sirio (Sopdet)", "Polaris", "Marte"], a: 1 },
      { q: "¿Qué marcaba la aparición de Sirio antes del amanecer?", options: ["El fin del mundo", "El Año Nuevo y la inundación del Nilo", "Una tormenta de arena", "La muerte de un faraón"], a: 1 },
      { q: "¿Cuántos días desaparecía Sopdet del cielo?", options: ["30", "15", "70", "365"], a: 2 },
      { q: "¿Por qué era buena la inundación del Nilo?", options: ["Porque traía barro fértil para sembrar", "Porque les gustaba nadar", "Porque hundía barcos piratas", "Para que los cocodrilos cantaran"], a: 0 },
      { q: "¿Qué es el 'orto helíaco'?", options: ["La aparición de una estrella justo antes del amanecer", "El eclipse solar", "El atardecer en el desierto", "Un tipo de oro egipcio"], a: 0 }
    ]
  },
  {
    id: "egypt_m4",
    order: 1004,
    titleEn: "Mesjetiu",
    titleEs: "Mesjetiu: La Osa Mayor",
    badge: "The Cosmic Bull",
    badgeEs: "Toro Cósmico",
    badgeIcon: "/assets/egypt/m4_mesjetiu.png",
    color: "#F5C842",
    icon: "/assets/egypt/m4_mesjetiu.png",
    contentEs: {
      sections: [
        {
          id: "m4_sec1",
          title: "La Pierna de Toro en el Cielo",
          text: [
            "Hoy conocemos a este grupo de estrellas como la Osa Mayor o el Gran Cazo, pero los antiguos egipcios tenían mucha más imaginación.",
            "Ellos la veían como la pata delantera de un inmenso toro sagrado y la llamaron 'Mesjetiu'.",
            "Mesjetiu era parte del grupo de estrellas 'imperecederas', aquellas que nunca se ponían bajo el horizonte y siempre eran visibles en el norte."
          ],
          image: "/assets/egypt/m4_mesjetiu.png",
          style: "normal"
        },
        {
          id: "m4_sec2",
          title: "Alineando Templos y Pirámides",
          text: [
            "Mesjetiu no era solo un dibujo en el cielo. Era la herramienta principal de los arquitectos egipcios.",
            "En un antiguo ritual llamado 'Estiramiento de la Cuerda', el faraón observaba a Mesjetiu para encontrar el norte verdadero.",
            "Gracias a esta constelación, lograron alinear la Gran Pirámide de Giza de forma tan precisa que hoy los científicos modernos todavía se asombran."
          ],
          image: "/assets/egypt/m7_star_shafts.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Cómo llamaban los egipcios a la Osa Mayor?", options: ["Orión", "Mesjetiu", "El Cazo Mágico", "Sirio"], a: 1 },
      { q: "¿Qué figura imaginaban en lugar de un oso?", options: ["Un león", "Una pata de toro", "Un halcón", "Un escarabajo"], a: 1 },
      { q: "¿Por qué eran especiales estas estrellas?", options: ["Nunca se ocultaban en el norte", "Brillaban de color verde", "Eran planetas", "Desaparecían por años"], a: 0 },
      { q: "¿Qué ritual usaban para alinear edificios?", options: ["La danza de la lluvia", "El Estiramiento de la Cuerda", "El corte de pelo faraónico", "El canto del cocodrilo"], a: 1 },
      { q: "¿Qué estructura famosa se alineó con Mesjetiu?", options: ["El Coliseo", "La Torre Eiffel", "La Gran Pirámide de Giza", "El Taj Mahal"], a: 2 }
    ]
  },
  {
    id: "egypt_m5",
    order: 1005,
    titleEn: "The Laser of Giza",
    titleEs: "El Láser de Giza",
    badge: "Builder of Alignment",
    badgeEs: "Constructor Estelar",
    badgeIcon: "/assets/egypt/m5_giza.png",
    color: "#F0A500",
    icon: "/assets/egypt/m5_giza.png",
    contentEs: {
      sections: [
        {
          id: "m5_sec1",
          title: "La Maravilla Inexplicable",
          text: [
            "Las tres Grandes Pirámides de Giza son la última maravilla del mundo antiguo que sigue en pie.",
            "Su construcción es tan matemáticamente perfecta que los lados de la Gran Pirámide apuntan exactamente a los puntos cardinales: Norte, Sur, Este y Oeste.",
            "La diferencia y el margen de error es menor que una fracción de grado. ¿Cómo lograron semejante hazaña sin brújulas magnéticas modernas?"
          ],
          image: "/assets/egypt/m5_giza.png",
          style: "normal"
        },
        {
          id: "m5_sec2",
          title: "Astronomía Geométrica",
          text: [
            "El secreto fue una técnica de observación estelar combinada con matemáticas.",
            "Observando la posición donde nacían y se ponían ciertas estrellas en el horizonte plano del desierto, marcaban los puntos y dividían el ángulo a la mitad.",
            "Esa línea cortaba el norte verdadero como si fuera un láser de precisión. Es el mayor triunfo de la arqueoastronomía antigua."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Hacia dónde apuntan los lados de la Gran Pirámide?", options: ["Norte, Sur, Este y Oeste", "Al río Nilo", "Hacia Grecia", "Hacia ninguna parte"], a: 0 },
      { q: "¿Usaban brújulas magnéticas los egipcios?", options: ["Sí, hechas de oro", "No, usaban la observación estelar y matemáticas", "Usaban imanes mágicos", "Las compraban en China"], a: 1 },
      { q: "¿Cómo encontraban el Norte Verdadero?", options: ["Dividiendo el ángulo entre el nacimiento y puesta de una estrella", "Preguntándole a un camello", "Caminando en línea recta", "Mirando el musgo de los árboles"], a: 0 },
      { q: "¿Cuántas pirámides principales hay en Giza?", options: ["Diez", "Una", "Tres", "Cien"], a: 2 },
      { q: "¿Cuál es el margen de error en la alineación de Giza?", options: ["Varios kilómetros", "Una fracción de grado (casi perfecto)", "No estaban alineadas", "Cien metros"], a: 1 }
    ]
  },
  {
    id: "egypt_m6",
    order: 1006,
    titleEn: "Map of the Universe",
    titleEs: "Mapa del Universo: La Tumba de Senenmut",
    badge: "Stellar Cartographer",
    badgeEs: "Cartógrafo Estelar",
    badgeIcon: "/assets/egypt/m6_senenmut.png",
    color: "#9B6BFF",
    icon: "/assets/egypt/m6_senenmut.png",
    contentEs: {
      sections: [
        {
          id: "m6_sec1",
          title: "El Techo de Senenmut",
          text: [
            "Senenmut fue un arquitecto brillante y el consejero más cercano de la poderosa reina faraón Hatshepsut.",
            "En el techo de su tumba secreta (TT353), dejó uno de los tesoros científicos más grandes de la historia.",
            "Se trata del catálogo estelar astronómico pintado más antiguo que jamás se haya descubierto, ¡un verdadero mapa del universo egipcio!"
          ],
          image: "/assets/egypt/m6_senenmut.png",
          style: "normal"
        },
        {
          id: "m6_sec2",
          title: "Navegando por la Oscuridad",
          text: [
            "El panel astronómico está dividido en dos hemisferios: el cielo del norte y el cielo del sur.",
            "Muestra a los decanos, a Júpiter, Saturno, e incluso a la diosa Isis subida en un bote estelar.",
            "Era una guía cósmica diseñada para ayudar al alma a navegar por el espacio y el tiempo en su viaje hacia el más allá."
          ],
          image: "/assets/egypt/m9_dendera.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Quién fue Senenmut?", options: ["Un esclavo", "El arquitecto de la reina Hatshepsut", "Un dios", "Un guerrero romano"], a: 1 },
      { q: "¿Qué hay en el techo de su tumba secreta?", options: ["Pintura de vacas", "El mapa estelar pintado más antiguo", "Instrucciones de cocina", "Oro líquido"], a: 1 },
      { q: "¿Para qué servía este mapa en la tumba?", options: ["Para decorar", "Como guía cósmica para el alma", "Para iluminar la cueva", "Para contar chistes cósmicos"], a: 1 },
      { q: "¿Qué dos planetas aparecen identificados allí?", options: ["Tierra y Marte", "Júpiter y Saturno", "Urano y Neptuno", "Plutón y Venus"], a: 1 },
      { q: "¿Cómo representaban el movimiento estelar?", options: ["En aviones", "En botes estelares flotando en el cielo", "En carros de fuego", "En caballos"], a: 1 }
    ]
  },
  {
    id: "egypt_m7",
    order: 1007,
    titleEn: "Stone Telescopes",
    titleEs: "Telescopios de Piedra",
    badge: "Shaft Explorer",
    badgeEs: "Ojo de la Pirámide",
    badgeIcon: "/assets/egypt/m7_star_shafts.png",
    color: "#5EC4A0",
    icon: "/assets/egypt/m7_star_shafts.png",
    contentEs: {
      sections: [
        {
          id: "m7_sec1",
          title: "Los Pozos Estelares",
          text: [
            "En las profundidades de la Gran Pirámide del faraón Keops existen canales de ventilación muy extraños.",
            "Durante mucho tiempo, los arqueólogos pensaron que solo servían para dar aire a los constructores.",
            "Pero los astrónomos descubrieron que estos canales eran en realidad túneles precisos apuntando a zonas específicas del cielo negro."
          ],
          image: "/assets/egypt/m7_star_shafts.png",
          style: "normal"
        },
        {
          id: "m7_sec2",
          title: "Cañones hacia el Cielo",
          text: [
            "Funcionaban como gigantescos cañones huecos o telescopios de piedra apuntando hacia la eternidad.",
            "El canal sur apuntaba directamente hacia Orión, que representaba a Osiris, y hacia Sirio. El canal norte apuntaba hacia las estrellas imperecederas.",
            "Estos pozos eran, según la creencia egipcia, los pasillos por donde el alma del faraón dispararía hacia las estrellas para vivir por siempre."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué pensaban antes que eran los canales de la Gran Pirámide?", options: ["Solo ductos de aire", "Cañones láser", "Tubos de agua", "Toboganes secretos"], a: 0 },
      { q: "¿A qué apuntaban realmente los canales?", options: ["Al suelo", "Hacia zonas estelares específicas", "Hacia el río Nilo", "Al pueblo"], a: 1 },
      { q: "¿Qué constelación estaba alineada con el canal sur?", options: ["Orión", "La Osa Menor", "Leo", "Sagitario"], a: 0 },
      { q: "¿Qué significado místico tenían estos canales?", options: ["Eran chimeneas", "Pasillos para que el alma disparara hacia las estrellas", "Para escuchar el eco", "Para enviar mensajes en botellas"], a: 1 },
      { q: "¿Los egipcios usaban vidrio en estos 'telescopios'?", options: ["Sí, lentes de aumento", "No, eran túneles rectos y huecos en la piedra", "Usaban agua", "Usaban cristal de cuarzo"], a: 1 }
    ]
  },
  {
    id: "egypt_m8",
    order: 1008,
    titleEn: "Abu Simbel",
    titleEs: "Abu Simbel y la Luz del Solsticio",
    badge: "Ray of Ramses",
    badgeEs: "Rayo de Ramsés",
    badgeIcon: "/assets/egypt/m8_abu_simbel.png",
    color: "#FF9A3C",
    icon: "/assets/egypt/m8_abu_simbel.png",
    contentEs: {
      sections: [
        {
          id: "m8_sec1",
          title: "El Santuario en la Roca",
          text: [
            "Ramsés II fue uno de los faraones más megalómanos de Egipto. Mandó a tallar un templo gigantesco directamente en una montaña de roca: Abu Simbel.",
            "La fachada tiene cuatro estatuas colosales del faraón, pero la verdadera magia sucede en la oscuridad del interior del templo.",
            "Allí, al final del pasillo, están las estatuas de cuatro dioses sentados en la penumbra eterna."
          ],
          image: "/assets/egypt/m8_abu_simbel.png",
          style: "normal"
        },
        {
          id: "m8_sec2",
          title: "El Milagro Solar",
          text: [
            "Dos veces al año, el 22 de octubre y el 22 de febrero, los arquitectos diseñaron un truco de luz astronómico insuperable.",
            "En el amanecer, un solo rayo de sol penetra todo el largo pasillo y se ilumina gradualmente el rostro de Ramsés II y otros dos dioses solares.",
            "¡El dios de la oscuridad, Ptah, nunca es tocado por la luz! Es una maravilla de ingeniería astronómica y cálculo matemático de 3,200 años de antigüedad."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué templo fue tallado en una montaña de roca por Ramsés II?", options: ["Abu Simbel", "Luxor", "Karnak", "La Esfinge"], a: 0 },
      { q: "¿Qué fenómeno ocurre dos veces al año?", options: ["Llueven meteoritos", "Un rayo de sol ilumina a las estatuas del fondo", "El templo se inunda", "El templo gira sobre su eje"], a: 1 },
      { q: "¿Por qué es asombroso este truco de luz?", options: ["Porque fue calculado hace 3,200 años", "Porque usan focos eléctricos", "Porque las piedras reflejan luz", "No es asombroso, ocurre todos los días"], a: 0 },
      { q: "¿A qué dios nunca toca el rayo de sol?", options: ["A Ra", "A Ptah, dios del inframundo y la oscuridad", "A Amón", "Al faraón Ramsés"], a: 1 },
      { q: "¿Cuántas estatuas colosales custodian la entrada del templo?", options: ["Cuatro", "Dos", "Cien", "Ninguna"], a: 0 }
    ]
  },
  {
    id: "egypt_m9",
    order: 1009,
    titleEn: "Dendera Zodiac",
    titleEs: "Zodiaco de Dendera",
    badge: "Master Astrologer",
    badgeEs: "Astrólogo Maestro",
    badgeIcon: "/assets/egypt/m9_dendera.png",
    color: "#D46A6A",
    icon: "/assets/egypt/m9_dendera.png",
    contentEs: {
      sections: [
        {
          id: "m9_sec1",
          title: "El Mapa de Piedra",
          text: [
            "En el Templo de Hathor en Dendera se encontró un relieve circular masivo, tallado en la roca del techo.",
            "Este es el Zodiaco de Dendera, uno de los planisferios (mapas del cielo estrellado) más famosos y hermosos del mundo antiguo.",
            "Contiene signos zodiacales que reconocemos hoy, combinando la tradición babilónica y griega con la profunda mitología egipcia."
          ],
          image: "/assets/egypt/m9_dendera.png",
          style: "normal"
        },
        {
          id: "m9_sec2",
          title: "Uniendo Dos Mundos Cósmicos",
          text: [
            "El zodiaco muestra a los doce signos convencionales, pero representados en estilo egipcio (¡el Toro es Mesjetiu, Leo camina sobre una serpiente!).",
            "Además, plasma eclipses solares y lunares históricos y ubica a planetas como Marte y Venus alineados con constelaciones.",
            "Este techo es la prueba definitiva de cómo la ciencia estelar de varias civilizaciones se fusionó mágicamente a orillas del Nilo."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué es el Zodiaco de Dendera?", options: ["Un tipo de pan", "Un planisferio tallado en roca con los signos estelares", "Una moneda", "Una corona"], a: 1 },
      { q: "¿En qué templo fue encontrado?", options: ["En el Templo de Hathor", "En la pirámide de Keops", "En el Valle de los Reyes", "En una tumba escondida"], a: 0 },
      { q: "¿Qué culturas influenciaron este zodiaco?", options: ["Babilonia, Grecia y Egipto", "Maya, Azteca e Inca", "Japón y China", "Vikinga y Celta"], a: 0 },
      { q: "¿Qué fenómeno astronómico real fue plasmado en el disco?", options: ["Agujeros negros", "Eclipses", "Lanzamientos de cohetes", "Rayos gamma"], a: 1 },
      { q: "¿Cuál es una prueba de fusión de culturas en el Zodiaco?", options: ["Letras modernas", "Signos convencionales adaptados a la mitología egipcia", "Uso de números arábigos", "Símbolos eléctricos"], a: 1 }
    ]
  },
  {
    id: "egypt_m10",
    order: 1010,
    titleEn: "Space Dagger",
    titleEs: "Daga Espacial de Tutankamón",
    badge: "Meteor Blacksmith",
    badgeEs: "Herrero de Meteoritos",
    badgeIcon: "/assets/egypt/m10_daga.png",
    color: "#B0C4DE",
    icon: "/assets/egypt/m10_daga.png",
    contentEs: {
      sections: [
        {
          id: "m10_sec1",
          title: "El Arma que Cayó del Cielo",
          text: [
            "En la famosa tumba del joven rey Tutankamón, el arqueólogo Howard Carter encontró una daga envuelta en la momia real.",
            "La hoja de la daga era brillante, fuerte y no estaba oxidada. ¿El problema? ¡El hierro fundido no existía en Egipto durante su reinado!",
            "¿De dónde sacaron entonces un hierro de tan altísima calidad y pureza?"
          ],
          image: "/assets/egypt/m10_daga.png",
          style: "normal"
        },
        {
          id: "m10_sec2",
          title: "Metal Extraterrestre",
          text: [
            "Con espectrometría moderna de rayos X en el año 2016, los científicos resolvieron el misterio: el hierro contenía altos niveles de níquel y cobalto.",
            "La hoja no fue hecha de rocas terrestres, ¡fue forjada a partir de un meteorito férrico que cayó del espacio profundo!",
            "Los egipcios lo llamaban 'El metal del cielo', reconociendo literalmente que los asteroides caían de entre las estrellas."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué objeto inusual se encontró con Tutankamón?", options: ["Un celular", "Una daga de hierro sin óxido", "Un escudo de plástico", "Zapatos con resortes"], a: 1 },
      { q: "¿Por qué el hierro era tan misterioso?", options: ["Porque era invisible", "Porque Egipto aún no forjaba hierro terrestre", "Porque pesaba mucho", "Porque volaba"], a: 1 },
      { q: "¿De dónde provino el hierro de la daga?", options: ["De un meteorito espacial", "De Europa", "De volcanes", "De fósiles de dinosaurios"], a: 0 },
      { q: "¿Cómo confirmaron los científicos en 2016 su origen?", options: ["Por los altos niveles de níquel y cobalto", "Por su color verde", "Por la firma de un alien", "Usando el olfato"], a: 0 },
      { q: "¿Cómo llamaban los egipcios a este material?", options: ["El metal del cielo", "El oro falso", "La piedra blanda", "El vidrio duro"], a: 0 }
    ]
  },
  {
    id: "egypt_m11",
    order: 1011,
    titleEn: "Nut's Nile",
    titleEs: "El Nilo de Nut: La Vía Láctea",
    badge: "Galactic Navigator",
    badgeEs: "Navegante Galáctico",
    badgeIcon: "/assets/egypt/m11_via_lactea.png",
    color: "#9DD4F0",
    icon: "/assets/egypt/m11_via_lactea.png",
    contentEs: {
      sections: [
        {
          id: "m11_sec1",
          title: "La Diosa del Cielo",
          text: [
            "En la mitología egipcia, el cielo era imaginado como una diosa inmensa llamada Nut, cubierta de estrellas, que se arqueaba protegiendo la Tierra.",
            "Cada anochecer, Nut se tragaba al dios sol Ra, y este viajaba por dentro de su cuerpo durante la noche oscura.",
            "Cada mañana, ella volvía a 'dar a luz' al sol, creando el espectacular amanecer rojo."
          ],
          image: "/assets/egypt/m11_via_lactea.png",
          style: "normal"
        },
        {
          id: "m11_sec2",
          title: "El Reflejo Terrenal",
          text: [
            "Los egipcios creían en el equilibrio perfecto (Maat). Para ellos, lo que existía en el cielo debía existir en la tierra.",
            "Nuestra galaxia, la cinta brillante de la Vía Láctea, era interpretada como 'El Nilo Celestial', por donde navegaban los dioses en barcas estelares.",
            "De hecho, orientaron sus propios templos a lo largo del Nilo terrestre para imitar exactamente el flujo del río de estrellas."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Quién era Nut?", options: ["El río Nilo", "La inmensa diosa del cielo arqueada sobre la Tierra", "Un gato sagrado", "Una pirámide de cristal"], a: 1 },
      { q: "¿Qué representaba la Vía Láctea para ellos?", options: ["Una nube de lluvia", "El Nilo Celestial", "Un montón de ceniza", "Un collar perdido"], a: 1 },
      { q: "¿Qué le pasaba al sol por la noche?", options: ["Nut se lo tragaba para que viajara por su cuerpo", "Se escondía en una cueva", "Se apagaba con agua", "Se convertía en la luna"], a: 0 },
      { q: "¿Cómo se llamaba el concepto de equilibrio perfecto cósmico?", options: ["Maat", "Ka", "Anubis", "Papiro"], a: 0 },
      { q: "¿Cómo navegaban los dioses por la Vía Láctea?", options: ["En cohetes", "En barcas estelares", "En camellos voladores", "Nadando"], a: 1 }
    ]
  },
  {
    id: "egypt_m12",
    order: 1012,
    titleEn: "Obelisks",
    titleEs: "Obeliscos: Relojes del Sol",
    badge: "Sun Catcher",
    badgeEs: "Atrapasol",
    badgeIcon: "/assets/egypt/m12_obelisco.png",
    color: "#E8C96A",
    icon: "/assets/egypt/m12_obelisco.png",
    contentEs: {
      sections: [
        {
          id: "m12_sec1",
          title: "Agujas hacia el Cielo",
          text: [
            "Un obelisco es un pilar alto de piedra de cuatro lados con una cima puntiaguda en forma de pirámide.",
            "Eran tallados de un solo bloque gigante de granito, levantados majestuosamente frente a los templos solares de Kemet.",
            "Pero más allá de su imponente belleza y simbolismo religioso, tenían una función matemática y astronómica precisa."
          ],
          image: "/assets/egypt/m12_obelisco.png",
          style: "normal"
        },
        {
          id: "m12_sec2",
          title: "Sombras en Movimiento",
          text: [
            "Funcionaban como gnomones gigantes: la aguja de los relojes de sol primitivos.",
            "Al observar cómo se movía y alargaba la sombra del obelisco en el patio del templo a lo largo del día, los sacerdotes podían saber exactamente la hora diurna.",
            "Además, midiendo la sombra más corta o más larga del año, determinaban las fechas exactas de los solsticios de verano e invierno."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué es un obelisco?", options: ["Una espada enorme", "Un pilar alto de piedra con cima de pirámide", "Un pozo profundo", "Una barca sagrada"], a: 1 },
      { q: "¿Cómo funcionaban a nivel astronómico?", options: ["Eran pararrayos", "Eran agujas de gigantescos relojes de sol", "Lanzaban luz", "Producían eclipses"], a: 1 },
      { q: "¿Cómo sabían los sacerdotes la hora del día?", options: ["Mirando sus muñecas", "Viendo el movimiento de la sombra del obelisco", "Escuchando los pájaros", "Tirando piedras"], a: 1 },
      { q: "¿Qué determinaban con la sombra más corta o larga del año?", options: ["Los solsticios de verano e invierno", "El peso del obelisco", "La crecida del mar", "El color del sol"], a: 0 },
      { q: "¿De qué material estaban hechos normalmente?", options: ["Madera", "Granito tallado en un solo bloque", "Arena apelmazada", "Ladrillos pintados"], a: 1 }
    ]
  },
  {
    id: "egypt_m13",
    order: 1013,
    titleEn: "365 Days",
    titleEs: "365 Días: El Calendario Civil",
    badge: "Time Keeper",
    badgeEs: "El Guardián de los Ciclos",
    badgeIcon: "/assets/egypt/m13_calendario.png",
    color: "#80D080",
    icon: "/assets/egypt/m13_calendario.png",
    contentEs: {
      sections: [
        {
          id: "m13_sec1",
          title: "El Cómputo del Tiempo",
          text: [
            "Mientras las antiguas culturas del mundo usaban calendarios lunares complicados y caóticos, los egipcios necesitaban orden.",
            "Crearon el primer sistema solar estandarizado, inventando el concepto del año de 365 días.",
            "El calendario consistía en 12 meses de exactamente 30 días cada uno (total de 360 días)."
          ],
          image: "/assets/egypt/m13_calendario.png",
          style: "normal"
        },
        {
          id: "m13_sec2",
          title: "Los Días Epagómenos",
          text: [
            "¿Qué pasaba con los 5 días que faltaban para coincidir con la traslación de la Tierra alrededor del sol?",
            "Los agregaban al final del año y los llamaron 'Días Epagómenos' o 'Los que están sobre el año'.",
            "Era una festividad mítica de 5 días donde se celebraba el cumpleaños de dioses como Osiris e Isis. ¡Nuestro año moderno proviene directamente de esta genialidad matemática!"
          ],
          image: "/assets/egypt/m13_calendario.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Quiénes crearon el primer calendario solar estandarizado de 365 días?", options: ["Los romanos", "Los egipcios", "Los incas", "Los vikingos"], a: 1 },
      { q: "¿Cuántos meses tenía su año civil y de cuántos días eran?", options: ["12 meses de 30 días", "10 meses de 40 días", "12 meses de 28 días", "No tenían meses"], a: 0 },
      { q: "¿Qué eran los 'días epagómenos'?", options: ["Días de descanso obligados", "5 días agregados al final del año para completar los 365", "Días de mucha lluvia", "Meses enteros ocultos"], a: 1 },
      { q: "¿Qué se celebraba en esos 5 días extra?", options: ["El fin del mundo", "El cumpleaños de varios dioses (Isis, Osiris, etc.)", "La pesca masiva", "Duelos de magia"], a: 1 },
      { q: "¿En qué evento astronómico se basó este sistema solar?", options: ["La órbita de Marte", "El movimiento de la Tierra alrededor del Sol", "Las fases lunares", "El paso de un cometa"], a: 1 }
    ]
  },
  {
    id: "egypt_m14",
    order: 1014,
    titleEn: "Apophis",
    titleEs: "Apofis y el Devorador de Soles",
    badge: "Eclipse Survivor",
    badgeEs: "Vencedor de las Sombras",
    badgeIcon: "/assets/egypt/m14_apofis.png",
    color: "#FF5252",
    icon: "/assets/egypt/m14_apofis.png",
    contentEs: {
      sections: [
        {
          id: "m14_sec1",
          title: "La Gran Serpiente Cósmica",
          text: [
            "En el cielo perfecto, a veces ocurría algo aterrador: la luz del Sol era devorada a plena luz del día en un evento que hoy llamamos Eclipse Solar.",
            "Para los sacerdotes egipcios, este raro fenómeno astronómico no era solo una alineación de la luna, era la manifestación del caos.",
            "Creían que Apofis, la serpiente colosal del inframundo, había logrado atrapar la barca solar de Ra."
          ],
          image: "/assets/egypt/m14_apofis.png",
          style: "normal"
        },
        {
          id: "m14_sec2",
          title: "El Rescate Astronómico",
          text: [
            "Para 'salvar' al Sol, los astrónomos del templo debían predecir estos eventos y liderar cantos para golpear y derrotar a la serpiente oscura.",
            "Aunque su explicación era mitológica, los escribas llevaban registros minuciosos de los eclipses.",
            "Hoy en día, la NASA nombró 'Apophis' a un asteroide cercano a la Tierra, en honor a esa serpiente ancestral que los antiguos miraban con temor."
          ],
          image: "/assets/egypt/hub_character.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Qué evento astronómico aterrorizaba a los egipcios a pleno día?", options: ["El Eclipse Solar", "El arcoíris", "Una lluvia suave", "El atardecer normal"], a: 0 },
      { q: "¿Quién creían que era responsable del eclipse?", options: ["El faraón", "Apofis, la serpiente colosal del caos", "Anubis", "Los cocodrilos"], a: 1 },
      { q: "¿Qué debían hacer para 'salvar' al Sol?", options: ["Esconderse bajo tierra", "Cantar y realizar rituales para golpear a la oscuridad", "Lanzar agua al cielo", "Apagar todos los fuegos"], a: 1 },
      { q: "¿Qué hacían los escribas con estos eventos a pesar de sus mitos?", options: ["Los ignoraban", "Llevaban registros minuciosos (astronomía rudimentaria)", "Los prohibían", "Destruían las piedras"], a: 1 },
      { q: "¿Qué nombró la NASA en honor a este ser oscuro?", options: ["Un cohete lunar", "Un asteroide real (99942 Apophis)", "Un cráter en Marte", "Una estrella nueva"], a: 1 }
    ]
  },
  {
    id: "egypt_m15",
    order: 1015,
    titleEn: "Satellite Ojo",
    titleEs: "Ojo Satelital: Arqueología Espacial",
    badge: "Space Archaeologist",
    badgeEs: "Arqueólogo Espacial",
    badgeIcon: "/assets/egypt/m15_satelite.png",
    color: "#64B5F6",
    icon: "/assets/egypt/m15_satelite.png",
    contentEs: {
      sections: [
        {
          id: "m15_sec1",
          title: "Detectives desde la Órbita",
          text: [
            "Aunque los antiguos egipcios miraban hacia las estrellas, hoy en día nosotros miramos desde las estrellas hacia Egipto.",
            "La arqueoastronomía moderna utiliza satélites infrarrojos que orbitan la Tierra para ver debajo de las densas arenas del desierto.",
            "Desde el espacio exterior, los científicos pueden detectar formas geométricas enterradas, indicando ruinas perdidas que no se ven a simple vista."
          ],
          image: "/assets/egypt/m15_satelite.png",
          style: "normal"
        },
        {
          id: "m15_sec2",
          title: "Tumbas Reveladas por Infrarrojos",
          text: [
            "Gracias a misiones espaciales como las imágenes de radar de la NASA, se han descubierto cientos de tumbas, ciudades enteras y misteriosas pirámides sepultadas.",
            "La diferencia de densidad entre la piedra enterrada y la arena blanda cambia el calor detectado por el satélite.",
            "Es increíble pensar que los satélites espaciales son nuestros nuevos 'ojos de Horus', desenterrando los secretos cósmicos del pasado."
          ],
          image: "/assets/egypt/hub_background.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      { q: "¿Cómo busca templos perdidos la arqueología moderna?", options: ["Con picos y palas al azar", "Con satélites infrarrojos desde la órbita terrestre", "Entrenando perros rastreadores", "Usando adivinos"], a: 1 },
      { q: "¿Qué tipo de energía térmica detectan los satélites para encontrar estructuras?", options: ["Rayos Gamma", "Imágenes y variaciones de radiación Infrarroja", "Ondas de sonido", "Luz Ultravioleta"], a: 1 },
      { q: "¿Por qué los satélites detectan edificios tapados por la arena?", options: ["Porque las piedras son mágicas", "Por la diferencia de densidad y temperatura entre la piedra y la arena", "Porque la arena es transparente", "Porque emiten señales de radio"], a: 1 },
      { q: "¿Qué agencia espacial ha colaborado en mapear Egipto?", options: ["La NASA", "El FBI", "Los bomberos", "Los hospitales"], a: 0 },
      { q: "¿Cómo podemos llamar a estos satélites simbólicamente?", options: ["Monstruos espaciales", "Nuevos 'ojos de Horus'", "Lunas falsas", "Estrellas fugaces"], a: 1 }
    ]
  }
];

// Helper to execute replacement in courseData.js
let fileData = fs.readFileSync('lib/courseData.js', 'utf8');

// The file exports const COURSE_DATA = [ ... ]
// We will extract the array, filter out the old egypt modules, and prepend the new ones.
// Due to pure string replacement being risky, we will find the array boundaries.
let startIdx = fileData.indexOf('export const COURSE_DATA = [');
if (startIdx === -1) {
    console.error("Could not find COURSE_DATA array start");
    process.exit(1);
}

// Find the opening bracket
let arrayStart = fileData.indexOf('[', startIdx);
let arrayString = fileData.slice(arrayStart);

// It's not safe to JSON.parse because it's a JS file. But it is standard JSON structure.
// Instead, let's use a regex to replace the old egypt_m1 ... egypt_m15 blocks.
// Wait, regex might fail on such a massive string. 
// A safer approach: I know I appended them exactly as I did before.
// Actually, earlier today I used:
// content = content.replace(/export const COURSE_DATA = \[/, `export const COURSE_DATA = [\n${egyptModulesString},`);
// That means the 15 modules are right at the beginning of the array.
// I will just use regex to remove everything from `export const COURSE_DATA = [` until the next module `sun` or `ciencia_volver_al_futuro`.
// Let's check what the first non-egypt module is. In `lib/courseData.js`, it is `sun`.
let match = fileData.match(/\{\s*"id":\s*"sun"/);
if (!match) {
   console.error("Could not find sun module");
   process.exit(1);
}

let beforeSun = fileData.slice(0, match.index);
let theRest = fileData.slice(match.index);

// We replace everything from `export const COURSE_DATA = [` in `beforeSun` with our new modules
let newArrayStart = `export const COURSE_DATA = [\n`;
let newModulesString = EGYPT_RICH_MODULES.map(m => JSON.stringify(m, null, 2)).join(',\n') + ',\n';

let newFileContent = fileData.slice(0, startIdx) + newArrayStart + newModulesString + theRest;

fs.writeFileSync('lib/courseData.js', newFileContent, 'utf8');
console.log("Successfully replaced egypt modules with rich content.");
