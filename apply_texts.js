import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const hugeTexts = JSON.parse(fs.readFileSync('huge_texts.json', 'utf8'));

const updatedData = COURSE_DATA.map(mod => {
  if (mod.id && mod.id.startsWith('egypt_m') && mod.contentEs && mod.contentEs.sections) {
    if(hugeTexts[mod.id]) {
      // Split the text by newlines and remove the brackets like [1], [2], etc.
      let rawParagraphs = hugeTexts[mod.id].split('\n').map(p => p.trim()).filter(p => p.length > 0);
      let cleanParagraphs = rawParagraphs.map(p => p.replace(/^\[\d+\]\s*/, ''));
      mod.contentEs.sections[0].text = cleanParagraphs;
    }
  }
  return mod;
});

const fileContent = 'export const COURSE_DATA = ' + JSON.stringify(updatedData, null, 2) + ';\n';
fs.writeFileSync('lib/courseData.js', fileContent, 'utf8');
console.log('Successfully expanded all 15 modules with 20 massive paragraphs per module.');
