const fs = require('fs');
let code = fs.readFileSync('lib/courseData.js', 'utf8');
const regex = /id:\s*['"`]?([^'"`,\s]+)['"`]?/g;
let match;
let i = 0;
while ((match = regex.exec(code)) !== null && i < 20) {
  console.log(match[1]);
  i++;
}
