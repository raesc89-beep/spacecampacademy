const fs = require('fs');
const https = require('https');

const searchCommons = (query) => {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=100&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/5.0 (raesc89@spacecamp.com)' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          const pages = data.query.pages;
          const urls = Object.values(pages).map(p => p.imageinfo[0].url).filter(u => u.endsWith('.jpg') || u.endsWith('.png'));
          resolve(urls);
        } catch(e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
};

async function fixWormholeImages() {
  console.log('Descargando imágenes de galaxias/nebulosas...');
  const urls1 = await searchCommons('Hubble galaxy');
  const urls2 = await searchCommons('Nebula space');
  
  const allUrls = [...new Set([...urls1, ...urls2])];
  console.log(`Encontradas ${allUrls.length} imágenes reales de espacio profundo.`);

  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const jsonString = content.substring(startIndex).replace(/;\s*$/, '');
  let jsData = eval(jsonString);

  let urlIndex = 0;

  jsData.forEach(course => {
    if (course.id === 'agujeros_gusano_er' && course.contentEs && course.contentEs.sections) {
      course.contentEs.sections.forEach(sec => {
        if (sec.image && sec.image.includes('loremflickr')) {
          sec.image = allUrls[urlIndex % allUrls.length];
          urlIndex++;
        }
      });
    }
  });

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log('15 imágenes espaciales inyectadas en agujeros de gusano.');
}

fixWormholeImages();
