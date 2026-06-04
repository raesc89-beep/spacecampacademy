const fs = require('fs');
const raw = fs.readFileSync('lib/courseData.js', 'utf8');

// Extract module-level IDs (not section IDs)
// Modules have "id": "xxx" at the top level of COURSE_DATA array items
// We can tell these apart because section IDs contain "_merged" or are the same as module id
const moduleIdPattern = /^\s*"id":\s*"([^"]+)"/gm;
const matches = [];
let match;
while ((match = moduleIdPattern.exec(raw)) !== null) {
  matches.push(match[1]);
}

// Filter to top-level module IDs - these don't have "_section" or "_merged" suffixes typically
// Actually let's just get all unique IDs and count paragraphs per module
const courseDataStr = raw.replace('export const COURSE_DATA = ', 'module.exports = ');
fs.writeFileSync('/tmp/courseDataTemp.js', courseDataStr);

// Parse differently - find all "id" values at the top level
// Top-level module IDs are like: egypt_m1, maya_m1, solar_system_m1, etc.
const allIds = [...new Set(matches)];
const moduleIds = allIds.filter(id => {
  // Module IDs typically end in _m1, _m2, _m3, _m4, _m5 or are simple like egypt_m1
  return !id.includes('merged') && !id.includes('section');
});

console.log(`Total unique IDs found: ${allIds.length}`);
console.log(`Estimated module IDs: ${moduleIds.length}`);
console.log(JSON.stringify(moduleIds, null, 2));
