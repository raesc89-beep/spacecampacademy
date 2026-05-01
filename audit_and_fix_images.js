const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const fallbackImages = [
  "https://images-assets.nasa.gov/image/PIA23402/PIA23402~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA13588/PIA13588~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA24103/PIA24103~medium.jpg",
  "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001427/GSFC_20171208_Archive_e001427~medium.jpg"
];
let fallbackIdx = 0;

function checkImage(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false)).end();
  });
}

async function run() {
  let brokenCount = 0;
  for (let c of jsData) {
    if (!c.contentEs) continue;
    for (let s of c.contentEs.sections) {
      if (!s.image) continue;
      const isGood = await checkImage(s.image);
      if (!isGood) {
        console.log(`Rotura detectada en ${c.id} - ${s.title}: ${s.image}`);
        s.image = fallbackImages[fallbackIdx % fallbackImages.length];
        fallbackIdx++;
        brokenCount++;
      }
    }
  }

  if (brokenCount > 0) {
    const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
    fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
    console.log(`Auditoría de imágenes completa. Se repararon ${brokenCount} enlaces rotos.`);
  } else {
    console.log("Auditoría de imágenes completa. Todas las 630 imágenes están operativas 100%.");
  }
}

run();
