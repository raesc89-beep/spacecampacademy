
const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

let repetitiveFound = 0;
let brokenImages = 0;

jsData.forEach(course => {
  if (!course.contentEs || !course.contentEs.sections) return;
  course.contentEs.sections.forEach((sec, idx) => {
    if (Array.isArray(sec.text)) {
      const uniqueSentences = new Set(sec.text);
      if (uniqueSentences.size < sec.text.length) {
        console.log(`Repetitive text in ${course.id} -> Sec ${idx}: ${sec.title}`);
        repetitiveFound++;
      }
    }
    if (sec.image && (sec.image.includes('collection.json') || sec.image.includes('undefined'))) {
      console.log(`Suspicious image in ${course.id} -> Sec ${idx}: ${sec.image}`);
      brokenImages++;
    }
  });
});
console.log(`Total repetitive sections: ${repetitiveFound}`);
console.log(`Total suspicious images: ${brokenImages}`);
