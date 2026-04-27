const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');

let jsData;
try {
  jsData = eval(jsonString);
} catch(e) {
  console.log('Eval error', e);
  process.exit(1);
}

const course = jsData.find(m => m.id === 'viaje-planetas-gaseosos');
if (course && course.contentEs.sections) {
  // 0: Jupiter
  course.contentEs.sections[0].video = 'https://drive.google.com/file/d/1XRe4PPGO0Knt1neoJ6buxg9N6EZyADfJ/preview';
  // 1: Luna Europa
  course.contentEs.sections[1].video = 'https://drive.google.com/file/d/1hDdWr5NB2Rk-zeyHGU5MgV-jNc2yo0rU/preview';
  // 2: Saturno
  course.contentEs.sections[2].video = 'https://drive.google.com/file/d/1pQwPnFrcb3jGQ2_LIvpRK18McV1wQbM3/preview';
  // 3: Luna Titán
  course.contentEs.sections[3].video = 'https://drive.google.com/file/d/1TL8MNC29nZ1ZIVewOMNArTmgQAQjR7TI/preview';
  // 4: Urano
  course.contentEs.sections[4].video = 'https://drive.google.com/file/d/1Z4apcbuMCQfArspZg36X0IUOXNOYGYPN/preview';
  // 5: Neptuno
  course.contentEs.sections[5].video = 'https://drive.google.com/file/d/1KvlpS0nLq_2jc9ZrIBzoY1AOEH6JyyYw/preview';
  // 6: Plutón y Eris
  course.contentEs.sections[6].video = 'https://drive.google.com/file/d/1uJWUyFf5oax5xDZUm_ZWX1SyqR0-2OQG/preview';
}

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Videos injected successfully');
