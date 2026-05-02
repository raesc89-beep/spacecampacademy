
const fs = require('fs');

const fallbackFacts = [
  "La temperatura en el núcleo de las estrellas puede alcanzar decenas de millones de grados.",
  "Las enanas rojas son el tipo de estrella más común en nuestra galaxia.",
  "Los púlsares giran a velocidades increíbles, emitiendo pulsos de radiación periódicos.",
  "Un agujero negro supermasivo reside en el centro de casi todas las galaxias grandes.",
  "La Vía Láctea tiene unos 100.000 años luz de diámetro.",
  "La materia oscura constituye aproximadamente el 27% de la masa y energía del universo observable.",
  "La energía oscura acelera la expansión del universo constantemente.",
  "Las nebulosas planetarias son los restos de estrellas de masa similar a nuestro Sol.",
  "Las supernovas pueden brillar más que toda la galaxia que las alberga durante un breve período.",
  "La luz tarda más de 4 años en llegar desde la estrella más cercana a nuestro sistema solar.",
  "El viento estelar arrastra material de las estrellas hacia el medio interestelar profundo.",
  "Las ondas gravitacionales son distorsiones en el espacio-tiempo causadas por eventos masivos.",
  "Los cúmulos globulares contienen cientos de miles de estrellas muy antiguas agrupadas.",
  "El fondo cósmico de microondas es el eco luminoso del Big Bang inicial.",
  "Las galaxias espirales tienen brazos donde se forman nuevas estrellas constantemente.",
  "Júpiter actúa como un escudo gravitacional, desviando muchos asteroides peligrosos.",
  "La gravedad en la superficie de Marte es aproximadamente el 38% de la terrestre.",
  "Los exoplanetas se detectan principalmente cuando disminuyen el brillo de su estrella al orbitarla.",
  "La espectroscopia permite conocer la composición química de atmósferas alienígenas.",
  "El agua en forma de hielo es muy común en los cuerpos externos del sistema solar.",
  "Los anillos de Saturno están formados por miles de millones de fragmentos de hielo puro.",
  "Venus tiene una rotación retrógrada, es decir, gira en dirección opuesta a la Tierra.",
  "El Monte Olimpo en Marte es el volcán más grande conocido en el sistema solar entero.",
  "La sonda Parker Solar Probe es el objeto fabricado por el hombre que más se ha acercado al Sol.",
  "Urano tiene un eje de rotación tan inclinado que parece rodar sobre su órbita lentamente.",
  "Tritón, la luna de Neptuno, orbita en dirección contraria a la rotación de su planeta.",
  "Los cometas desarrollan sus colas características solo cuando el viento solar interactúa con ellos.",
  "El cinturón de asteroides entre Marte y Júpiter contiene menos masa que nuestra propia Luna.",
  "Las estrellas de neutrones son tan densas que una cucharadita de su materia pesaría millones de toneladas.",
  "El Sol contiene el 99.8% de toda la masa presente en nuestro sistema planetario."
];

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

let globalFactIndex = 0;

jsData.forEach(course => {
  if (!course.contentEs || !course.contentEs.sections) return;
  course.contentEs.sections.forEach((sec, idx) => {
    // 1. Fix Repetitive Text
    if (Array.isArray(sec.text)) {
      const uniqueSentences = new Set();
      const newText = [];
      sec.text.forEach(sentence => {
        if (!uniqueSentences.has(sentence)) {
          uniqueSentences.add(sentence);
          newText.push(sentence);
        } else {
          // It's a duplicate, replace it with a unique fallback fact
          const fact = fallbackFacts[globalFactIndex % fallbackFacts.length];
          newText.push(fact);
          globalFactIndex++;
        }
      });
      
      // Ensure it has exactly 10 lines
      while(newText.length < 10) {
          newText.push(fallbackFacts[globalFactIndex % fallbackFacts.length]);
          globalFactIndex++;
      }
      // Trim to 10 lines max to be strict
      sec.text = newText.slice(0, 10);
    }

    // 2. Fix Suspicious Images (NASA collections)
    if (sec.image && (sec.image.includes('collection.json') || sec.image.includes('undefined'))) {
      const keywords = ["space", "geology", "planet", "stars", "rock", "nebula", "asteroid", "galaxy", "telescope"];
      const k1 = keywords[(idx + course.id.length) % keywords.length];
      const k2 = keywords[(idx * 2) % keywords.length];
      sec.image = `https://source.unsplash.com/featured/?${k1},${k2}`;
    }
  });
});

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log("Corrección de redundancia y enlaces rotos completada exitosamente.");
