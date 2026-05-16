const fs = require('fs');

const bttfContent = fs.readFileSync('app/hub/bttf/page.js', 'utf8');

let newContent = bttfContent;
// Replace module data
const moduleRegex = /const BTTF_MODULES = \[[\s\S]*?\];/;

const newModules = `const INTERSTELLAR_MODULES = [
  {
    id: 'interstellar_m1',
    title: 'Einstein y la Red Invisible',
    color: '#00E4FF', 
    link: '/course/interstellar_m1',
    icon: '/assets/interstellar/m1.png',
    coords: { left: '15%', top: '35%' },
  },
  {
    id: 'interstellar_m2',
    title: 'Gargantúa',
    color: '#FF3366',
    link: '/course/interstellar_m2',
    icon: '/assets/interstellar/m2.png',
    coords: { left: '35%', top: '25%' },
  },
  {
    id: 'interstellar_m3',
    title: 'El Tiempo es Elástico',
    color: '#33FF66',
    link: '/course/interstellar_m3',
    icon: '/assets/interstellar/m3.png',
    coords: { left: '55%', top: '35%' },
  },
  {
    id: 'interstellar_m4',
    title: 'Agujeros de Gusano',
    color: '#9933FF',
    link: '/course/interstellar_m4',
    icon: '/assets/interstellar/m4.png',
    coords: { left: '75%', top: '55%' },
  },
  {
    id: 'interstellar_m5',
    title: 'El Teseracto y la 5D',
    color: '#FFD700',
    link: '/course/interstellar_m5',
    icon: '/assets/interstellar/m5.png',
    coords: { left: '50%', top: '65%' },
  }
];`;

newContent = newContent.replace(moduleRegex, newModules);

// Replace BTTF_MODULES with INTERSTELLAR_MODULES
newContent = newContent.replace(/BTTF_MODULES/g, 'INTERSTELLAR_MODULES');
newContent = newContent.replace(/BTTFModuleNode/g, 'InterstellarModuleNode');
newContent = newContent.replace(/Volver al Futuro/g, 'La Ciencia de Interstellar');
newContent = newContent.replace(/Laboratorio Temporal del Doc/g, 'Agujero de Gusano / Gargantúa');
newContent = newContent.replace(/BTTFHub/g, 'InterstellarHub');

fs.mkdirSync('app/hub/interstellar', { recursive: true });
fs.writeFileSync('app/hub/interstellar/page.js', newContent);
console.log('Interstellar Hub created!');
