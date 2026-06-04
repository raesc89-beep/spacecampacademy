const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
// Check images in apollo11_m1 which was passing before
const moduleId='apollo11_m1';
const modStart=src.indexOf(`"id": "${moduleId}"`);
const orderIdx=src.indexOf('"order":', modStart);
const nextOrderIdx=src.indexOf('"order":', orderIdx+10);
const chunk=src.slice(modStart, nextOrderIdx-10);
// Find images
const imgIdx=chunk.indexOf('"images"');
if(imgIdx===-1){console.log('No images key found'); process.exit(1);}
const imgArrOpen=chunk.indexOf('[', imgIdx);
let d=0,i=imgArrOpen;
while(i<chunk.length){if(chunk[i]==='[')d++;else if(chunk[i]===']'){d--;if(d===0)break;}i++;}
const images=JSON.parse(chunk.slice(imgArrOpen, i+1));
console.log('Image count:', images.length);
console.log('First 3 images:', images.slice(0,3));
