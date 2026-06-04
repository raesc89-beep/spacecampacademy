const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const idx=src.indexOf('"id": "area51_m1"');
const chunk=src.slice(idx, idx+5000);
const quizStart=chunk.indexOf('quizEs');
console.log('Quiz section found at char:', quizStart);
console.log(chunk.slice(Math.max(0,quizStart-50), quizStart+800));
