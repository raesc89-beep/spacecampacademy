/**
 * MASTER CONTENT PATCHER
 * Reads courseData.js, finds each module by ID, and replaces its sections
 * with fresh, deduplicated, pedagogically correct 15-paragraph content.
 * 
 * Usage: node scripts/patch_module.js <moduleId> <contentFile.json>
 */

const fs = require('fs');
const path = require('path');

const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

function findModuleRange(text, moduleId) {
  // Find the module object that contains "id": "moduleId"
  const search1 = `"id": "${moduleId}"`;
  const search2 = `"id":"${moduleId}"`;
  
  let idIdx = text.indexOf(search1);
  if (idIdx < 0) idIdx = text.indexOf(search2);
  if (idIdx < 0) return null;
  
  // Walk back to find the opening { of this module
  let start = idIdx;
  while (start > 0 && text[start] !== '{') start--;
  // Make sure this { is actually the module start (preceded by , or [ or \n)
  
  // Walk forward to find contentEs
  const ceSearch = '"contentEs"';
  const ceIdx = text.indexOf(ceSearch, idIdx);
  if (ceIdx < 0 || ceIdx - idIdx > 3000) return null;
  
  // Find the sections array
  const sectSearch = '"sections"';
  const sectIdx = text.indexOf(sectSearch, ceIdx);
  if (sectIdx < 0) return null;
  
  const arrStart = text.indexOf('[', sectIdx);
  if (arrStart < 0) return null;
  
  // Find matching ]
  let depth = 0;
  let arrEnd = arrStart;
  for (let i = arrStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  
  return { arrStart, arrEnd };
}

function patchModule(moduleId, newSections) {
  let text = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  
  const range = findModuleRange(text, moduleId);
  if (!range) {
    console.error(`ERROR: Cannot find module ${moduleId}`);
    return false;
  }
  
  const { arrStart, arrEnd } = range;
  const oldContent = text.substring(arrStart, arrEnd + 1);
  const newContent = JSON.stringify(newSections, null, 6);
  
  text = text.substring(0, arrStart) + newContent + text.substring(arrEnd + 1);
  fs.writeFileSync(COURSE_DATA_PATH, text, 'utf8');
  
  // Verify
  const verifyText = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  const verifyRange = findModuleRange(verifyText, moduleId);
  if (verifyRange) {
    const sections = JSON.parse(verifyText.substring(verifyRange.arrStart, verifyRange.arrEnd + 1));
    const totalParas = sections.reduce((sum, s) => sum + (s.text || []).length, 0);
    console.log(`✓ ${moduleId}: ${sections.length} sections, ${totalParas} paragraphs`);
  }
  return true;
}

module.exports = { patchModule, findModuleRange };

// CLI usage
if (require.main === module) {
  const [,, moduleId, contentFile] = process.argv;
  if (!moduleId || !contentFile) {
    console.log('Usage: node patch_module.js <moduleId> <contentFile.json>');
    process.exit(1);
  }
  const newSections = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  patchModule(moduleId, newSections);
}
