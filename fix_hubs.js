const fs = require('fs');
const files = [
  'app/hub/asteroides-cometas/page.js',
  'app/hub/stellar-objects/page.js',
  'app/hub/animales/page.js'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if(!content.includes('COURSE_DATA')) {
    content = content.replace('export default function', "import { COURSE_DATA } from '@/lib/courseData';\n\nexport default function");
  }
  content = content.replace(/const q = collection\(db, \"modules\"\);[\s\S]*?setModules\(data\);/, 'setModules(COURSE_DATA);');
  fs.writeFileSync(f, content);
});
console.log('Hubs updated!');
