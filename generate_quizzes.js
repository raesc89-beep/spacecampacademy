
const fs = require('fs');

let raw = fs.readFileSync('lib/courseData.js', 'utf8');
const dataStr = raw.split('export const COURSE_DATA = ')[1].replace(/;\s*$/, '');
const COURSE_DATA = eval('(' + dataStr + ')');

COURSE_DATA.forEach(mdl => {
    const s = mdl.contentEs.sections;
    const title = mdl.titleEs || mdl.titleEn || 'este curso';
    
    // Generador semi-inteligente contextual
    const getSecTitle = (idx) => {
       if(!s || s.length === 0) return 'Temas Centrales';
       return s[idx % s.length]?.title || 'el concepto principal';
    };

    mdl.quiz = [
      {
         question: '¿Cuál es el tema primordial que se aborda al inicio de ' + title + ' (' + getSecTitle(0) + ')?',
         options: ['El desarrollo y características clave de este concepto', 'Sucesos irrelevantes', 'Datos sobre gastronomía local', 'Información puramente matemática'],
         answer: 0
      },
      {
         question: 'Según la sección titulada \'' + getSecTitle(1) + '\', ¿por qué es importante este estudio?',
         options: ['No tiene relevancia científica', 'Porque nos permite comprender la física y evolución del cosmos', 'Solo aplica para misiones terrestres', 'Es una teoría obsoleta'],
         answer: 1
      },
      {
         question: 'En el contexto de \'' + title + '\', ¿qué función cumple la fase de \'' + getSecTitle(2) + '\'?',
         options: ['Determinar aspectos de ingeniería o evolución física', 'Disminuir la gravedad', 'Aumentar la temperatura solar', 'Generar materia oscura'],
         answer: 0
      },
      {
         question: '¿Cuál de estas afirmaciones es verdadera respecto a \'' + getSecTitle(3) + '\'?',
         options: ['Es un proceso imposible en el universo', 'Ocurre únicamente en la Tierra', 'Es un hito fundamentado en las características de ' + title, 'No afecta a la astronomía en nada'],
         answer: 2
      },
      {
         question: 'Al hablar de \'' + getSecTitle(4) + '\', ¿qué podemos deducir?',
         options: ['Que la exploración avanza para comprender sus variables biológicas o geológicas', 'Que las naves se apagan al acercarse', 'Que los planetas se enfrían constantemente', 'Que los asteroides son hechos de cristal mágico'],
         answer: 0
      },
      {
         question: 'Una de las lecciones fundamentales de \'' + title + '\' ocurre en \'' + getSecTitle(5) + '\'. ¿Cuál es el punto central?',
         options: ['Es irrelevante', 'El descubrimiento y uso de nuevas tecnologías', 'Resumir las consecuencias lógicas y científicas del tema', 'Falsificar datos históricos'],
         answer: 2
      },
      {
         question: '¿De qué forma interactúan los elementos presentados en \'' + getSecTitle(0) + '\'?',
         options: ['Tienen una correlación estricta regida por las leyes de la física orbital y biológica', 'Son completamente aleatorios', 'Dependen del color del cohete', 'No se relacionan entre sí'],
         answer: 0
      },
      {
         question: 'Para comprender completamente la misión sobre \'' + title + '\', debes saber que:',
         options: ['Los años luz son unidades de masa', 'Los avances logrados aquí marcan un precedente para el futuro humano en el espacio', 'La temperatura siempre desciende al rojo', 'Los resultados fueron eliminados'],
         answer: 1
      },
      {
         question: 'Analizando el módulo, el factor limitante más común en estas misiones suele ser:',
         options: ['La radiación cósmica, el soporte vital o fallas de motor', 'Gases nobles', 'Láminas de cartón', 'Velocidad de internet intergaláctica'],
         answer: 0
      },
      {
         question: 'En conclusión, respecto a \'' + getSecTitle(s.length > 5 ? 5 : 0) + '\', la meta final de estas excursiones espaciales ha sido:',
         options: ['Extraer sal', 'Esconder radiación térmica', 'Propulsar la recopilación de datos para entender y preservar la historia de nuestro sistema estelar', 'Pintar anillos en la órbita de los cometas'],
         answer: 2
      }
    ];
});

const newRaw = raw.split('export const COURSE_DATA = ')[0] + 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';';
fs.writeFileSync('lib/courseData.js', newRaw);
console.log('Quizzes homologados a 10 preguntas seguras y contextuales.');

