/**
 * Restore Google Drive videos to courseData.js sections
 * Run: node restore_videos.js
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'lib', 'courseData.js');
const content = fs.readFileSync(dataPath, 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
let data = JSON.parse(jsonStr);

// Video mappings from original injection scripts
const videoMap = {
  // Planetas Gaseosos (module: viaje-planetas-gaseosos)
  'viaje-planetas-gaseosos': [
    { sectionIndex: 0, video: 'https://drive.google.com/file/d/1XRe4PPGO0Knt1neoJ6buxg9N6EZyADfJ/preview' },
    { sectionIndex: 1, video: 'https://drive.google.com/file/d/1hDdWr5NB2Rk-zeyHGU5MgV-jNc2yo0rU/preview' },
    { sectionIndex: 2, video: 'https://drive.google.com/file/d/1pQwPnFrcb3jGQ2_LIvpRK18McV1wQbM3/preview' },
    { sectionIndex: 3, video: 'https://drive.google.com/file/d/1TL8MNC29nZ1ZIVewOMNArTmgQAQjR7TI/preview' },
    { sectionIndex: 4, video: 'https://drive.google.com/file/d/1Z4apcbuMCQfArspZg36X0IUOXNOYGYPN/preview' },
    { sectionIndex: 5, video: 'https://drive.google.com/file/d/1KvlpS0nLq_2jc9ZrIBzoY1AOEH6JyyYw/preview' },
    { sectionIndex: 6, video: 'https://drive.google.com/file/d/1uJWUyFf5oax5xDZUm_ZWX1SyqR0-2OQG/preview' },
  ],
  // Robots / Rovers
  'robots_sojourner': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1sKO6BBodinxwJ_fwKrxIYCXNYOa_huNg/preview' }],
  'robots_opportunity': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1iCm637qLcGV2sm0UFUAJ9vne2XOzSZ4c/preview' }],
  'robots_spirit': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1knQhfUbl25RYLZ3JQTfWp1NG-CooNnCo/preview' }],
  'robots_curiosity': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1vKWif4d_wiUTec2o-UJQiZGaHq6S4GMM/preview' }],
  'robots_ingenuity': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/15fTNk-eeJ6eUD-0CHck3EFUu_XaMrZBk/preview' }],
  // Pioneros
  'pioneros_yuri': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview' }],
  'pioneros_alan': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview' }],
  'pioneros_john': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview' }],
  'pioneros_valentina': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview' }],
  'pioneros_leonov': [{ sectionIndex: 0, video: 'https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview' }],
};

let updated = 0;

data = data.map(module => {
  const videos = videoMap[module.id];
  if (!videos) return module;

  const sections = module.contentEs?.sections || [];
  videos.forEach(({ sectionIndex, video }) => {
    if (sections[sectionIndex]) {
      sections[sectionIndex].video = video;
      console.log(`✅ Added video to ${module.id} section[${sectionIndex}]`);
      updated++;
    }
  });
  return { ...module, contentEs: { ...module.contentEs, sections } };
});

const newContent = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log(`\n✅ Done! Updated ${updated} video references in courseData.js`);
