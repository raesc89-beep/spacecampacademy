
const fs = require('fs');

const raw = fs.readFileSync('lib/courseData.js', 'utf8');
const dataStr = raw.split('export const COURSE_DATA = ')[1].replace(/;\s*$/, '');
const COURSE_DATA = eval('(' + dataStr + ')');

// 1. ANIMALES: Fix the mixed images in Mamiferos
const mam = COURSE_DATA.find(x => x.id === 'animales_mamiferos');
if(mam) {
   // Currently: 
   // Sec 1: mamiferos_rhesus.png
   // Sec 2: real_albert.png
   // Sec 3: mamiferos_rhesus.png
   // Sec 4: mamiferos_parachute.png
   // Sec 5: mamiferos_parachute.png
   mam.contentEs.sections[0].image = '/assets/animales/mamiferos_rhesus.png';
   mam.contentEs.sections[1].image = '/assets/animales/real_albert.png';
   mam.contentEs.sections[2].image = '/assets/animales/hub_albert.png'; // Different
   mam.contentEs.sections[3].image = '/assets/animales/mamiferos_parachute.png';
   mam.contentEs.sections[4].image = '/assets/animales/real_ham.png';   // Different
}

// 2. SOLAR SYSTEM: Fill the missing images
const earth = COURSE_DATA.find(x => x.id === 'earth');
if(earth) {
   earth.contentEs.sections[1].image = '/assets/earth_tectonics_1775512355199.png'; // Equilibrio Quimico
   earth.contentEs.sections[5].image = '/assets/earth_water_states_1775540753721.png'; // Biosfera
}

const mars = COURSE_DATA.find(x => x.id === 'mars');
if(mars) {
   mars.contentEs.sections[1].image = '/assets/mars_ancient_oceans_1775512374124.png';
   mars.contentEs.sections[4].image = '/assets/mars_dust_storm_1775540611848.png';
   mars.contentEs.sections[5].image = '/assets/mars_human_colony_dome_1775540766970.png';
}

const jupiter = COURSE_DATA.find(x => x.id === 'jupiter');
if(jupiter) {
   jupiter.contentEs.sections[1].image = '/assets/jupiter_cyclones_1775512387180.png';
   jupiter.contentEs.sections[4].image = '/assets/gen_gas.png';
   jupiter.contentEs.sections[5].image = '/assets/jupiter_auroras_radiation.png';
}

// Serialize back
const newRaw = raw.split('export const COURSE_DATA = ')[0] + 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';';
fs.writeFileSync('lib/courseData.js', newRaw);
console.log('Fixed mixed images and 6x6 rule in Solar System and Animales.');

