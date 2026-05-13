const fs = require('fs');

const raw = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = raw.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Find the existing `ciencia_star_wars` module
const starWarsIndex = data.findIndex(m => m.id === 'ciencia_star_wars');

if (starWarsIndex !== -1) {
    const swCourse = data[starWarsIndex];
    const newCourses = [];

    // Split the 9 sections into 9 separate courses
    swCourse.contentEs.sections.forEach((section, index) => {
        newCourses.push({
            id: section.id, // e.g., 'starwars_sec_1'
            hub: 'star-wars',
            title: section.title, // Use the full title
            description: section.text[0].substring(0, 100) + '...',
            badgeId: `sw_badge_${index + 1}`,
            contentEs: {
                title: section.title,
                sections: [section] // Keep only this section
            }
        });
    });

    // Remove the old 'ciencia_star_wars' course and insert the 9 new ones
    data.splice(starWarsIndex, 1, ...newCourses);

    fs.writeFileSync('lib/courseData.js',
      'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n',
      { encoding: 'utf8' }
    );
    console.log('Star Wars course split into 9 individual courses.');
} else {
    console.log('Star Wars module not found. Maybe already split?');
}
