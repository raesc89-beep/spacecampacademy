const path = require('path');
const courseDataPath = path.join(__dirname, '../lib/courseData.js');
const { COURSE_DATA } = require(courseDataPath);

const swIds = Object.keys(COURSE_DATA).filter(id => id.startsWith('starwars'));
swIds.sort();

console.log(`Found ${swIds.length} Star Wars modules:\n`);
swIds.forEach(id => {
  const m = COURSE_DATA[id];
  const sections = m.contentEs && m.contentEs.sections ? m.contentEs.sections : [];
  let totalTexts = 0;
  sections.forEach(s => { totalTexts += (s.text || []).length; });
  const quizCount = m.quizEs ? m.quizEs.length : 0;
  const status = (totalTexts >= 15 && quizCount >= 5) ? '✓' : '✗';
  console.log(`${status} ${id}: sections=${sections.length}, totalTexts=${totalTexts}, quiz=${quizCount}`);
});
