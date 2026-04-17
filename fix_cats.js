const fs = require('fs');

const f1 = 'lib/courseData.js';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(/\/assets\/animales\/gatos_launch\.png/g, '/assets/anim_gatos_felicette_launch_1776352929519.png');
c1 = c1.replace(/\/assets\/animales\/hub_gatos\.png/g, '/assets/anim_gatos_felicette_launch_1776352929519.png');
c1 = c1.replace(/\/assets\/animales\/gatos_brain\.png/g, '/assets/anim_gatos_electrodes_brain_1776352946680.png');

let returnCount = 0;
c1 = c1.replace(/\/assets\/animales\/gatos_return\.png/g, (match) => {
    returnCount++;
    if (returnCount === 1) return '/assets/anim_gatos_felicette_return_1776352963906.png';
    return '/assets/anim_gatos_felicette_launch_1776352929519.png';
});

c1 = c1.replace(/\/assets\/animales\/gatos_monument\.png/g, '/assets/anim_gatos_felicette_monument_1776352978129.png');

fs.writeFileSync(f1, c1);
console.log('Cat images fixed');
