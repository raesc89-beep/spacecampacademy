
const fs = require('fs');
const text = fs.readFileSync('./lib/courseData.js', 'utf8');

// Find starwars_sec_1 snippet
const search = 'starwars_sec_1';
const idx = text.indexOf(search);
if (idx < 0) {
  console.log('starwars_sec_1 NOT FOUND');
} else {
  console.log('=== starwars_sec_1 context ===');
  console.log(text.substring(Math.max(0, idx - 20), idx + 600));
}

// Also find copernico_m1
const search2 = 'copernico_m1';
const idx2 = text.indexOf(search2);
if (idx2 < 0) {
  console.log('\ncopernico_m1 NOT FOUND');
} else {
  console.log('\n=== copernico_m1 context ===');
  console.log(text.substring(Math.max(0, idx2 - 20), idx2 + 600));
}
