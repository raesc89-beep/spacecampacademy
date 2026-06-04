const fs = require('fs');
const path = require('path');
const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

function findSectionsRange(text, moduleId) {
  const s1 = '"id": "' + moduleId + '"';
  const s2 = '"id":"' + moduleId + '"';
  let idIdx = text.indexOf(s1);
  if (idIdx < 0) idIdx = text.indexOf(s2);
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
  if (!range) { console.error('NOT FOUND: ' + moduleId); return; }
  const { arrStart, arrEnd } = range;
  let sections;
  try { sections = JSON.parse(text.substring(arrStart, arrEnd + 1)); }
  catch(e) { console.error('PARSE ERROR ' + moduleId + ': ' + e.message); return; }
  
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
    console.log('NEED_REBUILD: ' + moduleId + ' only ' + uniqueParas.length + ' unique paras');
    return false;
  }
  
  const first15 = uniqueParas.slice(0, 15);
  const t0 = sections[0] || {};
  const t1 = sections[1] || {};
  const t2 = sections[2] || {};
  const newSections = [
    { id: moduleId + '_s1', title: t0.title || 'Introduccion', image: t0.image, text: first15.slice(0, 5) },
    { id: moduleId + '_s2', title: t1.title || 'Desarrollo', image: t1.image, text: first15.slice(5, 10) },
    { id: moduleId + '_s3', title: t2.title || 'Conclusion', image: t2.image, text: first15.slice(10, 15) },
  ];
  
  const newArr = JSON.stringify(newSections, null, 6);
  text = text.substring(0, arrStart) + newArr + text.substring(arrEnd + 1);
  fs.writeFileSync(COURSE_DATA_PATH, text, 'utf8');
  console.log('OK: ' + moduleId);
  return true;
}

const MODS = [
  'animales_intro','animales_albert_ham','animales_laika','animales_gatos',
  'pioneros_yuri','pioneros_alan','pioneros_john','pioneros_valentina','pioneros_leonov','pioneros_svetlana','pioneros_sally',
  'robots_historia','robots_sojourner','robots_opportunity','robots_spirit','robots_curiosity','robots_perseverance','robots_ingenuity','robots_futuras'
];

const needsRebuild = [];
for (const id of MODS) {
  const r = deduplicateModule(id);
  if (r === false) needsRebuild.push(id);
}
if (needsRebuild.length > 0) console.log('\nNEED REBUILD:', needsRebuild.join(', '));
else console.log('\nAll deduplication done!');
