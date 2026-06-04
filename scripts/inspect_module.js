const {COURSE_DATA} = require('../lib/courseData.js');
const all = Object.values(COURSE_DATA).flat();
const targetId = process.argv[2] || 'bttf_m1';
const m = all.find(x => x.id === targetId);
if (!m) { console.log('Module not found:', targetId); process.exit(1); }
console.log('Fields:', Object.keys(m));
if (m.sections) {
  console.log('sections count:', m.sections.length);
  const s0 = m.sections[0];
  console.log('section[0] keys:', Object.keys(s0));
  if (s0.paragraphs) console.log('section[0] paragraphs count:', s0.paragraphs.length);
  if (s0.text) console.log('section[0] text (100 chars):', s0.text.substring(0,100));
  if (s0.content) console.log('section[0] content (100 chars):', s0.content.substring(0,100));
}
if (m.content) console.log('content (100 chars):', m.content.substring(0,100));
if (m.quiz) console.log('quiz length:', m.quiz.length);
