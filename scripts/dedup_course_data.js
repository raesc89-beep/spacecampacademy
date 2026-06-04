const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../lib/courseData.js');
const raw = fs.readFileSync(FILE, 'utf8');

// Convert to CommonJS temporarily to parse
const mod = raw.replace('export const COURSE_DATA', 'const COURSE_DATA') + '\nmodule.exports = { COURSE_DATA };';
const tmpPath = path.join(__dirname, '../scripts/_dedup_temp.js');
fs.writeFileSync(tmpPath, mod);
delete require.cache[require.resolve(tmpPath)];
const { COURSE_DATA } = require(tmpPath);
fs.unlinkSync(tmpPath);

console.log('Total modules before dedup:', COURSE_DATA.length);

// Deduplicate: keep first occurrence of each ID
const seen = new Set();
const deduped = [];
for (const m of COURSE_DATA) {
  if (!seen.has(m.id)) {
    seen.add(m.id);
    deduped.push(m);
  } else {
    console.log('Removing duplicate:', m.id);
  }
}

console.log('Total modules after dedup:', deduped.length);

// Rebuild the file content
const newContent = 'export const COURSE_DATA = ' + JSON.stringify(deduped, null, 2) + ';\n';
fs.writeFileSync(FILE, newContent, 'utf8');
console.log('Done! File written.');
