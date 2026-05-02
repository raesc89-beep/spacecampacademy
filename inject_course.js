const fs = require('fs');

const content = fs.readFileSync('C:/Users/raesc/.gemini/antigravity/brain/b598e303-7934-422d-8c8b-841d54919ae3/interestelar_content_draft.md', 'utf8');
const courseDataPath = 'lib/courseData.js';

const sections = [];
const regex = /### Sección \d+: (.*?)\n\* \*\*Texto\*\*:\n([\s\S]*?)\* \*\*Imagen\*\*: `(.*?)`/g;
let match;
let secId = 0;

const nasaImages = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
  'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=800',
  'https://images.unsplash.com/photo-1446976646545-73138b7cb6bd?q=80&w=800',
  'https://images.unsplash.com/photo-1484589065579-248aad0d8e13?q=80&w=800',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800',
  'https://images.unsplash.com/photo-1481819613568-3701cbc70156?q=80&w=800',
  'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=800',
  'https://images.unsplash.com/photo-1518066000714-58c45f1a2c08?q=80&w=800',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800',
  'https://images.unsplash.com/photo-1504333638930-c8787321efa0?q=80&w=800'
];

while ((match = regex.exec(content)) !== null) {
  const title = match[1].trim();
  const textRaw = match[2];
  
  const imageUrl = nasaImages[secId % nasaImages.length];

  const lines = textRaw.split('\n')
    .filter(l => l.trim().match(/^\d+\./))
    .map(l => l.replace(/^\s*\d+\.\s*/, '').trim())
    .filter(l => !l.includes('[**VIDEO ADJUNTO:**]'));
  
  const videoMatch = textRaw.match(/\[\*\*VIDEO ADJUNTO:\*\*\] `(.*?)`/);
  const videoUrl = videoMatch ? videoMatch[1] : null;

  const sectionObj = {
    id: 'interestelar_sec_' + secId,
    title: title,
    text: lines,
    image: imageUrl
  };
  
  if (videoUrl) {
    sectionObj.videoUrl = videoUrl;
  }
  
  sections.push(sectionObj);
  secId++;
}

let rawCode = fs.readFileSync(courseDataPath, 'utf8');

// The replacement logic:
const objStr = "id: 'objetos_interestelares',\n    title: 'Objetos Interestelares',\n    description: 'Explora los misteriosos visitantes de otros sistemas estelares, su descubrimiento, trayectorias y lo que nos revelan sobre la galaxia.',\n    icon: '☄️',\n    color: 'from-fuchsia-600 to-purple-900',\n    contentEs: {\n      sections: " + JSON.stringify(sections, null, 6) + "\n    },";

let scriptModified = rawCode.replace(/id: 'objetos_interestelares',[\s\S]*?sections: \[[\s\S]*?\],/, objStr);

fs.writeFileSync(courseDataPath, scriptModified);
console.log('Injected successfully');
