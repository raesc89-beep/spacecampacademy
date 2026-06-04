const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
// Check apollo11_m1 text array
const moduleId='apollo11_m1';
const modStart=src.indexOf(`"id": "${moduleId}"`);
const orderIdx=src.indexOf('"order":', modStart);
const nextOrderIdx=src.indexOf('"order":', orderIdx+10);
const chunk=src.slice(modStart, nextOrderIdx-10);
const textIdx=chunk.indexOf('"text"');
const arrOpen=chunk.indexOf('[', textIdx);
let d=0,i=arrOpen;
while(i<chunk.length){if(chunk[i]==='[')d++;else if(chunk[i]===']'){d--;if(d===0)break;}i++;}
const textContent=chunk.slice(arrOpen, i+1);
try{
  const arr=JSON.parse(textContent);
  console.log('Paragraph count:', arr.length);
  arr.slice(0,5).forEach((p,n)=>console.log(n+1+'.', p.slice(0,60)));
  console.log('...');
  arr.slice(10,15).forEach((p,n)=>console.log((n+11)+'.', p.slice(0,60)));
  arr.slice(15,25).forEach((p,n)=>console.log((n+16)+'.', p.slice(0,60)));
}catch(e){
  console.log('Parse err:', e.message);
}
