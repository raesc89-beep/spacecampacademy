const fs = require('fs');
const files = [
  'app/hub/asteroides-cometas/page.js',
  'app/hub/stellar-objects/page.js',
  'app/hub/solar-system/page.js',
  'app/hub/animales/page.js'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/const isLocked = idx > currentPlayableIdx;/g, "const isLocked = (userData?.role !== 'admin') && (idx > currentPlayableIdx);");
  fs.writeFileSync(f, content);
});
console.log('Unlock admin active!');
