const fs = require('fs');

async function run() {
  const code = fs.readFileSync('lib/courseData.js', 'utf8');
  // We need to parse COURSE_DATA. Since it's a JS file, we can require it if we transpile or we can just run a quick evaluator.
  // Actually, since lib/courseData.js uses ES modules (export const), we can dynamically import it or read it via eval.
  const tempFile = 'lib/courseData_temp.js';
  fs.writeFileSync(tempFile, code.replace('export const COURSE_DATA =', 'module.exports ='));
  const COURSE_DATA = require('./lib/courseData_temp.js');
  fs.unlinkSync(tempFile);

  const totalModules = COURSE_DATA.length;
  let totalSections = 0;
  
  const cache = new Set(); // To ensure uniqueness
  
  for (let i = 0; i < COURSE_DATA.length; i++) {
    const moduleData = COURSE_DATA[i];
    console.log(`Procesando módulo: ${moduleData.titleEs}`);
    
    if (!moduleData.contentEs || !moduleData.contentEs.sections) continue;
    
    for (let j = 0; j < moduleData.contentEs.sections.length; j++) {
      const section = moduleData.contentEs.sections[j];
      
      // Basic fallback if API fails or no results
      let fallbackImg = section.image;
      
      try {
        const query = encodeURIComponent(section.title + ' ' + moduleData.titleEs + ' space');
        const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page_size=10`);
        const data = await res.json();
        
        let imgFound = null;
        if (data && data.collection && data.collection.items && data.collection.items.length > 0) {
          // Find first unique image
          for (const item of data.collection.items) {
            if (item.links && item.links.length > 0) {
              const url = item.links[0].href.replace('~thumb.jpg', '~medium.jpg'); // try to get medium size
              if (!cache.has(url)) {
                imgFound = url;
                cache.add(url);
                break;
              }
            }
          }
          // If all 10 are used, just take the first one anyway
          if (!imgFound && data.collection.items[0].links) {
              imgFound = data.collection.items[0].links[0].href.replace('~thumb.jpg', '~medium.jpg');
          }
        }
        
        if (imgFound) {
          section.image = imgFound;
        }
      } catch (err) {
        console.error(`Error fetching NASA image for ${section.title}:`, err.message);
      }
      
      totalSections++;
      // Sleep a bit to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Now write back to lib/courseData.js
  const newContent = `// Archivo maestro estático del curso
export const COURSE_DATA = ${JSON.stringify(COURSE_DATA, null, 2)};
`;

  fs.writeFileSync('lib/courseData.js', newContent, 'utf8');
  console.log(`\n¡Proceso completado! ${totalSections} secciones actualizadas con imágenes de NASA/ESA.`);
}

run();
