const fs = require('fs');

let code = fs.readFileSync('app/hub/egypt-astro/page.js', 'utf8');

// Fix Comets
code = code.replace(/function Comets\(\) \{[\s\S]*?\n\}/, 
`function Comets() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: 7 }).map((_, i) => {
        // Evaluate on server
        const width = Math.random() * 80 + 60;
        const top = Math.random() * -30;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 8;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: \`\${left}%\`,
            top: \`\${top}%\`,
            width: \`\${width}px\`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(100,200,255,0.8) 20%, rgba(0,0,0,0) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            transform: 'rotate(-35deg) scale(0)',
            opacity: 0,
            animation: \`shootingStar \${duration}s ease-in infinite\`,
            animationDelay: \`\${delay}s\`,
          }} />
        );
      })}
    </div>
  );
}`);

// Fix NileRiver
code = code.replace(/function NileRiver\(\) \{[\s\S]*?\n\}/, 
`function NileRiver() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0, height: '35%',
      background: 'linear-gradient(to bottom, rgba(0, 150, 255, 0.15), rgba(0, 150, 255, 0.4))',
      maskImage: 'radial-gradient(ellipse at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse at bottom center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      animation: 'waterFlow 6s ease-in-out infinite alternate',
      pointerEvents: 'none',
      zIndex: 1,
    }}></div>
  );
}`);

fs.writeFileSync('app/hub/egypt-astro/page.js', code);
console.log('Fixed Comets and River in page.js');
