/**
 * COURSE AUDIT SCRIPT
 * Audits all modules in courseData.js for:
 * 1. Paragraph count (must be >= 15)
 * 2. Duplicate paragraphs
 * 3. Image assignments
 * 4. Quiz presence (must have 5 questions)
 * 5. Basic quality checks
 */
const fs = require('fs');
const path = require('path');

console.log('Loading courseData.js...');
const rawFile = fs.readFileSync(path.join(__dirname, '../lib/courseData.js'), 'utf8');

// Convert ES module export to CommonJS
const modifiedRaw = rawFile
  .replace('export const COURSE_DATA', 'const COURSE_DATA')
  + '\nmodule.exports = { COURSE_DATA };';

// Write temp file and require it
const tmpPath = path.join(__dirname, '../scripts/_temp_course_data.js');
fs.writeFileSync(tmpPath, modifiedRaw);
const { COURSE_DATA } = require(tmpPath);
// Clean up temp file
try { fs.unlinkSync(tmpPath); } catch(e) {}

console.log(`Total modules found: ${COURSE_DATA.length}`);

const report = {
  totalModules: COURSE_DATA.length,
  passing: [],
  failing: [],
  warnings: [],
  summary: {}
};

for (const module of COURSE_DATA) {
  const issues = [];
  const warnings = [];
  
  const id = module.id;
  const title = module.titleEs || module.titleEn || id;
  
  // Check contentEs exists
  if (!module.contentEs || !module.contentEs.sections || module.contentEs.sections.length === 0) {
    issues.push('NO_CONTENT: Missing contentEs.sections');
    report.failing.push({ id, title, issues, warnings });
    continue;
  }
  
  // Collect all paragraphs across all sections
  const allParagraphs = [];
  const allImages = [];
  
  for (const section of module.contentEs.sections) {
    if (section.text && Array.isArray(section.text)) {
      allParagraphs.push(...section.text.filter(t => t && t.trim().length > 0));
    }
    if (section.image) allImages.push(section.image);
    if (section.images && Array.isArray(section.images)) allImages.push(...section.images);
  }
  
  // Also check top-level images array
  if (module.images && Array.isArray(module.images)) {
    allImages.push(...module.images);
  }
  
  // Check paragraph count
  if (allParagraphs.length < 15) {
    issues.push(`PARAGRAPH_COUNT: Only ${allParagraphs.length} paragraphs (need ≥15)`);
  }
  
  // Check image count
  if (allImages.length < 15) {
    issues.push(`IMAGE_COUNT: Only ${allImages.length} images (need ≥15)`);
  }
  
  // Check for duplicate paragraphs
  const uniqueParagraphs = new Set(allParagraphs.map(p => p.substring(0, 100)));
  if (uniqueParagraphs.size < allParagraphs.length) {
    const dupCount = allParagraphs.length - uniqueParagraphs.size;
    issues.push(`DUPLICATE_PARAGRAPHS: ${dupCount} duplicate paragraphs found`);
  }
  
  // Check quiz
  const quiz = module.quizEs || module.quiz;
  if (!quiz || quiz.length === 0) {
    issues.push('NO_QUIZ: Missing quizEs');
  } else if (quiz.length < 5) {
    warnings.push(`QUIZ_SHORT: Only ${quiz.length} quiz questions (need 5)`);
  }
  
  // Check for very short paragraphs
  const shortParas = allParagraphs.filter(p => p.split(/\s+/).length < 30);
  if (shortParas.length > 3) {
    warnings.push(`SHORT_PARAGRAPHS: ${shortParas.length} paragraphs have fewer than 30 words`);
  }
  
  // Check for repeated content (same sentence in multiple paragraphs)
  let repeatDetected = false;
  for (let i = 0; i < allParagraphs.length; i++) {
    const first50 = allParagraphs[i].substring(0, 50).trim();
    if (first50.length > 20) {
      for (let j = i + 1; j < allParagraphs.length; j++) {
        if (allParagraphs[j].substring(0, 50).trim() === first50) {
          repeatDetected = true;
          break;
        }
      }
    }
    if (repeatDetected) break;
  }
  if (repeatDetected) {
    issues.push('REPEATED_CONTENT: Multiple paragraphs start with identical text');
  }
  
  const entry = {
    id,
    title,
    paragraphCount: allParagraphs.length,
    imageCount: allImages.length,
    quizCount: quiz ? quiz.length : 0,
    issues,
    warnings
  };
  
  if (issues.length > 0) {
    report.failing.push(entry);
  } else {
    if (warnings.length > 0) {
      report.warnings.push(entry);
    } else {
      report.passing.push(entry);
    }
  }
}

report.summary = {
  total: COURSE_DATA.length,
  passing: report.passing.length,
  warnings: report.warnings.length,
  failing: report.failing.length,
  passRate: ((report.passing.length / COURSE_DATA.length) * 100).toFixed(1) + '%'
};

// Write report
const reportPath = path.join(__dirname, '../scripts/audit_result.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log('\n=== AUDIT SUMMARY ===');
console.log(`Total: ${report.summary.total}`);
console.log(`✅ Passing: ${report.summary.passing}`);
console.log(`⚠️  Warnings: ${report.summary.warnings}`);
console.log(`❌ Failing: ${report.summary.failing}`);
console.log(`Pass Rate: ${report.summary.passRate}`);
console.log(`\nReport saved to: ${reportPath}`);

console.log('\n=== FAILING MODULES ===');
for (const m of report.failing) {
  console.log(`\n❌ ${m.id} — "${m.title}"`);
  console.log(`   Paragraphs: ${m.paragraphCount}, Images: ${m.imageCount}`);
  for (const issue of m.issues) {
    console.log(`   ⚠  ${issue}`);
  }
}

console.log('\n=== WARNING MODULES ===');
for (const m of report.warnings) {
  console.log(`\n⚠️  ${m.id} — "${m.title}"`);
  for (const w of m.warnings) {
    console.log(`   ⚠  ${w}`);
  }
}
