/**
 * rebuild_egypt_all.js
 * Expands all egypt modules (both sets) from 10 → 15 paragraphs each.
 */
const fs = require('fs');
const path = require('path');
const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

function findSectionsRange(text, moduleId) {
  const s1 = '"id": "' + moduleId + '"';
  const s2 = '"id":"' + moduleId + '"';
  let idIdx = text.indexOf(s1);
  if (idIdx < 0) idIdx = text.indexOf(s2);
  if (idIdx < 0) return null;
  const ceIdx = text.indexOf('"contentEs"', idIdx);
  if (ceIdx < 0 || ceIdx - idIdx > 5000) return null;
  const sectIdx = text.indexOf('"sections"', ceIdx);
  if (sectIdx < 0) return null;
  const arrStart = text.indexOf('[', sectIdx);
  if (arrStart < 0) return null;
  let depth = 0, arrEnd = arrStart;
  for (let i = arrStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  return { arrStart, arrEnd };
}

function replaceModule(moduleId, newSections) {
  let text = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  // Find the SECOND occurrence if the first is not found past a reasonable point
  let searchStart = 0;
  while (true) {
    const s1 = '"id": "' + moduleId + '"';
    const s2 = '"id":"' + moduleId + '"';
    let idIdx = text.indexOf(s1, searchStart);
    if (idIdx < 0) idIdx = text.indexOf(s2, searchStart);
    if (idIdx < 0) { console.error('NOT FOUND: ' + moduleId); return; }
    const ceIdx = text.indexOf('"contentEs"', idIdx);
    if (ceIdx < 0 || ceIdx - idIdx > 5000) { searchStart = idIdx + 1; continue; }
    const sectIdx = text.indexOf('"sections"', ceIdx);
    if (sectIdx < 0) { searchStart = idIdx + 1; continue; }
    const arrStart = text.indexOf('[', sectIdx);
    if (arrStart < 0) { searchStart = idIdx + 1; continue; }
    let depth = 0, arrEnd = arrStart;
    for (let i = arrStart; i < text.length; i++) {
      if (text[i] === '[') depth++;
      else if (text[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
    }
    const newArr = JSON.stringify(newSections, null, 6);
    text = text.substring(0, arrStart) + newArr + text.substring(arrEnd + 1);
    fs.writeFileSync(COURSE_DATA_PATH, text, 'utf8');
    const totalParas = newSections.reduce((s, x) => s + x.text.length, 0);
    console.log('✓ ' + moduleId + ': ' + totalParas + ' paragraphs');
    return;
  }
}

// Egypt Module content map — both ID sets
const EGYPT_MODULES = {
  egypt_m3: {
    title: 'Sopdet y Sirio',
    s1: { t: 'La Estrella más Brillante del Cielo', img: '/assets/egypt/egypt_m3.png', text: [
      '**Sopdet** era para los antiguos egipcios mucho más que una simple estrella: era una diosa viva que anunciaba el inicio del nuevo año. Nosotros la conocemos hoy como **Sirio**, la estrella más brillante del cielo nocturno, con una magnitud aparente de −1.46. Los astrónomos modernos la llaman también la Estrella del Can, porque pertenece a la constelación del Can Mayor.',
      'Cada año, después de 70 días oculta bajo el horizonte, Sirio volvía a aparecer justo antes del amanecer en el horizonte este. Los egipcios llamaban a este fenómeno el **"salida heliaca"** de Sopdet. Cuando la veían por primera vez en el amanecer, sabían que el río Nilo estaba a punto de inundarse, llenando de lodo fértil sus campos.',
      'La **inundación anual del Nilo** era la fuente de vida de todo Egipto. Sin ella, los cultivos morirían, el ganado moriría y el pueblo moriría. Por eso, que una estrella pudiera predecir su llegada con semanas de anticipación era casi un milagro. Los sacerdotes-astrónomos de Egipto observaban a Sopdet con una devoción religiosa enorme.',
      'Los egipcios usaban la reaparición de Sirio para marcar el inicio de su **Año Nuevo**, que llamaban "Wp Rnpt" o "Apertura del Año". Esta fecha coincidía aproximadamente con el solsticio de verano en el norte, alrededor del 19 de julio según nuestro calendario. Las festividades duraban varios días y se celebraban con ofrendas a los dioses.',
      'La diosa Sopdet era representada como una mujer con una estrella de cinco puntas sobre su cabeza, a veces también como una vaca con un disco solar entre sus cuernos. En los Textos de las Pirámides —los textos funerarios más antiguos del mundo, escritos hace 4.400 años— se describe cómo Sopdet guía el alma del faraón difunto hacia las estrellas imperecederas del norte.',
    ]},
    s2: { t: 'El Ciclo Sótico y la Precisión Astronómica', img: '/assets/egypt/egypt_m3b.png', text: [
      'Hay un misterio fascinante en la astronomía egipcia: el **ciclo sótico**. Los egipcios usaban un calendario de 365 días exactos. Pero el año solar real tiene 365,25 días. Eso significa que cada cuatro años, la salida heliaca de Sirio se atrasaba un día respecto al calendario civil egipcio.',
      'Después de **1.460 años** (4 × 365), Sirio volvía a coincidir exactamente con la misma fecha del calendario civil. A este período lo llamamos "ciclo sótico" (de Sothis, el nombre griego de Sopdet). ¡Los egipcios descubrieron este ciclo siglos antes de que los romanos inventaran el año bisiesto!',
      'El astrónomo romano **Censorino** registró en el año 238 d.C. que un ciclo sótico acababa de comenzar. Calculando hacia atrás, los historiadores han determinado que ciclos anteriores comenzaron en los años 1322 a.C. y 2782 a.C. Estas fechas son cruciales para construir la cronología del Antiguo Egipto.',
      'La importancia de Sirio no se limitaba al calendario. En la astronomía egipcia, **Sirio marcaba el sur**. Los constructores de templos la usaban como guía de orientación, igual que los marineros de hoy usan la Estrella Polar para encontrar el norte. Varios templos en el Alto Egipto tienen sus ejes principales alineados con la salida de Sirio.',
      'Sirio es en realidad un sistema de **dos estrellas** que orbitan juntas: Sirio A (la brillante que vemos) y Sirio B (una enana blanca diminuta). Esta pareja de estrellas está a solo 8,6 años luz de distancia del Sol, siendo uno de nuestros vecinos estelares más cercanos. Los egipcios no sabían nada de esto, ¡pero su observación era impecable!',
    ]},
    s3: { t: 'Sopdet en la Cultura y el Arte Egipcio', img: '/assets/egypt/egypt_m3c.png', text: [
      'En los **Textos de los Ataúdes**, escritos para proteger a los difuntos en el Más Allá, Sopdet es descrita como la madre que amamanta al faraón en el cielo, convirtiéndolo en una estrella. Esta creencia refleja cómo los egipcios veían las estrellas: no como bolas de gas lejanas, sino como seres vivos con poderes mágicos.',
      'El templo de **Isis en Dendera** tiene una pequeña sala especial orientada para que Sirio aparezca por una estrecha ventana en el momento exacto de su salida heliaca. Isis y Sopdet se fusionaron en una sola diosa en el período ptolemaico (332-30 a.C.), cuando Egipto estaba gobernado por los descendientes griegos de Alejandro Magno.',
      'En Grecia y Roma, Sirio era conocida como la "estrella del Can" y se le temía. Los griegos creían que durante los **"días del perro"** (cuando Sirio salía al mismo tiempo que el Sol, en verano), el calor era más intenso, las personas se volvían locas y los perros rabiosos. De ahí viene la expresión "días caniculares" que aún usamos en español.',
      'La NASA ha explorado el sistema de Sirio con telescopios espaciales. En 2022, el **Telescopio Espacial James Webb** obtuvo imágenes de Sirio B con una claridad sin precedentes. Sirio B era mucho más grande que el Sol hace 250 millones de años, cuando era una estrella normal, pero ahora ha colapsado en una enana blanca del tamaño de la Tierra pero con la masa del Sol.',
      'Hoy podemos ver a Sirio a simple vista en invierno y principios de primavera desde España y América Latina. Busca la constelación de Orión (las tres estrellas en fila) y sigue la línea hacia abajo y a la izquierda: ahí está Sirio, brillando como un diamante blanco-azulado. Cada vez que la veas, recuerda que los egipcios la miraban hace 5.000 años, ¡con la misma emoción que tú!',
    ]}
  },

  egypt_m4: {
    title: 'Mesjetiu: La Osa Mayor',
    s1: { t: 'La Pata de Buey en el Cielo', img: '/assets/egypt/egypt_m4.png', text: [
      'En el cielo nocturno del norte encontramos un grupo de siete estrellas brillantes que forman una figura inconfundible: la que nosotros llamamos la **Osa Mayor** o el "Carro". Para los antiguos egipcios, estas mismas estrellas formaban la pata delantera de un toro celestial, y la llamaban **Mesjetiu** o "la Pata del Toro".',
      'Según la mitología egipcia, el dios del caos **Seth** mató a Osiris y fue castigado por ello. Como parte de su castigo, Seth fue transformado en un hipopótamo y encadenado al polo norte del cielo, incapaz de escapar. La constelación de Mesjetiu representa la pata de toro que Seth perdió durante la batalla con Horus, el hijo vengador de Osiris.',
      'Lo más asombroso de Mesjetiu es que es una **constelación circumpolar**: nunca se pone bajo el horizonte desde Egipto. Si observas la Osa Mayor durante toda la noche, verás que gira lentamente alrededor de la Estrella Polar, pero nunca desaparece. Los egipcios notaron esto y llamaron a estas estrellas las "**Ikhemu-sek**", que significa "las que no se destruyen" o "las imperecederas".',
      'Esta característica —nunca morir, nunca desaparecer— las hacía perfectas para representar la **inmortalidad**. Los faraones aspiraban a convertirse en estrellas imperecederas después de la muerte. Las pirámides estaban orientadas con precisión hacia el norte, apuntando hacia el polo celeste, el punto alrededor del cual giraban Mesjetiu y las demás estrellas circumpolares.',
      'Los constructores egipcios usaban Mesjetiu para un propósito muy práctico: **encontrar el norte verdadero** con una precisión sorprendente. Usando una herramienta llamada "bay" (un palo de palmera con una ranura en V) y observando el movimiento de dos estrellas de la constelación, podían trazar la línea norte-sur con un error de menos de medio grado. ¡Era como tener una brújula estelar!',
    ]},
    s2: { t: 'La Ceremonia de "Tensión de la Cuerda"', img: '/assets/egypt/egypt_m4b.png', text: [
      'Antes de construir un templo o una pirámide, los faraones realizaban la ceremonia ritual del **"Pedj-Shes"** (Tensión de la Cuerda), con la que marcaban el eje sagrado norte-sur del edificio. En esta ceremonia participaba el faraón junto a una sacerdotisa que representaba a la diosa Seshat, patrona de la escritura y la arquitectura.',
      'Durante la ceremonia, el faraón y Seshat clavaban estacas de madera conectadas con una cuerda, orientándolas observando a **Mesjetiu** durante la noche. La cuerda tirante definía el eje del futuro edificio sagrado. En los relieves del Templo de Edfu, construido hace 2.200 años, pueden verse imágenes detalladas de esta ceremonia astronómica.',
      'Los astrónomos modernos han analizado la orientación de **decenas de templos egipcios** y han confirmado que muchos están alineados con el norte estelar (no el norte magnético), lo que prueba que los constructores usaban las estrellas como guía. El error promedio de alineación es de solo 0,5 grados. ¡Una precisión increíble para constructores del año 2500 a.C.!',
      'La Estrella Polar que usamos hoy (**Polaris, en la Osa Menor**) no existía como estrella polar para los egipcios. En esa época, el polo norte celeste apuntaba hacia la estrella **Thuban**, en la constelación del Dragón. Esta diferencia se debe a un fenómeno llamado "precesión de los equinoccios": el eje de la Tierra gira lentamente como un trompo, tardando 26.000 años en completar una vuelta completa.',
      'La gran pirámide de Keops tiene un estrecho túnel que apuntaba directamente a Thuban en el año 2500 a.C. Algunos investigadores creen que este túnel servía para que el alma del faraón viajara directamente al polo celeste, el "ombligo del universo" para los egipcios. Con cada noche que pasa, Thuban se mueve ligeramente, pero durante miles de años fue la estrella más cercana al polo norte celeste.',
    ]},
    s3: { t: 'Mesjetiu en la Astronomía Moderna', img: '/assets/egypt/egypt_m4c.png', text: [
      'La Osa Mayor es hoy una de las constelaciones más conocidas del mundo, y sirve como punto de partida para encontrar la Estrella Polar: basta con prolongar la línea de las dos estrellas del extremo del "carro" (Dubhe y Merak) unas cinco veces hacia el norte para llegar a **Polaris**. Los marineros han usado este truco durante siglos.',
      'Las siete estrellas principales de la Osa Mayor están a distancias muy distintas de la Tierra: desde 58 hasta 210 años luz. Sin embargo, cinco de ellas forman parte de un mismo **grupo estelar en movimiento**, nacidas juntas de la misma nebulosa hace unos 500 millones de años. Dentro de 50.000 años, la forma de la constelación será irreconocible porque estas estrellas se mueven en diferentes direcciones.',
      'Mizar, la segunda estrella desde el extremo del mango del "carro", fue la **primera estrella doble descubierta con telescopio** en 1617 por Benedetto Castelli, alumno de Galileo. Si tienes buena visión, puedes ver junto a Mizar una estrella más tenue llamada Alcor: los árabes la usaban como prueba de agudeza visual. ¡Dos mil quinientos años después de los egipcios, Mizar sigue siendo una estrella científicamente fascinante!',
      'En muchas culturas alrededor del mundo, el grupo de siete estrellas de la Osa Mayor ha sido reconocido e interpretado de maneras distintas. Los hindúes las llaman los Siete Sabios (Saptarishi). Los chinos las ven como parte del Palacio Púrpura Imperial. Los nativos americanos de las Grandes Llanuras las llaman el Gran Oso. Esta universalidad cultural muestra cuán evidente resulta este patrón estelar para el ojo humano.',
      'La misión **Gaia de la ESA** (Agencia Espacial Europea), lanzada en 2013, ha medido con una precisión sin precedentes la posición y movimiento de más de 1.000 millones de estrellas, incluyendo las de la Osa Mayor. Gracias a Gaia, ahora podemos crear animaciones que muestran cómo ha cambiado y cambiará la forma de las constelaciones a lo largo de millones de años: las mismas estrellas que adoraron los faraones, vistas con ojos del siglo XXI.',
    ]}
  },
};

// Process all egypt modules
for (const [moduleId, data] of Object.entries(EGYPT_MODULES)) {
  const newSections = [
    { id: moduleId + '_s1', title: data.s1.t, image: data.s1.img, text: data.s1.text },
    { id: moduleId + '_s2', title: data.s2.t, image: data.s2.img, text: data.s2.text },
    { id: moduleId + '_s3', title: data.s3.t, image: data.s3.img, text: data.s3.text },
  ];
  replaceModule(moduleId, newSections);
}

console.log('\nEgypt A done!');
