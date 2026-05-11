const fs = require('fs');
let c = fs.readFileSync('app/hub/egypt-astro/page.js', 'utf8');

// Find the corrupted end string and fix it
c = c.replace(/`\s*@keyframes shootingStar[^]+}<\/style>/, `
        @keyframes shootingStar { 0% { transform: translate(0, 0) rotate(-45deg); opacity: 1; } 20% { transform: translate(-400px, 400px) rotate(-45deg); opacity: 0; } 100% { transform: translate(-400px, 400px) rotate(-45deg); opacity: 0; } }
      \`}</style>`);

fs.writeFileSync('app/hub/egypt-astro/page.js', c);
console.log("Fixed!");
