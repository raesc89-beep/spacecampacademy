const fs = require('fs');
const path = require('path');

const hubDir = path.join(__dirname, 'app', 'hub');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace common text labels
      const textsToReplace = [
        "Volver al Catálogo",
        "Volver al CatÃ¡logo",
        "Volver a la Academia",
        "Volver al Centro de Mando",
        "Volver al Inicio",
        "Volver al menú principal"
      ];
      
      for (const t of textsToReplace) {
        if (content.includes(t)) {
          content = content.replace(new RegExp(t, 'g'), "Volver a Misiones");
          modified = true;
        }
      }

      // Replace link destinations that are just "/dashboard" or "/" when near "Volver a Misiones"
      // It's safer to find the Link tags that wrap the "Volver a Misiones" text and fix their href.
      
      const linkRegex = /<Link\s+href=["']([^"']+)["'][^>]*>([^<]*Volver a Misiones[^<]*)<\/Link>/g;
      content = content.replace(linkRegex, (match, href, innerText) => {
        if (href === '/dashboard' || href === '/') {
          modified = true;
          return match.replace(`href="${href}"`, `href="/dashboard/misiones"`).replace(`href='${href}'`, `href='/dashboard/misiones'`);
        }
        return match;
      });
      
      // Some might have inner nodes like <ChevronLeft/> inside the Link.
      const linkRegexWithNodes = /<Link\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)Volver a Misiones([\s\S]*?)<\/Link>/g;
      content = content.replace(linkRegexWithNodes, (match, href, before, after) => {
         if (href === '/dashboard' || href === '/' || href === '/dashboard/catalog') {
          modified = true;
          return match.replace(`href="${href}"`, `href="/dashboard/misiones"`).replace(`href='${href}'`, `href='/dashboard/misiones'`);
        }
        return match;
      });

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(hubDir);
console.log("Finished updating links");
