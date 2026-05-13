const fs = require('fs');
let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    const roverIcon = '/assets/rovers/ai_' + mod.id.replace('robots_', '') + '.png';
    mod.contentEs.sections.forEach((sec, idx) => {
      // Set the first section image to the rover, and let the rest be the mars landscapes
      if (idx === 0) {
         sec.image = roverIcon;
      } else if (idx === 1) {
         sec.image = 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200';
      } else if (idx === 2) {
         sec.image = 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200';
      }
    });
  }
});

fs.writeFileSync('lib/courseData.js', 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('Fixed images to include rovers.');
