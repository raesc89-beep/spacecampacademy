
import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const HUGE_TEXTS = ${JSON.stringify(HUGE_TEXTS, null, 2)};

const updatedData = COURSE_DATA.map(mod => {
  if (mod.id && mod.id.startsWith('egypt_m') && mod.contentEs && mod.contentEs.sections) {
    if(HUGE_TEXTS[mod.id]) {
      // Split the text into an array of lines/paragraphs, removing empty ones
      let paragraphs = HUGE_TEXTS[mod.id].split('\n').map(p => p.trim()).filter(p => p.length > 0);
      mod.contentEs.sections[0].text = paragraphs;
    }
  }
  return mod;
});

const fileContent = 'export const COURSE_DATA = ' + JSON.stringify(updatedData, null, 2) + ';\n';
fs.writeFileSync('lib/courseData.js', fileContent, 'utf8');
console.log('Successfully expanded all 15 modules with 20 massive paragraphs per module.');
