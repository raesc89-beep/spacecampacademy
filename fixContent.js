const fs = require('fs');

let fileData = fs.readFileSync('lib/courseData.js', 'utf8');

// Instead of parsing the whole file (since it's not JSON), we'll write a simple parser or just do a regex replace on the sections.
// But it's much safer to just run a quick JS script that imports the array, modifies it, and rewrites the file.
