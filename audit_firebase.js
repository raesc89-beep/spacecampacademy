const fs = require('fs');

const files = [
  'app/admin/page.js',
  'app/auth/page.js',
  'app/course/[moduleId]/page.js',
  'app/dashboard/live/page.js',
  'app/dashboard/page.js',
  'app/hangar/avatar/page.js',
  'app/quiz/[moduleId]/page.js',
  'app/parent/dashboard/page.js',
  'hooks/useAuth.js',
  'components/SatisfactionScale.js',
  'app/admin/users/page.js'
];

const collections = {};

for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch(e) { continue; }

  // find collection(db, 'name') patterns
  const colPattern = /collection\(db,\s*["'](\w+)["']/g;
  let m;
  while ((m = colPattern.exec(content)) !== null) {
    if (!collections[m[1]]) collections[m[1]] = [];
    collections[m[1]].push({ file: f, ops: [] });
  }

  // detect writes vs reads
  if (content.includes('setDoc') || content.includes('updateDoc') || content.includes('addDoc')) {
    const docPattern = /doc\(db,\s*["'](\w+)["']/g;
    while ((m = docPattern.exec(content)) !== null) {
      if (!collections[m[1]]) collections[m[1]] = [];
      const existing = collections[m[1]].find(e => e.file === f);
      if (existing) existing.ops.push('WRITE');
      else collections[m[1]].push({ file: f, ops: ['WRITE'] });
    }
  }
}

console.log('\n=== FIRESTORE COLLECTIONS AUDIT ===');
for (const [col, usages] of Object.entries(collections)) {
  const hasWrite = usages.some(u => u.ops.includes('WRITE'));
  console.log(`\nCollection: "${col}" [${hasWrite ? 'READ+WRITE' : 'READ'}]`);
  usages.forEach(u => console.log(`  - ${u.file}`));
}
