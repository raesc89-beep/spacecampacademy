const fs = require('fs');
let f = fs.readFileSync('app/auth/page.js', 'utf8');
f = f.replace(/role: 'student',/, "role: 'student',\n          isApproved: false, // Bloqueo Administrativo");
fs.writeFileSync('app/auth/page.js', f);
