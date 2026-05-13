const fs = require('fs');
let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const marsImages15 = [
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200', // 1
  'https://images.unsplash.com/photo-1630656044738-9cb5e481ff23?q=80&w=1200', // 2
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200', // 3
  'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=1200', // 4
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200', // 5
  'https://images.unsplash.com/photo-1614728448107-1601d3615fa2?q=80&w=1200', // 6
  'https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200', // 7
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200', // 8
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200', // 9
  'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=1200', // 10
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1200', // 11
  'https://images.unsplash.com/photo-1614728264356-913b860292de?q=80&w=1200', // 12
  'https://images.unsplash.com/photo-1614728264663-792abde99cb7?q=80&w=1200', // 13
  'https://images.unsplash.com/photo-1614730321106-96acf91dcfe5?q=80&w=1200', // 14
  'https://images.unsplash.com/photo-1614729851608-41fcd3a82e9b?q=80&w=1200'  // 15
];

data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    const roverIcon = '/assets/rovers/ai_' + mod.id.replace('robots_', '') + '.png';
    mod.contentEs.sections.forEach((sec, idx) => {
      // First image is ALWAYS the custom rover image, the rest are unique
      if (idx === 0) {
         sec.image = roverIcon;
      } else {
         sec.image = marsImages15[idx];
      }
    });
  }
});

fs.writeFileSync('lib/courseData.js', 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('Se asignaron 15 imagenes unicas.');
