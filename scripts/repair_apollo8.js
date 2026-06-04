/**
 * repair_apollo8_m1.js
 * Fixes the broken structure of apollo8_m1 caused by the quiz insert script
 * corrupting the contentEs sections array.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

// Find the broken section and replace it with the full correct module content
const modStart = src.indexOf('"id": "apollo8_m1"');
if (modStart === -1) { console.log('NOT FOUND'); process.exit(1); }

// Find the end of this module using the "order" boundary
const orderIdx = src.indexOf('"order":', modStart);
const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
const modEnd = nextOrderIdx === -1 ? src.length : nextOrderIdx - 10;
const chunk = src.slice(modStart, modEnd);
console.log('Module chunk (first 500 chars):');
console.log(chunk.slice(0, 500));
console.log('...');
console.log('Module chunk (last 200 chars):');
console.log(chunk.slice(chunk.length - 200));
