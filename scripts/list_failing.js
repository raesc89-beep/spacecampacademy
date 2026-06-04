const fs = require('fs');
const path = require('path');

const rawFile = fs.readFileSync(path.join(__dirname, '../lib/courseData.js'), 'utf8');
const modifiedRaw = rawFile.replace('export const COURSE_DATA', 'const COURSE_DATA') + '\nmodule.exports = { COURSE_DATA };';
const tmpPath = path.join(__dirname, '_tmp_lf.js');
fs.writeFileSync(tmpPath, modifiedRaw);
const { COURSE_DATA } = require(tmpPath);
fs.unlinkSync(tmpPath);

const failing = [];

for (const module of COURSE_DATA) {
  if (!module.contentEs || !module.contentEs.sections) continue;
  
  const allParagraphs = [];
  const allImages = [];
  
  for (const s of module.contentEs.sections) {
    if (s.text && Array.isArray(s.text)) allParagraphs.push(...s.text.filter(t => t && t.trim()));
    if (s.image) allImages.push(s.image);
    if (s.images) allImages.push(...s.images);
  }
  if (module.images) allImages.push(...module.images);

  const issues = [];
  if (allParagraphs.length < 15) issues.push(`paras:${allParagraphs.length}`);
  if (allImages.length < 15) issues.push(`imgs:${allImages.length}`);
  
  // repeated content
  const first50s = allParagraphs.map(p => p.substring(0,50).trim());
  const seen = new Set();
  let repeated = false;
  for (const f of first50s) { if (f.length > 20) { if (seen.has(f)) { repeated = true; break; } seen.add(f); } }
  if (repeated) issues.push('repeated');

  if (issues.length > 0) {
    failing.push({ id: module.id, title: module.titleEs || '', issues });
  }
}

console.log(`Total failing: ${failing.length}\n`);
for (const f of failing) {
  console.log(`${f.id} | ${f.issues.join(', ')} | ${f.title}`);
}
