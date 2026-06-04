const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const moduleId='apollo11_m1';
const modStart=src.indexOf(`"id": "${moduleId}"`);
const nextMod=src.indexOf('"id": "', modStart + moduleId.length + 10);
const modEnd=nextMod===-1?src.length:nextMod;
const chunk=src.slice(modStart, modEnd);
console.log('Chunk length:', chunk.length);
const textKeyIdx=chunk.indexOf('"text"');
console.log('text key at:', textKeyIdx);
const arrOpen=chunk.indexOf('[', textKeyIdx);
console.log('array [ at:', arrOpen);
// Check what's near textKeyIdx
console.log('Around text key:');
console.log(chunk.slice(textKeyIdx-5, textKeyIdx+100));
