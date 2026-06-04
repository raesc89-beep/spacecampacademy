const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const moduleId='apollo11_m1';
const modStart=src.indexOf(`"id": "${moduleId}"`);
// The problem: '"id": "' also matches section IDs inside the module
// We need to find the next TOP-LEVEL module, not a nested id
// Strategy: look for pattern that starts a new object at root level
// Find 'apollo11_m2' specifically instead
const nextMod=src.indexOf('"id": "apollo11_m2"', modStart+10);
const modEnd=nextMod===-1?src.length:nextMod;
const chunk=src.slice(modStart, modEnd);
console.log('Chunk length:', chunk.length);
const textKeyIdx=chunk.indexOf('"text"');
console.log('text key at:', textKeyIdx);
if(textKeyIdx!==-1){
  const arrOpen=chunk.indexOf('[', textKeyIdx);
  console.log('array [ at:', arrOpen);
  console.log('Around text key:');
  console.log(chunk.slice(textKeyIdx-5, textKeyIdx+50));
}
