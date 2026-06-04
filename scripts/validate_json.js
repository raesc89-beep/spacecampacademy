const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
// Find array start and end
const start=src.indexOf('[');
const end=src.lastIndexOf(']');
const jsonStr=src.slice(start, end+1);
try{
  const d=JSON.parse(jsonStr);
  console.log('✅ Valid JSON,', d.length, 'modules');
}catch(e){
  console.log('Error:', e.message.slice(0,300));
}
