const fs = require('fs');
let code = fs.readFileSync('expandScriptBuilder.mjs', 'utf8');
code = code.split('\\`').join('`');
fs.writeFileSync('expandScriptBuilder.mjs', code);
console.log('Fixed expandScriptBuilder.mjs');
