const fs=require('fs');
const src=fs.readFileSync('./lib/courseData.js','utf8');
const lines=src.split('\n');
const broken=[];
for(let i=0;i<lines.length;i++){
  // Looking for the broken pattern: a line with just "          ","
  if(lines[i].trim()==='",'){
    // Check if previous line is just "        {"
    if(lines[i-1] && lines[i-1].trim()==='{'){
      broken.push({line: i+1, moduleGuess: ''});
      // Find nearest "id" before this
      for(let j=i;j>Math.max(0,i-30);j--){
        const m=lines[j].match(/"id":\s*"([^"]+)"/);
        if(m){broken[broken.length-1].moduleGuess=m[1]; break;}
      }
    }
  }
}
console.log('Broken modules found:', broken.length);
broken.forEach(b=>console.log('Line', b.line, '- Module:', b.moduleGuess));
