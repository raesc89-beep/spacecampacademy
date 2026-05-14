const fs = require('fs');

let data = fs.readFileSync('lib/courseData.js', 'utf8');

// The new modules for Objetos Interestelares
const newModules = [
  {
    id: 'interestelar_m1',
    hub: 'objetos-interestelares',
    title: '¿Qué es un Objeto Interestelar?',
    description: 'Nómadas del cosmos que cruzan nuestro vecindario solar.',
    badgeId: 'interestelar_badge_1',
    contentEs: {
      title: 'Módulo 1: Nómadas del Cosmos',
      sections: [
        {
          id: 'int_sec_1',
          title: 'Mensajeros de Otras Estrellas',
          text: [
            'Imagina un océano cósmico tan vasto que la luz tarda años en cruzar la distancia entre las islas estelares. En este abismo silencioso viajan objetos solitarios que no están atados a ninguna estrella. Estos son los objetos interestelares: cometas, asteroides o incluso planetas rebeldes que fueron expulsados de sus sistemas solares natales hace miles de millones de años.',
            'A diferencia de los cuerpos en nuestro Sistema Solar, que orbitan alrededor del Sol en órbitas elípticas predecibles, los objetos interestelares se mueven en trayectorias hiperbólicas. Esto significa que entran a nuestro vecindario a velocidades tan increíbles que la gravedad del Sol no puede atraparlos; son solo visitantes de paso.',
            'Carl Sagan solía decir que estamos hechos de materia estelar. Estos objetos son cápsulas del tiempo físicas, pedazos intactos de "materia estelar" provenientes de sistemas alienígenas. Estudiarlos es como recibir un telegrama encriptado de otra civilización o, más precisamente, de la cuna de otra estrella.',
            'Durante mucho tiempo, la existencia de estos objetos era solo una hipótesis matemática. Sabíamos que los sistemas planetarios en formación son caóticos y expulsan escombros, pero el espacio es tan inmenso que la probabilidad de que uno cruzara exactamente por nuestro patio trasero parecía astronómicamente pequeña.',
            'Sin embargo, nuestra tecnología de observación, como los telescopios de sondeo panorámico, se ha vuelto lo suficientemente sofisticada para detectar estas sombras veloces. Su descubrimiento ha inaugurado una nueva era en la astronomía: ya no tenemos que viajar a otras estrellas para estudiar su composición; la galaxia nos está enviando sus muestras.',
            'El viaje de un objeto interestelar es de una soledad inimaginable. Han viajado en la más profunda oscuridad y el frío absoluto del cero casi absoluto durante eones, hasta que, por un breve y brillante momento, son iluminados por nuestro Sol antes de desvanecerse nuevamente en la noche eterna.'
          ],
          image: '/assets/interestelar/obj1.png'
        }
      ]
    }
  },
  {
    id: 'interestelar_m2',
    hub: 'objetos-interestelares',
    title: 'Oumuamua: El Primer Mensajero',
    description: 'El misterioso cigarro cósmico de color rojizo.',
    badgeId: 'interestelar_badge_2',
    contentEs: {
      title: 'Módulo 2: Oumuamua',
      sections: [
        {
          id: 'int_sec_2',
          title: 'El Explorador (Oumuamua)',
          text: [
            'En octubre de 2017, el telescopio Pan-STARRS1 en Hawái detectó un tenue punto de luz moviéndose a una velocidad vertiginosa frente al fondo de estrellas. Su trayectoria era inequívoca: no provenía de nuestro Sistema Solar. Fue bautizado como \'Oumuamua, un término hawaiano que significa "mensajero que llega de lejos, primero".',
            'Lo más desconcertante de \'Oumuamua fue su forma. Las variaciones drásticas en su brillo sugirieron que no era esférico, sino extremadamente alargado, como un cigarro cósmico, o quizás plano como un panqueque, con dimensiones nunca antes vistas en cometas o asteroides locales. Era de un color rojizo oscuro, indicando una superficie cocida por la radiación cósmica durante millones de años.',
            'A diferencia de los cometas de nuestro sistema, \'Oumuamua no mostró una coma o cola de polvo al acercarse al Sol. Parecía un asteroide inerte y seco. Sin embargo, al alejarse del Sol, experimentó una aceleración anómala, un empuje adicional que no podía explicarse únicamente por la gravedad solar.',
            'Esta aceleración desató debates apasionados. ¿Era la desgasificación invisible de un hielo desconocido? ¿O, como algunos científicos propusieron audazmente, podría ser una vela solar artificial, un artefacto de una civilización alienígena extinta? Aunque la hipótesis del hielo de nitrógeno es la más aceptada, el misterio persiste.',
            'Al estilo de la majestuosidad que describía Sagan, \'Oumuamua nos recordó lo mucho que ignoramos sobre el cosmos. Un fragmento de otro mundo cruzó nuestro cielo, nos rozó brevemente y se alejó hacia la constelación de Pegaso, dejándonos con más preguntas que respuestas.',
            'Hoy, \'Oumuamua ya está más allá de la órbita de Neptuno, demasiado lejos y tenue para ser visto. Su breve visita fue un destello de revelación cósmica, el primer apretón de manos con la inmensidad del medio interestelar.'
          ],
          image: '/assets/interestelar/oumuamua.png'
        }
      ]
    }
  },
  {
    id: 'interestelar_m3',
    hub: 'objetos-interestelares',
    title: '2I/Borisov',
    description: 'El primer cometa interestelar confirmado.',
    badgeId: 'interestelar_badge_3',
    contentEs: {
      title: 'Módulo 3: 2I/Borisov',
      sections: [
        {
          id: 'int_sec_3',
          title: 'El Cometa Alienígena',
          text: [
            'Si \'Oumuamua fue un visitante enigmático y anómalo, el segundo objeto interestelar descubierto, 2I/Borisov, resultó ser confortablemente familiar. Descubierto en 2019 por el astrónomo aficionado Gennadiy Borisov, este objeto no ocultaba su naturaleza: era un cometa hecho y derecho, con su brillante coma y su larga cola de polvo.',
            'Lo fascinante de 2I/Borisov no fue su extrañeza, sino su similitud con los cometas de nuestro propio Sistema Solar. Estaba compuesto por agua, monóxido de carbono y polvo, una mezcla de hielos y rocas que nos dice que los procesos químicos que formaron nuestro mundo también ocurren en las lejanías de la galaxia.',
            'Sin embargo, análisis detallados revelaron que Borisov tenía una concentración excepcionalmente alta de monóxido de carbono en comparación con los cometas locales. Esto sugiere que se formó en un entorno extremadamente frío, en las afueras de una enana roja, la clase de estrella más común en la Vía Láctea.',
            'A medida que se acercaba al Sol, el calor estelar sublimó sus hielos alienígenas, liberando moléculas prístinas atrapadas durante miles de millones de años. Los telescopios terrestres y espaciales capturaron su firma espectral, probando por primera vez el "sabor" químico de otro sistema estelar.',
            'Parafraseando el asombro de Sagan: 2I/Borisov fue una bola de nieve sucia arrojada a través del vacío galáctico, una prueba tangible de que la química de la vida y la construcción planetaria es universal, tejida en las mismas leyes de la física a lo largo y ancho del cosmos.',
            'Tras sobrevivir a su máximo acercamiento al Sol, 2I/Borisov continuó su viaje infinito, perdiéndose de nuevo en la oscuridad, habiendo compartido valientemente sus secretos con los curiosos habitantes del tercer planeta.'
          ],
          image: '/assets/interestelar/borisov.png'
        }
      ]
    }
  },
  {
    id: 'interestelar_m4',
    hub: 'objetos-interestelares',
    title: '3I Atlas',
    description: 'La promesa y el misterio de los cometas interestelares.',
    badgeId: 'interestelar_badge_4',
    contentEs: {
      title: 'Módulo 4: El Fenómeno ATLAS',
      sections: [
        {
          id: 'int_sec_4',
          title: 'Ecos del Sistema ATLAS',
          text: [
            'Aunque el nombre ATLAS a menudo se asocia con sistemas de alerta de asteroides y cometas espectaculares (como el cometa C/2019 Y4 ATLAS que se fragmentó de manera dramática), el concepto de un "3I" (el tercer objeto interestelar) representa la próxima frontera inminente en nuestra vigilancia del cielo.',
            'Nuestros sistemas automatizados escanean el cielo nocturno implacablemente. Cuando el cometa ATLAS local se acercó y se hizo pedazos bajo el escrutinio de nuestros telescopios, nos enseñó una lección brutal sobre la fragilidad de estos cuerpos helados cuando se enfrentan a la furia de una estrella.',
            'Un futuro objeto 3I similar nos daría una oportunidad única: la posibilidad de observar la fragmentación de un núcleo cometario alienígena. Si un objeto interestelar se rompe en nuestro patio, podríamos mirar sus "entrañas", analizando directamente el núcleo primigenio no alterado por la radiación.',
            'En el vasto océano del espacio, la materia no es destruida, sino transformada. La fragmentación de cometas libera compuestos orgánicos complejos, sembrando polvo estelar en los vientos del Sistema Solar, como la brisa que esparce semillas en un valle.',
            'Carl Sagan nos enseñó a ver la belleza en estas interacciones violentas. Cada objeto que entra y se desintegra deja una marca química, una pequeña contribución al inventario cósmico de nuestro vecindario. La caza de 3I continúa, esperando al próximo embajador galáctico.',
            'Con la inminente puesta en marcha de mega-observatorios como el Observatorio Vera C. Rubin, se estima que pasaremos de detectar un objeto interestelar cada pocos años, a encontrar decenas de ellos, transformando para siempre nuestro entendimiento de la ecología galáctica.'
          ],
          image: '/assets/interestelar/atlas.png'
        }
      ]
    }
  },
  {
    id: 'interestelar_m5',
    hub: 'objetos-interestelares',
    title: 'La Nube de Oort: La Frontera',
    description: 'El inmenso caparazón helado que envuelve nuestro sistema.',
    badgeId: 'interestelar_badge_5',
    contentEs: {
      title: 'Módulo 5: La Nube de Oort',
      sections: [
        {
          id: 'int_sec_5',
          title: 'El Límite del Dominio Solar',
          text: [
            'A una distancia donde el Sol no es más que una estrella brillante entre miles, se extiende una inmensa esfera de billones de cuerpos helados: La Nube de Oort. Esta es la verdadera frontera de nuestro Sistema Solar, un caparazón invisible que marca el fin de la influencia gravitacional primaria de nuestra estrella.',
            'A diferencia de los planetas que orbitan en un disco plano, la Nube de Oort envuelve al sistema en una burbuja tridimensional. Sus habitantes son reliquias congeladas de la formación del Sistema Solar, expulsadas a los confines oscuros hace 4.500 millones de años por la gravedad de los planetas gigantes.',
            'A pesar de su enorme población teórica, la distancia entre un cometa y otro en esta nube es de decenas de millones de kilómetros. Es un reino de oscuridad, silencio y frío absoluto. Aquí, las perturbaciones más leves, como el paso de una estrella vecina o la marea galáctica, pueden empujar a un cometa hacia el interior, iniciando un viaje de milenios hacia la Tierra.',
            'La Nube de Oort también actúa como el "puerto cósmico" donde los objetos interestelares entran y salen. Un cometa de otro sistema estelar debe atravesar esta inmensa barrera helada antes de llegar al Sistema Solar interior. ¿Cuántos Oumuamuas o Borisovs estarán flotando silenciosamente en nuestra propia Nube de Oort en este mismo instante?',
            'Visualizar la Nube de Oort, como lo haría Sagan, es apreciar nuestra burbuja de existencia. Es la piel exterior de nuestra "pálida mota azul" ampliada a escala estelar, rozando los bordes con los sistemas vecinos del cosmos.',
            'Hasta el día de hoy, ninguna nave humana ha alcanzado siquiera el borde interior de la Nube de Oort; nos tomará miles de años llegar allí. Por ahora, sigue siendo una frontera teórica, pero esencial para entender la arquitectura majestuosa de nuestro hogar cósmico.'
          ],
          image: '/assets/interestelar/oort.png'
        }
      ]
    }
  },
  {
    id: 'interestelar_m6',
    hub: 'objetos-interestelares',
    title: 'Voyager 1 y 2: Exploradores del Vacío',
    description: 'Nuestros embajadores robóticos en el medio interestelar.',
    badgeId: 'interestelar_badge_6',
    contentEs: {
      title: 'Módulo 6: Voyager',
      sections: [
        {
          id: 'int_sec_6',
          title: 'Hacia la Oscuridad Interminable',
          text: [
            'Lanzadas en 1977 en un "Gran Tour" por los planetas exteriores, las sondas gemelas Voyager 1 y 2 lograron lo que ninguna máquina había hecho antes: escapar de la burbuja magnética del Sol, la heliosfera, y entrar en el espacio interestelar.',
            'Estas frágiles exploradoras llevan consigo los instrumentos que nos permitieron medir por primera vez la "nada" entre las estrellas. Descubrieron que el medio interestelar no está vacío, sino surcado por ondas de plasma, rayos cósmicos y los sutiles vientos magnéticos de explosiones estelares distantes.',
            'Carl Sagan estuvo íntimamente ligado a esta misión, encabezando el equipo que diseñó el "Disco de Oro", un fonógrafo de cobre chapado en oro fijado al lateral de las naves. Contiene sonidos de la Tierra, saludos en 55 idiomas y música humana, un mensaje embotellado en el océano cósmico con una esperanza de vida de miles de millones de años.',
            'La Voyager 1 viaja a más de 60,000 km/h alejándose del Sol. Aunque eventualmente sus reactores nucleares de plutonio se apagarán y sus transmisores quedarán en silencio, su viaje físico no terminará. Continuarán orbitando el centro de la Vía Láctea para siempre, embajadores de silicio y oro de un planeta azul pálido.',
            'Si \'Oumuamua fue su emisario hacia nosotros, las naves Voyager son nuestros emisarios hacia ellos. Son objetos interestelares artificiales, creados no por el colapso gravitacional de nebulosas, sino por la curiosidad de una especie que apenas ha comenzado a abrir los ojos al universo.',
            'Mientras orbitamos nuestro Sol, debemos recordar que nuestras máquinas ya tocan la eternidad. Las Voyager son el primer paso de la humanidad hacia las estrellas, un testimonio de que, por un breve momento cósmico, estuvimos aquí y fuimos capaces de soñar más allá del cielo.'
          ],
          image: '/assets/interestelar/voyager.png'
        }
      ]
    }
  }
];

// Reemplazar la entrada vieja de objetos_interestelares
const regex = /\{\s*id:\s*['"]objetos_interestelares['"][\s\S]*?(?=\},\s*\{|\}\s*\])/g;

if (data.match(regex)) {
  data = data.replace(regex, newModules.map(m => JSON.stringify(m, null, 2)).join(',\n'));
} else {
  // if not found, just append before the last bracket
  data = data.replace(/\];?\s*$/, ',\n' + newModules.map(m => JSON.stringify(m, null, 2)).join(',\n') + '\n];');
}

fs.writeFileSync('lib/courseData.js', data);
console.log('Interstellar modules updated!');
