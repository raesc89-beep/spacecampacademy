const fs = require('fs');
let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

function getSpecificText(title) {
  const t = title.toLowerCase();
  
  // Carrera Histórica / Pioneros
  if (t.includes('pioneros mecánicos')) return "Antes de los sofisticados rovers modernos, las misiones Viking y las sondas Mariner de la NASA fueron nuestros primeros pioneros mecánicos. Llegaron en la década de 1970 para fotografiar Marte y analizar químicamente su suelo estacionario, buscando las primeras pistas de microorganismos extraterrestres.";
  if (t.includes('luna rusa')) return "Mucho antes de que los rovers recorrieran Marte, el programa espacial soviético demostró con sus 'Lunokhod' que era posible operar y conducir robots a control remoto en la superficie de la Luna, sentando las bases tecnológicas para toda la exploración interplanetaria moderna.";
  if (t.includes('peligro de marte')) return "Aterrizar en Marte es estadísticamente uno de los mayores desafíos de la ingeniería aeroespacial. Su delgada atmósfera apenas frena las naves, pero es lo suficientemente densa como para quemarlas. Históricamente, el planeta rojo ha destruido casi la mitad de las misiones enviadas.";
  if (t.includes('familia robótica')) return "A lo largo de las décadas, la humanidad ha construido un verdadero árbol genealógico robótico: desde el modesto y pequeño Sojourner hasta gigantes nucleares como Curiosity y Perseverance. Cada nueva máquina hereda y perfecciona la tecnología de su predecesor inmediato.";
  
  // Sojourner
  if (t.includes('primer robot')) return "Sojourner hizo historia al convertirse en el primer vehículo en rodar de forma autónoma por otro planeta. Este pequeño robot inauguró una nueva era de geología móvil en 1997, demostrando que podíamos explorar mundos distantes con máquinas sobre ruedas.";
  if (t.includes('microondas')) return "Con apenas 11.5 kilogramos de peso y un tamaño no mayor al de un horno de microondas convencional, el rover Sojourner revolucionó la exploración espacial. Su diseño compacto lo hacía perfecto para sortear ágilmente las peligrosas rocas marcianas.";
  if (t.includes('energía solar mágica')) return "Sojourner dependía completamente de un pequeño pero eficiente panel solar montado en su parte superior. Este panel alimentaba sus sistemas, permitiéndole sobrevivir durante el gélido día marciano, aunque lo obligaba a 'dormir' cuando el Sol se ocultaba.";
  if (t.includes('juguete')) return "A simple vista, Sojourner parecía un juguete robótico controlado a radio, pero en realidad era un avanzado laboratorio móvil. Su tamaño miniatura fue clave para demostrar la viabilidad de enviar vehículos ligeros y económicos al duro clima marciano.";
  
  // Spirit / Opportunity
  if (t.includes('explorador gemelo')) return "Los rovers Spirit y Opportunity nacieron como gemelos idénticos lanzados con semanas de diferencia. Fueron diseñados como geólogos robóticos, equipados con cámaras panorámicas y brazos robóticos para investigar las pistas del pasado acuático de Marte.";
  if (t.includes('buscando agua')) return "La misión principal de estos gemelos era rotunda: 'Seguir el agua'. Buscarían pistas mineralógicas que indicaran que Marte, hoy un desierto congelado y estéril, alguna vez albergó lagos, ríos o incluso océanos cálidos en su superficie.";
  if (t.includes('arándano')) return "Opportunity hizo un hallazgo asombroso: pequeñas esferas ricas en hematita, apodadas cariñosamente 'arándanos marcianos'. Estas formaciones rocosas solo pueden cristalizarse en presencia prolongada de agua subterránea líquida, confirmando el pasado húmedo de Marte.";
  if (t.includes('90 días')) return "Originalmente, la NASA diseñó a Spirit y Opportunity para una corta misión de 90 días marcianos (soles). Nadie esperaba que estos resilientes robots sobrevivieran años enteros explorando cráteres y escalando colinas mucho más allá de su garantía de vida útil.";
  
  // Curiosity
  if (t.includes('laboratorio rodante')) return "Curiosity no es solo un rover, es el laboratorio analítico rodante más grande jamás enviado al espacio. Del tamaño de un automóvil compacto, carga en su interior hornos miniatura y centrifugadoras para analizar polvo de roca y buscar compuestos orgánicos complejos.";
  if (t.includes('aterrizaje de película')) return "Curiosity era demasiado pesado para usar bolsas de aire. Su llegada introdujo la maniobra de la 'Grúa Celestial', donde un jetpack flotante descendió suavemente al rover con cables hasta posarlo sobre sus ruedas en un descenso absolutamente espectacular e inédito.";
  if (t.includes('cráter gale')) return "El Cráter Gale fue elegido como sitio de aterrizaje de Curiosity porque alberga el enorme Monte Sharp. Las capas sedimentarias de esta montaña son como las páginas de un libro de historia geológica que relatan el secado gradual del planeta Marte a lo largo de eones.";
  if (t.includes('láseres y fuego')) return "Equipado con el instrumento ChemCam, Curiosity dispara un poderoso rayo láser capaz de vaporizar rocas a siete metros de distancia. Al estudiar el espectro de luz del plasma generado, los científicos pueden identificar la composición química exacta de la roca sin siquiera tocarla.";
  
  // Perseverance
  if (t.includes('más moderno')) return "Perseverance (Percy) es la culminación actual de la ingeniería planetaria. Basado en el chasis de Curiosity, está diseñado no solo para buscar entornos habitables antiguos, sino para cazar activamente firmas de vida microscópica fosilizada en Marte.";
  if (t.includes('delta del río')) return "El cráter Jezero fue seleccionado para Perseverance porque claramente alberga los restos de un antiguo delta de un río marciano. Si alguna vez existió vida marciana, los sedimentos arcillosos de este delta son el lugar con mayor probabilidad de conservar sus huellas fósiles.";
  if (t.includes('recolector de tesoros')) return "A diferencia de misiones pasadas, Perseverance está perforando, sellando y almacenando meticulosamente núcleos prístinos de roca en pequeños tubos de titanio. Estos invaluables tubos serán recogidos por una futura misión para ser traídos y estudiados en la Tierra.";
  
  // Ingenuity
  if (t.includes('pequeño volador')) return "El helicóptero Ingenuity demostró algo que muchos creían imposible: el vuelo controlado e impulsado por motor en otro planeta. Demostró ser el equivalente marciano del histórico primer vuelo de los hermanos Wright en la Tierra.";
  if (t.includes('casi inexistente')) return "La atmósfera de Marte es apenas el 1% de la densidad de la Tierra. Para lograr sustentación en un aire tan delgado, las largas hélices de fibra de carbono de Ingenuity deben girar a una velocidad increíble de 2,400 revoluciones por minuto.";
  if (t.includes('hélice')) return "Las enormes hélices contrarrotativas súper rápidas de Ingenuity son una maravilla de la ingeniería aerodinámica. Tienen que batir el escaso aire marciano con extrema agresividad para elevar su cuerpo de apenas 1.8 kilogramos del suelo oxidado.";
  if (t.includes('piloto perfecto')) return "Debido a los largos minutos de retraso en las comunicaciones de radio entre la Tierra y Marte, Ingenuity no se controla con un joystick. El helicóptero debe ser totalmente autónomo, usando su propia cámara para calcular su vuelo, evitar rocas y aterrizar a salvo.";

  // Fallback si no coincide nada (genérico pero interesante)
  return "Analizando los datos espectrográficos de esta sección, los ingenieros espaciales y astrobiólogos han desenterrado pistas vitales que nos ayudan a comprender la intrincada evolución climática y el pasado acuoso de nuestro planeta vecino.";
}

let c = 0;
data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    mod.contentEs.sections.forEach(sec => {
      // Reemplazamos el array de 'text' con un solo prrafo denso y especfico
      sec.text = [ getSpecificText(sec.title) ];
      c++;
    });
  }
});

fs.writeFileSync('lib/courseData.js', 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('Se inyectaron textos altamente especficos para ' + c + ' secciones.');
