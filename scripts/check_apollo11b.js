const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const idx=src.indexOf('"id": "apollo11_m1"');
const nextMod=src.indexOf('"id": "apollo11_m2"', idx);
const chunk=src.slice(idx, nextMod);
// Find text array
const textIdx=chunk.indexOf('"text"');
const arrOpen=chunk.indexOf('[', textIdx);
let d=0, i=arrOpen;
while(i<chunk.length){
  if(chunk[i]==='[') d++;
  else if(chunk[i]===']'){d--;if(d===0)break;}
  i++;
}
const textContent=chunk.slice(arrOpen, i+1);
try{
  const arr=JSON.parse(textContent);
  console.log('Paragraph count:', arr.length);
  console.log('First 100 chars of each paragraph:');
  arr.forEach((p,n)=>console.log(n+1+'.', p.slice(0,80)));
}catch(e){
  console.log('Parse error:', e.message);
  console.log('First 200 chars:', textContent.slice(0,200));
}
