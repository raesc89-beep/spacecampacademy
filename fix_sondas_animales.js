
const fs = require('fs');

// 1. ANIMALES HUB: Reemplazar imágenes
let hubJs = fs.readFileSync('app/hub/animales/page.js', 'utf8');
hubJs = hubJs.replace(/'\/assets\/animales\/hub_mamiferos\.png'/, '\'/assets/animales/nuevo_hub_mamiferos.png\'');
hubJs = hubJs.replace(/'\/assets\/animales\/hub_gatos\.png'/, '\'/assets/animales/nuevo_hub_gatos.png\'');
fs.writeFileSync('app/hub/animales/page.js', hubJs);
console.log('Animales Hub updated');

// 2. SONDAS MODULE: Añadir videos
let raw = fs.readFileSync('lib/courseData.js', 'utf8');
const dataStr = raw.split('export const COURSE_DATA = ')[1].replace(/;\s*$/, '');
const COURSE_DATA = eval('(' + dataStr + ')');

const sondas = COURSE_DATA.find(x => x.id === 'asteroides_sondas');
if (sondas) {
  // 6x6 means 6 sections. The user specified 5 videos for Sondas.
  // Sec 0 -> Video Osiris Rex.mp4
  // Sec 1 -> Video Rosseta.mp4 (Wait, Sec 1 is 'Un Beso Cosmico', which is Osiris Rex. Let's put Video Rosseta in Sec 2: 'Rosetta: A la Caza del Cometa 67P')
  // We will assign them sequentially matching the topics!

  sondas.contentEs.sections[0].video = '/assets/asteroides/Video Osiris Rex.mp4';
  
  // Sec 1 is Osiris Rex touching Bennu. No video specified for this uniquely, so maybe we put Rosseta there? No, the user said 'en ese orden'.
  // User: 'video rosseta', 'Rosseta 2 Vid', 'Rosseta 3 vid' y ' Rosset vid 3 parte 2'. ... igual el llamado 'Video osiris Rex'
  // I will assign them index 0 to 4. 
  sondas.contentEs.sections[1].video = '/assets/asteroides/Video Rosseta.mp4';
  sondas.contentEs.sections[2].video = '/assets/asteroides/Rosseta 2 vid.mp4';
  sondas.contentEs.sections[3].video = '/assets/asteroides/Rosseta 3vid.mp4';
  sondas.contentEs.sections[4].video = '/assets/asteroides/Rosset vid 3 parte 2.mp4';
}

const newRaw = raw.split('export const COURSE_DATA = ')[0] + 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';';
fs.writeFileSync('lib/courseData.js', newRaw);
console.log('Sondas videos added');

