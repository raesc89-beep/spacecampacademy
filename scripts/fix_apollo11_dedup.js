/**
 * fix_apollo11_dedup.js
 * Removes duplicate paragraphs from apollo11_m1 through m6
 * Keeps the first 15 unique paragraphs (original 10 + first 5 extras added)
 */
const fs = require('fs');
const path = require('path');
const { getModuleChunk } = require('./patch_universal');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function deduplicateTextArray(src, moduleId) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const { modStart, chunk } = info;

  const textIdx = chunk.indexOf('"text"');
  if (textIdx === -1) { console.log(`NO TEXT: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textIdx);
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  const textContent = chunk.slice(arrOpen, i + 1);
  
  let arr;
  try { arr = JSON.parse(textContent); } 
  catch(e) { console.log(`Parse error in ${moduleId}: ${e.message}`); return src; }

  // Deduplicate: keep first occurrence of each paragraph
  const seen = new Set();
  const deduped = arr.filter(p => {
    const key = p.slice(0, 50); // Use first 50 chars as key
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Keep at most 15
  const final = deduped.slice(0, 15);
  
  console.log(`${moduleId}: ${arr.length} → ${final.length} paragraphs`);
  
  src = src.slice(0, modStart + arrOpen) + 
        JSON.stringify(final, null, 12) + 
        src.slice(modStart + i + 1);
  return src;
}

['apollo11_m1','apollo11_m2','apollo11_m3','apollo11_m4','apollo11_m5','apollo11_m6'].forEach(id => {
  src = deduplicateTextArray(src, id);
});

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Apollo 11 deduplicated!');
