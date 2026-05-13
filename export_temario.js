const { COURSE_DATA } = require('./lib/courseData.js');
let output = '# Temario de Space Camp Academy\n\n';
const groups = {};

// We group by prefix or specific names
COURSE_DATA.forEach(mod => {
  let category = 'Otros';
  if (mod.id.startsWith('egypt_')) category = 'Arqueoastronomía Egipcia';
  else if (mod.id.startsWith('maya_') || mod.id === 'arqueoastronomia_maya') category = 'Arqueoastronomía Maya';
  else if (mod.id.startsWith('asteroides_') || mod.id === 'asteroides_cometas') category = 'Asteroides y Cometas';
  else if (mod.id.startsWith('pioneros_') || mod.id === 'pioneros_historia') category = 'Pioneros de la Astronomía';
  else if (mod.id.startsWith('animales_')) category = 'Animales en el Espacio';
  else if (mod.id.startsWith('robots_')) category = 'Robots y Rovers Espaciales';
  else if (mod.id.startsWith('stellar-') || ['black_hole','pulsar','quasar','red_dwarf','white_dwarf','wormhole'].includes(mod.id)) category = 'Anomalías y Objetos Estelares';
  else if (['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(mod.id)) category = 'Sistema Solar (Planetas)';
  else if (mod.id.includes('star_wars') || mod.id.includes('volver_al_futuro')) category = 'Ciencia Ficción vs Realidad';
  else category = 'Exploración General';

  if (!groups[category]) groups[category] = [];
  groups[category].push(mod);
});

for (const cat in groups) {
  output += `## ${cat}\n\n`;
  groups[cat].forEach((mod, index) => {
    // Avoid listing the hub entry if it's just a placeholder, but we will list all.
    if (mod.id === 'arqueoastronomia_maya') return;
    output += `### ${index + 1}. ${mod.titleEs}\n`;
    output += `**Descripción:** ${mod.description || 'Sin descripción'}\n`;
    if (mod.contentEs && mod.contentEs.sections) {
      output += `**Temas Principales:**\n`;
      mod.contentEs.sections.forEach(sec => {
        output += `- ${sec.title}\n`;
      });
    }
    output += `\n`;
  });
}

const fs = require('fs');
fs.writeFileSync('temario_export.md', output);
console.log('Temario exportado a temario_export.md');
