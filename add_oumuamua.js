const fs = require('fs');
let code = fs.readFileSync('lib/courseData.js', 'utf8');

if (code.includes('1X-DJ9YMcdS3bEyjPqxcHcDVSza3gXrYz')) {
    console.log('Borisov video exists');
} else {
    console.log('Borisov video MISSING');
}

if (code.includes('1_5pAmkL6zZ1_RQbKeY8INkDqAY14nOHR')) {
    console.log('ATLAS video 1 exists');
} else {
    console.log('ATLAS video 1 MISSING');
}

const oumuamuaVideo = 'https://drive.google.com/file/d/1WijurgG9zjYEI9-H5euHfOrnGupZlAud/preview';

// Replace interestelar_sec_1 image line to also add the video
code = code.replace(
  /(id: 'interestelar_sec_1',\s*title: '[^']+',[\s\S]*?image: '[^']+')/g,
  '$1,\n        video: \'' + oumuamuaVideo + '\''
);

fs.writeFileSync('lib/courseData.js', code);
console.log('Added Oumuamua video successfully');
