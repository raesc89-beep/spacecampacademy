const fs = require('fs');

try {
  // Read existing courseData.js
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  
  // Extract the JSON array from COURSE_DATA
  const jsonStart = content.indexOf('[');
  const jsonEnd = content.lastIndexOf(']') + 1;
  const courseDataJson = content.substring(jsonStart, jsonEnd);
  
  const courseData = JSON.parse(courseDataJson);
  
  // Read maya parts
  const part1 = JSON.parse(fs.readFileSync('maya_part1.json', 'utf8'));
  const part2 = JSON.parse(fs.readFileSync('maya_part2.json', 'utf8'));
  const part3 = JSON.parse(fs.readFileSync('maya_part3.json', 'utf8'));
  
  // Combine all parts into an array
  const mayaModules = [
    ...Object.values(part1),
    ...Object.values(part2),
    ...Object.values(part3)
  ];
  
  // Sort just in case by order
  mayaModules.sort((a, b) => a.order - b.order);
  
  // Check if maya modules already exist, to avoid duplicates
  const existingMaya = courseData.filter(m => m.id.startsWith('maya_'));
  if (existingMaya.length > 0) {
    console.log('Maya modules already exist. Replacing them.');
    const nonMaya = courseData.filter(m => !m.id.startsWith('maya_'));
    nonMaya.push(...mayaModules);
    content = 'export const COURSE_DATA = ' + JSON.stringify(nonMaya, null, 2) + ';\n';
  } else {
    console.log('Adding Maya modules.');
    courseData.push(...mayaModules);
    content = 'export const COURSE_DATA = ' + JSON.stringify(courseData, null, 2) + ';\n';
  }
  
  fs.writeFileSync('lib/courseData.js', content);
  console.log('Maya modules injected successfully!');
} catch (e) {
  console.error('Error applying Maya data:', e);
}
