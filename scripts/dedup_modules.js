/**
 * DEDUPLICATOR: Removes duplicate paragraphs from modules that have many
 * paragraphs but with heavy repetition. For modules with enough unique paragraphs,
 * keeps only unique ones. For others, rebuilds with fresh content.
 */
const fs = require('fs');
const path = require('path');
const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

function findSectionsRange(text, moduleId) {
  const search1 = `"id": "${moduleId}"`;
  const search2 = `"id":"${moduleId}"`;
  let idIdx = text.indexOf(search1);
  if (idIdx < 0) idIdx = text.indexOf(search2);
  if (idIdx < 0) return null;
  const ceIdx = text.indexOf('"contentEs"', idIdx);
  if (ceIdx < 0 || ceIdx - idIdx > 5000) return null;
  const sectIdx = text.indexOf('"sections"', ceIdx);
  if (sectIdx < 0) return null;
  const arrStart = text.indexOf('[', sectIdx);
  if (arrStart < 0) return null;
  let depth = 0, arrEnd = arrStart;
  for (let i = arrStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  return { arrStart, arrEnd };
}

function deduplicateModule(moduleId) {
  let text = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  const range = findSectionsRange(text, moduleId);
  if (!range) { console.error(`NOT FOUND: ${moduleId}`); return; }
  const { arrStart, arrEnd } = range;
  let sections;
  try { sections = JSON.parse(text.substring(arrStart, arrEnd + 1)); }
  catch(e) { console.error(`PARSE ERROR ${moduleId}:`, e.message); return; }

  // Collect all unique paragraphs across all sections
  const seen = new Set();
  const uniqueParas = [];
  for (const sec of sections) {
    for (const para of (sec.text || [])) {
      const key = para.trim().substring(0, 80);
      if (!seen.has(key) && para.trim().length > 30) {
        seen.add(key);
        uniqueParas.push(para);
      }
    }
  }

  if (uniqueParas.length < 15) {
    console.log(`⚠ ${moduleId}: only ${uniqueParas.length} unique paras - needs content rebuild`);
    return false;
  }

  // Redistribute into 3 sections of 5 paragraphs each (using first 15 unique paras)
  const first15 = uniqueParas.slice(0, 15);
  const newSections = [
    { id: `${moduleId}_s1`, title: sections[0]?.title || 'Introducción', image: sections[0]?.image, text: first15.slice(0, 5) },
    { id: `${moduleId}_s2`, title: sections[1]?.title || 'Desarrollo', image: sections[1]?.image, text: first15.slice(5, 10) },
    { id: `${moduleId}_s3`, title: sections[2]?.title || 'Conclusión', image: sections[2]?.image, text: first15.slice(10, 15) },
  ];

  const newArr = JSON.stringify(newSections, null, 6);
  text = text.substring(0, arrStart) + newArr + text.substring(arrEnd + 1);
  fs.writeFileSync(COURSE_DATA_PATH, text, 'utf8');
  console.log(`✓ ${moduleId}: deduplicated to 15 unique paragraphs`);
  return true;
}

// Modules with duplicate issues that have enough unique content to deduplicate
const DEDUP_MODULES = [
  'sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune',
  'pluto', 'black_hole', 'quasar', 'pulsar', 'red_dwarf', 'white_dwarf',
  'asteroides_intro', 'asteroides_meteoros', 'asteroides_cometas', 'asteroides_sondas', 'asteroides_apophis',
  'viaje-planetas-gaseosos', 'viaje_planetas_rocosos',
  'colisiones_estelares',
  'exoplanetas', 'objetos_interestelares',
  'exoplanetas_m2', 'exoplanetas_m3', 'exoplanetas_m4',
];

console.log('=== DEDUPLICATING MODULES ===');
const needsRebuild = [];
for (const id of DEDUP_MODULES) {
  const result = deduplicateModule(id);
  if (result === false) needsRebuild.push(id);
}
if (needsRebuild.length > 0) {
  console.log('\nModules needing full rebuild:', needsRebuild);
}
console.log('\nDone!');
