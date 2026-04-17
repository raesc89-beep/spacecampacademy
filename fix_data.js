const fs = require('fs');

const f1 = 'lib/courseData.js';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(/\/assets\/anim_mamiferos_rhesus[^"']*\"/g, '"/assets/hub_animal_albertham_1776371582150.png"');
c1 = c1.replace(/\/assets\/anim_mamiferos_parachute[^"']*\"/g, '"/assets/anim_intro_capsule_orbit_1776352853922.png"');

c1 = c1.replace(/\/assets\/cartoon_cat_hub[^"']*\"/g, '"/assets/anim_gatos_felicette_launch_1776352929519.png"');
c1 = c1.replace(/cartoon_cat_hub_1776320934108\.png/g, 'anim_gatos_felicette_launch_1776352929519.png');

fs.writeFileSync(f1, c1);
console.log('courseData updated');
