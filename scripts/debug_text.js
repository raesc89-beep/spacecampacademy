const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const idx=src.indexOf('"id": "apollo11_m1"');
const chunk=src.slice(idx, idx+500);
// Print exact characters around "text"
const tIdx=chunk.indexOf('text');
console.log('text found at char:', tIdx);
console.log('Raw chars around text:');
for(let i=Math.max(0,tIdx-5); i<tIdx+20; i++){
  console.log(i, JSON.stringify(chunk[i]), chunk.charCodeAt(i));
}
