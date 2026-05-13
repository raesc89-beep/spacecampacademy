const fs = require('fs');
let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const marsImages = [
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200',
  'https://images.unsplash.com/photo-1630656044738-9cb5e481ff23?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200',
  'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=1200',
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728448107-1601d3615fa2?q=80&w=1200',
  'https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200'
];

data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    const roverIcon = '/assets/rovers/ai_' + mod.id.replace('robots_', '') + '.png';
    mod.contentEs.sections.forEach((sec, idx) => {
      // La seccin 0 siempre ser el rover principal, el resto ser una de las 7 imgenes en bucle
      if (idx === 0) {
         sec.image = roverIcon;
      } else {
         sec.image = marsImages[(idx - 1) % marsImages.length];
      }
    });
  }
});

fs.writeFileSync('lib/courseData.js', 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('Fixed all images for all 15 sections of all rovers.');
