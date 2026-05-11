import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const updatedData = COURSE_DATA.map(mod => {
  if (mod.id && mod.id.startsWith('egypt_m') && mod.contentEs && mod.contentEs.sections) {
    let combinedText = [];
    mod.contentEs.sections.forEach(sec => {
       combinedText.push(...sec.text);
    });
    
    mod.contentEs.sections = [
      {
         id: mod.id + "_merged",
         title: mod.titleEs,
         text: combinedText,
         image: mod.icon,
         style: "highlight"
      }
    ];
  }
  return mod;
});

const newFileContent = `export const COURSE_DATA = ${JSON.stringify(updatedData, null, 2)};\n`;
fs.writeFileSync('lib/courseData.js', newFileContent, 'utf8');
console.log('Fixed courseData.js');
