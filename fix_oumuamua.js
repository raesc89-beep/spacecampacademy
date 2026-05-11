const fs = require('fs');
let code = fs.readFileSync('lib/courseData.js', 'utf8');

const oumuamuaVideo = 'https://drive.google.com/file/d/1WijurgG9zjYEI9-H5euHfOrnGupZlAud/preview';

code = code.replace(
  /("id":\s*"interestelar_sec_1"[\s\S]*?"image":\s*"[^"]+")/g,
  '$1,\n        "video": "' + oumuamuaVideo + '"'
);

fs.writeFileSync('lib/courseData.js', code);
console.log('Video inserted? ' + code.includes(oumuamuaVideo));
