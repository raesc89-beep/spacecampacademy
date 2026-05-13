const fs = require('fs');

let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

function generateImmersiveText(roverName, sectionIndex) {
  const intro = [
    `Bienvenido a los archivos clasificados de la misión ${roverName}. Aquí en la inmensa y solitaria superficie de Marte, cada avance tecnológico representa un descubrimiento científico monumental para la humanidad.`,
    `Analizando los últimos bancos de datos transmitidos por ${roverName} a más de 200 millones de kilómetros de distancia a través de las antenas parabólicas de la Red del Espacio Profundo de la NASA.`,
    `La ingeniería aeroespacial que hizo posible la misión ${roverName} es un testimonio increíble del ingenio y la ambición humana explorando el vasto, hostil y congelado cosmos rojo.`,
    `Los cráteres misteriosos, valles profundos y los antiguos lechos de ríos secos son los principales objetivos topográficos que nuestra misión ${roverName} debe cartografiar y analizar.`,
    `Sobrevivir a los infames 'siete minutos de terror' durante el descenso atmosférico fue clave; ${roverName} logró tocar tierra con éxito y desplegar todos sus complejos instrumentos científicos.`
  ];
  const body = [
    `Las rocas ígneas y sedimentarias fotografiadas en este peligroso cuadrante sugieren firmemente que, hace miles de millones de años, agua líquida y dulce fluyó libremente por estas mismas planicies.`,
    `Nuestros brillantes astrobiólogos e ingenieros están buscando incansablemente firmas químicas o biofirmas fosilizadas que pudieran estar atrapadas milimétricamente bajo el denso polvo marciano oxidado.`,
    `Las aterradoras tormentas de arena globales de Marte pueden oscurecer el sol brillante durante meses enteros, poniendo a prueba la enorme resistencia de los componentes electrónicos y baterías.`,
    `Utilizando espectrómetros de masa hiper-avanzados y poderosos láseres de vaporización de rocas, hemos logrado perforar e identificar minerales fundamentales como la brillante hematita y los sulfatos salinos.`,
    `La bajísima gravedad, la alta radiación solar y la delgada atmósfera venenosa de dióxido de carbono hacen que este entorno alienígena sea un laboratorio extremo y perfecto para entender el origen planetario.`
  ];
  const conclusion = [
    `Los valiosos datos ambientales recopilados en este preciso sol marciano reescribirán sin duda alguna los libros de astrofísica del mañana y nos prepararán para el gran salto de una futura misión tripulada humana.`,
    `Continuaremos operando las cámaras de navegación estereoscópicas desde el Laboratorio de Propulsión a Chorro (JPL), enviando secuencias de comandos cuidadosas para evitar que las ruedas queden atascadas en las dunas.`,
    `Este descubrimiento geológico específico en los análisis químicos nos obliga a los científicos de la Tierra a replantear cómo funciona realmente el antiguo ciclo hidrológico en mundos extraterrestres secos.`,
    `Cada cruda fotografía transmitida en blanco y negro es un hermoso y vasto lienzo naranja al ser procesada; un mundo muerto y solitario pero increíblemente vivo científicamente, esperando revelar todos sus secretos ocultos.`,
    `Mantente alerta a los sensores, cadete espacial. La exploración planetaria no perdona errores y requiere paciencia absoluta, precisión matemática extrema y una curiosidad humana inquebrantable por el universo infinito.`
  ];

  return [
    intro[sectionIndex % intro.length],
    body[(sectionIndex + 1) % body.length],
    conclusion[(sectionIndex + 2) % conclusion.length]
  ];
}

let counter = 0;
data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    const titleClean = mod.titleEs || "Robot Explorador";
    mod.contentEs.sections.forEach((sec, idx) => {
      sec.text = generateImmersiveText(titleClean, idx);
      counter++;
    });
  }
});

fs.writeFileSync('lib/courseData.js', 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('Replaced text for ' + counter + ' sections.');
