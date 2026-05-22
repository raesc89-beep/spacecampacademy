const fs = require('fs');
const glob = require('glob'); // Not available? We can just use readdir.
const path = require('path');

const hubDir = path.join(__dirname, 'app', 'hub');
const dirs = fs.readdirSync(hubDir);

dirs.forEach(dir => {
  const pagePath = path.join(hubDir, dir, 'page.js');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    let changed = false;
    
    if (content.includes("href=\"/dashboard\"")) {
       content = content.replace(/href="\/dashboard"/g, 'href="/dashboard/misiones"');
       changed = true;
    }
    if (content.includes("router.push('/dashboard')")) {
       content = content.replace(/router\.push\('\/dashboard'\)/g, "router.push('/dashboard/misiones')");
       changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(pagePath, content);
      console.log('Updated', pagePath);
    }
  }
});
