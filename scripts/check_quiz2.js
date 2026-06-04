const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
// Search for "area51" modules and find all quiz-related keys
const idx=src.indexOf('"id": "area51_m1"');
const nextModule=src.indexOf('"id": "area51_m2"', idx);
const chunk=src.slice(idx, nextModule);
console.log('Module chunk length:', chunk.length);
// Find quiz
const qIdx=chunk.indexOf('quiz');
console.log('Quiz at:', qIdx);
// Print last 1000 chars of module
console.log('--- END OF MODULE ---');
console.log(chunk.slice(chunk.length-500));
