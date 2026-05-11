const fs = require('fs');
let code = fs.readFileSync('app/hub/egypt-astro/page.js', 'utf8');

code = code.replace(/\{\/\*\s*Astronauta\/Astrónomo Observador[\s\S]*?<\/motion\.img>\s*/, '');

code = code.replace(/width:\s*'2px',\s*height:\s*'100px',\s*background:\s*'linear-gradient\(to bottom, rgba\(255,255,255,1\), rgba\(255,255,255,0\)\)',\s*transform:\s*'rotate\(-45deg\)',\s*opacity:\s*0,\s*animation:\s*`shootingStar \${Math\.random\(\) \* 8 \+ 4}s linear infinite`,\s*animationDelay:\s*`\${Math\.random\(\) \* 10}s`,/, 
`width: \`${Math.random() * 80 + 50}px\`,\n          height: '2px',\n          background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(100,200,255,0.8) 20%, rgba(0,0,0,0) 100%)',\n          borderRadius: '50%',\n          boxShadow: '0 0 10px rgba(255,255,255,0.8)',\n          transform: 'rotate(-35deg) scale(0)',\n          opacity: 0,\n          animation: \`shootingStar \${Math.random() * 5 + 3}s ease-in infinite\`,\n          animationDelay: \`\${Math.random() * 8}s\`,`);

fs.writeFileSync('app/hub/egypt-astro/page.js', code);
console.log('Fixed page.js');
