const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const lines=src.split('\n');
// Print lines 14800-14830
for(let i=14800; i<14835; i++){
  console.log(i+1, ':', JSON.stringify(lines[i]));
}
