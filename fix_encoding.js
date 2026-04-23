const fs = require('fs');
const glob = require('glob');

const files = glob.sync('{app,components,lib}/**/*.{js,jsx,ts,tsx}', { ignore: ['node_modules/**', '.next/**'] });
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Ã')) {
    console.log('Fixing:', file);
    // Common UTF-8 mojibake
    content = content
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í') // This is A-tilde followed by soft hyphen
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã /g, 'Á')
      .replace(/Ã‰/g, 'É')
      .replace(/Ã“/g, 'Ó')
      .replace(/Ãš/g, 'Ú')
      .replace(/Ã‘/g, 'Ñ')
      .replace(/Ã¼/g, 'ü')
      // Specific dashboard replacements
      .replace(/CatÃ¡logo/g, 'Catálogo')
      .replace(/ExploraciÃ³n/g, 'Exploración')
      .replace(/GÃ©nesis/g, 'Génesis')
      .replace(/InterceptaciÃ³n/g, 'Interceptación')
      .replace(/AnomalÃ\xADas/g, 'Anomalías')
      .replace(/AnomalÃ.as/g, 'Anomalías') // fallback
      .replace(/BiolÃ³gico/g, 'Biológico')
      .replace(/estÃ¡/g, 'está')
      .replace(/SesiÃ³n/g, 'Sesión')
      .replace(/MÃ QUINA/g, 'MÁQUINA');
    
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log('Encoding fix done.');
