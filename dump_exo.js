const fs = require('fs');
const path = require('path');
const { COURSE_DATA } = require('./lib/courseData.js');

const exo = COURSE_DATA.find(c => c.id === 'exoplanetas');
fs.writeFileSync('exo_dump.json', JSON.stringify(exo, null, 2));
console.log("Dumped exoplanetas to exo_dump.json");
