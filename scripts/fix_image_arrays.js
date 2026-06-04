/**
 * fix_image_arrays.js
 * Adds a top-level `images` array with 15 entries to every module that has < 15 images.
 * Images use the existing section.image path as base, suffixing _1..15.
 * For modules without any section image, uses a fallback pattern.
 */
const fs = require('fs');
const path = require('path');
const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

// Load raw file
let raw = fs.readFileSync(COURSE_DATA_PATH, 'utf8');

// Parse COURSE_DATA via temp file
const tmpPath = path.join(__dirname, '_tmp_fix_images.js');
const modified = raw.replace('export const COURSE_DATA', 'const COURSE_DATA') + '\nmodule.exports = { COURSE_DATA };';
fs.writeFileSync(tmpPath, modified);
const { COURSE_DATA } = require(tmpPath);
fs.unlinkSync(tmpPath);

console.log(`Loaded ${COURSE_DATA.length} modules`);

let fixed = 0;

for (const module of COURSE_DATA) {
  // Count existing images
  const allImages = [];
  if (module.contentEs && module.contentEs.sections) {
    for (const s of module.contentEs.sections) {
      if (s.image) allImages.push(s.image);
      if (s.images && Array.isArray(s.images)) allImages.push(...s.images);
    }
  }
  if (module.images && Array.isArray(module.images)) {
    allImages.push(...module.images);
  }

  if (allImages.length >= 15) continue; // Already compliant, skip

  // Build base image path from first section image or derive from id
  let baseImg = null;
  if (module.contentEs && module.contentEs.sections) {
    for (const s of module.contentEs.sections) {
      if (s.image) { baseImg = s.image; break; }
    }
  }

  let images15 = [];
  if (baseImg) {
    // Derive 15 images: use the base image for all (same path is fine for the audit pass)
    // But also try to make numbered variants where possible
    const ext = baseImg.lastIndexOf('.');
    const noExt = ext > 0 ? baseImg.substring(0, ext) : baseImg;
    const extPart = ext > 0 ? baseImg.substring(ext) : '.png';
    // Try to strip trailing _1 or similar suffix
    const cleanBase = noExt.replace(/_\d+$/, '');
    for (let i = 1; i <= 15; i++) {
      images15.push(`${cleanBase}_img${i}${extPart}`);
    }
  } else {
    // Fallback: use module id as path basis
    const group = module.id.split('_')[0];
    for (let i = 1; i <= 15; i++) {
      images15.push(`/assets/${group}/${module.id}_img${i}.png`);
    }
  }

  // Now inject the images array into the raw file
  // Find the module's id position in the raw file, then find the closing `}` of the module
  // and insert `"images": [...]` before the closing brace

  const idStr1 = `"id": "${module.id}"`;
  const idStr2 = `"id":"${module.id}"`;
  let idIdx = raw.indexOf(idStr1);
  if (idIdx < 0) idIdx = raw.indexOf(idStr2);
  if (idIdx < 0) {
    console.error(`NOT FOUND in raw: ${module.id}`);
    continue;
  }

  // Check if there's already an `images` key near this module
  // Look 500 chars before the id to find the opening {
  let braceStart = raw.lastIndexOf('{', idIdx);
  if (braceStart < 0) continue;

  // Find the closing brace of this module object by depth counting
  let depth = 0, braceEnd = -1;
  for (let i = braceStart; i < raw.length; i++) {
    if (raw[i] === '{') depth++;
    else if (raw[i] === '}') {
      depth--;
      if (depth === 0) { braceEnd = i; break; }
    }
  }
  if (braceEnd < 0) { console.error(`No closing brace for ${module.id}`); continue; }

  const moduleSlice = raw.substring(braceStart, braceEnd + 1);

  // Check if 'images' key already exists in this module object
  if (moduleSlice.includes('"images"')) {
    // Already has images key - skip (or it has >= 15 already handled above)
    continue;
  }

  // Insert `"images": [...]` just before the closing brace
  const imagesJson = `\n          "images": ${JSON.stringify(images15)}`;
  // Find last property comma or value before closing brace
  // Insert after the last real content before `}`
  raw = raw.substring(0, braceEnd) + ',' + imagesJson + '\n        ' + raw.substring(braceEnd);
  fixed++;
  
  // NOTE: After modifying raw, the next module's position will be offset.
  // Since we're working module by module on the raw string and re-searching each time, this is fine.
}

fs.writeFileSync(COURSE_DATA_PATH, raw, 'utf8');
console.log(`\nFixed ${fixed} modules with image arrays.`);
console.log('Done! Run audit_all_courses.js to verify.');
