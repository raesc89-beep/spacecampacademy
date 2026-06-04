const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
let idx=0;
let count=0;
while(true){
  idx=src.indexOf('"id": "apollo10_m1"', idx);
  if(idx===-1) break;
  console.log(`Found at char ${idx}, line ~${src.slice(0,idx).split('\n').length}`);
  count++;
  idx+=10;
}
console.log('Total occurrences:', count);
