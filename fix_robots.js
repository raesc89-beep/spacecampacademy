const fs = require('fs');

const dataStr = fs.readFileSync('lib/courseData.js', 'utf8');
// Extraer el array del archivo export const COURSE_DATA = [...]
const jsonStr = dataStr.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const marsImages = [
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200',
  'https://images.unsplash.com/photo-1630656044738-9cb5e481ff23?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200',
  'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728448107-1601d3615fa2?q=80&w=1200',
  'https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200'
];

let changed = false;
data.forEach(mod => {
  if (mod.id.startsWith('robots_') && mod.contentEs && mod.contentEs.sections) {
    mod.contentEs.sections.forEach((sec, idx) => {
      // Reemplazar la imagen con una de la lista de forma cíclica
      sec.image = marsImages[idx % marsImages.length];
      changed = true;
    });
  }
});

if (changed) {
  const newContent = 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync('lib/courseData.js', newContent, 'utf8');
  console.log('Fixed robot images in courseData.js');
} else {
  console.log('No changes made');
}
