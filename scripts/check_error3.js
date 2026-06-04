const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const lines=src.split('\n');
// Print lines around 14938
for(let i=14928; i<14952; i++){
  process.stdout.write((i+1) + ' : ' + JSON.stringify(lines[i]) + '\n');
}
