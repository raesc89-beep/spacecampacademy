const fs = require('fs');

const data = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonString = data.replace('export const COURSE_DATA = ', '').trim().replace(/;$/, '');

try {
  const courses = eval(jsonString);
  let report = '# Auditoría de Cursos\n\n';
  
  courses.forEach(course => {
    report += `## Módulo: ${course.titleEs}\n`;
    if (course.contentEs && course.contentEs.sections) {
      course.contentEs.sections.forEach(section => {
        report += `### Sección: ${section.title}\n`;
        let paragraphs = [];
        if (Array.isArray(section.text)) {
           paragraphs = section.text;
        } else if (typeof section.text === 'string') {
           paragraphs = section.text.split('\n').filter(p => p.trim().length > 0);
        }
        
        report += `- Párrafos totales: ${paragraphs.length}\n`;
        
        let failedParagraphs = 0;
        paragraphs.forEach((p, idx) => {
           // check if length is at least 10 words or approx 10 lines
           const wordCount = p.split(' ').length;
           if (wordCount < 10) {
              failedParagraphs++;
           }
        });
        
        if (paragraphs.length < 10) {
           report += `- **Fallo Extensión:** Tiene menos de 10 párrafos (Regla 10x10 incumplida).\n`;
        }
        if (failedParagraphs > 0) {
           report += `- **Fallo Longitud:** ${failedParagraphs} párrafos son muy cortos.\n`;
        }
      });
    } else {
      report += `- No contiene contenido en contentEs.sections\n`;
    }
  });

  fs.writeFileSync('audit_report.md', report);
  console.log('Audit completed. See audit_report.md');
} catch(e) {
  console.error('Error parsing:', e);
}
