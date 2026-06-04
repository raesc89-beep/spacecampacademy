const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const lines=src.split('\n');
// Print lines around 14875
for(let i=14865; i<14890; i++){
  process.stdout.write((i+1) + ' : ' + JSON.stringify(lines[i]) + '\n');
}
