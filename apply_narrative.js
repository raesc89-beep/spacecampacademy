import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const p1 = JSON.parse(fs.readFileSync('part1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('part2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('part3.json', 'utf8'));

const combined = { ...p1, ...p2, ...p3 };

const updatedData = COURSE_DATA.map(mod => {
  if (mod.id && mod.id.startsWith('egypt_m') && mod.contentEs && mod.contentEs.sections) {
    if(combined[mod.id]) {
      let rawParagraphs = combined[mod.id].split('\n').map(p => p.trim()).filter(p => p.length > 0);
      let cleanParagraphs = rawParagraphs.map(p => p.replace(/^\[\d+\]\s*/, ''));
      mod.contentEs.sections[0].text = cleanParagraphs;
    }
  }
  return mod;
});

const fileContent = 'export const COURSE_DATA = ' + JSON.stringify(updatedData, null, 2) + ';\n';
fs.writeFileSync('lib/courseData.js', fileContent, 'utf8');
console.log('Successfully injected NARRATIVE style paragraphs into all 15 modules.');
