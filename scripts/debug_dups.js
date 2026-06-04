const fs = require('fs');
const raw = fs.readFileSync('./lib/courseData.js', 'utf8');
const search = '"id": "egypt_m3"';
let count = 0, pos = 0;
while ((pos = raw.indexOf(search, pos)) !== -1) {
  count++;
  console.log('occurrence', count, 'at char', pos, '(~line', raw.substring(0,pos).split('\n').length+')');
  pos++;
}
// Check how many items in COURSE_DATA total
const arrStart = raw.indexOf('export const COURSE_DATA = [') + 'export const COURSE_DATA = ['.length;
console.log('\nCOURSE_DATA starts at char:', arrStart);
// Count all "id": " patterns 
const idPattern = /"id": "/g;
let matches = [...raw.matchAll(idPattern)];
console.log('Total "id" fields:', matches.length);
