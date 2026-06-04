// Find all modules with quiz < 5 questions
const vm = require('vm');
const fs = require('fs');
const src = fs.readFileSync('./lib/courseData.js', 'utf8');
const ctx = { module: {exports:{}}, exports: {} };
ctx.module.exports = ctx.exports;
vm.createContext(ctx);
vm.runInContext(src, ctx);
const data = ctx.module.exports.courseData || ctx.exports.courseData;

for (const [courseId, course] of Object.entries(data)) {
  if (!course.modules) continue;
  for (const m of course.modules) {
    const quiz = m.quizEs || m.quiz || [];
    if (quiz.length < 5) {
      console.log(`${m.id}: ${quiz.length} questions`);
    }
  }
}
