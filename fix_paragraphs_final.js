const fs = require('fs');

const saganFillers = [
  "La ciencia es una forma de pensar mucho más que un cuerpo de conocimientos.",
  "Estamos hechos de materia estelar.",
  "El cosmos es todo lo que es, o lo que fue, o lo que será.",
  "Comprender la naturaleza requiere observar detenidamente los patrones simples.",
  "Una explicación sencilla suele ser la más cercana a la verdad universal.",
  "Cada paso es un avance hacia la comprensión de nuestro origen.",
  "La exploración nos permite vernos desde una perspectiva de humildad.",
  "Conocer las leyes de la física es el primer paso para descifrar el cielo.",
  "En algún lugar, algo asombroso espera a ser descubierto.",
  "El conocimiento científico es un patrimonio de toda la humanidad.",
  "La imaginación a menudo nos lleva a mundos que nunca fueron.",
  "Somos el medio para que el cosmos se conozca a sí mismo.",
  "Las estrellas obedecen reglas físicas elegantes y simples.",
  "El método para aprender es observar, cuestionar y luego experimentar.",
  "El universo es antiguo, pero comprensible para la mente humana.",
  "La curiosidad es el motor que impulsa la nave de la ciencia.",
  "La imaginación a menudo nos lleva a mundos que nunca fueron, pero sin ella no vamos a ninguna parte.",
  "Cada descubrimiento es un pequeño paso hacia la comprensión de nuestro origen.",
  "El universo no exige ser mágico para ser profundamente conmovedor.",
  "La exploración espacial nos permite vernos desde una perspectiva de humildad."
];

const oldFillers = [
  "Los científicos de la academia vigilan este fenómeno de cerca.",
  "Esta maravilla nos ayuda a comprender mejor nuestro lugar en el cosmos.",
  "Los datos recopilados hoy enriquecen enormemente nuestros archivos históricos.",
  "La infinita curiosidad humana nos impulsa firmemente a llegar más lejos siempre.",
  "Como jóvenes cadetes, ustedes heredarán esta gran misión intergaláctica.",
  "Cada descubrimiento nos deja con nuevas e increíbles preguntas estelares.",
  "El universo está lleno de secretos esperando ser desvelados valientemente.",
  "Los exploradores espaciales continuarán abriendo las inmensas"
];

function isFiller(line) {
  const lower = line.toLowerCase();
  
  for(let filler of saganFillers) {
    // Coincidencia parcial (por los pequeños cambios de puntuación)
    if (lower.includes(filler.substring(0, 20).toLowerCase())) return true;
  }
  
  for(let filler of oldFillers) {
    if (lower.includes(filler.substring(0, 20).toLowerCase())) return true;
  }
  
  return false;
}

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

jsData.forEach(course => {
  if (course.contentEs && course.contentEs.sections) {
    course.contentEs.sections.forEach(sec => {
      let cleanText = [];
      sec.text.forEach(line => {
        if (!isFiller(line)) {
          cleanText.push(line);
        }
      });
      
      // Si por alguna razón borramos todo (no debería pasar), poner un backup.
      if (cleanText.length === 0) {
        cleanText = ["Información histórica sobre " + course.name + "."];
      }
      
      sec.text = cleanText;
    });
  }
});

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log("¡Citas de relleno eliminadas! Ahora cada sección contiene únicamente su párrafo factual e informativo.");
