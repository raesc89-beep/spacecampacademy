const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/raesc/.gemini/antigravity/brain/b598e303-7934-422d-8c8b-841d54919ae3';
const targetDir = path.join(process.cwd(), 'public', 'assets');

const filesToCopy = [
  'anim_gatos_electrodes_brain_1776352946680.png',
  'anim_gatos_felicette_launch_1776352929519.png',
  'anim_gatos_felicette_monument_1776352978129.png',
  'anim_gatos_felicette_return_1776352963906.png',
  'hub_animal_albertham_1776371582150.png',
  'asteroide_hub_intro_1776401829457.png',
  'asteroide_hub_meteoros_1776401843263.png',
  'asteroide_hub_cometas_1776401858841.png',
  'asteroides_sondas_1776401881093.png',
  'asteroides_apophis_1776401895084.png',
  'pluto_tombaugh_regio_2_1775540698119.png'
];

let copied = 0;
for (const file of filesToCopy) {
  const source = path.join(brainDir, file);
  const dest = path.join(targetDir, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    copied++;
    console.log('Copied: ' + file);
  } else {
    console.error('Missing: ' + source);
  }
}
console.log('Total copied: ' + copied);
