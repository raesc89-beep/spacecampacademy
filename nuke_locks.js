const fs = require('fs');
const files = [
  'app/hub/asteroides-cometas/page.js',
  'app/hub/stellar-objects/page.js',
  'app/hub/solar-system/page.js',
  'app/hub/animales/page.js'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/const isLocked = \(userData\?\.role !== 'admin'\) && \(idx > currentPlayableIdx\);/g, 'const isLocked = false; // Bypass total remoto');
  
  // also catch the old syntax just in case
  content = content.replace(/const isLocked = idx > currentPlayableIdx;/g, 'const isLocked = false; // Bypass total remoto');
  
  fs.writeFileSync(f, content);
});

const dash = 'app/dashboard/page.js';
let dashContent = fs.readFileSync(dash, 'utf8');
dashContent = dashContent.replace(/if \(userData\.role !== 'admin' && !userData\.isApproved\) \{/, 'if (false && userData.role !== "admin" && !userData.isApproved) { // Bypass Muro Restringido');
fs.writeFileSync(dash, dashContent);

console.log('ALL LOCKS DISABLED. Muro Dashboard DESTRUIDO.');
