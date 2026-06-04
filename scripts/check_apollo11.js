const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const idx=src.indexOf('"id": "apollo11_m1"');
const chunk=src.slice(idx, idx+2000);
console.log(chunk);
