const fs = require('fs');
let dataStr = fs.readFileSync('lib/courseData.js', 'utf8');

const marsImages = [
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200',
  'https://images.unsplash.com/photo-1630656044738-9cb5e481ff23?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200',
  'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728448107-1601d3615fa2?q=80&w=1200',
  'https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200'
];

let counter = 0;

// Buscar bloques que pertenezcan a robots_ y reemplazar el campo "image"
const regex = /("id":\s*"robots_[^"]+",[\s\S]*?"image":\s*")([^"]+)(")/g;
dataStr = dataStr.replace(regex, (match, p1, p2, p3) => {
    const newImage = marsImages[counter % marsImages.length];
    counter++;
    return p1 + newImage + p3;
});

fs.writeFileSync('lib/courseData.js', dataStr, 'utf8');
console.log('Replaced ' + counter + ' images.');
