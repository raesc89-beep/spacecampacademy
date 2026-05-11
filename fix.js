const fs = require('fs');
let code = fs.readFileSync('app/hub/egypt-astro/page.js', 'utf8');
code = code.split('\\`').join('`');
code = code.split('\\$').join('$');
fs.writeFileSync('app/hub/egypt-astro/page.js', code);
