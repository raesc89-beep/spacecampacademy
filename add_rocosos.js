const fs = require('fs');

let data = fs.readFileSync('lib/courseData.js', 'utf8');

const newModules = [
  {
    id: 'rocosos_m1',
    hub: 'rocosos',
    title: 'Nacimiento de los mundos rocosos',
    description: 'El Origen, La Línea de Nieve y La Diferenciación.',
    badgeId: 'rocosos_badge_1',
    contentEs: {
      title: 'Módulo 1: El Nacimiento de los Mundos (Orígenes)',
      sections: [
        {
          id: 'rocosos_sec_1',
          title: 'La Gran Receta: De Polvo a Planetas',
          text: [
            'Hace aproximadamente 4,600 millones de años, nuestro Sistema Solar no era más que una nube gigante de gas y polvo llamada Nebulosa Solar. Debido a una perturbación (posiblemente una supernova cercana), esta nube colapsó bajo su propia gravedad, comenzando a girar como un disco de masa para pizza.',
            'El proceso por el cual se formaron los planetas rocosos se llama Acreción. Imagina que estás limpiando tu cuarto y se forman "pelusas" de polvo bajo la cama; al rodar, estas pelusas atrapan más polvo y se hacen grandes. En el espacio, los pequeños granos de polvo chocaron y se pegaron mediante fuerzas electrostáticas. Con el tiempo, estos objetos alcanzaron el tamaño de kilómetros, convirtiéndose en planetesimales. Cuando su masa fue lo suficientemente grande, la gravedad tomó el mando, atrayendo más material de forma violenta hasta formar los protoplanetas.'
          ],
          image: '/assets/media__1775539508676.png'
        },
        {
          id: 'rocosos_sec_2',
          title: 'La Línea de Nieve: El porqué de la Roca',
          text: [
            '¿Por qué Mercurio es de piedra y Júpiter de gas? La respuesta está en el calor del Sol joven. Cerca de la estrella, la temperatura era tan alta que los compuestos volátiles (como el agua, el metano y el amoníaco) no podían condensarse en forma de hielo; permanecían en estado gaseoso y eran "soplados" hacia afuera por el viento solar.',
            'Solo los materiales con puntos de fusión muy altos, como los metales (hierro, níquel) y los silicatos (rocas), pudieron mantenerse sólidos cerca del Sol. Esta frontera térmica se conoce como la Línea de Nieve (o Frost Line). Los planetas rocosos se formaron dentro de esta línea, recolectando los materiales pesados que sobraron de la formación del Sol.'
          ]
        },
        {
          id: 'rocosos_sec_3',
          title: 'Diferenciación: El Horno Planetario',
          text: [
            'Una vez que estos mundos rocosos crecieron, ocurrió un proceso crítico llamado Diferenciación Planetaria. Debido al calor generado por los impactos constantes y la desintegración radiactiva, los planetas se fundieron por completo.',
            'Los elementos más pesados (como el Hierro) se hundieron hacia el centro para formar el núcleo.',
            'Los materiales más ligeros (silicatos) flotaron hacia la superficie, enfriándose para formar el manto y la corteza.'
          ]
        }
      ]
    }
  },
  {
    id: 'rocosos_m2',
    hub: 'rocosos',
    title: 'Mercurio',
    description: 'Anatomía, encogimiento y geología de superficie.',
    badgeId: 'rocosos_badge_2',
    contentEs: {
      title: 'Módulo 2: Mercurio – El Pequeño con Corazón de Hierro',
      sections: [
        {
          id: 'rocosos_sec_4',
          title: 'Anatomía y el Misterio del Núcleo Gigante',
          text: [
            'Mercurio es el planeta de los extremos. Es el más pequeño del Sistema Solar (apenas un poco más grande que nuestra Luna) y el más cercano al Sol.',
            'Si cortáramos a Mercurio a la mitad, veríamos algo sorprendente: su núcleo de hierro ocupa casi el 85% de su radio. En comparación, el núcleo de la Tierra es mucho más pequeño proporcionalmente.',
            'Dato Científico: Se cree que Mercurio era originalmente mucho más grande, pero un impacto colosal en su juventud arrancó la mayor parte de su corteza y manto rocoso, dejando atrás principalmente el denso núcleo metálico. Su densidad es la segunda más alta del Sistema Solar (5.43 g/cm³).'
          ],
          image: '/assets/cartoon_mercury.png'
        },
        {
          id: 'rocosos_sec_5',
          title: 'Un Planeta que se Encoge',
          text: [
            'A diferencia de la Tierra, Mercurio no tiene tectónica de placas activa. A medida que su núcleo masivo se enfrió con el paso de los eones, el planeta literalmente se encogió.',
            'Este enfriamiento provocó que la corteza se rompiera y se amontonara sobre sí misma, creando enormes acantilados llamados Escarpas de Lóbulo. Algunas tienen cientos de kilómetros de largo y más de 1.5 km de altura. Es como una uva que se convierte en pasilla y se arruga.'
          ]
        },
        {
          id: 'rocosos_sec_6',
          title: 'Geología de Superficie y el Impacto de Caloris',
          text: [
            'La superficie de Mercurio es un registro fósil de la historia del Sistema Solar. Al no tener atmósfera que erosione las rocas, los cráteres permanecen intactos por miles de millones de años.',
            'Cuenca de Caloris: Es una de las estructuras de impacto más grandes del Sistema Solar (1,550 km de diámetro). El choque fue tan violento que las ondas de choque viajaron por todo el planeta, creando un "terreno caótico" de montañas rotas en el lado opuesto de Mercurio.'
          ]
        }
      ]
    }
  },
  {
    id: 'rocosos_m3',
    hub: 'rocosos',
    title: 'Venus',
    description: 'El gemelo malvado: Vulcanismo, presión y roca caliente.',
    badgeId: 'rocosos_badge_3',
    contentEs: {
      title: 'Módulo 3: Venus – El Espejo Caliente',
      sections: [
        {
          id: 'rocosos_sec_7',
          title: 'Vulcanismo Extremo',
          text: [
            'Venus es frecuentemente llamado el "gemelo malvado" de la Tierra debido a su tamaño similar, pero con condiciones de superficie radicalmente distintas.',
            'Venus tiene más volcanes que cualquier otro planeta en el Sistema Solar (se han contabilizado más de 1,600 principales). Su superficie está compuesta en un 90% por basalto, una roca volcánica oscura.',
            'Domos en "Panqueque": Son formaciones volcánicas únicas de Venus. Se crean cuando lava muy viscosa (espesa) sale a la superficie y se extiende uniformemente en todas direcciones, formando círculos planos de kilómetros de ancho.'
          ],
          image: '/assets/cartoon_venus.png'
        },
        {
          id: 'rocosos_sec_8',
          title: 'La Geología de la Presión',
          text: [
            'La atmósfera de Venus es tan densa (compuesta principalmente de CO2) que la presión en el suelo es 92 veces mayor que la de la Tierra. Para una roca en Venus, esto significa que está bajo una presión equivalente a estar a 900 metros bajo el océano terrestre.',
            'Tesserae: Son regiones de terreno altamente deformado, con crestas y valles que se cruzan. Representan los terrenos más antiguos de Venus y son evidencia de que en el pasado la corteza pudo haberse movido de formas complejas, aunque no exactamente como nuestras placas tectónicas.'
          ]
        },
        {
          id: 'rocosos_sec_9',
          title: 'Propiedades Rocosas y Mineralogía',
          text: [
            'Debido a la temperatura de 467°C (suficiente para fundir el plomo), no hay agua líquida. Esto impide que se formen ciertos minerales hidratados que son comunes en la Tierra. La roca venusiana es extremadamente seca y dura, lo que permite que las montañas mantengan alturas impresionantes a pesar del calor.'
          ]
        }
      ]
    }
  },
  {
    id: 'rocosos_m4',
    hub: 'rocosos',
    title: 'Tierra',
    description: 'Tectónica de placas, Geodinamo y el Agua.',
    badgeId: 'rocosos_badge_4',
    contentEs: {
      title: 'Módulo 4: La Tierra – La Roca Viva',
      sections: [
        {
          id: 'rocosos_sec_10',
          title: 'El Motor Interno: Tectónica de Placas',
          text: [
            'La Tierra no es solo nuestro hogar; es el único planeta rocoso conocido que tiene una geología "viva" y activa en este momento.',
            'A diferencia de Mercurio o Marte, la litosfera de la Tierra (la capa exterior rígida) no es una sola pieza, sino que está rota en grandes "rompecabezas" llamados placas tectónicas.',
            'Convección del Manto: Imagina una olla de sopa espesa hirviendo. El material caliente sube, se enfría y vuelve a bajar. Este movimiento en el manto terrestre mueve las placas, creando montañas cuando chocan y abriendo océanos cuando se separan.',
            'Reciclaje de Carbono: Este proceso es vital. La Tierra "traga" rocas viejas y devuelve gases a la atmósfera a través de volcanes, manteniendo el clima estable durante miles de millones de años.'
          ],
          image: '/assets/cartoon_earth.png'
        },
        {
          id: 'rocosos_sec_11',
          title: 'El Geodinamo: Nuestro Escudo Invisible',
          text: [
            'En el centro de la Tierra, a unos 5,000 km de profundidad, hay una esfera de hierro sólido rodeada por una capa de hierro y níquel líquidos.',
            'Electricidad y Magnetismo: Debido a la rotación de la Tierra, este metal líquido fluye y genera corrientes eléctricas, creando un gigantesco campo magnético.',
            'Propiedad Física: Este campo actúa como un "escudo de fuerza" (similar a los de las naves de ciencia ficción) que desvía las partículas cargadas del Sol. Sin este escudo, nuestra atmósfera habría sido arrancada hace mucho tiempo, convirtiéndonos en un desierto como Marte.'
          ]
        },
        {
          id: 'rocosos_sec_12',
          title: 'El Agua como Arquitecta Geográfica',
          text: [
            'En geología planetaria, el agua líquida es un agente de cambio único. En la Tierra, el agua no solo llena océanos, sino que tritura rocas.',
            'Erosión: A través de los siglos, el agua rompe los silicatos y transporta sedimentos, creando valles y llanuras fértiles.',
            'Sedimentación: La Tierra es el único planeta con vastas capas de rocas sedimentarias (como la caliza) que a menudo contienen fósiles, permitiéndonos leer la historia de la vida grabada en la piedra.'
          ]
        }
      ]
    }
  },
  {
    id: 'rocosos_m5',
    hub: 'rocosos',
    title: 'Marte',
    description: 'El Desierto Rojo, Olympus Mons y Valles Marineris.',
    badgeId: 'rocosos_badge_5',
    contentEs: {
      title: 'Módulo 5: Marte – El Desierto Rojo y Silencioso',
      sections: [
        {
          id: 'rocosos_sec_13',
          title: 'El Gigante del Sistema Solar: Olympus Mons',
          text: [
            'Marte es el destino más estudiado para la futura exploración humana. Su geología nos cuenta la historia de un planeta que alguna vez fue muy parecido a la Tierra.',
            'Marte alberga el volcán más grande de todo el vecindario solar: el Monte Olimpo. Tiene 25 km de altura (tres veces el Everest) y es tan ancho como el país de Francia.',
            '¿Por qué creció tanto?: Aquí la geología es clave. Como Marte no tiene tectónica de placas, el punto caliente de lava debajo de la corteza siempre estuvo en el mismo lugar durante millones de años, acumulando capa tras capa de lava sin que la montaña se moviera.'
          ],
          image: '/assets/cartoon_mars.png'
        },
        {
          id: 'rocosos_sec_14',
          title: 'Valles Marineris: La Cicatriz Planetaria',
          text: [
            'Si Olympus Mons es impresionante, el cañón de Valles Marineris no se queda atrás. Es un sistema de cañones de más de 4,000 km de largo.',
            'Origen Tectónico: A diferencia del Gran Cañón en la Tierra (hecho por un río), Valles Marineris es una grieta gigante causada por el estiramiento de la corteza marciana cuando la región volcánica cercana (Tharsis) se hinchó debido al magma.'
          ]
        },
        {
          id: 'rocosos_sec_15',
          title: 'El Regolito y el "Óxido"',
          text: [
            'El color rojo de Marte no es solo superficial. Se debe a la presencia de óxido de hierro (Fe2O3) en su regolito (suelo).',
            'Composición Química: El polvo marciano es extremadamente fino y tiene propiedades magnéticas. Debajo de esta capa de "óxido", las rocas son principalmente basaltos, similares a los que encontramos en Hawái o Islandia.',
            'El Misterio del Agua: Las rocas marcianas contienen minerales como la hematita y sulfatos, que en la Tierra solo se forman en presencia de agua líquida. Esto confirma que Marte tuvo ríos y lagos en su pasado remoto.'
          ]
        }
      ]
    }
  },
  {
    id: 'rocosos_m6',
    hub: 'rocosos',
    title: 'Geología comparada',
    description: 'Análisis de los mundos, cronometría de cráteres y minería espacial.',
    badgeId: 'rocosos_badge_6',
    contentEs: {
      title: 'Módulo 6: Geología Comparada y Propiedades Rocosas',
      sections: [
        {
          id: 'rocosos_sec_16',
          title: 'La Regla del Tamaño y el Enfriamiento',
          text: [
            'En este módulo final, analizamos los cuatro mundos como un conjunto para entender las leyes físicas que los rigen.',
            '¿Por qué Mercurio y Marte están "geológicamente muertos" (sin volcanes activos) mientras la Tierra y Venus siguen calientes?',
            'Relación Superficie-Volumen: Los objetos pequeños pierden calor más rápido que los objetos grandes. Mercurio y Marte, al ser pequeños, irradiaron su calor interno al espacio hace miles de millones de años, solidificando sus núcleos y deteniendo su actividad geológica. La Tierra, al ser más masiva, conserva su "horno central" encendido.'
          ],
          image: '/assets/cartoon_rocky_planets_journey_1777680650228.png'
        },
        {
          id: 'rocosos_sec_17',
          title: 'Cronometría de Cráteres',
          text: [
            'Los científicos usan los cráteres para saber qué tan vieja es la superficie de un planeta rocoso.',
            'Superficies Jóvenes vs. Viejas: Una superficie llena de cráteres (como Mercurio) indica que la roca no ha cambiado en miles de millones de años. Una superficie con pocos cráteres (como la Tierra o Venus) indica que procesos como el vulcanismo o la erosión han "borrado" las cicatrices de impactos antiguos, renovando la cara del planeta.'
          ]
        },
        {
          id: 'rocosos_sec_18',
          title: '¿Podemos vivir en sus rocas? (Minería Espacial)',
          text: [
            'Para los futuros astronautas, las rocas de estos planetas son recursos:',
            'Aluminio y Titanio: Abundantes en la corteza lunar y marciana para construir bases.',
            'Percloratos: Sales encontradas en el suelo de Marte que son tóxicas para los humanos, pero de las cuales se podría extraer oxígeno y combustible para cohetes.'
          ]
        }
      ]
    }
  }
];

if (data.includes('rocosos_m6')) {
  console.log('Already exists');
} else {
  const index = data.lastIndexOf('];');
  const newData = data.substring(0, index) + ',\n' + newModules.map(m => JSON.stringify(m, null, 2)).join(',\n') + '\n];';
  fs.writeFileSync('lib/courseData.js', newData);
  console.log('Appended Rocosos modules!');
}
